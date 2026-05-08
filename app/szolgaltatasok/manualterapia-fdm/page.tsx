import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RelatedServices from '@/components/RelatedServices';
export const metadata: Metadata = {
  title: 'FDM Manuálterápia Győr | Lágyrész és Fascia Kezelés',
  description: 'FDM (Fascia Disztorziós Modell) manuálterápia Győrben. Gyors és hatékony kezelése akkut és krónikus mozgásszervi panaszoknak, izomfájdalmaknak.',
  keywords: 'manuálterápia győr, fdm terápia győr, fascia kezelés, hátfájás kezelés, derékfájás manuálterápia, kötőszöveti kezelés',
  alternates: { canonical: 'https://restartphysio.hu/szolgaltatasok/manualterapia-fdm' },
  openGraph: {
    title: 'FDM Manuálterápia Győr | Lágyrész és Fascia Kezelés',
    description: 'FDM manuálterápia Győrben. Akkut és krónikus mozgásszervi panaszok kezelése.',
    url: 'https://restartphysio.hu/szolgaltatasok/manualterapia-fdm',
    locale: 'hu_HU',
    type: 'website',
    images: [{ url: 'https://restartphysio.hu/manual4.jpg', width: 1200, height: 630, alt: 'Manuálterápia és FDM kezelés Győrben' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FDM Manuálterápia Győr',
    description: 'FDM manuálterápia Győrben. Akkut és krónikus mozgásszervi panaszok kezelése.',
    images: ['https://restartphysio.hu/manual4.jpg'],
  }
};

function FDMSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "ManualTherapy",
      "name": "FDM Manuálterápia Győr",
      "description": "Az FDM terápia a fascia elváltozásainak helyreállítására fókuszáló manuális kezelési módszer.",
      "provider": { "@type": "MedicalBusiness", "name": "ReStart Physio", "url": "https://restartphysio.hu" }
    })}} />
  );
}

export default function FDMTherapyPage() {
  return (
    <>
      <FDMSchema />

      <section className="relative bg-white py-20 md:py-28 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-[#004A6D]/5 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EC7007]/5 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex mb-8 text-sm font-semibold text-gray-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#EC7007] transition-colors">Főoldal</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/szolgaltatasok" className="hover:text-[#EC7007] transition-colors">Szolgáltatások</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-[#004A6D]">FDM Manuálterápia</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-[#004A6D]/10 rounded-full text-sm font-bold text-[#004A6D] mb-6 border border-[#004A6D]/20">
                Lágyrész és Fascia Kezelés
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#004A6D] mb-6 leading-tight">
                Lágy rész manuál terápia <br className="hidden sm:block"/><span className="text-[#EC7007]">(FDM kezelések)</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                Gyors fájdalomcsillapítás és mozgástartomány növelés a Fascia Disztorziós Modell (FDM) innovatív manuális technikájával.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/elerhetoseg#contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#004A6D] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#EC7007] transition-all duration-300 shadow-[0_8px_20px_rgba(0,74,109,0.3)] hover:shadow-xl hover:-translate-y-1"
                >
                  Időpontfoglalás
                </Link>
                <Link
                  href="/arak"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#004A6D] border-2 border-[#004A6D]/20 px-8 py-4 rounded-xl font-bold hover:border-[#004A6D] hover:bg-gray-50 transition-all duration-300"
                >
                  Árak
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-4 border-white">
              <Image
                src="/manual2.jpg"
                alt="FDM manuálterápia kezelés"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8 text-gray-700 text-lg leading-relaxed">
              <h2 className="text-3xl font-bold text-[#004A6D]">Hogyan működik az FDM terápia?</h2>
              <p>
                Az <strong>FDM (Fascia Disztorziós Modell)</strong> egy innovatív manuális kezelési módszer, amellyel a fascia (kötőszöveti hálózat) elváltozásainak helyreállítására fókuszálunk. Győri rendelőnkben ezt a technikát gyakran alkalmazzuk akut és krónikus panaszok kezelésére.
              </p>
              <p>
                A terápiában speciális fogásokat alkalmazunk, mellyel a letapadásokat és elmozdulásokat oldjuk célzott pontok nyomásával. Az FDM manuálterápia által gyors és látványos eredményeket érhetünk el, mint például a hát-, nyak-, váll- vagy derékfájdalmak csökkenése már egy-két alkalom után.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 h-fit lg:sticky lg:top-24">
              <h3 className="text-2xl font-bold text-[#004A6D] mb-6 border-b pb-4">Mikor hatékony?</h3>
              <ul className="space-y-4">
                {[
                  "Akut rándulások, húzódások",
                  "Beszűkült ízületi mozgástartomány",
                  "Váll-, nyak- és hátfájdalmak",
                  "Letapadt izmok oldása"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#EC7007]/20 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-[#EC7007]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t">
                <a
                  href="tel:+36308198449"
                  className="w-full flex items-center justify-center gap-2 bg-gray-50 text-[#004A6D] px-6 py-4 rounded-xl font-bold hover:bg-[#004A6D] hover:text-white transition-colors duration-300 border border-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Hívjon minket!
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
<RelatedServices currentSlug="manualterapia-fdm" />

      {/* CALL TO ACTION */}
<section className="py-20 bg-[#0f1f29] text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Indítsa újra a mozgást fájdalommentesen!
          </h2>
          <p className="text-xl text-white/80 mb-10 font-light leading-relaxed">
            Vegye fel velünk a kapcsolatot, hogy egy személyre szabott terápiás tervvel segíthessünk elérni egészségügyi céljait Győrben.
          </p>
          <Link
            href="/elerhetoseg#contact"
            className="inline-flex items-center gap-2 bg-[#EC7007] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#EC7007] transition-all duration-300 shadow-[0_8px_20px_rgba(236,112,7,0.4)] hover:shadow-xl hover:-translate-y-1"
          >
            Időpontot kérek
          </Link>
        </div>
      </section>
    </>
  );
}





