export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

let prisma: any = null;

// Initialize Prisma client safely
try {
  const { PrismaClient } = require('@prisma/client');
  const globalForPrisma = globalThis as unknown as {
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
    
    // Map bookings to include both legacy fields and FullCalendar-compatible fields
    const mappedBookings = bookings.map((booking: any) => {
      const startDate = new Date(booking.date);
      const endDate = new Date(booking.end);
      
      // Add diagnostics for development
      if (process.env.NODE_ENV !== 'production') {
        if (!booking.date || !booking.end) {
          console.warn('Booking missing date/end fields:', booking.id);
        }
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.warn('Booking has invalid date/end values:', booking.id, booking.date, booking.end);
        }
      }
      
      return {
        ...booking,
        // Legacy fields (keep for backward compatibility)
        date: booking.date,
        end: booking.end,
        // FullCalendar-compatible fields
        start: booking.date, // FullCalendar expects 'start' field
        // startAt/endAt as UTC ISO strings for API compatibility
        startAt: startDate.toISOString(),
        endAt: endDate.toISOString(),
        // Ensure events are not treated as all-day
        allDay: false
      };
    });
    
    return NextResponse.json(mappedBookings);
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
    const { name, date, end, note } = body;

    if (!name || !date || !end) {
      return NextResponse.json({ error: 'Name, date, and end are required' }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        date: new Date(date),
        end: new Date(end),
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
    const { id, name, date, end, note } = body;

    if (!id || !name || !date || !end) {
      return NextResponse.json({ error: 'ID, name, date, and end are required' }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        name,
        date: new Date(date),
        end: new Date(end),
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
  } catch (error: any) {
    // Prisma "Record to delete does not exist" = P2025
    if (error.code === "P2025") {
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