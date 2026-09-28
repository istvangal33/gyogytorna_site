// Az admin felület kerete. A bejelentkezés előtti oldalak (belépés, jelszó)
// nem kapnak menüt — ezt a keret maga dönti el az útvonal alapján.
import { bejelentkezettFelhasznalo } from "@/lib/munkamenet";
import AdminKeret, { type KeretFelhasznalo } from "@/components/admin/AdminKeret";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await bejelentkezettFelhasznalo();

  const felhasznalo: KeretFelhasznalo = user
    ? { nev: user.name, email: user.email, admin: user.role === "ADMIN" }
    : null;

  return <AdminKeret felhasznalo={felhasznalo}>{children}</AdminKeret>;
}
