// Ütemezett feladat: emlékeztető levelek a másnapi kezelésekről.
//
// Az ütemezést a netlify.toml tartalmazza (minden nap 16:00). Ez a függvény
// szándékosan nem csinál semmit maga: meghívja a /api/cron/emlekezteto
// végpontot, amelyben a logika már megvan és tesztelve van. Így nincs két
// helyen ugyanaz a kód, és a végpont jogosultság-ellenőrzése is a tesztelt
// úton fut.
//
// Helyi próba futó dev szerverrel:
//   node --env-file=.env.local -e "import('./netlify/functions/emlekezteto.mjs').then(m => m.default())"

const VEGPONT = "/api/cron/emlekezteto?napok=1";

const emlekeztetoFuttatas = async () => {
  const titok = process.env.CRON_SECRET;
  if (!titok) {
    console.error("[emlékeztető] nincs CRON_SECRET beállítva, a feladat nem fut le");
    return new Response("Nincs beállítva a CRON_SECRET.", { status: 503 });
  }

  // A Netlify az URL változóban adja a site címét; élesben a saját domainünk
  // a megbízható forrás, ezért az elsőbbséget élvez.
  const alap = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL;
  if (!alap) {
    console.error("[emlékeztető] nincs se NEXT_PUBLIC_SITE_URL, se URL");
    return new Response("Nincs beállítva a site címe.", { status: 503 });
  }

  try {
    const res = await fetch(alap + VEGPONT, {
      headers: { authorization: `Bearer ${titok}` },
    });

    if (!res.ok) {
      const szoveg = await res.text();
      console.error(`[emlékeztető] a végpont HTTP ${res.status}-t adott: ${szoveg}`);
      return new Response(`A végpont hibát adott: ${res.status}`, { status: 502 });
    }

    const o = await res.json();
    console.log(
      `[emlékeztető] talált: ${o.talalt}, kiküldve: ${o.kikuldve}, sikertelen: ${o.sikertelen}`
    );
    return Response.json(o);
  } catch (err) {
    console.error("[emlékeztető] a hívás nem sikerült:", err.message);
    return new Response("A hívás nem sikerült.", { status: 502 });
  }
};

export default emlekeztetoFuttatas;
