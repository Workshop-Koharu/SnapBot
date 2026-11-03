'use client';

// ==============================================================================
// SnapBot Community Hub & Preset Templates (/explore)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bot,
  Sparkles,
  GitFork,
  ArrowRight,
  Shield,
  MessageSquare,
  Zap,
  Star,
  Search,
} from 'lucide-react';

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
    title: '핑퐁 & 인터랙티브 버튼 봇',
    category: 'utility',
    description: '기본적인 /ping 슬래시 명령어 응답과 클릭 가능한 디스코드 버튼 이벤트를 처리하는 입문용 봇입니다.',
    blockCount: 4,
    stars: 128,
    author: 'SnapBot Official',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    id: 'starter_welcome',
    title: '서버 자동 환영 & 임베드 안내 봇',
    category: 'welcome',
    description: '새로운 멤버가 디스코드 서버에 입장했을 때 아름다운 컬러 임베드 카드와 서버 규칙을 자동으로 안내합니다.',
    blockCount: 7,
    stars: 94,
    author: 'SnapBot Official',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 'starter_moderation',
    title: '서버 관리 & 일괄 청소 자동 봇',
    category: 'moderation',
    description: '명령어로 유저 타임아웃, 추방(Kick)을 실행하고 채팅 채널의 이전 메시지를 일괄 삭제(Bulk Delete)합니다.',
    blockCount: 9,
    stars: 215,
    author: 'SnapBot Official',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  {
    id: 'starter_database',
    title: '영구 DB 포인트 & 출석체크 봇',
    category: 'database',
    description: '영구 데이터베이스 블록을 활용하여 유저별 점수 및 출석 데이터를 재부팅 후에도 영구 저장하고 조회합니다.',
    blockCount: 8,
    stars: 172,
    author: 'Workshop-Koharu',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
];

export default function ExplorePage() {
  const router = useRouter();
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
    // Navigate to studio with preset
    router.push(`/studio?preset=${templateId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
            <img src="/icon.png" alt="SnapBot" className="w-5 h-5 object-contain" />
          </div>
          <span className="font-extrabold text-base text-white">SnapBot 커뮤니티 허브</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xs font-medium text-slate-300 hover:text-white">
            내 프로젝트
          </Link>
          <Link
            href="/studio"
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
          >
            스튜디오 열기
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto px-6 py-12 flex-1">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>오픈소스 템플릿 마켓플레이스</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">공식 디스코드 봇 템플릿</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            검증된 블록 조합 템플릿을 선택하여 내 스튜디오로 원클릭 리믹스(Remix)하세요.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="템플릿 검색 (예: 환영, 관리)..."
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
                  <span>블록 {tpl.blockCount}개</span>
                  <span>제작자: {tpl.author}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-end">
                <button
                  onClick={() => handleRemix(tpl.id)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 hover:scale-105"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>내 작업실로 리믹스 (Remix)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

