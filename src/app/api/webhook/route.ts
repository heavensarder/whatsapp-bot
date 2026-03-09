import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/webhook - Webhook verification
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    // Get verify token from settings or env
    const settings = await prisma.settings.findFirst();
    const verifyToken = settings?.webhookVerifyToken || process.env.WEBHOOK_VERIFY_TOKEN;

    if (mode === 'subscribe' && token === verifyToken) {
      return new NextResponse(challenge, { status: 200 });
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch (error) {
    console.error('Webhook verification error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// POST /api/webhook - Receive webhook events
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.object !== 'whatsapp_business_account') {
      return NextResponse.json({ error: 'Invalid object' }, { status: 400 });
    }

    const entries = body.entry || [];
    
    for (const entry of entries) {
      const changes = entry.changes || [];
      
      for (const change of changes) {
        if (change.field === 'messages') {
          const statuses = change.value?.statuses || [];
          
          for (const status of statuses) {
            const whatsappMessageId = status.id;
            const messageStatus = status.status; // sent, delivered, read, failed
            const errorInfo = status.errors?.[0];

            // Log status updates for debugging
            console.log('WhatsApp status update:', {
              messageId: whatsappMessageId,
              status: messageStatus,
              ...(errorInfo && {
                errorCode: errorInfo.code,
                errorTitle: errorInfo.title,
                errorMessage: errorInfo.message,
              }),
            });

            // Update message status in database
            const updateData: Record<string, unknown> = { status: messageStatus };
            if (messageStatus === 'failed' && errorInfo) {
              updateData.errorMessage = `[${errorInfo.code}] ${errorInfo.title}: ${errorInfo.message || 'No details'}`;
            }

            await prisma.message.updateMany({
              where: { whatsappMessageId },
              data: updateData,
            });
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook POST error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
