'use client';

// ==============================================================================
// SnapBot Block Palette & Category Drawer
// Scratch & Entry style visual block picker
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState } from 'react';
import { BlockCategory, CATEGORY_DEFINITIONS } from '@/lib/snapbot/core/types';
import { STANDARD_BLOCKS } from '@/lib/snapbot/blocks/definitions';
import { BlockPaletteItem } from './BlockPaletteItem';
import {
  Zap,
  MessageSquare,
  Layout,
  GitFork,
  Binary,
  Variable,
  Info,
  ShieldAlert,
  Database,
  Search,
} from 'lucide-react';

interface PaletteProps {
  onAddBlock: (opcode: string) => void;
}

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  MessageSquare,
  Layout,
  GitFork,
  Binary,
  Variable,
  Info,
  ShieldAlert,
  Database,
};

export const Palette: React.FC<PaletteProps> = ({ onAddBlock }) => {
  const [activeCategory, setActiveCategory] = useState<BlockCategory>('events');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Object.values(CATEGORY_DEFINITIONS);

  const filteredBlocks = Object.values(STANDARD_BLOCKS).filter((def) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      def.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      def.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery.trim() !== '') return matchesSearch;
    return def.category === activeCategory;
  });

  return (
    <aside className="w-[300px] h-full flex flex-col bg-slate-900 border-r border-slate-800 shrink-0 select-none">
      {/* Search Header */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/60">
        <div className="relative mb-2.5">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="블록 검색 (메시지, 반복, 임베드)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 border border-slate-700/60 focus:border-indigo-500 focus:outline-none transition-colors"
          />
        </div>

        {/* 9 Category Pills */}
        {searchQuery.trim() === '' && (
          <div className="grid grid-cols-3 gap-1">
            {categories.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.iconName] || Zap;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    backgroundColor: isActive ? cat.color : undefined,
                  }}
                  className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-all ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 mb-0.5" />
                  <span className="truncate max-w-full text-center">{cat.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Visual Blocks List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1 custom-scrollbar bg-slate-950/40">
        <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
          <span>{searchQuery ? `검색 결과 (${filteredBlocks.length})` : CATEGORY_DEFINITIONS[activeCategory].name}</span>
          <span className="text-[10px] text-slate-500">클릭하거나 드래그</span>
        </div>

        {filteredBlocks.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            일치하는 블록이 없습니다.
          </div>
        ) : (
          filteredBlocks.map((def) => (
            <BlockPaletteItem key={def.opcode} def={def} onAdd={onAddBlock} />
          ))
        )}
      </div>
    </aside>
  );
};
