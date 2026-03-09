import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET settings
export async function GET() {
  try {
    let settings = await prisma.settings.findFirst();

    if (!settings) {
      settings = await prisma.settings.create({ data: {} });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// PUT update settings
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      whatsappPhoneNumberId,
      whatsappBusinessAccountId,
      metaAppId,
      metaAppSecret,
      permanentAccessToken,
      webhookVerifyToken,
    } = body;

    let settings = await prisma.settings.findFirst();

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          whatsappPhoneNumberId,
          whatsappBusinessAccountId,
          metaAppId,
          metaAppSecret,
          permanentAccessToken,
          webhookVerifyToken,
        },
      });
    } else {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: {
          whatsappPhoneNumberId,
          whatsappBusinessAccountId,
          metaAppId,
          metaAppSecret,
          permanentAccessToken,
          webhookVerifyToken,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings PUT error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
