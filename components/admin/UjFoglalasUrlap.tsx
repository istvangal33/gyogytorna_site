'use client';

import { useCallback, useEffect, useState } from 'react';
import { ujFoglalas, foglalasSzerkesztes } from '@/app/admin/naptar/actions';

export type Szolgaltatas = {
  id: string;
  name: string;
  price: number;
  durationMin: number;
  blockMin: number;
};

type Munkatars = { id: string; nev: string };

export type Szerkesztendo = {
  id: string;
  vendeg: string;
  email: string;
  serviceId: string;
  megjegyzes: string | null;
  ar: number;
};

type Jelolt = { kezdet: string; maxPerc: number };

type Props = {
  szolgaltatasok: Szolgaltatas[];
  /** Munkatársanként eltérő árak: { munkatársId: { szolgáltatásId: ár } } */
  arak: Record<string, Record<string, number>>;
  munkatarsak: Munkatars[];
  eloStaffId: string;
  // helyi idő szerinti "YYYY-MM-DDTHH:mm"
  eloKezdet: string;
  szerkesztendo?: Szerkesztendo;
  onKesz: (uzenet?: string) => void;
  onMegse: () => void;
};

const INPUT =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#004a6d] focus:outline-none focus:ring-1 focus:ring-[#004a6d]';

function forintban(ertek: number) {
  return new Intl.NumberFormat('hu-HU').format(ertek) + ' Ft';
}

function oraPerc(iso: string) {
  return new Intl.DateTimeFormat('hu-HU', { hour: '2-digit', minute: '2-digit' }).format(
    new Date(iso)
  );
}

// "YYYY-MM-DDTHH:mm" -> nap és idő része
function bontas(ertek: string) {
  const [nap, ido] = ertek.split('T');
  return { nap: nap ?? '', ido: ido ?? '' };
}

export default function UjFoglalasUrlap({
  szolgaltatasok,
  arak,
  munkatarsak,
  eloStaffId,
  eloKezdet,
  szerkesztendo,
  onKesz,
  onMegse,
}: Props) {
  const szerkesztes = Boolean(szerkesztendo);

  const elo = bontas(eloKezdet);

  const [nev, setNev] = useState(szerkesztendo?.vendeg ?? '');
  const [email, setEmail] = useState(szerkesztendo?.email ?? '');
  const [telefon, setTelefon] = useState('');
  const [staffId, setStaffId] = useState(eloStaffId);
  // A kiválasztott munkatársra érvényes ár. Ahol nincs saját ár, az árlista
  // ára marad — ugyanaz a szabály, ami a mentésnél is érvényesül. Enélkül a
  // választékban az árlista ára állna akkor is, ha a munkatársnál más összeg
  // érvényes, és a rendelő azt mondaná a páciensnek, ami nem az ő ára.
  const arHozza = (serviceId: string, alapAr: number) =>
    arak?.[staffId]?.[serviceId] ?? alapAr;
  const [nap, setNap] = useState(elo.nap);
  const [serviceId, setServiceId] = useState(szerkesztendo?.serviceId ?? '');
  const [megjegyzes, setMegjegyzes] = useState(szerkesztendo?.megjegyzes ?? '');
  // Szerkesztéskor az ár átírható: kedvezmény, vagy ha az alkalom másképp
  // alakult. Üresen hagyva a szolgáltatás szerinti ár marad.
  const [ar, setAr] = useState(szerkesztendo ? String(szerkesztendo.ar) : '');

  const [jeloltek, setJeloltek] = useState<Jelolt[]>([]);
  const [valasztott, setValasztott] = useState<Jelolt | null>(null);
  const [vanMunkaido, setVanMunkaido] = useState(true);
  const [toltes, setToltes] = useState(false);

  // vészhelyzeti kézi megadás, ha valakit muszáj beszorítani
  const [keziMod, setKeziMod] = useState(false);
  const [keziIdo, setKeziIdo] = useState(eloKezdet);

  const [ertesites, setErtesites] = useState(true);
  const [mentes, setMentes] = useState(false);
  const [hiba, setHiba] = useState<string | null>(null);

  useEffect(() => {
    const kezelo = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMegse();
    };
    window.addEventListener('keydown', kezelo);
    return () => window.removeEventListener('keydown', kezelo);
  }, [onMegse]);

  const idopontokBetoltese = useCallback(async () => {
    if (!staffId || !nap) return;
    setToltes(true);
    try {
      const p = new URLSearchParams({ staffId, nap });
      if (szerkesztendo) p.set('kihagyId', szerkesztendo.id);

      const res = await fetch('/api/admin/szabad-idopontok?' + p.toString());
      if (!res.ok) throw new Error('betoltes');
      const adat = await res.json();
      setJeloltek(adat.jeloltek);
      setVanMunkaido(adat.vanMunkaido);

      // ha az eddig kiválasztott időpont már nem szabad, elengedjük
      setValasztott((elozo) => {
        if (!elozo) return null;
        return adat.jeloltek.find((j: Jelolt) => j.kezdet === elozo.kezdet) ?? null;
      });
    } catch {
      setHiba('A szabad időpontokat nem sikerült betölteni.');
    } finally {
      setToltes(false);
    }
  }, [staffId, nap, szerkesztendo]);

  useEffect(() => {
    idopontokBetoltese();
  }, [idopontokBetoltese]);

  // A kiválasztott réshez azok a szolgáltatások valók, amiknek a KEZELÉSE
  // belefér. A blokkban lévő átállási idő elhagyható, ha nincs rá hely.
  const ferok = valasztott
    ? szolgaltatasok.filter((s) => s.durationMin <= valasztott.maxPerc)
    : szolgaltatasok;

  // ha a választott szolgáltatás már nem fér bele, töröljük a választást
  useEffect(() => {
    if (serviceId && !ferok.some((s) => s.id === serviceId)) setServiceId('');
  }, [ferok, serviceId]);

  const kivalasztottSzolgaltatas = szolgaltatasok.find((s) => s.id === serviceId);

  // A naptárban elfoglalt hossz: a blokk, de legfeljebb amennyi a résbe fér.
  const tenylegesBlokk = (() => {
    if (!kivalasztottSzolgaltatas) return null;
    if (keziMod || !valasztott) return kivalasztottSzolgaltatas.blockMin;
    return Math.min(kivalasztottSzolgaltatas.blockMin, valasztott.maxPerc);
  })();

  const vegeSzoveg = (() => {
    if (!kivalasztottSzolgaltatas || tenylegesBlokk === null) return null;
    const kezdIso = keziMod ? (keziIdo ? new Date(keziIdo).toISOString() : null) : valasztott?.kezdet;
    if (!kezdIso) return null;
    const v = new Date(new Date(kezdIso).getTime() + tenylegesBlokk * 60000);
    return new Intl.DateTimeFormat('hu-HU', { hour: '2-digit', minute: '2-digit' }).format(v);
  })();

  async function mentesInditasa(e: React.FormEvent) {
    e.preventDefault();

    const kezdet = keziMod ? keziIdo : valasztott ? valasztott.kezdet : '';
    if (!kezdet) {
      setHiba('Válassz időpontot.');
      return;
    }
    if (!serviceId) {
      setHiba('Válassz szolgáltatást.');
      return;
    }

    setMentes(true);
    setHiba(null);

    if (szerkesztendo) {
      const nyersAr = ar.replace(/\s/g, '');
      if (nyersAr !== '' && (!/^\d+$/.test(nyersAr) || Number(nyersAr) < 0)) {
        setHiba('Az ár csak nemnegatív egész szám lehet.');
        setMentes(false);
        return;
      }

      const r = await foglalasSzerkesztes({
        id: szerkesztendo.id,
        serviceId,
        staffId,
        kezdet,
        megjegyzes,
        ertesites,
        ar: nyersAr === '' ? null : Number(nyersAr),
      });
      setMentes(false);
      if (!r.ok) {
        setHiba(r.hiba);
        idopontokBetoltese();
        return;
      }
      onKesz(r.figyelmeztetes ?? 'A foglalás módosítva.');
      return;
    }

    const r = await ujFoglalas({
      vendegNev: nev,
      vendegEmail: email,
      vendegTelefon: telefon,
      serviceId,
      staffId,
      kezdet,
      megjegyzes,
      ertesites,
    });
    setMentes(false);
    if (!r.ok) {
      setHiba(r.hiba);
      idopontokBetoltese();
      return;
    }
    onKesz(r.figyelmeztetes);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:items-center">
      <div className="my-auto w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-900">
            {szerkesztes ? 'Foglalás módosítása' : 'Új foglalás'}
          </h2>
          <button
            type="button"
            onClick={onMegse}
            className="text-sm text-gray-400 transition-colors hover:text-gray-600"
          >
            Mégse
          </button>
        </div>

        <form onSubmit={mentesInditasa} className="space-y-4 px-5 py-5">
          {hiba && (
            <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {hiba}
            </div>
          )}

          {szerkesztes ? (
            <div className="rounded-md bg-gray-50 px-4 py-3 text-sm">
              <p className="font-semibold text-gray-900">{szerkesztendo!.vendeg}</p>
              <p className="text-gray-500">{szerkesztendo!.email}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Mezo cimke="Vendég neve" kotelezo>
                <input value={nev} onChange={(e) => setNev(e.target.value)} required autoFocus className={INPUT} />
              </Mezo>
              <Mezo cimke="E-mail cím">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} />
                {!email.trim() && (
                  <p className="mt-1 text-xs text-gray-500">
                    Üresen hagyható. Ilyenkor a vendég nem kap sem visszaigazolást,
                    sem emlékeztetőt.
                  </p>
                )}
              </Mezo>
              <Mezo cimke="Telefonszám">
                <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} className={INPUT} />
              </Mezo>
              <Mezo cimke="Munkatárs" kotelezo>
                <select value={staffId} onChange={(e) => setStaffId(e.target.value)} required className={INPUT}>
                  {munkatarsak.map((m) => (
                    <option key={m.id} value={m.id}>{m.nev}</option>
                  ))}
                </select>
              </Mezo>
            </div>
          )}

          {szerkesztes && (
            <Mezo cimke="Munkatárs" kotelezo>
              <select value={staffId} onChange={(e) => setStaffId(e.target.value)} required className={INPUT}>
                {munkatarsak.map((m) => (
                  <option key={m.id} value={m.id}>{m.nev}</option>
                ))}
              </select>
            </Mezo>
          )}

          <Mezo cimke="Nap" kotelezo>
            <input type="date" value={nap} onChange={(e) => setNap(e.target.value)} required className={INPUT} />
          </Mezo>

          {!keziMod && (
            <div>
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Szabad időpontok<span className="ml-0.5 text-red-500">*</span>
              </span>

              {toltes ? (
                <p className="py-3 text-sm text-gray-400">Betöltés…</p>
              ) : !vanMunkaido ? (
                <p className="rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  Ezen a napon nincs beállított munkaidő ehhez a munkatárshoz.
                </p>
              ) : jeloltek.length === 0 ? (
                <p className="rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  Ezen a napon nincs szabad időpont. Válassz másik napot vagy munkatársat.
                </p>
              ) : (
                <div className="grid max-h-52 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
                  {jeloltek.map((j) => {
                    const aktiv = valasztott?.kezdet === j.kezdet;
                    return (
                      <button
                        key={j.kezdet}
                        type="button"
                        onClick={() => setValasztott(j)}
                        title={j.maxPerc + " perc fér el innentől"}
                        className={
                          'rounded-full border px-3 py-2 text-sm font-medium transition-colors ' +
                          (aktiv
                            ? 'border-[#004a6d] bg-[#004a6d] text-white'
                            : 'border-[#004a6d]/30 text-[#004a6d] hover:bg-[#004a6d]/5')
                        }
                      >
                        {oraPerc(j.kezdet)}
                      </button>
                    );
                  })}
                </div>
              )}

              {valasztott && (
                <p className="mt-2 text-xs text-gray-500">
                  {oraPerc(valasztott.kezdet)}-tól <strong>{valasztott.maxPerc} perc</strong> áll
                  rendelkezésre.
                </p>
              )}
            </div>
          )}

          {keziMod && (
            <Mezo cimke="Pontos időpont" kotelezo>
              <input
                type="datetime-local"
                value={keziIdo}
                onChange={(e) => setKeziIdo(e.target.value)}
                required
                className={INPUT}
              />
              <p className="mt-1 text-xs text-amber-700">
                Kézi megadásnál a rendszer nem ellenőrzi a munkaidőt. Ütközést továbbra sem enged.
              </p>
            </Mezo>
          )}

          <button
            type="button"
            onClick={() => setKeziMod((v) => !v)}
            className="text-xs font-medium text-gray-500 underline hover:text-gray-700"
          >
            {keziMod ? 'Vissza a szabad időpontokhoz' : 'Időpont megadása kézzel'}
          </button>

          <Mezo cimke="Szolgáltatás" kotelezo>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              required
              disabled={!keziMod && !valasztott}
              className={INPUT + ' disabled:bg-gray-100 disabled:text-gray-400'}
            >
              <option value="">
                {!keziMod && !valasztott ? 'Előbb válassz időpontot' : 'Válassz…'}
              </option>
              {ferok.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {forintban(arHozza(s.id, s.price))}
                </option>
              ))}
            </select>

            {valasztott && ferok.length < szolgaltatasok.length && (
              <p className="mt-1 text-xs text-gray-500">
                {szolgaltatasok.length - ferok.length} szolgáltatás nem fér bele ebbe a résbe, ezért
                nem választható.
              </p>
            )}
            {kivalasztottSzolgaltatas && vegeSzoveg && tenylegesBlokk !== null && (
              <p className="mt-1 text-xs text-gray-500">
                {kivalasztottSzolgaltatas.durationMin} perc kezelés,{' '}
                {tenylegesBlokk} perc a naptárban — vége {vegeSzoveg}
                {tenylegesBlokk < kivalasztottSzolgaltatas.blockMin && (
                  <span className="text-amber-700">
                    {' '}· a rés szűk, nem marad átállási idő
                  </span>
                )}
              </p>
            )}
          </Mezo>

          {szerkesztes && (
            <Mezo cimke="Ár">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={ar}
                  onChange={(e) => setAr(e.target.value)}
                  className={INPUT + ' max-w-[10rem] tabular-nums'}
                />
                <span className="text-sm text-gray-500">Ft</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {kivalasztottSzolgaltatas &&
                Number(ar.replace(/\s/g, '')) !== arHozza(kivalasztottSzolgaltatas.id, kivalasztottSzolgaltatas.price)
                  ? `Eltér a szokásos ártól (${forintban(arHozza(kivalasztottSzolgaltatas.id, kivalasztottSzolgaltatas.price))}). Üresen hagyva az lesz érvényes.`
                  : 'Átírható, ha ennél az alkalomnál más összeget számolsz.'}
              </p>
            </Mezo>
          )}

          <Mezo cimke="Megjegyzés">
            <textarea
              value={megjegyzes}
              onChange={(e) => setMegjegyzes(e.target.value)}
              rows={2}
              className={INPUT}
            />
          </Mezo>

          <label className="flex items-start gap-2 rounded-md bg-gray-50 px-4 py-3">
            <input
              type="checkbox"
              checked={ertesites && Boolean(email.trim())}
              disabled={!email.trim()}
              onChange={(e) => setErtesites(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#004a6d] focus:ring-[#004a6d] disabled:opacity-40"
            />
            <span className="text-sm text-gray-700">
              Értesítő e-mail a vendégnek
              <span className="mt-0.5 block text-xs text-gray-500">
                {email.trim()
                  ? 'Naptármeghívóval, amit egy kattintással betehet a saját naptárába. Vedd ki a pipát, ha a cím nem valós, vagy a vendég nem kér levelet.'
                  : 'Nincs megadva e-mail cím, ezért nem megy ki levél. A foglalás ettől még létrejön.'}
              </span>
            </span>
          </label>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onMegse}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Mégse
            </button>
            <button
              type="submit"
              disabled={mentes}
              className="rounded-md bg-[#004a6d] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#003652] disabled:opacity-60"
            >
              {mentes ? 'Mentés…' : szerkesztes ? 'Módosítás mentése' : 'Foglalás mentése'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Mezo({
  cimke,
  kotelezo,
  children,
}: {
  cimke: string;
  kotelezo?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {cimke}
        {kotelezo && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
