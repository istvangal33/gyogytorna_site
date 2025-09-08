import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Galéria | Gyógytorna - Professzionális Fizioterápia',
  description: 'Tekintse meg gyógytorna rendelőnk képgalériáját. Modern berendezések, kezelőszobák és szakmai környezet.',
  openGraph: {
    title: 'Galéria | Gyógytorna - Professzionális Fizioterápia',
    description: 'Tekintse meg gyógytorna rendelőnk képgalériáját. Modern berendezések, kezelőszobák és szakmai környezet.',
  },
};

export default function Galeria() {
  const galleryImages = [
    {
      id: 1,
      src: '/images/rendelő-1.jpg',
      alt: 'Modern várószoba kényelmes fotelekkel',
      category: 'rendelő',
      title: 'Várószoba'
    },
    {
      id: 2,
      src: '/images/kezelo-1.jpg',
      alt: 'Kezelőszoba modern berendezésekkel',
      category: 'kezelés',
      title: 'Kezelőszoba'
    },
    {
      id: 3,
      src: '/images/eszköz-1.jpg',
      alt: 'Gyógytornász eszközök és felszerelések',
      category: 'eszközök',
      title: 'Modern eszközök'
    },
    {
      id: 4,
      src: '/images/terapia-1.jpg',
      alt: 'Gyógytornász kezelés közben',
      category: 'kezelés',
      title: 'Terápiás kezelés'
    },
    {
      id: 5,
      src: '/images/rendelő-2.jpg',
      alt: 'Recepciós terület',
      category: 'rendelő',
      title: 'Recepció'
    },
    {
      id: 6,
      src: '/images/kezelo-2.jpg',
      alt: 'Második kezelőszoba',
      category: 'kezelés',
      title: 'Kezelőszoba 2'
    },
    {
      id: 7,
      src: '/images/eszköz-2.jpg',
      alt: 'Speciális rehabilitációs eszközök',
      category: 'eszközök',
      title: 'Speciális eszközök'
    },
    {
      id: 8,
      src: '/images/terapia-2.jpg',
      alt: 'Egyéni gyógytorna foglalkozás',
      category: 'kezelés',
      title: 'Egyéni terápia'
    }
  ];

  const categories = [
    { id: 'all', name: 'Összes', count: galleryImages.length },
    { id: 'rendelő', name: 'Rendelő', count: galleryImages.filter(img => img.category === 'rendelő').length },
    { id: 'kezelés', name: 'Kezelések', count: galleryImages.filter(img => img.category === 'kezelés').length },
    { id: 'eszközök', name: 'Eszközök', count: galleryImages.filter(img => img.category === 'eszközök').length }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 py-28 md:py-36 overflow-hidden">
        {/* Modern geometriai háttérminták */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-indigo-400/15 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-60 h-60 bg-gradient-to-bl from-teal-300/10 to-green-300/5 rounded-full blur-2xl"></div>
          
          <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-gradient-to-br from-blue-500/8 to-cyan-500/4 rotate-12 rounded-lg"></div>
          <div className="absolute bottom-1/4 right-1/5 w-24 h-24 bg-gradient-to-tl from-indigo-500/10 to-blue-500/5 rotate-45 rounded-full"></div>
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-800 tracking-tight">
              <span className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
                Galéria
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-800 max-w-2xl mx-auto leading-relaxed">
              Tekintse meg modern rendelőnket és eszközeinket
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-950 via-white to-blue-950 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter */}
          <div className="text-center mb-16">
            <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  {category.name}
                  <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="aspect-square relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {/* Placeholder mivel nincsenek valódi képek */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{image.title}</p>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors">
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        Nagyítás
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-600">{image.alt}</p>
                  
                  {/* Category Badge */}
                  <div className="mt-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${image.category === 'rendelő' ? 'bg-blue-100 text-blue-800' : 
                        image.category === 'kezelés' ? 'bg-green-100 text-green-800' : 
                        'bg-purple-100 text-purple-800'}`}>
                      {image.category === 'rendelő' ? '🏢' : 
                       image.category === 'kezelés' ? '🩺' : '⚡'}
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <button className="bg-blue-950 text-white px-8 py-4 rounded-xl hover:bg-blue-900 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Több kép betöltése
              <svg className="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2</div>
              <div className="text-sm text-gray-600">Kezelőszoba</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-sm text-gray-600">Modern eszköz</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-sm text-gray-600">Év tapasztalat</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-sm text-gray-600">Elégedett páciens</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Látogasson el hozzánk!
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Modern környezetben, a legújabb eszközökkel várjuk, hogy segíthessünk Önnek visszanyerni egészségét.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/idopontfoglalas"
              className="bg-white text-blue-950 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold shadow-lg"
            >
              Időpontfoglalás
            </a>
            <a
              href="/elerhetoseg"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-950 transition-colors font-semibold"
            >
              Kapcsolat
            </a>
          </div>
        </div>
      </section>
    </>
  );
}