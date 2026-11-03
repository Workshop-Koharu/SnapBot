'use client';

// ==============================================================================
// SnapBot Block Catalog & Dictionary (/docs/blocks)
// Built 100% in TSX Web Page (Strict Rule: Zero additional .md files)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import Link from 'next/link';
import { STANDARD_BLOCKS } from '@/lib/snapbot/blocks/definitions';
import { CATEGORY_DEFINITIONS, BlockCategory } from '@/lib/snapbot/core/types';
import { Bot, ArrowLeft, Layers, Code, Hash } from 'lucide-react';

export default function BlocksDocPage() {
  const categories = Object.values(CATEGORY_DEFINITIONS);

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between shrink-0">
        <Link href="/docs" className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>공식 문서 홈으로</span>
        </Link>
        <span className="text-sm font-extrabold text-white">표준 블록 카탈로그 & 사전</span>
        <Link href="/studio" className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold">
          스튜디오 열기
        </Link>
      </header>

      <main className="max-w-6xl w-full mx-auto px-6 py-12 flex-1 space-y-12">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-3">전체 블록 사전 (Catalog)</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            SnapBot에서 기본 제공하는 6개 카테고리의 표준 블록 세트입니다.
            각 블록의 모양(형상), 입력 파라미터, 슬롯 유형 및 실시간 discord.js 변환 규칙을 확인할 수 있습니다.
          </p>
        </div>

        {categories.map((cat) => {
          const categoryBlocks = Object.values(STANDARD_BLOCKS).filter(
            (b) => b.category === cat.id
          );

          return (
            <section key={cat.id} className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <h2 className="text-xl font-bold text-white">{cat.name}</h2>
                <span className="text-xs text-slate-400 font-mono">
                  ({categoryBlocks.length}개 블록)
                </span>
              </div>
              <p className="text-xs text-slate-400">{cat.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {categoryBlocks.map((blk) => (
                  <div
                    key={blk.opcode}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded text-white font-mono uppercase"
                          style={{ backgroundColor: blk.color }}
                        >
                          {blk.shape}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {blk.opcode}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-white mb-1">{blk.label}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {blk.description}
                      </p>

                      {blk.fields.length > 0 && (
                        <div className="mb-2">
                          <span className="text-[11px] font-semibold text-slate-400">입력 필드: </span>
                          <span className="text-xs text-slate-300 font-mono">
                            {blk.fields.map((f) => `${f.name}(${f.type})`).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
