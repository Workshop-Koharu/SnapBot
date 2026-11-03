// ==============================================================================
// SnapBot Magnetic Snapping Physics Engine
// Zero-dependency Pure TypeScript Vector & Distance Snapping System
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BlockInstance, SnapCandidate, SnapPoint, SnapType } from './types';
import { STANDARD_BLOCKS } from '../blocks/definitions';

export const SNAP_DISTANCE_THRESHOLD = 32; // Distance in pixels to trigger snap magnet

export const BLOCK_METRICS = {
  blockWidth: 260,
  blockHeight: 44,
  notchOffset: 20,
  notchWidth: 24,
  notchHeight: 8,
  cBlockMinHeight: 90,
  cBlockInnerIndent: 24,
  reporterHeight: 32,
  slotHeight: 28,
};

/**
 * Calculates all available snap points on a given block in canvas coordinates.
 */
export function getBlockSnapPoints(block: BlockInstance): SnapPoint[] {
  const points: SnapPoint[] = [];
  const def = STANDARD_BLOCKS[block.opcode];
  if (!def) return points;

  // 1. Hat Block: only has a bottom 'next' snap point
  if (def.shape === 'hat') {
    points.push({
      id: `${block.id}-next`,
      blockId: block.id,
      type: 'next',
      x: block.x + BLOCK_METRICS.notchOffset,
      y: block.y + BLOCK_METRICS.blockHeight,
      acceptedShape: ['command', 'c-block'],
    });
  }

  // 2. Command Block: has top 'prev' and bottom 'next'
  else if (def.shape === 'command') {
    points.push({
      id: `${block.id}-prev`,
      blockId: block.id,
      type: 'prev',
      x: block.x + BLOCK_METRICS.notchOffset,
      y: block.y,
      acceptedShape: ['command', 'c-block', 'hat'],
    });

    points.push({
      id: `${block.id}-next`,
      blockId: block.id,
      type: 'next',
      x: block.x + BLOCK_METRICS.notchOffset,
      y: block.y + BLOCK_METRICS.blockHeight,
      acceptedShape: ['command', 'c-block'],
    });
  }

  // 3. C-Block (Wrap): has top 'prev', inner 'statement', and bottom 'next'
  else if (def.shape === 'c-block') {
    points.push({
      id: `${block.id}-prev`,
      blockId: block.id,
      type: 'prev',
      x: block.x + BLOCK_METRICS.notchOffset,
      y: block.y,
      acceptedShape: ['command', 'c-block', 'hat'],
    });

    // Inner loop cavity
    points.push({
      id: `${block.id}-statement`,
      blockId: block.id,
      type: 'statement',
      x: block.x + BLOCK_METRICS.cBlockInnerIndent + BLOCK_METRICS.notchOffset,
      y: block.y + BLOCK_METRICS.blockHeight,
      acceptedShape: ['command', 'c-block'],
    });

    // Bottom continuation
    points.push({
      id: `${block.id}-next`,
      blockId: block.id,
      type: 'next',
      x: block.x + BLOCK_METRICS.notchOffset,
      y: block.y + BLOCK_METRICS.cBlockMinHeight,
      acceptedShape: ['command', 'c-block'],
    });
  }

  // 4. Slots on the block for values or booleans
  def.slots.forEach((slot, idx) => {
    if (slot.type === 'value' || slot.type === 'boolean') {
      points.push({
        id: `${block.id}-slot-${slot.name}`,
        blockId: block.id,
        type: 'input',
        slotName: slot.name,
        x: block.x + 140 + idx * 40,
        y: block.y + 12,
        acceptedShape: slot.type === 'boolean' ? 'boolean' : ['reporter', 'boolean'],
      });
    }
  });

  return points;
}

/**
 * Finds the nearest magnetic snap candidate for a currently dragging block.
 */
export function findBestSnapCandidate(
  draggingBlock: BlockInstance,
  allBlocks: Record<string, BlockInstance>,
  threshold: number = SNAP_DISTANCE_THRESHOLD
): SnapCandidate | null {
  const draggingDef = STANDARD_BLOCKS[draggingBlock.opcode];
  if (!draggingDef) return null;

  let bestCandidate: SnapCandidate | null = null;
  let minDistance = threshold;

  // Connector point of the dragging block
  let dragAnchorX = draggingBlock.x;
  let dragAnchorY = draggingBlock.y;

  if (draggingDef.shape === 'command' || draggingDef.shape === 'c-block') {
    dragAnchorX = draggingBlock.x + BLOCK_METRICS.notchOffset;
    dragAnchorY = draggingBlock.y;
  } else if (draggingDef.shape === 'reporter' || draggingDef.shape === 'boolean') {
    dragAnchorX = draggingBlock.x;
    dragAnchorY = draggingBlock.y + 16;
  }

  Object.values(allBlocks).forEach((targetBlock) => {
    // Cannot snap to self or connected descendants
    if (targetBlock.id === draggingBlock.id) return;

    const snapPoints = getBlockSnapPoints(targetBlock);

    snapPoints.forEach((point) => {
      // Check shape compatibility
      if (point.acceptedShape) {
        const accepted = Array.isArray(point.acceptedShape)
          ? point.acceptedShape.includes(draggingDef.shape)
          : point.acceptedShape === draggingDef.shape;
        if (!accepted) return;
      }

      // Calculate 2D Euclidean distance
      const dx = dragAnchorX - point.x;
      const dy = dragAnchorY - point.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < minDistance) {
        minDistance = dist;
        bestCandidate = {
          point,
          distance: dist,
          targetBlockId: targetBlock.id,
        };
      }
    });
  });

  return bestCandidate;
}
