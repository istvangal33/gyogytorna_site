'use client';

import { useMemo, useState, useTransition } from 'react';
import { arakMentese } from '@/app/admin/felhasznalok/actions';

type Szolgaltatas = {
  id: string;
  nev: string;
  arlistaAr: number;
  perc: number;
};

const INPUT =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm tabular-nums text-gray-900 focus:border-[#004a6d] focus:outline-none focus:ring-1 focus:ring-[#004a6d]';

const forint = (n: number) => new Intl.NumberFormat('hu-HU').format(n) + ' Ft';

export default function ArakUrlap({
  userId,
  nev,
  szolgaltatasok,
  sajatArak,
}: {
  userId: string;
  nev: string;
  szolgaltatasok: Szolgaltatas[];
  sajatArak: Record<string, number>;
}) {
  // A mezők szövegként élnek: az üres mező jelenti azt, hogy "az árlista szerint".
  const [ertekek, setErtekek] = useState<Record<string, string>>(() => {
    const kezdo: Record<string, string> = {};
    for (const sz of szolgaltatasok) {
      kezdo[sz.id] = sajatArak[sz.id] !== undefined ? String(sajatArak[sz.id]) : '';
    }
    return kezdo;
  });

  const [uzenet, setUzenet] = useState<string | null>(null);
  const [hiba, setHiba] = useState<string | null>(null);
  const [fut, indit] = useTransition();

  // Hány szolgáltatásnál tér el az ár? Ebből látszik egy pillantásra, hogy
  // ez a munkatárs az árlistát követi-e, vagy saját árai vannak.
  const elteresek = useMemo(
    () => Object.values(ertekek).filter((v) => v.trim() !== '').length,
    [ertekek]
  );

  // Az időtartam szerinti csoportok: tipikusan "minden 30 perces ennyi".
  const hosszak = useMemo(() => {
    const h = new Set(szolgaltatasok.map((s) => s.perc).filter((p) => p > 0));
    return [...h].sort((a, b) => a - b);
  }, [szolgaltatasok]);

  function csoportKitoltes(perc: number, ar: string) {
    setErtekek((elozo) => {
      const uj = { ...elozo };
      for (const sz of szolgaltatasok) if (sz.perc === perc) uj[sz.id] = ar;
      return uj;
    });
  }

  function mentes(e: React.FormEvent) {
    e.preventDefault();
    setHiba(null);
    setUzenet(null);

    const arak: { serviceId: string; ar: number | null }[] = [];
    for (const sz of szolgaltatasok) {
      const nyers = (ertekek[sz.id] ?? '').replace(/\s/g, '');
      if (nyers === '') {
        arak.push({ serviceId: sz.id, ar: null });
        continue;
      }
      const szam = Number(nyers);
      if (!Number.isInteger(szam) || szam < 0) {
        setHiba(`A(z) „${sz.nev}" ára nem érvényes szám.`);
        return;
      }
      arak.push({ serviceId: sz.id, ar: szam });
    }

    indit(async () => {
      const r = await arakMentese(userId, arak);
      if (r.ok) setUzenet(r.uzenet);
      else setHiba(r.hiba);
    });
  }

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

      {hosszak.length > 0 && (
        <div className="rounded-lg bg-gray-50 px-4 py-3">
          <p className="text-sm font-medium text-gray-700">Kitöltés időtartam szerint</p>
          <p className="mt-0.5 text-xs text-gray-500">
            Ha {nev} minden azonos hosszúságú kezelést ugyanannyiért ad, itt egy
            lépésben kitöltheted. Utána bármelyik sor külön felülírható.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {hosszak.map((perc) => (
              <div key={perc} className="flex items-center gap-1.5">
                <span className="text-sm text-gray-600">{perc} perc:</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Ft"
                  className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm tabular-nums"
                  onChange={(e) => csoportKitoltes(perc, e.target.value.trim())}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Telefonon kártyák: a három oszlop 340 px-en annyira összenyomódik,
          hogy a szolgáltatás neve betűnként tördelődik, az ár pedig kettétörik. */}
      <ul className="space-y-2 md:hidden">
        {szolgaltatasok.map((sz) => {
          const sajat = (ertekek[sz.id] ?? '').trim();
          const elter = sajat !== '' && Number(sajat) !== sz.arlistaAr;
          return (
            <li key={sz.id} className="rounded-lg border border-gray-200 bg-white p-3">
              <p className="font-medium text-gray-900">{sz.nev}</p>
              <p className="mt-0.5 text-xs text-gray-500">
                {sz.perc > 0 && <>{sz.perc} perc · </>}
                árlista: <span className="tabular-nums">{forint(sz.arlistaAr)}</span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={ertekek[sz.id] ?? ''}
                  onChange={(e) =>
                    setErtekek((elozo) => ({ ...elozo, [sz.id]: e.target.value }))
                  }
                  placeholder="árlista szerint"
                  aria-label={`${sz.nev} ára`}
                  className={INPUT + (elter ? ' border-[#004a6d] font-semibold' : '')}
                />
                <span className="shrink-0 text-sm text-gray-500">Ft</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-2 font-medium">Szolgáltatás</th>
              <th className="px-4 py-2 text-right font-medium">Árlista</th>
              <th className="px-4 py-2 text-right font-medium">{nev} ára</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {szolgaltatasok.map((sz) => {
              const sajat = (ertekek[sz.id] ?? '').trim();
              const elter = sajat !== '' && Number(sajat) !== sz.arlistaAr;
              return (
                <tr key={sz.id}>
                  <td className="px-4 py-2.5">
                    <div className="font-medium text-gray-900">{sz.nev}</div>
                    {sz.perc > 0 && (
                      <div className="text-xs text-gray-500">{sz.perc} perc</div>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-500">
                    {forint(sz.arlistaAr)}
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={ertekek[sz.id] ?? ''}
                      onChange={(e) =>
                        setErtekek((elozo) => ({ ...elozo, [sz.id]: e.target.value }))
                      }
                      placeholder="árlista szerint"
                      aria-label={`${sz.nev} ára`}
                      className={INPUT + (elter ? ' border-[#004a6d] font-semibold' : '')}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          {elteresek === 0
            ? 'Jelenleg mindenhol az árlistát követi.'
            : `${elteresek} szolgáltatásnál tér el az árlistától.`}
        </p>
        <button
          type="submit"
          disabled={fut}
          className="rounded-md bg-[#004a6d] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#003652] disabled:opacity-50"
        >
          {fut ? 'Mentés…' : 'Árak mentése'}
        </button>
      </div>

      <p className="text-xs text-gray-500">
        A már meglévő foglalásokat ez nem érinti: rájuk az ár a foglaláskor
        rámásolódott, és ott is marad.
      </p>
    </form>
  );
}
