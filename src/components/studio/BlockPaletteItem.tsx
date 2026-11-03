'use client';

// ==============================================================================
// SnapBot Block Palette Item - Renders Actual Completed Block Shapes
// Scratch & Entry style visual block preview in the palette
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React from 'react';
import { BlockDefinition } from '@/lib/snapbot/core/types';
import {
  generateHatPath,
  generateCommandPath,
  generateCBlockPath,
  generateHexagonPath,
  generateReporterPath,
} from '@/lib/snapbot/ui/svg-paths';

interface BlockPaletteItemProps {
  def: BlockDefinition;
  onAdd: (opcode: string) => void;
}

export const BlockPaletteItem: React.FC<BlockPaletteItemProps> = ({ def, onAdd }) => {
  const width = 240;
  const height = def.shape === 'hat' ? 44 : def.shape === 'c-block' ? 70 : def.shape === 'reporter' || def.shape === 'boolean' ? 32 : 38;

  let pathD = '';
  if (def.shape === 'hat') {
    pathD = generateHatPath(width, 42);
  } else if (def.shape === 'command') {
    pathD = generateCommandPath(width, 38);
  } else if (def.shape === 'c-block') {
    pathD = generateCBlockPath(width, 38, 30, 18);
  } else if (def.shape === 'boolean') {
    pathD = generateHexagonPath(width, 32);
  } else if (def.shape === 'reporter') {
    pathD = generateReporterPath(width, 32);
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/snapbot-opcode', def.opcode);
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Format label: replace {arg} with clean rounded preview bubble
  const parts = def.label.split(/({[^}]+})/g);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onAdd(def.opcode)}
      className="cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform select-none py-1 group"
      title={`${def.label}\n${def.description}`}
    >
      <svg
        width={width + 8}
        height={height + 10}
        className="overflow-visible filter drop-shadow-sm group-hover:drop-shadow-md transition-all"
      >
        {/* Block Body SVG Path */}
        <path
          d={pathD}
          fill={def.color}
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1.2"
        />

        {/* Top Edge Gloss Highlight */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Label & Fields */}
        <foreignObject
          x={def.shape === 'hat' ? 14 : def.shape === 'boolean' ? 16 : 10}
          y={def.shape === 'hat' ? 13 : def.shape === 'c-block' ? 6 : 4}
          width={width - 20}
          height={32}
        >
          <div className="flex items-center gap-1.5 h-full text-white text-[11px] font-semibold tracking-tight overflow-hidden pointer-events-none">
            {parts.map((p, idx) => {
              if (p.startsWith('{') && p.endsWith('}')) {
                const paramName = p.slice(1, -1);
                return (
                  <span
                    key={idx}
                    className="inline-block bg-white text-slate-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-inner truncate max-w-[80px]"
                  >
                    {paramName}
                  </span>
                );
              }
              return (
                <span key={idx} className="truncate drop-shadow-sm">
                  {p}
                </span>
              );
            })}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};
