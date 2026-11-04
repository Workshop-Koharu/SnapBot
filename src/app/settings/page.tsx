'use client';

// ==============================================================================
// SnapBot User Settings & Preferences Page (/settings)
// Manage profile, sound effects, UI language, cookie consent, and bot defaults
// (c) 2026 Workshop-Koharu
// ==============================================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useI18n, LanguageSelector } from '@/lib/i18n/context';
import { sounds } from '@/lib/audio/sounds';
import {
  ArrowLeft,
  User,
  Sliders,
  Volume2,
  VolumeX,
  ShieldCheck,
  Globe,
  FileCode2,
  Trash2,
  Save,
  Check,
  AlertTriangle,
  LogOut,
  Sparkles,
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { lang, setLang, t } = useI18n();

  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'cookies'>('profile');
  const [nickname, setNickname] = useState('SnapBot Creator');
  const [email, setEmail] = useState('user@example.com');
  const [provider, setProvider] = useState<'local' | 'google'>('local');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [defaultExport, setDefaultExport] = useState<'typescript' | 'javascript' | 'python'>('typescript');
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch current user session
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setNickname(data.user.nickname || 'SnapBot Creator');
          setEmail(data.user.email || 'user@example.com');
          setProvider(data.user.provider || 'local');
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    // 2. Load stored sound preferences
    setSoundEnabled(sounds.isEnabled());

    // 3. Load default export preference
    const storedExport = localStorage.getItem('snapbot_default_export');
    if (storedExport && ['typescript', 'javascript', 'python'].includes(storedExport)) {
      setDefaultExport(storedExport as any);
    }
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setEnabled(next);
    if (next) sounds.playClick();
  };

  const handleSave = () => {
    sounds.playSuccess();
    localStorage.setItem('snapbot_default_export', defaultExport);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleClearDrafts = () => {
    if (confirm('Are you sure you want to clear all offline project drafts saved in your browser?')) {
      sounds.playDelete();
      localStorage.removeItem('snapbot_local_projects');
      alert('Local drafts cleared successfully.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.nav.dashboard}</span>
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <span className="text-sm font-bold text-white">{t.settings.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.nav.logout}</span>
          </button>
        </div>
      </header>

      {/* Main Settings Container */}
      <main className="max-w-4xl w-full mx-auto px-6 py-10 flex-1 space-y-8">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">{t.settings.title}</h1>
          <p className="text-xs text-slate-400 mt-1">{t.settings.subtitle}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.settings.profileTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'preferences'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{t.settings.preferencesTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'cookies'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.settings.cookiesTab}</span>
          </button>
        </div>

        {/* Tab 1: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-xl">
                  {nickname.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{nickname}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">{email}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Check className="w-3 h-3" />
                      {t.settings.verifiedBadge}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.settings.nicknameLabel}
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.settings.emailLabel}
                  </label>
                  <input
                    type="text"
                    disabled
                    value={email}
                    className="w-full max-w-md bg-slate-950/60 border border-slate-800/80 rounded-xl px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Preferences */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
              {/* Sound Effects Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-2 mb-1">
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                    <span>{t.settings.soundsLabel}</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                    {t.settings.soundsDesc}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => sounds.playSnap()}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
                    >
                      {t.settings.testSnapBtn}
                    </button>
                    <button
                      onClick={() => sounds.playMessage()}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
                    >
                      {t.settings.testBloopBtn}
                    </button>
                  </div>

                  <button
                    onClick={handleToggleSound}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      soundEnabled ? 'bg-indigo-600' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform shadow ${
                        soundEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Language Selection */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span>{t.settings.languageLabel}</span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Switch between English (EN), Japanese (JA), and Korean (KO).
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      lang === 'en' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang('ja')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      lang === 'ja' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    日本語
                  </button>
                  <button
                    onClick={() => setLang('ko')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      lang === 'ko' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    한국어
                  </button>
                </div>
              </div>

              {/* Default Export Language */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-2 mb-1">
                    <FileCode2 className="w-4 h-4 text-indigo-400" />
                    <span>{t.settings.defaultExportLabel}</span>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Preferred programming language when exporting bot source code.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setDefaultExport('typescript')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      defaultExport === 'typescript' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    TypeScript
                  </button>
                  <button
                    onClick={() => setDefaultExport('javascript')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      defaultExport === 'javascript' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    JavaScript
                  </button>
                  <button
                    onClick={() => setDefaultExport('python')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      defaultExport === 'python' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Python
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Cookies & Storage */}
        {activeTab === 'cookies' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white">Browser Cookie Preferences</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Reset or reconfigure your GDPR/ePrivacy cookie consent choices.
                  </p>
                </div>
                <Link
                  href="/cookies"
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  {t.cookies.manageSettings}
                </Link>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed">
                SnapBot uses strictly necessary authentication cookies to keep you signed in securely. No personal data is ever sold to third-party ad networks.
              </div>
            </div>
          </div>
        )}

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
            {isSaved && (
              <>
                <Check className="w-4 h-4" />
                <span>{t.settings.savedToast}</span>
              </>
            )}
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
          >
            <Save className="w-4 h-4" />
            <span>{t.settings.saveBtn}</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t border-rose-950/60">
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>{t.settings.dangerZone}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <div className="text-white text-xs font-semibold">{t.settings.clearDraftsBtn}</div>
                <p className="text-slate-400 text-[11px] mt-0.5">{t.settings.clearDraftsDesc}</p>
              </div>
              <button
                onClick={handleClearDrafts}
                className="px-3.5 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.settings.clearDraftsBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

