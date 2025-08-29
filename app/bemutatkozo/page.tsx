import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bemutatkozó | Gyógytorna - Professzionális Fizioterápia',
  description: 'Ismerje meg szakképzett gyógytornászunkat, képzettségét és több éves tapasztalatát a rehabilitáció területén.',
  openGraph: {
    title: 'Bemutatkozó | Gyógytorna - Professzionális Fizioterápia',
    description: 'Ismerje meg szakképzett gyógytornászunkat, képzettségét és több éves tapasztalatát a rehabilitáció területén.',
  },
};

export default function Bemutatkozo() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bemutatkozás
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Több mint 10 éves tapasztalattal segítem pácienseimet a gyógyulás útján
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo and Basic Info */}
            <div className="text-center lg:text-left">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-8 mb-6">
                <div className="aspect-square bg-white rounded-lg shadow-lg flex items-center justify-center max-w-md mx-auto">
                  <div className="text-8xl">👩‍⚕️</div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Dr. Példa Gyógytornász
              </h2>
              <p className="text-lg text-blue-600 mb-4">
                Diplomás Gyógytornász, Manuálterapeuta
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  10+ év tapasztalat
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Manuálterápia
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Sportrehabilitáció
                </span>
              </div>
            </div>

            {/* Professional Story */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Szakmai Háttér
              </h3>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  Gyógytornászként dolgozom több mint 10 éve, és ez idő alatt számtalan páciensnek 
                  segítettem visszanyerni mobilitását és életminőségét. Szakmai pályafutásomat 
                  a Semmelweis Egyetem Egészségtudományi Karán kezdtem, ahol gyógytornász diplomát szereztem.
                </p>
                <p>
                  Folyamatosan képzem magam a legújabb terápiás módszerekben. Különösen érdeklődöm 
                  a manuálterápia, a sportrehabilitáció és a gerincproblémák kezelése iránt. 
                  Pácienseimmel mindig egyénileg foglalkozom, hiszen minden ember és minden probléma egyedi.
                </p>
                <p>
                  Meggyőződésem, hogy a gyógyulás nem csak a testi tünetek megszüntetéséről szól, 
                  hanem arról is, hogy megtanítsuk pácienseinket, hogyan óvhatják meg egészségüket 
                  a jövőben. Ezért minden kezelés része a prevenciós tanácsadás és az otthoni gyakorlatok.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education and Qualifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Képzettségek & Végzettségek
            </h2>
            <p className="text-xl text-gray-600">
              Folyamatos tanulás és szakmai fejlődés a legjobb ellátás érdekében
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <div className="text-2xl">🎓</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Végzettségek</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Gyógytornász Diploma</h4>
                  <p className="text-gray-600">Semmelweis Egyetem Egészségtudományi Kar</p>
                  <p className="text-sm text-gray-500">2014</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Manuálterápia Specialista</h4>
                  <p className="text-gray-600">Magyar Manuálterápia Egyesület</p>
                  <p className="text-sm text-gray-500">2016</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Sportrehabilitációs Tanúsítvány</h4>
                  <p className="text-gray-600">Nemzetközi Sportrehabilitációs Intézet</p>
                  <p className="text-sm text-gray-500">2018</p>
                </div>
              </div>
            </div>

            {/* Certifications and Specializations */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <div className="text-2xl">🏆</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Specializációk</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">McKenzie módszer (MDT)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Trigger Point terápia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Funkcionális mozgásanalízis (FMS)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Gerinc stabilizáció</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700">Légzésterápia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-gray-700">Szülés előtti/utáni rehabilitáció</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy and Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Szakmai Filozófia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hiszem, hogy minden ember megérdemli a fájdalommentes, aktív életet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl">🤝</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Együttműködés</h3>
              <p className="text-gray-600">
                A gyógyulás közös munka eredménye. Pácienseimmel partnerként dolgozom 
                együtt céljaik elérése érdekében.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl">🎯</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Egyéni Megközelítés</h3>
              <p className="text-gray-600">
                Minden páciens egyedi, ezért minden kezelési terv is személyre szabott. 
                Nincs két egyforma eset.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <div className="text-3xl">📚</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Folyamatos Tanulás</h3>
              <p className="text-gray-600">
                A tudomány folyamatosan fejlődik. Számomra fontos, hogy mindig 
                naprakész legyek a legújabb módszerekkel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Kezdjünk közös munkába!
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Ha szeretné megismerni szolgáltatásaimat részletesebben, vagy időpontot 
            szeretne foglalni, vegye fel velem a kapcsolatot!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/kapcsolat" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Kapcsolatfelvétel
            </a>
            <a 
              href="/elerhetoseg" 
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Rendelő Adatai
            </a>
          </div>
        </div>
      </section>
    </>
  );
}