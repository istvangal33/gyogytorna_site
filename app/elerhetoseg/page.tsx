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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Elérhetőség
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Keresse fel rendelőnket Budapest belvárosában
            </p>
          </div>
        </div>
      </section>

      {/* Location Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Interaktív térkép</h3>
                  <p className="text-gray-600">
                    1051 Budapest, Példa utca 12.
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/1051+Budapest+Példa+utca+12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Megnyitás Google Maps-ben
                  </a>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Rendelő Adatai
              </h2>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                    <div className="text-2xl">📍</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Cím</h3>
                    <p className="text-gray-700 text-lg">
                      1051 Budapest<br />
                      Példa utca 12., 2. emelet<br />
                      Kapukód: 1234
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                    <div className="text-2xl">🕒</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Nyitvatartás</h3>
                    <div className="text-gray-700 space-y-1">
                      <div className="flex justify-between items-center">
                        <span>Hétfő:</span>
                        <span className="font-medium">8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Kedd:</span>
                        <span className="font-medium">8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Szerda:</span>
                        <span className="font-medium">8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Csütörtök:</span>
                        <span className="font-medium">8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Péntek:</span>
                        <span className="font-medium">8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Szombat:</span>
                        <span className="font-medium">8:00 - 12:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Vasárnap:</span>
                        <span className="font-medium text-red-600">Zárva</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-lg p-3 flex-shrink-0">
                    <div className="text-2xl">📞</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Kapcsolat</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <a href="tel:+36301234567" className="text-blue-600 hover:text-blue-800 font-medium">
                          +36 30 123 4567
                        </a>
                      </p>
                      <p className="text-gray-700">
                        <a href="mailto:info@gyogytorna.hu" className="text-blue-600 hover:text-blue-800 font-medium">
                          info@gyogytorna.hu
                        </a>
                      </p>
                    </div>
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