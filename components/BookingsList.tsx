import { useEffect, useState } from "react";

type Booking = {
  id: number;
  name: string;
  email: string;
  date: string; // vagy Date, ha biztosan az jön a backendből
};

export default function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  return (
    <ul>
      {bookings.map((b) => (
        <li key={b.id}>
          {b.name} – {b.email} – {new Date(b.date).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}