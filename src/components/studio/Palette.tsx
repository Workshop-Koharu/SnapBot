'use client';

// ==============================================================================
// SnapBot Block Palette & Category Drawer
// Scratch / Entry style block picker
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState } from 'react';
import { BlockCategory, CATEGORY_DEFINITIONS } from '@/lib/snapbot/core/types';
import { STANDARD_BLOCKS } from '@/lib/snapbot/blocks/definitions';
import {
  Zap,
  MessageSquare,
  Layout,
  GitFork,
  Database,
  ShieldAlert,
  Search,
  Plus,
} from 'lucide-react';

interface PaletteProps {
  onAddBlock: (opcode: string) => void;
}

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  MessageSquare,
  Layout,
  GitFork,
  Database,
  ShieldAlert,
};

export const Palette: React.FC<PaletteProps> = ({ onAddBlock }) => {
  const [activeCategory, setActiveCategory] = useState<BlockCategory>('events');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Object.values(CATEGORY_DEFINITIONS);

  // Filter blocks
  const filteredBlocks = Object.values(STANDARD_BLOCKS).filter((def) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      def.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      def.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery.trim() !== '') return matchesSearch;
    return def.category === activeCategory;
  });

  const handleDragStart = (e: React.DragEvent, opcode: string) => {
    e.dataTransfer.setData('application/snapbot-opcode', opcode);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <aside className="w-80 h-full flex flex-col bg-slate-900 border-r border-slate-800 shrink-0 select-none">
      {/* Category Tabs Header */}
      <div className="p-3 border-b border-slate-800">
        <div className="relative mb-3">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="블록 검색 (예: 메시지, 임베드)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 text-slate-200 text-xs rounded-lg pl-9 pr-3 py-2 border border-slate-700/60 focus:border-indigo-500 focus:outline-none transition-colors"
          />
        </div>

        {searchQuery.trim() === '' && (
          <div className="grid grid-cols-3 gap-1.5">
            {categories.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.iconName] || Zap;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    backgroundColor: isActive ? cat.color : undefined,
                    borderColor: isActive ? cat.color : undefined,
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl text-[11px] font-medium transition-all ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <IconComp className="w-4 h-4 mb-1" />
                  <span className="truncate max-w-full text-center">{cat.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Blocks List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
          <span>{searchQuery ? `검색 결과 (${filteredBlocks.length})` : CATEGORY_DEFINITIONS[activeCategory].name}</span>
          <span className="text-[10px] text-slate-500">클릭하거나 드래그하여 조립</span>
        </div>

        {filteredBlocks.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            일치하는 블록을 찾을 수 없습니다.
          </div>
        ) : (
          filteredBlocks.map((def) => {
            return (
              <div
                key={def.opcode}
                draggable
                onDragStart={(e) => handleDragStart(e, def.opcode)}
                onClick={() => onAddBlock(def.opcode)}
                style={{
                  borderLeftColor: def.color,
                }}
                className="group relative p-2.5 bg-slate-950/80 hover:bg-slate-800/90 rounded-xl border border-slate-800 border-l-4 cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-white leading-snug">
                    {def.label.replace(/{[^}]+}/g, '...')}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddBlock(def.opcode);
                    }}
                    title="캔버스에 추가"
                    className="opacity-0 group-hover:opacity-100 p-1 bg-white/10 hover:bg-white/20 rounded-md text-white transition-opacity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {def.description}
                </p>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
