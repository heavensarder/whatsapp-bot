import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [totalContacts, totalMessages, sentMessages, failedMessages, recentMessages] = await Promise.all([
      prisma.contact.count(),
      prisma.message.count(),
      prisma.message.count({ where: { status: 'sent' } }),
      prisma.message.count({ where: { status: 'failed' } }),
      prisma.message.findMany({
        include: { contact: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalContacts,
        totalMessages,
        sentMessages,
        failedMessages,
      },
      recentMessages,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
