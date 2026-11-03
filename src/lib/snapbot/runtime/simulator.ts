// ==============================================================================
// SnapBot In-Browser Discord Simulator Engine
// Real-time sandboxed virtual Discord environment
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BlockInstance, WorkspaceData } from '../core/types';
import { STANDARD_BLOCKS } from '../blocks/definitions';

export interface SimMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  embed?: SimEmbed;
  buttons?: SimButton[];
}

export interface SimEmbed {
  title?: string;
  description?: string;
  color?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: string;
}

export interface SimButton {
  customId: string;
  label: string;
  style: 'Primary' | 'Success' | 'Danger' | 'Secondary';
}

export interface SimLog {
  id: string;
  type: 'info' | 'warn' | 'error' | 'event';
  message: string;
  timestamp: string;
}

export class BotSimulator {
  private workspace: WorkspaceData;
  private messages: SimMessage[] = [];
  private logs: SimLog[] = [];
  private isBotReady = false;
  private memoryVars: Record<string, any> = {};
  private listeners: (() => void)[] = [];

  constructor(workspace: WorkspaceData) {
    this.workspace = workspace;
    this.init();
  }

  public updateWorkspace(workspace: WorkspaceData) {
    this.workspace = workspace;
    this.log('event', '워크스페이스 블록 변경 사항이 시뮬레이터에 반영되었습니다.');
  }

  public subscribe(fn: () => void): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public init() {
    this.messages = [];
    this.logs = [];
    this.memoryVars = {};
    this.isBotReady = false;

    this.log('info', '디스코드 게이트웨이에 연결 중...');
    setTimeout(() => {
      this.isBotReady = true;
      this.log('info', '봇 세션이 인증되었습니다 (SnapBot Simulator v1.0)');

      // Execute 'event_ready' blocks
      this.triggerEvent('event_ready', {});
      this.notify();
    }, 400);
  }

  public getMessages(): SimMessage[] {
    return this.messages;
  }

  public getLogs(): SimLog[] {
    return this.logs;
  }

  public isReady(): boolean {
    return this.isBotReady;
  }

  public clearChat() {
    this.messages = [];
    this.notify();
  }

  private log(type: 'info' | 'warn' | 'error' | 'event', message: string) {
    const timestamp = new Date().toLocaleTimeString('ko-KR');
    this.logs.unshift({
      id: Math.random().toString(36).substring(2, 9),
      type,
      message,
      timestamp,
    });
    if (this.logs.length > 50) this.logs.pop();
  }

  /**
   * User sends a message in the simulator chat.
   */
  public async sendUserMessage(content: string) {
    if (!content.trim()) return;

    const userMsg: SimMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      authorName: '테스트 유저',
      content,
      timestamp: new Date().toLocaleTimeString('ko-KR'),
    };
    this.messages.push(userMsg);
    this.notify();

    // Check if it's a slash command like `/ping`
    if (content.startsWith('/')) {
      const parts = content.slice(1).trim().split(/\s+/);
      const cmdName = parts[0];
      this.log('event', `슬래시 명령어 감지: /${cmdName}`);
      await this.triggerSlashCommand(cmdName);
    } else {
      this.log('event', `메시지 수신: "${content}"`);
      await this.triggerEvent('event_message_create', { content, authorName: '테스트 유저' });
    }
  }

  /**
   * User clicks an interactive button.
   */
  public async clickButton(customId: string) {
    this.log('event', `버튼 클릭 발생 [ID: ${customId}]`);
    await this.triggerEvent('event_button_click', { customId });
  }

  private async triggerSlashCommand(commandName: string) {
    const hat = Object.values(this.workspace.blocks).find(
      (b) => b.opcode === 'event_interaction_create' && String(b.fields.commandName) === commandName
    );

    if (hat && hat.next) {
      await this.executeSequence(hat.next, { commandName, authorName: '테스트 유저' });
    } else {
      this.messages.push({
        id: Math.random().toString(36).substring(2, 9),
        sender: 'system',
        authorName: '시스템 알림',
        content: `⚠️ 슬래시 명령어 '/${commandName}'에 연결된 [슬래시 명령어 입력 시] 블록이 없습니다.`,
        timestamp: new Date().toLocaleTimeString('ko-KR'),
      });
      this.notify();
    }
  }

  private async triggerEvent(opcode: string, context: Record<string, any>) {
    const matchingHats = Object.values(this.workspace.blocks).filter((b) => {
      if (b.opcode !== opcode) return false;
      if (opcode === 'event_button_click' && context.customId) {
        return String(b.fields.customId) === context.customId;
      }
      return true;
    });

    for (const hat of matchingHats) {
      if (hat.next) {
        await this.executeSequence(hat.next, context);
      }
    }
  }

  private async executeSequence(startBlockId: string, context: Record<string, any>) {
    let currId: string | undefined = startBlockId;
    let pendingEmbed: SimEmbed | null = null;

    while (currId && this.workspace.blocks[currId]) {
      const block: BlockInstance = this.workspace.blocks[currId];
      const def = STANDARD_BLOCKS[block.opcode];

      if (!def) {
        currId = block.next;
        continue;
      }

      switch (block.opcode) {
        case 'action_send_message':
        case 'action_reply_message':
        case 'action_reply_ephemeral': {
          const content = String(block.fields.content || '응답 메시지');
          this.messages.push({
            id: Math.random().toString(36).substring(2, 9),
            sender: 'bot',
            authorName: 'SnapBot',
            content: block.opcode === 'action_reply_ephemeral' ? `🤫 [나에게만 보임] ${content}` : content,
            timestamp: new Date().toLocaleTimeString('ko-KR'),
          });
          this.notify();
          break;
        }

        case 'action_add_reaction': {
          const emoji = String(block.fields.emoji || '✅');
          const lastMsg = this.messages[this.messages.length - 1];
          if (lastMsg) {
            lastMsg.content = `${lastMsg.content}  [반응: ${emoji}]`;
            this.notify();
          }
          break;
        }

        case 'action_create_embed': {
          pendingEmbed = {
            title: String(block.fields.title || '임베드 제목'),
            description: String(block.fields.desc || '설명'),
            color: String(block.fields.color || '#6366F1'),
            fields: [],
          };
          break;
        }

        case 'action_embed_add_field': {
          if (pendingEmbed) {
            pendingEmbed.fields = pendingEmbed.fields || [];
            pendingEmbed.fields.push({
              name: String(block.fields.name || '필드'),
              value: String(block.fields.val || '값'),
              inline: String(block.fields.inline) === 'true',
            });
          }
          break;
        }

        case 'action_embed_set_footer': {
          if (pendingEmbed) {
            pendingEmbed.footer = String(block.fields.text || '푸터');
          }
          break;
        }

        case 'action_send_embed': {
          if (pendingEmbed) {
            this.messages.push({
              id: Math.random().toString(36).substring(2, 9),
              sender: 'bot',
              authorName: 'SnapBot',
              content: '',
              embed: pendingEmbed,
              timestamp: new Date().toLocaleTimeString('ko-KR'),
            });
            pendingEmbed = null;
            this.notify();
          }
          break;
        }

        case 'action_add_button': {
          const label = String(block.fields.label || '버튼');
          const customId = String(block.fields.customId || 'btn');
          const style = (block.fields.style as any) || 'Primary';
          this.messages.push({
            id: Math.random().toString(36).substring(2, 9),
            sender: 'bot',
            authorName: 'SnapBot',
            content: '버튼을 눌러 상호작용하세요:',
            buttons: [{ label, customId, style }],
            timestamp: new Date().toLocaleTimeString('ko-KR'),
          });
          this.notify();
          break;
        }

        case 'control_wait': {
          const sec = Number(block.fields.seconds || 1);
          await new Promise((r) => setTimeout(r, Math.min(sec * 1000, 3000)));
          break;
        }

        case 'var_set': {
          const varName = String(block.fields.varName || 'score');
          const val = block.fields.value;
          this.memoryVars[varName] = val;
          this.log('event', `변수 할당: ${varName} = ${val}`);
          break;
        }

        default:
          break;
      }

      currId = block.next;
    }
  }
}
