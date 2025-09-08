'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function AdminFoglalas() {
  const [events, setEvents] = useState([
    { title: 'Páciens 1', date: '2025-09-10' },
    { title: 'Szabadság', date: '2025-09-15' },
  ]);

  const handleDateClick = (info: any) => {
    const title = prompt('Adj meg egy eseményt:');
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Időpontfoglalás admin</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height="80vh"
      />
    </div>
  );
}
