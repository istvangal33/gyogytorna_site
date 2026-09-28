import type { Metadata } from "next";
import AdminLogo from "@/components/AdminLogo";
import Link from "next/link";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { ervenyesToken, tokenBevaltas } from "@/lib/db";
import { tokenLenyomat, jelszoHiba, JELSZO_MIN_HOSSZ } from "@/lib/password-reset";

export const metadata: Metadata = {
  title: "Új jelszó",
  robots: { index: false, follow: false },
};

export default async function UjJelszoPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; hiba?: string }>;
}) {
  const { token, hiba } = await searchParams;

  // A tokent a lenyomatával keressük — az adatbázisban nyers token nincs is.
  const talalat = token ? await ervenyesToken(tokenLenyomat(token)) : null;

  if (!talalat) {
    return (
      <div className="admin-root min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <AdminLogo />
            <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Érvénytelen link</h1>
            <p className="text-sm text-gray-600 mb-6">
              Ez a jelszó-beállító link lejárt, már felhasználták, vagy hibás. Kérj
              újat, és a legfrissebb e-mailben lévő linkkel próbáld meg.
            </p>
            <Link
              href="/admin/elfelejtett-jelszo"
              className="block w-full rounded-md bg-[#004a6d] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#003652] focus:outline-none focus:ring-2 focus:ring-[#004a6d] focus:ring-offset-2 text-center"
            >
              Új link kérése
            </Link>
          </div>
        </div>
      </div>
    );
  }

  async function mentes(formData: FormData) {
    "use server";

    const nyersToken = String(formData.get("token") ?? "");
    const jelszo = String(formData.get("password") ?? "");
    const megegyszer = String(formData.get("password2") ?? "");

    const uzenet = jelszoHiba(jelszo, megegyszer);
    if (uzenet) {
      redirect(`/admin/uj-jelszo?token=${nyersToken}&hiba=${encodeURIComponent(uzenet)}`);
    }

    const hash = await bcrypt.hash(jelszo, 10);
    const sikeres = await tokenBevaltas(tokenLenyomat(nyersToken), hash);

    if (!sikeres) {
      // időközben lejárt vagy elhasználódott
      redirect("/admin/uj-jelszo");
    }

    redirect("/admin/login?visszaallitva=1");
  }

  return (
    <div className="admin-root min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <AdminLogo />
          <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">Új jelszó</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">{talalat.email}</p>

          {hiba && (
            <div
              role="alert"
              className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {hiba}
            </div>
          )}

          <form action={mentes} className="space-y-4">
            <input type="hidden" name="token" value={token} />

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Új jelszó
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={JELSZO_MIN_HOSSZ}
                autoComplete="new-password"
                autoFocus
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#EC7007] focus:outline-none focus:ring-1 focus:ring-[#EC7007]"
              />
              <p className="mt-1 text-xs text-gray-500">
                Legalább {JELSZO_MIN_HOSSZ} karakter.
              </p>
            </div>

            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
                Új jelszó mégegyszer
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                required
                minLength={JELSZO_MIN_HOSSZ}
                autoComplete="new-password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#EC7007] focus:outline-none focus:ring-1 focus:ring-[#EC7007]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#004a6d] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#003652] focus:outline-none focus:ring-2 focus:ring-[#004a6d] focus:ring-offset-2"
            >
              Jelszó mentése
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
