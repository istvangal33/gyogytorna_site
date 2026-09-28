// next-auth.d.ts
import { DefaultSession } from "next-auth";

type Role = "ADMIN" | "EMPLOYEE";

declare module "next-auth" {
  interface User {
    role: Role;
    jelszoValtozott?: string | null;
  }
  interface Session {
    user: { id: string; role: Role; jelszoValtozott: string | null } & DefaultSession["user"];
  }
}

// a JWT interfész a @auth/core/jwt-ben él, a "next-auth/jwt" csak továbbexportálja,
// ezért itt kell bővíteni, különben a token mezői unknown-ok maradnak
declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
    jelszoValtozott?: string | null;
  }
}