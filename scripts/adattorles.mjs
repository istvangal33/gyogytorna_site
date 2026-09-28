// A megorzesi idon tuli adatok torlese — kezi futtatashoz es ellenorzeshez.
//
//   node --env-file=.env.local scripts/adattorles.mjs          (proba: nem torol)
//   node --env-file=.env.local scripts/adattorles.mjs eles     (tenylegesen torol)
//
// A script a valodi API vegpontot hivja — ugyanazt, amit elesben a Vercel Cron
// fog —, igy a jogosultsag-ellenorzes is a tesztelt uton fut.
import { pool, foglalasok } from "../lib/db.ts";
import { hatarnap, MEGORZES_EV } from "../lib/adattorles.ts";

const eles = process.argv[2] === "eles";
const ALAP = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

try {
  const hatar = hatarnap();
  console.log(`Megorzesi ido: ${MEGORZES_EV} ev`);
  console.log(`Hatarnap: ${hatar.toISOString().slice(0, 10)} — az ennel korabbi foglalasok torlendok.\n`);

  if (!eles) {
    // A proba a vegponton keresztul megy, hogy ugyanazt a kodot merje, ami elesben fut
    const titok = process.env.CRON_SECRET;
    if (!titok) throw new Error("Nincs CRON_SECRET a .env.local-ban.");

    const res = await fetch(`${ALAP}/api/cron/adattorles?proba=1`, {
      headers: { authorization: `Bearer ${titok}` },
    });
    if (!res.ok) throw new Error(`A vegpont HTTP ${res.status}-t adott: ${await res.text()}`);

    const o = await res.json();
    console.log(`PROBA — egy eles futas ${o.foglalas} foglalast es ${o.vendeg} vendeget torolne.`);

    if (o.foglalas > 0) {
      const regi = await foglalasok(new Date(0), hatar, null);
      console.log("\nAmit torolne:");
      for (const f of regi.slice(0, 20)) {
        console.log(
          "  " + new Date(f.startsAt).toISOString().slice(0, 10) + "  " + f.vendeg + "  " + f.szolgaltatas
        );
      }
      if (regi.length > 20) console.log(`  ... es meg ${regi.length - 20} db`);
    }

    console.log("\n(nem toroltem semmit — az eles futashoz: scripts/adattorles.mjs eles)");
  } else {
    const titok = process.env.CRON_SECRET;
    if (!titok) throw new Error("Nincs CRON_SECRET a .env.local-ban.");

    const res = await fetch(`${ALAP}/api/cron/adattorles`, {
      headers: { authorization: `Bearer ${titok}` },
    });
    if (!res.ok) throw new Error(`A vegpont HTTP ${res.status}-t adott: ${await res.text()}`);

    const o = await res.json();
    console.log(`TOROLVE: ${o.foglalas} foglalas, ${o.vendeg} vendeg.`);
  }
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
