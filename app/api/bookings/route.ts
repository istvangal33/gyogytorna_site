export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any = null;

// Initialize Prisma client safely
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require('@prisma/client');
  const globalForPrisma = globalThis as unknown as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prisma: any | undefined;
  };
  prisma = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
} catch (error) {
  console.warn('Prisma client not available:', error);
}

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 500 });
  }
  
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        date: 'asc'
      }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    const errorResponse = {
      error: 'Failed to fetch bookings',
      ...(process.env.NODE_ENV !== 'production' && { details: error instanceof Error ? error.message : String(error) })
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 500 });
  }
  
  try {
    const body = await request.json();
    
    // Prefer new UTC fields if present, otherwise fallback to legacy fields
    const { name, note, startAt, endAt, dateStr, startTime, endTime } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    let date: Date;
    let end: Date;

    if (startAt && endAt) {
      // Use new UTC fields (preferred)
      date = new Date(startAt);
      end = new Date(endAt);
      
      if (isNaN(date.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json({ error: 'Invalid UTC datetime format' }, { status: 400 });
      }
    } else if (dateStr && startTime && endTime) {
      // Fallback to legacy fields - treat as local time, then convert to UTC
      const startLocal = `${dateStr}T${startTime}:00`;
      const endLocal = `${dateStr}T${endTime}:00`;
      
      date = new Date(startLocal);
      end = new Date(endLocal);
      
      if (isNaN(date.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json({ error: 'Invalid datetime format' }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: 'Either startAt/endAt or dateStr/startTime/endTime are required' }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        date,
        end,
        note: note || null,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    const errorResponse = {
      error: 'Failed to create booking',
      ...(process.env.NODE_ENV !== 'production' && { details: error instanceof Error ? error.message : String(error) })
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 500 });
  }
  
  try {
    const body = await request.json();
    
    // Prefer new UTC fields if present, otherwise fallback to legacy fields
    const { id, name, note, startAt, endAt, dateStr, startTime, endTime } = body;

    if (!id || !name) {
      return NextResponse.json({ error: 'ID and name are required' }, { status: 400 });
    }

    let date: Date;
    let end: Date;

    if (startAt && endAt) {
      // Use new UTC fields (preferred)
      date = new Date(startAt);
      end = new Date(endAt);
      
      if (isNaN(date.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json({ error: 'Invalid UTC datetime format' }, { status: 400 });
      }
    } else if (dateStr && startTime && endTime) {
      // Fallback to legacy fields - treat as local time, then convert to UTC
      const startLocal = `${dateStr}T${startTime}:00`;
      const endLocal = `${dateStr}T${endTime}:00`;
      
      date = new Date(startLocal);
      end = new Date(endLocal);
      
      if (isNaN(date.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json({ error: 'Invalid datetime format' }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: 'Either startAt/endAt or dateStr/startTime/endTime are required' }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        name,
        date,
        end,
        note: note || null,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    const errorResponse = {
      error: 'Failed to update booking',
      ...(process.env.NODE_ENV !== 'production' && { details: error instanceof Error ? error.message : String(error) })
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not available' }, { status: 500 });
  }
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.booking.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Prisma "Record to delete does not exist" = P2025
    if (error && typeof error === 'object' && 'code' in error && error.code === "P2025") {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    console.error('Error deleting booking:', error);
    const errorResponse = {
      error: 'Failed to delete booking',
      ...(process.env.NODE_ENV !== 'production' && { details: error instanceof Error ? error.message : String(error) })
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}