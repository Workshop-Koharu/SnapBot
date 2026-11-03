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
  | 'operators'
  | 'variables'
  | 'discord_data'
  | 'moderation'
  | 'database';

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
  label: string; // e.g. "봇이 준비되었을 때", "채널에 메시지 전송 {content}"
  description: string;
  color: string;
  fields: FieldDefinition[];
  slots: InputSlotDefinition[];
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
  fields: Record<string, string | number | boolean>;
  inputs: Record<string, string>;
  next?: string;
  prev?: string;
  parent?: string;
  statement?: string;
  statementElse?: string;
  isCollapsed?: boolean;
}

export type SnapType =
  | 'next'
  | 'prev'
  | 'statement'
  | 'statementElse'
  | 'input';

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
  iconName: string;
  description: string;
}

export const CATEGORY_DEFINITIONS: Record<BlockCategory, CategoryMeta> = {
  events: {
    id: 'events',
    name: '이벤트',
    color: '#EAB308',
    bgClass: 'bg-amber-500',
    iconName: 'Zap',
    description: '봇 시작, 메시지 수신, 슬래시 명령어, 상호작용 등 트리거 시작 블록',
  },
  messages: {
    id: 'messages',
    name: '메시지 & 반응',
    color: '#3B82F6',
    bgClass: 'bg-blue-500',
    iconName: 'MessageSquare',
    description: '채널 메시지 전송, 답장, 수정, 삭제, 리액션 이모지 반응, 스레드',
  },
  embeds: {
    id: 'embeds',
    name: '임베드 & UI',
    color: '#8B5CF6',
    bgClass: 'bg-purple-500',
    iconName: 'Layout',
    description: '리치 임베드 카드, 인터랙티브 버튼, 선택 드롭다운 메뉴, 모달 팝업',
  },
  control: {
    id: 'control',
    name: '흐름 제어 & 반복',
    color: '#10B981',
    bgClass: 'bg-emerald-500',
    iconName: 'GitFork',
    description: '만약(if/else), N번 반복, 조건 반복(while), 리스트 순회, 대기, 에러 처리',
  },
  operators: {
    id: 'operators',
    name: '연산 & 논리',
    color: '#14B8A6',
    bgClass: 'bg-teal-500',
    iconName: 'Binary',
    description: '사칙연산, 비교 연산자(=, !=, >, <), 논리곱(AND), 논리합(OR), 문자열 조작',
  },
  variables: {
    id: 'variables',
    name: '변수 & 리스트',
    color: '#F97316',
    bgClass: 'bg-orange-500',
    iconName: 'Variable',
    description: '변수 저장/연산, 리스트(배열) 생성/추가/삭제, JSON 데이터 처리',
  },
  discord_data: {
    id: 'discord_data',
    name: '디스코드 정보',
    color: '#06B6D4',
    bgClass: 'bg-cyan-500',
    iconName: 'Info',
    description: '메시지 작성자, 채널, 서버, 슬래시 명령어 옵션값 조회',
  },
  moderation: {
    id: 'moderation',
    name: '서버 관리 & 보안',
    color: '#EF4444',
    bgClass: 'bg-rose-500',
    iconName: 'ShieldAlert',
    description: '유저 추방, 차단(밴), 타임아웃, 역할 관리, 채널 관리, 일괄 청소',
  },
  database: {
    id: 'database',
    name: '영구 DB 저장소',
    color: '#EC4899',
    bgClass: 'bg-pink-500',
    iconName: 'Database',
    description: '봇 재부팅 후에도 유지되는 키-값 영구 데이터베이스 저장 및 조회',
  },
};
