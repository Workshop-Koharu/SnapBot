'use client';

// ==============================================================================
// SnapBot Visual Block Component (SVG Rendered)
// Scratch & Entry style visual block on canvas with clean input bubbles
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

interface BlockViewProps {
  block: BlockInstance;
  isSelected?: boolean;
  onMouseDown: (e: React.MouseEvent, blockId: string) => void;
  onTouchStart?: (e: React.TouchEvent, blockId: string) => void;
  onContextMenu?: (e: React.MouseEvent, blockId: string) => void;
  onFieldChange?: (blockId: string, fieldName: string, value: string | number | boolean) => void;
  onDelete?: (blockId: string) => void;
}

export const BlockView: React.FC<BlockViewProps> = ({
  block,
  isSelected,
  onMouseDown,
  onTouchStart,
  onContextMenu,
  onFieldChange,
}) => {
  const def = STANDARD_BLOCKS[block.opcode];
  if (!def) return null;

  // Dynamically calculate block width based on content
  const labelLength = def.label.length;
  const fieldCount = def.fields.length;
  const estimatedContentWidth = Math.max(250, labelLength * 12 + fieldCount * 70);
  const width = Math.min(estimatedContentWidth, 420);
  const height = def.shape === 'hat' ? 44 : def.shape === 'c-block' ? 84 : 40;

  let pathD = '';
  if (def.shape === 'hat') {
    pathD = generateHatPath(width, 44);
  } else if (def.shape === 'command') {
    pathD = generateCommandPath(width, 40);
  } else if (def.shape === 'c-block') {
    pathD = generateCBlockPath(width, 40, 44, 20);
  } else if (def.shape === 'boolean') {
    pathD = generateHexagonPath(Math.max(width, 160), 34);
  } else if (def.shape === 'reporter') {
    pathD = generateReporterPath(Math.max(width, 150), 34);
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
            className="text-[11px] font-bold bg-white text-slate-800 rounded-full px-2.5 py-0.5 border-none outline-none shadow-sm cursor-pointer hover:bg-slate-100 transition-colors"
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
          <div
            key={field.name}
            className="flex items-center rounded-full bg-white p-0.5 shadow-sm"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <input
              type="color"
              value={String(val || '#6366F1')}
              onChange={(e) => onFieldChange && onFieldChange(block.id, field.name, e.target.value)}
              className="w-5 h-5 rounded-full cursor-pointer border-0 bg-transparent"
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
          className="text-[11px] font-semibold bg-white text-slate-900 placeholder-slate-400 rounded-full px-2.5 py-0.5 border-none outline-none shadow-inner w-24 text-center focus:ring-2 focus:ring-indigo-400 transition-all"
        />
      );
    });
  };

  const cleanLabel = def.label.split('{')[0].trim();

  return (
    <g
      transform={`translate(${block.x}, ${block.y})`}
      onMouseDown={(e) => onMouseDown(e, block.id)}
      onTouchStart={(e) => {
        if (onTouchStart) onTouchStart(e, block.id);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onContextMenu) onContextMenu(e, block.id);
      }}
      className="cursor-grab active:cursor-grabbing select-none group"
    >
      {/* Block Body */}
      <path
        d={pathD}
        fill={def.color}
        stroke={isSelected ? '#FFFFFF' : 'rgba(0,0,0,0.22)'}
        strokeWidth={isSelected ? 2.5 : 1.2}
        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.2))"
        className="transition-[stroke-width,stroke] duration-150"
      />

      {/* Top Gloss Highlight */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Label & Inputs */}
      <foreignObject
        x={def.shape === 'hat' ? 14 : def.shape === 'boolean' ? 14 : 10}
        y={def.shape === 'hat' ? 13 : def.shape === 'c-block' ? 6 : 4}
        width={width - 20}
        height={32}
      >
        <div className="flex items-center gap-2 h-full text-white text-xs font-semibold tracking-tight overflow-hidden pointer-events-auto">
          <span className="truncate drop-shadow-sm select-none">{cleanLabel}</span>
          {renderFields()}
        </div>
      </foreignObject>
    </g>
  );
};
