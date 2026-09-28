import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import { felhasznalokReszletesen } from "@/lib/db";
import FelhasznaloLista from "@/components/admin/FelhasznaloLista";

export const metadata: Metadata = {
  title: "Felhasználók",
  robots: { index: false, follow: false },
};

export default async function FelhasznalokPage() {
  const user = await bejelentkezettFelhasznalo();
  if (!user) redirect("/admin/login");

  // Ez az oldal adminisztrátoroknak szól. Az alkalmazottat visszaküldjük.
  if (user.role !== "ADMIN") redirect("/admin");

  const felhasznalok = await felhasznalokReszletesen();

  return (
    <main className="mx-auto max-w-5xl px-3 py-5 sm:px-6 sm:py-7">
      <header className="mb-5">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Felhasználók</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Munkatársak felvétele és jogosultságaik kezelése.
        </p>
      </header>

      <FelhasznaloLista felhasznalok={felhasznalok} sajatId={user.id} />
    </main>
  );
}
