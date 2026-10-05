'use client';

import { useState, useTransition } from 'react';
import { vendegModositas } from '@/app/admin/vendegek/actions';

const INPUT =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#004a6d] focus:outline-none focus:ring-1 focus:ring-[#004a6d]';

export default function VendegUrlap({
  id,
  nev: eredetiNev,
  email: eredetiEmail,
  telefon: eredetiTelefon,
}: {
  id: string;
  nev: string;
  email: string | null;
  telefon: string | null;
}) {
  const [nyitva, setNyitva] = useState(false);
  const [nev, setNev] = useState(eredetiNev);
  const [email, setEmail] = useState(eredetiEmail ?? '');
  const [telefon, setTelefon] = useState(eredetiTelefon ?? '');
  const [uzenet, setUzenet] = useState<string | null>(null);
  const [hiba, setHiba] = useState<string | null>(null);
  const [fut, indit] = useTransition();

  function megse() {
    setNev(eredetiNev);
    setEmail(eredetiEmail ?? '');
    setTelefon(eredetiTelefon ?? '');
    setHiba(null);
    setNyitva(false);
  }

  function mentes(e: React.FormEvent) {
    e.preventDefault();
    setHiba(null);
    setUzenet(null);
    indit(async () => {
      const r = await vendegModositas(id, { nev, email, telefon });
      if (r.ok) {
        setUzenet(r.uzenet);
        setNyitva(false);
      } else {
        setHiba(r.hiba);
      }
    });
  }

  if (!nyitva) {
    return (
      <div className="space-y-2">
        {uzenet && (
          <div
            role="status"
            className="rounded-md border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-800"
          >
            {uzenet}
          </div>
        )}
        <button
          onClick={() => {
            setNyitva(true);
            setUzenet(null);
          }}
          className="text-sm font-medium text-[#004a6d] hover:underline"
        >
          Adatok módosítása
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={mentes} className="rounded-lg border border-gray-200 bg-white p-4">
      {hiba && (
        <div
          role="alert"
          className="mb-3 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700"
        >
          {hiba}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <label>
          <span className="mb-1 block text-xs font-medium text-gray-700">Név</span>
          <input value={nev} onChange={(e) => setNev(e.target.value)} required autoFocus className={INPUT} />
        </label>
        <label>
          <span className="mb-1 block text-xs font-medium text-gray-700">
            E-mail <span className="text-gray-400">(elhagyható)</span>
          </span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} />
        </label>
        <label>
          <span className="mb-1 block text-xs font-medium text-gray-700">Telefonszám</span>
          <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} className={INPUT} />
        </label>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        A javítás a vendég minden foglalására érvényes, a korábbiakra is — nem
        keletkezik másodpéldány.
      </p>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={megse}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Mégse
        </button>
        <button
          type="submit"
          disabled={fut}
          className="rounded-md bg-[#004a6d] px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#003652] disabled:opacity-50"
        >
          {fut ? 'Mentés…' : 'Mentés'}
        </button>
      </div>
    </form>
  );
}
