import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import { alkalmakSzama, alkalmankentiAr, ar, forint, idotartamSzovegesen } from '@/lib/arlista';

type Tetel = { nev: string; idotartam?: string };

// A perjeles név („gyógytorna/rehabilitáció”) egyetlen szó a böngészőnek:
// mobilon csak a perjel után törhet, különben kitolja az árat a dobozból.
function torhetoNev(nev: string) {
  return nev.split('/').map((resz, i) => (
    <Fragment key={i}>
      {i > 0 && '/'}
      {i > 0 && <wbr />}
      {resz}
    </Fragment>
  ));
}

/**
 * Egy szolgáltatás árai a saját oldalán.
 *
 * Az árak a lib/arlista.ts-ből jönnek, ugyanonnan, mint az /arak oldalé, így
 * a kettő nem mehet szét. Az ar() a fordításnál hibát dob, ha a név el van
 * gépelve — üres ár így nem kerülhet ki élesbe.
 */
export default function ArBlokk({
  id,
  cim = 'Árak',
  tetelek,
  megjegyzes,
}: {
  id?: string;
  cim?: string;
  tetelek: Tetel[];
  megjegyzes?: ReactNode;
}) {
  const sorok = tetelek.map((t) => ar(t.nev, t.idotartam));

  return (
    <div id={id} className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-[#004A6D] mb-6">{cim}</h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <table className="w-full text-left">
          <caption className="sr-only">{cim}</caption>
          <tbody className="divide-y divide-gray-100">
            {sorok.map((sor) => {
              const alkalom = alkalmakSzama(sor);
              const alkalmankent = alkalmankentiAr(sor);
              return (
                <tr key={`${sor.name}-${sor.duration}`} className="bg-white">
                  <th scope="row" className="p-4 sm:p-5 font-normal align-top">
                    <span className="block font-semibold text-gray-900">
                      {torhetoNev(sor.name)}
                      {sor.duration && (
                        <span className="text-[#004A6D]"> · {idotartamSzovegesen(sor.duration)}</span>
                      )}
                    </span>
                    {sor.includes && (
                      <span className="block text-base text-gray-500 mt-1">{sor.includes}</span>
                    )}
                  </th>
                  <td className="p-4 sm:p-5 text-right align-top">
                    <span className="block font-bold text-[#004A6D] whitespace-nowrap">
                      {forint(sor.price)}
                    </span>
                    {alkalmankent !== undefined && (
                      <span className="block text-base text-gray-500">
                        alkalmanként {alkalom && sor.price % alkalom !== 0 ? 'kb. ' : ''}
                        {forint(alkalmankent)}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {sorok.some((sor) => alkalmakSzama(sor)) && (
        <p className="mt-4 text-base text-gray-500">
          A bérletek a vásárlástól számított 3 hónapig használhatók fel.
        </p>
      )}
      {megjegyzes && <p className="mt-4">{megjegyzes}</p>}
      <Link
        href="/arak"
        className="inline-block mt-4 font-semibold text-[#004A6D] hover:text-[#EC7007] transition-colors"
      >
        A teljes árlista →
      </Link>
    </div>
  );
}
