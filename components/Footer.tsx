"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaChevronRight,
  FaChevronUp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const navLeft = [
  { label: "Kezdőlap", href: "/" },
  { label: "Bemutatkozás", href: "/bemutatkozas" },
  { label: "Szolgáltatások", href: "/szolgaltatasok" },
];

const navRight = [
  { label: "Árak", href: "/arak" },
  { label: "Elérhetőség", href: "/elerhetoseg" },
  { label: "Galéria", href: "/galeria" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="
        relative overflow-hidden
        text-white
        bg-[#0f1f29]
        border-t border-white/10
      "
    >
      {/* Felső sáv – brand + social (csak 3 ikon) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Főoldal – ReStart Physio" className="shrink-0">
              <Image
                src="/logo.png"
                alt="ReStart Physio"
                width={140}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/" className="font-extrabold tracking-tight hover:text-[var(--color-brand-accent-hover,#EC7007)] transition-colors">
                ReStart Physio
              </Link>
              <span className="text-white/30 hidden sm:inline">/</span>
              <span className="text-[#EC7007] text-sm hidden sm:inline">Ahol a mozgás újraindul!</span>
            </div>
          </div>

          {/* Social – csak FB, IG, LinkedIn */}
          <div className="flex items-center gap-3">
            {[
              { Icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61581303600810", label: "Facebook" },
              { Icon: FaInstagram, href: "https://www.instagram.com/restartphysiogyor/", label: "Instagram" },
              { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/fernanda-forr%C3%A1s-927314187/", label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  h-9 w-9 rounded-full
                  border border-white/10 bg-white/5 text-white/80
                  hover:text-[#001219] hover:bg-[var(--color-brand-accent-hover,#EC7007)]
                  transition-colors
                "
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tartalom grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Menü oszlopok */}
          <div className="md:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Bal menü */}
              <nav aria-label="Fő navigáció (bal)">
                <ul className="space-y-3">
                  {navLeft.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 text-white/70 hover:text-[var(--color-brand-accent-hover,#EC7007)] transition-colors"
                      >
                        <FaChevronRight className="h-3 w-3 opacity-70 group-hover:opacity-100" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Jobb menü */}
              <nav aria-label="Fő navigáció (jobb)">
                <ul className="space-y-3">
                  {navRight.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 text-white/70 hover:text-[var(--color-brand-accent-hover,#EC7007)] transition-colors"
                      >
                        <FaChevronRight className="h-3 w-3 opacity-70 group-hover:opacity-100" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Kapcsolat oszlop */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-white/80">
                <FaMapMarkerAlt className="mt-1 shrink-0" />
                <address className="not-italic leading-relaxed">
                  <span className="font-semibold">ReStart Physio Győr</span>
                  <br />
                  Máté Mária u. 4b
                  <br />
                  9028 Győr, Magyarország
                </address>
              </div>

              <a
                href="tel:+36308198449"
                className="flex items-center gap-3 text-white/80 hover:text-[#EC7007] transition-colors cursor-pointer"
              >
                <FaPhoneAlt />
                <span>+36 30 819 8449</span>
              </a>

              <div className="flex items-center gap-3 text-white/80">
                <FaEnvelope />
                <a
                  href="mailto:restart.gyor@gmail.com"
                  className="hover:text-[var(--color-brand-accent-hover,#EC7007)] transition-colors"
                >
                  restart.gyor@gmail.com
                </a>
              </div>
            </div>

            {/* Térkép / CTA blokk (opcionális, placeholder) */}
            <div className="sm:justify-self-end">
              <a
                href="https://maps.app.goo.gl/MAsW9JaN2v5PcCR59"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-[var(--color-brand-accent-hover,#EC7007)] transition-colors"
              >
                Térkép megnyitása ↗
              </a>
              <p className="mt-3 text-white/60 text-sm">
                Időpontfoglaláshoz hívd a számot vagy írj e-mailt.
              </p>
            </div>    
          </div>
        </div>
      </div>

      {/* Alsó sáv */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Felső sor: Cookie és Adatvédelem linkek */}
          <div className="flex flex-wrap items-center justify-center gap-4 pb-3 border-b border-white/10">
            <Link
              href="/cookie-policy"
              className="text-sm text-white/70 hover:text-[var(--color-brand-accent-hover,#EC7007)] transition-colors"
            >
              Cookie kezelése
            </Link>
            <span className="text-white/30">•</span>
            <Link
              href="/adatvedelem"
              className="text-sm text-white/70 hover:text-[var(--color-brand-accent-hover,#EC7007)] transition-colors"
            >
              Adatkezelési tájékoztató
            </Link>
          </div>

          {/* Alsó sor: Copyright */}
          <div className="flex items-center justify-center text-sm pt-3">
            <span className="text-white/60">
              © {year} ReStart Physio. Minden jog fenntartva.
            </span>
          </div>
        </div>
      </div>


      {/* Vissza a tetejére */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Ugrás a tetejére"
        className="
          group fixed right-4 bottom-4 z-10
          h-10 w-10 rounded-full
          bg-gray-800 border border-gray-50 text-white
          hover:bg-[#EC7007] hover:text-white hover:border-[#EC7007]
          shadow-lg backdrop-blur
          flex items-center justify-center transition-all duration-300
        "
      >
        <FaChevronUp className="h-4 w-4" />
      </button>
    </footer>
  );
}