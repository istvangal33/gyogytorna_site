import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import { osszesSzolgaltatas } from "@/lib/db";
import SzolgaltatasLista from "@/components/admin/SzolgaltatasLista";

export const metadata: Metadata = {
  title: "Szolgáltatások",
  robots: { index: false, follow: false },
};

export default async function SzolgaltatasokPage() {
  const user = await bejelentkezettFelhasznalo();
  if (!user) redirect("/admin/login");

  // Az árlista mindenki foglalására hat, ezért adminisztrátorhoz kötött.
  if (user.role !== "ADMIN") redirect("/admin");

  const szolgaltatasok = await osszesSzolgaltatas();

  return (
    <main className="mx-auto max-w-5xl px-3 py-5 sm:px-6 sm:py-7">
      <header className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Szolgáltatások</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Az árlista és a kezelések hossza. A módosítás a mostantól felvett
          foglalásokra érvényes — a korábbiakon a régi ár marad.
        </p>
      </header>

      <SzolgaltatasLista szolgaltatasok={szolgaltatasok} />
    </main>
  );
}
