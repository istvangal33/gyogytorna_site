'use client';

import { useState, useTransition } from 'react';
import {
  szolgaltatasModositas,
  szolgaltatasLetrehozas,
  type SzolgaltatasAdat,
} from '@/app/admin/szolgaltatasok/actions';

export type Szolgaltatas = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  durationMin: number;
  blockMin: number;
  bookable: boolean;
  active: boolean;
  foglalas_db: number;
};

const INPUT =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#004a6d] focus:outline-none focus:ring-1 focus:ring-[#004a6d]';

const forint = (n: number) => new Intl.NumberFormat('hu-HU').format(n) + ' Ft';

const URES: SzolgaltatasAdat = {
  name: '',
  description: null,
  price: 0,
  durationMin: 50,
  blockMin: 60,
  bookable: true,
  active: true,
};

export default function SzolgaltatasLista({
  szolgaltatasok,
}: {
  szolgaltatasok: Szolgaltatas[];
}) {
  const [szerkesztett, setSzerkesztett] = useState<string | null>(null);
  const [ujNyitva, setUjNyitva] = useState(false);
  const [urlap, setUrlap] = useState<SzolgaltatasAdat>(URES);
  const [uzenet, setUzenet] = useState<string | null>(null);
  const [hiba, setHiba] = useState<string | null>(null);
  const [fut, indit] = useTransition();

  function szerkesztesInditasa(sz: Szolgaltatas) {
    setUjNyitva(false);
    setSzerkesztett(sz.id);
    setUrlap({
      name: sz.name,
      description: sz.description,
      price: sz.price,
      durationMin: sz.durationMin,
      blockMin: sz.blockMin,
      bookable: sz.bookable,
      active: sz.active,
    });
    setUzenet(null);
    setHiba(null);
  }

  function mentes(e: React.FormEvent) {
    e.preventDefault();
    setUzenet(null);
    setHiba(null);
    indit(async () => {
      const r = szerkesztett
        ? await szolgaltatasModositas(szerkesztett, urlap)
        : await szolgaltatasLetrehozas(urlap);
      if (r.ok) {
        setUzenet(r.uzenet);
        setSzerkesztett(null);
        setUjNyitva(false);
        setUrlap(URES);
      } else {
        setHiba(r.hiba);
      }
    });
  }

  const szam = (ertek: number, mezo: keyof SzolgaltatasAdat) => (
    <input
      type="text"
      inputMode="numeric"
      value={String(ertek)}
      onChange={(e) => {
        const n = e.target.value.replace(/\s/g, '');
        setUrlap((p) => ({ ...p, [mezo]: n === '' ? 0 : Number(n) || 0 }));
      }}
      className={INPUT + ' tabular-nums'}
    />
  );

  return (
    <div className="space-y-4">
      {uzenet && (
        <div role="status" className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {uzenet}
        </div>
      )}
      {hiba && (
        <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {hiba}
        </div>
      )}

      {!ujNyitva && !szerkesztett && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setUjNyitva(true);
              setUrlap(URES);
              setUzenet(null);
              setHiba(null);
            }}
            className="rounded-md bg-[#004a6d] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#003652]"
          >
            + Új szolgáltatás
          </button>
        </div>
      )}

      {(ujNyitva || szerkesztett) && (
        <form onSubmit={mentes} className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
          <h2 className="mb-4 font-semibold text-gray-900">
            {szerkesztett ? 'Szolgáltatás módosítása' : 'Új szolgáltatás'}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-medium text-gray-700">Név</span>
              <input
                value={urlap.name}
                onChange={(e) => setUrlap((p) => ({ ...p, name: e.target.value }))}
                required
                autoFocus
                className={INPUT}
              />
            </label>

            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Leírás <span className="text-gray-400">(nem kötelező)</span>
              </span>
              <input
                value={urlap.description ?? ''}
                onChange={(e) => setUrlap((p) => ({ ...p, description: e.target.value || null }))}
                className={INPUT}
              />
            </label>

            <label>
              <span className="mb-1 block text-sm font-medium text-gray-700">Ár (Ft)</span>
              {szam(urlap.price, 'price')}
            </label>

            <label>
              <span className="mb-1 block text-sm font-medium text-gray-700">Kezelés hossza (perc)</span>
              {szam(urlap.durationMin, 'durationMin')}
            </label>

            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Naptárban elfoglalt idő (perc)
              </span>
              {szam(urlap.blockMin, 'blockMin')}
              <span className="mt-1 block text-xs text-gray-500">
                Ennyi helyet foglal a naptárban: a kezelés és az utána szükséges
                átállás együtt. Nem lehet rövidebb a kezelésnél.
              </span>
            </label>
          </div>

          {szerkesztett && (
            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={urlap.bookable}
                  onChange={(e) => setUrlap((p) => ({ ...p, bookable: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 text-[#004a6d] focus:ring-[#004a6d]"
                />
                <span className="text-sm text-gray-700">
                  Foglalható
                  <span className="ml-1 text-xs text-gray-500">
                    — megjelenik a foglalási űrlap választékában
                  </span>
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={urlap.active}
                  onChange={(e) => setUrlap((p) => ({ ...p, active: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 text-[#004a6d] focus:ring-[#004a6d]"
                />
                <span className="text-sm text-gray-700">
                  Aktív
                  <span className="ml-1 text-xs text-gray-500">
                    — a kivezetett szolgáltatás eltűnik a választékból, de a régi
                    foglalásokon olvasható marad
                  </span>
                </span>
              </label>
            </div>
          )}

          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setSzerkesztett(null);
                setUjNyitva(false);
                setHiba(null);
              }}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Mégse
            </button>
            <button
              type="submit"
              disabled={fut}
              className="rounded-md bg-[#004a6d] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#003652] disabled:opacity-50"
            >
              {fut ? 'Mentés…' : 'Mentés'}
            </button>
          </div>
        </form>
      )}

      {/* Telefonon kártyák: a táblázat öt oszlopa 340 px-en egymásra csúszna,
          és a végén lévő oszlop le is lógna a képernyőről. */}
      <ul className="space-y-3 md:hidden">
        {szolgaltatasok.map((sz) => (
          <li
            key={sz.id}
            className={
              'rounded-lg border border-gray-200 p-4 ' +
              (sz.active ? 'bg-white' : 'bg-gray-50')
            }
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={'font-medium ' + (sz.active ? 'text-gray-900' : 'text-gray-400')}>
                  {sz.name}
                </p>
                <p className="mt-0.5 text-sm tabular-nums text-gray-700">
                  {forint(sz.price)}
                  <span className="text-gray-400"> · </span>
                  {sz.durationMin} perc
                  {sz.blockMin !== sz.durationMin && (
                    <span className="text-gray-500"> ({sz.blockMin} a naptárban)</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => szerkesztesInditasa(sz)}
                className="shrink-0 text-sm font-medium text-[#004a6d] hover:underline"
              >
                Módosítás
              </button>
            </div>

            {sz.description && (
              <p className="mt-2 text-xs text-gray-500">{sz.description}</p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
              <span>{sz.foglalas_db} foglalás</span>
              {!sz.active && <span className="text-gray-400">kivezetve</span>}
              {sz.active && !sz.bookable && <span className="text-gray-400">nem foglalható</span>}
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">Szolgáltatás</th>
              <th className="px-4 py-2.5 text-right font-medium">Ár</th>
              <th className="px-4 py-2.5 text-right font-medium">Hossz</th>
              <th className="px-4 py-2.5 text-right font-medium">Foglalás</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {szolgaltatasok.map((sz) => (
              <tr key={sz.id} className={sz.active ? '' : 'bg-gray-50 text-gray-400'}>
                <td className="px-4 py-3">
                  <div className={'font-medium ' + (sz.active ? 'text-gray-900' : 'text-gray-400')}>
                    {sz.name}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    {!sz.active && <span>kivezetve</span>}
                    {sz.active && !sz.bookable && <span>nem foglalható</span>}
                    {sz.description && <span>{sz.description}</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{forint(sz.price)}</td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-500">
                  {sz.durationMin} perc
                  {sz.blockMin !== sz.durationMin && (
                    <span className="block text-xs">{sz.blockMin} a naptárban</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-500">{sz.foglalas_db}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => szerkesztesInditasa(sz)}
                    className="text-sm font-medium text-[#004a6d] hover:underline"
                  >
                    Módosítás
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500">
        Szolgáltatást törölni nem lehet: a foglalások hivatkoznak rá, és a
        törlés az előzményeket tenné értelmezhetetlenné. Helyette vedd ki az
        &bdquo;Aktív&rdquo; pipát — eltűnik a választékból, a régi foglalásokon viszont
        továbbra is látszik, mi történt.
      </p>
    </div>
  );
}
