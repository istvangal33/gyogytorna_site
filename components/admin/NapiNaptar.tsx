'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import UjFoglalasUrlap, { type Szolgaltatas, type Szerkesztendo } from './UjFoglalasUrlap';
import {
  allapotValtas,
  foglalasTorles,
  sorozatLemondas,
  sorozatAllapota,
} from '@/app/admin/naptar/actions';
import Megerosites, { type MegerositesAdat } from './Megerosites';
import Valaszto from './Valaszto';

import HetiRacs from './HetiRacs';
import {
  ALLAPOT_FELIRAT,
  NAP_ROVID,
  ORA_KEZD,
  ORA_VEG,
  SZINEK,
  ferosorok,
  hetNapjai,
  napKezdete,
  ora,
  percOffset,
  szolgaltatasRovid,
  ugyanaznap,
  type Foglalas,
  type Munkaido,
  type Munkatars,
  type Tavollet,
} from './naptar-alap';

export type { Munkaido };

type Adat = {
  lathatMindent: boolean;
  munkatarsak: Munkatars[];
  foglalasok: Foglalas[];
  tavolletek: Tavollet[];
};

// A nézetbeállítások a böngészőben maradnak meg — megjelenítési beállítások,
// nem jogosultság: azt mondják meg, most mit akar látni, nem azt, mit szabad.
const NEZET_KULCS = 'naptar-nezet-szuro';
const NEZET_TIPUS_KULCS = 'naptar-nezet-tipus';
const PX_PER_ORA_MOBIL = 48;
const PX_PER_ORA_ASZTALI = 64;
// Heti nézetben 13 óra × 64 px már nem fér ki egy képernyőre, ezért sűrűbb.
const PX_PER_ORA_HET = 48;

// A foglalásdoboz belső méretei. Azért vannak kézzel kimérve, mert a kiférő
// sorok számát ebből számoljuk — ha az osztályokban átírod a sormagasságot,
// ezeket is írd át vele.
const DOBOZ_MARGO = 4; //   py-[2px] fent-lent
const DOBOZ_ELSO_SOR = 14; // idő + név
const DOBOZ_ALSO_SOR = 13; // szolgáltatás

type Nezet = 'nap' | 'het';

type Props = {
  munkaidok: Munkaido[];
  szolgaltatasok: Szolgaltatas[];
  /** Munkatársanként eltérő árak: { munkatársId: { szolgáltatásId: ár } } */
  arak: Record<string, Record<string, number>>;
  lathatMindent: boolean;
  foglalhatMasnak: boolean;
  admin: boolean;
  sajatId: string;
};

export default function NapiNaptar({
  munkaidok,
  szolgaltatasok,
  arak,
  lathatMindent,
  foglalhatMasnak,
  admin,
  sajatId,
}: Props) {
  const [nap, setNap] = useState(() => napKezdete(new Date()));
  // a fejlécsort kézzel görgetjük a törzzsel együtt, hogy ne csússzanak szét
  const fejlecRef = useRef<HTMLDivElement>(null);
  const [adat, setAdat] = useState<Adat | null>(null);
  const [toltes, setToltes] = useState(true);
  const [hiba, setHiba] = useState<string | null>(null);
  const [kivalasztott, setKivalasztott] = useState<Foglalas | null>(null);
  const [most, setMost] = useState(() => new Date());
  const [ujFoglalasAdat, setUjFoglalasAdat] = useState<{ staffId: string; kezdet: string } | null>(null);
  const [uzenet, setUzenet] = useState<string | null>(null);
  const [szerkesztendo, setSzerkesztendo] = useState<Szerkesztendo | null>(null);
  const [muvelet, setMuvelet] = useState(false);
  const [megerosites, setMegerosites] = useState<MegerositesAdat | null>(null);
  // Hányadik alkalom a sorozatban? Külön kérdezzük le, mert a naptár
  // válaszában csak a sorozat címkéje jön, a sorszám nem.
  const [sorozatInfo, setSorozatInfo] = useState<{ hanyadik: number; osszesen: number } | null>(null);
  const [nezetSzuro, setNezetSzuro] = useState('');
  const [nezet, setNezet] = useState<Nezet>('nap');
  // Mobilon sűrűbb óraskála, különben a nap háromszor akkora, mint a képernyő.
  const [keskeny, setKeskeny] = useState(false);

  const napok = useMemo(() => hetNapjai(nap), [nap]);
  const hetiNezet = nezet === 'het';

  const betolt = useCallback(async (mikor: Date, mit: Nezet) => {
    setToltes(true);
    // Heti nézetben a teljes hetet kérjük le egyben, hétfőtől vasárnapig.
    const kezdet = mit === 'het' ? hetNapjai(mikor)[0] : napKezdete(mikor);
    const veg = new Date(kezdet);
    veg.setDate(veg.getDate() + (mit === 'het' ? 7 : 1));
    veg.setHours(0, 0, 0, 0);

    try {
      const p = new URLSearchParams({ kezdet: kezdet.toISOString(), veg: veg.toISOString() });
      const res = await fetch('/api/admin/naptar?' + p.toString());
      if (!res.ok) throw new Error('betoltes');
      setAdat(await res.json());
      setHiba(null);
    } catch {
      setHiba('A foglalásokat nem sikerült betölteni.');
    } finally {
      setToltes(false);
    }
  }, []);

  useEffect(() => {
    betolt(nap, nezet);
  }, [nap, nezet, betolt]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const frissit = () => setKeskeny(mq.matches);
    frissit();
    mq.addEventListener('change', frissit);
    return () => mq.removeEventListener('change', frissit);
  }, []);

  // korábban választott nézet visszaállítása
  useEffect(() => {
    try {
      const mentett = window.localStorage.getItem(NEZET_KULCS);
      if (mentett) setNezetSzuro(mentett);
      if (window.localStorage.getItem(NEZET_TIPUS_KULCS) === 'het') setNezet('het');
    } catch {
      // privát ablakban a tároló elérése kivételt dobhat — ilyenkor marad a "Mindenki"
    }
  }, []);

  function nezetTipusValtas(uj: Nezet) {
    setNezet(uj);
    setKivalasztott(null);
    try {
      window.localStorage.setItem(NEZET_TIPUS_KULCS, uj);
    } catch {
      // a mentés elmaradhat, a nézet ettől még működik
    }
  }

  function nezetValtas(ertek: string) {
    setNezetSzuro(ertek);
    setKivalasztott(null);
    try {
      if (ertek) window.localStorage.setItem(NEZET_KULCS, ertek);
      else window.localStorage.removeItem(NEZET_KULCS);
    } catch {
      // a mentés elmaradhat, a nézet ettől még működik
    }
  }

  // az aktuális idő vonalát percenként léptetjük
  useEffect(() => {
    const id = setInterval(() => setMost(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const osszesMunkatars = adat?.munkatarsak ?? [];

  // Ha a kiválasztott munkatárs aznap nincs a listában (például nem dolgozik),
  // inkább mindenkit mutatunk, mint egy üres naptárat.
  const szurtMunkatarsak =
    nezetSzuro && osszesMunkatars.some((m) => m.id === nezetSzuro)
      ? osszesMunkatars.filter((m) => m.id === nezetSzuro)
      : osszesMunkatars;

  const munkatarsak = szurtMunkatarsak;

  // A szín a munkatárs teljes listabeli helyéhez kötődik, nem a megjelenítettéhez
  // — így a nézet szűkítésekor sem vált színt senki.
  const szinhez = (staffId: string) => {
    const i = osszesMunkatars.findIndex((m) => m.id === staffId);
    return SZINEK[(i < 0 ? 0 : i) % SZINEK.length];
  };

  // a datetime-local mezo helyi idot var, ezert nem toISOString-et hasznalunk
  function helyiIdoString(d: Date) {
    const p = (n: number) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + 'T' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function nyitUjFoglalas(staffId: string, percNapKezdettol: number, mikor: Date = nap) {
    const d = new Date(mikor);
    d.setHours(0, percNapKezdettol, 0, 0);
    setUjFoglalasAdat({ staffId, kezdet: helyiIdoString(d) });
    setKivalasztott(null);
  }

  // Heti nézetben az oszlop a napot jelöli, nem a munkatársat, ezért nekünk
  // kell megtippelni, kinek szól a foglalás. Aki csak magának foglalhat, annak
  // mindig ő maga; a többieknél az űrlapon átállítható.
  function hetiUresHely(d: Date, perc: number) {
    if (!foglalhatMasnak) {
      nyitUjFoglalas(sajatId, perc, d);
      return;
    }
    const cel =
      munkatarsak.find((m) => m.id === sajatId)?.id ?? munkatarsak[0]?.id ?? sajatId;
    nyitUjFoglalas(cel, perc, d);
  }

  async function allapotraVegrehajt(fogl: Foglalas, allapot: Foglalas['allapot']) {
    setMuvelet(true);
    const r = await allapotValtas(fogl.id, allapot);
    setMuvelet(false);
    if (!r.ok) { setHiba(r.hiba); return; }
    // Ha a vendégnek szóló levél nem ment ki, azt ki kell írni: a foglalás
    // állapota megváltozott, de a vendég nem tud róla.
    if (r.figyelmeztetes) { setHiba(r.figyelmeztetes); setUzenet(null); }
    else { setHiba(null); setUzenet('Az állapot módosítva.'); }
    setKivalasztott(null);
    betolt(nap, nezet);
  }

  function allapotra(fogl: Foglalas, allapot: Foglalas['allapot']) {
    // A lemondás levelet küld a vendégnek, ezért rákérdezünk. A többi
    // állapotváltás belső adminisztráció, ott nincs mit megerősíteni.
    if (allapot !== 'CANCELLED') {
      allapotraVegrehajt(fogl, allapot);
      return;
    }

    const mikor = new Intl.DateTimeFormat('hu-HU', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(fogl.kezdet));

    setMegerosites({
      cim: 'Foglalás lemondása',
      uzenet:
        fogl.vendeg + ' időpontja: ' + mikor + '.\n\n' +
        'A vendég értesítést kap róla e-mailben, és a naptárbejegyzése is törlődik. ' +
        'Az idősáv felszabadul, a foglalás nyoma viszont megmarad a rendszerben.',
      gomb: 'Lemondás',
      muvelet: () => allapotraVegrehajt(fogl, 'CANCELLED'),
    });
  }

  async function torlesVegrehajt(fogl: Foglalas) {
    setMuvelet(true);
    const r = await foglalasTorles(fogl.id);
    setMuvelet(false);
    if (!r.ok) { setHiba(r.hiba); return; }
    setHiba(null);
    setUzenet('A foglalás törölve.');
    setKivalasztott(null);
    betolt(nap, nezet);
  }

  function sorozatLemondasa(fogl: Foglalas) {
    setMegerosites({
      cim: 'A sorozat hátralévő alkalmai',
      uzenet:
        fogl.vendeg + ' ettől az alkalomtól kezdve minden hátralévő időpontja lemondásra kerül.\n\n' +
        'A megtörtént alkalmakat nem érinti. A vendég EGY értesítőt kap, ' +
        'ami a naptárában az egész sorozatot visszavonja.',
      gomb: 'Hátralévők lemondása',
      veszelyes: true,
      muvelet: async () => {
        setMuvelet(true);
        const r = await sorozatLemondas(fogl.id);
        setMuvelet(false);
        if (!r.ok) { setHiba(r.hiba); return; }
        setHiba(null);
        setUzenet(r.figyelmeztetes ?? 'A sorozat hátralévő alkalmai lemondva.');
        setKivalasztott(null);
        betolt(nap, nezet);
      },
    });
  }

  function torles(fogl: Foglalas) {
    setMegerosites({
      cim: 'Foglalás végleges törlése',
      uzenet:
        fogl.vendeg + ' foglalásának törlése végleges, és nem marad nyoma.\n\n' +
        'Ha a vendég mondta le, inkább a „Lemondva” gombot használd — az megőrzi az előzményt.',
      gomb: 'Törlés',
      veszelyes: true,
      muvelet: () => torlesVegrehajt(fogl),
    });
  }

  function szerkesztesInditasa(fogl: Foglalas) {
    setSzerkesztendo({
      id: fogl.id,
      vendeg: fogl.vendeg,
      email: fogl.email,
      serviceId: fogl.serviceId,
      megjegyzes: fogl.megjegyzes,
      ar: fogl.ar,
    });
    setUjFoglalasAdat({ staffId: fogl.staffId, kezdet: helyiIdoString(new Date(fogl.kezdet)) });
    setKivalasztott(null);
  }

  function lepNap(mennyi: number) {
    const uj = new Date(nap);
    uj.setDate(uj.getDate() + mennyi);
    setNap(napKezdete(uj));
    setKivalasztott(null);
  }

  const PX_PER_ORA = hetiNezet
    ? PX_PER_ORA_HET
    : keskeny
      ? PX_PER_ORA_MOBIL
      : PX_PER_ORA_ASZTALI;
  const PX_PER_PERC = PX_PER_ORA / 60;

  const orak = Array.from({ length: ORA_VEG - ORA_KEZD }, (_, i) => ORA_KEZD + i);
  const magassag = (ORA_VEG - ORA_KEZD) * PX_PER_ORA;
  useEffect(() => {
    let ervenyes = true;
    if (!kivalasztott?.seriesId) { setSorozatInfo(null); return; }
    sorozatAllapota(kivalasztott.id).then((r) => { if (ervenyes) setSorozatInfo(r); });
    return () => { ervenyes = false; };
  }, [kivalasztott]);

  const maVan = ugyanaznap(nap, most);
  const mostOffset = percOffset(most) * PX_PER_PERC;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      {/* fejléc: hónap és léptetés */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="order-1 flex items-center gap-2">
          <button
            onClick={() => setNap(napKezdete(new Date()))}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Ma
          </button>

          <div className="inline-flex rounded-md border border-gray-300 p-0.5">
            {(['nap', 'het'] as const).map((n) => (
              <button
                key={n}
                onClick={() => nezetTipusValtas(n)}
                aria-pressed={nezet === n}
                className={
                  'rounded px-2.5 py-1 text-sm font-medium transition-colors ' +
                  (nezet === n
                    ? 'bg-[#004a6d] text-white'
                    : 'text-gray-600 hover:bg-gray-100')
                }
              >
                {n === 'nap' ? 'Nap' : 'Hét'}
              </button>
            ))}
          </div>
        </div>

        <div className="order-3 flex w-full items-center justify-center gap-2 sm:order-2 sm:w-auto sm:gap-3">
          <button
            onClick={() => lepNap(-7)}
            aria-label="Előző hét"
            className="rounded-md px-2 py-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            ‹
          </button>
          <h2 className="min-w-40 text-center text-sm font-semibold text-gray-900 sm:min-w-44 sm:text-base">
            {hetiNezet
              ? hetFelirat(napok)
              : new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long' }).format(nap)}
          </h2>
          <button
            onClick={() => lepNap(7)}
            aria-label="Következő hét"
            className="rounded-md px-2 py-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            ›
          </button>
        </div>

        <button
          onClick={() => {
            setSzerkesztendo(null);
            const cel = foglalhatMasnak ? (munkatarsak[0]?.id ?? sajatId) : sajatId;
            nyitUjFoglalas(cel, 9 * 60);
          }}
          disabled={munkatarsak.length === 0}
          className="order-2 shrink-0 whitespace-nowrap rounded-md bg-[#004a6d] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#003652] disabled:opacity-50 sm:order-3"
        >
          + Új foglalás
        </button>
      </div>

      {/* heti sáv: napválasztó — heti nézetben a rács saját fejléce veszi át */}
      {!hetiNezet && (
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {napok.map((d) => {
          const aktiv = ugyanaznap(d, nap);
          const ma = ugyanaznap(d, most);
          return (
            <button
              key={d.toISOString()}
              onClick={() => {
                setNap(napKezdete(d));
                setKivalasztott(null);
              }}
              className="flex flex-col items-center gap-1 py-2 transition-colors hover:bg-gray-100"
            >
              <span className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                {NAP_ROVID[d.getDay()]}
              </span>
              <span
                className={
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ' +
                  (aktiv
                    ? 'bg-[#004a6d] text-white'
                    : ma
                      ? 'text-[#004a6d] ring-1 ring-[#004a6d]'
                      : 'text-gray-700')
                }
              >
                {d.getDate()}
              </span>
            </button>
          );
        })}
      </div>
      )}

      {uzenet && (
        <div role="status" className="flex items-start justify-between gap-3 border-b border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800 sm:px-4">
          <span>{uzenet}</span>
          <button onClick={() => setUzenet(null)} aria-label="Bezár" className="text-green-700 hover:text-green-900">
            ×
          </button>
        </div>
      )}

      {hiba && (
        <div role="alert" className="border-b border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 sm:px-4">
          {hiba}
        </div>
      )}

      {munkaidok.length === 0 && (
        <div className="border-b border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 sm:px-4">
          Munkaidő még nincs beállítva, ezért a naptár nem jelöli, mikor lehet foglalni.
        </div>
      )}

      {osszesMunkatars.length > 1 && (
        <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-2 sm:px-4">
          <span className="text-xs font-medium text-gray-500">Megjelenítés</span>
          <Valaszto
            cimke="Megjelenített munkatárs"
            ertek={nezetSzuro}
            onValt={nezetValtas}
            opciok={[
              { ertek: '', felirat: 'Mindenki' },
              ...osszesMunkatars.map((m) => ({
                ertek: m.id,
                felirat: m.nev,
                szin: szinhez(m.id).alap,
              })),
            ]}
          />
        </div>
      )}

      {hetiNezet && (
        <HetiRacs
          napok={napok}
          foglalasok={adat?.foglalasok ?? []}
          tavolletek={adat?.tavolletek ?? []}
          munkaidok={munkaidok}
          munkatarsak={munkatarsak}
          most={most}
          pxPerOra={PX_PER_ORA}
          toltes={toltes}
          szinhez={szinhez}
          onFoglalas={setKivalasztott}
          onUresHely={hetiUresHely}
          onNapValasztas={(d) => {
            setNap(napKezdete(d));
            nezetTipusValtas('nap');
          }}
        />
      )}

      {/* munkatárs-fejlécek — a törzzsel együtt csúsznak, ha sok az oszlop */}
      {!hetiNezet && (
      <>
      <div ref={fejlecRef} className="flex overflow-x-hidden border-b border-gray-200">
        <div className="w-11 shrink-0 sm:w-14" />
        {munkatarsak.length === 0 ? (
          <div className="flex-1 px-4 py-3 text-sm text-gray-400">
            {toltes ? 'Betöltés…' : 'Nincs megjeleníthető munkatárs.'}
          </div>
        ) : (
          munkatarsak.map((m) => {
            const szin = szinhez(m.id);
            return (
              <div
                key={m.id}
                className="min-w-[118px] flex-1 border-l border-gray-200 px-2 py-2 text-center sm:min-w-[150px] sm:px-3 sm:py-2.5"
                style={{ boxShadow: `inset 0 -3px 0 ${szin.alap}` }}
              >
                <span className="text-sm font-semibold text-gray-900">{m.nev}</span>
              </div>
            );
          })
        )}
      </div>

      {/* idősáv és oszlopok */}
      <div
        className="relative flex overflow-x-auto pt-3"
        onScroll={(e) => {
          if (fejlecRef.current) fejlecRef.current.scrollLeft = e.currentTarget.scrollLeft;
        }}
      >
        {/* órák */}
        <div className="w-11 shrink-0 sm:w-14" style={{ height: magassag }}>
          {orak.map((o) => (
            <div key={o} className="relative" style={{ height: PX_PER_ORA }}>
              <span className="absolute -top-2 right-1.5 text-[10px] tabular-nums text-gray-400 sm:right-2 sm:text-[11px]">
                {String(o).padStart(2, '0')}:00
              </span>
            </div>
          ))}
        </div>

        {munkatarsak.map((m) => {
          const szin = szinhez(m.id);
          const sajat = (adat?.foglalasok ?? []).filter((f) => f.staffId === m.id);
          const sajatTavollet = (adat?.tavolletek ?? []).filter(
            (t) => t.staffId === m.id || t.staffId === null
          );
          const napiMunkaido = munkaidok.filter(
            (mi) => mi.staffId === m.id && mi.weekday === nap.getDay()
          );

          return (
            <div
              key={m.id}
              onClick={(e) => {
                if (!foglalhatMasnak && m.id !== sajatId) {
                  setHiba('Csak magadnak vihetsz fel foglalást.');
                  return;
                }
                const rect = e.currentTarget.getBoundingClientRect();
                const perc = Math.max(0, Math.round((e.clientY - rect.top) / PX_PER_PERC / 15) * 15);
                setHiba(null);
                setSzerkesztendo(null);
                nyitUjFoglalas(m.id, ORA_KEZD * 60 + perc);
              }}
              className="relative min-w-[118px] flex-1 cursor-pointer border-l border-gray-200 sm:min-w-[150px]"
              style={{
                height: magassag,
                backgroundImage:
                  'repeating-linear-gradient(to bottom, #f1f5f9 0px, #f1f5f9 1px, transparent 1px, transparent ' +
                  PX_PER_ORA +
                  'px)',
              }}
            >
              {/* munkaidő háttér */}
              {napiMunkaido.map((mi, k) => (
                <div
                  key={k}
                  className="absolute inset-x-0"
                  style={{
                    top: (mi.startMinute - ORA_KEZD * 60) * PX_PER_PERC,
                    height: (mi.endMinute - mi.startMinute) * PX_PER_PERC,
                    background: szin.halvany,
                    opacity: 0.45,
                  }}
                />
              ))}

              {/* távollét */}
              {sajatTavollet.map((t) => {
                const k = new Date(t.kezdet);
                const v = new Date(t.veg);
                const top = Math.max(0, percOffset(k) * PX_PER_PERC);
                const also = Math.min(magassag, percOffset(v) * PX_PER_PERC);
                if (also <= 0 || top >= magassag) return null;
                return (
                  <div
                    key={t.id}
                    className="absolute inset-x-0 flex items-start justify-center pt-1 text-[10px] font-medium text-red-800"
                    style={{
                      top,
                      height: also - top,
                      background:
                        'repeating-linear-gradient(45deg, #fee2e2 0px, #fee2e2 6px, #fecaca 6px, #fecaca 12px)',
                    }}
                  >
                    {t.ok ?? 'Szabadság'}
                  </div>
                );
              })}

              {/* foglalások */}
              {sajat.map((f) => {
                const k = new Date(f.kezdet);
                const v = new Date(f.veg);
                const top = percOffset(k) * PX_PER_PERC;
                const magas = Math.max(22, (percOffset(v) - percOffset(k)) * PX_PER_PERC);
                const sorok = ferosorok(magas, {
                  margo: DOBOZ_MARGO,
                  elsoSor: DOBOZ_ELSO_SOR,
                  tovabbiSor: DOBOZ_ALSO_SOR,
                  max: 3,
                });
                const lemondva = f.allapot === 'CANCELLED';

                return (
                  <button
                    key={f.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setKivalasztott(f);
                    }}
                    title={`${ora(k)}–${ora(v)} · ${f.vendeg} · ${f.szolgaltatas}`}
                    className="absolute overflow-hidden rounded-md px-1.5 py-[2px] text-left text-white transition-[filter] hover:z-10 hover:brightness-110"
                    style={{
                      top,
                      height: magas,
                      left: 4,
                      right: 4,
                      background: lemondva ? '#94a3b8' : szin.alap,
                      borderLeft: `3px solid ${lemondva ? '#64748b' : szin.sotet}`,
                      opacity: lemondva ? 0.75 : 1,
                    }}
                  >
                    {/* Az idő és a név EGY sorba kerül. Egy 30 perces foglalás
                        doboza telefonon 24 px magas: két külön sor nem fér el
                        benne, így eddig a kezdés ideje néma veszteség volt.
                        Egy sorban mindkettő kifér. */}
                    <div
                      className={
                        'flex items-baseline gap-1 leading-[14px] ' +
                        (lemondva ? 'line-through' : '')
                      }
                    >
                      <span className="shrink-0 text-[11px] tabular-nums opacity-90">
                        {ora(k)}
                      </span>
                      <span className="truncate text-xs font-semibold">
                        {f.allapot === 'COMPLETED' && '✓ '}
                        {f.allapot === 'NO_SHOW' && '✗ '}
                        {f.vendeg}
                        {/* Ha csak egy sor fér ki, a kezelés neve ide jön a
                            név mögé, nem vész el. A név van elöl, így a szűk
                            oszlopokban is az marad meg egészben. */}
                        {sorok === 1 && (
                          <span className="font-normal opacity-90">
                            {' · '}
                            {szolgaltatasRovid(f.szolgaltatas)}
                          </span>
                        )}
                      </span>
                    </div>
                    {sorok > 1 && (
                      <div
                        className={
                          'text-[11px] leading-[13px] opacity-90 ' +
                          // Ahol két sor is kifér, inkább tördelünk, mint
                          // levágunk: így a hosszú nevek is teljesen látszanak.
                          (sorok > 2 ? 'line-clamp-2' : 'truncate')
                        }
                      >
                        {szolgaltatasRovid(f.szolgaltatas)}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}

        {/* aktuális idő vonala */}
        {maVan && mostOffset >= 0 && mostOffset <= magassag && (
          <div
            className="pointer-events-none absolute inset-x-0 z-20 flex items-center"
            style={{ top: mostOffset + 12 }}
          >
            <span className="ml-1 rounded bg-red-600 px-1 text-[10px] font-semibold text-white tabular-nums">
              {ora(most)}
            </span>
            <span className="h-px flex-1 bg-red-600" />
          </div>
        )}
      </div>
      </>
      )}

      {/* részletek */}
      {kivalasztott && (
        <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-5">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <a
                href={'/admin/vendegek?q=' + encodeURIComponent(kivalasztott.email)}
                className="text-lg font-bold text-[#004a6d] hover:underline"
              >
                {kivalasztott.vendeg}
              </a>
              <p className="text-sm text-gray-500">
                {ora(new Date(kivalasztott.kezdet))}–{ora(new Date(kivalasztott.veg))} ·{' '}
                {ALLAPOT_FELIRAT[kivalasztott.allapot]}
              </p>
            </div>
            <button
              onClick={() => setKivalasztott(null)}
              className="text-sm text-gray-400 transition-colors hover:text-gray-600"
            >
              Bezár
            </button>
          </div>

          <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
            <Sor cimke="Szolgáltatás" ertek={kivalasztott.szolgaltatas} />
            <Sor cimke="E-mail" ertek={kivalasztott.email} />
            <Sor cimke="Telefon" ertek={kivalasztott.telefon ?? '—'} />
            {kivalasztott.megjegyzes && (
              <div className="sm:col-span-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Megjegyzés
                </dt>
                <dd className="mt-0.5 whitespace-pre-wrap text-gray-900">
                  {kivalasztott.megjegyzes}
                </dd>
              </div>
            )}
            {kivalasztott.seriesId && (
              <div className="sm:col-span-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Ismétlődő sorozat
                </dt>
                <dd className="mt-0.5 flex flex-wrap items-center gap-3 text-gray-900">
                  <span>
                    {sorozatInfo
                      ? `${sorozatInfo.hanyadik}. alkalom a ${sorozatInfo.osszesen}-ból`
                      : 'Heti sorozat része'}
                  </span>
                  <button
                    type="button"
                    disabled={muvelet}
                    onClick={() => sorozatLemondasa(kivalasztott)}
                    className="text-sm font-medium text-red-700 hover:underline disabled:opacity-50"
                  >
                    Ettől kezdve a hátralévők lemondása
                  </button>
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-200 pt-4">
            <span className="mr-1 text-xs font-medium uppercase tracking-wide text-gray-500">
              Állapot:
            </span>
            {(['BOOKED', 'COMPLETED', 'NO_SHOW', 'CANCELLED'] as const).map((a) => (
              <button
                key={a}
                disabled={muvelet || kivalasztott.allapot === a}
                onClick={() => allapotra(kivalasztott, a)}
                className={
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-default ' +
                  (kivalasztott.allapot === a
                    ? 'bg-[#004a6d] text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-white')
                }
              >
                {ALLAPOT_FELIRAT[a]}
              </button>
            ))}

            <span className="flex-1" />

            <button
              disabled={muvelet}
              onClick={() => szerkesztesInditasa(kivalasztott)}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-white disabled:opacity-50"
            >
              Módosítás
            </button>

            {admin && (
              <button
                disabled={muvelet}
                onClick={() => torles(kivalasztott)}
                className="rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
              >
                Törlés
              </button>
            )}
          </div>
        </div>
      )}

      {/* jelmagyarázat */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-gray-200 px-3 py-2 text-[11px] text-gray-500 sm:px-4">
        <span>✓ fizetve</span>
        <span>✗ nem jelent meg</span>
        <span className="line-through">lemondva</span>
        {lathatMindent && munkatarsak.length > 1 && <span>a szín a munkatársat jelöli</span>}
        {hetiNezet && <span className="hidden sm:inline">a napra kattintva napi nézet nyílik</span>}
      </div>

      {megerosites && (
        <Megerosites adat={megerosites} onMegse={() => setMegerosites(null)} />
      )}

      {ujFoglalasAdat && (
        <UjFoglalasUrlap
          szolgaltatasok={szolgaltatasok}
          arak={arak}
          munkatarsak={
            foglalhatMasnak ? munkatarsak : munkatarsak.filter((m) => m.id === sajatId)
          }
          eloStaffId={ujFoglalasAdat.staffId}
          eloKezdet={ujFoglalasAdat.kezdet}
          szerkesztendo={szerkesztendo ?? undefined}
          onMegse={() => {
            setUjFoglalasAdat(null);
            setSzerkesztendo(null);
          }}
          onKesz={(uzenetSzoveg) => {
            setUjFoglalasAdat(null);
            setSzerkesztendo(null);
            setUzenet(uzenetSzoveg ?? 'A foglalás elmentve.');
            betolt(nap, nezet);
          }}
        />
      )}
    </div>
  );
}

// „2026. szept. 14–20.” — egy hónapon belül nem ismételjük a hónapnevet
function hetFelirat(napok: Date[]) {
  const elso = napok[0];
  const utolso = napok[napok.length - 1];
  const honap = (d: Date) => new Intl.DateTimeFormat('hu-HU', { month: 'short' }).format(d);
  return elso.getMonth() === utolso.getMonth()
    ? `${elso.getFullYear()}. ${honap(elso)} ${elso.getDate()}–${utolso.getDate()}.`
    : `${elso.getFullYear()}. ${honap(elso)} ${elso.getDate()}. – ${honap(utolso)} ${utolso.getDate()}.`;
}

function Sor({ cimke, ertek }: { cimke: string; ertek: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">{cimke}</dt>
      <dd className="mt-0.5 text-gray-900">{ertek}</dd>
    </div>
  );
}
