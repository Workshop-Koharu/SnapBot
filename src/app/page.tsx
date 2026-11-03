'use client';

// ==============================================================================
// SnapBot Official Landing Page
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import Link from 'next/link';
import {
  Bot,
  Zap,
  Code2,
  Play,
  Layers,
  ArrowRight,
  Github,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Puzzle,
  Terminal,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100">
      {/* Global Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                SnapBot <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold px-1.5 py-0.2 rounded border border-indigo-500/30">스냅봇</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono -mt-0.5">snapbot.koharu.live</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <Link href="/studio" className="hover:text-white transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>블록 스튜디오</span>
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
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium border border-slate-700/60 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <Link
              href="/login"
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5"
            >
              로그인
            </Link>

            <Link
              href="/studio"
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <span>스튜디오 시작</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-600/20 to-purple-600/20 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% 오픈소스 · 순수 TypeScript Zero-Base 블록 엔진</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.15] mb-6">
            스크래치처럼 조립하고,<br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              디스코드에서 바로 작동하는
            </span>{' '}
            나만의 봇
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-10">
            외부 블록 에디터 라이브러리에 전혀 의존하지 않고 밑바닥부터 자체 개발된
            자석 스냅(Magnetic Snapping) 엔진과 discord.js v14 실시간 컴파일러를 통해,
            누구나 상상하던 디스코드 봇을 단 몇 분 만에 구현할 수 있습니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/studio"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <Puzzle className="w-4 h-4" />
              <span>무료로 블록 스튜디오 열기</span>
            </Link>

            <Link
              href="/explore"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium border border-slate-700 transition-colors"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>공개 봇 템플릿 둘러보기</span>
            </Link>
          </div>

          {/* Interactive Visual Block Showcase Preview */}
          <div className="mt-16 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-slate-400 font-mono ml-2">SnapBot Studio Live Engine</span>
              </div>
              <div className="text-xs text-indigo-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>자석 스냅 물리 엔진 가동 중</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Assembled Block Simulation */}
              <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 font-sans space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  조립된 블록 트리 (Visual AST)
                </div>

                {/* Hat Block */}
                <div className="bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-t-xl rounded-br-xl text-xs flex items-center gap-2 shadow-md">
                  <span>⚡</span>
                  <span>슬래시 명령어 /ping 입력되었을 때</span>
                </div>

                {/* Command 1 */}
                <div className="bg-blue-600 text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md ml-3 border-t-2 border-amber-400/50">
                  <span>↩️</span>
                  <span>메시지에 답장하기: "🏓 퐁! SnapBot이 응답했습니다."</span>
                </div>

                {/* Command 2 */}
                <div className="bg-purple-600 text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md ml-3 border-t-2 border-blue-400/50">
                  <span>📋</span>
                  <span>임베드 생성 [제목: 봇 상태] [색상: #6366F1]</span>
                </div>

                {/* Command 3 */}
                <div className="bg-emerald-600 text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md ml-3 border-t-2 border-purple-400/50">
                  <span>🚀</span>
                  <span>현재 임베드 전송하기</span>
                </div>
              </div>

              {/* Real-time Generated Code Preview */}
              <div className="bg-[#090D16] p-5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>실시간 생성된 discord.js v14 코드</span>
                </div>
                <pre className="text-slate-300 leading-relaxed">
{`client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'ping') {
    await interaction.reply({
      content: '🏓 퐁! SnapBot이 응답했습니다.'
    });
    const currentEmbed = new EmbedBuilder()
      .setTitle('봇 상태')
      .setColor('#6366F1')
      .setTimestamp();
    await interaction.channel.send({ embeds: [currentEmbed] });
  }
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architecture Breakdown */}
      <section className="py-20 px-6 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              독립된 4대 핵심 모듈 구조
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              SnapBot은 Blockly 등 기성 도구를 차용하지 않고, 공식 라이브러리 형태로 설계되어 웹 IDE뿐만 아니라 CLI와 독립 프로젝트에서도 확장 가능합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Module 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Puzzle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-mono">@snapbot/core</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                블록 데이터 트리 모델, 입력 슬롯 검증, JSON 저장/불러오기 직렬화 엔진 및 Undo/Redo 기록 관리자.
              </p>
            </div>

            {/* Module 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-mono">@snapbot/blocks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                이벤트 모자 블록, 메시지 전송, 임베드 구성, C자형 루프 및 조건문, 관리(Moderation) 표준 블록 세트.
              </p>
            </div>

            {/* Module 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-mono">@snapbot/compiler</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                조립된 블록 트리를 분석하여 오류 없는 discord.js v14 및 TypeScript 코드로 실시간 변환하는 코드 생성기.
              </p>
            </div>

            {/* Module 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Play className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-mono">@snapbot/runtime</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                토큰을 발급받기 전에도 브라우저 내 가상 디스코드 채팅방에서 봇의 반응을 실시간으로 테스트하는 시뮬레이터.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">SnapBot (스냅봇)</span>
            <span>· 100% 오픈소스 MIT 라이선스 프로젝트</span>
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
            © 2026 Workshop-Koharu (https://snapbot.koharu.live). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
