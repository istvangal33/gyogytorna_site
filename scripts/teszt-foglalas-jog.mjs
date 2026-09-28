// A "csak magának foglalhat" jogosultság ellenőrzése.
//   node --env-file=.env.local scripts/teszt-foglalas-jog.mjs
//
// Az adatréteget és a jogosultsági szabályt méri. A server action-öket nem
// tudja hívni, ezért a szabályt ugyanazzal a feltétellel reprodukálja.
import { pool, felhasznaloAzonositoval } from "../lib/db.ts";

let siker = 0, bukas = 0;
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};

// ugyanaz a szabály, mint a server actionben
const foglalhat = (user, celStaffId) =>
  user.canBookOthers === true || celStaffId === user.id;

try {
  const alk = await pool.query(
    `SELECT id FROM "User" WHERE email = $1`, ["teszt.alkalmazott@demo.local"]
  );
  const admin = await pool.query(
    `SELECT id FROM "User" WHERE email = $1`, ["forras.fernanda@demo.local"]
  );

  if (!alk.rowCount || !admin.rowCount) {
    console.log("Hianyzik a teszt alkalmazott vagy a demo admin.");
    process.exit(1);
  }

  const alkId = alk.rows[0].id;
  const adminId = admin.rows[0].id;

  console.log("=== Alapallapot: kapcsolo KI ===");
  await pool.query(`UPDATE "User" SET "canBookOthers" = false WHERE id = $1`, [alkId]);
  let u = await felhasznaloAzonositoval(alkId);
  ok("magahoz foglalhat", foglalhat(u, alkId));
  ok("az adminhoz NEM foglalhat", !foglalhat(u, adminId));

  console.log("\n=== Admin bekapcsolja ===");
  await pool.query(`UPDATE "User" SET "canBookOthers" = true WHERE id = $1`, [alkId]);
  u = await felhasznaloAzonositoval(alkId);
  ok("most mar az adminhoz is foglalhat", foglalhat(u, adminId));
  ok("magahoz tovabbra is", foglalhat(u, alkId));

  console.log("\n=== Admin visszakapcsolja ===");
  await pool.query(`UPDATE "User" SET "canBookOthers" = false WHERE id = $1`, [alkId]);
  u = await felhasznaloAzonositoval(alkId);
  ok("ujra csak magahoz", !foglalhat(u, adminId) && foglalhat(u, alkId));

  console.log("\n=== A ket jog fuggetlen egymastol ===");
  await pool.query(
    `UPDATE "User" SET "canViewAll" = true, "canBookOthers" = false WHERE id = $1`, [alkId]
  );
  u = await felhasznaloAzonositoval(alkId);
  ok("mindenkit lat", u.canViewAll === true);
  ok("de csak maganak foglalhat", !foglalhat(u, adminId));

  await pool.query(
    `UPDATE "User" SET "canViewAll" = false, "canBookOthers" = true WHERE id = $1`, [alkId]
  );
  u = await felhasznaloAzonositoval(alkId);
  ok("csak a sajatjat latja", u.canViewAll === false);
  ok("de barkinek foglalhat", foglalhat(u, adminId));

  // vissza alapallapotba
  await pool.query(
    `UPDATE "User" SET "canViewAll" = false, "canBookOthers" = false WHERE id = $1`, [alkId]
  );

  console.log("\n=== Adminisztrator ===");
  const a = await felhasznaloAzonositoval(adminId);
  ok("az admin barkinek foglalhat", foglalhat(a, alkId), "canBookOthers=" + a.canBookOthers);
} catch (err) {
  console.error("Hiba:", err.message);
  bukas++;
} finally {
  console.log("\n" + "=".repeat(40));
  console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
  console.log("=".repeat(40));
  await pool.end();
  process.exitCode = bukas === 0 ? 0 : 1;
}
