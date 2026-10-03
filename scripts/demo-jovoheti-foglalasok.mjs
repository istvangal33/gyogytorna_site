// Jovo heti foglalasok a meglevo munkatarsakhoz — fejlesztoi adatbazishoz.
//
//   node --env-file=.env.local scripts/demo-jovoheti-foglalasok.mjs letrehoz
//   node --env-file=.env.local scripts/demo-jovoheti-foglalasok.mjs torol
//
// MIERT: a naptar, a heti nezet es az attekintes ures adatbazison nem mond
// semmit. Ehhez eleg sok es eleg valoszeru foglalas kell, hogy az atfedesek,
// a savkiosztas es a napi terheles is lathato legyen.
//
// A demo rekordokat a @demo.local e-mail vegzodes jeloli, ezert a torles
// biztonsagos: a valodi vendegekhez nem nyul. Nehany demo vendegnek
// szandekosan NINCS e-mail cime — ok telefonszammal szerepelnek, ahogy az
// eles hasznalatban is lesz.
//
// SOHA ne futtasd az eles adatbazis ellen.
import { pool } from "../lib/db.ts";

const parancs = process.argv[2] ?? "letrehoz";
const DOMAIN = "@demo.local";
const IDOZONA = "Europe/Budapest";

// Elethu vendegnevek; a telefonszamok szandekosan nem valos szamok.
// A harmadik elem: van-e e-mail cime. Aki e-mail nelkul szerepel, az a
// "csak nevvel rogzitett paciens" esetet peldazza.
const VENDEGEK = [
  ["Kovács Éva", "+36 30 214 8871", true],
  ["Nagy Péter", "+36 20 553 1140", true],
  ["Tóth Ildikó", "+36 70 882 3396", false],
  ["Szabó Gergely", "+36 30 447 9025", true],
  ["Horváth Zsuzsanna", "+36 20 118 6634", false],
  ["Varga Tamás", "+36 70 334 2258", true],
  ["Molnár Katalin", "+36 30 775 9913", false],
  ["Németh Balázs", "+36 20 661 4407", true],
  ["Farkas Anikó", "+36 70 229 8850", true],
  ["Balogh Zoltán", "+36 30 903 1176", false],
  ["Papp Erzsébet", "+36 20 487 3321", true],
  ["Takács Márton", "+36 70 556 7794", true],
  ["Juhász Nóra", "+36 30 118 2267", false],
  ["Lakatos Dániel", "+36 20 772 4418", true],
  ["Simon Veronika", "+36 70 395 6603", true],
];

// Determinisztikus veletlen: ugyanaz a parancs ugyanazt az adatot adja,
// igy a hibak reprodukalhatok.
let mag = 20261005;
const rnd = () => {
  mag = (mag * 1103515245 + 12345) % 2147483648;
  return mag / 2147483648;
};
const kozott = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const valaszt = (t) => t[Math.floor(rnd() * t.length)];

// A jovo het hetfoje. Ma szombat van, de a szamitas barmelyik napon helyes.
function jovoHetHetfoje() {
  const ma = new Date();
  const d = new Date(ma.getFullYear(), ma.getMonth(), ma.getDate());
  // 0=vasarnap … 1=hetfo. Hany nap mulva jon a KOVETKEZO hetfo?
  const mennyit = (8 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + mennyit);
  return d;
}

const fmtNap = (d) =>
  new Intl.DateTimeFormat("hu-HU", { month: "2-digit", day: "2-digit", weekday: "short", timeZone: IDOZONA }).format(d);

// A demo vendeget ketfelekeppen ismerjuk fel: e-mail vegzodesrol, vagy ha
// nincs e-mailje, a nevrol. Igy lehetnek kozottuk e-mail NELKULI vendegek is
// — ez eppen az a eset, amit a naptarban latni akarunk —, a torles megis
// biztonsagos marad: valodi vendeghez nem nyul.
const DEMO_NEVEK = VENDEGEK.map(([nev]) => nev);

async function torol() {
  const felt = `(c.email LIKE $1 OR (c.email IS NULL AND c.name = ANY($2)))`;
  const b = await pool.query(
    `DELETE FROM "Booking" b USING "Client" c WHERE c.id = b."clientId" AND ${felt}`,
    [`%${DOMAIN}`, DEMO_NEVEK]
  );
  const c = await pool.query(
    `DELETE FROM "Client" c WHERE ${felt}`,
    [`%${DOMAIN}`, DEMO_NEVEK]
  );
  return { foglalas: b.rowCount, vendeg: c.rowCount };
}

try {
  if (parancs === "torol") {
    const r = await torol();
    console.log(`\n  Torolve: ${r.foglalas} foglalas, ${r.vendeg} demo vendeg.\n`);
    process.exit(0);
  }

  const munkatarsak = (await pool.query(`SELECT id, name FROM "User" WHERE active ORDER BY "createdAt"`)).rows;
  const szolgaltatasok = (
    await pool.query(`SELECT id, name, price, "blockMin" FROM "Service" WHERE active AND bookable ORDER BY "blockMin"`)
  ).rows;
  const admin = (await pool.query(`SELECT id FROM "User" WHERE role = 'ADMIN' ORDER BY "createdAt" LIMIT 1`)).rows[0];

  if (!munkatarsak.length || !szolgaltatasok.length) throw new Error("Nincs munkatars vagy szolgaltatas.");

  // elobb takaritunk, hogy a ketszeri futas ne duplazzon
  await torol();

  // demo vendegek
  const vendegIdk = [];
  for (const [nev, tel, vanEmail] of VENDEGEK) {
    const email = vanEmail
      ? nev.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, ".") + DOMAIN
      : null;
    const r = await pool.query(
      `INSERT INTO "Client" (name, email, phone) VALUES ($1, $2, $3) RETURNING id`,
      [nev, email, tel]
    );
    vendegIdk.push(r.rows[0].id);
  }

  const hetfo = jovoHetHetfoje();
  let osszes = 0;
  const naplo = [];

  for (let nap = 0; nap < 5; nap++) {
    const d = new Date(hetfo);
    d.setDate(hetfo.getDate() + nap);

    for (const m of munkatarsak) {
      const cel = kozott(4, 8);
      let perc = 7 * 60 + kozott(0, 3) * 15; // 07:00 es 07:45 kozott kezd
      let db = 0;

      while (db < cel && perc < 19 * 60) {
        const sz = valaszt(szolgaltatasok);
        if (perc + sz.blockMin > 19 * 60) break;

        const kezdet = new Date(d.getFullYear(), d.getMonth(), d.getDate(), Math.floor(perc / 60), perc % 60);
        const veg = new Date(kezdet.getTime() + sz.blockMin * 60000);

        // tized resznyi lemondas, hogy a naptarban az is lathato legyen
        const allapot = rnd() < 0.1 ? "CANCELLED" : "BOOKED";

        try {
          await pool.query(
            `INSERT INTO "Booking" ("clientId","serviceId","staffId","startsAt","endsAt","createdById",price,status)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
            [valaszt(vendegIdk), sz.id, m.id, kezdet, veg, admin.id, sz.price, allapot]
          );
          db++;
          osszes++;
        } catch (e) {
          if (e.code !== "23P01") throw e; // atfedes: ezt az idosavot kihagyjuk
        }

        perc += sz.blockMin + kozott(0, 2) * 15; // 0–30 perc szunet
      }

      naplo.push(`    ${fmtNap(d).padEnd(12)}${String(m.name).padEnd(20)}${db} foglalas`);
    }
  }

  console.log(`\n  Jovo het: ${fmtNap(hetfo)} - ${fmtNap(new Date(hetfo.getTime() + 4 * 86400000))}\n`);
  for (const s of naplo) console.log(s);
  console.log(`\n  Osszesen ${osszes} foglalas, ${VENDEGEK.length} demo vendeggel.`);
  console.log(`  Torles:  node --env-file=.env.local scripts/demo-jovoheti-foglalasok.mjs torol\n`);
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
