'use client';

// ==============================================================================
// SnapBot Official Landing Page
// Clean Entry & Scratch style visual presentation (No neon glows, real purple X logo)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import Link from 'next/link';
import {
  Code2,
  Play,
  Layers,
  ArrowRight,
  Github,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Puzzle,
  Terminal,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      {/* Global Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
              <img src="/icon.png" alt="SnapBot" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                SnapBot <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-semibold px-1.5 py-0.5 rounded border border-indigo-500/20">스냅봇</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono -mt-0.5">snapbot.koharu.live</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <Link href="/studio" className="hover:text-white transition-colors">
              블록 스튜디오
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              내 프로젝트
            </Link>
            <Link href="/explore" className="hover:text-white transition-colors">
              커뮤니티 허브
            </Link>
            <Link href="/docs" className="hover:text-white transition-colors">
              공식 가이드 & API
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Workshop-Koharu/SnapBot"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <Link
              href="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5"
            >
              로그인
            </Link>

            <Link
              href="/studio"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <span>스튜디오 시작</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-indigo-300 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>오픈소스 · 순수 TypeScript Zero-Base 블록 엔진</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-6">
            스크래치처럼 조립하고,<br />
            <span className="text-indigo-400">디스코드에서 바로 작동하는</span> 나만의 봇
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            외부 블록 에디터 라이브러리 없이 순수 TypeScript로 자체 구현된 자석 스냅 엔진과
            200개 이상의 표준 디스코드 블록을 통해 누구나 강력한 봇을 쉽게 제작할 수 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/studio"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <Puzzle className="w-4 h-4" />
              <span>블록 스튜디오 열기</span>
            </Link>

            <Link
              href="/explore"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>공개 템플릿 둘러보기</span>
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
                <span>200+ 블록 라이브러리 연동</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Assembled Block Simulation */}
              <div className="bg-[#0B0F19] p-5 rounded-xl border border-slate-800 font-sans space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  조립된 블록 시퀀스
                </div>

                <div className="bg-[#EAB308] text-slate-950 font-bold px-4 py-2.5 rounded-t-xl rounded-br-xl text-xs flex items-center gap-2 shadow-sm">
                  <span>슬래시 명령어 /ping 실행 시</span>
                </div>

                <div className="bg-[#3B82F6] text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm ml-3 border-t border-amber-300/40">
                  <span>메시지에 직접 답장하기: "Pong! 0.05초만에 응답했습니다."</span>
                </div>

                <div className="bg-[#8B5CF6] text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm ml-3 border-t border-blue-400/40">
                  <span>새 임베드 생성 [제목: 봇 상태] [설명: 정상 가동 중]</span>
                </div>

                <div className="bg-[#10B981] text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm ml-3 border-t border-purple-400/40">
                  <span>현재 임베드 채널 전송</span>
                </div>
              </div>

              {/* Real-time Generated Code Preview */}
              <div className="bg-[#090D16] p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>실시간 생성된 discord.js v14 소스코드</span>
                </div>
                <pre className="text-slate-300 leading-relaxed">
{`client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'ping') {
    await interaction.reply({
      content: 'Pong! 0.05초만에 응답했습니다.'
    });
    const currentEmbed = new EmbedBuilder()
      .setTitle('봇 상태')
      .setDescription('정상 가동 중')
      .setTimestamp();
    await interaction.reply({ embeds: [currentEmbed] });
  }
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architecture Breakdown */}
      <section className="py-16 px-6 border-t border-slate-800 bg-slate-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              독립된 4대 핵심 패키지
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              SnapBot은 기성 라이브러리에 종속되지 않는 자체 공식 모듈로 구성되어 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Puzzle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 font-mono">@snapbot/core</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                블록 트리 데이터 모델, 자석 스냅 물리 엔진, 직렬화 및 Undo/Redo 이력 관리자.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 font-mono">@snapbot/blocks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                이벤트, 메시지, 임베드, 제어문, 연산자, 변수, 관리(Mod) 등 200+ 표준 블록 정의.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 font-mono">@snapbot/compiler</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                조립된 블록을 분석하여 실행 가능한 클린 discord.js v14 TypeScript 코드로 트랜스파일.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Play className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1 font-mono">@snapbot/runtime</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                토큰 없이도 웹 브라우저 내 가상 채팅방에서 실시간으로 봇 동작을 검증하는 시뮬레이터.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">SnapBot (스냅봇)</span>
            <span>· MIT License</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-white transition-colors">공식 문서</Link>
            <Link href="/explore" className="hover:text-white transition-colors">커뮤니티</Link>
            <a
              href="https://github.com/Workshop-Koharu/SnapBot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-slate-500">
            &copy; 2026 Workshop-Koharu (https://snapbot.koharu.live). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
