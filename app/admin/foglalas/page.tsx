'use client';

import { useState, useEffect, useRef } from 'react';
import huLocale from '@fullcalendar/core/locales/hu';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import BookingModal from './BookingModal';
import '../../admin/styles/fullcalendar-overrides.css';

type EventForm = {
  title: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:mm
  endTime: string;    // HH:mm
  note: string;
};

type CalendarEvent = {
  id: string;
  title: string;
  start: string; // ISO
  end: string;   // ISO
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

function bookingToCalendarEvent(booking: BookingFromDb): CalendarEvent {
  return {
    id: booking.id.toString(),
    title: booking.name,
    start: booking.date,
    end: booking.end,
    extendedProps: { note: booking.note || '' },
  };
}

// API
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

// Simulált user
const user = { login: 'istvangal333', role: 'admin' };

// ====== Local idő-formázó segédek ======
const pad2 = (n: number) => n.toString().padStart(2, '0');
function toLocalDateStr(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function toLocalTimeStr(d: Date) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
function plusMinutes(d: Date, minutes: number) {
  const x = new Date(d);
  x.setMinutes(x.getMinutes() + minutes);
  return x;
}

// Napi szám megjelenítés
function renderDayCellContent(args: any) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const cellDateStr = args.date.toISOString().slice(0, 10);
  const isPast = cellDateStr < todayStr;

  return (
    <span
      style={{
        color: isPast ? '#64748b' : '#f1f5f9',
        fontWeight: isPast ? 500 : 600,
        fontSize: '0.75rem'
      }}
    >
      {args.dayNumberText}
    </span>
  );
}

function dayCellClassNames(arg: any) {
  const todayStr = new Date().toISOString().slice(0,10);
  const cellStr = arg.date.toISOString().slice(0,10);
  if (cellStr < todayStr) return ['fc-day-past'];
  return [];
}

// Esemény tartalom: csak óra + név (a képen látható stílus)
function eventContent(arg: any) {
  const name = arg.event.title || '';
  // FullCalendar adja a timeText-et (pl. "09:00")
  const timeText = arg.timeText || (() => {
    const d = arg.event.start;
    if (!d) return '';
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  })();

  const outer = document.createElement('div');
  outer.className = 'fc-card';

  const timeEl = document.createElement('div');
  timeEl.className = 'fc-card-time';
  timeEl.textContent = timeText;

  const nameEl = document.createElement('div');
  nameEl.className = 'fc-card-name';
  nameEl.textContent = name;

  outer.appendChild(timeEl);
  outer.appendChild(nameEl);

  return { domNodes: [outer] };
}

// Dátum címke formázó – a képen látható stílushoz (en-GB)
function formatDateLabel(start: Date, end: Date, viewType: string, locale = 'en-GB') {
  const s = new Date(start);
  const e = new Date(end);
  // FullCalendar end exclusive -> egy nappal vissza
  e.setDate(e.getDate() - 1);

  const fmtDay = new Intl.DateTimeFormat(locale, { day: 'numeric' });
  const fmtMonth = new Intl.DateTimeFormat(locale, { month: 'long' });
  const fmtFull = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' });

  if (viewType === 'timeGridDay' || s.toDateString() === e.toDateString()) {
    return fmtFull.format(s);
  }

  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${fmtDay.format(s)} — ${fmtDay.format(e)} ${fmtMonth.format(e)}`;
  }
  return `${fmtFull.format(s)} — ${fmtFull.format(e)}`;
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

  // Egyedi toolbar állapot
  const calendarRef = useRef<FullCalendar | null>(null);
  const [viewType, setViewType] = useState<'dayGridMonth' | 'timeGridDay' | 'timeGridWeek'>('timeGridWeek');
  const [dateLabel, setDateLabel] = useState<string>('');      // aktuális nézet tartomány címkéje
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // ha rákattintasz egy napra/időre

  // Load bookings
  useEffect(() => {
    async function loadBookings() {
      setLoading(true);
      const bookings = await fetchBookings();
      setEvents(bookings);
      setLoading(false);
    }
    loadBookings();
  }, []);

  // ——— Kattintás napi cellára vagy időslotra ———
  const handleDateClick = (info: any) => {
    const clicked = info.date as Date;
    const isTimeGrid = info.view?.type?.startsWith('timeGrid');

    const startLocal = isTimeGrid ? clicked : new Date(clicked.setHours(12, 0, 0, 0));
    const endLocal = plusMinutes(startLocal, 60);

    // Dátum kapszulába a kattintott nap
    setSelectedDate(startLocal);

    // Month nézetben napra kattintva ugorjunk arra a napra
    if (info.view?.type === 'dayGridMonth') {
      calendarRef.current?.getApi().gotoDate(startLocal);
    }

    // Modal form előtöltés
    setForm({
      title: '',
      date: toLocalDateStr(startLocal),
      startTime: toLocalTimeStr(startLocal),
      endTime: toLocalTimeStr(endLocal),
      note: '',
    });
    setEditId(null);
    setShowModal(true);
  };

  const handleEventClick = (info: any) => {
    const evt = info.event;
    const s = new Date(evt.start!);
    const e = new Date(evt.end!);
    setSelectedDate(s);
    setForm({
      title: evt.title,
      date: toLocalDateStr(s),
      startTime: toLocalTimeStr(s),
      endTime: toLocalTimeStr(e),
      note: evt.extendedProps?.note || '',
    });
    setEditId(evt.id);
    setShowModal(true);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const isSuperAdmin = user.role === 'superadmin' || user.login === 'superadmin';

    const todayStr = new Date().toISOString().slice(0, 10);
    if (!isSuperAdmin && form.date < todayStr) {
      alert("Csak superadmin állíthat múltbeli (tegnapi vagy régebbi) időpontot!");
      return;
    }

    if (form.startTime >= form.endTime) {
      alert("Kezdésnek korábbinak kell lennie, mint a befejezésnek!");
      return;
    }

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

    // Z-s (UTC) tárolás – ha lokális kell, szólj
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
        updatedEvent = await updateBooking(editId, bookingData);
        if (updatedEvent) {
          setEvents(events.map(ev => ev.id === editId ? updatedEvent! : ev));
        } else {
          alert("Hiba történt a módosítás során!");
        }
      } else {
        updatedEvent = await saveBooking(bookingData);
        if (updatedEvent) {
          setEvents([...events, updatedEvent]);
        } else {
          alert("Hiba történt a mentés során!");
        }
      }
      if (updatedEvent) setShowModal(false);
    } catch (error) {
      console.error('Error saving booking:', error);
      alert("Hiba történt a mentés során!");
    } finally {
      setLoading(false);
    }
  };

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

  // Egyedi toolbar akciók
  const changeView = (vt: 'dayGridMonth' | 'timeGridDay' | 'timeGridWeek') => {
    const api = calendarRef.current?.getApi();
    if (api) {
      setSelectedDate(null); // nézetváltáskor vissza a tartomány címkéhez
      api.changeView(vt);
      setViewType(vt);
    }
  };
  const goPrev = () => {
    setSelectedDate(null);
    calendarRef.current?.getApi().prev();
  };
  const goNext = () => {
    setSelectedDate(null);
    calendarRef.current?.getApi().next();
  };

  const displayDateLabel = selectedDate
    ? formatDateLabel(selectedDate, new Date(selectedDate.getTime() + 24 * 3600 * 1000), 'timeGridDay')
    : dateLabel;

  return (
    <div className="h-screen w-full overflow-hidden bg-[rgb(27,27,27)] text-gray-100 flex flex-col">
      <div className="p-4 pb-2 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-wide text-slate-100">
          Időpontfoglalás admin
        </h1>
        {loading && (
          <div className="text-xs text-blue-400 animate-pulse">
            Betöltés...
          </div>
        )}
      </div>

      {/* Egyedi felső sáv: bal Monthly/Daily/Weekly, jobb prev | [ date ] | next */}
      <div className="fc-custom-toolbar">
        <div className="fc-ct-left">
          <div className="ct-btn-group" role="tablist" aria-label="View switcher">
            <button
              type="button"
              className={`ct-btn ${viewType === 'dayGridMonth' ? 'ct-btn-active' : ''}`}
              onClick={() => changeView('dayGridMonth')}
              aria-pressed={viewType === 'dayGridMonth'}
              title="Monthly view"
            >
              Monthly
            </button>
            <button
              type="button"
              className={`ct-btn ${viewType === 'timeGridDay' ? 'ct-btn-active' : ''}`}
              onClick={() => changeView('timeGridDay')}
              aria-pressed={viewType === 'timeGridDay'}
              title="Daily view"
            >
              Daily
            </button>
            <button
              type="button"
              className={`ct-btn ${viewType === 'timeGridWeek' ? 'ct-btn-active' : ''}`}
              onClick={() => changeView('timeGridWeek')}
              aria-pressed={viewType === 'timeGridWeek'}
              title="Weekly view"
            >
              Weekly
            </button>
          </div>
        </div>

        <div className="fc-ct-right">
          <button type="button" className="ct-nav-btn" onClick={goPrev} aria-label="Previous period" title="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="ct-date-pill" aria-live="polite" aria-atomic="true">
            <svg className="ct-date-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="ct-date-text">{displayDateLabel}</span>
          </div>

          <button type="button" className="ct-nav-btn" onClick={goNext} aria-label="Next period" title="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 flex-1 flex flex-col">
        <div className="flex-1">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="timeGridWeek"
            events={events}
            dateClick={handleDateClick}      // slot-kattintás: idő és dátum beemelése
            eventClick={handleEventClick}
            height="100%"
            dayCellContent={renderDayCellContent}
            dayCellClassNames={dayCellClassNames}
            eventContent={eventContent}      // csak óra + név
            expandRows={false}
            firstDay={1}
            headerToolbar={false} // Saját toolbar
            slotMinTime="08:00:00"
            slotMaxTime="21:00:00"
            slotDuration="01:00:00"
            nowIndicator
            allDaySlot={false}
            stickyHeaderDates={false}
            displayEventEnd={true}
            eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
            locales={[huLocale]}
            locale="hu"
            datesSet={(arg) => {
              setViewType(arg.view.type as 'dayGridMonth' | 'timeGridDay' | 'timeGridWeek');
              if (!selectedDate) {
                setDateLabel(formatDateLabel(arg.start, arg.end, arg.view.type));
              }
            }}
            views={{
              dayGridMonth: {
                eventDisplay: 'block',
                eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false }
              },
              timeGridWeek: {
                slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false }
              },
              timeGridDay: {
                slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false }
              },
              listWeek: {}
            }}
          />
        </div>
      </div>

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