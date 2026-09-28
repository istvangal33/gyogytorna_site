// Útvonalvédelem: a /admin alatt minden oldalhoz belépés kell.
// Szándékosan az auth.config.ts-t használja (nem az auth.ts-t), mert a middleware
// Edge runtime alatt fut, ahol a `pg` és a `bcryptjs` nem elérhető.
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};
