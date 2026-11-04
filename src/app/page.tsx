'use client';

// ==============================================================================
// SnapBot Official Landing Page
// Clean Entry & Scratch style visual presentation (Real purple X logo)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Code2,
  Play,
  Layers,
  ArrowRight,
  Puzzle,
  Terminal,
  Settings,
  User,
} from 'lucide-react';
import { useI18n, LanguageSelector } from '@/lib/i18n/context';

export default function LandingPage() {
  const { t } = useI18n();
  const [currentUser, setCurrentUser] = useState<{ nickname?: string; email?: string } | null>(null);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      {/* Global Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
              <img src="/icon.png" alt="SnapBot" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                SnapBot
              </span>
              <span className="text-[10px] text-slate-400 font-mono -mt-0.5">snapbot.koharu.live</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <Link href="/studio" className="hover:text-white transition-colors">
              {t.nav.studio}
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              {t.nav.dashboard}
            </Link>
            <Link href="/explore" className="hover:text-white transition-colors">
              {t.nav.explore}
            </Link>
            <Link href="/docs" className="hover:text-white transition-colors">
              {t.nav.docs}
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector />

            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/settings"
                  title={t.nav.settings}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </Link>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="max-w-[120px] truncate">{currentUser.nickname || t.nav.dashboard}</span>
                </Link>

                <Link
                  href="/studio"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <span>{t.nav.startStudio}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1.5"
                >
                  {t.nav.login}
                </Link>

                <Link
                  href="/studio"
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <span>{t.nav.startStudio}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-indigo-300 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>{t.landing.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-6">
            {t.landing.heroTitle1}<br />
            <span className="text-indigo-400">{t.landing.heroTitle2}</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-xs sm:text-base leading-relaxed mb-8">
            {t.landing.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/studio"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Puzzle className="w-4 h-4" />
              <span>{t.landing.openStudioBtn}</span>
            </Link>

            <Link
              href="/explore"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>{t.landing.exploreTemplatesBtn}</span>
            </Link>
          </div>

          {/* Visual Block Preview Card */}
          <div className="mt-14 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <span className="text-xs text-slate-400 font-mono ml-2">SnapBot Studio Workspace</span>
              </div>
              <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>200+ Blocks Built-In</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Assembled Block Simulation */}
              <div className="bg-[#0B0F19] p-5 rounded-xl border border-slate-800 font-sans space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Assembled Block Sequence
                </div>

                <div className="bg-[#EAB308] text-slate-950 font-bold px-4 py-2.5 rounded-t-xl rounded-br-xl text-xs flex items-center gap-2 shadow-sm">
                  <span>When slash command /ping received</span>
                </div>

                <div className="bg-[#3B82F6] text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm ml-3 border-t border-amber-300/40">
                  <span>Reply to interaction: "Pong! Responded in 0.05s"</span>
                </div>

                <div className="bg-[#8B5CF6] text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm ml-3 border-t border-blue-400/40">
                  <span>Create new Embed [Title: Bot Status] [Desc: All systems operational]</span>
                </div>

                <div className="bg-[#10B981] text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm ml-3 border-t border-purple-400/40">
                  <span>Send embed to current channel</span>
                </div>
              </div>

              {/* Real-time Generated Code Preview */}
              <div className="bg-[#090D16] p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Real-Time Generated discord.js v14 TypeScript</span>
                </div>
                <pre className="text-slate-300 leading-relaxed">
{`client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'ping') {
    await interaction.reply({
      content: 'Pong! Responded in 0.05s.'
    });
    const currentEmbed = new EmbedBuilder()
      .setTitle('Bot Status')
      .setDescription('All systems operational')
      .setTimestamp();
    await interaction.channel?.send({ embeds: [currentEmbed] });
  }
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architecture Breakdown */}
      <section className="py-16 px-4 sm:px-6 border-t border-slate-800 bg-slate-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {t.landing.modulesTitle}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              {t.landing.modulesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Puzzle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 font-mono">@snapbot/core</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.landing.modCoreDesc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 font-mono">@snapbot/blocks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.landing.modBlocksDesc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 font-mono">@snapbot/compiler</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.landing.modCompilerDesc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Play className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 font-mono">@snapbot/runtime</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.landing.modRuntimeDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">SnapBot</span>
            <span>· Discord Bot Visual Studio</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/docs" className="hover:text-white transition-colors">{t.nav.docs}</Link>
            <Link href="/explore" className="hover:text-white transition-colors">{t.nav.explore}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">{t.footer.cookiePolicy}</Link>
          </div>

          <div className="text-slate-500 text-center md:text-right">
            &copy; 2026 Workshop-Koharu (https://snapbot.koharu.live). {t.landing.rightsReserved}
          </div>
        </div>
      </footer>
    </div>
  );
}
