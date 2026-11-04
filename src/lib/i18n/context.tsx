'use client';

// ==============================================================================
// SnapBot i18n Context & Language Selector Component
// Default Language: 'en' (English) | Options: 'en', 'ja', 'ko'
// (c) 2026 Workshop-Koharu
// ==============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, TRANSLATIONS } from './translations';
import { Globe, Check } from 'lucide-react';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: TRANSLATIONS.en,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    // 1. Check localStorage
    const saved = localStorage.getItem('snapbot_lang') as Language;
    if (saved && (saved === 'en' || saved === 'ja' || saved === 'ko')) {
      setLangState(saved);
      return;
    }

    // 2. Check document.cookie fallback
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/(?:^|;\s*)snapbot_lang=([^;]+)/);
      if (match && (match[1] === 'en' || match[1] === 'ja' || match[1] === 'ko')) {
        setLangState(match[1] as Language);
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('snapbot_lang', newLang);
      if (typeof document !== 'undefined') {
        document.cookie = `snapbot_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } catch (e) {
      console.warn('Failed to persist language setting:', e);
    }
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, setLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'ja', label: '日本語', flag: 'JA' },
    { code: 'ko', label: '한국어', flag: 'KO' },
  ];

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700/60 transition-colors"
      >
        <Globe className="w-3.5 h-3.5 text-indigo-400" />
        <span className="uppercase text-[11px]">{lang}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1.5 w-32 bg-slate-900 border border-slate-700 rounded-xl shadow-xl py-1 z-50 text-xs">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 hover:bg-slate-800 transition-colors text-left ${
                  lang === l.code ? 'text-indigo-400 font-bold bg-slate-800/50' : 'text-slate-300'
                }`}
              >
                <span>{l.label}</span>
                {lang === l.code && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

