import Image from 'next/image';
import Link from 'next/link';

const datumFormatum = new Intl.DateTimeFormat('hu-HU', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Europe/Budapest',
});

/**
 * Az ÉÉÉÉ-HH-NN dátum, vagy undefined, amíg kitöltendő jelölés áll a helyén.
 *
 * Minden más hibát fordításkor dob, ahogy az ar() is: a „2026-02-30”-at a
 * Date szó nélkül március 2-ává alakítaná, a „2026.10.20.” pedig nyers
 * szövegként kerülne ki, és a schemából szó nélkül kimaradna.
 */
export function ervenyesDatum(szoveg: string) {
  if (szoveg.startsWith('[[')) return undefined;
  const datum = new Date(szoveg);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(szoveg) || Number.isNaN(datum.getTime()) ||
      datum.toISOString().slice(0, 10) !== szoveg) {
    throw new Error(`Az ellenőrzés dátuma nem létező ÉÉÉÉ-HH-NN dátum: "${szoveg}"`);
  }
  return datum;
}

/**
 * Ki áll a kezelés mögött: Fernanda adatai, az adott terápiához tartozó
 * képesítések, és a két dátum.
 *
 * A két dátum szándékosan külön áll:
 * - `ellenorizve`: kézzel írt ÉÉÉÉ-HH-NN, az a nap, amikor Fernanda
 *   jóváhagyta a szöveget. Gitből nem jöhet, mert akkor bármely
 *   kódmódosítás után azt állítaná az oldal, hogy ő aznap ellenőrizte.
 * - `frissitve`: a lib/utolso-modositas.ts-ből, ugyanazzal az útvonallal,
 *   amivel a sitemap számol, így a látható dátum és a lastmod mindig egyezik.
 */
export default function SzakemberBlokk({
  kepesitesek,
  ellenorizve,
  frissitve,
}: {
  kepesitesek: string[];
  /** Ha nincs megadva, az oldal nem állítja, hogy Fernanda ellenőrizte. */
  ellenorizve?: string;
  frissitve?: Date;
}) {
  const ellenorzesNapja = ellenorizve ? ervenyesDatum(ellenorizve) : undefined;

  return (
    <div className="rounded-3xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#004A6D] mb-6">A szakember</h2>
      <div className="flex flex-col sm:flex-row gap-6">
        <Image
          src="/main.jpg"
          alt="Forrás Fernanda gyógytornász-fizioterapeuta"
          width={160}
          height={200}
          sizes="160px"
          className="w-32 h-40 sm:w-40 sm:h-50 rounded-2xl object-cover shrink-0"
        />
        <div>
          <p className="text-xl font-bold text-gray-900">Forrás Fernanda</p>
          <p className="font-semibold text-[#004A6D]">
            gyógytornász-fizioterapeuta, a ReStart Physio alapítója
          </p>
          <ul className="mt-4 space-y-2 text-base">
            <li>Gyógytornász-fizioterapeuta (Szegedi Tudományegyetem, 2017)</li>
            <li>Működési nyilvántartási szám: 251415</li>
            <li>Hat évig élsportolók gyógytornásza (Győri ETO FC, Mosonmagyaróvári KC)</li>
            {kepesitesek.map((kepesites) => (
              <li key={kepesites}>{kepesites}</li>
            ))}
          </ul>
          <Link
            href="/bemutatkozas"
            className="inline-block mt-4 font-semibold text-[#004A6D] hover:text-[#EC7007] transition-colors"
          >
            Fernanda szakmai útja és képzései →
          </Link>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500 space-y-1">
        {ellenorizve && (
          <p>
            Az oldal szövegét szakmailag ellenőrizte: Forrás Fernanda, gyógytornász-fizioterapeuta,{' '}
            {ellenorzesNapja ? (
              <time dateTime={ellenorizve}>{datumFormatum.format(ellenorzesNapja)}</time>
            ) : (
              ellenorizve
            )}
          </p>
        )}
        {frissitve && (
          <p>
            Utoljára frissítve:{' '}
            <time dateTime={frissitve.toISOString()}>{datumFormatum.format(frissitve)}</time>
          </p>
        )}
      </div>
    </div>
  );
}
