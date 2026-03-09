import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT update contact
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, phoneNumber, tag } = body;

    const contact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(phoneNumber && { phoneNumber: phoneNumber.replace(/[\s\-()]/g, '') }),
        ...(tag !== undefined && { tag: tag || null }),
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Contact PUT error:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

// DELETE contact
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.contact.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
