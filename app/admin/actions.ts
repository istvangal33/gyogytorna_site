"use server";

import { signOut } from "@/auth";

// A kijelentkezésnek a NextAuth saját műveletén kell átmennie: egy nyers
// űrlap-küldés a /api/auth/signout címre CSRF-token nélkül nem érvényes.
export async function kijelentkezes() {
  await signOut({ redirectTo: "/admin/login" });
}
