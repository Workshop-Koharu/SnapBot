'use client';

// ==============================================================================
// SnapBot TypeScript API Reference (/docs/api)
// Built 100% in TSX Web Page (Strict Rule: Zero additional .md files)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import Link from 'next/link';
import { Bot, ArrowLeft, Code2, Terminal, Layers } from 'lucide-react';

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between shrink-0">
        <Link href="/docs" className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>공식 문서 홈으로</span>
        </Link>
        <span className="text-sm font-extrabold text-white">@snapbot TypeScript API 레퍼런스</span>
        <Link href="/studio" className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold">
          스튜디오 열기
        </Link>
      </header>

      <main className="max-w-4xl w-full mx-auto px-6 py-12 flex-1 space-y-10">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-3">
            @snapbot 공식 라이브러리 API 레퍼런스
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            SnapBot의 핵심 모듈은 모두 TypeScript Strict Mode로 작성되어 있으며 독립적인 npm 패키지나 모노레포 라이브러리로 활용할 수 있습니다.
          </p>
        </div>

        {/* Core */}
        <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              @snapbot/core
            </span>
            <h2 className="text-lg font-bold text-white">WorkspaceManager</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            블록의 추가, 삭제, 이동, 자석 연결(Connect), 연결 해제(Disconnect) 및 Undo/Redo 이력을 총괄하는 상태 관리자 클래스입니다.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 space-y-2">
            <div className="text-indigo-400 font-semibold">// 주요 메서드 시그니처</div>
            <div>{"const manager = new WorkspaceManager(initialData?: WorkspaceData);"}</div>
            <div>{"manager.addBlock(opcode: string, x: number, y: number): BlockInstance | null;"}</div>
            <div>{"manager.moveBlock(blockId: string, dx: number, dy: number): void;"}</div>
            <div>{"manager.connectBlock(draggingId: string, candidate: SnapCandidate): void;"}</div>
            <div>{"manager.disconnectBlock(blockId: string): void;"}</div>
            <div>{"manager.exportData(): WorkspaceData;"}</div>
            <div>{"manager.undo(): boolean;"}</div>
            <div>{"manager.redo(): boolean;"}</div>
          </div>
        </section>

        {/* Compiler */}
        <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
              @snapbot/compiler
            </span>
            <h2 className="text-lg font-bold text-white">compileWorkspace()</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            조립된 Visual AST 블록 트리를 입력받아 완전한 실행 가능한 discord.js v14 TypeScript 소스코드를 생성합니다.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 space-y-2">
            <div className="text-indigo-400 font-semibold">// 사용 예시</div>
            <div>{"import { compileWorkspace } from '@/lib/snapbot/compiler/compiler';"}</div>
            <div className="pt-1">{"const result = compileWorkspace(workspaceData);"}</div>
            <div>{"console.log(result.code); // 생성된 TS 코드 문자열"}</div>
            <div>{"console.log(result.slashCommands); // 등록된 슬래시 명령어 배열"}</div>
            <div>{"console.log(result.blockCount); // 조립된 블록 개수"}</div>
          </div>
        </section>

        {/* Runtime Simulator */}
        <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              @snapbot/runtime
            </span>
            <h2 className="text-lg font-bold text-white">BotSimulator</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            브라우저 내에서 디스코드 클라이언트 없이도 블록 트리를 메모리 상에서 직접 해석·실행하여 가상 메시지, 임베드, 버튼 상호작용을 즉시 시뮬레이션합니다.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-300 space-y-2">
            <div className="text-indigo-400 font-semibold">// 시뮬레이터 인스턴스 생성 및 메시지 전송</div>
            <div>{"const simulator = new BotSimulator(workspaceData);"}</div>
            <div>{"await simulator.sendUserMessage('/ping');"}</div>
            <div>{"await simulator.clickButton('custom_btn_id');"}</div>
            <div>{"const messages = simulator.getMessages();"}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
