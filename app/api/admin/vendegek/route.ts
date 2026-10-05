// Vendégkeresés a foglalási űrlap automatikus kitöltéséhez.
//
// Szándékosan nincs munkatárs szerinti szűrés: a vendégek a rendelő közös
// adatai, és aki foglalást vesz fel, annak mindenképp látnia kell, hogy az
// illető szerepel-e már — különben másodpéldány keletkezik, és kettéhasad az
// előzménye.
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import { vendegKeresese } from "@/lib/db";

export async function GET(req: Request) {
  const user = await bejelentkezettFelhasznalo();
  if (!user) {
    return Response.json({ hiba: "Nincs bejelentkezve." }, { status: 401 });
  }

  const minta = new URL(req.url).searchParams.get("q") ?? "";
  const talalatok = await vendegKeresese(minta);

  return Response.json({
    vendegek: talalatok.map((v) => ({
      id: v.id,
      nev: v.name,
      email: v.email,
      telefon: v.phone,
      foglalasDb: v.foglalas_db,
      utolso: v.utolso,
    })),
  });
}
