// ==============================================================================
// SnapBot AST to TypeScript / Discord.js v14 Compiler
// Real-time transpiler for assembled visual blocks
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BlockInstance, CompileContext, WorkspaceData } from '../core/types';
import { STANDARD_BLOCKS } from '../blocks/definitions';

export interface CompilationResult {
  code: string;
  slashCommands: string[];
  blockCount: number;
  warnings: string[];
}

export function compileWorkspace(data: WorkspaceData): CompilationResult {
  const allBlocks = data.blocks;
  const variables = new Set<string>(data.variables || []);
  const warnings: string[] = [];
  const slashCommands: string[] = [];

  const ctx: CompileContext = {
    depth: 1,
    allBlocks,
    variables,
    indent: (code: string, depth = 1): string => {
      const pad = '  '.repeat(depth);
      return code
        .split('\n')
        .map((line) => (line.trim().length > 0 ? pad + line : ''))
        .join('\n');
    },
    getFieldValue: (block: BlockInstance, fieldName: string, defaultValue: any = ''): string => {
      const val = block.fields[fieldName];
      return val !== undefined ? String(val) : String(defaultValue);
    },
    resolveInput: (block: BlockInstance, slotName: string, defaultValue = '""'): string => {
      const inputBlockId = block.inputs[slotName];
      if (!inputBlockId || !allBlocks[inputBlockId]) {
        return defaultValue;
      }
      const inputBlock = allBlocks[inputBlockId];
      const def = STANDARD_BLOCKS[inputBlock.opcode];
      if (!def) return defaultValue;
      return def.toTypeScript(ctx, inputBlock);
    },
    compileSequence: (startBlockId?: string, depth = 1): string => {
      if (!startBlockId || !allBlocks[startBlockId]) return '';
      const lines: string[] = [];
      let currentId: string | undefined = startBlockId;

      while (currentId && allBlocks[currentId]) {
        const blk: BlockInstance = allBlocks[currentId];
        const def = STANDARD_BLOCKS[blk.opcode];
        if (def) {
          const oldDepth = ctx.depth;
          ctx.depth = depth;
          const compiled = def.toTypeScript(ctx, blk);
          ctx.depth = oldDepth;
          lines.push(compiled);
        } else {
          warnings.push(`알 수 없는 블록 opcode: ${blk.opcode}`);
        }
        currentId = blk.next;
      }

      return lines.join('\n');
    },
  };

  // Find all root Hat blocks (entry points)
  const hatBlocks: BlockInstance[] = [];
  Object.values(allBlocks).forEach((blk) => {
    const def = STANDARD_BLOCKS[blk.opcode];
    if (def && def.shape === 'hat') {
      hatBlocks.push(blk);
      if (blk.opcode === 'event_interaction_create') {
        const cmdName = ctx.getFieldValue(blk, 'commandName', 'ping');
        if (cmdName && !slashCommands.includes(cmdName)) {
          slashCommands.push(cmdName);
        }
      }
    }
  });

  // Compile each hat block listener
  const compiledListeners: string[] = [];
  hatBlocks.forEach((hat) => {
    const def = STANDARD_BLOCKS[hat.opcode];
    if (def) {
      compiledListeners.push(def.toTypeScript(ctx, hat));
    }
  });

  const blockCount = Object.keys(allBlocks).length;

  // Build the complete standalone bot.ts script
  const fullCode = `/**
 * ==============================================================================
 * SnapBot Generated Discord Bot Source Code
 * Project Name: ${data.projectName || 'My Discord Bot'}
 * Generated Date: ${new Date().toISOString()}
 * Target Engine: discord.js v14 (Node.js 18+ / 20+ / 22+)
 *
 * Generated with SnapBot Studio - https://snapbot.koharu.live
 * Open Source & Zero-Base Visual Discord Bot IDE by Workshop-Koharu
 * ==============================================================================
 */

import {
  Client,
  GatewayIntentBits,
  Partials,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  REST,
  Routes,
  SlashCommandBuilder,
} from 'discord.js';

// ------------------------------------------------------------------------------
// 1. Client Initialization & Gateway Intents
// ------------------------------------------------------------------------------
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// ------------------------------------------------------------------------------
// 2. In-Memory Variables & Persistent Database Storage
// ------------------------------------------------------------------------------
const variables: Record<string, any> = {
  score: 0,
  prefix: '!',
};

class BotStorage {
  private memoryStore: Map<string, any> = new Map();

  async get(key: string): Promise<any> {
    return this.memoryStore.get(key) ?? null;
  }

  async set(key: string, value: any): Promise<void> {
    this.memoryStore.set(key, value);
    console.log(\`[SnapBot DB] Saved: \${key} = \${JSON.stringify(value)}\`);
  }
}

const database = new BotStorage();

// ------------------------------------------------------------------------------
// 3. Slash Command Registration
// ------------------------------------------------------------------------------
const slashCommandList = ${JSON.stringify(slashCommands)};

async function registerSlashCommands() {
  if (slashCommandList.length === 0) return;
  const token = process.env.DISCORD_BOT_TOKEN;
  const clientId = process.env.DISCORD_CLIENT_ID;

  if (!token || !clientId) {
    console.warn('[SnapBot] DISCORD_BOT_TOKEN 또는 DISCORD_CLIENT_ID 환경변수가 설정되지 않아 슬래시 명령어를 자동 등록할 수 없습니다.');
    return;
  }

  const commands = slashCommandList.map((name) =>
    new SlashCommandBuilder()
      .setName(name)
      .setDescription(\`SnapBot \${name} 슬래시 명령어\`)
      .toJSON()
  );

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    console.log('[SnapBot] 글로벌 슬래시 명령어 등록을 시작합니다...');
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    console.log(\`[SnapBot] \${commands.length}개의 슬래시 명령어가 성공적으로 등록되었습니다.\`);
  } catch (error) {
    console.error('[SnapBot] 슬래시 명령어 등록 중 오류 발생:', error);
  }
}

// ------------------------------------------------------------------------------
// 4. Assembled Visual Event Listeners
// ------------------------------------------------------------------------------
${compiledListeners.length > 0 ? compiledListeners.join('\n\n') : '// 아직 워크스페이스에 시작(Hat) 이벤트 블록이 없습니다.'}

// ------------------------------------------------------------------------------
// 5. Bot Startup & Login
// ------------------------------------------------------------------------------
const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
  console.error('[SnapBot Error] DISCORD_BOT_TOKEN 환경변수가 설정되지 않았습니다.');
  console.error('.env 파일에 DISCORD_BOT_TOKEN=YOUR_BOT_TOKEN 을 입력해주세요.');
  process.exit(1);
}

registerSlashCommands();
client.login(token);
`;

  return {
    code: fullCode,
    slashCommands,
    blockCount,
    warnings,
  };
}
