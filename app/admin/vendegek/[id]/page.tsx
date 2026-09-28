import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import { vendegAzonositoval, vendegElozmenyei } from "@/lib/db";

export const metadata: Metadata = {
  title: "Vendég",
  robots: { index: false, follow: false },
};

const ALLAPOT: Record<string, { felirat: string; stilus: string }> = {
  BOOKED: { felirat: "Foglalt", stilus: "bg-[#004a6d]/10 text-[#004a6d]" },
  COMPLETED: { felirat: "Fizetve", stilus: "bg-green-100 text-green-800" },
  CANCELLED: { felirat: "Lemondva", stilus: "bg-gray-100 text-gray-600" },
  NO_SHOW: { felirat: "Nem jelent meg", stilus: "bg-red-100 text-red-800" },
};

function forint(ertek: number) {
  return new Intl.NumberFormat("hu-HU").format(ertek) + " Ft";
}

function idopont(ertek: string) {
  return new Intl.DateTimeFormat("hu-HU", { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(ertek)
  );
}

export default async function VendegPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await bejelentkezettFelhasznalo();
  if (!user) redirect("/admin/login");

  const lathatMindent = user.role === "ADMIN" || user.canViewAll;

  const { id } = await params;
  const vendeg = await vendegAzonositoval(id);
  if (!vendeg) notFound();

  // aki nem lát mindent, csak a saját foglalásait látja ennél a vendégnél
  const elozmenyek = await vendegElozmenyei(id, lathatMindent ? null : user.id);

  const megtortent = elozmenyek.filter((e) => e.status === "COMPLETED");
  const nemJott = elozmenyek.filter((e) => e.status === "NO_SHOW");

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-3 py-5 sm:px-6 sm:py-7">
      <header>
        <Link href="/admin/vendegek" className="text-sm font-medium text-[#004a6d] hover:underline">
          ‹ Vendégek
        </Link>
        <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">{vendeg.name}</h1>
        <p className="mt-0.5 wrap-break-word text-sm text-gray-500">
          {vendeg.email}
          {vendeg.phone && ` · ${vendeg.phone}`}
        </p>
      </header>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <Doboz cimke="Fizetve" ertek={String(megtortent.length)} />
        <Doboz cimke="Nem jelent meg" ertek={String(nemJott.length)} />
        <Doboz cimke="Összes alkalom" ertek={String(elozmenyek.length)} />
      </div>

      {!lathatMindent && (
        <p className="rounded-md bg-amber-50 px-4 py-2 text-sm text-amber-900">
          Csak a saját foglalásaid látszanak ennél a vendégnél.
        </p>
      )}

      {elozmenyek.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-gray-900">Ehhez a vendéghez nincs foglalás.</p>
        </div>
      ) : (
        <>
          {/* mobilon kártyák */}
          <ul className="space-y-2 md:hidden">
            {elozmenyek.map((e) => {
              const a = ALLAPOT[e.status] ?? ALLAPOT.BOOKED;
              return (
                <li key={e.id} className="rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">{idopont(e.startsAt)}</p>
                    <span
                      className={"shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium " + a.stilus}
                    >
                      {a.felirat}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{e.szolgaltatas}</p>
                  <p className="text-xs text-gray-500">
                    {forint(e.price)} · {e.munkatars}
                  </p>
                  {e.notes && <p className="mt-1 text-xs text-gray-500">{e.notes}</p>}
                </li>
              );
            })}
          </ul>

          <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3 font-medium">Időpont</th>
                  <th className="px-4 py-3 font-medium">Szolgáltatás</th>
                  <th className="px-4 py-3 font-medium">Munkatárs</th>
                  <th className="px-4 py-3 font-medium">Állapot</th>
                </tr>
              </thead>
              <tbody>
                {elozmenyek.map((e) => {
                  const a = ALLAPOT[e.status] ?? ALLAPOT.BOOKED;
                  return (
                    <tr key={e.id} className="border-b border-gray-100 last:border-0">
                      <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                        {idopont(e.startsAt)}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {e.szolgaltatas}
                        <span className="block text-xs text-gray-500">{forint(e.price)}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{e.munkatars}</td>
                      <td className="px-4 py-3">
                        <span className={"rounded-full px-2.5 py-1 text-xs font-medium " + a.stilus}>
                          {a.felirat}
                        </span>
                        {e.notes && (
                          <span className="mt-1 block max-w-xs text-xs text-gray-500">{e.notes}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}

function Doboz({ cimke, ertek }: { cimke: string; ertek: string }) {
  return (
    <div className="rounded-xl bg-white p-3 shadow-sm sm:p-4">
      <p className="text-[10px] font-medium uppercase leading-tight tracking-wide text-gray-500 sm:text-xs">
        {cimke}
      </p>
      <p className="mt-1 text-lg font-bold text-gray-900 sm:text-xl">{ertek}</p>
    </div>
  );
}
