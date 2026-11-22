import type { ReactNode } from 'react';

type Lepes = { cim: string; szoveg: ReactNode };

/** „Hogyan zajlik az első alkalom?” — közös kinézet, oldalanként saját lépésekkel. */
export default function ElsoAlkalom({
  cim = 'Hogyan zajlik az első alkalom?',
  bevezeto,
  lepesek,
}: {
  cim?: string;
  bevezeto?: ReactNode;
  lepesek: Lepes[];
}) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[#004A6D] mb-4">{cim}</h2>
      {bevezeto && <p className="mb-8">{bevezeto}</p>}
      {/* A Tailwind list-style:none-t ad, amitől a Safari felolvasója nem
          listaként olvassa fel; a sorszám pedig aria-hidden. */}
      <ol role="list" className="space-y-6">
        {lepesek.map((lepes, i) => (
          <li key={lepes.cim} className="flex gap-4 sm:gap-5">
            <span
              aria-hidden="true"
              className="shrink-0 w-10 h-10 rounded-full bg-[#004A6D] text-white font-bold flex items-center justify-center"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{lepes.cim}</h3>
              <p>{lepes.szoveg}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
