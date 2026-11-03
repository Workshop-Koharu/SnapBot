'use client';

// ==============================================================================
// SnapBot Official Documentation - Overview (/docs)
// Built 100% in TSX Web Page (Strict Rule: Zero additional .md files)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import Link from 'next/link';
import {
  Bot,
  BookOpen,
  Puzzle,
  Key,
  Code2,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink,
} from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      {/* Docs Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
            <img src="/icon.png" alt="SnapBot" className="w-5 h-5 object-contain" />
          </div>
          <span className="font-extrabold text-base text-white">SnapBot 공식 문서</span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
          <Link href="/studio" className="hover:text-white">블록 스튜디오</Link>
          <Link href="/dashboard" className="hover:text-white">내 프로젝트</Link>
          <a
            href="https://github.com/Workshop-Koharu/SnapBot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Docs Layout */}
      <div className="max-w-7xl w-full mx-auto px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Nav */}
        <aside className="lg:col-span-1 space-y-6 text-xs">
          <div>
            <div className="font-bold text-slate-400 uppercase tracking-wider mb-2">시작하기</div>
            <ul className="space-y-1">
              <li>
                <Link href="/docs" className="block px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold">
                  📖 시작 안내 및 아키텍처
                </Link>
              </li>
              <li>
                <Link href="/docs/bot-token-guide" className="block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors">
                  🔑 디스코드 봇 토큰 발급 가이드
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-slate-400 uppercase tracking-wider mb-2">라이브러리 레퍼런스</div>
            <ul className="space-y-1">
              <li>
                <Link href="/docs/blocks" className="block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors">
                  🧩 전체 블록 사전 (Block Catalog)
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors">
                  ⚡ @snapbot TypeScript API
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-4">
              SnapBot (스냅봇) 공식 개발자 문서
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              SnapBot은 교육용 비주얼 프로그래밍 언어인 스크래치(Scratch)와 엔트리(Entry)의 직관적인 블록 조립 감각을 그대로 디스코드 봇 제작에 접목한 100% 오픈소스 플랫폼이자 TypeScript 라이브러리입니다.
            </p>
          </div>

          {/* Quick Start Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/docs/bot-token-guide"
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all group"
            >
              <Key className="w-6 h-6 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-base text-white mb-1">디스코드 봇 토큰 발급</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Discord Developer Portal에서 봇 계정을 생성하고 토큰을 발급받는 단계별 가이드.
              </p>
            </Link>

            <Link
              href="/docs/blocks"
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all group"
            >
              <Puzzle className="w-6 h-6 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-base text-white mb-1">표준 블록 카탈로그</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                이벤트, 메시지, 임베드, 제어문, 변수, 관리 블록의 세부 입출력 및 코드 변환 명세.
              </p>
            </Link>
          </div>

          {/* Architecture Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">Zero-Base 자체 블록 엔진 원칙</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              SnapBot은 Google Blockly나 외부 블록 라이브러리에 종속되지 않습니다.
              수학적 SVG 패스 연산(오목한 홈, 볼록한 돌기, 둥근 알약, 육각형 조건문)과 2D 유클리드 거리 기반의 자석 스냅(Magnetic Snapping) 물리 엔진을 순수 TypeScript로 설계하여 가볍고, 반응 속도가 뛰어나며, 모바일과 데스크톱 모두에서 부드럽게 작동합니다.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
              <div className="text-indigo-400 font-bold mb-2">// 공식 패키지 구조</div>
              <div>📦 @snapbot/core     - AST 블록 모델, 직렬화, Undo/Redo</div>
              <div>📦 @snapbot/blocks   - 디스코드 표준 블록 정의 세트</div>
              <div>📦 @snapbot/compiler - discord.js v14 TypeScript 트랜스파일러</div>
              <div>📦 @snapbot/runtime  - 브라우저 인메모리 봇 가상 시뮬레이터</div>
            </div>
          </section>

          {/* Local Run Guide */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">생성된 봇 로컬 실행 방법</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              스튜디오에서 [원클릭 ZIP 다운로드]를 클릭하여 내려받은 압축 파일을 해제한 후,
              터미널에서 아래의 두 명령어만 실행하면 봇이 즉시 온라인 상태가 됩니다:
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
              <div className="text-slate-500"># 1. 의존성 패키지 설치</div>
              <div className="text-emerald-400">npm install</div>
              <div className="text-slate-500 pt-2"># 2. 봇 실행</div>
              <div className="text-emerald-400">npm start</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

