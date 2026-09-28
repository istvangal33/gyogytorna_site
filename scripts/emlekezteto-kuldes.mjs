// Emlékeztetők kiküldése — fejlesztéshez és ellenőrzéshez.
//
//   node --env-file=.env.local scripts/emlekezteto-kuldes.mjs 1 proba
//   node --env-file=.env.local scripts/emlekezteto-kuldes.mjs 1
//
// A "proba" csak kilistázza, kinek menne levél. Küldéskor a script a valódi
// API végpontot hívja — ugyanazt, amit élesben a Vercel Cron fog —, így a
// jogosultság-ellenőrzés is a tesztelt úton fut.
import { pool, emlekeztetoreVaroFoglalasok } from "../lib/db.ts";

const napok = Number(process.argv[2] ?? "1");
const proba = process.argv[3] === "proba";
const ALAP = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

try {
  if (proba) {
    const varo = await emlekeztetoreVaroFoglalasok(napok);
    console.log(`PROBA - ${napok} nap mulva, ${varo.length} foglalas varna emlekeztetore:`);
    for (const f of varo) {
      console.log(
        "  " +
          new Date(f.startsAt).toLocaleString("hu-HU", { dateStyle: "short", timeStyle: "short" }) +
          "  " + f.vendeg + "  <" + f.vendeg_email + ">"
      );
    }
    if (varo.length === 0) console.log("  (egy sem)");
    console.log("\n(levelet nem kuldtem)");
  } else {
    const titok = process.env.CRON_SECRET;
    if (!titok) throw new Error("Nincs CRON_SECRET a .env.local-ban.");

    const res = await fetch(`${ALAP}/api/cron/emlekezteto?napok=${napok}`, {
      headers: { authorization: `Bearer ${titok}` },
    });

    if (!res.ok) {
      console.error(`A vegpont HTTP ${res.status}-t adott:`, await res.text());
      process.exitCode = 1;
    } else {
      const o = await res.json();
      console.log(`Talalt: ${o.talalt}, kikuldve: ${o.kikuldve}, sikertelen: ${o.sikertelen}`);
      for (const r of o.reszletek ?? []) {
        console.log(`  ${r.ok ? "OK  " : "HIBA"} ${r.idopont}  ${r.vendeg}${r.hiba ? "  -> " + r.hiba : ""}`);
      }
    }
  }
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
