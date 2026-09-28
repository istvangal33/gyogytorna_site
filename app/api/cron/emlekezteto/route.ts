// Emlékeztető levelek kiküldése. Ütemezett hívásra való (Vercel Cron).
//
// Védelem: CRON_SECRET környezeti változó. Enélkül a végpont nem működik —
// szándékosan, hogy éles környezetben ne lehessen véletlenül nyitva hagyni.
import { emlekeztetokKuldese } from "@/lib/emlekezteto";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const titok = process.env.CRON_SECRET;

  if (!titok) {
    console.error("[emlékeztető] nincs CRON_SECRET beállítva, a végpont le van tiltva");
    return Response.json({ hiba: "A végpont nincs beállítva." }, { status: 503 });
  }

  const fejlec = req.headers.get("authorization");
  if (fejlec !== `Bearer ${titok}`) {
    return Response.json({ hiba: "Nincs jogosultság." }, { status: 401 });
  }

  const url = new URL(req.url);
  const napok = Number(url.searchParams.get("napok") ?? "1");

  const osszegzes = await emlekeztetokKuldese(Number.isFinite(napok) ? napok : 1);

  console.log(
    `[emlékeztető] talált: ${osszegzes.talalt}, kiküldve: ${osszegzes.kikuldve}, sikertelen: ${osszegzes.sikertelen}`
  );

  return Response.json(osszegzes);
}
