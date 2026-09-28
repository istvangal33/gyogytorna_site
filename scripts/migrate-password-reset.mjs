// A jelszó-visszaállító tokenek táblája.
// Futtatás:  node --env-file=.env.local scripts/migrate-password-reset.mjs
//
// Idempotens: többször is lefuttatható, nem csinál kárt.
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

try {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "userId"    uuid NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
      "tokenHash" text NOT NULL UNIQUE,
      "expiresAt" timestamptz NOT NULL,
      "usedAt"    timestamptz,
      "createdAt" timestamptz NOT NULL DEFAULT now()
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS "PasswordResetToken_userId_idx"
    ON "PasswordResetToken" ("userId")
  `);

  console.log('A "PasswordResetToken" tábla készen áll.');
} catch (err) {
  console.error("Hiba:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
