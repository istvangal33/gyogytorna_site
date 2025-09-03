import type { Metadata } from 'next';

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
            {/* Modern Interactive Map */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200/50">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 flex items-center justify-center relative">
                  {/* Modern grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                  
                  <div className="text-center z-10">
                    {/* Modern map icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Interaktív térkép</h3>
                    <p className="text-gray-600 mb-6 max-w-xs mx-auto">
                      1051 Budapest, Példa utca 12.
                    </p>
                    
                    <a 
                      href="https://www.google.com/maps/search/1051+Budapest+Példa+utca+12"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Megnyitás Maps-ben
                    </a>
                  </div>
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
                      <p>9021 Győr</p>
                      <p>Példa utca 12., 2. emelet</p>
                      <p className="text-sm text-gray-900">Kapukód: 1234</p>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Megközelítés
            </h2>
            <p className="text-xl text-gray-600">
              Könnyen megközelíthető mind autóval, mind tömegközlekedéssel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Public Transport */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <div className="text-2xl">🚇</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Tömegközlekedés</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Metro:</h4>
                  <p className="text-gray-600">M1, M2, M3 - Deák Ferenc tér (5 perc gyalog)</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Busz:</h4>
                  <p className="text-gray-600">7, 70, 78 - Példa utca megálló</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Villamos:</h4>
                  <p className="text-gray-600">2, 2A - Kossuth Lajos tér (3 perc gyalog)</p>
                </div>
              </div>
            </div>

            {/* Parking */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <div className="text-2xl">🚗</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Parkolás</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Utcai parkolás:</h4>
                  <p className="text-gray-600">Fizetős övezetben (9:00-18:00)</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Parkolóház:</h4>
                  <p className="text-gray-600">Példa Parkolóház (100m-re)</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">P+R:</h4>
                  <p className="text-gray-600">Külvárosi P+R parkolók</p>
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <div className="text-2xl">♿</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Akadálymentesítés</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Lift a 2. emeletre</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Akadálymentes bejárat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Akadálymentes WC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Kerekesszékkel megközelíthető</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Tour */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rendelő Bemutatása
            </h2>
            <p className="text-xl text-gray-600">
              Modern, komfortos környezet a gyógyulás szolgálatában
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-8 mb-4 aspect-square flex items-center justify-center">
                <div className="text-6xl">🏥</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Váróterem</h3>
              <p className="text-gray-600">Kényelmes váróterem természetes megvilágítással</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-8 mb-4 aspect-square flex items-center justify-center">
                <div className="text-6xl">🛏️</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kezelőszobák</h3>
              <p className="text-gray-600">Privát kezelőszobák modern berendezésekkel</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-8 mb-4 aspect-square flex items-center justify-center">
                <div className="text-6xl">🏋️</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tornatér</h3>
              <p className="text-gray-600">Tágas tér gyógytornás gyakorlatokhoz</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency and Important Info */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Fontos Információk
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="bg-red-100 rounded-lg p-2 mr-3">
                    <div className="text-lg">🚨</div>
                  </div>
                  Sürgős Esetek
                </h3>
                <p className="text-gray-700 mb-3">
                  Akut fájdalom vagy sürgős konzultáció szükségessége esetén hívjon 
                  a következő számon:
                </p>
                <a 
                  href="tel:+36301234567"
                  className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  📞 +36 30 123 4567
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="bg-blue-100 rounded-lg p-2 mr-3">
                    <div className="text-lg">📅</div>
                  </div>
                  Időpont Lemondás
                </h3>
                <p className="text-gray-700 mb-3">
                  Kérjük, időpontját minimum 24 órával korábban mondja le, 
                  hogy más páciensek is időpontot kaphassanak.
                </p>
                <p className="text-sm text-gray-600">
                  Lemondás telefonon vagy e-mailben lehetséges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Látogasson el hozzánk!
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Várjuk szeretettel modern rendelőnkben Budapest szívében.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/kapcsolat" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Időpont Foglalás
            </a>
            <a 
              href="https://www.google.com/maps/search/1051+Budapest+Példa+utca+12"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              📍 Útvonalterv
            </a>
          </div>
        </div>
      </section>
    </>
  );
}