// ==============================================================================
// SnapBot Pure SVG Block Path Geometry Engine
// Zero-dependency mathematical SVG path generator for Scratch & Entry styled blocks
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BLOCK_METRICS } from '../core/snapping';

/**
 * Generates an SVG path for a Hat Block (Event starter)
 * Curved entry hat at top, bottom connector notch.
 */
export function generateHatPath(width = BLOCK_METRICS.blockWidth, height = BLOCK_METRICS.blockHeight): string {
  const r = 8;
  const notchX = BLOCK_METRICS.notchOffset;
  const notchW = BLOCK_METRICS.notchWidth;
  const notchH = BLOCK_METRICS.notchHeight;

  return [
    `M 0 16`,
    // Curved hat arch (Scratch style)
    `C 12 0, 48 0, 72 16`,
    `L ${width - r} 16`,
    `A ${r} ${r} 0 0 1 ${width} ${16 + r}`,
    `L ${width} ${height - r}`,
    `A ${r} ${r} 0 0 1 ${width - r} ${height}`,
    // Bottom edge with connector notch
    `L ${notchX + notchW} ${height}`,
    `L ${notchX + notchW - 4} ${height + notchH}`,
    `L ${notchX + 4} ${height + notchH}`,
    `L ${notchX} ${height}`,
    `L ${r} ${height}`,
    `A ${r} ${r} 0 0 1 0 ${height - r}`,
    `Z`,
  ].join(' ');
}

/**
 * Generates an SVG path for a Command Block (Regular statement block)
 * Top connector indentation, bottom connector notch.
 */
export function generateCommandPath(width = BLOCK_METRICS.blockWidth, height = BLOCK_METRICS.blockHeight): string {
  const r = 6;
  const notchX = BLOCK_METRICS.notchOffset;
  const notchW = BLOCK_METRICS.notchWidth;
  const notchH = BLOCK_METRICS.notchHeight;

  return [
    `M 0 ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    // Top edge with indentation for previous block's notch
    `L ${notchX} 0`,
    `L ${notchX + 4} ${notchH}`,
    `L ${notchX + notchW - 4} ${notchH}`,
    `L ${notchX + notchW} 0`,
    `L ${width - r} 0`,
    `A ${r} ${r} 0 0 1 ${width} ${r}`,
    // Right edge
    `L ${width} ${height - r}`,
    `A ${r} ${r} 0 0 1 ${width - r} ${height}`,
    // Bottom edge with connector notch
    `L ${notchX + notchW} ${height}`,
    `L ${notchX + notchW - 4} ${height + notchH}`,
    `L ${notchX + 4} ${height + notchH}`,
    `L ${notchX} ${height}`,
    `L ${r} ${height}`,
    `A ${r} ${r} 0 0 1 0 ${height - r}`,
    `Z`,
  ].join(' ');
}

/**
 * Generates an SVG path for a C-Block (Wrap / Loop / If statement)
 * Top header with indentation, left spine, inner cavity, and bottom return.
 */
export function generateCBlockPath(
  width = BLOCK_METRICS.blockWidth,
  headerHeight = BLOCK_METRICS.blockHeight,
  innerCavityHeight = 44,
  footerHeight = 24
): string {
  const r = 6;
  const notchX = BLOCK_METRICS.notchOffset;
  const notchW = BLOCK_METRICS.notchWidth;
  const notchH = BLOCK_METRICS.notchHeight;
  const spineW = BLOCK_METRICS.cBlockInnerIndent;
  const totalH = headerHeight + innerCavityHeight + footerHeight;

  return [
    // Top edge & notch
    `M 0 ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    `L ${notchX} 0`,
    `L ${notchX + 4} ${notchH}`,
    `L ${notchX + notchW - 4} ${notchH}`,
    `L ${notchX + notchW} 0`,
    `L ${width - r} 0`,
    `A ${r} ${r} 0 0 1 ${width} ${r}`,
    // Right of header
    `L ${width} ${headerHeight - r}`,
    `A ${r} ${r} 0 0 1 ${width - r} ${headerHeight}`,
    // Inner loop cavity top (with notch for first child)
    `L ${spineW + notchX + notchW} ${headerHeight}`,
    `L ${spineW + notchX + notchW - 4} ${headerHeight + notchH}`,
    `L ${spineW + notchX + 4} ${headerHeight + notchH}`,
    `L ${spineW + notchX} ${headerHeight}`,
    `L ${spineW + r} ${headerHeight}`,
    `A ${r} ${r} 0 0 0 ${spineW} ${headerHeight + r}`,
    // Inner spine
    `L ${spineW} ${headerHeight + innerCavityHeight - r}`,
    `A ${r} ${r} 0 0 0 ${spineW + r} ${headerHeight + innerCavityHeight}`,
    // Inner cavity bottom (with indentation)
    `L ${spineW + notchX} ${headerHeight + innerCavityHeight}`,
    `L ${spineW + notchX + 4} ${headerHeight + innerCavityHeight + notchH}`,
    `L ${spineW + notchX + notchW - 4} ${headerHeight + innerCavityHeight + notchH}`,
    `L ${spineW + notchX + notchW} ${headerHeight + innerCavityHeight}`,
    `L ${width - r} ${headerHeight + innerCavityHeight}`,
    `A ${r} ${r} 0 0 1 ${width} ${headerHeight + innerCavityHeight + r}`,
    // Bottom outer right
    `L ${width} ${totalH - r}`,
    `A ${r} ${r} 0 0 1 ${width - r} ${totalH}`,
    // Bottom edge with notch
    `L ${notchX + notchW} ${totalH}`,
    `L ${notchX + notchW - 4} ${totalH + notchH}`,
    `L ${notchX + 4} ${totalH + notchH}`,
    `L ${notchX} ${totalH}`,
    `L ${r} ${totalH}`,
    `A ${r} ${r} 0 0 1 0 ${totalH - r}`,
    `Z`,
  ].join(' ');
}

/**
 * Generates an SVG path for a Hexagonal Boolean Reporter (True/False condition)
 * Pointed left and right triangles (Scratch / Entry condition block).
 */
export function generateHexagonPath(width = 140, height = 32): string {
  const pointW = 12;
  const halfH = height / 2;

  return [
    `M 0 ${halfH}`,
    `L ${pointW} 0`,
    `L ${width - pointW} 0`,
    `L ${width} ${halfH}`,
    `L ${width - pointW} ${height}`,
    `L ${pointW} ${height}`,
    `Z`,
  ].join(' ');
}

/**
 * Generates an SVG path for a Rounded Value Reporter (Variables, numbers, strings)
 * Rounded capsule / pill shape.
 */
export function generateReporterPath(width = 130, height = 32): string {
  const r = height / 2;

  return [
    `M ${r} 0`,
    `L ${width - r} 0`,
    `A ${r} ${r} 0 0 1 ${width} ${r}`,
    `L ${width} ${height - r}`,
    `A ${r} ${r} 0 0 1 ${width - r} ${height}`,
    `L ${r} ${height}`,
    `A ${r} ${r} 0 0 1 0 ${height - r}`,
    `L 0 ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    `Z`,
  ].join(' ');
}

