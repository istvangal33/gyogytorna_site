// Végponttól végpontig teszt: ugyanazt a láncot futtatja, mint a
// /admin/elfelejtett-jelszo server action-je, a valódi lib modulokkal.
//
//   node --env-file=.env.local scripts/test-reset-e2e.mjs <email>
import { pool, getUserByEmail, ujVisszaallitoToken } from "../lib/db.ts";
import { ujToken, lejaratIdopont, TOKEN_ELETTARTAM_PERC } from "../lib/password-reset.ts";
import { jelszoVisszaallitoLevel } from "../lib/mail.ts";

const email = (process.argv[2] ?? "").trim().toLowerCase();
const alap = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

try {
  const user = await getUserByEmail(email);
  if (!user) { console.log("Nincs ilyen felhasznalo:", email); process.exit(1); }
  if (!user.active) { console.log("A felhasznalo inaktiv."); process.exit(1); }
  console.log("1. Felhasznalo megvan:", user.name, "<" + user.email + ">", user.role);

  const { token, lenyomat } = ujToken();
  await ujVisszaallitoToken(user.id, lenyomat, lejaratIdopont());
  console.log("2. Token letrehozva, lenyomat tarolva. Ervenyes", TOKEN_ELETTARTAM_PERC, "percig.");

  const link = `${alap}/admin/uj-jelszo?token=${token}`;
  const eredmeny = await jelszoVisszaallitoLevel(user.email, user.name, link, TOKEN_ELETTARTAM_PERC);

  if (eredmeny.ok) {
    console.log("3. Level ELKULDVE ide:", user.email);
    console.log("\nA levelben szereplo link:\n" + link);
  } else {
    console.log("3. Level NEM ment ki:", eredmeny.hiba);
    console.log("\nA link ettol meg mukodik:\n" + link);
  }
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
