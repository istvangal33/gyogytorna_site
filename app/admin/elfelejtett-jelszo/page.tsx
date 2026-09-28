import type { Metadata } from "next";
import AdminLogo from "@/components/AdminLogo";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByEmail, ujVisszaallitoToken, visszaallitoKeresekSzama } from "@/lib/db";
import { jelszoVisszaallitoLevel } from "@/lib/mail";
import {
  ujToken,
  lejaratIdopont,
  keresAblakKezdete,
  keretTullepve,
  TOKEN_ELETTARTAM_PERC,
} from "@/lib/password-reset";

export const metadata: Metadata = {
  title: "Elfelejtett jelszó",
  robots: { index: false, follow: false },
};

// A linkhez abszolút cím kell. Éles környezetben a NEXT_PUBLIC_SITE_URL a
// megbízható forrás — a Host fejlécet ugyanis a kérés küldője állítja be, így
// arra hagyatkozva hamis visszaállító linket lehetne kicsalni.
async function alapCim() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${h.get("host")}`;
}

export default async function ElfelejtettJelszoPage({
  searchParams,
}: {
  searchParams: Promise<{
    kesz?: string;
    devlink?: string;
    devhiba?: string;
    devatirany?: string;
  }>;
}) {
  const { kesz, devlink, devhiba, devatirany } = await searchParams;

  // A fejlesztői doboz csak dev módban jelenhet meg. Élesben akkor sem, ha
  // valaki kézzel írja a paramétereket az URL-be.
  const fejlesztes = process.env.NODE_ENV === "development";

  async function kuldes(formData: FormData) {
    "use server";

    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const dev = process.env.NODE_ENV === "development";

    if (email) {
      const user = await getUserByEmail(email);

      // Ha nincs ilyen felhasználó, semmit nem csinálunk — de a válasz ugyanaz
      // lesz, mint sikeres esetben. Így nem lehet végigpróbálgatni, mely címek
      // szerepelnek a rendszerben.
      if (user && user.active) {
        // Rátekorlátozás: ha rövid időn belül már ment ki több link erre a
        // fiókra, most nem küldünk újat. Csendben hagyjuk ki — a válasz
        // ugyanaz marad, különben ebből is ki lehetne találni, mely címekhez
        // tartozik fiók. A korábban kiküldött link érvényes marad, azzal
        // változatlanul be tud állítani jelszót.
        const eddigiKeresek = await visszaallitoKeresekSzama(user.id, keresAblakKezdete());

        if (keretTullepve(eddigiKeresek)) {
          console.warn(
            `[jelszó-visszaállítás] kérés-korlát elérve (${eddigiKeresek} kérés), nem küldünk levelet:`,
            user.id
          );
        } else {
          const { token, lenyomat } = ujToken();
          await ujVisszaallitoToken(user.id, lenyomat, lejaratIdopont());

          const link = `${await alapCim()}/admin/uj-jelszo?token=${token}`;
          const eredmeny = await jelszoVisszaallitoLevel(user.email, user.name, link, TOKEN_ELETTARTAM_PERC);

          if (!eredmeny.ok) {
            console.error("[jelszó-visszaállítás] küldés sikertelen:", eredmeny.hiba);
          }

          if (dev) {
            const p = new URLSearchParams({ kesz: "1", devlink: link });
            if (!eredmeny.ok) p.set("devhiba", eredmeny.hiba);
            else if (eredmeny.atiranyitva) p.set("devatirany", eredmeny.atiranyitva);
            redirect(`/admin/elfelejtett-jelszo?${p}`);
          }
        }
      }
    }

    redirect("/admin/elfelejtett-jelszo?kesz=1");
  }

  return (
    <div className="admin-root min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <AdminLogo />
          <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">Elfelejtett jelszó</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">ReStart Physio időpontfoglaló</p>

          {kesz ? (
            <>
              <div
                role="status"
                className="mb-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                Ha tartozik fiók a megadott e-mail címhez, elküldtük rá a jelszó
                beállításához szükséges linket. A link {TOKEN_ELETTARTAM_PERC} percig érvényes.
              </div>

              {fejlesztes && (devlink || devhiba) && (
                <div className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-900">
                  <p className="mb-2 font-semibold uppercase tracking-wide">
                    Csak fejlesztői módban látszik
                  </p>

                  {devhiba && (
                    <p className="mb-2">
                      <span className="font-semibold">A levél nem ment ki:</span>{" "}
                      {devhiba}
                    </p>
                  )}

                  {devatirany && (
                    <p className="mb-2">
                      A levél átirányítva ide: <strong>{devatirany}</strong>
                    </p>
                  )}

                  {devlink && (
                    <>
                      <p className="mb-1 font-semibold">A link mindenképp működik:</p>
                      <a
                        href={devlink}
                        className="block break-all font-mono text-[11px] text-amber-900 underline"
                      >
                        {devlink}
                      </a>
                    </>
                  )}
                </div>
              )}

              <Link
                href="/admin/login"
                className="block text-center text-sm font-medium text-[#EC7007] hover:underline"
              >
                Vissza a bejelentkezéshez
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-5">
                Add meg az e-mail címedet, és küldünk egy linket, amivel új jelszót
                tudsz beállítani.
              </p>

              <form action={kuldes} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail cím
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    autoFocus
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#EC7007] focus:outline-none focus:ring-1 focus:ring-[#EC7007]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#004a6d] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#003652] focus:outline-none focus:ring-2 focus:ring-[#004a6d] focus:ring-offset-2"
                >
                  Link küldése
                </button>
              </form>

              <Link
                href="/admin/login"
                className="mt-5 block text-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:underline"
              >
                Vissza a bejelentkezéshez
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
