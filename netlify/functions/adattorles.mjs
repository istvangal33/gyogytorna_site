// Ütemezett feladat: a megőrzési időn túli foglalások törlése.
//
// Az ütemezést a netlify.toml tartalmazza (minden hónap 1-jén 3:00). Mint az
// emlékeztetőnél, ez a függvény sem tartalmaz logikát: a már meglévő és
// tesztelt /api/cron/adattorles végpontot hívja meg.
//
// A törlés visszafordíthatatlan, ezért a végpont CRON_SECRET nélkül nem
// működik, és ez a függvény sem indul el titok hiányában.
//
// Helyi PRÓBA (nem töröl semmit), futó dev szerverrel:
//   node --env-file=.env.local -e "import('./netlify/functions/adattorles.mjs').then(m => m.default(null, { proba: true }))"

const VEGPONT = "/api/cron/adattorles";

const adattorlesFuttatas = async (_req, context) => {
  const titok = process.env.CRON_SECRET;
  if (!titok) {
    console.error("[adattörlés] nincs CRON_SECRET beállítva, a feladat nem fut le");
    return new Response("Nincs beállítva a CRON_SECRET.", { status: 503 });
  }

  const alap = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL;
  if (!alap) {
    console.error("[adattörlés] nincs se NEXT_PUBLIC_SITE_URL, se URL");
    return new Response("Nincs beállítva a site címe.", { status: 503 });
  }

  // Próba mód csak kézi hívásnál: az ütemezett futás mindig éles.
  const proba = context?.proba === true;
  const cim = alap + VEGPONT + (proba ? "?proba=1" : "");

  try {
    const res = await fetch(cim, { headers: { authorization: `Bearer ${titok}` } });

    if (!res.ok) {
      const szoveg = await res.text();
      console.error(`[adattörlés] a végpont HTTP ${res.status}-t adott: ${szoveg}`);
      return new Response(`A végpont hibát adott: ${res.status}`, { status: 502 });
    }

    const o = await res.json();
    console.log(
      `[adattörlés] ${o.proba ? "PRÓBA — nem törölt semmit" : "törölve"}: ` +
        `${o.foglalas} foglalás, ${o.vendeg} vendég (határnap: ${o.hatarnap?.slice(0, 10)})`
    );
    return Response.json(o);
  } catch (err) {
    console.error("[adattörlés] a hívás nem sikerült:", err.message);
    return new Response("A hívás nem sikerült.", { status: 502 });
  }
};

export default adattorlesFuttatas;
