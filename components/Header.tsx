"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function UserIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
function ServicesIcon() {
  return (
    <svg 
      className="w-6 h-6" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      viewBox="0 0 24 24" 
      aria-hidden="true"
    >
      {/* Emberi test sziluett - izomzat hangsúlyozásával */}
      <path d="M8 6h8M6 10h12M8 14h8M6 18h12" />
      {/* Kéz formája - kezelést szimbolizálva */}
      <path d="M16 4l2 2-2 2M16 20l2-2-2-2" />
      {/* Orvosi szimbólum */}
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function PriceIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h1.5L10 5l1.5-2L13 5l1.5-2L16 5l1.5-2H19a1 1 0 011 1v14l-2 2-2-2-2 2-2-2-2 2-2-2V4a1 1 0 011-1h1z" />
      <path d="M9 11h4M9 14h4M15 9v8" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function GalleryIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
    </svg>
  );
}

const navItems = [
  { label: "Bemutatkozás", href: "/bemutatkozas", icon: <UserIcon /> },
  { label: "Szolgáltatások", href: "/szolgaltatasok", icon: <ServicesIcon /> },
  { label: "Árak", href: "/arak", icon: <PriceIcon /> },
  { label: "Elérhetőség", href: "/elerhetoseg", icon: <MailIcon /> },
  { label: "Galéria", href: "/galeria", icon: <GalleryIcon /> },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Zárd a menüt útvonal váltáskor
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Body scroll lock
  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) {
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      body.style.overflow = "";
      body.style.touchAction = "";
    }
    return () => {
      body.style.overflow = "";
      body.style.touchAction = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <>
      {/* DESKTOP bal oldali sáv – a te régi desktop részed maradhat változatlanul */}
      <header className="hidden lg:flex fixed left-0 top-0 h-full w-24 bg-white/90 backdrop-blur-md shadow-lg border-r border-[#004A6D]/20 z-50 flex-col">
        <div className="flex flex-col items-center justify-between h-full py-6">
          <Link href="/" className="flex flex-col items-center group" aria-label="Főoldal">
            <Image src="/logo.png" alt="ReStart Physio" width={80} height={80} className="group-hover:scale-110 transition-transform" />
          </Link>

          <nav className="flex flex-col space-y-4 items-center">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex flex-col items-center px-2 py-2 rounded-lg transition-colors ${
                    active ? "text-[#EC7007]" : "text-[#004A6D] hover:text-[#EC7007]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={`pointer-events-none absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full transition-opacity ${active ? "bg-[#EC7007] opacity-100" : "opacity-0"}`} />
                  {item.icon}
                  <span className="text-[10px] text-center font-medium tracking-tight">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col items-center">
            <Link
              href="/elerhetoseg#contact"
              className={`group inline-flex flex-col items-center px-3 py-3 rounded-full border text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC7007]/40 focus-visible:ring-offset-2 ${
                pathname?.startsWith("/elerhetoseg")
                  ? "border-[#EC7007] text-[#EC7007]"
                  : "border-[#004A6D] text-[#004A6D] hover:border-[#EC7007] hover:text-[#EC7007]"
              }`}
            >
              <MailIcon />
              <span className="text-center">Contact</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE: felső sáv (logo + burger) */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-[#004A6D]/20 z-40 lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2" aria-label="Főoldal">
              <Image src="/logo.png" alt="ReStart Physio" width={56} height={56} className="h-10 w-auto" />
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Menü bezárása" : "Menü megnyitása"}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#004A6D] hover:bg-[#004A6D]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EC7007] focus-visible:ring-offset-2 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-200 ${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {/* Sötét overlay – kattintásra zár */}
        <button
          aria-label="Overlay – menü bezárása"
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        />

        {/* Menü tartalom – teljes oldal, saját topbar a bezáráshoz */}
        <div className="relative z-10 h-full w-full bg-white flex flex-col">
          {/* Topbar a menüben (logo + X) */}
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-slate-100">
            <Link href="/" aria-label="Főoldal" onClick={() => setIsMenuOpen(false)}>
              <Image src="/logo.png" alt="ReStart Physio" width={56} height={56} className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Menü bezárása"
              className="p-2 rounded-md text-[#004A6D] hover:bg-[#004A6D]/10 transition-colors"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollozható menülista */}
          <div className="flex-1 overflow-y-auto">
            <nav className="px-4 sm:px-6 py-4">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-4 rounded-xl text-base transition-colors ${
                          active
                            ? "text-[#EC7007] bg-[#EC7007]/5"
                            : "text-[#004A6D] hover:bg-[#004A6D]/5 hover:text-[#EC7007]"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* CTA alul */}
              <div className="mt-4">
                <Link
                  href="/elerhetoseg#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl border
                            text-[#004A6D] border-[#004A6D]
                            hover:border-[#EC7007] hover:text-[#EC7007]
                            transition-all duration-200 transform-gpu
                            hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(236,112,7,0.15)]
                            active:translate-y-0"
                >
                  <MailIcon />
                  <span className="font-semibold">Kapcsolat</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}