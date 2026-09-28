'use client';

import { useEffect, useRef } from 'react';

export type MegerositesAdat = {
  cim: string;
  uzenet: string;
  gomb: string;
  // veszélyes művelethez piros gomb: törlés, visszavonhatatlan lépések
  veszelyes?: boolean;
  muvelet: () => void;
};

export default function Megerosites({
  adat,
  onMegse,
}: {
  adat: MegerositesAdat;
  onMegse: () => void;
}) {
  const gombRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gombRef.current?.focus();

    const kezelo = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMegse();
    };
    window.addEventListener('keydown', kezelo);
    return () => window.removeEventListener('keydown', kezelo);
  }, [onMegse]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onClick={onMegse}
      role="presentation"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="megerosites-cim"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h2 id="megerosites-cim" className="text-lg font-bold text-gray-900">
          {adat.cim}
        </h2>

        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">
          {adat.uzenet}
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onMegse}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Mégse
          </button>
          <button
            ref={gombRef}
            type="button"
            onClick={() => {
              adat.muvelet();
              onMegse();
            }}
            className={
              'rounded-md px-5 py-2 text-sm font-semibold text-white transition-colors ' +
              (adat.veszelyes
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#004a6d] hover:bg-[#003652]')
            }
          >
            {adat.gomb}
          </button>
        </div>
      </div>
    </div>
  );
}
