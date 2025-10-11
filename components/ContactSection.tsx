'use client';

import { useState } from 'react';

interface ModernCaptchaProps {
  onVerify: (isVerified: boolean) => void;
  isVerified: boolean;
}

const ModernCaptcha: React.FC<ModernCaptchaProps> = ({ onVerify, isVerified }) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckboxClick = () => {
    if (isVerified) return;
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      onVerify(true);
    }, 1000);
  };

  return (
    <div className="border border-gray-300 rounded-md p-3 sm:p-4 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-pressed={isVerified}
          onClick={handleCheckboxClick}
          className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors duration-200
            ${isVerified
              ? 'bg-[#001219] border-[#001219]'
              : isChecking
                ? 'border-blue-500 bg-white'
                : 'border-gray-400 hover:border-gray-500 bg-white'
            }`}
        >
          {isChecking && (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          )}
          {isVerified && !isChecking && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
            </svg>
          )}
        </button>
        <span className="text-xs sm:text-sm text-gray-700 font-medium select-none">
          Nem vagyok robot
        </span>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center mb-1">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
          </svg>
          <div className="ml-1 text-[10px] sm:text-xs font-semibold text-gray-600">reCAPTCHA</div>
        </div>
        <div className="flex gap-2 text-[10px] sm:text-xs text-gray-500">
          <a href="#" className="hover:text-gray-700">Privacy</a>
          <span>·</span>
          <a href="#" className="hover:text-gray-700">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{[k: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|hu|net|org|edu|gov|co\.uk|de|fr|es|it|pl|cz|sk|ro|bg|hr|si|at|ch)$/i;
    return emailRegex.test(email);
  };

  const validateHungarianPhone = (phone: string) => {
    const c = phone.replace(/[\s-]/g, '');
    const patterns = [
      /^\+3620\d{7}$/, /^\+3630\d{7}$/, /^\+3631\d{7}$/, /^\+3670\d{7}$/,
      /^\+361\d{7}$/, /^\+36\d{2}\d{6}$/
    ];
    return patterns.some(p => p.test(c));
  };

  const validateForm = () => {
    const n: {[k: string]: string} = {};
    if (formData.name.trim().length < 2) n.name = 'A név legalább 2 karakter';
    if (!validateEmail(formData.email)) n.email = 'Érvényes email szükséges';
    if (!validateHungarianPhone(formData.phone)) n.phone = 'Érvényes magyar telefonszám (+3630...)';
    if (!captchaVerified) n.captcha = 'Igazolja, hogy nem robot';
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Itt majd API hívás (pl. /api/contact)
      await new Promise(r => setTimeout(r, 900));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      let v = value.replace(/[^\d+]/g, '');
      if (v && !v.startsWith('+36')) {
        if (v.startsWith('06')) v = '+36' + v.slice(2);
        else if (v.startsWith('36')) v = '+' + v;
        else if (!v.startsWith('+')) v = '+36' + v;
      }
      setFormData(f => ({ ...f, phone: v }));
    } else {
      setFormData(f => ({ ...f, [name]: value }));
    }
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }));
  };

  if (submitted) {
    return (
      <section className="py-16 sm:py-20 bg-gradient-to-br from-green-50 to-blue-50 scroll-mt-[160px]" id="contact">
        <div className="max-w-md sm:max-w-xl mx-auto px-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-8 sm:p-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Köszönjük a megkeresést!</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6">Hamarosan kapcsolatba lépünk Önnel.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setCaptchaVerified(false);
              }}
              className="bg-[#004A6D] text-white px-6 py-2.5 rounded-md hover:bg-[#0A9396] transition-colors text-sm font-medium"
            >
              Új üzenet
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#F7FAFC] to-blue-50 scroll-mt-[160px] lg:scroll-mt-[90px]"
      id="contact"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Kapcsolatfelvétel
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Töltse ki az alábbi űrlapot, és hamarosan felvesszük Önnel a kapcsolatot.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-2xl rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Teljes név <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={50}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Kovács János"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-[#001219] focus:border-[#001219] outline-none"
                />
                {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email cím <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pelda@email.com"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-[#001219] focus:border-[#001219] outline-none"
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Telefonszám <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+36301234567"
                  maxLength={13}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-[#001219] focus:border-[#001219] outline-none tracking-wide"
                />
                <p className="text-[10px] text-gray-500 mt-1">Formátum: +36301234567</p>
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Üzenet
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Miben segíthetünk?"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-[#001219] focus:border-[#001219] outline-none resize-y min-h-[100px]"
                />
                <div className="text-[10px] text-gray-500 text-right mt-1">
                  {formData.message.length}/500
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Biztonsági ellenőrzés <span className="text-red-500">*</span>
                </label>
                <ModernCaptcha
                  onVerify={setCaptchaVerified}
                  isVerified={captchaVerified}
                />
                {errors.captcha && <p className="text-[11px] text-red-500 mt-1">{errors.captcha}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#001219] hover:bg-[#EC7007] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {isSubmitting && (
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {isSubmitting ? 'Küldés...' : 'Üzenet küldése'}
              </button>

              <p className="text-[10px] text-gray-500 text-center">
                <span className="text-red-500">*</span> Kötelező mezők
              </p>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}