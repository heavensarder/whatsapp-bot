import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendWhatsAppMessage, sendBulkMessages } from '@/lib/whatsapp';

export const dynamic = 'force-dynamic';

// GET message history
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status') || '';

    const where: Record<string, unknown> = {};
    if (status) {
      where.status = status;
    }

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where,
        include: { contact: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.message.count({ where }),
    ]);

    return NextResponse.json({
      messages,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Messages GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST send message(s)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contactIds, message } = body;

    if (!contactIds || !Array.isArray(contactIds) || contactIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one contact is required' },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const contacts = await prisma.contact.findMany({
      where: { id: { in: contactIds } },
    });

    if (contacts.length === 0) {
      return NextResponse.json(
        { error: 'No valid contacts found' },
        { status: 400 }
      );
    }

    // Create message records first
    const messageRecords = await Promise.all(
      contacts.map(contact =>
        prisma.message.create({
          data: {
            contactId: contact.id,
            message: message.trim(),
            status: 'sending',
          },
        })
      )
    );

    // Send messages (bulk or single)
    if (contacts.length === 1) {
      const result = await sendWhatsAppMessage(
        contacts[0].phoneNumber,
        message.trim()
      );

      await prisma.message.update({
        where: { id: messageRecords[0].id },
        data: {
          status: result.success ? 'sent' : 'failed',
          whatsappMessageId: result.messageId || null,
          errorMessage: result.error || null,
        },
      });

      if (!result.success) {
        console.error('Message send failed:', {
          contactId: contacts[0].id,
          phone: contacts[0].phoneNumber,
          error: result.error,
        });
      }

      return NextResponse.json({
        results: [{
          contactId: contacts[0].id,
          status: result.success ? 'sent' : 'failed',
          error: result.error,
        }],
      });
    } else {
      // Bulk send
      const results = await sendBulkMessages(
        contacts.map(c => ({ id: c.id, phoneNumber: c.phoneNumber })),
        message.trim()
      );

      // Update message records
      await Promise.all(
        results.map((r, index) => {
          if (!r.result.success) {
            console.error('Bulk message send failed:', {
              contactId: r.contactId,
              error: r.result.error,
            });
          }
          return prisma.message.update({
            where: { id: messageRecords[index].id },
            data: {
              status: r.result.success ? 'sent' : 'failed',
              whatsappMessageId: r.result.messageId || null,
              errorMessage: r.result.error || null,
            },
          });
        })
      );

      return NextResponse.json({
        results: results.map(r => ({
          contactId: r.contactId,
          status: r.result.success ? 'sent' : 'failed',
          error: r.result.error,
        })),
      });
    }
  } catch (error) {
    console.error('Message send error:', error);
    return NextResponse.json({ error: 'Failed to send messages' }, { status: 500 });
  }
}
