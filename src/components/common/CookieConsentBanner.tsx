'use client';

// ==============================================================================
// SnapBot Cookie Consent Banner Component
// (c) 2026 Workshop-Koharu
// ==============================================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/context';
import { ShieldCheck, X } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('snapbot_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('snapbot_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('snapbot_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 shadow-2xl text-xs text-slate-300 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="leading-relaxed mb-3">
            {t.cookies.bannerText}{' '}
            <Link href="/cookies" className="text-indigo-400 hover:underline font-semibold">
              {t.cookies.learnMore}
            </Link>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold shadow-sm transition-colors"
            >
              {t.cookies.acceptAll}
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors"
            >
              {t.cookies.decline}
            </button>
          </div>
        </div>

        <button
          onClick={handleDecline}
          className="text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

