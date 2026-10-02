// auth.config.ts
// Az auth konfig adatbázis-független része. Ez fut a middleware-ben is, ami Edge
// runtime alatt megy — ezért ide NEM kerülhet se `pg`, se `bcryptjs` import.
// A jelszót ellenőrző Credentials provider az auth.ts-ben jön hozzá.
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      // belépéskor (amikor van user) átvesszük az id-t és a szerepkört
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        // A belepeskor ervenyes jelszo-idobelyeg. Ha az adatbazisban kesobb
        // ujabb all, ez a munkamenet mar egy korabbi jelszohoz tartozik.
        token.jelszoValtozott = user.jelszoValtozott ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      // a tokenből a sessionbe, hogy minden oldalon elérd
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.jelszoValtozott = token.jelszoValtozott ?? null;
      return session;
    },
    authorized({ auth, request }) {
      const bejelentkezve = !!auth?.user;
      const { pathname } = request.nextUrl;

      if (pathname === "/admin/login") {
        // Aki már belépett, annak nincs dolga a belépőoldalon — DE csak a
        // valódi oldalletöltést szabad elterelni.
        //
        // A belépés Server Actionje ugyanerre az útvonalra POST-ol. Ha azt is
        // átirányítottuk, a böngésző követte az átirányítást, és közben
        // elveszett az, amitől a kérés Server Action-kérés volt: a szerver
        // teljes HTML oldalt küldött vissza oda, ahol a kliens a Next.js belső
        // adatformátumát várta. A felhasználó ebből annyit látott, hogy
        // "This page couldn't load" — élesben ez fogadta a bejelentkezést.
        if (bejelentkezve && request.method === "GET") {
          return NextResponse.redirect(new URL("/admin", request.nextUrl));
        }
        return true;
      }

      // a jelszó-visszaállítás természeténél fogva kijelentkezve történik,
      // ezért ezek az oldalak belépés nélkül is elérhetők
      if (
        pathname === "/admin/elfelejtett-jelszo" ||
        pathname === "/admin/uj-jelszo"
      ) {
        return true;
      }

      // minden más /admin útvonalhoz belépés kell;
      // false esetén a NextAuth a pages.signIn-re irányít
      return bejelentkezve;
    },
  },
} satisfies NextAuthConfig;
