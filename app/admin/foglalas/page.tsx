'use client';

import { useState, useEffect, useRef } from 'react';
import huLocale from '@fullcalendar/core/locales/hu';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import SlotPicker from './SlotPicker';
import '../../admin/styles/fullcalendar-overrides.css';

type CalendarEvent = {
  id: string;
  title: string;
  start: string; // ISO (lokál, sec nélkül is ok)
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
  // New FullCalendar-compatible fields
  start?: string;
  startAt?: string;
  endAt?: string;
  allDay?: boolean;
};

function bookingToCalendarEvent(booking: BookingFromDb): CalendarEvent {
  // Use FullCalendar-compatible 'start' field if available, fallback to legacy 'date' field
  const startTime = booking.start || booking.date;
  let endTime = booking.end;
  
  // Add fallback for missing end time (60 minutes default)
  if (!endTime && startTime) {
    const startDate = new Date(startTime);
    if (!isNaN(startDate.getTime())) {
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 60 minutes
      endTime = endDate.toISOString();
      
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Booking ${booking.id} missing end time, using default 60-minute duration`);
      }
    }
  }
  
  // Add diagnostics for development
  if (process.env.NODE_ENV !== 'production') {
    if (!startTime) {
      console.warn(`Booking ${booking.id} missing start/date field:`, booking);
    }
    if (!endTime) {
      console.warn(`Booking ${booking.id} missing end field:`, booking);
    }
    
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    if (isNaN(startDate.getTime())) {
      console.warn(`Booking ${booking.id} has invalid start time:`, startTime);
    }
    if (isNaN(endDate.getTime())) {
      console.warn(`Booking ${booking.id} has invalid end time:`, endTime);
    }
  }
  
  return {
    id: booking.id.toString(),
    title: booking.name,
    start: startTime,
    end: endTime,
    extendedProps: { note: booking.note || '' },
  };
}

// ====== Segédek ======
const pad2 = (n: number) => n.toString().padStart(2, '0');
function toLocalDateStr(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function toLocalTimeStr(d: Date) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
function overlapsStr(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return !(aEnd <= bStart || aStart >= bEnd);
}

// Note összefűzés (amíg nincs külön phone/email mező a backendben)
function buildCombinedNote(phone?: string, email?: string, restNote?: string) {
  const parts: string[] = [];
  if (phone && phone.trim()) parts.push(`Tel: ${phone.trim()}`);
  if (email && email.trim()) parts.push(`Email: ${email.trim()}`);
  if (restNote && restNote.trim()) parts.push(`Megj.: ${restNote.trim()}`);
  return parts.join(' | ');
}

// ===== API =====
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

async function saveBooking(data: Record<string, unknown>): Promise<CalendarEvent | null> {
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

async function updateBooking(id: string, data: Record<string, unknown>): Promise<CalendarEvent | null> {
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

// ===== Komponens =====
export default function AdminFoglalas() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // SlotPicker modal
  const [slotMode, setSlotMode] = useState<'create' | 'edit'>('create');
  const [slotOpen, setSlotOpen] = useState(false);
  const [slotDate, setSlotDate] = useState<Date | null>(null);
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null);

  // Toolbar
  const calendarRef = useRef<FullCalendar | null>(null);
  const [viewType, setViewType] = useState<'dayGridMonth' | 'timeGridDay' | 'timeGridWeek'>('timeGridWeek');
  const [dateLabel, setDateLabel] = useState<string>('');

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

  // Napra kattintás -> új foglalás SlotPickerrel
  const handleDateClick = (info: any) => {
    const clicked = info.date as Date;
    const day = new Date(clicked.getFullYear(), clicked.getMonth(), clicked.getDate(), 0, 0, 0, 0);

    const wd = day.getDay(); // 0=V,6=Szo
    if (wd === 0 || wd === 6) return;

    setEventToEdit(null);
    setSlotDate(day);
    setSlotMode('create');
    setSlotOpen(true);
  };

  // Eseményre kattintás -> SlotPicker szerkesztés módban
  const handleEventClick = (info: any) => {
    const evt = info.event;
    const s = new Date(evt.start!);
    const e = new Date(evt.end!);

    // FONTOS: lokális, nem UTC! (ne használj toISOString())
    const startLocal = `${toLocalDateStr(s)}T${toLocalTimeStr(s)}`;
    const endLocal = `${toLocalDateStr(e)}T${toLocalTimeStr(e)}`;

    setEventToEdit({
      id: evt.id,
      title: evt.title,
      start: startLocal,
      end: endLocal,
      extendedProps: { note: evt.extendedProps?.note || '' },
    });
    setSlotDate(new Date(toLocalDateStr(s))); // a nap beállításához
    setSlotMode('edit');
    setSlotOpen(true);
  };

  // Létrehozás a SlotPickerből
  const handleCreate = async (payload: {
    name: string;
    phone: string;
    email: string;
    note?: string;
    dateStr: string;
    startTime: string;
    endTime: string;
    startAt?: string; // UTC
    endAt?: string;   // UTC
  }) => {
    const combinedNote = buildCombinedNote(payload.phone, payload.email, payload.note);

    // Ütközésvédelem
    const newStart = `${payload.dateStr}T${payload.startTime}`;
    const newEnd = `${payload.dateStr}T${payload.endTime}`;
    const isOverlap = events.some(ev => {
      const evDate = ev.start.split('T')[0];
      if (evDate !== payload.dateStr) return false;
      return overlapsStr(newStart, newEnd, ev.start.slice(0,16), ev.end.slice(0,16));
    });
    if (isOverlap) {
      alert('Időpont ütközik egy másik foglalással!');
      return;
    }

    setLoading(true);
    try {
      // Use new API format with preference for UTC fields
      const requestData: Record<string, unknown> = {
        name: payload.name,
        note: combinedNote,
        // Legacy fields for backward compatibility
        dateStr: payload.dateStr,
        startTime: payload.startTime,
        endTime: payload.endTime,
        date: `${payload.dateStr}T${payload.startTime}:00`,
        end: `${payload.dateStr}T${payload.endTime}:00`,
      };
      
      // Include UTC fields if available (preferred)
      if (payload.startAt && payload.endAt) {
        requestData.startAt = payload.startAt;
        requestData.endAt = payload.endAt;
      }
      
      const created = await saveBooking(requestData);
      if (created) {
        setEvents(prev => [...prev, created]);
        setSlotOpen(false);
        setSlotDate(null);
      } else {
        alert('Hiba történt a mentés során!');
      }
    } finally {
      setLoading(false);
    }
  };

  // Módosítás a SlotPickerből
  const handleUpdate = async (id: string, payload: {
    name: string;
    phone: string;
    email: string;
    note?: string;
    dateStr: string;
    startTime: string;
    endTime: string;
    startAt?: string; // UTC
    endAt?: string;   // UTC
  }) => {
    const combinedNote = buildCombinedNote(payload.phone, payload.email, payload.note);

    const newStart = `${payload.dateStr}T${payload.startTime}`;
    const newEnd = `${payload.dateStr}T${payload.endTime}`;
    const isOverlap = events.some(ev => {
      if (ev.id === id) return false;
      const evDate = ev.start.split('T')[0];
      if (evDate !== payload.dateStr) return false;
      return overlapsStr(newStart, newEnd, ev.start.slice(0,16), ev.end.slice(0,16));
    });
    if (isOverlap) {
      alert('Időpont ütközik egy másik foglalással!');
      return;
    }

    setLoading(true);
    try {
      // Use new API format with preference for UTC fields
      const requestData: Record<string, unknown> = {
        name: payload.name,
        note: combinedNote,
        // Legacy fields for backward compatibility
        dateStr: payload.dateStr,
        startTime: payload.startTime,
        endTime: payload.endTime,
        date: `${payload.dateStr}T${payload.startTime}:00`,
        end: `${payload.dateStr}T${payload.endTime}:00`,
      };
      
      // Include UTC fields if available (preferred)
      if (payload.startAt && payload.endAt) {
        requestData.startAt = payload.startAt;
        requestData.endAt = payload.endAt;
      }
      
      const updated = await updateBooking(id, requestData);
      if (updated) {
        setEvents(prev => prev.map(e => e.id === id ? updated : e));
        setSlotOpen(false);
        setEventToEdit(null);
      } else {
        alert('Hiba történt a módosítás során!');
      }
    } finally {
      setLoading(false);
    }
  };

  // Törlés a SlotPickerből
  const handleDelete = async (id: string) => {
    if (!confirm('Biztosan törlöd ezt a foglalást?')) return;
    setLoading(true);
    try {
      const ok = await deleteBooking(id);
      if (ok) {
        setEvents(prev => prev.filter(e => e.id !== id));
        setSlotOpen(false);
        setEventToEdit(null);
      } else {
        alert('Hiba történt a törlés során!');
      }
    } finally {
      setLoading(false);
    }
  };

  // Responsive handling
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toolbar akciók
  const changeView = (vt: 'dayGridMonth' | 'timeGridDay' | 'timeGridWeek') => {
    const api = calendarRef.current?.getApi();
    if (api) {
      api.changeView(vt);
      setViewType(vt);
    }
  };
  const goPrev = () => {
    calendarRef.current?.getApi().prev();
  };
  const goNext = () => {
    calendarRef.current?.getApi().next();
  };

  const displayDateLabel = dateLabel;

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

      {/* Egyedi felső sáv */}
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
              {isMobile ? 'Hónap' : 'Monthly'}
            </button>
            <button
              type="button"
              className={`ct-btn ${viewType === 'timeGridDay' ? 'ct-btn-active' : ''}`}
              onClick={() => changeView('timeGridDay')}
              aria-pressed={viewType === 'timeGridDay'}
              title="Daily view"
            >
              {isMobile ? 'Nap' : 'Daily'}
            </button>
            <button
              type="button"
              className={`ct-btn ${viewType === 'timeGridWeek' ? 'ct-btn-active' : ''}`}
              onClick={() => changeView('timeGridWeek')}
              aria-pressed={viewType === 'timeGridWeek'}
              title="Weekly view"
            >
              {isMobile ? 'Hét' : 'Weekly'}
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
            initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="100%"
            contentHeight="auto"
            expandRows={true}
            dayCellContent={renderDayCellContent}
            dayCellClassNames={dayCellClassNames}
            eventContent={eventContent}
            firstDay={1}
            headerToolbar={false}
            // Timezone and time settings
            timeZone="Europe/Budapest"
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
            slotDuration="01:00:00"
            weekends={false}
            businessHours={{
              startTime: '08:00',
              endTime: '18:00',
            }}
            nowIndicator
            allDaySlot={false}
            stickyHeaderDates={false}
            displayEventEnd={true}
            eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
            locales={[huLocale]}
            locale="hu"
            datesSet={(arg) => {
              setViewType(arg.view.type as 'dayGridMonth' | 'timeGridDay' | 'timeGridWeek');
              setDateLabel(formatDateLabel(arg.start, arg.end, arg.view.type));
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
              }
            }}
          />
        </div>
      </div>

      {/* Új foglalás / Szerkesztés – SlotPicker panel */}
      {slotOpen && (
        <SlotPicker
          mode={slotMode}
          date={slotDate}
          events={events}
          eventToEdit={eventToEdit}
          onClose={() => {
            setSlotOpen(false);
            setSlotDate(null);
            setEventToEdit(null);
          }}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
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

// Esemény kártya: csak óra + név
function eventContent(arg: any) {
  const name = arg.event.title || '';
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

// Dátum címke formázó
function formatDateLabel(start: Date, end: Date, viewType: string, locale = 'en-GB') {
  const s = new Date(start);
  const e = new Date(end);
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