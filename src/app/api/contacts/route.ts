import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET all contacts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag') || '';

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phoneNumber: { contains: search } },
      ];
    }

    if (tag) {
      where.tag = tag;
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Contacts GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

// POST create new contact
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phoneNumber, tag } = body;

    if (!name || !phoneNumber) {
      return NextResponse.json(
        { error: 'Name and phone number are required' },
        { status: 400 }
      );
    }

    // Validate international format
    const phoneRegex = /^\+?[1-9]\d{6,14}$/;
    if (!phoneRegex.test(phoneNumber.replace(/[\s\-()]/g, ''))) {
      return NextResponse.json(
        { error: 'Phone number must be in international format (e.g., +1234567890)' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        phoneNumber: phoneNumber.replace(/[\s\-()]/g, ''),
        tag: tag || null,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}
