import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const bookings = await prisma.booking.findMany();
    res.status(200).json(bookings);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}