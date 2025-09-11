'use client';

import { useState, useEffect } from 'react';
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

type BookingFromDb = {
  id: number;
  name: string;
  date: string;
  end: string;
  note: string | null;
  createdAt: string;
};

// Convert database booking to calendar event
function bookingToCalendarEvent(booking: BookingFromDb): CalendarEvent {
  return {
    id: booking.id.toString(),
    title: booking.name,
    start: booking.date,
    end: booking.end,
    extendedProps: { note: booking.note || '' },
  };
}

// API functions
async function fetchBookings(): Promise<CalendarEvent[]> {
  try {
    const response = await fetch('/api/bookings');
    if (!response.ok) throw new Error('Failed to fetch bookings');
    const bookings: BookingFromDb[] = await response.json();
    return bookings.map(bookingToCalendarEvent);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

async function saveBooking(data: { name: string; date: string; end: string; note: string }): Promise<CalendarEvent | null> {
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to save booking');
    const booking: BookingFromDb = await response.json();
    return bookingToCalendarEvent(booking);
  } catch (error) {
    console.error('Error saving booking:', error);
    return null;
  }
}

async function updateBooking(id: string, data: { name: string; date: string; end: string; note: string }): Promise<CalendarEvent | null> {
  try {
    const response = await fetch('/api/bookings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    if (!response.ok) throw new Error('Failed to update booking');
    const booking: BookingFromDb = await response.json();
    return bookingToCalendarEvent(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return null;
  }
}

async function deleteBooking(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/bookings?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete booking');
    return true;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
}

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
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<EventForm>({
    title: '',
    date: '',
    startTime: '12:00',
    endTime: '13:00',
    note: '',
  });
  const [editId, setEditId] = useState<string | null>(null);

  // Load bookings from API on component mount
  useEffect(() => {
    async function loadBookings() {
      setLoading(true);
      const bookings = await fetchBookings();
      setEvents(bookings);
      setLoading(false);
    }
    loadBookings();
  }, []);

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
  const handleFormSubmit = async (e: any) => {
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

    // Prepare data for API
    const bookingData = {
      name: form.title,
      date: `${form.date}T${form.startTime}:00Z`,
      end: `${form.date}T${form.endTime}:00Z`,
      note: form.note,
    };

    setLoading(true);
    
    try {
      let updatedEvent: CalendarEvent | null = null;
      
      if (editId) {
        // Update existing booking
        updatedEvent = await updateBooking(editId, bookingData);
        if (updatedEvent) {
          setEvents(events.map(ev => 
            ev.id === editId ? updatedEvent! : ev
          ));
        } else {
          alert("Hiba történt a módosítás során!");
        }
      } else {
        // Create new booking
        updatedEvent = await saveBooking(bookingData);
        if (updatedEvent) {
          setEvents([...events, updatedEvent]);
        } else {
          alert("Hiba történt a mentés során!");
        }
      }
      
      if (updatedEvent) {
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving booking:', error);
      alert("Hiba történt a mentés során!");
    } finally {
      setLoading(false);
    }
  };

  // Törlés
  const handleDelete = async () => {
    if (editId) {
      setLoading(true);
      const success = await deleteBooking(editId);
      if (success) {
        setEvents(events.filter(ev => ev.id !== editId));
        setShowModal(false);
      } else {
        alert("Hiba történt a törlés során!");
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-2 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Időpontfoglalás admin</h1>
      
      {loading && (
        <div className="flex items-center justify-center mb-4">
          <div className="text-blue-600">Betöltés...</div>
        </div>
      )}
      
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