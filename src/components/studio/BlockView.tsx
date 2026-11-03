'use client';

// ==============================================================================
// SnapBot Visual Block Component (SVG Rendered)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React from 'react';
import { BlockInstance } from '@/lib/snapbot/core/types';
import { STANDARD_BLOCKS } from '@/lib/snapbot/blocks/definitions';
import {
  generateHatPath,
  generateCommandPath,
  generateCBlockPath,
  generateHexagonPath,
  generateReporterPath,
} from '@/lib/snapbot/ui/svg-paths';
import { BLOCK_METRICS } from '@/lib/snapbot/core/snapping';

interface BlockViewProps {
  block: BlockInstance;
  isSelected?: boolean;
  onMouseDown: (e: React.MouseEvent, blockId: string) => void;
  onFieldChange?: (blockId: string, fieldName: string, value: string | number | boolean) => void;
  onDelete?: (blockId: string) => void;
}

export const BlockView: React.FC<BlockViewProps> = ({
  block,
  isSelected,
  onMouseDown,
  onFieldChange,
}) => {
  const def = STANDARD_BLOCKS[block.opcode];
  if (!def) return null;

  const width = BLOCK_METRICS.blockWidth;
  const height = BLOCK_METRICS.blockHeight;

  let pathD = '';
  if (def.shape === 'hat') {
    pathD = generateHatPath(width, height);
  } else if (def.shape === 'command') {
    pathD = generateCommandPath(width, height);
  } else if (def.shape === 'c-block') {
    pathD = generateCBlockPath(width, height, 48, 24);
  } else if (def.shape === 'boolean') {
    pathD = generateHexagonPath(150, 32);
  } else if (def.shape === 'reporter') {
    pathD = generateReporterPath(140, 32);
  }

  const renderFields = () => {
    return def.fields.map((field) => {
      const val = block.fields[field.name] !== undefined ? block.fields[field.name] : field.defaultValue;

      if (field.type === 'dropdown' && field.options) {
        return (
          <select
            key={field.name}
            value={String(val)}
            onChange={(e) => onFieldChange && onFieldChange(block.id, field.name, e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            className="text-xs bg-black/40 text-white rounded px-1.5 py-0.5 border border-white/20 outline-none hover:bg-black/60 focus:border-white transition-colors cursor-pointer"
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>
        );
      }

      if (field.type === 'color') {
        return (
          <div key={field.name} className="flex items-center gap-1" onMouseDown={(e) => e.stopPropagation()}>
            <input
              type="color"
              value={String(val || '#6366F1')}
              onChange={(e) => onFieldChange && onFieldChange(block.id, field.name, e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border border-white/30 bg-transparent"
            />
          </div>
        );
      }

      return (
        <input
          key={field.name}
          type={field.type === 'number' ? 'number' : 'text'}
          value={String(val ?? '')}
          placeholder={field.placeholder || field.label || ''}
          onChange={(e) =>
            onFieldChange &&
            onFieldChange(block.id, field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)
          }
          onMouseDown={(e) => e.stopPropagation()}
          className="text-xs bg-black/40 text-white placeholder-white/50 rounded px-1.5 py-0.5 border border-white/20 outline-none hover:bg-black/60 focus:border-white w-24 text-center transition-colors"
        />
      );
    });
  };

  return (
    <g
      transform={`translate(${block.x}, ${block.y})`}
      onMouseDown={(e) => onMouseDown(e, block.id)}
      className="cursor-grab active:cursor-grabbing select-none group"
    >
      {/* Block Outline & Drop Shadow */}
      <path
        d={pathD}
        fill={def.color}
        stroke={isSelected ? '#60A5FA' : 'rgba(0,0,0,0.35)'}
        strokeWidth={isSelected ? 3 : 1.5}
        filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.25))"
        className="transition-[stroke-width,stroke] duration-150"
      />

      {/* Gloss Highlight on top edge */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Block Label & Content Inputs */}
      <foreignObject
        x={def.shape === 'hat' ? 12 : 8}
        y={def.shape === 'hat' ? 14 : 6}
        width={width - 16}
        height={height - 8}
      >
        <div className="flex items-center gap-1.5 h-full text-white text-xs font-medium tracking-tight overflow-hidden pointer-events-auto">
          <span className="truncate drop-shadow-sm select-none">{def.label.split('{')[0]}</span>
          {renderFields()}
        </div>
      </foreignObject>
    </g>
  );
};
