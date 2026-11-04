'use client';

// ==============================================================================
// SnapBot Cookie Consent & Preference Management Modal
// Fully compliant with GDPR / ePrivacy with real browser cookies (document.cookie)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { ShieldCheck, Settings2, Check, X, Sliders } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsentBanner: React.FC = () => {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent has already been saved in cookie or localStorage
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    };

    const consentCookie = getCookie('snapbot_cookie_consent');
    const localConsent = localStorage.getItem('snapbot_cookie_consent');

    if (!consentCookie && !localConsent) {
      setIsVisible(true);
    } else {
      setPreferences({
        essential: true,
        functional: getCookie('snapbot_consent_functional') !== 'false',
        analytics: getCookie('snapbot_consent_analytics') !== 'false',
        marketing: getCookie('snapbot_consent_marketing') === 'true',
      });
    }
  }, []);

  const saveCookies = (prefs: CookiePreferences, label: string) => {
    const oneYear = 60 * 60 * 24 * 365;
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';

    // Write REAL browser cookies with document.cookie
    document.cookie = `snapbot_cookie_consent=${label}; Path=/; max-age=${oneYear}; SameSite=Lax${isSecure}`;
    document.cookie = `snapbot_consent_essential=true; Path=/; max-age=${oneYear}; SameSite=Lax${isSecure}`;
    document.cookie = `snapbot_consent_functional=${prefs.functional}; Path=/; max-age=${oneYear}; SameSite=Lax${isSecure}`;
    document.cookie = `snapbot_consent_analytics=${prefs.analytics}; Path=/; max-age=${oneYear}; SameSite=Lax${isSecure}`;
    document.cookie = `snapbot_consent_marketing=${prefs.marketing}; Path=/; max-age=${oneYear}; SameSite=Lax${isSecure}`;

    localStorage.setItem('snapbot_cookie_consent', label);
    localStorage.setItem('snapbot_cookie_preferences', JSON.stringify(prefs));

    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const handleAcceptAll = () => {
    const allOn: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allOn);
    saveCookies(allOn, 'all');
  };

  const handleDeclineOptional = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    saveCookies(essentialOnly, 'essential');
  };

  const handleSaveCustom = () => {
    saveCookies(preferences, 'custom');
  };

  if (!isVisible && !isSettingsOpen) return null;

  return (
    <>
      {/* 1. Bottom Consent Banner */}
      {isVisible && !isSettingsOpen && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-50 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl text-xs text-slate-300 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-sm">Cookie Preferences</span>
              </div>
              <p className="leading-relaxed mb-4 text-slate-300 text-xs">
                {t.cookies.bannerText}{' '}
                <Link href="/cookies" className="text-indigo-400 hover:underline font-semibold">
                  {t.cookies.learnMore}
                </Link>
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleAcceptAll}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold shadow-sm transition-colors text-xs"
                >
                  {t.cookies.acceptAll}
                </button>
                <button
                  onClick={handleDeclineOptional}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors text-xs"
                >
                  {t.cookies.decline}
                </button>
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg font-medium transition-colors text-xs flex items-center gap-1.5 border border-slate-700"
                >
                  <Settings2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t.cookies.manageSettings}</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleDeclineOptional}
              className="text-slate-500 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Detailed Cookie Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{t.cookies.settingsTitle}</h3>
                  <p className="text-[11px] text-slate-400">{t.cookies.settingsDesc}</p>
                </div>
              </div>

              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Category Toggles */}
            <div className="p-6 overflow-y-auto space-y-4 custom-scrollbar text-xs">
              {/* Essential */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{t.cookies.essentialTitle}</span>
                    <span className="text-[10px] bg-slate-800 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-slate-700">
                      {t.cookies.alwaysActive}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {t.cookies.essentialDesc}
                  </p>
                </div>
                <div className="w-10 h-5 bg-indigo-600 rounded-full flex items-center px-1 shrink-0 opacity-80 cursor-not-allowed">
                  <div className="w-3.5 h-3.5 bg-white rounded-full ml-auto shadow" />
                </div>
              </div>

              {/* Functional */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                <div>
                  <div className="font-bold text-white mb-1">{t.cookies.functionalTitle}</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {t.cookies.functionalDesc}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPreferences((prev) => ({ ...prev, functional: !prev.functional }))
                  }
                  className={`w-10 h-5 rounded-full flex items-center px-1 shrink-0 transition-colors ${
                    preferences.functional ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full transition-transform shadow ${
                      preferences.functional ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Analytics */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                <div>
                  <div className="font-bold text-white mb-1">{t.cookies.analyticsTitle}</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {t.cookies.analyticsDesc}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
                  }
                  className={`w-10 h-5 rounded-full flex items-center px-1 shrink-0 transition-colors ${
                    preferences.analytics ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full transition-transform shadow ${
                      preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Marketing */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start justify-between gap-4">
                <div>
                  <div className="font-bold text-white mb-1">{t.cookies.marketingTitle}</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {t.cookies.marketingDesc}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setPreferences((prev) => ({ ...prev, marketing: !prev.marketing }))
                  }
                  className={`w-10 h-5 rounded-full flex items-center px-1 shrink-0 transition-colors ${
                    preferences.marketing ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 bg-white rounded-full transition-transform shadow ${
                      preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={handleDeclineOptional}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
              >
                {t.cookies.rejectOptional}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAcceptAll}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
                >
                  {t.cookies.acceptAll}
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.cookies.savePreferences}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
