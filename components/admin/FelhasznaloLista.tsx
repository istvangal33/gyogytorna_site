'use client';

import { useState, useTransition } from 'react';
import {
  ujMunkatars,
  lathatosagValtas,
  foglalasJogValtas,
  aktivValtas,
  meghivoUjrakuldes,
  type Szerep,
} from '@/app/admin/felhasznalok/actions';

export type Felhasznalo = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
  canViewAll: boolean;
  canBookOthers: boolean;
  active: boolean;
  van_jelszo: boolean;
  letrehozva: string;
  foglalas_db: number;
};

const INPUT =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#004a6d] focus:outline-none focus:ring-1 focus:ring-[#004a6d]';

export default function FelhasznaloLista({
  felhasznalok,
  sajatId,
}: {
  felhasznalok: Felhasznalo[];
  sajatId: string;
}) {
  const [uzenet, setUzenet] = useState<string | null>(null);
  const [hiba, setHiba] = useState<string | null>(null);
  const [urlapNyitva, setUrlapNyitva] = useState(false);
  const [fut, indit] = useTransition();

  const [nev, setNev] = useState('');
  const [email, setEmail] = useState('');
  const [szerep, setSzerep] = useState<Szerep>('EMPLOYEE');

  function kezel(muvelet: () => Promise<{ ok: boolean; uzenet?: string; hiba?: string }>) {
    indit(async () => {
      const r = await muvelet();
      if (r.ok) {
        setUzenet(r.uzenet ?? 'Kész.');
        setHiba(null);
      } else {
        setHiba(r.hiba ?? 'Ismeretlen hiba.');
        setUzenet(null);
      }
    });
  }

  function letrehozas(e: React.FormEvent) {
    e.preventDefault();
    kezel(async () => {
      const r = await ujMunkatars({ nev, email, szerep });
      if (r.ok) {
        setNev('');
        setEmail('');
        setSzerep('EMPLOYEE');
        setUrlapNyitva(false);
      }
      return r;
    });
  }

  return (
    <div className="space-y-4">
      {uzenet && (
        <div
          role="status"
          className="flex items-start justify-between gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          <span>{uzenet}</span>
          <button onClick={() => setUzenet(null)} aria-label="Bezár" className="text-green-700">
            ×
          </button>
        </div>
      )}

      {hiba && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span>{hiba}</span>
          <button onClick={() => setHiba(null)} aria-label="Bezár" className="text-red-700">
            ×
          </button>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => setUrlapNyitva((v) => !v)}
          className="rounded-md bg-[#004a6d] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#003652]"
        >
          {urlapNyitva ? 'Mégse' : '+ Új munkatárs'}
        </button>
      </div>

      {urlapNyitva && (
        <form onSubmit={letrehozas} className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-gray-900">Új munkatárs</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Név</span>
              <input value={nev} onChange={(e) => setNev(e.target.value)} required className={INPUT} />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">E-mail cím</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={INPUT}
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Szerepkör</span>
              <select
                value={szerep}
                onChange={(e) => setSzerep(e.target.value as Szerep)}
                className={INPUT}
              >
                <option value="EMPLOYEE">Alkalmazott</option>
                <option value="ADMIN">Adminisztrátor</option>
              </select>
            </label>
          </div>

          <p className="mt-3 text-xs text-gray-500">
            A felhasználó jelszó nélkül jön létre. E-mailben kap egy linket, amivel maga
            állítja be — így a jelszavát rajta kívül senki nem ismeri.
          </p>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={fut}
              className="rounded-md bg-[#004a6d] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#003652] disabled:opacity-60"
            >
              {fut ? 'Létrehozás…' : 'Létrehozás és meghívó küldése'}
            </button>
          </div>
        </form>
      )}

      {/* mobilon kártyák — a hét oszlopos táblázatot oldalra görgetni használhatatlan */}
      <ul className="space-y-3 md:hidden">
        {felhasznalok.map((f) => {
          const sajat = f.id === sajatId;
          return (
            <li key={f.id} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">
                    {f.name}
                    {sajat && <span className="ml-2 text-xs text-gray-400">(te)</span>}
                  </p>
                  <p className="wrap-break-word text-xs text-gray-500">{f.email}</p>
                </div>
                <span
                  className={
                    'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ' +
                    (f.role === 'ADMIN'
                      ? 'bg-[#004a6d]/10 text-[#004a6d]'
                      : 'bg-gray-100 text-gray-700')
                  }
                >
                  {f.role === 'ADMIN' ? 'Admin' : 'Alkalmazott'}
                </span>
              </div>

              <dl className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-xs text-gray-500">Látja mindenki foglalását</dt>
                  <dd>
                    {f.role === 'ADMIN' ? (
                      <span className="text-xs text-gray-400">mindig mindent lát</span>
                    ) : (
                      <Kapcsolo
                        be={f.canViewAll}
                        tiltva={fut}
                        onValt={(ertek) => kezel(() => lathatosagValtas(f.id, ertek))}
                        beFelirat="Mindenkiét"
                        kiFelirat="Csak a sajátját"
                      />
                    )}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <dt className="text-xs text-gray-500">Foglalhat másnak</dt>
                  <dd>
                    <Kapcsolo
                      be={f.canBookOthers}
                      tiltva={fut}
                      onValt={(ertek) => kezel(() => foglalasJogValtas(f.id, ertek))}
                      beFelirat="Bárkinek"
                      kiFelirat="Csak magának"
                    />
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <dt className="text-xs text-gray-500">Állapot</dt>
                  <dd className="text-right">
                    <Kapcsolo
                      be={f.active}
                      tiltva={fut || sajat}
                      onValt={(ertek) => kezel(() => aktivValtas(f.id, ertek))}
                      beFelirat="Aktív"
                      kiFelirat="Kikapcsolva"
                    />
                    {!f.van_jelszo && f.active && (
                      <div className="mt-1 text-xs text-amber-700">jelszó még nincs beállítva</div>
                    )}
                  </dd>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <dt className="text-xs text-gray-500">Foglalás</dt>
                  <dd className="text-sm tabular-nums text-gray-700">{f.foglalas_db}</dd>
                </div>
              </dl>

              <button
                disabled={fut || !f.active}
                onClick={() => kezel(() => meghivoUjrakuldes(f.id))}
                className="mt-3 w-full rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-40"
              >
                Jelszó-link küldése
              </button>
            </li>
          );
        })}
      </ul>

      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">
        <table className="w-full min-w-184 text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3 font-medium">Név</th>
              <th className="px-4 py-3 font-medium">Szerepkör</th>
              <th className="px-4 py-3 font-medium">Látja mindenki foglalását</th>
              <th className="px-4 py-3 font-medium">Foglalhat másnak</th>
              <th className="px-4 py-3 font-medium">Állapot</th>
              <th className="px-4 py-3 font-medium">Foglalás</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {felhasznalok.map((f) => {
              const sajat = f.id === sajatId;
              return (
                <tr key={f.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {f.name}
                      {sajat && <span className="ml-2 text-xs text-gray-400">(te)</span>}
                    </div>
                    <div className="text-xs text-gray-500">{f.email}</div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={
                        'rounded-full px-2.5 py-1 text-xs font-medium ' +
                        (f.role === 'ADMIN'
                          ? 'bg-[#004a6d]/10 text-[#004a6d]'
                          : 'bg-gray-100 text-gray-700')
                      }
                    >
                      {f.role === 'ADMIN' ? 'Adminisztrátor' : 'Alkalmazott'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {f.role === 'ADMIN' ? (
                      <span className="text-xs text-gray-400">
                        mindig mindent lát
                      </span>
                    ) : (
                      <Kapcsolo
                        be={f.canViewAll}
                        tiltva={fut}
                        onValt={(ertek) => kezel(() => lathatosagValtas(f.id, ertek))}
                        beFelirat="Mindenkiét látja"
                        kiFelirat="Csak a sajátját"
                      />
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <Kapcsolo
                      be={f.canBookOthers}
                      tiltva={fut}
                      onValt={(ertek) => kezel(() => foglalasJogValtas(f.id, ertek))}
                      beFelirat="Bárkinek"
                      kiFelirat="Csak magának"
                    />
                  </td>

                  <td className="px-4 py-3">
                    <Kapcsolo
                      be={f.active}
                      tiltva={fut || sajat}
                      onValt={(ertek) => kezel(() => aktivValtas(f.id, ertek))}
                      beFelirat="Aktív"
                      kiFelirat="Kikapcsolva"
                    />
                    {!f.van_jelszo && f.active && (
                      <div className="mt-1 text-xs text-amber-700">jelszó még nincs beállítva</div>
                    )}
                  </td>

                  <td className="px-4 py-3 tabular-nums text-gray-700">{f.foglalas_db}</td>

                  <td className="px-4 py-3 text-right">
                    <button
                      disabled={fut || !f.active}
                      onClick={() => kezel(() => meghivoUjrakuldes(f.id))}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-40"
                    >
                      Jelszó-link küldése
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500">
        Mindkét kapcsoló azonnal érvényes — az érintettnek nem kell újra bejelentkeznie.
        A <strong>látás</strong> és a <strong>foglalás joga</strong> külön állítható: lehet
        valaki, aki mindenki naptárát látja, de csak magának vihet fel időpontot.
        Adminisztrátor mindig mindenkiét látja, ezért ott nincs látási kapcsoló.
      </p>
    </div>
  );
}

function Kapcsolo({
  be,
  tiltva,
  onValt,
  beFelirat,
  kiFelirat,
}: {
  be: boolean;
  tiltva?: boolean;
  onValt: (ertek: boolean) => void;
  beFelirat: string;
  kiFelirat: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={be}
      disabled={tiltva}
      onClick={() => onValt(!be)}
      className="group flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span
        className={
          'relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ' +
          (be ? 'bg-[#004a6d]' : 'bg-gray-300')
        }
      >
        <span
          className={
            'absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ' +
            (be ? 'translate-x-4' : 'translate-x-0.5')
          }
        />
      </span>
      <span className={'text-xs ' + (be ? 'font-medium text-gray-900' : 'text-gray-500')}>
        {be ? beFelirat : kiFelirat}
      </span>
    </button>
  );
}
