// A heti naptárnézet ellenőrzése: heti tartomány lekérése, a naponkénti
// csoportosítás és az átfedő foglalások savkiosztasa valos adaton.
//
//   node --env-file=.env.local scripts/teszt-heti-nezet.mjs
//
// Futó dev szervert feltételez a 3000-es porton. Ideiglenes TESZT
// felhasználókat és foglalásokat hoz létre, majd a végén mindent töröl.
import bcrypt from "bcryptjs";
import { pool, foglalhatoSzolgaltatasok, foglalasMentese } from "../lib/db.ts";
import { savKiosztas } from "../lib/atfedes.ts";

const BASE = "http://localhost:3000";
const ADMIN_EMAIL = "teszt.het.admin@example.invalid";
const MASIK_EMAIL = "teszt.het.masik@example.invalid";
const BEOSZTOTT_EMAIL = "teszt.het.beosztott@example.invalid";
const JELSZO = "TesztJelszo123";

let siker = 0, bukas = 0;
const bukottak = [];
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; bukottak.push(cimke); console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};
const fejezet = (cim) => console.log("\n=== " + cim + " ===");

class Jar {
  constructor() { this.sutik = new Map(); }
  frissit(res) {
    for (const sor of res.headers.getSetCookie?.() ?? []) {
      const [par] = sor.split(";");
      const i = par.indexOf("=");
      if (i > 0) this.sutik.set(par.slice(0, i).trim(), par.slice(i + 1).trim());
    }
  }
  fejlec() { return [...this.sutik].map(([k, v]) => k + "=" + v).join("; "); }
}

async function keres(ut, { jar, method = "GET", body } = {}) {
  const fejlecek = {};
  if (jar) fejlecek.cookie = jar.fejlec();
  if (body) fejlecek["content-type"] = "application/x-www-form-urlencoded";
  const res = await fetch(BASE + ut, { method, headers: fejlecek, body, redirect: "manual" });
  if (jar) jar.frissit(res);
  return res;
}

async function belepes(email, jelszo) {
  const jar = new Jar();
  const { csrfToken } = await (await keres("/api/auth/csrf", { jar })).json();
  const test = new URLSearchParams({ csrfToken, email, password: jelszo, callbackUrl: BASE + "/admin" });
  const res = await keres("/api/auth/callback/credentials", { jar, method: "POST", body: test.toString() });
  const hova = res.headers.get("location") ?? "";
  return { jar, sikeres: !hova.includes("error=") };
}

// ---------------------------------------------------------------- naptár-idők

function napKezdete(d) { const u = new Date(d); u.setHours(0, 0, 0, 0); return u; }

function hetNapjai(kozepe) {
  const eltolas = (kozepe.getDay() + 6) % 7;      // hétfővel kezdődő hét
  const hetfo = napKezdete(kozepe);
  hetfo.setDate(hetfo.getDate() - eltolas);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(hetfo);
    d.setDate(hetfo.getDate() + i);
    return d;
  });
}

// két héttel későbbi hét, hogy ne ütközzön valódi adattal
const cel = new Date();
cel.setDate(cel.getDate() + 14);
const napok = hetNapjai(cel);
const HETFO = napok[0];
const SZERDA = napok[2];
const CSUTORTOK = napok[3];

const hetVege = new Date(napok[6]);
hetVege.setDate(hetVege.getDate() + 1);
hetVege.setHours(0, 0, 0, 0);

const kedd = napok[1];
const keddVege = new Date(kedd);
keddVege.setDate(keddVege.getDate() + 1);

const idopont = (nap, o, p = 0) => { const d = new Date(nap); d.setHours(o, p, 0, 0); return d; };
const percOffset = (iso) => { const d = new Date(iso); return (d.getHours() - 7) * 60 + d.getMinutes(); };
const ugyanaznap = (a, b) => new Date(a).toDateString() === new Date(b).toDateString();

// ---------------------------------------------------------------- előkészítés

const hash = await bcrypt.hash(JELSZO, 10);

async function felhasznalo(nev, email, szerep, lathatMindent) {
  const r = await pool.query(
    `INSERT INTO "User" (name, email, "passwordHash", role, "canViewAll", active)
     VALUES ($1, $2, $3, $4, $5, true)
     ON CONFLICT (email) DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash",
       role = EXCLUDED.role, "canViewAll" = EXCLUDED."canViewAll", active = true
     RETURNING id`,
    [nev, email, hash, szerep, lathatMindent]
  );
  return r.rows[0].id;
}

const adminId = await felhasznalo("TESZT Heti Admin", ADMIN_EMAIL, "ADMIN", true);
const masikId = await felhasznalo("TESZT Heti Masik", MASIK_EMAIL, "EMPLOYEE", false);
const beosztottId = await felhasznalo("TESZT Heti Beosztott", BEOSZTOTT_EMAIL, "EMPLOYEE", false);

// A beosztottnak csak szerdán van munkaideje, foglalása nincs: rajta múlik,
// hogy a heti lekérés tényleg a hét minden napját nézi-e.
await pool.query(
  `INSERT INTO "WorkingHours" ("staffId", weekday, "startMinute", "endMinute")
   VALUES ($1, $2, 480, 960)`,
  [beosztottId, SZERDA.getDay()]
);

try {
  const szolgaltatasok = await foglalhatoSzolgaltatasok();
  const sz = szolgaltatasok.find((s) => s.durationMin === 50) ?? szolgaltatasok[0];
  if (!sz) throw new Error("nincs foglalható szolgáltatás az adatbázisban");

  const vendegRes = await pool.query(
    `INSERT INTO "Client" (name, email) VALUES ($1, $2) RETURNING id`,
    ["TESZT Heti Vendeg", "teszt.heti.vendeg@example.invalid"]
  );
  const vendegId = vendegRes.rows[0].id;

  // kedd 9:00–10:00 (admin) és kedd 9:30–10:30 (másik) — ezek átfedik egymást
  const foglal = (staffId, kezdet, percek) =>
    foglalasMentese({
      clientId: vendegId, serviceId: sz.id, staffId,
      kezdet, veg: new Date(kezdet.getTime() + percek * 60000),
      createdById: adminId, megjegyzes: "TESZT heti", ar: sz.price,
    });

  await foglal(adminId, idopont(kedd, 9), 60);
  await foglal(masikId, idopont(kedd, 9, 30), 60);
  await foglal(adminId, idopont(CSUTORTOK, 14), 60);

  fejezet("1. Belépés");
  const admin = await belepes(ADMIN_EMAIL, JELSZO);
  ok("a teszt admin be tud lépni", admin.sikeres);

  fejezet("2. Heti tartomány lekérése");
  const p = new URLSearchParams({ kezdet: HETFO.toISOString(), veg: hetVege.toISOString() });
  const res = await keres("/api/admin/naptar?" + p.toString(), { jar: admin.jar });
  ok("a heti lekérés 200-at ad", res.status === 200, "HTTP " + res.status);

  const adat = await res.json();
  const sajat = adat.foglalasok.filter((f) => f.megjegyzes === "TESZT heti");
  ok("mindhárom foglalás egy kérésben megjön", sajat.length === 3, "db=" + sajat.length);

  fejezet("3. Naponkénti csoportosítás");
  const keddiek = sajat.filter((f) => ugyanaznap(f.kezdet, kedd));
  const csutortokiek = sajat.filter((f) => ugyanaznap(f.kezdet, CSUTORTOK));
  ok("kedden két foglalás", keddiek.length === 2, "db=" + keddiek.length);
  ok("csütörtökön egy foglalás", csutortokiek.length === 1, "db=" + csutortokiek.length);
  ok("hétfőn egy sem", sajat.filter((f) => ugyanaznap(f.kezdet, HETFO)).length === 0);

  fejezet("4. Átfedő foglalások elrendezése");
  const savok = savKiosztas(
    keddiek.map((f) => ({ id: f.id, kezdet: percOffset(f.kezdet), veg: percOffset(f.veg) }))
  );
  ok("a két keddi foglalás két sávra kerül", savok.every((s) => s.savok === 2),
    savok.map((s) => s.savok).join(","));
  ok("nem egymásra, hanem egymás mellé", new Set(savok.map((s) => s.sav)).size === 2);

  const csutortoki = savKiosztas(
    csutortokiek.map((f) => ({ id: f.id, kezdet: percOffset(f.kezdet), veg: percOffset(f.veg) }))
  );
  ok("a magányos csütörtöki teljes szélességű", csutortoki[0].savok === 1);

  fejezet("5. Oszlopok: kinek jár hely a heti nézetben");
  const nevek = adat.munkatarsak.map((m) => m.nev);
  ok("benne van, akinek foglalása van a héten", nevek.includes("TESZT Heti Masik"), nevek.join(", "));
  ok("benne van, akinek csak szerdán van munkaideje", nevek.includes("TESZT Heti Beosztott"), nevek.join(", "));

  fejezet("6. A napi nézet változatlan");
  const pKedd = new URLSearchParams({ kezdet: kedd.toISOString(), veg: keddVege.toISOString() });
  const napiRes = await keres("/api/admin/naptar?" + pKedd.toString(), { jar: admin.jar });
  const napi = await napiRes.json();
  const napiSajat = napi.foglalasok.filter((f) => f.megjegyzes === "TESZT heti");
  ok("a keddi lekérés csak a keddieket adja", napiSajat.length === 2, "db=" + napiSajat.length);
  ok(
    "a szerdai beosztott nem kap keddi oszlopot",
    !napi.munkatarsak.some((m) => m.nev === "TESZT Heti Beosztott"),
    napi.munkatarsak.map((m) => m.nev).join(", ")
  );

  fejezet("7. Láthatóság heti nézetben is szerveroldali");
  const masik = await belepes(MASIK_EMAIL, JELSZO);
  ok("a korlátozott jogú munkatárs be tud lépni", masik.sikeres);
  const masikRes = await keres("/api/admin/naptar?" + p.toString(), { jar: masik.jar });
  const masikAdat = await masikRes.json();
  const idegen = masikAdat.foglalasok.filter((f) => f.staffId !== masikId);
  ok("heti tartományban sem lát más foglalását", idegen.length === 0, "idegen=" + idegen.length);
  ok("a saját keddi foglalása viszont megvan",
    masikAdat.foglalasok.some((f) => f.megjegyzes === "TESZT heti"));
} finally {
  fejezet("Takarítás");
  const b = await pool.query(`DELETE FROM "Booking" WHERE notes = 'TESZT heti'`);
  const c = await pool.query(`DELETE FROM "Client" WHERE name LIKE 'TESZT Heti%'`);
  const w = await pool.query(
    `DELETE FROM "WorkingHours" WHERE "staffId" IN (SELECT id FROM "User" WHERE email IN ($1, $2, $3))`,
    [ADMIN_EMAIL, MASIK_EMAIL, BEOSZTOTT_EMAIL]
  );
  const u = await pool.query(`DELETE FROM "User" WHERE email IN ($1, $2, $3)`,
    [ADMIN_EMAIL, MASIK_EMAIL, BEOSZTOTT_EMAIL]);
  console.log(`  foglalás: ${b.rowCount}, vendég: ${c.rowCount}, munkaidő: ${w.rowCount}, felhasználó: ${u.rowCount}`);

  console.log("\n" + "=".repeat(46));
  console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
  if (bukottak.length) {
    console.log("\n  Bukott ellenőrzések:");
    for (const x of bukottak) console.log("    - " + x);
  }
  console.log("=".repeat(46));

  await pool.end();
  process.exitCode = bukas === 0 ? 0 : 1;
}
