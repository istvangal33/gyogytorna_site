'use client';

import { useState, useTransition } from 'react';
import { munkaidoMentese } from '@/app/admin/felhasznalok/actions';

// A napok számozása a JavaScript getDay() szerinti: 0 = vasárnap. A naptár
// komponens is ezt használja, ezért itt sem térünk el tőle — a sorrendet
// viszont hétfőtől mutatjuk, mert a beosztást így olvassa az ember.
const NAPOK: { ertek: number; nev: string }[] = [
  { ertek: 1, nev: 'Hétfő' },
  { ertek: 2, nev: 'Kedd' },
  { ertek: 3, nev: 'Szerda' },
  { ertek: 4, nev: 'Csütörtök' },
  { ertek: 5, nev: 'Péntek' },
  { ertek: 6, nev: 'Szombat' },
  { ertek: 0, nev: 'Vasárnap' },
];

type Sor = { weekday: number; startMinute: number; endMinute: number };

const percbol = (p: number) =>
  `${String(Math.floor(p / 60)).padStart(2, '0')}:${String(p % 60).padStart(2, '0')}`;

function percbe(ido: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(ido);
  if (!m) return null;
  const o = Number(m[1]);
  const p = Number(m[2]);
  if (o > 23 || p > 59) return null;
  return o * 60 + p;
}

export default function MunkaidoUrlap({
  userId,
  nev,
  beosztas,
}: {
  userId: string;
  nev: string;
  beosztas: Sor[];
}) {
  const [allapot, setAllapot] = useState(() => {
    const kezdo: Record<number, { be: boolean; tol: string; ig: string }> = {};
    for (const n of NAPOK) {
      const meglevo = beosztas.find((b) => b.weekday === n.ertek);
      kezdo[n.ertek] = meglevo
        ? { be: true, tol: percbol(meglevo.startMinute), ig: percbol(meglevo.endMinute) }
        : { be: false, tol: '07:00', ig: '19:00' };
    }
    return kezdo;
  });

  const [uzenet, setUzenet] = useState<string | null>(null);
  const [hiba, setHiba] = useState<string | null>(null);
  const [fut, indit] = useTransition();

  function allit(nap: number, mezo: 'be' | 'tol' | 'ig', ertek: boolean | string) {
    setAllapot((elozo) => ({ ...elozo, [nap]: { ...elozo[nap], [mezo]: ertek } }));
  }

  /** Az első bejelölt nap időpontjait átmásolja a többi bejelölt napra. */
  function mindenhovaUgyanaz() {
    const elso = NAPOK.find((n) => allapot[n.ertek].be);
    if (!elso) return;
    const minta = allapot[elso.ertek];
    setAllapot((elozo) => {
      const uj = { ...elozo };
      for (const n of NAPOK) {
        if (uj[n.ertek].be) uj[n.ertek] = { ...uj[n.ertek], tol: minta.tol, ig: minta.ig };
      }
      return uj;
    });
  }

  function mentes(e: React.FormEvent) {
    e.preventDefault();
    setHiba(null);
    setUzenet(null);

    const napok: Sor[] = [];
    for (const n of NAPOK) {
      const a = allapot[n.ertek];
      if (!a.be) continue;

      const tol = percbe(a.tol);
      const ig = percbe(a.ig);
      if (tol === null || ig === null) {
        setHiba(`${n.nev}: hibás időpont.`);
        return;
      }
      if (ig <= tol) {
        setHiba(`${n.nev}: a vége nem lehet korábban, mint a kezdete.`);
        return;
      }
      napok.push({ weekday: n.ertek, startMinute: tol, endMinute: ig });
    }

    indit(async () => {
      const r = await munkaidoMentese(userId, napok);
      if (r.ok) setUzenet(r.uzenet);
      else setHiba(r.hiba);
    });
  }

  const munkanapok = NAPOK.filter((n) => allapot[n.ertek].be).length;

  return (
    <form onSubmit={mentes} className="space-y-4">
      {uzenet && (
        <div
          role="status"
          className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {uzenet}
        </div>
      )}
      {hiba && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {hiba}
        </div>
      )}

      <div className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white">
        {NAPOK.map((n) => {
          const a = allapot[n.ertek];
          return (
            <div
              key={n.ertek}
              className="flex flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap"
            >
              <label className="flex w-32 shrink-0 items-center gap-2">
                <input
                  type="checkbox"
                  checked={a.be}
                  onChange={(e) => allit(n.ertek, 'be', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#004a6d] focus:ring-[#004a6d]"
                />
                <span
                  className={
                    'text-sm font-medium ' + (a.be ? 'text-gray-900' : 'text-gray-400')
                  }
                >
                  {n.nev}
                </span>
              </label>

              {a.be ? (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={a.tol}
                    onChange={(e) => allit(n.ertek, 'tol', e.target.value)}
                    aria-label={`${n.nev} kezdés`}
                    className="rounded-md border border-gray-300 px-2 py-1.5 text-sm tabular-nums text-gray-900 focus:border-[#004a6d] focus:outline-none focus:ring-1 focus:ring-[#004a6d]"
                  />
                  <span className="text-gray-400">–</span>
                  <input
                    type="time"
                    value={a.ig}
                    onChange={(e) => allit(n.ertek, 'ig', e.target.value)}
                    aria-label={`${n.nev} befejezés`}
                    className="rounded-md border border-gray-300 px-2 py-1.5 text-sm tabular-nums text-gray-900 focus:border-[#004a6d] focus:outline-none focus:ring-1 focus:ring-[#004a6d]"
                  />
                </div>
              ) : (
                <span className="text-sm text-gray-400">szabadnap</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-gray-500">
          {munkanapok === 0 ? (
            <span className="text-amber-700">
              Egyetlen munkanap sincs — {nev} nevére nem lehet időpontot felajánlani.
            </span>
          ) : (
            <>
              {munkanapok} munkanap.{' '}
              <button
                type="button"
                onClick={mindenhovaUgyanaz}
                className="font-medium text-[#004a6d] hover:underline"
              >
                Mindegyikre ugyanaz az idő
              </button>
            </>
          )}
        </div>
        <button
          type="submit"
          disabled={fut}
          className="rounded-md bg-[#004a6d] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#003652] disabled:opacity-50"
        >
          {fut ? 'Mentés…' : 'Beosztás mentése'}
        </button>
      </div>

      <p className="text-xs text-gray-500">
        A beosztás módosítása a már felvett foglalásokat nem törli és nem mozdítja
        el — csak azt szabja meg, hogy ezután hova lehet újat felvenni.
      </p>
    </form>
  );
}
