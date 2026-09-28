// auth.ts
// A teljes auth konfig: az adatbázis-független részhez (auth.config.ts) hozzáadja
// a Credentials providert. Ez a fájl csak Node.js runtime alatt fut (route handler,
// server action, server component) — a middleware szándékosan nem ezt használja.
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/db";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Jelszó", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await getUserByEmail(credentials.email as string);
        // nincs ilyen user, inaktív, vagy nincs jelszava -> nincs belépés
        if (!user || !user.active || !user.passwordHash) return null;

        const ok = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
        if (!ok) return null;

        // ez kerül majd a tokenbe/sessionbe
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          // a belépéskor érvényes jelszó-időbélyeg; ebből derül ki később,
          // hogy a munkamenet még az aktuális jelszóhoz tartozik-e
          jelszoValtozott: user.passwordChangedAt
            ? new Date(user.passwordChangedAt).toISOString()
            : null,
        };
      },
    }),
  ],
});
