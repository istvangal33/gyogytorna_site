'use client';

import { savKiosztas } from '@/lib/atfedes';
import {
  NAP_ROVID,
  ORA_KEZD,
  ORA_VEG,
  ferosorok,
  ora,
  percOffset,
  szolgaltatasRovid,
  ugyanaznap,
  type Foglalas,
  type Munkaido,
  type Munkatars,
  type Szin,
  type Tavollet,
} from './naptar-alap';

// A heti rács dobozai szűkebbek és alacsonyabbak a napi nézeténél, ezért
// saját méretekkel számolnak. Lásd a ferosorok() magyarázatát.
const DOBOZ_MARGO = 4; //   py-0.5 fent-lent
const DOBOZ_ELSO_SOR = 13; // idő + név
const DOBOZ_ALSO_SOR = 12; // szolgáltatás

type Props = {
  napok: Date[];
  foglalasok: Foglalas[];
  tavolletek: Tavollet[];
  munkaidok: Munkaido[];
  munkatarsak: Munkatars[];
  most: Date;
  pxPerOra: number;
  toltes: boolean;
  szinhez: (staffId: string) => Szin;
  onFoglalas: (f: Foglalas) => void;
  onUresHely: (nap: Date, perc: number) => void;
  onNapValasztas: (nap: Date) => void;
};

type Sav = { kezdet: number; veg: number };

// Az egymásba érő sávokat összevonja, hogy a munkaidő-háttér ne rétegződjön
// egymásra több munkatárs esetén.
function osszevonas(savok: Sav[]): Sav[] {
  const rendezett = [...savok].sort((a, b) => a.kezdet - b.kezdet);
  const ki: Sav[] = [];
  for (const s of rendezett) {
    const utolso = ki[ki.length - 1];
    if (utolso && s.kezdet <= utolso.veg) utolso.veg = Math.max(utolso.veg, s.veg);
    else ki.push({ ...s });
  }
  return ki;
}

export default function HetiRacs({
  napok,
  foglalasok,
  tavolletek,
  munkaidok,
  munkatarsak,
  most,
  pxPerOra,
  toltes,
  szinhez,
  onFoglalas,
  onUresHely,
  onNapValasztas,
}: Props) {
  const pxPerPerc = pxPerOra / 60;
  const magassag = (ORA_VEG - ORA_KEZD) * pxPerOra;
  const orak = Array.from({ length: ORA_VEG - ORA_KEZD }, (_, i) => ORA_KEZD + i);
  const lathatoIdk = new Set(munkatarsak.map((m) => m.id));

  // A napok szerinti csoportosítás a helyi dátum alapján megy, nem eltelt idő
  // szerint: óraátállítás napján is a jó oszlopba kerül a foglalás.
  const napiFoglalasok = (d: Date) =>
    foglalasok
      .filter((f) => lathatoIdk.has(f.staffId) && ugyanaznap(new Date(f.kezdet), d))
      .sort((a, b) => a.kezdet.localeCompare(b.kezdet));

  const napiTavolletek = (d: Date) =>
    tavolletek.filter(
      (t) =>
        (t.staffId === null || lathatoIdk.has(t.staffId)) &&
        new Date(t.kezdet) < napVege(d) &&
        new Date(t.veg) > d
    );

  const napiMunkaido = (d: Date) =>
    osszevonas(
      munkaidok
        .filter((m) => m.weekday === d.getDay() && lathatoIdk.has(m.staffId))
        .map((m) => ({ kezdet: m.startMinute, veg: m.endMinute }))
    );

  return (
    <>
      {/* ---------------- asztali rács ---------------- */}
      <div className="hidden sm:block">
        <div className="flex border-b border-gray-200">
          <div className="w-14 shrink-0" />
          {napok.map((d) => {
            const ma = ugyanaznap(d, most);
            return (
              <button
                key={d.toISOString()}
                onClick={() => onNapValasztas(d)}
                title="Váltás napi nézetre"
                className="min-w-0 flex-1 border-l border-gray-200 px-1 py-2 text-center transition-colors hover:bg-gray-50"
              >
                <span className="block text-[11px] font-medium uppercase tracking-wide text-gray-500">
                  {NAP_ROVID[d.getDay()]}
                </span>
                <span
                  className={
                    'mx-auto mt-0.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ' +
                    (ma ? 'bg-[#004a6d] text-white' : 'text-gray-900')
                  }
                >
                  {d.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex pt-3">
          <div className="w-14 shrink-0" style={{ height: magassag }}>
            {orak.map((o) => (
              <div key={o} className="relative" style={{ height: pxPerOra }}>
                <span className="absolute -top-2 right-2 text-[11px] tabular-nums text-gray-400">
                  {String(o).padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>

          {napok.map((d) => {
            const ma = ugyanaznap(d, most);
            const lista = napiFoglalasok(d);
            const elhelyezve = savKiosztas(
              lista.map((f) => ({
                f,
                kezdet: percOffset(new Date(f.kezdet)),
                veg: percOffset(new Date(f.veg)),
              }))
            );

            return (
              <div
                key={d.toISOString()}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const perc = Math.max(
                    0,
                    Math.round((e.clientY - rect.top) / pxPerPerc / 15) * 15
                  );
                  onUresHely(d, ORA_KEZD * 60 + perc);
                }}
                className="relative min-w-0 flex-1 cursor-pointer border-l border-gray-200"
                style={{
                  height: magassag,
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, #f1f5f9 0px, #f1f5f9 1px, transparent 1px, transparent ' +
                    pxPerOra +
                    'px)',
                }}
              >
                {/* rendelési idő */}
                {napiMunkaido(d).map((mi, k) => (
                  <div
                    key={k}
                    className="absolute inset-x-0 bg-[#004a6d]"
                    style={{
                      top: (mi.kezdet - ORA_KEZD * 60) * pxPerPerc,
                      height: (mi.veg - mi.kezdet) * pxPerPerc,
                      opacity: 0.05,
                    }}
                  />
                ))}

                {/* távollét */}
                {napiTavolletek(d).map((t) => {
                  const top = Math.max(0, percOffset(new Date(t.kezdet)) * pxPerPerc);
                  const also = Math.min(magassag, percOffset(new Date(t.veg)) * pxPerPerc);
                  if (also <= 0 || top >= magassag) return null;
                  return (
                    <div
                      key={t.id}
                      title={t.ok ?? 'Szabadság'}
                      className="absolute inset-x-0"
                      style={{
                        top,
                        height: also - top,
                        background:
                          'repeating-linear-gradient(45deg, #fee2e2 0px, #fee2e2 6px, #fecaca 6px, #fecaca 12px)',
                        opacity: 0.8,
                      }}
                    />
                  );
                })}

                {/* foglalások */}
                {elhelyezve.map(({ f, kezdet, veg, sav, savok }) => {
                  const szin = szinhez(f.staffId);
                  const lemondva = f.allapot === 'CANCELLED';
                  const magas = Math.max(18, (veg - kezdet) * pxPerPerc);
                  const sorok = ferosorok(magas, {
                    margo: DOBOZ_MARGO,
                    elsoSor: DOBOZ_ELSO_SOR,
                    tovabbiSor: DOBOZ_ALSO_SOR,
                    max: 3,
                  });
                  return (
                    <button
                      key={f.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFoglalas(f);
                      }}
                      title={`${ora(new Date(f.kezdet))} · ${f.vendeg} · ${f.szolgaltatas}`}
                      className="absolute overflow-hidden rounded px-1 py-0.5 text-left text-white transition-[filter] hover:z-10 hover:brightness-110"
                      style={{
                        top: kezdet * pxPerPerc,
                        height: magas,
                        left: `calc(${(sav / savok) * 100}% + 2px)`,
                        width: `calc(${100 / savok}% - 4px)`,
                        background: lemondva ? '#94a3b8' : szin.alap,
                        borderLeft: `3px solid ${lemondva ? '#64748b' : szin.sotet}`,
                        opacity: lemondva ? 0.75 : 1,
                      }}
                    >
                      <span
                        className={
                          'flex items-baseline gap-1 leading-[13px] ' +
                          (lemondva ? 'line-through' : '')
                        }
                      >
                        <span className="shrink-0 text-[10px] tabular-nums opacity-90">
                          {ora(new Date(f.kezdet))}
                        </span>
                        <span className="truncate text-[11px] font-semibold">
                          {f.allapot === 'COMPLETED' && '✓ '}
                          {f.allapot === 'NO_SHOW' && '✗ '}
                          {f.vendeg}
                          {sorok === 1 && (
                            <span className="font-normal opacity-90">
                              {' · '}
                              {szolgaltatasRovid(f.szolgaltatas)}
                            </span>
                          )}
                        </span>
                      </span>
                      {sorok > 1 && (
                        <span
                          className={
                            'block text-[10px] leading-[12px] opacity-90 ' +
                            (sorok > 2 ? 'line-clamp-2' : 'truncate')
                          }
                        >
                          {szolgaltatasRovid(f.szolgaltatas)}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* aktuális idő vonala csak a mai oszlopban */}
                {ma &&
                  percOffset(most) >= 0 &&
                  percOffset(most) * pxPerPerc <= magassag && (
                    <div
                      className="pointer-events-none absolute inset-x-0 z-20 h-px bg-red-600"
                      style={{ top: percOffset(most) * pxPerPerc }}
                    >
                      <span className="absolute -left-0.5 -top-1 h-2 w-2 rounded-full bg-red-600" />
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- mobil: napokra bontott lista ---------------- */}
      <div className="divide-y divide-gray-100 sm:hidden">
        {napok.map((d) => {
          const lista = napiFoglalasok(d);
          const ma = ugyanaznap(d, most);
          return (
            <div key={d.toISOString()} className="px-3 py-2.5">
              <button
                onClick={() => onNapValasztas(d)}
                className="flex w-full items-baseline justify-between gap-3 text-left"
              >
                <span
                  className={
                    'text-sm font-semibold ' + (ma ? 'text-[#004a6d]' : 'text-gray-900')
                  }
                >
                  {NAP_ROVID[d.getDay()]} · {d.getDate()}.
                  {ma && <span className="ml-1.5 text-[11px] font-medium">ma</span>}
                </span>
                <span className="shrink-0 text-xs text-gray-400">
                  {lista.length > 0
                    ? lista.length + ' foglalás'
                    : toltes
                      ? 'betöltés…'
                      : 'nincs foglalás'}
                </span>
              </button>

              {lista.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {lista.map((f) => {
                    const szin = szinhez(f.staffId);
                    const lemondva = f.allapot === 'CANCELLED';
                    return (
                      <li key={f.id}>
                        <button
                          onClick={() => onFoglalas(f)}
                          className="flex w-full items-start gap-2 rounded-md bg-gray-50 p-2 text-left"
                          style={{
                            borderLeft: `3px solid ${lemondva ? '#94a3b8' : szin.alap}`,
                          }}
                        >
                          <span className="w-11 shrink-0 text-xs tabular-nums text-gray-500">
                            {ora(new Date(f.kezdet))}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={
                                'block truncate text-sm font-medium text-gray-900 ' +
                                (lemondva ? 'line-through' : '')
                              }
                            >
                              {f.allapot === 'COMPLETED' && '✓ '}
                              {f.allapot === 'NO_SHOW' && '✗ '}
                              {f.vendeg}
                            </span>
                            <span className="block truncate text-xs text-gray-500">
                              {f.szolgaltatas}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function napVege(d: Date) {
  const v = new Date(d);
  v.setDate(v.getDate() + 1);
  v.setHours(0, 0, 0, 0);
  return v;
}
