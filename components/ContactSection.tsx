'use client';

import { useState } from 'react';

// Modern reCAPTCHA komponens
interface ModernCaptchaProps {
  onVerify: (isVerified: boolean) => void;
  isVerified: boolean;
}

const ModernCaptcha: React.FC<ModernCaptchaProps> = ({ onVerify, isVerified }) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckboxClick = () => {
    if (isVerified) return;
    
    setIsChecking(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsChecking(false);
      onVerify(true);
    }, 1500);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div
          onClick={handleCheckboxClick}
          className={`
            w-6 h-6 border-2 rounded cursor-pointer flex items-center justify-center transition-all duration-200
            ${isVerified 
              ? 'bg-green-500 border-green-500' 
              : isChecking 
                ? 'border-blue-500' 
                : 'border-gray-400 hover:border-gray-500 bg-white'
            }
          `}
        >
          {isChecking ? (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : isVerified ? (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
            </svg>
          ) : null}
        </div>
        
        <span className="text-sm text-gray-700 font-medium">
          Nem vagyok robot
        </span>
      </div>
      
      <div className="flex flex-col items-end">
        <div className="flex items-center mb-1">
          <div className="">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          <div className="text-xs font-semibold text-gray-600">reCAPTCHA</div>
        </div>
        <div className="flex space-x-2 text-xs text-gray-500">
          <a href="#" className="hover:text-gray-700">Privacy</a>
          <span>-</span>
          <a href="#" className="hover:text-gray-700">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|hu|net|org|edu|gov|co\.uk|de|fr|es|it|pl|cz|sk|ro|bg|hr|si|at|ch)$/i;
    return emailRegex.test(email);
  };

  // Hungarian phone validation
  const validateHungarianPhone = (phone: string): boolean => {
    // Remove spaces and dashes
    const cleanPhone = phone.replace(/[\s-]/g, '');
    
    // Check Hungarian phone patterns
    const patterns = [
      /^\+3620\d{7}$/,  // +3620XXXXXXX (Telenor)
      /^\+3630\d{7}$/,  // +3630XXXXXXX (T-Mobile)
      /^\+3631\d{7}$/,  // +3631XXXXXXX (T-Mobile)
      /^\+3670\d{7}$/,  // +3670XXXXXXX (Vodafone)
      /^\+361\d{7}$/,   // +361XXXXXXX (Budapest landline)
      /^\+36\d{2}\d{6}$/ // Other Hungarian numbers
    ];
    
    return patterns.some(pattern => pattern.test(cleanPhone));
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (formData.name.trim().length < 2) {
      newErrors.name = 'A név legalább 2 karakter legyen';
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Érvényes email címet adjon meg (.com, .hu, stb.)';
    }

    // Phone validation
    if (!validateHungarianPhone(formData.phone)) {
      newErrors.phone = 'Érvényes magyar telefonszámot adjon meg (+3620/30/31/70...)';
    }

    // reCAPTCHA validation
    if (!captchaVerified) {
      newErrors.captcha = 'Kérjük, igazolja hogy nem robot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Itt tudod hozzáadni a valódi küldési logikát
      await new Promise(resolve => setTimeout(resolve, 1000)); // Szimulált küldés
      
      setSubmitted(true);
    } catch (error) {
      console.error('Hiba történt:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Real-time phone formatting
    if (name === 'phone') {
      let formattedValue = value.replace(/[^\d+]/g, ''); // Only numbers and +
      if (formattedValue && !formattedValue.startsWith('+36')) {
        if (formattedValue.startsWith('36')) {
          formattedValue = '+' + formattedValue;
        } else if (formattedValue.startsWith('06')) {
          formattedValue = '+36' + formattedValue.substring(2);
        } else if (!formattedValue.startsWith('+')) {
          formattedValue = '+36' + formattedValue;
        }
      }
      
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Köszönjük a megkeresését!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Hamarosan felvesszük Önnel a kapcsolatot.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setCaptchaVerified(false);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Új üzenet küldése
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kapcsolatfelvétel
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Várjuk megkeresését! Töltse ki az alábbi űrlapot, és hamarosan felvesszük Önnel a kapcsolatot.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 items-start">
          
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Teljes név <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={50}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  placeholder="Kovács János"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email cím <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  placeholder="pelda@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefonszám <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                  placeholder="+36301234567"
                  maxLength={12}
                />
                <p className="text-xs text-gray-500 mt-1">Formátum: +36301234567</p>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Üzenet
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm resize-none"
                  placeholder="Miben segíthetünk?"
                />
                <div className="text-xs text-gray-500 text-right mt-1">
                  {formData.message.length}/500
                </div>
              </div>

              {/* Modern reCAPTCHA */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biztonsági ellenőrzés <span className="text-red-500">*</span>
                </label>
                <ModernCaptcha 
                  onVerify={setCaptchaVerified}
                  isVerified={captchaVerified}
                />
                {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-950 text-white py-2.5 px-4 rounded-md hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-sm flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Küldés...
                  </>
                ) : (
                  'Üzenet küldése'
                )}
              </button>

              {/* Required fields note */}
              <p className="text-xs text-gray-500 text-center">
                <span className="text-red-500">*</span> Kötelező mezők
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            
            {/* Contact Details Card */}
            

            {/* Quick Response Note */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Gyors válasz</h4>
                  <p className="text-sm text-gray-600">
                    Általában 24 órán belül válaszolunk minden megkeresésre. 
                    Sürgős esetben kérjük, hogy telefonon keressen minket!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}