import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Professzionális
                <span className="block text-green-400">Gyógytornász</span>
                Szolgáltatások
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Modern módszerekkel segítünk a fájdalom csökkentésében és a mozgásfunkciók 
                helyreállításában. Egyéni terápiás tervek tapasztalt szakemberekkel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/kapcsolat" 
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
                >
                  Időpont Foglalás
                </a>
                <a 
                  href="/bemutatkozo" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center"
                >
                  Bemutatkozás
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg p-8 shadow-xl">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                  <div className="text-6xl">🏥</div>
                </div>
                <p className="text-gray-600 text-center mt-4">
                  Modern gyógytornász rendelő
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Szolgáltatásaink
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Széles körű gyógytornász szolgáltatásokat nyújtunk minden korosztály számára, 
              egyéni igények és szükségletek figyelembevételével.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🦴</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Gerinc Rehabilitáció</h3>
              <p className="text-gray-600 mb-4">
                Gerincfájdalmak, porckorongsérvek és tartási hibák kezelése célzott gyakorlatokkal.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• McKenzie terápia</li>
                <li>• Gerinc mobilizáció</li>
                <li>• Core erősítő gyakorlatok</li>
              </ul>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">⚽</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sportrehabilitáció</h3>
              <p className="text-gray-600 mb-4">
                Sportkárosodások gyógyítása és a teljesítmény optimalizálása sportolók számára.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Sérülés utáni rehabilitáció</li>
                <li>• Teljesítményfokozás</li>
                <li>• Prevenciós tanácsadás</li>
              </ul>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">👴</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Időskorú Terápia</h3>
              <p className="text-gray-600 mb-4">
                Életkor-specifikus gyakorlatok az aktivitás fenntartásához és a mobilitás javításához.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Egyensúly javítása</li>
                <li>• Erő és rugalmasság</li>
                <li>• Esés megelőzés</li>
              </ul>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🤱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Szülés Előtti/Utáni</h3>
              <p className="text-gray-600 mb-4">
                Kismamák és friss anyukák speciális igényeire szabott gyógytornás kezelések.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Medence fenék erősítés</li>
                <li>• Diastasis recti kezelés</li>
                <li>• Tartási problémák</li>
              </ul>
            </div>

            {/* Service Card 5 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💆</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Manuálterápia</h3>
              <p className="text-gray-600 mb-4">
                Kézzel végzett kezelések az ízületek mobilitásának és funkcióinak javítására.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Ízületi mobilizáció</li>
                <li>• Lágyrész kezelések</li>
                <li>• Trigger pont terápia</li>
              </ul>
            </div>

            {/* Service Card 6 */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🧘</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mozgásterápia</h3>
              <p className="text-gray-600 mb-4">
                Komplex mozgásprogramok a teljes test harmonikus működésének helyreállítására.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Funkcionális tréning</li>
                <li>• Koordináció fejlesztés</li>
                <li>• Légzésterápia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Miért válasszon minket?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-2xl">✅</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Szakképzett Szakemberek
                    </h3>
                    <p className="text-gray-600">
                      Tapasztalt gyógytornászok folyamatos továbbképzéssel és modern módszerekkel.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="text-2xl">🎯</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Egyéni Kezelési Tervek
                    </h3>
                    <p className="text-gray-600">
                      Minden páciens egyedi igényeire szabott, személyre szóló terápiás programok.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="text-2xl">🏆</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Modern Módszerek
                    </h3>
                    <p className="text-gray-600">
                      Legújabb gyógytornás technikák és eszközök alkalmazása a gyorsabb eredményért.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8">
              <div className="aspect-square bg-white rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-8xl">👩‍⚕️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Kezdje el a gyógyulás útját még ma!
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Ne várjon tovább! Foglaljon időpontot és tapasztalja meg a professzionális 
            gyógytornás kezelés pozitív hatásait.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/kapcsolat" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Kapcsolatfelvétel
            </a>
            <a 
              href="tel:+36301234567" 
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              📞 +36 30 123 4567
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
