import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contacts } = body;

    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
      return NextResponse.json(
        { error: 'Contacts array is required' },
        { status: 400 }
      );
    }

    const phoneRegex = /^\+?[1-9]\d{6,14}$/;
    const validContacts = contacts
      .filter((c: { name: string; phoneNumber: string; tag?: string }) => {
        return c.name && c.phoneNumber && phoneRegex.test(c.phoneNumber.replace(/[\s\-()]/g, ''));
      })
      .map((c: { name: string; phoneNumber: string; tag?: string }) => ({
        name: c.name,
        phoneNumber: c.phoneNumber.replace(/[\s\-()]/g, ''),
        tag: c.tag || null,
      }));

    if (validContacts.length === 0) {
      return NextResponse.json(
        { error: 'No valid contacts found in the uploaded data' },
        { status: 400 }
      );
    }

    const result = await prisma.contact.createMany({
      data: validContacts,
      skipDuplicates: true,
    });

    return NextResponse.json({
      imported: result.count,
      total: contacts.length,
      skipped: contacts.length - validContacts.length,
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json({ error: 'Failed to import contacts' }, { status: 500 });
  }
}
