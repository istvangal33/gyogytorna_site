import type { ReactNode } from 'react';
import { PRAXIS } from '@/lib/praxis';

/**
 * A szolgáltatásoldalak törzse ugyanabban a rácsban, mint a régi oldalaké
 * (pl. BEMER): balra kétharmadnyi szöveg, jobbra egy kártya a legfontosabb
 * adatokkal és a telefonszámmal.
 */
export default function TartalomRacs({
  children,
  oldalsav,
}: {
  children: ReactNode;
  oldalsav: ReactNode;
}) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16 text-gray-700 text-lg leading-relaxed min-w-0">
            {children}
          </div>
          <aside className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 h-fit lg:sticky lg:top-24">
            {oldalsav}
            <div className="mt-8 pt-6 border-t">
              <a
                href={PRAXIS.telefonHivas}
                className="w-full flex items-center justify-center gap-2 bg-gray-50 text-[#004A6D] px-6 py-4 rounded-xl font-bold hover:bg-[#004A6D] hover:text-white transition-colors duration-300 border border-gray-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {PRAXIS.telefon}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/** A jobb oldali kártya tartalma: cím és rövid adatsorok. */
export function Roviden({ cim = 'Röviden', sorok }: { cim?: string; sorok: [string, ReactNode][] }) {
  return (
    <>
      <p className="text-2xl font-bold text-[#004A6D] mb-6 border-b pb-4">{cim}</p>
      <dl className="space-y-4 text-base">
        {sorok.map(([cimke, ertek]) => (
          <div key={cimke}>
            <dt className="font-semibold text-gray-900">{cimke}</dt>
            <dd className="text-gray-700">{ertek}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
