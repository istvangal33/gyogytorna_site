import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import { felhasznaloAzonositoval, munkatarsMunkaideje } from "@/lib/db";
import MunkaidoUrlap from "@/components/admin/MunkaidoUrlap";

export const metadata: Metadata = {
  title: "Munkaidő",
  robots: { index: false, follow: false },
};

export default async function MunkaidoPage({
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

  const beosztas = await munkatarsMunkaideje(id);

  return (
    <main className="mx-auto max-w-2xl px-3 py-5 sm:px-6 sm:py-7">
      <header className="mb-5">
        <Link
          href="/admin/felhasznalok"
          className="text-sm text-gray-400 transition-colors hover:text-gray-600"
        >
          ‹ Felhasználók
        </Link>
        <h1 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
          {munkatars.name} munkaideje
        </h1>
        <p className="mt-0.5 text-sm text-gray-500">
          A naptár ebből számolja a felajánlott szabad időpontokat. Amelyik nap
          nincs bepipálva, az szabadnap — oda nem kínál időpontot.
        </p>
      </header>

      <MunkaidoUrlap
        userId={id}
        nev={munkatars.name}
        beosztas={beosztas}
      />
    </main>
  );
}
