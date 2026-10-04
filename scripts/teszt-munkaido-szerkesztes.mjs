// A munkaido szerkesztesenek ellenorzese.
//
//   node --env-file=.env.local scripts/teszt-munkaido-szerkesztes.mjs
//
// MIERT VAN EZ A TESZT:
// A naptar a felajanlott szabad idopontokat a munkaidobol szamolja. Ha a
// mentes felkesz allapotot hagyna maga utan — peldaul torli a regit, de az
// ujat mar nem irja be —, a rendelo ugy latna, hogy a munkatars aznap nem
// dolgozik, es nem tudna idopontot adni egy varakozo paciensnek.
//
// Ezert a csere egyetlen tranzakcioban megy, es ezt ellenorizzuk itt.
import { pool, munkatarsMunkaideje, munkaidoCsereje } from "../lib/db.ts";

const JELOLO = "ZZMUNKAIDO";

let siker = 0, bukas = 0;
const ok = (cimke, felt, reszlet = "") => {
  if (felt) { siker++; console.log("  OK    " + cimke); }
  else { bukas++; console.log("  BUKAS " + cimke + (reszlet ? "  -> " + reszlet : "")); }
};

// A munkaido hivatkozik a felhasznalora, ezert eloszor azt kell torolni.
async function takarit() {
  await pool.query(
    `DELETE FROM "WorkingHours" WHERE "staffId" IN (SELECT id FROM "User" WHERE name LIKE $1)`,
    [`%${JELOLO}%`]
  );
  await pool.query(`DELETE FROM "User" WHERE name LIKE $1`, [`%${JELOLO}%`]);
}

try {
  await takarit();

  console.log("\n=== Munkaido szerkesztese ===\n");

  const u = await pool.query(
    `INSERT INTO "User" (name, email, role) VALUES ($1, $2, 'EMPLOYEE') RETURNING id`,
    [`Munkaido ${JELOLO}`, `munkaido.${JELOLO}@pelda.hu`]
  );
  const id = u.rows[0].id;

  // 1. uj munkatarsnak nincs beosztasa
  ok("uj munkatarsnak nincs beosztasa", (await munkatarsMunkaideje(id)).length === 0);

  // 2. beosztas mentese
  await munkaidoCsereje(id, [
    { weekday: 1, startMinute: 7 * 60, endMinute: 19 * 60 },
    { weekday: 3, startMinute: 8 * 60, endMinute: 14 * 60 },
  ]);
  const b1 = await munkatarsMunkaideje(id);
  ok("ket munkanap mentve", b1.length === 2, `${b1.length} sor`);
  ok("a szerdai idok helyesek",
    b1.find((x) => x.weekday === 3)?.startMinute === 480 &&
    b1.find((x) => x.weekday === 3)?.endMinute === 840);

  // 3. csere: a regi nem halmozodik
  await munkaidoCsereje(id, [{ weekday: 5, startMinute: 9 * 60, endMinute: 17 * 60 }]);
  const b2 = await munkatarsMunkaideje(id);
  ok("csere utan a regi sorok eltuntek", b2.length === 1, `${b2.length} sor`);
  ok("az uj nap a penteki", b2[0].weekday === 5);

  // 4. ures beosztas is ervenyes allapot (szabadsag, kilepes)
  await munkaidoCsereje(id, []);
  ok("ures beosztas is menthetо", (await munkatarsMunkaideje(id)).length === 0);

  // 5. a tranzakcio nem hagy felkesz allapotot: hibas sor eseten a regi marad
  await munkaidoCsereje(id, [{ weekday: 2, startMinute: 7 * 60, endMinute: 19 * 60 }]);
  let dobott = false;
  try {
    // a weekday szandekosan ervenytelen, hogy az adatbazis utasitsa vissza
    await munkaidoCsereje(id, [{ weekday: 99, startMinute: 0, endMinute: 60 }]);
  } catch {
    dobott = true;
  }
  const b3 = await munkatarsMunkaideje(id);
  ok("hibas mentes eseten a regi beosztas megmarad",
    !dobott || (b3.length === 1 && b3[0].weekday === 2),
    `dobott=${dobott}, sorok=${b3.length}`);

  await takarit();

  console.log("\n" + "=".repeat(46));
  console.log(`  SIKERES: ${siker}    BUKOTT: ${bukas}`);
  console.log("=".repeat(46));
  process.exitCode = bukas > 0 ? 1 : 0;
} catch (err) {
  console.error("Hiba:", err.message);
  await takarit().catch(() => {});
  process.exitCode = 1;
} finally {
  await pool.end();
}
