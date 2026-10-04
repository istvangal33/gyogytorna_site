import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import {
  felhasznaloAzonositoval,
  foglalhatoSzolgaltatasok,
  munkatarsArai,
} from "@/lib/db";
import ArakUrlap from "@/components/admin/ArakUrlap";

export const metadata: Metadata = {
  title: "Árak",
  robots: { index: false, follow: false },
};

export default async function ArakPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await bejelentkezettFelhasznalo();
  if (!user) redirect("/admin/login");
  if (user.role !== "ADMIN") redirect("/admin");

  const { id } = await params;

  const munkatars = await felhasznaloAzonositoval(id);
  if (!munkatars) notFound();

  const szolgaltatasok = await foglalhatoSzolgaltatasok();
  const felulirasok = await munkatarsArai(id);

  const sajat: Record<string, number> = {};
  for (const f of felulirasok) sajat[f.serviceId] = f.price;

  return (
    <main className="mx-auto max-w-3xl px-3 py-5 sm:px-6 sm:py-7">
      <header className="mb-5">
        <Link
          href="/admin/felhasznalok"
          className="text-sm text-gray-400 transition-colors hover:text-gray-600"
        >
          ‹ Felhasználók
        </Link>
        <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
          {munkatars.name} árai
        </h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Üresen hagyva az árlista ára érvényes, és egy későbbi áremelés magától
          követi. Csak ott írj be értéket, ahol eltér.
        </p>
      </header>

      <ArakUrlap
        userId={id}
        nev={munkatars.name}
        szolgaltatasok={szolgaltatasok.map((s) => ({
          id: s.id,
          nev: s.name,
          arlistaAr: s.price,
          perc: s.durationMin,
        }))}
        sajatArak={sajat}
      />
    </main>
  );
}
