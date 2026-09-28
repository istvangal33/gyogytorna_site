import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import {
  hotérkep,
  kovetkezoFoglalasok,
  maiTerheles,
  idoszakStatisztika,
} from "@/lib/db";

export const metadata: Metadata = {
  title: "Áttekintés",
  robots: { index: false, follow: false },
};

const NAPOK = ["H", "K", "Sze", "Cs", "P", "Szo", "V"];
// getDay() sorrendjéből hétfővel kezdődőre
const DOW_SORREND = [1, 2, 3, 4, 5, 6, 0];
const ORA_KEZD = 7;
const ORA_VEG = 20;

function hetKezdete(d: Date) {
  const uj = new Date(d);
  uj.setHours(0, 0, 0, 0);
  uj.setDate(uj.getDate() - ((uj.getDay() + 6) % 7));
  return uj;
}

function valtozas(most: number, elozo: number) {
  if (elozo === 0) return most === 0 ? null : { szazalek: 100, nott: true };
  const kulonbseg = ((most - elozo) / elozo) * 100;
  return { szazalek: Math.round(Math.abs(kulonbseg)), nott: kulonbseg >= 0 };
}

export default async function AdminPage() {
  const user = await bejelentkezettFelhasznalo();
  if (!user) redirect("/admin/login");

  const lathatMindent = user.role === "ADMIN" || user.canViewAll;
  const szuro = lathatMindent ? null : user.id;

  const most = new Date();
  const hetKezd = hetKezdete(most);
  const hetVeg = new Date(hetKezd);
  hetVeg.setDate(hetVeg.getDate() + 7);
  const elozoKezd = new Date(hetKezd);
  elozoKezd.setDate(elozoKezd.getDate() - 7);

  const [racs, kovetkezok, terheles, ezHet, mult] = await Promise.all([
    hotérkep(hetKezd, hetVeg, szuro),
    kovetkezoFoglalasok(5, szuro),
    maiTerheles(szuro),
    idoszakStatisztika(hetKezd, hetVeg, szuro),
    idoszakStatisztika(elozoKezd, hetKezd, szuro),
  ]);

  // gyors kereséshez: "nap-óra" -> darabszám
  const terkep = new Map(racs.map((r) => [`${r.nap}-${r.ora}`, r.db]));
  const maximum = Math.max(1, ...racs.map((r) => r.db));

  const orak = Array.from({ length: ORA_VEG - ORA_KEZD }, (_, i) => ORA_KEZD + i);

  const napNev = new Intl.DateTimeFormat("hu-HU", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(most);

  return (
    <main className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-7">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Üdv, {user.name.split(" ").slice(-1)[0]} 👋
        </h1>
        <p className="mt-0.5 text-sm text-gray-500">
          {napNev.charAt(0).toUpperCase() + napNev.slice(1)} ·{" "}
          {lathatMindent ? "a teljes rendelő adatai" : "a saját adataid"}
        </p>
      </header>

      {/* statisztika kártyák */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kartya
          cimke="Foglalás ezen a héten"
          ertek={String(ezHet.osszes)}
          valtozas={valtozas(ezHet.osszes, mult.osszes)}
        />
        <Kartya
          cimke="Még előttetek áll"
          ertek={String(ezHet.foglalt)}
          megjegyzes="a héten hátralévő"
        />
        <Kartya
          cimke="Fizetve"
          ertek={String(ezHet.megtortent)}
          valtozas={valtozas(ezHet.megtortent, mult.megtortent)}
        />
        <Kartya
          cimke="Nem jelent meg"
          ertek={String(ezHet.nem_jott)}
          valtozas={valtozas(ezHet.nem_jott, mult.nem_jott)}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* hőtérkép */}
        <section className="rounded-xl bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-bold text-gray-900">Foglalások eloszlása</h2>
            <span className="text-xs text-gray-500">aktuális hét</span>
          </div>

          {racs.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-400">
              Ezen a héten még nincs foglalás.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0.5 sm:border-spacing-1">
                  <thead>
                    <tr>
                      <th className="w-6 sm:w-10" />
                      {NAPOK.map((n) => (
                        <th key={n} className="pb-1 text-[11px] font-medium text-gray-500">
                          {n}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orak.map((o) => (
                      <tr key={o}>
                        <td className="pr-1 text-right text-[10px] tabular-nums text-gray-400">
                          {String(o).padStart(2, "0")}
                        </td>
                        {DOW_SORREND.map((dow) => {
                          const db = terkep.get(`${dow}-${o}`) ?? 0;
                          const arany = db / maximum;
                          return (
                            <td key={dow} className="p-0">
                              <div
                                title={`${db} foglalás`}
                                className="flex h-5 items-center justify-center rounded text-[10px] font-medium"
                                style={{
                                  background:
                                    db === 0 ? "#f1f5f9" : `rgba(0, 74, 109, ${0.15 + arany * 0.85})`,
                                  color: arany > 0.5 ? "#ffffff" : "#004a6d",
                                }}
                              >
                                {db > 0 ? db : ""}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-500">
                <span>kevesebb</span>
                <span className="h-2.5 w-24 rounded-full bg-gradient-to-r from-[#e2e8f0] to-[#004a6d]" />
                <span>több</span>
              </div>
            </>
          )}
        </section>

        {/* következő foglalások */}
        <section className="rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-bold text-gray-900">Következő foglalások</h2>
            <Link href="/admin/naptar" className="text-xs font-medium text-[#004a6d] hover:underline">
              Naptár
            </Link>
          </div>

          {kovetkezok.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-400">Nincs közelgő foglalás.</p>
          ) : (
            <ul className="space-y-2">
              {kovetkezok.map((f) => {
                const k = new Date(f.startsAt);
                const v = new Date(f.endsAt);
                const perc = Math.round((+v - +k) / 60000);
                return (
                  <li key={f.id} className="flex gap-3 rounded-lg border border-gray-100 p-2.5">
                    <div className="flex w-11 shrink-0 flex-col items-center justify-center rounded-md bg-gray-50 py-1">
                      <span className="text-sm font-bold text-gray-900">{k.getDate()}</span>
                      <span className="text-[10px] uppercase text-gray-500">
                        {new Intl.DateTimeFormat("hu-HU", { month: "short" }).format(k)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">{f.vendeg}</p>
                      <p className="truncate text-xs text-gray-500">{f.szolgaltatas}</p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        {new Intl.DateTimeFormat("hu-HU", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(k)}{" "}
                        · {perc} perc
                        {lathatMindent && ` · ${f.munkatars}`}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {/* mai terhelés */}
      <section className="mt-4 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-bold text-gray-900">Mai terhelés</h2>

        {terheles.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-400">
            Ma nincs beosztás és foglalás sem.
          </p>
        ) : (
          <ul className="space-y-3">
            {terheles.map((t) => {
              const tulterhelt = t.ferohely > 0 && t.db > t.ferohely;
              const arany = t.ferohely > 0 ? Math.min(1, t.db / t.ferohely) : 0;
              return (
                <li key={t.id} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#004a6d] text-xs font-semibold text-white">
                    {t.name.split(/\s+/).slice(0, 2).map((r) => r[0]?.toUpperCase()).join("")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-sm font-medium text-gray-900">{t.name}</p>
                      <p
                        className={
                          "shrink-0 text-xs tabular-nums " +
                          (tulterhelt ? "font-semibold text-red-600" : "text-gray-500")
                        }
                      >
                        {tulterhelt && "Túlterhelt · "}
                        {t.db}
                        {t.ferohely > 0 && `/${t.ferohely}`}
                      </p>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={"h-full rounded-full " + (tulterhelt ? "bg-red-500" : "bg-[#004a6d]")}
                        style={{ width: `${tulterhelt ? 100 : arany * 100}%` }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-3 text-[11px] text-gray-400">
          A férőhely a munkaidőből számol: hány 60 perces blokk fér be aznap.
        </p>
      </section>
    </main>
  );
}

function Kartya({
  cimke,
  ertek,
  valtozas: v,
  megjegyzes,
}: {
  cimke: string;
  ertek: string;
  valtozas?: { szazalek: number; nott: boolean } | null;
  megjegyzes?: string;
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-gray-500">{cimke}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{ertek}</p>

      {v ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs">
          <span
            className={
              "rounded-full px-1.5 py-0.5 font-medium " +
              (v.nott ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700")
            }
          >
            {v.nott ? "+" : "−"}
            {v.szazalek}%
          </span>
          <span className="text-gray-400">az előző héthez</span>
        </p>
      ) : (
        <p className="mt-1.5 text-xs text-gray-400">{megjegyzes ?? "nincs összehasonlítás"}</p>
      )}
    </div>
  );
}
