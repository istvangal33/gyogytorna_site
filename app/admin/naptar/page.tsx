import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import { munkaidok, foglalhatoSzolgaltatasok } from "@/lib/db";
import NapiNaptar from "@/components/admin/NapiNaptar";

export const metadata: Metadata = {
  title: "Naptár",
  robots: { index: false, follow: false },
};

export default async function NaptarPage() {
  // A jogosultságot az adatbázisból olvassuk, nem a tokenből: ha az admin
  // átállítja a canViewAll kapcsolót, az azonnal érvényes.
  const user = await bejelentkezettFelhasznalo();
  if (!user) redirect("/admin/login");

  const lathatMindent = user.role === "ADMIN" || user.canViewAll;

  const [idok, szolgaltatasok] = await Promise.all([munkaidok(), foglalhatoSzolgaltatasok()]);

  return (
    <main className="mx-auto max-w-7xl px-2 py-5 sm:px-6 sm:py-7">
      <header className="mb-4 px-1 sm:px-0">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Naptár</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          {lathatMindent
            ? "Minden munkatárs foglalásai látszanak."
            : "Csak a saját foglalásaid látszanak."}
        </p>
      </header>

      <NapiNaptar
        munkaidok={idok}
        szolgaltatasok={szolgaltatasok}
        lathatMindent={lathatMindent}
        foglalhatMasnak={user.canBookOthers === true}
        admin={user.role === "ADMIN"}
        sajatId={user.id}
      />
    </main>
  );
}
