"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, PhoneCall, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function UserIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

const features = [
  {
    title: "Személyre szabott kezelés",
    description:
      "Minden pácienshez egyedi terápiás tervet készítünk, figyelembe véve az életstílust és a közösen kitűzött célokat.",
    icon: <Users className="h-5 w-5" />,
    color: "#00072D",
  },
  {
    title: "Modern eszközpark",
    description:
      "Korszerű rehabilitációs eszközökkel és bizonyított módszerekkel dolgozunk a hatékonyabb felépülésért.",
    icon: <Zap className="h-5 w-5" />,
    color: "#00072D",
  },
  {
    title: "Gyógytorna Győrben – könnyen megtalálható helyszín",
    description:
      "9028 Győr, Máté Mária u. 4b. Nyugodt környezet és csodás kilátás – ideális a rehabilitációhoz és a mozgás újraindításához.",
    icon: <MapPin className="h-5 w-5" />,
    color: "#00072D",
  },
  {
    title: "Rugalmas időpontok",
    description:
      "Időpontjainkat igyekszünk a mindennapokhoz igazítani – akár munka után is, előzetes egyeztetéssel.",
    icon: <Clock className="h-5 w-5" />,
    color: "#00072D",
  },
];

export default function ModernGlassSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-32 relative min-h-screen" aria-labelledby="why-choose-us">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00121a] via-white to-gray-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-full text-sm font-medium text-[#00072D] mb-6">
            <div className="w-2 h-2 bg-[#EC7007] rounded-full mr-3" />
            Miért válasszon minket?
          </div>

          {/* SEO: szolgáltatás + lokáció legyen a domináns címsor */}
          <h2 id="why-choose-us" className="text-4xl lg:text-6xl font-light text-slate-900 mb-6 tracking-tight">
            Gyógytorna és fizioterápia <span className="font-medium text-[#00072D]">Győrben</span>
          </h2>

          {/* Bizalom + keresési szándék: konkrét panaszok + benefit, nem túl “kulcsszó-szagúan” */}
          <p className="text-lg lg:text-xl text-slate-900 max-w-3xl mx-auto leading-relaxed font-light">
            Derékfájás, nyakfájás, gerincpanaszok és sportsérülések esetén személyre szabott kezelési tervvel segítünk –
            a fájdalom csökkentésétől a biztonságos visszatérésig.
          </p>

          {/* Bizalmi állítás külön sorban (nem H2-ben) */}
          <p className="mt-6 text-base lg:text-lg text-slate-700">
            Közel <span className="font-semibold text-[#00072D]">10 év</span> szakmai tapasztalat
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Side - Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-8"
          >
            <h3 className="text-3xl lg:text-4xl font-light text-slate-900 mb-6 tracking-tight">
              Amit <span className="font-medium text-[#00072D]">kínálunk</span> Önnek
            </h3>
            <p className="text-xl text-slate-900 leading-relaxed font-light">
              A kezeléseket a panaszok okának feltárására és a tartós javulásra építjük, modern eszközökkel és követhető,
              otthon is végezhető gyakorlatokkal.
            </p>

            {/* Opcionális: belső link a szolgáltatások oldalra (SEO + UX), de nem kötelező */}
            <div className="mt-8">
              <Link
                href="/szolgaltatasok#services-details"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold
                           text-[#00072D] hover:text-[#EC7007]
                           bg-white/70 backdrop-blur-md
                           border border-[#00072D1a]
                           shadow-[0_6px_18px_rgba(0,7,45,0.06)]
                           hover:shadow-[0_10px_32px_rgba(236,112,7,0.18)]
                           transition-all duration-300"
              >
                Szolgáltatásaink áttekintése
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 8 }}
                className="group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="group bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-[0_4px_24px_0_rgba(31,38,135,0.1)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${feature.color}08`,
                        border: `1px solid ${feature.color}15`,
                      }}
                    >
                      <span
                        className="transition-colors duration-300 text-[var(--icon-color)] group-hover:text-[#EC7007]"
                        style={{ ["--icon-color"]: feature.color } as React.CSSProperties}
                      >
                        {feature.icon}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xl font-medium text-slate-900 mb-2 transition-colors duration-300 group-hover:text-[#EC7007]">
                        {feature.title}
                      </h4>
                      <p className="text-slate-600 leading-relaxed font-light">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section - Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-slate-750 via-white to-white rounded-3xl p-12 lg:p-16 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(255,255,255,0.05)_50%,transparent_65%)] opacity-20" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-light mb-6 tracking-tight text-[#004a6d]">
                Kezdje el még ma a <span className="font-medium text-[#00072D]">gyógyulás útját!</span>
              </h3>

              <p className="text-[#004a6d] mb-10 text-lg font-light leading-relaxed">
                Foglaljon időpontot, és tapasztalja meg a különbséget professzionális gyógytorna és fizioterápia
                kezeléseinkkel Győrben.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="tel:+36308198449"
                  className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-2xl font-semibold
                            text-[#00072D] hover:text-[#EC7007]
                            bg-white/70 backdrop-blur-md
                            border border-[#00072D1a]
                            shadow-[0_6px_18px_rgba(0,7,45,0.06)]
                            hover:shadow-[0_10px_32px_rgba(236,112,7,0.18)]
                            transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Telefonos időpontfoglalás: +36 30 819 8449"
                >
                  <span
                    className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0
                               group-hover:opacity-100 transition-opacity duration-300
                               bg-[radial-gradient(120%_120%_at_0%_0%,rgba(236,112,7,0.12),transparent_55%)]"
                  />
                  <PhoneCall className="w-5 h-5" />
                  +36 30 819 8449
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}