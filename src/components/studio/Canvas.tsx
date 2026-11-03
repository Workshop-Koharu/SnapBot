'use client';

// ==============================================================================
// SnapBot Visual Block Assembly Canvas
// Scratch & Entry style infinite workspace with magnetic snapping & minimap
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BlockInstance, SnapCandidate } from '@/lib/snapbot/core/types';
import { WorkspaceManager } from '@/lib/snapbot/core/workspace';
import { findBestSnapCandidate } from '@/lib/snapbot/core/snapping';
import { BlockView } from './BlockView';
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

  // Viewport transforms: pan and zoom
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 40, y: 40 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Dragging blocks
  const [draggingBlockId, setDraggingBlockId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [snapCandidate, setSnapCandidate] = useState<SnapCandidate | null>(null);
  const [isOverTrash, setIsOverTrash] = useState(false);

  const blocks = manager.getBlocks();

  // ----------------------------------------------------------------------------
  // Zoom & Pan Handlers
  // ----------------------------------------------------------------------------
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 2.0));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.4));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 40, y: 40 });
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
    // Left-click on canvas background starts panning
    if (e.button === 0 && (e.target as HTMLElement).tagName === 'svg') {
      setIsPanning(true);
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      onSelectBlock(null);
    }
  };

  // ----------------------------------------------------------------------------
  // Block Dragging & Magnetic Snapping
  // ----------------------------------------------------------------------------
  const handleBlockMouseDown = (e: React.MouseEvent, blockId: string) => {
    e.stopPropagation();
    const block = manager.getBlock(blockId);
    if (!block) return;

    onSelectBlock(blockId);
    setDraggingBlockId(blockId);

    // Disconnect block from stack if it was attached
    manager.disconnectBlock(blockId);
    onWorkspaceChange();

    // Store pointer offset relative to block
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

          // Test magnetic snapping
          const candidate = findBestSnapCandidate(currentBlock, manager.getBlocks());
          setSnapCandidate(candidate);

          // Check if hovering over trash can zone (bottom right corner)
          const isTrash =
            e.clientX > window.innerWidth - 180 && e.clientY > window.innerHeight - 180;
          setIsOverTrash(isTrash);

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
      // If dropped over trash can, delete block
      if (isOverTrash) {
        manager.removeBlock(draggingBlockId);
        onSelectBlock(null);
      } else if (snapCandidate) {
        // Snap magnetically into target block
        manager.connectBlock(draggingBlockId, snapCandidate);
      }

      setDraggingBlockId(null);
      setSnapCandidate(null);
      setIsOverTrash(false);
      onWorkspaceChange();
    }
  }, [isPanning, draggingBlockId, isOverTrash, snapCandidate, manager, onSelectBlock, onWorkspaceChange]);

  // Handle Drag & Drop from left palette
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
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative w-full h-full overflow-hidden bg-[#0F172A] select-none cursor-crosshair"
    >
      {/* SVG Canvas Area */}
      <svg className="w-full h-full block">
        <defs>
          {/* Infinite Dot Grid Pattern */}
          <pattern id="snap-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#334155" opacity="0.6" />
          </pattern>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#snap-grid)" />

        {/* Transformed Workspace Layer */}
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Magnetic Snapping Halo & Guide Indicator */}
          {snapCandidate && (
            <g>
              <circle
                cx={snapCandidate.point.x}
                cy={snapCandidate.point.y}
                r="14"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="3"
                className="animate-ping opacity-75"
              />
              <circle
                cx={snapCandidate.point.x}
                cy={snapCandidate.point.y}
                r="8"
                fill="#38BDF8"
                opacity="0.9"
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
              onFieldChange={(id, field, val) => {
                manager.updateBlockField(id, field, val);
                onWorkspaceChange();
              }}
            />
          ))}
        </g>
      </svg>

      {/* Floating Canvas Controls (Zoom, Pan, Reset) */}
      <div className="absolute bottom-6 left-6 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur border border-slate-700/80 rounded-xl p-1.5 shadow-xl text-slate-300">
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
        <div className="px-2 text-xs font-mono text-slate-400 border-l border-slate-700">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Trash Can Drop Target */}
      <div
        className={`absolute bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-200 shadow-2xl ${
          isOverTrash
            ? 'bg-red-600 border-red-400 text-white scale-110 shadow-red-500/50'
            : draggingBlockId
            ? 'bg-slate-900/95 border-red-500/50 text-red-400 animate-pulse'
            : 'bg-slate-900/60 border-slate-800 text-slate-500'
        }`}
      >
        <Trash2 className={`w-5 h-5 ${isOverTrash ? 'animate-bounce' : ''}`} />
        <span className="text-xs font-semibold">
          {isOverTrash ? '여기에 놓아 블록 삭제' : '휴지통'}
        </span>
      </div>
    </div>
  );
};
