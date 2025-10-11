import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';


export const metadata: Metadata = {
  title: 'Elérhetőség | Gyógytorna - Professzionális Fizioterápia',
  description: 'Gyógytorna rendelő címe, nyitvatartása, parkolási lehetőségek és megközelítés tömegközlekedéssel.',
  openGraph: {
    title: 'Elérhetőség | Gyógytorna - Professzionális Fizioterápia',
    description: 'Gyógytorna rendelő címe, nyitvatartása, parkolási lehetőségek és megközelítés tömegközlekedéssel.',
  },
};

export default function Elerhetoseg() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 py-28 md:py-36 overflow-hidden">
        {/* Modern geometriai háttérminták */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Finom színes körök */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-indigo-400/15 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-gradient-to-bl from-teal-300/10 to-green-300/5 rounded-full blur-2xl"></div>
          
          {/* Geometriai alakzatok */}
          <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-gradient-to-br from-blue-500/8 to-cyan-500/4 rotate-12 rounded-lg"></div>
          <div className="absolute bottom-1/4 right-1/5 w-24 h-24 bg-gradient-to-tl from-indigo-500/10 to-blue-500/5 rotate-45 rounded-full"></div>
          
          {/* Finom vonalak/grid minta */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-800 tracking-tight">
              <span className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
                Elérhetőség
              </span>
            </h1>
            {/* Opcionális alcím */}
            <h2 className="text-xl md:text-2xl text-gray-800 max-w-2xl mx-auto leading-relaxed">
              Vegye fel velünk a kapcsolatot
            </h2>
            {/* Dekoratív vonal */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-950 via-white to-blue-950 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Location Information */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Google Maps embed */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200/50">
                <div className="aspect-[4/3] relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.0415575891157!2d17.64534077681663!3d47.68361288265575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476bbf9334116233%3A0x2a346395a9a3441b!2zR3nFkXIsIE3DqXN6w6Fyb3MgTMWRcmluYyB1LiAxMCwgOTAyMw!5e0!3m2!1shu!2shu!4v1756901925024!5m2!1shu!2shu"
                    width="100%"
                    height="100%"
                    className="absolute inset-0 w-full h-full rounded-2xl"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="lg:pl-8">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Rendelő Adatai
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-950 via-white to-blue-950 rounded-full"></div>
              </div>
              
              <div className="space-y-10">
                {/* Address */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Cím</h3>
                    <div className="text-gray-900 leading-relaxed space-y-1">
                      <p>9023 Győr</p>
                      <p>Mészáros Lőrinc utca 10.</p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Telefon</h3>
                    <a 
                      href="tel:+36301234567" 
                      className="text-gray-600 hover:text-blue-600 transition-colors font-medium inline-flex items-center gap-2"
                    >
                      +36 30 123 4567
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
                    <a 
                      href="mailto:info@gyogytorna.hu" 
                      className="text-gray-600 hover:text-blue-600 transition-colors font-medium inline-flex items-center gap-2"
                    >
                      info@gyogytorna.hu
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Transportation and Parking */}
      {/* Transportation and Parking / Contact */}
      <div
        id="contact"
        className="
          scroll-mt-[4rem]      /* alapértelmezett mobil (~80px) */
          sm:scroll-mt-[0rem]   /* kisebb tabletek */
          md:scroll-mt-[0rem]   /* nagyobb tabletek (~112px) */
          lg:scroll-mt-[0rem]   /* laptopok (~128px) */
          xl:scroll-mt-[0rem]   /* nagyobb kijelzők (~144px) */
        "
      >
        <ContactSection />
      </div>



      
    </>
  );
}