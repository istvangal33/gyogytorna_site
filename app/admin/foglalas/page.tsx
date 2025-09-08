'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import BookingModal from './BookingModal';

type EventForm = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  note: string;
};

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps?: { note?: string };
};

// Simulált user, cseréld le ha van auth!
const user = { login: 'istvangal333', role: 'admin' }; // pl. superadmin: { login: 'superadmin', role: 'superadmin' }

function getDateAndTimes(start: string, end: string) {
  const date = start.split('T')[0];
  const startTime = start.split('T')[1]?.slice(0,5) || '12:00';
  const endTime = end.split('T')[1]?.slice(0,5) || '13:00';
  return { date, startTime, endTime };
}

// --- FullCalendar nap cella dátum színezés ---
function renderDayCellContent(args: any) {
  // args: { date, dayNumberText, ... }
  const todayStr = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
  const cellDateStr = args.date.toISOString().slice(0, 10);

  // Ha a nap már elmúlt (tegnap vagy régebbi), szürke
  const isPast = cellDateStr < todayStr;

  return (
    <span
      style={{
        color: isPast ? '#000000ff' : '',
        fontWeight: isPast ? 'normal' : 'inherit'
      }}
    >
      {args.dayNumberText}
    </span>
  );
}

export default function AdminFoglalas() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Páciens 1',
      start: '2025-09-10T12:00',
      end: '2025-09-10T13:00',
      extendedProps: { note: 'Térdfájdalom kezelése' },
    },
    {
      id: '2',
      title: 'Szabadság',
      start: '2025-09-15T09:00',
      end: '2025-09-15T17:00',
      extendedProps: { note: 'Nincs rendelés' },
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<EventForm>({
    title: '',
    date: '',
    startTime: '12:00',
    endTime: '13:00',
    note: '',
  });
  const [editId, setEditId] = useState<string | null>(null);

  // Új esemény
  const handleDateClick = (info: any) => {
    setForm({
      title: '',
      date: info.dateStr,
      startTime: '12:00',
      endTime: '13:00',
      note: '',
    });
    setEditId(null);
    setShowModal(true);
  };

  // Szerkesztés
  const handleEventClick = (info: any) => {
    const evt = info.event;
    const { date, startTime, endTime } = getDateAndTimes(evt.startStr, evt.endStr);
    setForm({
      title: evt.title,
      date,
      startTime,
      endTime,
      note: evt.extendedProps.note || '',
    });
    setEditId(evt.id);
    setShowModal(true);
  };

  // Mentés
  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const isSuperAdmin = user.role === 'superadmin' || user.login === 'superadmin';

    // Csak superadmin állíthat tegnapi vagy régebbi időpontot
    const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    if (!isSuperAdmin && form.date < todayStr) {
      alert("Csak superadmin állíthat múltbeli (tegnapi vagy régebbi) időpontot!");
      return;
    }

    // Kezdés < befejezés
    if (form.startTime >= form.endTime) {
      alert("Kezdésnek korábbinak kell lennie, mint a befejezésnek!");
      return;
    }

    // Időpont ütközés vizsgálat
    const isOverlap = events.some(ev => {
      if (editId && ev.id === editId) return false;
      const evDate = ev.start.split('T')[0];
      if (evDate !== form.date) return false;
      const newStart = `${form.date}T${form.startTime}`;
      const newEnd = `${form.date}T${form.endTime}`;
      return !(newEnd <= ev.start || newStart >= ev.end);
    });
    if (isOverlap) {
      alert("Időpont ütközik egy másik foglalással!");
      return;
    }

    // Mentés vagy módosítás
    if (editId) {
      setEvents(events.map(ev => 
        ev.id === editId
          ? {
              ...ev,
              title: form.title,
              start: `${form.date}T${form.startTime}`,
              end: `${form.date}T${form.endTime}`,
              extendedProps: { note: form.note },
            }
          : ev
      ));
    } else {
      setEvents([
        ...events,
        {
          id: Math.random().toString(36).substr(2,9),
          title: form.title,
          start: `${form.date}T${form.startTime}`,
          end: `${form.date}T${form.endTime}`,
          extendedProps: { note: form.note },
        },
      ]);
    }
    setShowModal(false);
  };

  // Törlés
  const handleDelete = () => {
    if (editId) {
      setEvents(events.filter(ev => ev.id !== editId));
      setShowModal(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-2 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Időpontfoglalás admin</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="80vh"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        slotMinTime="08:00:00"
        slotMaxTime="21:00:00"
        firstDay={1}
        dayCellContent={renderDayCellContent}
        views={{
          dayGridMonth: {
            eventDisplay: 'list-item',
          },
          timeGridWeek: {
            slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
          },
          timeGridDay: {
            slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
          },
        }}
      />

      {/* Modal */}
      {showModal && (
        <BookingModal
          form={form}
          onChange={setForm}
          onClose={() => setShowModal(false)}
          onSubmit={handleFormSubmit}
          editId={editId}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}