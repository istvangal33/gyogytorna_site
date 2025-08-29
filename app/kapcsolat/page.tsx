'use client';

import { useState } from 'react';

// Note: metadata is handled in layout.tsx for client components
export default function Kapcsolat() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', message: '', service: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitStatus('idle');
    }, 5000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kapcsolatfelvétel
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Vegye fel velünk a kapcsolatot időpont foglaláshoz vagy kérdéseivel
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Küldjön üzenetet
              </h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <p className="font-semibold">Üzenet sikeresen elküldve!</p>
                  <p>Hamarosan felvesszük Önnel a kapcsolatot.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Teljes név *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Az Ön neve"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail cím *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="pelda@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefonszám
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+36 30 123 4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Érdeklődési terület
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Válasszon...</option>
                      <option value="gerinc">Gerinc rehabilitáció</option>
                      <option value="sport">Sportrehabilitáció</option>
                      <option value="idoskoru">Időskorú terápia</option>
                      <option value="szules">Szülés előtti/utáni</option>
                      <option value="manual">Manuálterápia</option>
                      <option value="mozgas">Mozgásterápia</option>
                      <option value="egyeb">Egyéb</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Üzenet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Írja le problémáját, kérdését vagy igényeit..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold text-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Küldés...
                    </span>
                  ) : (
                    'Üzenet Küldése'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Elérhetőségek
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                      <div className="text-xl">📞</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Telefon</h4>
                      <a href="tel:+36301234567" className="text-blue-600 hover:text-blue-800">
                        +36 30 123 4567
                      </a>
                      <p className="text-gray-600 text-sm mt-1">
                        Hívható: Hétfő-Péntek 8:00-18:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                      <div className="text-xl">✉️</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">E-mail</h4>
                      <a href="mailto:info@gyogytorna.hu" className="text-blue-600 hover:text-blue-800">
                        info@gyogytorna.hu
                      </a>
                      <p className="text-gray-600 text-sm mt-1">
                        Válaszunk 24 órán belül
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 rounded-lg p-3 flex-shrink-0">
                      <div className="text-xl">📍</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cím</h4>
                      <p className="text-gray-700">
                        1051 Budapest<br />
                        Példa utca 12., 2. emelet
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 rounded-lg p-3 flex-shrink-0">
                      <div className="text-xl">🕒</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Rendelési idő</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>Hétfő-Péntek: 8:00-18:00</p>
                        <p>Szombat: 8:00-12:00</p>
                        <p>Vasárnap: Zárva</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-semibold text-red-800 mb-3">Sürgős esetekben</h4>
                <p className="text-red-700 text-sm mb-3">
                  Akut fájdalom vagy sürgős konzultáció szükségessége esetén.
                </p>
                <a 
                  href="tel:+36301234567"
                  className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-semibold"
                >
                  📞 Azonnali kapcsolat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Gyakran Ismételt Kérdések
            </h2>
            <p className="text-xl text-gray-600">
              A leggyakoribb kérdések és válaszok
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Kell-e orvosi beutaló?</h4>
              <p className="text-gray-600">
                Orvosi beutaló nem szükséges a kezeléshez. Első alkalommal részletes 
                konzultációt végzünk a problémák feltárására.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Mennyi egy kezelés időtartama?</h4>
              <p className="text-gray-600">
                Egy kezelési alkalom általában 45-60 percet vesz igénybe, amely magába 
                foglalja a konzultációt és a terápiát is.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Hány kezelés szükséges?</h4>
              <p className="text-gray-600">
                Ez egyéni, a probléma jellegétől függ. Akut esetekben 3-5 alkalom, 
                krónikus problémáknál 8-12 kezelés szükséges általában.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Mit vigyek magammal?</h4>
              <p className="text-gray-600">
                Kényelmes, sportos ruhát, törölközőt és minden korábbi leletét, 
                amely a problémájához kapcsolódik.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}