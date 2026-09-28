// Meglévő felhasználó jelszavának beállítása.
// Futtatás:
//   node --env-file=.env.local scripts/set-user-password.mjs <email> <ujjelszo>
//
// Megjegyzés: a jelszó parancssori argumentumként megjelenik a shell előzményében.
// Éles jelszónál érdemes utána kitörölni az előzményből.
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const [email, jelszo] = process.argv.slice(2);

if (!email || !jelszo) {
  console.error("Használat: node --env-file=.env.local scripts/set-user-password.mjs <email> <ujjelszo>");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

try {
  // cost 10 — ugyanaz, mint a már meglévő hash-eknél
  const hash = await bcrypt.hash(jelszo, 10);

  const res = await pool.query(
    `UPDATE "User"
     SET "passwordHash" = $1, "updatedAt" = now(), "passwordChangedAt" = now()
     WHERE email = $2
     RETURNING name, email, role, active`,
    [hash, email]
  );

  if (res.rowCount === 0) {
    console.error(`Nincs ilyen felhasználó: ${email}`);
    process.exitCode = 1;
  } else {
    const u = res.rows[0];
    console.log(`Jelszó beállítva: ${u.name} <${u.email}> (${u.role}, aktív: ${u.active})`);
  }
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
