// ==============================================================================
// SnapBot Workspace State & History Manager
// Undo / Redo / Serialization / Block Tree Manipulation
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BlockInstance, SnapCandidate, WorkspaceData } from './types';
import { STANDARD_BLOCKS } from '../blocks/definitions';
import { BLOCK_METRICS } from './snapping';

export class WorkspaceManager {
  private blocks: Record<string, BlockInstance> = {};
  private variables: Set<string> = new Set(['score', 'prefix']);
  private projectName: string = 'My Discord Bot';
  private undoStack: string[] = [];
  private redoStack: string[] = [];
  private maxHistory: number = 30;

  constructor(initialData?: WorkspaceData) {
    if (initialData) {
      this.loadFromData(initialData);
    } else {
      this.initDefaultWorkspace();
    }
  }

  private initDefaultWorkspace() {
    // Set up a friendly starter template: When ready -> send log / status
    const readyBlock: BlockInstance = {
      id: 'block-ready-starter',
      opcode: 'event_ready',
      category: 'events',
      shape: 'hat',
      x: 80,
      y: 60,
      fields: {},
      inputs: {},
      next: 'block-msg-starter',
    };

    const msgBlock: BlockInstance = {
      id: 'block-msg-starter',
      opcode: 'action_send_message',
      category: 'messages',
      shape: 'command',
      x: 80,
      y: 104,
      fields: {
        content: 'SnapBot 봇이 준비되었습니다. 슬래시 명령어를 사용해 보세요.',
      },
      inputs: {},
      prev: 'block-ready-starter',
    };

    const cmdBlock: BlockInstance = {
      id: 'block-cmd-starter',
      opcode: 'event_interaction_create',
      category: 'events',
      shape: 'hat',
      x: 420,
      y: 60,
      fields: {
        commandName: 'ping',
      },
      inputs: {},
      next: 'block-reply-starter',
    };

    const replyBlock: BlockInstance = {
      id: 'block-reply-starter',
      opcode: 'action_reply_message',
      category: 'messages',
      shape: 'command',
      x: 420,
      y: 104,
      fields: {
        content: 'Pong! SnapBot이 0.05초만에 응답했습니다.',
      },
      inputs: {},
      prev: 'block-cmd-starter',
    };

    this.blocks = {
      [readyBlock.id]: readyBlock,
      [msgBlock.id]: msgBlock,
      [cmdBlock.id]: cmdBlock,
      [replyBlock.id]: replyBlock,
    };
    this.recordState();
  }

  // ----------------------------------------------------------------------------
  // History & Undo / Redo
  // ----------------------------------------------------------------------------
  private recordState() {
    const serialized = JSON.stringify(this.exportData());
    this.undoStack.push(serialized);
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    this.redoStack = [];
  }

  public undo(): boolean {
    if (this.undoStack.length <= 1) return false;
    const current = this.undoStack.pop()!;
    this.redoStack.push(current);
    const prev = this.undoStack[this.undoStack.length - 1];
    if (prev) {
      const data: WorkspaceData = JSON.parse(prev);
      this.blocks = data.blocks;
      this.variables = new Set(data.variables);
      return true;
    }
    return false;
  }

  public redo(): boolean {
    if (this.redoStack.length === 0) return false;
    const next = this.redoStack.pop()!;
    this.undoStack.push(next);
    const data: WorkspaceData = JSON.parse(next);
    this.blocks = data.blocks;
    this.variables = new Set(data.variables);
    return true;
  }

  // ----------------------------------------------------------------------------
  // Block Operations
  // ----------------------------------------------------------------------------
  public getBlocks(): Record<string, BlockInstance> {
    return this.blocks;
  }

  public getBlock(id: string): BlockInstance | undefined {
    return this.blocks[id];
  }

  public addBlock(opcode: string, x: number, y: number): BlockInstance | null {
    const def = STANDARD_BLOCKS[opcode];
    if (!def) return null;

    const defaultFields: Record<string, string | number | boolean> = {};
    def.fields.forEach((f) => {
      if (f.defaultValue !== undefined) {
        defaultFields[f.name] = f.defaultValue;
      }
    });

    const newId = `block_${Math.random().toString(36).substring(2, 9)}`;
    const newBlock: BlockInstance = {
      id: newId,
      opcode: def.opcode,
      category: def.category,
      shape: def.shape,
      x: Math.round(x),
      y: Math.round(y),
      fields: defaultFields,
      inputs: {},
    };

    this.blocks[newId] = newBlock;
    this.recordState();
    return newBlock;
  }

  public removeBlock(blockId: string) {
    const block = this.blocks[blockId];
    if (!block) return;

    // Disconnect from parent/prev
    if (block.prev && this.blocks[block.prev]) {
      this.blocks[block.prev].next = block.next;
    }
    if (block.parent && this.blocks[block.parent]) {
      const parent = this.blocks[block.parent];
      // Check if it was an input slot
      Object.keys(parent.inputs).forEach((k) => {
        if (parent.inputs[k] === blockId) delete parent.inputs[k];
      });
      if (parent.statement === blockId) parent.statement = block.next;
      if (parent.statementElse === blockId) parent.statementElse = block.next;
    }
    if (block.next && this.blocks[block.next]) {
      this.blocks[block.next].prev = block.prev;
    }

    delete this.blocks[blockId];
    this.recordState();
  }

  public updateBlockField(blockId: string, fieldName: string, value: string | number | boolean) {
    const block = this.blocks[blockId];
    if (block) {
      block.fields[fieldName] = value;
      this.recordState();
    }
  }

  public moveBlock(blockId: string, dx: number, dy: number) {
    const block = this.blocks[blockId];
    if (!block) return;

    block.x += dx;
    block.y += dy;

    // Move connected sequence together
    let currentNext = block.next;
    while (currentNext && this.blocks[currentNext]) {
      const nextBlock: BlockInstance = this.blocks[currentNext];
      nextBlock.x += dx;
      nextBlock.y += dy;
      currentNext = nextBlock.next;
    }

    // Move connected C-block statement body
    if (block.statement && this.blocks[block.statement]) {
      this.moveSubtree(block.statement, dx, dy);
    }
    if (block.statementElse && this.blocks[block.statementElse]) {
      this.moveSubtree(block.statementElse, dx, dy);
    }
  }

  private moveSubtree(startId: string, dx: number, dy: number) {
    let curr: string | undefined = startId;
    while (curr && this.blocks[curr]) {
      const b: BlockInstance = this.blocks[curr];
      b.x += dx;
      b.y += dy;
      if (b.statement && this.blocks[b.statement]) {
        this.moveSubtree(b.statement, dx, dy);
      }
      curr = b.next;
    }
  }

  public connectBlock(draggingId: string, candidate: SnapCandidate) {
    const dragging: BlockInstance | undefined = this.blocks[draggingId];
    const target: BlockInstance | undefined = this.blocks[candidate.targetBlockId];
    if (!dragging || !target) return;

    const { point } = candidate;

    if (point.type === 'next') {
      // Connect as target.next
      const oldNext = target.next;
      target.next = dragging.id;
      dragging.prev = target.id;
      dragging.x = target.x;
      dragging.y = target.y + (target.shape === 'c-block' ? BLOCK_METRICS.cBlockMinHeight : BLOCK_METRICS.blockHeight);

      // If dragging has a tail, splice oldNext to dragging's tail
      let tail: BlockInstance = dragging;
      while (tail.next && this.blocks[tail.next]) {
        tail = this.blocks[tail.next];
      }
      if (oldNext && this.blocks[oldNext]) {
        tail.next = oldNext;
        this.blocks[oldNext].prev = tail.id;
      }
    } else if (point.type === 'statement') {
      // Inside C-block body
      target.statement = dragging.id;
      dragging.parent = target.id;
      dragging.x = target.x + BLOCK_METRICS.cBlockInnerIndent;
      dragging.y = target.y + BLOCK_METRICS.blockHeight;
    } else if (point.type === 'input' && point.slotName) {
      // Inside input slot
      target.inputs[point.slotName] = dragging.id;
      dragging.parent = target.id;
      dragging.x = point.x;
      dragging.y = point.y;
    }

    this.recordState();
  }

  public disconnectBlock(blockId: string) {
    const block = this.blocks[blockId];
    if (!block) return;

    if (block.prev && this.blocks[block.prev]) {
      this.blocks[block.prev].next = undefined;
      block.prev = undefined;
    }
    if (block.parent && this.blocks[block.parent]) {
      const parent = this.blocks[block.parent];
      Object.keys(parent.inputs).forEach((k) => {
        if (parent.inputs[k] === blockId) delete parent.inputs[k];
      });
      if (parent.statement === blockId) parent.statement = undefined;
      if (parent.statementElse === blockId) parent.statementElse = undefined;
      block.parent = undefined;
    }
    this.recordState();
  }

  public clearAllBlocks() {
    this.blocks = {};
    this.recordState();
  }

  public duplicateBlock(blockId: string): BlockInstance | null {
    const original = this.blocks[blockId];
    if (!original) return null;

    const newId = `block_${Math.random().toString(36).substring(2, 9)}`;
    const duplicated: BlockInstance = {
      ...original,
      id: newId,
      x: original.x + 30,
      y: original.y + 30,
      fields: { ...original.fields },
      inputs: { ...original.inputs },
      prev: undefined,
      next: undefined,
      parent: undefined,
    };

    this.blocks[newId] = duplicated;
    this.recordState();
    return duplicated;
  }

  public cleanUpBlocks() {
    const roots: BlockInstance[] = Object.values(this.blocks).filter(
      (b) => !b.prev && !b.parent
    );

    let startX = 60;
    let startY = 60;

    roots.forEach((root, idx) => {
      const dx = startX - root.x;
      const dy = startY - root.y;
      this.moveBlock(root.id, dx, dy);

      // Estimate height of this chain
      let count = 0;
      let curr: string | undefined = root.id;
      while (curr && this.blocks[curr]) {
        count++;
        curr = this.blocks[curr].next;
      }
      startY += count * 52 + 30;
      if (startY > 600) {
        startY = 60;
        startX += 360;
      }
    });

    this.recordState();
  }

  // ----------------------------------------------------------------------------
  // Serialization
  // ----------------------------------------------------------------------------
  public exportData(): WorkspaceData {
    return {
      version: 1,
      projectName: this.projectName,
      blocks: this.blocks,
      variables: Array.from(this.variables),
      updatedAt: new Date().toISOString(),
    };
  }

  public loadFromData(data: WorkspaceData) {
    this.projectName = data.projectName || 'My Discord Bot';
    this.blocks = data.blocks || {};
    this.variables = new Set(data.variables || []);
    this.undoStack = [JSON.stringify(data)];
    this.redoStack = [];
  }

  public setProjectName(name: string) {
    this.projectName = name;
    this.recordState();
  }

  public getProjectName(): string {
    return this.projectName;
  }
}
