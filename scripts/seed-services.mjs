// A Service tábla feltöltése az árlista alapján.
// Futtatás:  node --env-file=.env.local scripts/seed-services.mjs
//
// Idempotens: név alapján ellenőriz, meglévő sort nem duplikál és nem ír felül.
import { pool } from "../lib/db.ts";

// durationMin = a kezelés tényleges hossza
// blockMin    = mennyi időt foglaljon a naptárban (kezelés + átállás)
// bookable    = önállóan foglalható-e időpontként
//
// Átállás csak az 50 perces kezelések után van. A 30 percesnél a 10 perc a
// kezelés egyharmadát toldaná hozzá, és elcsúsztatná a napot a félórás
// rasztertől; két rövid kezelés között erre nincs szükség.
const SZUNET = 10;
const atallas = (durationMin) => (durationMin >= 50 ? SZUNET : 0);

const kezeles = (name, price, durationMin, description) => ({
  name, price, durationMin, blockMin: durationMin + atallas(durationMin),
  bookable: true, description,
});

const kiegeszito = (name, price) => ({
  name, price, durationMin: 0, blockMin: 0, bookable: false, description: null,
});

const szolgaltatasok = [
  kezeles("Egyéni gyógytorna / rehabilitáció – 50 perc", 16000, 50,
    "Állapotfelmérés, rehabilitációs ütemterv, célzott gyakorlatorientált terápia, házi feladatok"),
  kezeles("Egyéni gyógytorna / rehabilitáció – 30 perc", 9000, 30,
    "Célzott terápia, házi feladatok. Első alkalom esetén kizárólag 50 perces foglalható."),
  kezeles("Lágy rész manuál terápia (FDM) – 50 perc", 18000, 50,
    "FDM kezelés, triggerpont terápia, eszköztámogatott manuális technikák, Medical Flossing"),
  kezeles("Lágy rész manuál terápia (FDM) – 30 perc", 10000, 30, null),
  kezeles("Schroth terápia – 50 perc", 16000, 50,
    "Gerincferdülés Schroth-módszeren alapuló kezelése, izomerősítő és mobilizációs technikákkal"),
  kezeles("TMI (állkapocs ízületi) terápia – 50 perc", 20000, 50,
    "Komplex állapotfelmérés, kezelési terv, manuális kezelés extra- és intraorálisan, házi feladatok"),

  // Csoportos: egyelőre egy foglalásként kezeljük, a résztvevők a megjegyzésbe kerülnek.
  kezeles("Csoportos gerinc core edzés – 50 perc", 8000, 50,
    "Csoportos alkalom. A résztvevőket a foglalás megjegyzés mezőjébe kell felvenni."),
  kezeles("Csoportos gerinc core edzés – 30 perc", 6000, 30,
    "Csoportos alkalom. A résztvevőket a foglalás megjegyzés mezőjébe kell felvenni."),

  // Kezelés közben adott tételek, nem önálló időpontok.
  kiegeszito("Kineziológiai tape", 5000),
  kiegeszito("Dinamikus tape", 8000),
];

let uj = 0, kihagyva = 0;

try {
  for (const sz of szolgaltatasok) {
    const van = await pool.query(`SELECT id FROM "Service" WHERE name = $1`, [sz.name]);
    if (van.rowCount > 0) { kihagyva++; continue; }

    await pool.query(
      `INSERT INTO "Service" (name, description, price, "durationMin", "blockMin", bookable, active)
       VALUES ($1, $2, $3, $4, $5, $6, true)`,
      [sz.name, sz.description, sz.price, sz.durationMin, sz.blockMin, sz.bookable]
    );
    uj++;
  }
  console.log(`Kesz. Uj sor: ${uj}, mar letezett: ${kihagyva}`);
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
