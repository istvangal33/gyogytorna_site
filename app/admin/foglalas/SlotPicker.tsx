'use client';

import { useEffect, useMemo, useState } from 'react';

type CalendarEvent = {
  id: string;
  title: string;
  start: string; // YYYY-MM-DDTHH:mm (lokál)
  end: string;   // YYYY-MM-DDTHH:mm (lokál)
  extendedProps?: { note?: string };
};

type BasePayload = {
  name: string;
  phone: string;
  email: string;
  note?: string;
  dateStr: string;
  startTime: string;
  endTime: string;
  // New UTC fields to fix timezone drift
  startAt?: string; // ISO UTC string
  endAt?: string;   // ISO UTC string
};

type Props = {
  mode: 'create' | 'edit';
  date: Date | null;                     // create módban kötelező (a nap)
  eventToEdit?: CalendarEvent | null;    // edit módban kötelező
  events: CalendarEvent[];
  onClose: () => void;
  onCreate: (payload: BasePayload) => void | Promise<void>;
  onUpdate?: (id: string, payload: BasePayload) => void | Promise<void>;
  onDelete?: (id: string) => void | Promise<void>;
};

// ===== Segédek =====
function pad2(n: number) {
  return n.toString().padStart(2, '0');
}
function toLocalDateStr(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return !(aEnd <= bStart || aStart >= bEnd);
}
function formatHumanDate(d: Date) {
  return new Intl.DateTimeFormat('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: 'long',
  }).format(d);
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}
// Hétfő kezdettel: mennyit kell visszalépni a hónap 1-jétől
function mondayIndex(jsDay: number) {
  // JS: 0=V,1=H... -> 1..6,0
  return (jsDay + 6) % 7;
}
function startOfCalendarGrid(d: Date) {
  const first = startOfMonth(d);
  const back = mondayIndex(first.getDay());
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - back);
  return gridStart;
}

// Note visszaparzolása (Tel / Email / Megj.)
function parseCombinedNote(note?: string): { phone?: string; email?: string; restNote?: string } {
  if (!note) return {};
  const phoneMatch = note.match(/Tel:\s*([^|]+)/i);
  const emailMatch = note.match(/Email:\s*([^|]+)/i);
  const megjMatch = note.match(/Megj\.:?\s*(.+)$/i);

  const phone = phoneMatch?.[1]?.trim();
  const email = emailMatch?.[1]?.trim();
  const restNote = megjMatch?.[1]?.trim();

  if (!phone && !email && !restNote) {
    return { restNote: note };
  }
  return { phone, email, restNote };
}

// Egy nap szabad-e (van-e legalább egy üres óra 08–18 között)
function dayHasFreeSlot(
  day: Date,
  events: CalendarEvent[],
  ignoreEventId?: string
) {
  const dateStr = toLocalDateStr(day);
  // csak hétköznap számít
  const wd = day.getDay(); // 0=V,6=Szo
  if (wd === 0 || wd === 6) return false;

  const dayEvents = events.filter(ev => {
    if (ignoreEventId && ev.id === ignoreEventId) return false;
    const ds = new Date(ev.start.replace(' ', 'T'));
    return toLocalDateStr(ds) === dateStr;
  }).map(ev => {
    const ds = new Date(ev.start.replace(' ', 'T'));
    const de = new Date(ev.end.replace(' ', 'T'));
    const s = `${toLocalDateStr(ds)}T${pad2(ds.getHours())}:${pad2(ds.getMinutes())}`;
    const e = `${toLocalDateStr(de)}T${pad2(de.getHours())}:${pad2(de.getMinutes())}`;
    return { start: s, end: e };
  });

  for (let h = 8; h < 18; h++) {
    const s = `${dateStr}T${pad2(h)}:00`;
    const e = `${dateStr}T${pad2(h + 1)}:00`;
    const taken = dayEvents.some(ev => overlaps(s, e, ev.start, ev.end));
    if (!taken) return true;
  }
  return false;
}

export default function SlotPicker({
  mode,
  date,
  eventToEdit,
  events,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
}: Props) {
  // ===== Belső állapot =====
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [selected, setSelected] = useState<string | null>(null); // YYYY-MM-DDTHH:mm

  // Naptár popover állapot
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Aktív nap (választhatóvá téve szerkesztéskor is)
  const [activeDay, setActiveDay] = useState<Date | null>(null);

  // Mini-naptár hónap kurzor (azon hónap, amit nézünk)
  const [monthCursor, setMonthCursor] = useState<Date>(() => {
    const base = mode === 'edit' && eventToEdit
      ? new Date(eventToEdit.start.replace(' ', 'T'))
      : (date ?? new Date());
    return startOfMonth(base);
  });

  // Kezdeti kitöltés + aktív nap beállítás
  useEffect(() => {
    if (mode === 'edit' && eventToEdit) {
      setName(eventToEdit.title || '');
      const parsed = parseCombinedNote(eventToEdit.extendedProps?.note);
      setPhone(parsed.phone || '');
      setEmail(parsed.email || '');
      setNote(parsed.restNote || eventToEdit.extendedProps?.note || '');

      const ds = new Date(eventToEdit.start.replace(' ', 'T'));
      const dayOnly = new Date(ds.getFullYear(), ds.getMonth(), ds.getDate(), 0, 0, 0, 0);
      setActiveDay(dayOnly);
      setMonthCursor(startOfMonth(dayOnly));
      setSelected(null); // ne legyen kijelölve, csak a "saját sáv" legyen sötétszürke
    } else if (mode === 'create') {
      if (date) {
        const dayOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
        setActiveDay(dayOnly);
        setMonthCursor(startOfMonth(dayOnly));
      } else {
        const today = new Date();
        const dayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
        setActiveDay(dayOnly);
        setMonthCursor(startOfMonth(dayOnly));
      }
      setName('');
      setPhone('');
      setEmail('');
      setNote('');
      setSelected(null);
    }
  }, [mode, eventToEdit, date]);

  // Validációk
  const emailValid = useMemo(() => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  const phoneValid = useMemo(() => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7;
  }, [phone]);

  // Modell a kiválasztott naphoz (akkor is lefut, ha activeDay null, csak üres slotlistát ad)
  const model = useMemo(() => {
    if (!activeDay) {
      return {
        humanDate: '',
        dateStr: '',
        slots: [] as { start: string; end: string; label: string; disabled: boolean; isCurrent: boolean }[],
      };
    }

    const wd = activeDay.getDay(); // 0=V,6=Szo
    const dateStr = toLocalDateStr(activeDay);
    const humanDate = formatHumanDate(activeDay);

    if (wd === 0 || wd === 6) {
      return { humanDate, dateStr, slots: [] as { start: string; end: string; label: string; disabled: boolean; isCurrent: boolean }[] };
    }

    const filtered = events.filter(ev => {
      const ds = new Date(ev.start.replace(' ', 'T'));
      return toLocalDateStr(ds) === dateStr;
    });

    // Edit módban a saját esemény ne tiltson
    const compareEvents = filtered.filter(ev => (mode === 'edit' && eventToEdit) ? ev.id !== eventToEdit.id : true);

    // Saját sáv lokális start-end (edit mód)
    let currentStartStr: string | null = null;
    let currentEndStr: string | null = null;
    if (mode === 'edit' && eventToEdit && isSameDay(new Date(eventToEdit.start.replace(' ', 'T')), activeDay)) {
      const s = new Date(eventToEdit.start.replace(' ', 'T'));
      const e = new Date(eventToEdit.end.replace(' ', 'T'));
      currentStartStr = `${dateStr}T${pad2(s.getHours())}:${pad2(s.getMinutes())}`;
      currentEndStr   = `${dateStr}T${pad2(e.getHours())}:${pad2(e.getMinutes())}`;
    }

    const dayEventsLocal = compareEvents.map(ev => {
      const ds = new Date(ev.start.replace(' ', 'T'));
      const de = new Date(ev.end.replace(' ', 'T'));
      const evStartLocal = `${toLocalDateStr(ds)}T${pad2(ds.getHours())}:${pad2(ds.getMinutes())}`;
      const evEndLocal   = `${toLocalDateStr(de)}T${pad2(de.getHours())}:${pad2(de.getMinutes())}`;
      return { start: evStartLocal, end: evEndLocal };
    });

    const slots: { start: string; end: string; label: string; disabled: boolean; isCurrent: boolean }[] = [];
    for (let h = 8; h < 18; h++) {
      const start = `${dateStr}T${pad2(h)}:00`;
      const end   = `${dateStr}T${pad2(h + 1)}:00`;
      const disabled = dayEventsLocal.some(ev => overlaps(start, end, ev.start, ev.end));
      const isCurrent = !!currentStartStr && !!currentEndStr && overlaps(start, end, currentStartStr, currentEndStr);
      slots.push({
        start,
        end,
        label: `${pad2(h)}:00–${pad2(h + 1)}:00`,
        disabled,
        isCurrent,
      });
    }

    return { humanDate, dateStr, slots };
  }, [activeDay, events, mode, eventToEdit]);

  // ===== Mini naptár adatok =====
  // FONTOS: lokális nap-string, ne toISOString().slice(0,10), mert UTC-eltolódást okozhat
  const todayStr = toLocalDateStr(new Date());

  const gridStart = useMemo(() => startOfCalendarGrid(monthCursor), [monthCursor]);

  const days = useMemo(() => {
    const arr: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, [gridStart]);

  // Egy nap állapota a mininaptárban
  const dayState = (d: Date) => {
    const isPast = toLocalDateStr(d) < todayStr;
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const inMonth = d.getMonth() === monthCursor.getMonth();

    // Szabad hely? (edit módban saját eseményt figyelmen kívül hagyjuk)
    const hasFree = !isPast && !isWeekend && dayHasFreeSlot(d, events, mode === 'edit' && eventToEdit ? eventToEdit.id : undefined);
    const isFull = !isPast && !isWeekend && inMonth && !hasFree;

    const isSelected = activeDay ? isSameDay(d, activeDay) : false;

    return { isPast, isWeekend, inMonth, hasFree, isFull, isSelected };
  };

  // Nap kiválasztása
  const pickDay = (d: Date) => {
    const st = dayState(d);
    if (st.isPast || st.isWeekend || !st.inMonth) return;
    setActiveDay(new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0));
    setSelected(null); // új nap -> töröljük a kiválasztott órát
    setCalendarOpen(false);
  };

  // Hónap navigáció
  const prevMonth = () => {
    const m = new Date(monthCursor);
    m.setMonth(m.getMonth() - 1);
    setMonthCursor(startOfMonth(m));
  };
  const nextMonth = () => {
    const m = new Date(monthCursor);
    m.setMonth(m.getMonth() + 1);
    setMonthCursor(startOfMonth(m));
  };

  // Kiválasztható-e a mentés gomb
  const canSubmit =
    name.trim().length > 0 &&
    emailValid &&
    phoneValid &&
    (mode === 'edit' || !!selected);

  // Kijelzett idő
  const selectedLabel = (() => {
    if (selected) {
      const startTime = selected.slice(11, 16);
      const endHour = (Number(startTime.slice(0,2)) + 1).toString().padStart(2,'0');
      return `${startTime}–${endHour}:00`;
    }
    if (mode === 'edit' && eventToEdit) {
      const s = new Date(eventToEdit.start.replace(' ', 'T'));
      const startTime = `${pad2(s.getHours())}:${pad2(s.getMinutes())}`;
      const endHour = (Number(startTime.slice(0,2)) + 1).toString().padStart(2,'0');
      return `${startTime}–${endHour}:00`;
    }
    return '';
  })();

  // Submit payload előállítása
  const buildPayload = (): BasePayload | null => {
    const dateStr = model.dateStr;
    const startTime = selected
      ? selected.slice(11,16)
      : (mode === 'edit' && eventToEdit
          ? (() => {
              const s = new Date(eventToEdit.start.replace(' ', 'T'));
              return `${pad2(s.getHours())}:${pad2(s.getMinutes())}`;
            })()
          : '');
    if (!startTime || !dateStr) return null;
    const endHour = (Number(startTime.slice(0,2)) + 1).toString().padStart(2,'0');
    const endTime = `${endHour}:${startTime.slice(3,5)}`;
    
    // Generate UTC datetime strings to fix timezone drift
    let startAt: string | undefined;
    let endAt: string | undefined;
    
    try {
      // Create local datetime from dateStr and times, then convert to UTC
      const localStart = new Date(`${dateStr}T${startTime}:00`);
      const localEnd = new Date(`${dateStr}T${endTime}:00`);
      
      if (!isNaN(localStart.getTime()) && !isNaN(localEnd.getTime())) {
        startAt = localStart.toISOString();
        endAt = localEnd.toISOString();
      }
    } catch (error) {
      console.warn('Failed to generate UTC timestamps:', error);
    }
    
    return {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      note: note.trim() || undefined,
      dateStr,
      startTime,
      endTime,
      // Include UTC fields for server preference
      startAt,
      endAt,
    };
  };

  // ===== Render =====
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 sm:p-4 md:p-6" aria-modal="true" role="dialog">
      <div className="w-full max-w-sm sm:max-w-3xl lg:max-w-4xl bg-white text-slate-900 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[95vh] sm:max-h-[80vh]">
        {/* Header */}
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-semibold leading-none truncate">Időpont foglalás</h2>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">
              {activeDay && <span className="truncate">{formatHumanDate(activeDay)} • Hétköznap, 08:00–18:00</span>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg px-2 sm:px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-sm shrink-0"
            title="Bezár"
            aria-label="Bezár"
            type="button"
          >
            Bezár
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-5">
            {/* Form section - full width on mobile, left column on desktop */}
            <div className="space-y-4">
              {/* Kiválasztott nap + lenyitható mininaptár */}
              <div className="rounded-xl border border-slate-200 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setCalendarOpen(v => !v)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-100 rounded-xl transition flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs text-slate-500">Kiválasztott nap</div>
                    <div className="text-sm font-medium text-slate-800">{activeDay ? toLocalDateStr(activeDay) : ''}</div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-500 transition-transform ${calendarOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {calendarOpen && (
                  <div className="px-3 pb-3">
                    {/* Naptár fejléce */}
                    <div className="flex items-center justify-between px-1 py-2">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-2 rounded-md hover:bg-slate-100 text-slate-600"
                        aria-label="Előző hónap"
                        title="Előző hónap"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <div className="text-sm font-medium text-slate-700">
                        {new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long' }).format(monthCursor)}
                      </div>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="p-2 rounded-md hover:bg-slate-100 text-slate-600"
                        aria-label="Következő hónap"
                        title="Következő hónap"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>

                    {/* Hétfej */}
                    <div className="grid grid-cols-7 text-[11px] text-slate-500 px-1 mb-1">
                      <div className="text-center">H</div>
                      <div className="text-center">K</div>
                      <div className="text-center">Sze</div>
                      <div className="text-center">Cs</div>
                      <div className="text-center">P</div>
                      <div className="text-center">Szo</div>
                      <div className="text-center">V</div>
                    </div>

                    {/* Napok rácsa */}
                    <div className="grid grid-cols-7 gap-1 px-1 pb-2">
                      {days.map((d) => {
                        const st = dayState(d);
                        const dayNum = d.getDate();
                        const inThisMonth = st.inMonth;

                        // Alap stílus
                        let cls =
                          "w-full aspect-square rounded-full text-sm flex items-center justify-center transition border ";

                        // Elválasztjuk a különböző állapotokat
                        if (!inThisMonth) {
                          cls += "text-slate-300 border-transparent";
                        } else if (st.isPast) {
                          // múltbeli nap: sima, halvány
                          cls += "text-slate-400 border-transparent";
                        } else if (st.isSelected) {
                          cls += "bg-sky-300 text-white border-sky-700 shadow";
                        } else if (st.hasFree) {
                          // van szabad hely: világoskék
                          cls += "bg-sky-200 text-sky-900 border-sky-200 hover:bg-sky-300";
                        } else if (st.isFull) {
                          // nincs szabad hely: sötétkék
                          cls += "bg-sky-900 text-white border-sky-700";
                        } else if (st.isWeekend) {
                          // ugyan nem választható, de ha itt vagyunk: jelöljük halványan
                          cls += "text-slate-400 border-transparent";
                        } else {
                          cls += "text-slate-700 border-slate-200 hover:bg-slate-100";
                        }

                        const disabled = st.isPast || st.isWeekend || !inThisMonth;

                        return (
                          <button
                            key={`${toLocalDateStr(d)}`}
                            type="button"
                            disabled={disabled}
                            onClick={() => pickDay(d)}
                            className={cls + (disabled ? " cursor-not-allowed opacity-60" : "")}
                            title={toLocalDateStr(d)}
                            aria-label={toLocalDateStr(d)}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Név */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Név / megnevezés</label>
                <input
                  type="text"
                  placeholder="Add meg a neved"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              {/* Telefon */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Telefonszám</label>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="+36 30 123 4567"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={[
                    "w-full border rounded-lg px-3 py-2.5 focus:outline-none transition",
                    phone && !phoneValid
                      ? "border-red-300 focus:ring-2 focus:ring-red-500"
                      : "border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  ].join(' ')}
                />
                {phone && !phoneValid && (
                  <p className="mt-1 text-xs text-red-600">Adj meg érvényes telefonszámot.</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <input
                  type="email"
                  inputMode="email"
                  placeholder="nev@pelda.hu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={[
                    "w-full border rounded-lg px-3 py-2.5 focus:outline-none transition",
                    email && !emailValid
                      ? "border-red-300 focus:ring-2 focus:ring-red-500"
                      : "border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  ].join(' ')}
                />
                {email && !emailValid && (
                  <p className="mt-1 text-xs text-red-600">Adj meg érvényes email-címet.</p>
                )}
              </div>

              {/* Megjegyzés */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Megjegyzés (opcionális)</label>
                <textarea
                  placeholder="Pl. sérülés típusa, terápia, egyéb információ"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={3}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
            </div>

            {/* Time slots section - full width on mobile, right column on desktop */}
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">Elérhető időpontok</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                {model.slots.length === 0 && (
                  <div className="col-span-full text-center py-6 text-slate-500 bg-white rounded-lg border border-dashed border-slate-200 text-sm">
                    {activeDay ? "Erre a napra nincs szabad időpont vagy hétvége." : "Válassz egy napot a fenti naptárból."}
                  </div>
                )}
                {model.slots.map(s => {
                  const isSelected = selected === s.start;
                  const base = "w-full py-2.5 px-2 rounded-lg text-sm font-medium transition border min-w-0";

                  // Állapotok:
                  // - s.disabled: más foglalás miatt tiltott (világosszürke)
                  // - s.isCurrent: szerkesztett foglalás saját sávja (sötétszürke)
                  // - isSelected: felhasználó által kiválasztott új sáv (kék)
                  const state = s.disabled
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : s.isCurrent && mode === 'edit' && !isSelected
                    ? "bg-slate-700 text-white border-slate-700"
                    : isSelected
                    ? "bg-sky-600 text-white border-sky-600 shadow-[0_6px_16px_rgba(2,132,199,0.25)]"
                    : "bg-white text-slate-700 border-slate-300 hover:border-sky-400 hover:shadow-sm";

                  return (
                    <button
                      key={s.start}
                      type="button"
                      disabled={s.disabled}
                      onClick={() => setSelected(s.start)}
                      className={`${base} ${state}`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 text-[11px] text-slate-500">
                A foglalt időpontok szürkén jelennek meg. Szerkesztésnél a jelenlegi foglalás sötétszürke. Napot a “Kiválasztott nap” sáv lenyitásával válthatsz.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-5 py-3 sm:py-4 border-t border-slate-200 bg-white rounded-b-xl sm:rounded-b-2xl">
          {mode === 'create' ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-sm text-slate-600 min-h-[1.25rem] text-center sm:text-left">
                {selected ? (
                  <>Kiválasztva: <span className="font-semibold text-slate-900">{selectedLabel}</span></>
                ) : (
                  <>Válassz egy idősávot</>
                )}
              </div>
              <button
                type="button"
                disabled={!canSubmit}
                onClick={async () => {
                  const payload = buildPayload();
                  if (!payload) return;
                  await onCreate(payload);
                }}
                className={[
                  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium transition w-full sm:w-auto",
                  canSubmit
                    ? "bg-sky-600 text-white hover:bg-sky-700 shadow-[0_6px_16px_rgba(2,132,199,0.35)]"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                ].join(' ')}
              >
                Foglalás
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="text-sm text-slate-600 min-h-[1.25rem] text-center sm:text-left">
                {selectedLabel ? (
                  <>Kiválasztva: <span className="font-semibold text-slate-900">{selectedLabel}</span></>
                ) : (
                  <>Válassz egy idősávot vagy módosítsd az adatokat</>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                {eventToEdit && onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(eventToEdit.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium transition bg-red-400 text-white hover:bg-red-900 w-full sm:w-auto"
                  >
                    Törlés
                  </button>
                )}

                {eventToEdit && onUpdate && (
                  <button
                    type="button"
                    disabled={!(name.trim() && emailValid && phoneValid)}
                    onClick={async () => {
                      const payload = buildPayload();
                      if (!payload) return;
                      await onUpdate(eventToEdit.id, payload);
                    }}
                    className={[
                      "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-medium transition w-full sm:w-auto",
                      (name.trim() && emailValid && phoneValid)
                        ? "bg-sky-400 text-white hover:bg-sky-700 shadow-[0_6px_16px_rgba(2,132,199,0.35)]"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    ].join(' ')}
                  >
                    Módosítás
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}