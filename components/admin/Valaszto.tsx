'use client';

import { useEffect, useRef, useState } from 'react';

export type Opcio = {
  ertek: string;
  felirat: string;
  // ha van, színes pont jelzi az opciót — a naptárban ugyanez a szín
  szin?: string;
};

type Props = {
  ertek: string;
  opciok: Opcio[];
  onValt: (ertek: string) => void;
  cimke: string;
};

export default function Valaszto({ ertek, opciok, onValt, cimke }: Props) {
  const [nyitva, setNyitva] = useState(false);
  const dobozRef = useRef<HTMLDivElement>(null);

  const kivalasztott = opciok.find((o) => o.ertek === ertek) ?? opciok[0];

  useEffect(() => {
    if (!nyitva) return;

    const kattintas = (e: MouseEvent) => {
      if (!dobozRef.current?.contains(e.target as Node)) setNyitva(false);
    };
    const billentyu = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNyitva(false);
    };

    document.addEventListener('mousedown', kattintas);
    document.addEventListener('keydown', billentyu);
    return () => {
      document.removeEventListener('mousedown', kattintas);
      document.removeEventListener('keydown', billentyu);
    };
  }, [nyitva]);

  return (
    <div ref={dobozRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={nyitva}
        aria-label={cimke}
        onClick={() => setNyitva((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-50"
      >
        <Jelolo opcio={kivalasztott} />
        <span className="max-w-40 truncate">{kivalasztott?.felirat}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={'h-4 w-4 shrink-0 text-gray-400 transition-transform ' + (nyitva ? 'rotate-180' : '')}
        >
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {nyitva && (
        <ul
          role="listbox"
          aria-label={cimke}
          className="absolute left-0 top-full z-40 mt-2 min-w-56 overflow-hidden rounded-2xl bg-white py-1 shadow-xl ring-1 ring-black/5"
        >
          {opciok.map((o, i) => {
            const aktiv = o.ertek === ertek;
            return (
              <li key={o.ertek} role="option" aria-selected={aktiv}>
                <button
                  type="button"
                  onClick={() => {
                    onValt(o.ertek);
                    setNyitva(false);
                  }}
                  className={
                    'flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 ' +
                    (aktiv ? 'font-semibold text-[#004a6d]' : 'text-gray-800')
                  }
                >
                  <Jelolo opcio={o} />
                  <span className="flex-1 truncate">{o.felirat}</span>
                  {aktiv && (
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4 text-[#004a6d]">
                      <path d="M5 10.5l3.5 3.5L15 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {i < opciok.length - 1 && <div className="mx-4 border-b border-gray-100" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// Egyéni munkatársnál színes pont, a gyűjtő opciónál alakos ikon.
function Jelolo({ opcio }: { opcio?: Opcio }) {
  if (!opcio) return null;

  if (opcio.szin) {
    return (
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ background: opcio.szin }}
      />
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-400">
      <circle cx="7.5" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 15.5c0-2.2 2-3.6 4.5-3.6s4.5 1.4 4.5 3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M13.5 6.2a2.4 2.4 0 010 4.4M15 15.5c0-1.6-.7-2.8-2-3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
