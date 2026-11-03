'use client';

// ==============================================================================
// SnapBot Right-Click Context Menu Component
// Entry & Scratch style context menu for blocks and canvas
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useEffect, useRef } from 'react';
import {
  Copy,
  Trash2,
  Unlink,
  Code,
  RotateCcw,
  Undo2,
  Redo2,
  LayoutGrid,
  Maximize2,
} from 'lucide-react';

export interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
  type: 'block' | 'canvas';
  targetBlockId?: string;
}

interface ContextMenuProps {
  state: ContextMenuState;
  onClose: () => void;
  onDuplicateBlock?: (blockId: string) => void;
  onDeleteBlock?: (blockId: string) => void;
  onDetachBlock?: (blockId: string) => void;
  onCopyBlockCode?: (blockId: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onCleanUp?: () => void;
  onResetView?: () => void;
  onClearAll?: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  state,
  onClose,
  onDuplicateBlock,
  onDeleteBlock,
  onDetachBlock,
  onCopyBlockCode,
  onUndo,
  onRedo,
  onCleanUp,
  onResetView,
  onClearAll,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (state.isOpen) {
      window.addEventListener('mousedown', handleOutsideClick);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [state.isOpen, onClose]);

  if (!state.isOpen) return null;

  // Prevent menu from overflowing outside window
  const menuX = Math.min(state.x, window.innerWidth - 200);
  const menuY = Math.min(state.y, window.innerHeight - 240);

  return (
    <div
      ref={menuRef}
      style={{ left: `${menuX}px`, top: `${menuY}px` }}
      className="fixed z-50 w-48 bg-slate-900/95 backdrop-blur border border-slate-700/80 rounded-xl shadow-2xl p-1 text-slate-200 text-xs font-medium select-none animate-in fade-in zoom-in-95 duration-100"
    >
      {state.type === 'block' && state.targetBlockId ? (
        // Block Context Menu Options
        <div className="space-y-0.5">
          <button
            onClick={() => {
              if (onDuplicateBlock && state.targetBlockId) onDuplicateBlock(state.targetBlockId);
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Copy className="w-3.5 h-3.5" />
              <span>블록 복제</span>
            </div>
            <span className="text-[10px] text-slate-400 group-hover:text-white">Ctrl+D</span>
          </button>

          <button
            onClick={() => {
              if (onDetachBlock && state.targetBlockId) onDetachBlock(state.targetBlockId);
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <Unlink className="w-3.5 h-3.5" />
            <span>블록 분리</span>
          </button>

          <button
            onClick={() => {
              if (onCopyBlockCode && state.targetBlockId) onCopyBlockCode(state.targetBlockId);
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <Code className="w-3.5 h-3.5" />
            <span>생성 코드 복사</span>
          </button>

          <div className="h-px bg-slate-800 my-1" />

          <button
            onClick={() => {
              if (onDeleteBlock && state.targetBlockId) onDeleteBlock(state.targetBlockId);
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-rose-600 hover:text-white text-rose-400 rounded-lg transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-3.5 h-3.5" />
              <span>블록 삭제</span>
            </div>
            <span className="text-[10px] opacity-70">Del</span>
          </button>
        </div>
      ) : (
        // Canvas Context Menu Options
        <div className="space-y-0.5">
          <button
            onClick={() => {
              if (onUndo) onUndo();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Undo2 className="w-3.5 h-3.5" />
              <span>실행 취소</span>
            </div>
            <span className="text-[10px] text-slate-400">Ctrl+Z</span>
          </button>

          <button
            onClick={() => {
              if (onRedo) onRedo();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              <Redo2 className="w-3.5 h-3.5" />
              <span>다시 실행</span>
            </div>
            <span className="text-[10px] text-slate-400">Ctrl+Y</span>
          </button>

          <div className="h-px bg-slate-800 my-1" />

          <button
            onClick={() => {
              if (onCleanUp) onCleanUp();
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>블록 자동 정렬</span>
          </button>

          <button
            onClick={() => {
              if (onResetView) onResetView();
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors text-left"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>화면 맞춤 (100%)</span>
          </button>

          <div className="h-px bg-slate-800 my-1" />

          <button
            onClick={() => {
              if (onClearAll) onClearAll();
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-rose-600 hover:text-white text-rose-400 rounded-lg transition-colors text-left"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>모든 블록 삭제</span>
          </button>
        </div>
      )}
    </div>
  );
};

