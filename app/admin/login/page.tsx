import type { Metadata } from "next";
import AdminLogo from "@/components/AdminLogo";
import Link from "next/link";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

export const metadata: Metadata = {
  title: "Bejelentkezés",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ hiba?: string; error?: string; visszaallitva?: string }>;
}) {
  // a saját űrlapunk a `hiba` paramétert használja, a NextAuth saját
  // átirányítása pedig az `error`-t — mindkettőre ugyanazt jelezzük ki
  const { hiba, error, visszaallitva } = await searchParams;
  const sikertelen = Boolean(hiba || error);

  async function belepes(formData: FormData) {
    "use server";

    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/admin",
      });
    } catch (error) {
      // Sikeres belépéskor a signIn egy átirányítási hibát dob — azt tovább kell
      // engedni, különben nem történik meg az átirányítás. Csak a valódi
      // auth-hibát fogjuk el.
      if (error instanceof AuthError) {
        redirect("/admin/login?hiba=1");
      }
      throw error;
    }
  }

  return (
    <div className="admin-root min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <AdminLogo />
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bejelentkezés</h1>

          {visszaallitva && (
            <div
              role="status"
              className="mb-5 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
            >
              A jelszavad megváltozott. Jelentkezz be az új jelszóval.
            </div>
          )}

          {sikertelen && (
            <div
              role="alert"
              className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              Hibás e-mail cím vagy jelszó.
            </div>
          )}

          <form action={belepes} className="space-y-4">
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Jelszó
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#EC7007] focus:outline-none focus:ring-1 focus:ring-[#EC7007]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#004a6d] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#003652] focus:outline-none focus:ring-2 focus:ring-[#004a6d] focus:ring-offset-2"
            >
              Belépés
            </button>
          </form>

          <Link
            href="/admin/elfelejtett-jelszo"
            className="mt-3 block text-center text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline"
          >
            Elfelejtetted a jelszavad?
          </Link>
        </div>
      </div>
    </div>
  );
}
