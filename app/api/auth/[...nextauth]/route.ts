// A NextAuth végpontjai: /api/auth/signin, /api/auth/callback/credentials, /api/auth/session stb.
// Enélkül a bejelentkezés nem működik.
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
