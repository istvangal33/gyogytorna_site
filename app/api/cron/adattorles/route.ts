// A megőrzési időn túli foglalások törlése. Ütemezett hívásra való (Vercel Cron).
//
// Védelem: CRON_SECRET környezeti változó, ugyanúgy, mint az emlékeztetőnél.
// Enélkül a végpont nem működik — ez a művelet visszafordíthatatlan, nem
// maradhat véletlenül nyitva.
//
// A ?proba=1 paraméterrel végigszámolja, mit törölne, de nem töröl semmit.
import { regiAdatokTorlese } from "@/lib/db";
import { hatarnap, MEGORZES_EV } from "@/lib/adattorles";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const titok = process.env.CRON_SECRET;

  if (!titok) {
    console.error("[adattörlés] nincs CRON_SECRET beállítva, a végpont le van tiltva");
    return Response.json({ hiba: "A végpont nincs beállítva." }, { status: 503 });
  }

  const fejlec = req.headers.get("authorization");
  if (fejlec !== `Bearer ${titok}`) {
    return Response.json({ hiba: "Nincs jogosultság." }, { status: 401 });
  }

  const url = new URL(req.url);
  const proba = url.searchParams.get("proba") === "1";

  const hatar = hatarnap();
  const eredmeny = await regiAdatokTorlese(hatar, proba);

  console.log(
    `[adattörlés] ${proba ? "PRÓBA — nem törölt semmit" : "törölve"}: ` +
      `${eredmeny.foglalas} foglalás, ${eredmeny.vendeg} vendég ` +
      `(${MEGORZES_EV} évnél régebbi, határnap: ${hatar.toISOString().slice(0, 10)})`
  );

  return Response.json({ ...eredmeny, megorzesEv: MEGORZES_EV });
}
