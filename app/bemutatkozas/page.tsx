import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';



function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Forrás Fernanda",
    "jobTitle": "Gyógytornász-fizioterapeuta",
    "image": "https://restartphysio.hu/main.jpg",
    "url": "https://restartphysio.hu/bemutatkozas",
    "description": "Okleveles gyógytornász-fizioterapeuta, a ReStart Physio alapítója és vezető szakembere. Több éves tapasztalattal a sportrehabilitáció és mozgásszervi terápiák területén.",
    "worksFor": {
      "@type": "MedicalBusiness", 
      "name": "ReStart Physio",
      "url": "https://restartphysio.hu"
    },
    "alumniOf": "Szegedi Tudományegyetem",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Gyógytornász-fizioterapeuta oklevél"
      }
    ],
    "sameAs": [
    "https://www.facebook.com/Restartphysiogyor/",
    "https://www.instagram.com/restartphysiogyor/"
  ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema)
      }}
    />
  );
}

export const metadata: Metadata = {
  title: 'Forrás Fernanda | Gyógytornász-fizioterapeuta – ReStart Physio',
  description: 'Forrás Fernanda gyógytornász-fizioterapeuta a ReStart Physio alapítója. Szakterületei közé tartozik a sportrehabilitáció, gerincstabilizáció, TMI-terápia, FDM-kezelés, BEMER-terápia, core tréning és Schroth terápia. Célja, hogy páciensei fájdalommentesen, biztonságosan térhessenek vissza a mozgáshoz.',
  openGraph: {
    title: 'Forrás Fernanda | Gyógytornász-fizioterapeuta – ReStart Physio',
    description: 'Bemutatkozik Forrás Fernanda, a ReStart Physio szakértő fizioterapeutája, több éves tapasztalattal a sport- és mozgásszervi rehabilitáció területén.',
    images: ['/main.jpg'],
  },
};


export default function Bemutatkozo() {
  return (
    <>
      <PersonSchema />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#004A6D]/5 via-white to-[#EC7007]/5 py-20 md:py-28 overflow-hidden">
        {/* Dekoratív hullámos alj */}
        <div className="absolute inset-x-0 bottom-0">
          <svg
            className="w-full h-16 md:h-24 text-white"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,186.7C672,171,768,117,864,117.3C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#004A6D] mb-4">
              Bemutatkozás
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Közel 10 éves szakmai tapasztalattal segítem pácienseimet a gyógyulás útján
            </p>
          </div>
        </div>
      </section>


      {/* About Content */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-[#00121a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Photo and Basic Info */}
            <div className="relative group">
              <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl p-0 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                <div className="
                  relative w-full 
                  h-[400px] 
                  sm:h-[520px]   
                  md:h-[760px]   
                  lg:h-[540px] 
                  xl:h-[700px] 
                  overflow-hidden 
                  rounded-t-2xl
                ">
                  <Image
                    src="/main.jpg"
                    alt="Forrás Fernanda gyógytornász-fizioterapeuta szakmai portréja ReStart Physio rendelőjében Győrben"
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '0.75rem 0.75rem 0 0'
                    }}
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                </div>
                <div className="px-6 py-4">
                  <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-2 text-center">Forrás Fernanda</h2>
                  <p className="text-lg text-gray-900 mb-3 text-center">Gyógytornász - fizioterapeuta</p>
                </div>
              </div>
            </div>

            {/* Professional Story */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Rólam
              </h2>
              
              <div className="prose prose-lg text-gray-900 space-y-6 max-w-none">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <p className="[text-align:justify] indent-8 text-gray-900">
                    Forrás Fernanda vagyok, okleveles gyógytornász-fizioterapeuta, a ReStart Physio alapítója és tulajdonosa. Diplomámat 2017-ben szereztem meg a Szegedi Tudományegyetem Egészségtudományi és Szociális Képzési Karán gyógytornász-fizioterapeuta szakon.
                  </p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <p className="[text-align:justify] indent-8 text-gray-900">
                    Az elmúlt évek döntő részében{" "}
                    <Link 
                      href="/szolgaltatasok#detail-Egyéni gyógytorna/rehabilitáció"
                      className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors duration-200"
                    >
                      élsportolók körében tevékenykedtem
                    </Link>.
                    {" "}Tapasztalatot szereztem a sportban elszenvedett sérülések rehabilitációs kezelésében. 
                    Két évig a Mosonmagyaróvári Kézilabda Club gyógytornászaként, ezt követően négy évig 
                    a Győri ETO FC labdarúgócsapatának szakembereként. Ezen sportok mellett foglalkoztam 
                    egyéb sportágakban versenyzőkkel is, mint a Magyar Evezős Szövetség válogatott, illetve 
                    a Győri Atlétikai Club evezős szakosztályának sportolóival, továbbá kosárlabdázókkal, 
                    atlétákkal és úszókkal is. 2023-ban tagja voltam a Magyarországon megrendezett 
                    Atlétikai Világbajnokság fizioterapeuta csapatának, majd 2025-től{" "}
                    <Link 
                      href="/elerhetoseg"
                      className="text-[#004A6D] font-semibold underline hover:text-[#EC7007] transition-colors duration-200"
                    >
                      magánpraxisomban
                    </Link>{" "}
                    segítem pácienseimet.
                  </p>
                </div>


                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <p className="[text-align:justify] indent-8 text-gray-900">
                    2024-től léptem át a magánszektorba, ahol azóta is számos mozgásszervi betegséggel hozzám forduló pácienst segítek vissza a mindennapi fájdalommentes élethez. Terápiás eljárásaim alatt kombináltan manuális technikákkal és korrektív gyakorlatokkal is segítem pácienseimet. Munkában főként a precizitásra törekszem, a feladatok megfelelő elsajátításának segítésében, bemutatásában, korrekciójában. Fontosnak tartom a pácienseim motiváltságának fenntartását, hiszen ez alapvető részét képezi a rehabilitáció folyamatának. Hitvallásom, hogy megfelelő együttműködés és kölcsönös bizalom által sikereket tudunk közösen elérni, és számomra ez a legfontosabb feladat: támaszt nyújtani a célok elérésében.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Education and Qualifications */}
      <section className="relative py-24 bg-gradient-to-br from-[#00121a] via-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Fejléc */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Képzettségek & Végzettségek
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Folyamatos tanulás és szakmai fejlődés a legjobb ellátás érdekében
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Végzettségek */}
            <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition duration-500">
              <div className="flex items-center mb-8">
                <h3 className="ml-4 text-2xl font-bold text-gray-900">Végzettségek</h3>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-gray-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Gyógytornász - fizioterapeuta oklevél</h4>
                  <p className="text-gray-600">Szegedi Tudományegyetem - Egészségtudományi és Szociális Képzési Kar</p>
                  <p className="text-sm text-gray-500">2017</p>
                </div>
                <div className="border-l-4 border-gray-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Craniomandibuláris diszfunkciók terápiája</h4>
                  <p className="text-sm text-gray-500">2023</p>
                </div>
                <div className="border-l-4 border-gray-600 pl-4">
                  <h4 className="font-semibold text-gray-900">FDM terápia I.-II.-III.</h4>
                  <p className="text-sm text-gray-500">2019</p>
                </div>
              </div>
            </div>

            {/* Specializációk */}
            <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition duration-500">
              <div className="flex items-center mb-8">
                <h3 className="ml-4 text-2xl font-bold text-gray-900">Specializációk</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "ACL -elülső keresztszalag szakadást követő műtét utáni rehabilitáció" /*, video: "/videos/mckenzie.mp4" */ },
                  { title: "Porckorongsérv konzervatív kezelése" /*, video: "/videos/porckorong.mp4" */ },
                  { title: "SI ízületi panaszok kezelése" /*, video: "/videos/si.mp4" */ },
                  { title: "Állkapocs ízületi terápia"},
                  { title: "Izomsérülések és ízületi fájdalmak kezelése"},
                  { title: "Gerincferdülés(Scoliosis) konzervatív kezelése"},
                ].map((item, i) => (
                  <div
                    key={i}
                    className="relative group flex items-center h-16 border-l-4 border-gray-600 pl-4"
                  >
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>

                    {/* Hover videó tooltip - KIKOMMENTEZVE */}
                    {/* 
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-96 h-56 rounded-xl overflow-hidden shadow-lg scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition duration-300 origin-left z-20">
                      <video
                        src={item.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                    */}
                  </div>
                ))}
              </div>
            </div>


            {/* Továbbképzéseim - Timeline stílusban */}
            <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition duration-500">
              <div className="flex items-center mb-8">
                <h3 className="ml-4 text-2xl font-bold text-gray-900">Továbbképzéseim</h3>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#004A6D] scrollbar-track-gray-100">
                {[
                  { title: "Aspetar International Rehabilitation Conference and Workshop – the Complete Guide to the Athletic ACL – at the Aspetar Orthopaedic and Sport Medicine Hospital in Doha, Qatar" },
                  { title: "Craniomandibuláris diszfunkciók terápiája" },
                  { title: "S.I- terápia tanfolyam" },
                  { title: "Functional Movement Screen – Gray Cook módszer" },
                  { title: "FDM terápia I.-II.-III." },
                  { title: "Medical Flossing terápia" },
                  { title: "3D Scoliosis terápia tanfolyam" },
                  { title: "SMR henger alapkurzus - Csiky System" },
                  { title: "Kinematic Taping" },
                  { title: "Special Therapy segédeszközök használata" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-[#004A6D]/10 transition-colors">
                    <div className="flex-shrink-0 w-2 h-2 bg-[#004A6D] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm leading-relaxed">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition duration-500">
              <div className="flex items-center mb-8">
                <h3 className="ml-4 text-2xl font-bold text-gray-900">Tudományos előadások</h3>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-gray-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Magyar Sporttudományi Kongresszus</h4>
                  <p className="text-gray-600">Intervencióval összekapcsolt alsó végtagi funkciók fejlesztése evezősök körében</p>
                  <p className="text-sm text-gray-500">2021</p>
                </div>
                <div className="border-l-4 border-gray-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Fiatal Sporttudósok Kongresszusa</h4>
                  <p className="text-gray-600">Intervencióval összekapcsolt hosszmetszeti vizsgálat eredményei, LCA szakadás után, BTB plasztikából visszatérő labdarúgó esetében</p>
                  <p className="text-sm text-gray-500">2021</p>
                </div>
                <div className="border-l-4 border-gray-600 pl-4">
                  <h4 className="font-semibold text-gray-900">Puskás Akadémia lapszemle</h4>
                  <p className="text-gray-600">Sportba való visszatérés Achilles-ín sérülések után</p>
                </div>
              </div>
            </div>



          </div>
        </div>
      </section>

  


      {/* Philosophy and Approach */}
      <section className="py-20 relative bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-2">
          <div className="text-3xl md:text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Szakmai Filozófia
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "Együttműködés", text: "A gyógyulás közös munka eredménye. Pácienseimmel partnerként dolgozom együtt céljaik elérése érdekében."},
                { title: "Egyéni Megközelítés", text: "Minden páciens egyedi, ezért minden kezelési terv is személyre szabott. Nincs két egyforma eset." },
                { title: "Folyamatos Tanulás", text: "A tudomány folyamatosan fejlődik. Számomra fontos, hogy mindig naprakész legyek a legújabb módszerekkel."},
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl 
                            p-6 sm:p-8 border border-white/40 
                            hover:-translate-y-2 hover:shadow-2xl transition duration-500 group"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}