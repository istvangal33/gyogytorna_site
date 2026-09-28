// Teljes tesztkészlet: HTTP-réteg valódi munkamenetekkel + adatréteg.
//
//   node --env-file=.env.local scripts/teszt-teljes.mjs
//
// Futó dev szervert feltételez a 3000-es porton. Ideiglenes TESZT
// felhasználókat és foglalásokat hoz létre, majd a végén mindent töröl.
import bcrypt from "bcryptjs";
import {
  pool,
  getUserByEmail,
  felhasznaloAzonositoval,
  ujVisszaallitoToken,
  ervenyesToken,
  tokenBevaltas,
  foglalhatoSzolgaltatasok,
  vendegRogzitese,
  vendegEmaillel,
  vendegKorabbiFoglalasai,
  foglalasMentese,
  foglalasAzonositoval,
  foglalasAllapota,
  foglalasModositasa,
  foglalasTorlese,
  munkaidok,
  visszaallitoKeresekSzama,
} from "../lib/db.ts";
import {
  ujToken,
  tokenLenyomat,
  lejaratIdopont,
  keresAblakKezdete,
  keretTullepve,
  KERES_MAX_ABLAKBAN,
} from "../lib/password-reset.ts";
import { munkamenetElavult } from "../lib/munkamenet-belyeg.ts";

const BASE = "http://localhost:3000";
const ADMIN_EMAIL = "teszt.admin@example.invalid";
const ALK_EMAIL = "teszt.alkalmazott@example.invalid";
const JELSZO = "TesztJelszo123";

let siker = 0;
let bukas = 0;
const bukottak = [];

function ok(cimke, feltetel, reszlet = "") {
  if (feltetel) {
    siker++;
    console.log("  OK    " + cimke);
  } else {
    bukas++;
    bukottak.push(cimke);
    console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : ""));
  }
}

function fejezet(cim) {
  console.log("\n=== " + cim + " ===");
}

// --- egyszerű sütitároló ---
class Jar {
  constructor() {
    this.sutik = new Map();
  }
  frissit(res) {
    for (const sor of res.headers.getSetCookie?.() ?? []) {
      const [par] = sor.split(";");
      const i = par.indexOf("=");
      if (i > 0) this.sutik.set(par.slice(0, i).trim(), par.slice(i + 1).trim());
    }
  }
  fejlec() {
    return [...this.sutik].map(([k, v]) => k + "=" + v).join("; ");
  }
}

async function keres(ut, { jar, method = "GET", body, redirect = "manual" } = {}) {
  const fejlecek = {};
  if (jar) fejlecek.cookie = jar.fejlec();
  if (body) fejlecek["content-type"] = "application/x-www-form-urlencoded";

  const res = await fetch(BASE + ut, { method, headers: fejlecek, body, redirect });
  if (jar) jar.frissit(res);
  return res;
}

async function belepes(email, jelszo) {
  const jar = new Jar();
  const csrfRes = await keres("/api/auth/csrf", { jar });
  const { csrfToken } = await csrfRes.json();

  const test = new URLSearchParams({
    csrfToken,
    email,
    password: jelszo,
    callbackUrl: BASE + "/admin",
  });

  const res = await keres("/api/auth/callback/credentials", {
    jar,
    method: "POST",
    body: test.toString(),
  });

  const hova = res.headers.get("location") ?? "";
  return { jar, sikeres: !hova.includes("error="), hova };
}

// ---------------------------------------------------------------- előkészítés

const hash = await bcrypt.hash(JELSZO, 10);

const adminRes = await pool.query(
  `INSERT INTO "User" (name, email, "passwordHash", role, "canViewAll", active)
   VALUES ($1, $2, $3, 'ADMIN', false, true)
   ON CONFLICT (email) DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash", role = 'ADMIN'
   RETURNING id`,
  ["TESZT Admin", ADMIN_EMAIL, hash]
);
const adminId = adminRes.rows[0].id;

const alkRes = await pool.query(
  `INSERT INTO "User" (name, email, "passwordHash", role, "canViewAll", active)
   VALUES ($1, $2, $3, 'EMPLOYEE', false, true)
   ON CONFLICT (email) DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash", role = 'EMPLOYEE', "canViewAll" = false
   RETURNING id`,
  ["TESZT Alkalmazott", ALK_EMAIL, hash]
);
const alkId = alkRes.rows[0].id;

try {
  // ------------------------------------------------------------ 1. útvonalvédelem
  fejezet("1. Útvonalvédelem bejelentkezés nélkül");

  const nyilt = new Jar();
  for (const [ut, varhato] of [
    ["/admin", 307],
    ["/admin/naptar", 307],
  ]) {
    const r = await keres(ut, { jar: nyilt });
    ok(`${ut} -> átirányít a belépésre`, r.status === varhato, "HTTP " + r.status);
  }

  const api = await keres("/api/admin/naptar?kezdet=2026-01-01&veg=2026-01-02", { jar: nyilt });
  ok("naptár API -> 401", api.status === 401, "HTTP " + api.status);

  for (const ut of ["/admin/login", "/admin/elfelejtett-jelszo", "/admin/uj-jelszo"]) {
    const r = await keres(ut, { jar: nyilt });
    ok(`${ut} elérhető belépés nélkül`, r.status === 200, "HTTP " + r.status);
  }

  const fooldal = await keres("/", { jar: nyilt });
  ok("publikus főoldal működik", fooldal.status === 200, "HTTP " + fooldal.status);

  // ------------------------------------------------------------ 2. bejelentkezés
  fejezet("2. Bejelentkezés");

  const rossz = await belepes(ALK_EMAIL, "rossz-jelszo");
  ok("rossz jelszó elutasítva", !rossz.sikeres);

  const nincsIlyen = await belepes("nincs.ilyen@example.invalid", "akarmi");
  ok("nem létező e-mail elutasítva", !nincsIlyen.sikeres);
  ok(
    "a két hiba megkülönböztethetetlen (nincs felhasználó-szimatolás)",
    rossz.hova === nincsIlyen.hova
  );

  const alk = await belepes(ALK_EMAIL, JELSZO);
  ok("alkalmazott be tud lépni", alk.sikeres, alk.hova);

  const admin = await belepes(ADMIN_EMAIL, JELSZO);
  ok("admin be tud lépni", admin.sikeres, admin.hova);

  const sess = await (await keres("/api/auth/session", { jar: alk.jar })).json();
  ok("a session tartalmazza a szerepkört", sess?.user?.role === "EMPLOYEE", JSON.stringify(sess?.user));

  const loginBelepve = await keres("/admin/login", { jar: alk.jar });
  ok("belépve a /admin/login átirányít", loginBelepve.status === 302 || loginBelepve.status === 307);

  const adminOldal = await keres("/admin", { jar: alk.jar });
  ok("belépve az /admin elérhető", adminOldal.status === 200, "HTTP " + adminOldal.status);

  for (const ut of ["/admin/naptar", "/admin/vendegek"]) {
    const v = await keres(ut, { jar: alk.jar });
    ok(`belépve a ${ut} elérhető`, v.status === 200, "HTTP " + v.status);
  }

  const felhAdmin = await keres("/admin/felhasznalok", { jar: admin.jar });
  ok("az admin eléri a /admin/felhasznalok oldalt", felhAdmin.status === 200, "HTTP " + felhAdmin.status);

  const felhAlk = await keres("/admin/felhasznalok", { jar: alk.jar });
  ok(
    "az alkalmazottat a /admin/felhasznalok visszairányítja",
    felhAlk.status === 302 || felhAlk.status === 307,
    "HTTP " + felhAlk.status
  );

  // ------------------------------------------------------------ 3. láthatóság
  fejezet("3. Naptár láthatóság");

  // tesztfoglalások: egy az alkalmazotthoz, egy az adminhoz
  const szolgaltatasok = await foglalhatoSzolgaltatasok();
  const sz50 = szolgaltatasok.find((s) => s.durationMin === 50);
  const sz30 = szolgaltatasok.find((s) => s.durationMin === 30);
  ok("van 50 és 30 perces szolgáltatás", Boolean(sz50 && sz30));

  const vendeg = await vendegRogzitese("TESZT Vendég", "teszt.vendeg@example.invalid", "+36 30 000 0000");

  const holnap = new Date();
  holnap.setDate(holnap.getDate() + 1);
  const ido = (o) => {
    const d = new Date(holnap);
    d.setHours(o, 0, 0, 0);
    return d;
  };

  const alkFoglalas = await foglalasMentese({
    clientId: vendeg.id, serviceId: sz50.id, staffId: alkId,
    kezdet: ido(9), veg: new Date(ido(9).getTime() + sz50.blockMin * 60000),
    createdById: adminId, megjegyzes: "TESZT foglalás", ar: sz50.price,
  });
  const adminFoglalas = await foglalasMentese({
    clientId: vendeg.id, serviceId: sz50.id, staffId: adminId,
    kezdet: ido(11), veg: new Date(ido(11).getTime() + sz50.blockMin * 60000),
    createdById: adminId, megjegyzes: "TESZT foglalás", ar: sz50.price,
  });

  const napP = (d) => {
    const k = new Date(d); k.setHours(0, 0, 0, 0);
    const v = new Date(k); v.setDate(v.getDate() + 1);
    return `kezdet=${encodeURIComponent(k.toISOString())}&veg=${encodeURIComponent(v.toISOString())}`;
  };

  const alkNaptar = await (await keres("/api/admin/naptar?" + napP(holnap), { jar: alk.jar })).json();
  ok("alkalmazott: lathatMindent = false", alkNaptar.lathatMindent === false);
  ok("alkalmazott csak 1 oszlopot lát", alkNaptar.munkatarsak.length === 1, JSON.stringify(alkNaptar.munkatarsak));
  ok(
    "alkalmazott nem látja az admin foglalását",
    !alkNaptar.foglalasok.some((f) => f.id === adminFoglalas)
  );
  ok(
    "alkalmazott látja a sajátját",
    alkNaptar.foglalasok.some((f) => f.id === alkFoglalas)
  );

  const megkerules = await (
    await keres("/api/admin/naptar?" + napP(holnap) + "&staffId=" + adminId, { jar: alk.jar })
  ).json();
  ok(
    "staffId paraméterrel sem fér hozzá más adataihoz",
    !megkerules.foglalasok.some((f) => f.id === adminFoglalas)
  );

  await pool.query(`UPDATE "User" SET "canViewAll" = true WHERE id = $1`, [alkId]);
  const engedve = await (await keres("/api/admin/naptar?" + napP(holnap), { jar: alk.jar })).json();
  ok("canViewAll bekapcsolva: azonnal érvényes újbóli belépés nélkül", engedve.lathatMindent === true);
  ok("most már látja az admin foglalását is", engedve.foglalasok.some((f) => f.id === adminFoglalas));

  await pool.query(`UPDATE "User" SET "canViewAll" = false WHERE id = $1`, [alkId]);
  const vissza = await (await keres("/api/admin/naptar?" + napP(holnap), { jar: alk.jar })).json();
  ok("visszakapcsolva újra csak a sajátját látja", vissza.lathatMindent === false);

  // ------------------------------------------------------------ 4. dupla foglalás
  fejezet("4. Ütközésvédelem");

  let utkozott = false;
  try {
    await foglalasMentese({
      clientId: vendeg.id, serviceId: sz30.id, staffId: alkId,
      kezdet: new Date(ido(9).getTime() + 10 * 60000),
      veg: new Date(ido(9).getTime() + 40 * 60000),
      createdById: adminId, megjegyzes: "TESZT foglalás ütköző", ar: sz30.price,
    });
  } catch (e) {
    utkozott = e.code === "23P01";
  }
  ok("átfedő foglalás elutasítva (23P01)", utkozott);

  await foglalasAllapota(alkFoglalas, "CANCELLED");
  let felszabadult = null;
  try {
    felszabadult = await foglalasMentese({
      clientId: vendeg.id, serviceId: sz30.id, staffId: alkId,
      kezdet: ido(9), veg: new Date(ido(9).getTime() + sz30.blockMin * 60000),
      createdById: adminId, megjegyzes: "TESZT foglalás lemondás után", ar: sz30.price,
    });
  } catch { /* nem baj */ }
  ok("lemondás után az idősáv újra foglalható", Boolean(felszabadult));
  if (felszabadult) await foglalasTorlese(felszabadult);
  await foglalasAllapota(alkFoglalas, "BOOKED");

  // ------------------------------------------------------------ 5. módosítás
  fejezet("5. Foglalás módosítása");

  await foglalasAllapota(alkFoglalas, "COMPLETED");
  ok("állapot COMPLETED-re állt", (await foglalasAzonositoval(alkFoglalas)).status === "COMPLETED");
  await foglalasAllapota(alkFoglalas, "BOOKED");
  ok("állapot visszaállt BOOKED-re", (await foglalasAzonositoval(alkFoglalas)).status === "BOOKED");

  let atrakasUtkozott = false;
  try {
    await foglalasModositasa(adminFoglalas, {
      serviceId: sz50.id, staffId: alkId,
      kezdet: ido(9), veg: new Date(ido(9).getTime() + sz50.blockMin * 60000),
      megjegyzes: "TESZT foglalás", ar: sz50.price,
    });
  } catch (e) {
    atrakasUtkozott = e.code === "23P01";
  }
  ok("átrakás foglalt sávra elutasítva", atrakasUtkozott);

  const modositva = await foglalasModositasa(adminFoglalas, {
    serviceId: sz30.id, staffId: adminId,
    kezdet: ido(15), veg: new Date(ido(15).getTime() + sz30.blockMin * 60000),
    megjegyzes: "TESZT foglalás átrakva", ar: sz30.price,
  });
  const modositott = await foglalasAzonositoval(adminFoglalas);
  ok("átrakás szabad sávra sikerült", modositva && new Date(modositott.startsAt).getHours() === 15);
  ok("a szolgáltatás is módosult", modositott.serviceId === sz30.id);

  // ------------------------------------------------------------ 6. vendégkezelés
  fejezet("6. Vendégkezelés");

  const ujra = await vendegRogzitese("TESZT Vendég Módosult", "teszt.vendeg@example.invalid", null);
  ok("ugyanaz az e-mail nem hoz létre új vendéget", ujra.id === vendeg.id);
  ok("a név frissült", ujra.name === "TESZT Vendég Módosult");

  const megorzott = await vendegEmaillel("teszt.vendeg@example.invalid");
  ok("a telefonszám megmaradt (nem írta felül null)", megorzott.phone === "+36 30 000 0000");

  const db = await vendegKorabbiFoglalasai(vendeg.id);
  ok("a vendég foglalásszáma számolható", typeof db === "number" && db >= 2, "db=" + db);

  // ------------------------------------------------------------ 7. jelszó-visszaállítás
  fejezet("7. Jelszó-visszaállítás");

  const user = await getUserByEmail(ALK_EMAIL);
  const { token, lenyomat } = ujToken();
  await ujVisszaallitoToken(user.id, lenyomat, lejaratIdopont());

  ok("a token érvényes", Boolean(await ervenyesToken(lenyomat)));
  ok(
    "a nyers token nincs az adatbázisban",
    (await pool.query(`SELECT 1 FROM "PasswordResetToken" WHERE "tokenHash" = $1`, [token])).rowCount === 0
  );

  const ujHash = await bcrypt.hash("MasikJelszo456", 10);
  ok("első beváltás sikeres", (await tokenBevaltas(tokenLenyomat(token), ujHash)) === true);
  ok("második beváltás elutasítva", (await tokenBevaltas(tokenLenyomat(token), ujHash)) === false);
  ok("a token már nem érvényes", (await ervenyesToken(lenyomat)) === null);

  const belepesUjjal = await belepes(ALK_EMAIL, "MasikJelszo456");
  ok("az új jelszóval be lehet lépni", belepesUjjal.sikeres);
  const belepesRegivel = await belepes(ALK_EMAIL, JELSZO);
  ok("a régi jelszóval már nem", !belepesRegivel.sikeres);

  // --- a jelszóváltás elejti a korábban nyitott munkameneteket ---
  // Az `alk` munkamenet még a jelszóváltás előtt jött létre.
  const regiMunkamenet = await keres("/admin", { jar: alk.jar });
  ok(
    "a jelszóváltás előtti munkamenet már nem enged be",
    regiMunkamenet.status === 302 || regiMunkamenet.status === 307,
    "HTTP " + regiMunkamenet.status
  );

  const regiApi = await keres("/api/admin/naptar?kezdet=2026-01-01&veg=2026-01-02", { jar: alk.jar });
  ok("az API sem fogadja el a régi munkamenetet", regiApi.status === 401, "HTTP " + regiApi.status);

  const ujMunkamenet = await keres("/admin", { jar: belepesUjjal.jar });
  ok(
    "az új belépés munkamenete viszont érvényes",
    ujMunkamenet.status === 200,
    "HTTP " + ujMunkamenet.status
  );

  ok(
    "a bélyeg nélküli munkamenet érvényes, amíg nem volt jelszóváltás",
    munkamenetElavult(null, null) === false
  );
  ok(
    "az első jelszóváltás a bélyeg nélküli munkamenetet is elejti",
    munkamenetElavult(null, new Date()) === true
  );
  const belyeg = new Date();
  ok(
    "az egyező bélyegű munkamenet érvényes",
    munkamenetElavult(belyeg.toISOString(), belyeg) === false
  );
  ok(
    "a korábbi bélyegű munkamenet elavult",
    munkamenetElavult(new Date(belyeg.getTime() - 60_000).toISOString(), belyeg) === true
  );

  const { lenyomat: lejartLenyomat } = ujToken();
  await pool.query(
    `INSERT INTO "PasswordResetToken" ("userId", "tokenHash", "expiresAt")
     VALUES ($1, $2, now() - interval '1 hour')`,
    [user.id, lejartLenyomat]
  );
  ok("lejárt token érvénytelen", (await ervenyesToken(lejartLenyomat)) === null);

  // --- rátekorlátozás: egy fiókra időegység alatt csak korlátozott számú levél ---
  const keretFiok = await getUserByEmail(ADMIN_EMAIL);
  ok(
    "friss fiókhoz nincs korábbi kérés",
    (await visszaallitoKeresekSzama(keretFiok.id, keresAblakKezdete())) === 0
  );
  ok("nulla kéréssel nincs betelve a keret", keretTullepve(0) === false);
  ok("eggyel a határ alatt még lehet kérni", keretTullepve(KERES_MAX_ABLAKBAN - 1) === false);

  let utolsoLenyomat = null;
  for (let i = 0; i < KERES_MAX_ABLAKBAN; i++) {
    const t = ujToken();
    utolsoLenyomat = t.lenyomat;
    await ujVisszaallitoToken(keretFiok.id, t.lenyomat, lejaratIdopont());
  }

  const keresekSzama = await visszaallitoKeresekSzama(keretFiok.id, keresAblakKezdete());
  ok(
    `${KERES_MAX_ABLAKBAN} kérés után betelik a keret`,
    keresekSzama === KERES_MAX_ABLAKBAN && keretTullepve(keresekSzama),
    "db=" + keresekSzama
  );
  ok(
    "a korlát nem érvényteleníti a már kiküldött linket",
    Boolean(await ervenyesToken(utolsoLenyomat))
  );

  // az ablakon kívüli kérések kiesnek a számolásból
  await pool.query(
    `INSERT INTO "PasswordResetToken" ("userId", "tokenHash", "expiresAt", "createdAt")
     VALUES ($1, $2, now() + interval '1 hour', now() - interval '2 hours')`,
    [keretFiok.id, tokenLenyomat("teszt-regi-keres")]
  );
  const ablakUtan = await visszaallitoKeresekSzama(keretFiok.id, keresAblakKezdete());
  ok(
    "a két órával ezelőtti kérés már nem számít bele",
    ablakUtan === KERES_MAX_ABLAKBAN,
    "db=" + ablakUtan
  );

  // a korlát fiókonként szól, nem az egész rendszerre
  const masikFiok = await visszaallitoKeresekSzama(user.id, keresAblakKezdete());
  ok(
    "az egyik fiók korlátja nem meríti ki a másikét",
    !keretTullepve(masikFiok),
    "a másik fiók kérései: " + masikFiok
  );

  // ------------------------------------------------------------ 8. törzsadatok
  fejezet("8. Törzsadatok");

  const osszSzolg = await pool.query(`SELECT count(*)::int c FROM "Service"`);
  ok("10 szolgáltatás van felvive", osszSzolg.rows[0].c === 10, "db=" + osszSzolg.rows[0].c);
  ok("8 foglalható szolgáltatás", szolgaltatasok.length === 8, "db=" + szolgaltatasok.length);
  ok(
    "minden foglalható blokk 10 perccel hosszabb a kezelésnél",
    szolgaltatasok.every((s) => s.blockMin === s.durationMin + 10)
  );

  const idok = await munkaidok();
  ok("van beállított munkaidő", idok.length > 0, "db=" + idok.length);
  ok(
    "a munkaidő 7:00-19:00",
    idok.every((m) => m.startMinute === 420 && m.endMinute === 1140)
  );

  // ------------------------------------------------------------ 9. jogosultság
  fejezet("9. Jogosultsági határok");

  const alkUser = await felhasznaloAzonositoval(alkId);
  const adminUser = await felhasznaloAzonositoval(adminId);
  ok("az alkalmazott szerepköre EMPLOYEE", alkUser.role === "EMPLOYEE");
  ok("az alkalmazott canViewAll = false", alkUser.canViewAll === false);
  ok("az admin szerepköre ADMIN", adminUser.role === "ADMIN");

  const inaktiv = await pool.query(
    `UPDATE "User" SET active = false WHERE id = $1 RETURNING active`, [alkId]
  );
  ok("felhasználó inaktiválható", inaktiv.rows[0].active === false);
  const inaktivBelepes = await belepes(ALK_EMAIL, "MasikJelszo456");
  ok("inaktív felhasználó nem tud belépni", !inaktivBelepes.sikeres);
  await pool.query(`UPDATE "User" SET active = true WHERE id = $1`, [alkId]);
} catch (err) {
  console.error("\nVARATLAN HIBA:", err.message);
  console.error(err.stack);
  bukas++;
} finally {
  // ------------------------------------------------------------ takarítás
  fejezet("Takarítás");
  const b = await pool.query(`DELETE FROM "Booking" WHERE notes LIKE 'TESZT%'`);
  const c = await pool.query(`DELETE FROM "Client" WHERE name LIKE 'TESZT%'`);
  const t = await pool.query(
    `DELETE FROM "PasswordResetToken" WHERE "userId" IN
     (SELECT id FROM "User" WHERE email IN ($1, $2))`, [ADMIN_EMAIL, ALK_EMAIL]
  );
  const u = await pool.query(`DELETE FROM "User" WHERE email IN ($1, $2)`, [ADMIN_EMAIL, ALK_EMAIL]);
  console.log(`  foglalás: ${b.rowCount}, vendég: ${c.rowCount}, token: ${t.rowCount}, felhasználó: ${u.rowCount}`);

  console.log("\n" + "=".repeat(46));
  console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
  if (bukottak.length) {
    console.log("\n  Bukott ellenőrzések:");
    for (const b of bukottak) console.log("    - " + b);
  }
  console.log("=".repeat(46));

  await pool.end();
  process.exitCode = bukas === 0 ? 0 : 1;
}
