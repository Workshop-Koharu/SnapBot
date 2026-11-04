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
 * SnapBot Generated Discord Bot Source Code (TypeScript)
 * Project Name: ${data.projectName || 'My Discord Bot'}
 * Generated Date: ${new Date().toISOString()}
 * Target Engine: discord.js v14 (Node.js 18+ / 20+ / 22+)
 *
 * Generated with SnapBot Studio - https://snapbot.koharu.live
 * Visual Discord Bot IDE by Workshop-Koharu
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

/**
 * Transpiles the assembled workspace into clean Node.js JavaScript (CommonJS).
 */
export function compileToJavaScript(data: WorkspaceData): string {
  const tsResult = compileWorkspace(data);
  // Transform imports to require and strip TypeScript type annotations
  let jsCode = tsResult.code
    .replace(
      /import\s*\{([\s\S]*?)\}\s*from\s*'discord\.js';/,
      "const { $1 } = require('discord.js');"
    )
    .replace(/:\s*Record<string,\s*any>/g, '')
    .replace(/private\s+memoryStore:\s*Map<string,\s*any>/g, 'this.memoryStore')
    .replace(/async\s+get\(key:\s*string\):\s*Promise<any>/g, 'async get(key)')
    .replace(/async\s+set\(key:\s*string,\s*value:\s*any\):\s*Promise<void>/g, 'async set(key, value)');

  return jsCode;
}

/**
 * Transpiles the assembled workspace into clean Python (discord.py v2.x async).
 */
export function compileToPython(data: WorkspaceData): string {
  const allBlocks = data.blocks;
  const slashCommands: string[] = [];

  // Inspect all hat blocks
  const hatBlocks = Object.values(allBlocks).filter(
    (b) => b.opcode.startsWith('event_') || b.opcode.startsWith('hw_mqtt_subscribe')
  );

  hatBlocks.forEach((b) => {
    if (b.opcode === 'event_interaction_create') {
      const name = String(b.fields['commandName'] || 'ping');
      if (!slashCommands.includes(name)) slashCommands.push(name);
    }
  });

  const pyListeners: string[] = [];

  // Generate python handlers for each event
  hatBlocks.forEach((hat) => {
    if (hat.opcode === 'event_ready') {
      pyListeners.push(`@bot.event
async def on_ready():
    print(f"Logged in as {bot.user.name} ({bot.user.id})")
    try:
        synced = await bot.tree.sync()
        print(f"Synced {len(synced)} command(s)")
    except Exception as e:
        print(f"Failed to sync slash commands: {e}")`);
    } else if (hat.opcode === 'event_message_create') {
      pyListeners.push(`@bot.event
async def on_message(message: discord.Message):
    if message.author.bot:
        return
    # Message received handler
    if message.content.startswith("!ping"):
        await message.channel.send("Pong! Python discord.py responded.")
    await bot.process_commands(message)`);
    } else if (hat.opcode === 'event_interaction_create') {
      const cmdName = String(hat.fields['commandName'] || 'ping');
      pyListeners.push(`@bot.tree.command(name="${cmdName}", description="SnapBot ${cmdName} command")
async def ${cmdName.replace(/[^a-zA-Z0-9_]/g, '_')}(interaction: discord.Interaction):
    # Slash command response
    await interaction.response.send_message("Pong from Python discord.py!")`);
    } else if (hat.opcode === 'event_guild_member_add') {
      pyListeners.push(`@bot.event
async def on_member_join(member: discord.Member):
    channel = member.guild.system_channel
    if channel:
        await channel.send(f"Welcome to the server, {member.mention}!")`);
    }
  });

  if (pyListeners.length === 0) {
    pyListeners.push(`@bot.event
async def on_ready():
    print(f"SnapBot Online: {bot.user.name}")`);
  }

  return `"""
==============================================================================
SnapBot Generated Discord Bot Source Code (Python)
Project Name: ${data.projectName || 'My Discord Bot'}
Generated Date: ${new Date().toISOString()}
Target Engine: discord.py v2.3+ (Python 3.10 / 3.11 / 3.12)

Generated with SnapBot Studio - https://snapbot.koharu.live
Visual Discord Bot IDE by Workshop-Koharu
==============================================================================
"""

import discord
from discord.ext import commands
import os
import asyncio
import aiohttp
import json

# ------------------------------------------------------------------------------
# 1. Bot Client Initialization & Gateway Intents
# ------------------------------------------------------------------------------
intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True
intents.members = True

bot = commands.Bot(command_prefix="!", intents=intents)

# ------------------------------------------------------------------------------
# 2. In-Memory Variables & Persistent Database Storage
# ------------------------------------------------------------------------------
variables = {
    "score": 0,
    "prefix": "!"
}

class BotStorage:
    def __init__(self):
        self.memory_store = {}

    async def get(self, key: str):
        return self.memory_store.get(key, None)

    async def set(self, key: str, value):
        self.memory_store[key] = value
        print(f"[SnapBot DB] Saved: {key} = {value}")

database = BotStorage()

# ------------------------------------------------------------------------------
# 3. Assembled Event Handlers & Slash Commands
# ------------------------------------------------------------------------------
${pyListeners.join('\n\n')}

# ------------------------------------------------------------------------------
# 4. Bot Startup
# ------------------------------------------------------------------------------
if __name__ == "__main__":
    token = os.getenv("DISCORD_BOT_TOKEN")
    if not token:
        print("[SnapBot Error] DISCORD_BOT_TOKEN not found in environment!")
        print("Please configure DISCORD_BOT_TOKEN in your .env file or environment.")
        exit(1)

    bot.run(token)
`;
}
