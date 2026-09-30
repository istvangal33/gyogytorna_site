// A megorzesi ido lejarta utani automatikus torles ellenorzese.
//
//   node --env-file=.env.local scripts/teszt-adattorles.mjs
//
// Futo dev szervert feltetelez a 3000-es porton. Ideiglenes TESZT adatokat hoz
// letre visszadatalt idopontokkal, majd a vegen mindent torol.
import { pool, regiAdatokTorlese, foglalhatoSzolgaltatasok } from "../lib/db.ts";
import { hatarnap, MEGORZES_EV } from "../lib/adattorles.ts";

// A TESZT_BASE megadasaval mas kornyezet is vizsgalhato, pl. az eles telepites.
const BASE = process.env.TESZT_BASE || "http://localhost:3000";
const ADMIN_EMAIL = "teszt.torles.admin@example.invalid";

let siker = 0, bukas = 0;
const bukottak = [];
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; bukottak.push(cimke); console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};
const fejezet = (cim) => console.log("\n=== " + cim + " ===");

const hatar = hatarnap();
const evekkelEzelott = (ev, ora = 9) => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - ev);
  d.setMonth(0, 15);            // januar 15., hogy biztosan a hatarnap egyik oldalan legyen
  d.setHours(ora, 0, 0, 0);
  return d;
};

try {
  fejezet("0. Hatarnap");
  console.log(`  megorzesi ido: ${MEGORZES_EV} ev, hatarnap: ${hatar.toISOString().slice(0, 10)}`);
  ok("a hatarnap a multban van", hatar < new Date());
  ok(
    `a hatarnap kozel ${MEGORZES_EV} evvel ezelotti`,
    new Date().getFullYear() - hatar.getFullYear() === MEGORZES_EV
  );

  // Biztonsagi fek: ha az adatbazisban van valodi, hatarnapnal regebbi adat, azt
  // ez a teszt toroln�, ezert ilyenkor nem futtatjuk az eles agat.
  const elozetes = await regiAdatokTorlese(hatar, true);
  if (elozetes.foglalas > 0 || elozetes.vendeg > 0) {
    console.log(
      `\n  FIGYELEM: az adatbazisban mar van ${elozetes.foglalas} regi foglalas es ` +
        `${elozetes.vendeg} arva vendeg. A teszt ezeket is torolne, ezert megall.`
    );
    console.log("  Elobb nezd meg: node --env-file=.env.local scripts/adattorles.mjs");
    process.exitCode = 1;
  } else {
    ok("indulaskor nincs torlendo valodi adat", true);

    // --- teszt adatok ---
    const adminRes = await pool.query(
      `INSERT INTO "User" (name, email, role, "canViewAll", active)
       VALUES ($1, $2, 'ADMIN', true, true)
       ON CONFLICT (email) DO UPDATE SET active = true
       RETURNING id`,
      ["TESZT Torles Admin", ADMIN_EMAIL]
    );
    const adminId = adminRes.rows[0].id;

    const szolg = (await foglalhatoSzolgaltatasok())[0];
    if (!szolg) throw new Error("nincs foglalhato szolgaltatas");

    const vendeg = async (nev, email, evekkel) => {
      const r = await pool.query(
        `INSERT INTO "Client" (name, email, "createdAt") VALUES ($1, $2, $3) RETURNING id`,
        [nev, email, evekkelEzelott(evekkel)]
      );
      return r.rows[0].id;
    };

    const foglalas = async (clientId, evekkel, ora) => {
      const kezdet = evekkelEzelott(evekkel, ora);
      const veg = new Date(kezdet.getTime() + szolg.blockMin * 60000);
      const r = await pool.query(
        `INSERT INTO "Booking" ("clientId", "serviceId", "staffId", "startsAt", "endsAt",
                                status, notes, "createdById", price)
         VALUES ($1, $2, $3, $4, $5, 'COMPLETED', 'TESZT torles', $6, $7) RETURNING id`,
        [clientId, szolg.id, adminId, kezdet, veg, adminId, szolg.price]
      );
      return r.rows[0].id;
    };

    // regi vendeg, csak regi foglalassal -> mindkettonek mennie kell
    const regiVendeg = await vendeg("TESZT Torles Regi", "teszt.torles.regi@example.invalid", MEGORZES_EV + 2);
    await foglalas(regiVendeg, MEGORZES_EV + 2, 9);

    // visszajaro vendeg: van regi es friss foglalasa is -> a vendeg maradjon
    const visszajaro = await vendeg("TESZT Torles Visszajaro", "teszt.torles.vissza@example.invalid", MEGORZES_EV + 2);
    await foglalas(visszajaro, MEGORZES_EV + 2, 11);
    const friss = await foglalas(visszajaro, 1, 11);

    // regen felvett vendeg, akihez soha nem keszult foglalas -> mennie kell
    const arva = await vendeg("TESZT Torles Arva", "teszt.torles.arva@example.invalid", MEGORZES_EV + 2);

    // most felvett vendeg foglalas nelkul -> maradnia kell
    const uj = await vendeg("TESZT Torles Uj", "teszt.torles.uj@example.invalid", 0);

    fejezet("1. Proba mod");
    const proba = await regiAdatokTorlese(hatar, true);
    ok("a proba 2 torlendo foglalast talal", proba.foglalas === 2, "db=" + proba.foglalas);
    ok("a proba 2 torlendo vendeget talal", proba.vendeg === 2, "db=" + proba.vendeg);

    const utana = await pool.query(`SELECT count(*)::int c FROM "Booking" WHERE notes = 'TESZT torles'`);
    ok("a proba tenylegesen nem torolt semmit", utana.rows[0].c === 3, "db=" + utana.rows[0].c);

    fejezet("2. Eles torles");
    const eles = await regiAdatokTorlese(hatar, false);
    ok("torolt 2 regi foglalast", eles.foglalas === 2, "db=" + eles.foglalas);
    ok("torolt 2 vendeget", eles.vendeg === 2, "db=" + eles.vendeg);

    const van = async (tabla, id) =>
      (await pool.query(`SELECT 1 FROM "${tabla}" WHERE id = $1`, [id])).rowCount === 1;

    ok("a friss foglalas megmaradt", await van("Booking", friss));
    ok("a csak regi foglalassal rendelkezo vendeg torlodott", !(await van("Client", regiVendeg)));
    ok("a regota nyilvantartott, foglalas nelkuli vendeg torlodott", !(await van("Client", arva)));

    fejezet("3. Amit nem szabad torolni");
    ok("a visszajaro vendeg megmaradt, mert van elo foglalasa", await van("Client", visszajaro));
    ok("a most felvett, foglalas nelkuli vendeg megmaradt", await van("Client", uj));

    fejezet("4. Ismetelt futas");
    const masodszor = await regiAdatokTorlese(hatar, true);
    ok("masodszorra mar nincs mit torolni", masodszor.foglalas === 0 && masodszor.vendeg === 0,
      `foglalas=${masodszor.foglalas}, vendeg=${masodszor.vendeg}`);

    fejezet("5. A vegpont vedelme");
    const titok = process.env.CRON_SECRET;
    const nyilt = await fetch(`${BASE}/api/cron/adattorles?proba=1`);
    ok("titok nelkul 401", nyilt.status === 401, "HTTP " + nyilt.status);

    const rosszTitok = await fetch(`${BASE}/api/cron/adattorles?proba=1`, {
      headers: { authorization: "Bearer rossz-titok" },
    });
    ok("rossz titokkal 401", rosszTitok.status === 401, "HTTP " + rosszTitok.status);

    const jo = await fetch(`${BASE}/api/cron/adattorles?proba=1`, {
      headers: { authorization: `Bearer ${titok}` },
    });
    ok("helyes titokkal 200", jo.status === 200, "HTTP " + jo.status);

    const test = await jo.json();
    ok("a vegpont proba modban valaszol", test.proba === true);
    ok("a valasz tartalmazza a megorzesi idot", test.megorzesEv === MEGORZES_EV, "ev=" + test.megorzesEv);
  }
} finally {
  fejezet("Takaritas");
  const b = await pool.query(`DELETE FROM "Booking" WHERE notes = 'TESZT torles'`);
  const c = await pool.query(`DELETE FROM "Client" WHERE name LIKE 'TESZT Torles%'`);
  const u = await pool.query(`DELETE FROM "User" WHERE email = $1`, [ADMIN_EMAIL]);
  console.log(`  foglalas: ${b.rowCount}, vendeg: ${c.rowCount}, felhasznalo: ${u.rowCount}`);

  console.log("\n" + "=".repeat(46));
  console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
  if (bukottak.length) {
    console.log("\n  Bukott ellenorzesek:");
    for (const x of bukottak) console.log("    - " + x);
  }
  console.log("=".repeat(46));

  await pool.end();
  if (bukas > 0) process.exitCode = 1;
}
