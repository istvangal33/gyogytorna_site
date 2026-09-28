// Az ELSO adminisztrator letrehozasa egy ures adatbazisban.
//
//   node --env-file=.env.local scripts/elso-admin.mjs "Forras Fernanda" fernanda@pelda.hu
//
// Ez a "tyuk vagy tojas" problemat oldja meg: felhasznalot a rendszerben csak
// bejelentkezett admin vehet fel, de eloszor nincs kinek bejelentkeznie.
//
// Jelszot a script NEM allit be. Ugyanazt a meghivo-utat hasznalja, mint a
// felhasznalokezelo felulet: keszit egy egyszer felhasznalhato linket, azon
// keresztul a felhasznalo maga adja meg a jelszavat — igy azt rajta kivul
// senki nem ismeri, meg az sem, aki a scriptet futtatja.
//
// A linket a script kiirja, es ha be van allitva a levelkuldes, el is kuldi.
import {
  pool,
  getUserByEmail,
  ujFelhasznalo,
  ujVisszaallitoToken,
  aktivAdminokSzama,
} from "../lib/db.ts";
import { ujToken, lejaratIdopont, TOKEN_ELETTARTAM_PERC } from "../lib/password-reset.ts";
import { fiokMeghivoLevel } from "../lib/mail.ts";

const nev = (process.argv[2] ?? "").trim();
const email = (process.argv[3] ?? "").trim().toLowerCase();
const alap = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

try {
  if (!nev || !email) {
    console.log('Hasznalat: node --env-file=.env.local scripts/elso-admin.mjs "Teljes Nev" email@pelda.hu');
    process.exit(1);
  }
  if (!email.includes("@")) {
    console.log("Ez nem ervenyes e-mail cim:", email);
    process.exit(1);
  }

  // Ha mar van aktiv admin, ezt a scriptet nem szabad hasznalni: onnantol a
  // felulet valo uj munkatars felvetelere, mert ott naplozott es jogosultsaghoz
  // kotott a muvelet.
  const adminok = await aktivAdminokSzama();
  if (adminok > 0) {
    console.log(`Mar van ${adminok} aktiv adminisztrator a rendszerben.`);
    console.log("Uj munkatarsat a /admin/felhasznalok oldalon vegy fel, ne ezzel a scripttel.");
    process.exit(1);
  }

  if (await getUserByEmail(email)) {
    console.log("Ezzel az e-mail cimmel mar letezik felhasznalo:", email);
    process.exit(1);
  }

  const user = await ujFelhasznalo(nev, email, "ADMIN");
  console.log(`Letrehozva: ${user.name} <${user.email}>  szerepkor: ${user.role}`);

  const { token, lenyomat } = ujToken();
  await ujVisszaallitoToken(user.id, lenyomat, lejaratIdopont());
  const link = `${alap}/admin/uj-jelszo?token=${token}`;

  const eredmeny = await fiokMeghivoLevel(user.email, user.name, link, TOKEN_ELETTARTAM_PERC);
  if (eredmeny.ok) {
    console.log(`Meghivo level elkuldve ide: ${user.email}`);
  } else {
    console.log(`A level NEM ment ki (${eredmeny.hiba}) - a link ettol meg mukodik.`);
  }

  console.log(`\nJelszobeallito link (${TOKEN_ELETTARTAM_PERC} percig ervenyes):\n${link}`);
  console.log("\nHa a link lejar, a bejelentkezo oldalon az 'Elfelejtett jelszo' gombbal kerheto uj.");
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
