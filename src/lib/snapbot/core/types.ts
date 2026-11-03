// ==============================================================================
// SnapBot Core Types & Models
// Zero-dependency Visual Block Coding Engine for Discord Bots
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

export type BlockShape = 'hat' | 'command' | 'c-block' | 'reporter' | 'boolean';

export type BlockCategory =
  | 'events'
  | 'messages'
  | 'embeds'
  | 'control'
  | 'variables'
  | 'moderation';

export type FieldInputType =
  | 'text'
  | 'number'
  | 'dropdown'
  | 'color'
  | 'variable'
  | 'channel'
  | 'role';

export interface FieldDefinition {
  name: string;
  type: FieldInputType;
  label?: string;
  defaultValue?: string | number | boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
}

export interface InputSlotDefinition {
  name: string;
  type: 'value' | 'boolean' | 'statement' | 'statementElse';
  label?: string;
}

export interface BlockDefinition {
  opcode: string;
  category: BlockCategory;
  shape: BlockShape;
  label: string; // e.g. "when bot is ready", "send message {content} to {channel}"
  description: string;
  color: string;
  fields: FieldDefinition[];
  slots: InputSlotDefinition[];
  // Compilation logic callback
  toTypeScript: (ctx: CompileContext, block: BlockInstance) => string;
}

export interface CompileContext {
  indent: (code: string, depth?: number) => string;
  depth: number;
  resolveInput: (block: BlockInstance, slotName: string, defaultValue?: string) => string;
  getFieldValue: (block: BlockInstance, fieldName: string, defaultValue?: any) => string;
  compileSequence: (startBlockId?: string, depth?: number) => string;
  allBlocks: Record<string, BlockInstance>;
  variables: Set<string>;
}

export interface BlockInstance {
  id: string;
  opcode: string;
  category: BlockCategory;
  shape: BlockShape;
  x: number;
  y: number;
  // Field values entered directly into input boxes/dropdowns
  fields: Record<string, string | number | boolean>;
  // Connected value/boolean reporter blocks inside input slots
  inputs: Record<string, string>; // slotName -> blockId
  // Next connected command block (below)
  next?: string;
  // Previous connected command/hat block (above)
  prev?: string;
  // Parent block if this block is plugged into a slot
  parent?: string;
  // Child blocks inside C-block body
  statement?: string;
  // Child blocks inside C-block else body
  statementElse?: string;
  // For UI state
  isCollapsed?: boolean;
}

export type SnapType =
  | 'next'          // snapping below a command or hat
  | 'prev'          // snapping above a command
  | 'statement'     // inside a C-block body
  | 'statementElse' // inside a C-block else body
  | 'input';        // inside a value or boolean slot

export interface SnapPoint {
  id: string;
  blockId: string;
  type: SnapType;
  x: number;
  y: number;
  slotName?: string;
  acceptedShape?: BlockShape | BlockShape[];
}

export interface SnapCandidate {
  point: SnapPoint;
  distance: number;
  targetBlockId: string;
}

export interface WorkspaceData {
  version: number;
  projectName: string;
  blocks: Record<string, BlockInstance>;
  variables: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryMeta {
  id: BlockCategory;
  name: string;
  color: string;
  bgClass: string;
  borderClass: string;
  iconName: string;
  description: string;
}

export const CATEGORY_DEFINITIONS: Record<BlockCategory, CategoryMeta> = {
  events: {
    id: 'events',
    name: '이벤트 (Events)',
    color: '#F59E0B',
    bgClass: 'bg-amber-500',
    borderClass: 'border-amber-400',
    iconName: 'Zap',
    description: '봇 시작, 메시지 수신, 슬래시 명령어, 버튼 클릭 등 트리거 블록',
  },
  messages: {
    id: 'messages',
    name: '메시지 & 응답',
    color: '#3B82F6',
    bgClass: 'bg-blue-500',
    borderClass: 'border-blue-400',
    iconName: 'MessageSquare',
    description: '채널 메시지 전송, 답장, 에페메럴 응답, 메시지 수정 및 삭제',
  },
  embeds: {
    id: 'embeds',
    name: '임베드 & UI 컴포넌트',
    color: '#8B5CF6',
    bgClass: 'bg-purple-500',
    borderClass: 'border-purple-400',
    iconName: 'Layout',
    description: '세련된 Discord 임베드 박스, 인터랙티브 버튼, 선택 메뉴 구성',
  },
  control: {
    id: 'control',
    name: '흐름 및 논리 제어',
    color: '#10B981',
    bgClass: 'bg-emerald-500',
    borderClass: 'border-emerald-400',
    iconName: 'GitFork',
    description: '만약(if/else), N번 반복, 딜레이 대기, 비교 연산 및 논리 게이트',
  },
  variables: {
    id: 'variables',
    name: '변수 & 데이터',
    color: '#EC4899',
    bgClass: 'bg-pink-500',
    borderClass: 'border-pink-400',
    iconName: 'Database',
    description: '변수 저장/연산, 유저 정보, 채널 정보, 메시지 내용, 영구 DB',
  },
  moderation: {
    id: 'moderation',
    name: '서버 관리 (Mod)',
    color: '#EF4444',
    bgClass: 'bg-red-500',
    borderClass: 'border-red-400',
    iconName: 'ShieldAlert',
    description: '유저 추방, 차단, 타임아웃, 역할 부여, 메시지 일괄 청소',
  },
};
