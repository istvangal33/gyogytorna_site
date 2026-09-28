'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { kijelentkezes } from '@/app/admin/actions';

export type KeretFelhasznalo = {
  nev: string;
  email: string;
  admin: boolean;
} | null;

// A bejelentkezés előtti oldalak nem kapnak menüt.
const MENU_NELKUL = ['/admin/login', '/admin/elfelejtett-jelszo', '/admin/uj-jelszo'];

type MenuElem = { cim: string; ut: string; ikon: React.ReactNode; csakAdmin?: boolean };

export default function AdminKeret({
  felhasznalo,
  children,
}: {
  felhasznalo: KeretFelhasznalo;
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? '';
  const [mobilNyitva, setMobilNyitva] = useState(false);

  if (MENU_NELKUL.includes(pathname) || !felhasznalo) {
    return <>{children}</>;
  }

  const menu: MenuElem[] = [
    { cim: 'Áttekintés', ut: '/admin', ikon: <IkonAttekintes /> },
    { cim: 'Naptár', ut: '/admin/naptar', ikon: <IkonNaptar /> },
    { cim: 'Vendégek', ut: '/admin/vendegek', ikon: <IkonVendegek /> },
    { cim: 'Felhasználók', ut: '/admin/felhasznalok', ikon: <IkonFelhasznalok />, csakAdmin: true },
  ];

  const lathato = menu.filter((m) => !m.csakAdmin || felhasznalo.admin);

  const aktiv = (ut: string) => (ut === '/admin' ? pathname === '/admin' : pathname.startsWith(ut));

  const menuTartalom = (
    <>
      <div className="flex items-center gap-2 px-4 py-4">
        <Image src="/logo.webp" alt="ReStart Physio" width={160} height={84} className="h-9 w-auto" priority />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Munkaterület
        </p>
        {lathato.map((m) => (
          <Link
            key={m.ut}
            href={m.ut}
            onClick={() => setMobilNyitva(false)}
            className={
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ' +
              (aktiv(m.ut)
                ? 'bg-[#004a6d]/10 text-[#004a6d]'
                : 'text-gray-700 hover:bg-gray-100')
            }
          >
            <span className={aktiv(m.ut) ? 'text-[#004a6d]' : 'text-gray-400'}>{m.ikon}</span>
            {m.cim}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#004a6d] text-sm font-semibold text-white">
            {kezdobetuk(felhasznalo.nev)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">{felhasznalo.nev}</p>
            <p className="truncate text-xs text-gray-500">
              {felhasznalo.admin ? 'adminisztrátor' : 'alkalmazott'}
            </p>
          </div>
        </div>

        <form action={kijelentkezes} className="mt-1">
          <button
            type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Kijelentkezés
          </button>
        </form>
      </div>
    </>
  );

  return (
    <div className="admin-root min-h-screen bg-gray-50">
      {/* asztali oldalsáv */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-gray-200 bg-white lg:flex">
        {menuTartalom}
      </aside>

      {/* mobil fejléc */}
      <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 bg-white px-3 py-2 lg:hidden">
        <button
          onClick={() => setMobilNyitva(true)}
          aria-label="Menü megnyitása"
          className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100"
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <Image src="/logo.webp" alt="ReStart Physio" width={160} height={84} className="h-7 w-auto" />
      </div>

      {/* mobil menü */}
      {mobilNyitva && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMobilNyitva(false)} role="presentation">
          <div className="absolute inset-0 bg-black/40" />
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl"
          >
            {menuTartalom}
          </aside>
        </div>
      )}

      <div className="lg:pl-60">{children}</div>
    </div>
  );
}

function kezdobetuk(nev: string) {
  return nev
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((r) => r[0]?.toUpperCase() ?? '')
    .join('');
}

const IKON = 'h-5 w-5';

function IkonAttekintes() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={IKON}>
      <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IkonNaptar() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={IKON}>
      <rect x="2.5" y="4" width="15" height="13.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 8h15M6.5 2.5v3M13.5 2.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IkonVendegek() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={IKON}>
      <circle cx="7.5" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 16.5c0-2.8 2.5-4.5 5.5-4.5s5.5 1.7 5.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 4.6a2.9 2.9 0 010 5.3M15.8 16.5c0-2-.9-3.4-2.4-4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IkonFelhasznalok() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={IKON}>
      <circle cx="10" cy="6" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 17c0-3.2 2.9-5.2 6.5-5.2s6.5 2 6.5 5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
