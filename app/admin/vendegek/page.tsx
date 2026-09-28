import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import { vendegLista } from "@/lib/db";

export const metadata: Metadata = {
  title: "Vendégek",
  robots: { index: false, follow: false },
};

function datum(ertek: string | null) {
  if (!ertek) return "—";
  return new Intl.DateTimeFormat("hu-HU", { dateStyle: "medium" }).format(new Date(ertek));
}

export default async function VendegekPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = await bejelentkezettFelhasznalo();
  if (!user) redirect("/admin/login");

  const lathatMindent = user.role === "ADMIN" || user.canViewAll;

  const { q } = await searchParams;
  const kereses = q ?? "";

  // aki nem lát mindent, csak a saját vendégeit kapja
  const vendegek = await vendegLista(kereses, lathatMindent ? null : user.id);

  return (
    <main className="mx-auto max-w-5xl px-3 py-5 sm:px-6 sm:py-7">
      <header className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Vendégek</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          {lathatMindent
            ? "Minden vendég, aki már járt nálatok."
            : "Azok a vendégek, akik nálad jártak."}
        </p>
      </header>

      <form method="get" className="mb-4 flex flex-wrap gap-2">
        <input
          name="q"
          defaultValue={kereses}
          placeholder="Keresés név, e-mail vagy telefon szerint…"
          className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[#004a6d] focus:outline-none focus:ring-1 focus:ring-[#004a6d]"
        />
        <button
          type="submit"
          className="rounded-md bg-[#004a6d] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#003652]"
        >
          Keresés
        </button>
        {kereses && (
          <Link
            href="/admin/vendegek"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Törlés
          </Link>
        )}
      </form>

      {vendegek.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <p className="text-gray-900">
            {kereses ? "Nincs találat erre a keresésre." : "Még nincs egyetlen vendég sem."}
          </p>
        </div>
      ) : (
        <>
          {/* mobilon kártyák — táblázatot vízszintesen görgetni kellemetlen */}
          <ul className="space-y-2 md:hidden">
            {vendegek.map((v) => (
              <li key={v.id} className="rounded-xl bg-white p-4 shadow-sm">
                <Link href={`/admin/vendegek/${v.id}`} className="font-semibold text-[#004a6d]">
                  {v.name}
                </Link>
                <p className="mt-1 truncate text-sm text-gray-600">{v.email}</p>
                {v.phone && <p className="text-sm text-gray-500">{v.phone}</p>}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                  <span>
                    <strong className="text-gray-900">{v.megtortent}</strong> fizetve
                    {v.osszes !== v.megtortent && ` / ${v.osszes}`}
                  </span>
                  <span>utolsó: {datum(v.utolso)}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3 font-medium">Név</th>
                  <th className="px-4 py-3 font-medium">Elérhetőség</th>
                  <th className="px-4 py-3 font-medium">Alkalmak</th>
                  <th className="px-4 py-3 font-medium">Utolsó</th>
                </tr>
              </thead>
              <tbody>
                {vendegek.map((v) => (
                  <tr key={v.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/vendegek/${v.id}`}
                        className="font-medium text-[#004a6d] hover:underline"
                      >
                        {v.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div>{v.email}</div>
                      {v.phone && <div className="text-xs text-gray-500">{v.phone}</div>}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-gray-700">
                      {v.megtortent} fizetve
                      {v.osszes !== v.megtortent && (
                        <span className="text-gray-400"> / {v.osszes} összesen</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">{datum(v.utolso)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {vendegek.length === 200 && (
        <p className="mt-3 text-xs text-gray-500">
          Csak az első 200 vendég látszik. Szűkíts a kereséssel.
        </p>
      )}
    </main>
  );
}
