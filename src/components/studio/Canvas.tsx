'use client';

// ==============================================================================
// SnapBot Visual Block Assembly Canvas
// Scratch & Entry style infinite workspace with magnetic snapping,
// interactive trash can, and full right-click context menu
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BlockInstance, SnapCandidate } from '@/lib/snapbot/core/types';
import { WorkspaceManager } from '@/lib/snapbot/core/workspace';
import { findBestSnapCandidate } from '@/lib/snapbot/core/snapping';
import { BlockView } from './BlockView';
import { ContextMenu, ContextMenuState } from './ContextMenu';
import { ZoomIn, ZoomOut, RotateCcw, Trash2, Compass } from 'lucide-react';

interface CanvasProps {
  manager: WorkspaceManager;
  onWorkspaceChange: () => void;
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  manager,
  onWorkspaceChange,
  selectedBlockId,
  onSelectBlock,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trashRef = useRef<HTMLDivElement>(null);

  // Viewport transforms: pan and zoom
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Mobile Pinch-to-zoom & Touch references
  const initialPinchDistRef = useRef<number | null>(null);
  const initialZoomRef = useRef<number>(1);

  // Dragging blocks
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [snapCandidate, setSnapCandidate] = useState<SnapCandidate | null>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    type: 'canvas',
  });

  const blocks = manager.getBlocks();

  // Keyboard shortcut: Delete or Backspace to delete selected block
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedBlockId) {
        // Only if not currently typing in an input
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
        manager.removeBlock(selectedBlockId);
        onSelectBlock(null);
        onWorkspaceChange();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBlockId, manager, onSelectBlock, onWorkspaceChange]);

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 2.0));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.4));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 50, y: 50 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((z) => Math.min(Math.max(z + delta, 0.4), 2.0));
    } else {
      setPan((p) => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      onSelectBlock(null);
      setContextMenu((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Block Dragging & Magnetic Snapping
  const handleBlockMouseDown = (e: React.MouseEvent, blockId: string) => {
    if (e.button !== 0) return; // Only left click for dragging
    e.stopPropagation();
    const block = manager.getBlock(blockId);
    if (!block) return;

    onSelectBlock(blockId);
    setDraggingBlockId(blockId);
    setContextMenu((prev) => ({ ...prev, isOpen: false }));

    manager.disconnectBlock(blockId);
    onWorkspaceChange();

    const canvasBounds = containerRef.current?.getBoundingClientRect();
    if (canvasBounds) {
      const mouseCanvasX = (e.clientX - canvasBounds.left - pan.x) / zoom;
      const mouseCanvasY = (e.clientY - canvasBounds.top - pan.y) / zoom;
      setDragOffset({
        x: mouseCanvasX - block.x,
        y: mouseCanvasY - block.y,
      });
    }
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // 1. Pan canvas
      if (isPanning) {
        setPan({
          x: e.clientX - panStartRef.current.x,
          y: e.clientY - panStartRef.current.y,
        });
        return;
      }

      // 2. Drag block
      if (draggingBlockId) {
        const canvasBounds = containerRef.current?.getBoundingClientRect();
        if (!canvasBounds) return;

        const mouseCanvasX = (e.clientX - canvasBounds.left - pan.x) / zoom;
        const mouseCanvasY = (e.clientY - canvasBounds.top - pan.y) / zoom;

        const newX = Math.round(mouseCanvasX - dragOffset.x);
        const newY = Math.round(mouseCanvasY - dragOffset.y);

        const currentBlock = manager.getBlock(draggingBlockId);
        if (currentBlock) {
          const dx = newX - currentBlock.x;
          const dy = newY - currentBlock.y;
          manager.moveBlock(draggingBlockId, dx, dy);

          // Magnetic snapping candidate
          const candidate = findBestSnapCandidate(currentBlock, manager.getBlocks());
          setSnapCandidate(candidate);

          // Accurate Trash Can Hit Testing via getBoundingClientRect!
          if (trashRef.current) {
            const rect = trashRef.current.getBoundingClientRect();
            const isHit =
              e.clientX >= rect.left - 20 &&
              e.clientX <= rect.right + 20 &&
              e.clientY >= rect.top - 20 &&
              e.clientY <= rect.bottom + 20;
            setIsOverTrash(isHit);
          }

          onWorkspaceChange();
        }
      }
    },
    [isPanning, draggingBlockId, dragOffset, pan, zoom, manager, onWorkspaceChange]
  );

  const handleMouseUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
    }

    if (draggingBlockId) {
      // If released over trash can, delete block!
      if (isOverTrash) {
        manager.removeBlock(draggingBlockId);
        onSelectBlock(null);
      } else if (snapCandidate) {
        manager.connectBlock(draggingBlockId, snapCandidate);
      }

      setDraggingBlockId(null);
      setSnapCandidate(null);
      setIsOverTrash(false);
      onWorkspaceChange();
    }
  }, [isPanning, draggingBlockId, isOverTrash, snapCandidate, manager, onSelectBlock, onWorkspaceChange]);

  // Mobile Block Touch Start
  const handleBlockTouchStart = (e: React.TouchEvent, blockId: string) => {
    e.stopPropagation();
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const block = manager.getBlock(blockId);
    if (!block) return;

    onSelectBlock(blockId);
    setDraggingBlockId(blockId);
    setContextMenu((prev) => ({ ...prev, isOpen: false }));

    manager.disconnectBlock(blockId);
    onWorkspaceChange();

    const canvasBounds = containerRef.current?.getBoundingClientRect();
    if (canvasBounds) {
      const touchCanvasX = (touch.clientX - canvasBounds.left - pan.x) / zoom;
      const touchCanvasY = (touch.clientY - canvasBounds.top - pan.y) / zoom;
      setDragOffset({
        x: touchCanvasX - block.x,
        y: touchCanvasY - block.y,
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch to zoom initialization
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      initialPinchDistRef.current = dist;
      initialZoomRef.current = zoom;
      setIsPanning(false);
      setDraggingBlockId(null);
      return;
    }

    if (e.touches.length === 1 && !draggingBlockId) {
      const touch = e.touches[0];
      setIsPanning(true);
      panStartRef.current = { x: touch.clientX - pan.x, y: touch.clientY - pan.y };
      onSelectBlock(null);
      setContextMenu((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // 1. Pinch to zoom
    if (e.touches.length === 2 && initialPinchDistRef.current) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const scale = currentDist / initialPinchDistRef.current;
      const targetZoom = Math.min(Math.max(initialZoomRef.current * scale, 0.4), 2.0);
      setZoom(targetZoom);
      return;
    }

    // 2. Single finger drag/pan
    if (e.touches.length === 1) {
      const touch = e.touches[0];

      if (isPanning) {
        setPan({
          x: touch.clientX - panStartRef.current.x,
          y: touch.clientY - panStartRef.current.y,
        });
        return;
      }

      if (draggingBlockId) {
        const canvasBounds = containerRef.current?.getBoundingClientRect();
        if (!canvasBounds) return;

        const touchCanvasX = (touch.clientX - canvasBounds.left - pan.x) / zoom;
        const touchCanvasY = (touch.clientY - canvasBounds.top - pan.y) / zoom;

        const newX = Math.round(touchCanvasX - dragOffset.x);
        const newY = Math.round(touchCanvasY - dragOffset.y);

        const currentBlock = manager.getBlock(draggingBlockId);
        if (currentBlock) {
          const dx = newX - currentBlock.x;
          const dy = newY - currentBlock.y;
          manager.moveBlock(draggingBlockId, dx, dy);

          const candidate = findBestSnapCandidate(currentBlock, manager.getBlocks());
          setSnapCandidate(candidate);

          if (trashRef.current) {
            const rect = trashRef.current.getBoundingClientRect();
            const isHit =
              touch.clientX >= rect.left - 20 &&
              touch.clientX <= rect.right + 20 &&
              touch.clientY >= rect.top - 20 &&
              touch.clientY <= rect.bottom + 20;
            setIsOverTrash(isHit);
          }

          onWorkspaceChange();
        }
      }
    }
  };

  const handleTouchEnd = () => {
    initialPinchDistRef.current = null;
    if (isPanning) {
      setIsPanning(false);
    }
    if (draggingBlockId) {
      if (isOverTrash) {
        manager.removeBlock(draggingBlockId);
        onSelectBlock(null);
      } else if (snapCandidate) {
        manager.connectBlock(draggingBlockId, snapCandidate);
      }

      setDraggingBlockId(null);
      setSnapCandidate(null);
      setIsOverTrash(false);
      onWorkspaceChange();
    }
  };

  // Context Menu triggers
  const handleCanvasContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      type: 'canvas',
    });
  };

  const handleBlockContextMenu = (e: React.MouseEvent, blockId: string) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectBlock(blockId);
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      type: 'block',
      targetBlockId: blockId,
    });
  };

  // Drag and drop from palette
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const opcode = e.dataTransfer.getData('application/snapbot-opcode');
    if (!opcode) return;

    const canvasBounds = containerRef.current?.getBoundingClientRect();
    if (canvasBounds) {
      const dropX = (e.clientX - canvasBounds.left - pan.x) / zoom;
      const dropY = (e.clientY - canvasBounds.top - pan.y) / zoom;

      const newBlock = manager.addBlock(opcode, dropX, dropY);
      if (newBlock) {
        onSelectBlock(newBlock.id);
        onWorkspaceChange();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onContextMenu={handleCanvasContextMenu}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ touchAction: 'none' }}
      className="relative w-full h-full overflow-hidden bg-[#0B0F19] select-none cursor-default touch-none"
    >
      {/* SVG Canvas Area */}
      <svg className="w-full h-full block">
        <defs>
          <pattern id="snap-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#1E293B" opacity="0.8" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#snap-grid)" />

        {/* Transformed Workspace Layer */}
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Magnetic Snapping Halo & Indicator */}
          {snapCandidate && (
            <g>
              <circle
                cx={snapCandidate.point.x}
                cy={snapCandidate.point.y}
                r="10"
                fill="#38BDF8"
                opacity="0.9"
              />
              <circle
                cx={snapCandidate.point.x}
                cy={snapCandidate.point.y}
                r="16"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                opacity="0.6"
              />
            </g>
          )}

          {/* Render All Workspace Blocks */}
          {Object.values(blocks).map((block) => (
            <BlockView
              key={block.id}
              block={block}
              isSelected={selectedBlockId === block.id}
              onMouseDown={handleBlockMouseDown}
              onTouchStart={handleBlockTouchStart}
              onContextMenu={handleBlockContextMenu}
              onFieldChange={(id, field, val) => {
                manager.updateBlockField(id, field, val);
                onWorkspaceChange();
              }}
            />
          ))}
        </g>
      </svg>

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-6 left-6 flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl p-1 shadow-lg text-slate-300">
        <button
          onClick={handleZoomIn}
          title="확대 (Zoom In)"
          className="p-2 hover:bg-slate-800 rounded-lg hover:text-white transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="축소 (Zoom Out)"
          className="p-2 hover:bg-slate-800 rounded-lg hover:text-white transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          title="화면 리셋"
          className="p-2 hover:bg-slate-800 rounded-lg hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="px-2.5 text-xs font-mono text-slate-400 border-l border-slate-800">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Interactive Trash Can Drop Target */}
      <div
        ref={trashRef}
        onClick={() => {
          if (selectedBlockId) {
            manager.removeBlock(selectedBlockId);
            onSelectBlock(null);
            onWorkspaceChange();
          }
        }}
        className={`absolute bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-150 select-none cursor-pointer ${
          isOverTrash
            ? 'bg-rose-600 border-rose-400 text-white scale-110 shadow-lg shadow-rose-600/30'
            : draggingBlockId
            ? 'bg-slate-900 border-rose-500 text-rose-400'
            : selectedBlockId
            ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-rose-500 hover:text-rose-400'
            : 'bg-slate-900/80 border-slate-800 text-slate-500'
        }`}
        title={selectedBlockId ? '클릭하여 선택된 블록 삭제' : '블록을 드래그해 놓거나 클릭하여 삭제'}
      >
        <Trash2 className={`w-5 h-5 ${isOverTrash ? 'scale-125' : ''} transition-transform`} />
        <span className="text-xs font-semibold">
          {isOverTrash ? '놓아서 삭제' : selectedBlockId ? '선택 블록 삭제' : '휴지통'}
        </span>
      </div>

      {/* Right-Click Context Menu */}
      <ContextMenu
        state={contextMenu}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onDuplicateBlock={(id) => {
          manager.duplicateBlock(id);
          onWorkspaceChange();
        }}
        onDeleteBlock={(id) => {
          manager.removeBlock(id);
          onSelectBlock(null);
          onWorkspaceChange();
        }}
        onDetachBlock={(id) => {
          manager.disconnectBlock(id);
          onWorkspaceChange();
        }}
        onCopyBlockCode={(id) => {
          const blk = manager.getBlock(id);
          if (blk) {
            navigator.clipboard.writeText(`// Block ${blk.opcode}\n// ID: ${blk.id}`);
          }
        }}
        onUndo={() => {
          if (manager.undo()) onWorkspaceChange();
        }}
        onRedo={() => {
          if (manager.redo()) onWorkspaceChange();
        }}
        onCleanUp={() => {
          manager.cleanUpBlocks();
          onWorkspaceChange();
        }}
        onResetView={handleResetView}
        onClearAll={() => {
          if (confirm('캔버스의 모든 블록을 삭제하시겠습니까?')) {
            manager.clearAllBlocks();
            onSelectBlock(null);
            onWorkspaceChange();
          }
        }}
      />
    </div>
  );
};
