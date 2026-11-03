'use client';

// ==============================================================================
// SnapBot Community Hub & Preset Templates (/explore)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bot,
  Sparkles,
  GitFork,
  Star,
  Search,
} from 'lucide-react';
import { useI18n, LanguageSelector } from '@/lib/i18n/context';

interface PresetTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  blockCount: number;
  stars: number;
  author: string;
  badgeColor: string;
}

const TEMPLATES: PresetTemplate[] = [
  {
    id: 'starter_ping',
    title: 'Ping Pong & Interactive Button Bot',
    category: 'utility',
    description: 'Handles basic /ping slash command replies and interactive Discord button click events.',
    blockCount: 4,
    stars: 128,
    author: 'SnapBot Official',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    id: 'starter_welcome',
    title: 'Auto Welcome & Rich Embed Bot',
    category: 'welcome',
    description: 'Automatically greets new members with colorful embed cards and server rules when they join.',
    blockCount: 7,
    stars: 94,
    author: 'SnapBot Official',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 'starter_moderation',
    title: 'Moderation & Bulk Cleaner Bot',
    category: 'moderation',
    description: 'Enforces moderation rules with timeout, kick, and bulk message cleanup in channels.',
    blockCount: 9,
    stars: 215,
    author: 'SnapBot Official',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  {
    id: 'starter_database',
    title: 'Persistent DB Points & Daily Check-in',
    category: 'database',
    description: 'Persists user points and daily streak data across restarts using built-in database blocks.',
    blockCount: 8,
    stars: 172,
    author: 'Workshop-Koharu',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
];

export default function ExplorePage() {
  const router = useRouter();
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = TEMPLATES.filter((tpl) => {
    const matchesSearch =
      search === '' ||
      tpl.title.toLowerCase().includes(search.toLowerCase()) ||
      tpl.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || tpl.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleRemix = (templateId: string) => {
    router.push(`/studio?preset=${templateId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 sm:px-6 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
            <img src="/icon.png" alt="SnapBot" className="w-5 h-5 object-contain" />
          </div>
          <span className="font-extrabold text-base text-white">SnapBot {t.nav.explore}</span>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link href="/dashboard" className="hidden sm:inline-block text-xs font-medium text-slate-300 hover:text-white">
            {t.nav.dashboard}
          </Link>
          <Link
            href="/studio"
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
          >
            {t.nav.studio}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 flex-1">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Templates</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Featured Bot Templates</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Pick a pre-configured template and remix it instantly into your studio workspace.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search templates (e.g. Welcome, Moderation)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {['all', 'utility', 'welcome', 'moderation', 'database'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors uppercase ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((tpl) => (
            <div
              key={tpl.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase ${tpl.badgeColor}`}>
                    {tpl.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{tpl.stars}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{tpl.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {tpl.description}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
                  <span>{tpl.blockCount} Blocks</span>
                  <span>By: {tpl.author}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-end">
                <button
                  onClick={() => handleRemix(tpl.id)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 hover:scale-105"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>Remix to Studio</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

