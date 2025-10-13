'use client';

import React, { useState } from 'react';

const BRAND_PRIMARY = 'var(--color-brand-primary, #004A6D)';
const BRAND_ACCENT = 'var(--color-brand-accent, #EC7007)';

interface ModernCaptchaProps {
  onVerify: (isVerified: boolean) => void;
  isVerified: boolean;
}

const ModernCaptcha: React.FC<ModernCaptchaProps> = ({ onVerify, isVerified }) => {
  const [isChecking, setIsChecking] = useState(false);

  const verify = () => {
    if (isVerified) return;
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      onVerify(true);
    }, 900);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      verify();
    }
  };

  return (
    <div
      className="flex items-center justify-between rounded-lg p-3 sm:p-4 bg-white"
      style={{
        border: `1px solid color-mix(in srgb, ${BRAND_PRIMARY} 22%, transparent)`,
        boxShadow: '0 8px 22px rgba(0,0,0,0.05)',
      } as React.CSSProperties}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-pressed={isVerified}
          aria-label={isVerified ? 'Ellenőrizve' : 'Nem vagyok robot ellenőrzés'}
          onClick={verify}
          onKeyDown={onKeyDown}
          className="w-6 h-6 rounded-md flex items-center justify-center border relative"
          style={{
            borderColor: isVerified ? BRAND_PRIMARY : 'rgba(100,116,139,.6)',
            background: isVerified ? `${BRAND_PRIMARY}` : '#fff',
            color: '#fff',
          } as React.CSSProperties}
        >
          {isChecking && (
            <span
              className="block w-4 h-4 rounded-full border-2 animate-spin"
              style={{
                borderColor: `color-mix(in srgb, ${BRAND_ACCENT} 90%, white)`,
                borderTopColor: 'transparent',
              } as React.CSSProperties}
            />
          )}
          {isVerified && !isChecking && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <span className="text-xs sm:text-sm font-medium text-[#1d2b32] select-none">Nem vagyok robot</span>
      </div>

      <div className="flex flex-col items-end">
        <div
          className="flex items-center mb-1 text-[10px] sm:text-xs font-semibold"
          style={{ color: `color-mix(in srgb, ${BRAND_PRIMARY} 80%, #64748b)` } as React.CSSProperties}
        >
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l1.09 6.26L22 9l-8.91.74L12 16l-1.09-6.26L2 9l8.91-.74L12 2z" />
          </svg>
          reCAPTCHA
        </div>
        <div className="flex gap-2 text-[10px] sm:text-xs text-slate-500">
          <a href="#" className="hover:text-slate-700">Privacy</a>
          <span aria-hidden="true">·</span>
          <a href="#" className="hover:text-slate-700">Terms</a>
        </div>
      </div>
    </div>
  );
};

// kis segéd a feltételes osztályokhoz
const cls = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

function validateEmail(email: string) {
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|hu|net|org|edu|gov|co\.uk|de|fr|es|it|pl|cz|sk|ro|bg|hr|si|at|ch)$/i;
  return emailRegex.test(email);
}

function validateHungarianPhone(phone: string) {
  const c = phone.replace(/[\s-]/g, '');
  const patterns = [
    /^\+3620\d{7}$/, /^\+3630\d{7}$/, /^\+3631\d{7}$/, /^\+3670\d{7}$/,
    /^\+361\d{7}$/, /^\+36\d{2}\d{6}$/,
  ];
  return patterns.some((p) => p.test(c));
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const inputBase = 'w-full px-3 py-2 rounded-md border bg-white text-sm placeholder:text-slate-500 outline-none transition-shadow';
  const inputBorder = 'border-slate-300';
  const inputFocus = 'focus:ring-2 focus:ring-[color:var(--color-brand-primary,#004A6D)] focus:border-[color:var(--color-brand-primary,#004A6D)]';

  const validateForm = () => {
    const n: { [k: string]: string } = {};
    if (formData.website) n.form = 'Érvénytelen beküldés.'; // honeypot
    if (formData.name.trim().length < 2) n.name = 'A név legalább 2 karakter';
    if (!validateEmail(formData.email)) n.email = 'Érvényes email szükséges';
    if (!validateHungarianPhone(formData.phone)) n.phone = 'Érvényes magyar telefonszám (+3630...)';
    if (!captchaVerified) n.captcha = 'Igazolja, hogy nem robot';
    setErrors(n);
    // fókusz az első hibás mezőre
    const firstKey = Object.keys(n)[0];
    if (firstKey && typeof window !== 'undefined') {
      const el = document.getElementById(firstKey === 'form' ? 'name' : firstKey);
      el?.focus();
    }
    return Object.keys(n).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;
  setIsSubmitting(true);
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        website: formData.website, // honeypot
      }),
    });
    const json = await res.json();
    if (!res.ok || !json?.ok) {
      throw new Error(json?.error || "Küldési hiba");
    }
    setSubmitted(true);
  } catch (err: any) {
    setErrors((e) => ({ ...e, form: err?.message || "Ismeretlen hiba." }));
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
      setFormData((f) => ({ ...f, phone: v }));
    } else {
      setFormData((f) => ({ ...f, [name]: value }));
    }
    if (errors[name]) setErrors((err) => ({ ...err, [name]: '' }));
    if (name === 'message' && errors.form) setErrors((err) => ({ ...err, form: '' }));
  };

  if (submitted) {
    return (
      <section className="py-16 sm:py-20 bg-gradient-to-br from-green-50 to-blue-50 scroll-mt-[160px]" id="contact">
        <div className="max-w-md sm:max-w-xl mx-auto px-4">
          <div
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center"
            style={{ border: `1px solid color-mix(in srgb, ${BRAND_PRIMARY} 18%, transparent)` } as React.CSSProperties}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d2b32] mb-3">Köszönjük a megkeresést!</h2>
            <p className="text-base sm:text-lg text-slate-600 mb-6">Hamarosan kapcsolatba lépünk Önnel.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', message: '', website: '' });
                setCaptchaVerified(false);
                setErrors({});
              }}
              className="btn btn--primary"
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
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
            style={{ color: BRAND_PRIMARY } as React.CSSProperties}
          >
            Kapcsolatfelvétel
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Töltse ki az alábbi űrlapot, és hamarosan felvesszük Önnel a kapcsolatot.
          </p>
        </div>

        <div className="flex justify-center">
          <div
            className="bg-white w-full max-w-sm sm:max-w-md md:max-w-2xl rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            style={{ border: `1px solid color-mix(in srgb, ${BRAND_PRIMARY} 18%, transparent)` } as React.CSSProperties}
          >
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* honeypot (rejtett) */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-slate-800 mb-1">
                  Teljes név <span className="text-black-500">*</span>
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
                  className={cls(
                    inputBase,
                    errors.name ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : `${inputBorder} ${inputFocus}`
                  )}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  autoComplete="name"
                />
                {errors.name && <p id="name-error" className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-slate-800 mb-1">
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
                  className={cls(
                    inputBase,
                    errors.email ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : `${inputBorder} ${inputFocus}`
                  )}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  autoComplete="email"
                  inputMode="email"
                />
                {errors.email && <p id="email-error" className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-slate-800 mb-1">
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
                  className={cls(
                    inputBase,
                    'tracking-wide',
                    errors.phone ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : `${inputBorder} ${inputFocus}`
                  )}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
                  autoComplete="tel"
                  inputMode="tel"
                />
                <p id="phone-help" className="text-[10px] text-slate-500 mt-1">Formátum: +36301234567</p>
                {errors.phone && <p id="phone-error" className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-slate-800 mb-1">
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
                  className={`${inputBase} ${inputBorder} ${inputFocus} min-h-[100px] resize-y`}
                  aria-describedby="message-count"
                />
                <div id="message-count" className="text-[10px] text-slate-500 text-right mt-1">
                  {formData.message.length}/500
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-800 mb-2">
                  Biztonsági ellenőrzés <span className="text-red-500">*</span>
                </label>
                <ModernCaptcha onVerify={setCaptchaVerified} isVerified={captchaVerified} />
                {errors.captcha && <p className="text-[11px] text-red-600 mt-1">{errors.captcha}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn--primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {isSubmitting ? 'Küldés...' : 'Üzenet küldése'}
              </button>

              {errors.form && (
                <p className="text-[11px] text-red-600 text-center">{errors.form}</p>
              )}

              <p className="text-[10px] text-slate-500 text-center">
                <span className="text-red-500">*</span> Kötelező mezők
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}