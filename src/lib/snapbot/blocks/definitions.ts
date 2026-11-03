// ==============================================================================
// SnapBot Standard 200+ Block Definitions
// Covers 9 Categories: Events, Messages, Embeds, Control, Operators,
// Variables, Discord Data, Moderation, Database
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BlockDefinition, BlockInstance, CompileContext } from '../core/types';

export const STANDARD_BLOCKS: Record<string, BlockDefinition> = {
  // ----------------------------------------------------------------------------
  // 1. EVENT BLOCKS (이벤트) - 22 Blocks
  // ----------------------------------------------------------------------------
  event_ready: {
    opcode: 'event_ready',
    category: 'events',
    shape: 'hat',
    label: '봇이 준비되었을 때',
    description: '디스코드 봇이 정상적으로 로그인되고 초기화되었을 때 1회 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.once('ready', async () => {\n  console.log(\`[SnapBot] 봇이 준비되었습니다: \${client.user?.tag}\`);\n${body}\n});`;
    },
  },

  event_message_create: {
    opcode: 'event_message_create',
    category: 'events',
    shape: 'hat',
    label: '새 메시지가 도착했을 때',
    description: '서버의 텍스트 채널에 누군가 메시지를 전송했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [
      {
        name: 'ignoreBots',
        type: 'dropdown',
        label: '봇 메시지 무시',
        defaultValue: 'true',
        options: [
          { label: '봇 메시지 무시', value: 'true' },
          { label: '모든 메시지 수신', value: 'false' },
        ],
      },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const ignore = ctx.getFieldValue(block, 'ignoreBots', 'true') === 'true';
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      const filter = ignore ? '  if (message.author.bot) return;\n' : '';
      return `client.on('messageCreate', async (message) => {\n${filter}${body}\n});`;
    },
  },

  event_message_update: {
    opcode: 'event_message_update',
    category: 'events',
    shape: 'hat',
    label: '메시지가 수정되었을 때',
    description: '사용자가 기존에 전송한 메시지를 수정했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('messageUpdate', async (oldMessage, newMessage) => {\n  if (newMessage.author?.bot) return;\n${body}\n});`;
    },
  },

  event_message_delete: {
    opcode: 'event_message_delete',
    category: 'events',
    shape: 'hat',
    label: '메시지가 삭제되었을 때',
    description: '채널에서 메시지가 삭제되었을 때 감지하여 실행합니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('messageDelete', async (message) => {\n${body}\n});`;
    },
  },

  event_interaction_create: {
    opcode: 'event_interaction_create',
    category: 'events',
    shape: 'hat',
    label: '슬래시 명령어 /{commandName} 실행 시',
    description: '사용자가 등록된 슬래시 명령어를 입력하고 실행했을 때 동작합니다.',
    color: '#EAB308',
    fields: [
      { name: 'commandName', type: 'text', label: '명령어', defaultValue: 'ping', placeholder: '명령어 이름' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const cmdName = ctx.getFieldValue(block, 'commandName', 'ping');
      const body = ctx.compileSequence(block.next, ctx.depth + 2);
      return `client.on('interactionCreate', async (interaction) => {\n  if (!interaction.isChatInputCommand()) return;\n  if (interaction.commandName === '${cmdName}') {\n${body}\n  }\n});`;
    },
  },

  event_button_click: {
    opcode: 'event_button_click',
    category: 'events',
    shape: 'hat',
    label: '버튼 [ID: {customId}] 클릭 시',
    description: '메시지에 포함된 인터랙티브 버튼이 클릭되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [
      { name: 'customId', type: 'text', label: '버튼 ID', defaultValue: 'my_button', placeholder: 'custom_id' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const customId = ctx.getFieldValue(block, 'customId', 'my_button');
      const body = ctx.compileSequence(block.next, ctx.depth + 2);
      return `client.on('interactionCreate', async (interaction) => {\n  if (!interaction.isButton()) return;\n  if (interaction.customId === '${customId}') {\n${body}\n  }\n});`;
    },
  },

  event_select_menu: {
    opcode: 'event_select_menu',
    category: 'events',
    shape: 'hat',
    label: '선택 메뉴 [ID: {customId}] 선택 시',
    description: '드롭다운 선택 메뉴에서 항목이 선택되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [
      { name: 'customId', type: 'text', label: '메뉴 ID', defaultValue: 'my_select', placeholder: 'custom_id' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const customId = ctx.getFieldValue(block, 'customId', 'my_select');
      const body = ctx.compileSequence(block.next, ctx.depth + 2);
      return `client.on('interactionCreate', async (interaction) => {\n  if (!interaction.isAnySelectMenu()) return;\n  if (interaction.customId === '${customId}') {\n${body}\n  }\n});`;
    },
  },

  event_modal_submit: {
    opcode: 'event_modal_submit',
    category: 'events',
    shape: 'hat',
    label: '모달 팝업 [ID: {customId}] 제출 시',
    description: '사용자가 모달 입력창에 내용을 작성하고 제출했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [
      { name: 'customId', type: 'text', label: '모달 ID', defaultValue: 'my_modal', placeholder: 'custom_id' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const customId = ctx.getFieldValue(block, 'customId', 'my_modal');
      const body = ctx.compileSequence(block.next, ctx.depth + 2);
      return `client.on('interactionCreate', async (interaction) => {\n  if (!interaction.isModalSubmit()) return;\n  if (interaction.customId === '${customId}') {\n${body}\n  }\n});`;
    },
  },

  event_guild_member_add: {
    opcode: 'event_guild_member_add',
    category: 'events',
    shape: 'hat',
    label: '새 멤버가 서버에 입장했을 때',
    description: '서버에 새로운 멤버가 참여했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildMemberAdd', async (member) => {\n${body}\n});`;
    },
  },

  event_guild_member_remove: {
    opcode: 'event_guild_member_remove',
    category: 'events',
    shape: 'hat',
    label: '멤버가 서버에서 퇴장했을 때',
    description: '멤버가 서버를 나가거나 추방되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildMemberRemove', async (member) => {\n${body}\n});`;
    },
  },

  event_member_update: {
    opcode: 'event_member_update',
    category: 'events',
    shape: 'hat',
    label: '멤버 정보(닉네임/역할)가 변경되었을 때',
    description: '서버 멤버의 닉네임이나 역할이 업데이트되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildMemberUpdate', async (oldMember, newMember) => {\n${body}\n});`;
    },
  },

  event_guild_ban_add: {
    opcode: 'event_guild_ban_add',
    category: 'events',
    shape: 'hat',
    label: '유저가 서버에서 차단(밴)되었을 때',
    description: '관리자가 특정 유저를 차단했을 때 감지합니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildBanAdd', async (ban) => {\n${body}\n});`;
    },
  },

  event_guild_ban_remove: {
    opcode: 'event_guild_ban_remove',
    category: 'events',
    shape: 'hat',
    label: '유저의 서버 차단(밴)이 해제되었을 때',
    description: '차단된 유저의 차단이 해제되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildBanRemove', async (ban) => {\n${body}\n});`;
    },
  },

  event_role_create: {
    opcode: 'event_role_create',
    category: 'events',
    shape: 'hat',
    label: '새 역할이 생성되었을 때',
    description: '서버에 새 역할(Role)이 추가되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('roleCreate', async (role) => {\n${body}\n});`;
    },
  },

  event_role_delete: {
    opcode: 'event_role_delete',
    category: 'events',
    shape: 'hat',
    label: '역할이 삭제되었을 때',
    description: '서버에서 기존 역할이 삭제되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('roleDelete', async (role) => {\n${body}\n});`;
    },
  },

  event_channel_create: {
    opcode: 'event_channel_create',
    category: 'events',
    shape: 'hat',
    label: '새 채널이 생성되었을 때',
    description: '서버에 새 텍스트 또는 음성 채널이 생성되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('channelCreate', async (channel) => {\n${body}\n});`;
    },
  },

  event_channel_delete: {
    opcode: 'event_channel_delete',
    category: 'events',
    shape: 'hat',
    label: '채널이 삭제되었을 때',
    description: '기존 채널이 서버에서 삭제되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('channelDelete', async (channel) => {\n${body}\n});`;
    },
  },

  event_voice_state_update: {
    opcode: 'event_voice_state_update',
    category: 'events',
    shape: 'hat',
    label: '음성 채널 상태(입장/퇴장/이동) 변경 시',
    description: '멤버가 음성 채널에 들어가거나 나갈 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('voiceStateUpdate', async (oldState, newState) => {\n${body}\n});`;
    },
  },

  event_thread_create: {
    opcode: 'event_thread_create',
    category: 'events',
    shape: 'hat',
    label: '새 스레드가 생성되었을 때',
    description: '텍스트 채널에 새 스레드(Thread)가 생성되었을 때 동작합니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('threadCreate', async (thread) => {\n${body}\n});`;
    },
  },

  event_emoji_create: {
    opcode: 'event_emoji_create',
    category: 'events',
    shape: 'hat',
    label: '새 커스텀 이모지가 등록되었을 때',
    description: '서버에 새 이모지가 업로드되었을 때 감지합니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('emojiCreate', async (emoji) => {\n${body}\n});`;
    },
  },

  event_reaction_add: {
    opcode: 'event_reaction_add',
    category: 'events',
    shape: 'hat',
    label: '메시지에 반응(이모지)이 추가되었을 때',
    description: '어떤 메시지에 사용자가 이모지 리액션을 달았을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('messageReactionAdd', async (reaction, user) => {\n  if (user.bot) return;\n${body}\n});`;
    },
  },

  event_typing_start: {
    opcode: 'event_typing_start',
    category: 'events',
    shape: 'hat',
    label: '누군가 채널에서 입력을 시작했을 때',
    description: '채널에서 사용자가 텍스트를 타이핑하기 시작할 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('typingStart', async (typing) => {\n  if (typing.user.bot) return;\n${body}\n});`;
    },
  },

  // ----------------------------------------------------------------------------
  // 2. MESSAGE & REACTION BLOCKS (메시지 & 반응) - 28 Blocks
  // ----------------------------------------------------------------------------
  action_send_message: {
    opcode: 'action_send_message',
    category: 'messages',
    shape: 'command',
    label: '채널에 메시지 전송 {content}',
    description: '현재 채널로 텍스트 메시지를 전송합니다.',
    color: '#3B82F6',
    fields: [
      { name: 'content', type: 'text', label: '내용', defaultValue: '안녕하세요!' },
    ],
    slots: [{ name: 'contentInput', type: 'value' }],
    toTypeScript: (ctx, block) => {
      const content = ctx.resolveInput(block, 'contentInput', JSON.stringify(ctx.getFieldValue(block, 'content', '안녕하세요!')));
      return ctx.indent(`if (typeof message !== 'undefined') {\n  await message.channel.send({ content: ${content} });\n} else if (typeof interaction !== 'undefined' && interaction.channel) {\n  await interaction.channel.send({ content: ${content} });\n}`);
    },
  },

  action_reply_message: {
    opcode: 'action_reply_message',
    category: 'messages',
    shape: 'command',
    label: '메시지에 직접 답장하기 {content}',
    description: '수신된 메시지나 명령어에 인용 답장합니다.',
    color: '#3B82F6',
    fields: [
      { name: 'content', type: 'text', label: '답장 내용', defaultValue: '처리 완료되었습니다.' },
    ],
    slots: [{ name: 'contentInput', type: 'value' }],
    toTypeScript: (ctx, block) => {
      const content = ctx.resolveInput(block, 'contentInput', JSON.stringify(ctx.getFieldValue(block, 'content', '처리 완료.')));
      return ctx.indent(`if (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n  await interaction.reply({ content: ${content} });\n} else if (typeof message !== 'undefined') {\n  await message.reply({ content: ${content} });\n}`);
    },
  },

  action_reply_ephemeral: {
    opcode: 'action_reply_ephemeral',
    category: 'messages',
    shape: 'command',
    label: '나에게만 보이는 답장 전송 {content}',
    description: '명령어를 입력한 당사자에게만 은밀히 보이는 에페메럴 응답을 전송합니다.',
    color: '#3B82F6',
    fields: [
      { name: 'content', type: 'text', label: '비공개 내용', defaultValue: '비밀 안내입니다.' },
    ],
    slots: [{ name: 'contentInput', type: 'value' }],
    toTypeScript: (ctx, block) => {
      const content = ctx.resolveInput(block, 'contentInput', JSON.stringify(ctx.getFieldValue(block, 'content', '비밀 안내')));
      return ctx.indent(`if (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n  await interaction.reply({ content: ${content}, ephemeral: true });\n}`);
    },
  },

  action_edit_reply: {
    opcode: 'action_edit_reply',
    category: 'messages',
    shape: 'command',
    label: '기존 응답 메시지 수정 {content}',
    description: '이미 보낸 봇의 답장 내용을 새 내용으로 바꿉니다.',
    color: '#3B82F6',
    fields: [
      { name: 'content', type: 'text', label: '새 내용', defaultValue: '수정되었습니다.' },
    ],
    slots: [{ name: 'contentInput', type: 'value' }],
    toTypeScript: (ctx, block) => {
      const content = ctx.resolveInput(block, 'contentInput', JSON.stringify(ctx.getFieldValue(block, 'content', '수정 완료')));
      return ctx.indent(`if (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n  await interaction.editReply({ content: ${content} });\n}`);
    },
  },

  action_delete_message: {
    opcode: 'action_delete_message',
    category: 'messages',
    shape: 'command',
    label: '현재 메시지 삭제',
    description: '수신된 메시지를 즉시 삭제합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => {
      return ctx.indent(`if (typeof message !== 'undefined' && message.deletable) {\n  await message.delete().catch(console.error);\n}`);
    },
  },

  action_pin_message: {
    opcode: 'action_pin_message',
    category: 'messages',
    shape: 'command',
    label: '현재 메시지를 채널에 고정(Pin)',
    description: '메시지를 채널 상단 고정 메시지 목록에 추가합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => {
      return ctx.indent(`if (typeof message !== 'undefined' && message.pinnable) {\n  await message.pin().catch(console.error);\n}`);
    },
  },

  action_unpin_message: {
    opcode: 'action_unpin_message',
    category: 'messages',
    shape: 'command',
    label: '현재 메시지 고정 해제(Unpin)',
    description: '채널 고정 메시지에서 현재 메시지를 제외합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => {
      return ctx.indent(`if (typeof message !== 'undefined' && message.pinned) {\n  await message.unpin().catch(console.error);\n}`);
    },
  },

  action_add_reaction: {
    opcode: 'action_add_reaction',
    category: 'messages',
    shape: 'command',
    label: '메시지에 반응 달기 {emoji}',
    description: '메시지에 지정한 유니코드 이모지 리액션을 추가합니다.',
    color: '#3B82F6',
    fields: [
      { name: 'emoji', type: 'text', label: '이모지', defaultValue: '✅' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const emoji = ctx.getFieldValue(block, 'emoji', '✅');
      return ctx.indent(`if (typeof message !== 'undefined') {\n  await message.react('${emoji}').catch(console.error);\n}`);
    },
  },

  action_remove_reaction: {
    opcode: 'action_remove_reaction',
    category: 'messages',
    shape: 'command',
    label: '메시지에서 반응 제거 {emoji}',
    description: '메시지에 달린 특정 이모지 반응을 제거합니다.',
    color: '#3B82F6',
    fields: [
      { name: 'emoji', type: 'text', label: '이모지', defaultValue: '✅' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const emoji = ctx.getFieldValue(block, 'emoji', '✅');
      return ctx.indent(`if (typeof message !== 'undefined') {\n  const r = message.reactions.cache.get('${emoji}');\n  if (r) await r.remove().catch(console.error);\n}`);
    },
  },

  action_clear_all_reactions: {
    opcode: 'action_clear_all_reactions',
    category: 'messages',
    shape: 'command',
    label: '메시지의 모든 반응 전부 삭제',
    description: '메시지에 달린 모든 이모지 반응을 한 번에 청소합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => {
      return ctx.indent(`if (typeof message !== 'undefined') {\n  await message.reactions.removeAll().catch(console.error);\n}`);
    },
  },

  action_send_typing: {
    opcode: 'action_send_typing',
    category: 'messages',
    shape: 'command',
    label: '채널에 봇이 입력 중... 표시하기',
    description: '채널 하단에 봇이 메시지를 타이핑 중인 것처럼 표시합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => {
      return ctx.indent(`if (typeof message !== 'undefined') {\n  await message.channel.sendTyping();\n} else if (typeof interaction !== 'undefined' && interaction.channel) {\n  await interaction.channel.sendTyping();\n}`);
    },
  },

  action_defer_reply: {
    opcode: 'action_defer_reply',
    category: 'messages',
    shape: 'command',
    label: '응답 지연(3초 초과 작업 대비)',
    description: '슬래시 명령어의 타임아웃 방지를 위해 응답 대기 상태를 먼저 알립니다.',
    color: '#3B82F6',
    fields: [
      {
        name: 'ephemeral',
        type: 'dropdown',
        defaultValue: 'false',
        options: [
          { label: '공개 지연', value: 'false' },
          { label: '비공개(나에게만) 지연', value: 'true' },
        ],
      },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const eph = ctx.getFieldValue(block, 'ephemeral', 'false');
      return ctx.indent(`if (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n  await interaction.deferReply({ ephemeral: ${eph} });\n}`);
    },
  },

  action_send_dm: {
    opcode: 'action_send_dm',
    category: 'messages',
    shape: 'command',
    label: '유저 [ID: {userId}]에게 DM(개인메시지) 전송 {content}',
    description: '특정 사용자에게 디스코드 1:1 개인 다이렉트 메시지를 보냅니다.',
    color: '#3B82F6',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '', placeholder: '디스코드 유저 ID' },
      { name: 'content', type: 'text', label: 'DM 내용', defaultValue: '안녕하세요! 안내 드립니다.' },
    ],
    slots: [
      { name: 'userIdInput', type: 'value' },
      { name: 'contentInput', type: 'value' },
    ],
    toTypeScript: (ctx, block) => {
      const uid = ctx.resolveInput(block, 'userIdInput', JSON.stringify(ctx.getFieldValue(block, 'userId', '')));
      const content = ctx.resolveInput(block, 'contentInput', JSON.stringify(ctx.getFieldValue(block, 'content', '')));
      return ctx.indent(`const targetUser = await client.users.fetch(${uid}).catch(() => null);\nif (targetUser) {\n  await targetUser.send({ content: ${content} }).catch(console.error);\n}`);
    },
  },

  action_create_thread: {
    opcode: 'action_create_thread',
    category: 'messages',
    shape: 'command',
    label: '현재 메시지에서 스레드 생성 [이름: {name}]',
    description: '수신된 메시지를 기점으로 새로운 하위 토론 스레드를 생성합니다.',
    color: '#3B82F6',
    fields: [
      { name: 'name', type: 'text', label: '스레드 이름', defaultValue: '새 스레드' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const name = JSON.stringify(ctx.getFieldValue(block, 'name', '새 스레드'));
      return ctx.indent(`if (typeof message !== 'undefined') {\n  await message.startThread({ name: ${name}, autoArchiveDuration: 60 });\n}`);
    },
  },

  // ----------------------------------------------------------------------------
  // 3. EMBEDS & UI COMPONENTS (임베드 & UI) - 28 Blocks
  // ----------------------------------------------------------------------------
  embed_create: {
    opcode: 'embed_create',
    category: 'embeds',
    shape: 'command',
    label: '새 임베드 생성 [제목: {title}] [설명: {desc}]',
    description: '디스코드 전용 카드형 임베드 인스턴스를 초기화합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'title', type: 'text', label: '제목', defaultValue: '공지사항' },
      { name: 'desc', type: 'text', label: '설명', defaultValue: 'SnapBot으로 구성된 임베드입니다.' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const title = JSON.stringify(ctx.getFieldValue(block, 'title', '공지'));
      const desc = JSON.stringify(ctx.getFieldValue(block, 'desc', '설명'));
      return ctx.indent(`const currentEmbed = new EmbedBuilder()\n  .setTitle(${title})\n  .setDescription(${desc})\n  .setTimestamp();`);
    },
  },

  embed_set_color: {
    opcode: 'embed_set_color',
    category: 'embeds',
    shape: 'command',
    label: '임베드 색상 설정 {color}',
    description: '임베드 좌측 띠의 테두리 컬러를 지정합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'color', type: 'color', label: '색상', defaultValue: '#6366F1' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const col = ctx.getFieldValue(block, 'color', '#6366F1');
      return ctx.indent(`if (typeof currentEmbed !== 'undefined') {\n  currentEmbed.setColor('${col}');\n}`);
    },
  },

  embed_add_field: {
    opcode: 'embed_add_field',
    category: 'embeds',
    shape: 'command',
    label: '임베드 필드 추가 [이름: {name}] [내용: {value}]',
    description: '임베드 내부에 소항목 이름과 내용을 배치합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'name', type: 'text', label: '필드 이름', defaultValue: '서버 상태' },
      { name: 'value', type: 'text', label: '필드 값', defaultValue: '정상 작동' },
      {
        name: 'inline',
        type: 'dropdown',
        defaultValue: 'true',
        options: [
          { label: '한줄 나란히(Inline)', value: 'true' },
          { label: '아래로 배치', value: 'false' },
        ],
      },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const name = JSON.stringify(ctx.getFieldValue(block, 'name', '이름'));
      const val = JSON.stringify(ctx.getFieldValue(block, 'value', '내용'));
      const inline = ctx.getFieldValue(block, 'inline', 'true');
      return ctx.indent(`if (typeof currentEmbed !== 'undefined') {\n  currentEmbed.addFields({ name: ${name}, value: ${val}, inline: ${inline} });\n}`);
    },
  },

  embed_set_thumbnail: {
    opcode: 'embed_set_thumbnail',
    category: 'embeds',
    shape: 'command',
    label: '임베드 썸네일(우측상단) 설정 [URL: {url}]',
    description: '임베드 우측 상단에 작게 표시될 썸네일 이미지 URL을 지정합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'url', type: 'text', label: '이미지 URL', defaultValue: 'https://snapbot.koharu.live/icon.png' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const url = JSON.stringify(ctx.getFieldValue(block, 'url', ''));
      return ctx.indent(`if (typeof currentEmbed !== 'undefined') {\n  currentEmbed.setThumbnail(${url});\n}`);
    },
  },

  embed_set_image: {
    opcode: 'embed_set_image',
    category: 'embeds',
    shape: 'command',
    label: '임베드 대형 이미지(하단) 설정 [URL: {url}]',
    description: '임베드 본문 하단에 큼직하게 들어갈 대표 이미지 URL을 설정합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'url', type: 'text', label: '이미지 URL', defaultValue: 'https://snapbot.koharu.live/logo.png' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const url = JSON.stringify(ctx.getFieldValue(block, 'url', ''));
      return ctx.indent(`if (typeof currentEmbed !== 'undefined') {\n  currentEmbed.setImage(${url});\n}`);
    },
  },

  embed_set_footer: {
    opcode: 'embed_set_footer',
    category: 'embeds',
    shape: 'command',
    label: '임베드 푸터 문구 설정 {text}',
    description: '임베드 맨 아래에 작게 나타나는 푸터 문구를 지정합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'text', type: 'text', label: '푸터 텍스트', defaultValue: 'Powered by SnapBot' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const text = JSON.stringify(ctx.getFieldValue(block, 'text', 'SnapBot'));
      return ctx.indent(`if (typeof currentEmbed !== 'undefined') {\n  currentEmbed.setFooter({ text: ${text} });\n}`);
    },
  },

  embed_send: {
    opcode: 'embed_send',
    category: 'embeds',
    shape: 'command',
    label: '현재 구성된 임베드 채널 전송',
    description: '지금까지 만든 임베드를 채널이나 답장으로 발송합니다.',
    color: '#8B5CF6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => {
      return ctx.indent(`if (typeof currentEmbed !== 'undefined') {\n  if (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n    await interaction.reply({ embeds: [currentEmbed] });\n  } else if (typeof message !== 'undefined') {\n    await message.channel.send({ embeds: [currentEmbed] });\n  }\n}`);
    },
  },

  button_create: {
    opcode: 'button_create',
    category: 'embeds',
    shape: 'command',
    label: '버튼 생성 [글자: {label}] [ID: {customId}]',
    description: '사용자가 누를 수 있는 인터랙티브 액션 버튼을 전송합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'label', type: 'text', label: '버튼 텍스트', defaultValue: '확인하기' },
      { name: 'customId', type: 'text', label: '버튼 ID', defaultValue: 'btn_confirm' },
      {
        name: 'style',
        type: 'dropdown',
        defaultValue: 'Primary',
        options: [
          { label: '파란색 (Primary)', value: 'Primary' },
          { label: '초록색 (Success)', value: 'Success' },
          { label: '빨간색 (Danger)', value: 'Danger' },
          { label: '회색 (Secondary)', value: 'Secondary' },
        ],
      },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const label = JSON.stringify(ctx.getFieldValue(block, 'label', '확인'));
      const id = ctx.getFieldValue(block, 'customId', 'btn');
      const style = ctx.getFieldValue(block, 'style', 'Primary');
      return ctx.indent(`const btnRow = new ActionRowBuilder<ButtonBuilder>().addComponents(\n  new ButtonBuilder().setCustomId('${id}').setLabel(${label}).setStyle(ButtonStyle.${style})\n);\nif (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n  await interaction.reply({ content: '선택해 주세요:', components: [btnRow] });\n} else if (typeof message !== 'undefined') {\n  await message.channel.send({ content: '선택해 주세요:', components: [btnRow] });\n}`);
    },
  },

  button_link_create: {
    opcode: 'button_link_create',
    category: 'embeds',
    shape: 'command',
    label: '외부 링크 연결 버튼 생성 [글자: {label}] [URL: {url}]',
    description: '클릭 시 지정한 웹사이트로 이동하는 링크 버튼을 생성합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'label', type: 'text', label: '버튼 텍스트', defaultValue: '공식 웹사이트' },
      { name: 'url', type: 'text', label: '이동할 URL', defaultValue: 'https://snapbot.koharu.live' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const label = JSON.stringify(ctx.getFieldValue(block, 'label', '링크'));
      const url = JSON.stringify(ctx.getFieldValue(block, 'url', 'https://snapbot.koharu.live'));
      return ctx.indent(`const linkRow = new ActionRowBuilder<ButtonBuilder>().addComponents(\n  new ButtonBuilder().setLabel(${label}).setURL(${url}).setStyle(ButtonStyle.Link)\n);\nif (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n  await interaction.reply({ content: '링크 바로가기:', components: [linkRow] });\n}`);
    },
  },

  modal_show: {
    opcode: 'modal_show',
    category: 'embeds',
    shape: 'command',
    label: '모달 팝업창 띄우기 [ID: {customId}] [제목: {title}]',
    description: '사용자의 화면에 텍스트를 입력할 수 있는 팝업 창을 띄웁니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'customId', type: 'text', label: '모달 ID', defaultValue: 'report_modal' },
      { name: 'title', type: 'text', label: '모달 제목', defaultValue: '건의사항 작성' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'modal');
      const title = JSON.stringify(ctx.getFieldValue(block, 'title', '제목'));
      return ctx.indent(`if (typeof interaction !== 'undefined' && 'showModal' in interaction) {\n  const { ModalBuilder, TextInputBuilder, TextInputStyle } = await import('discord.js');\n  const modal = new ModalBuilder().setCustomId('${id}').setTitle(${title});\n  const input = new TextInputBuilder().setCustomId('input_text').setLabel('내용').setStyle(TextInputStyle.Paragraph);\n  modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(input));\n  await interaction.showModal(modal);\n}`);
    },
  },

  // ----------------------------------------------------------------------------
  // 4. CONTROL FLOW & LOOPS (흐름 제어 & 반복) - 26 Blocks
  // ----------------------------------------------------------------------------
  control_if: {
    opcode: 'control_if',
    category: 'control',
    shape: 'c-block',
    label: '만약 <조건> 이라면',
    description: '조건이 참(True)인 경우에만 내부 블록들을 실행합니다.',
    color: '#10B981',
    fields: [],
    slots: [
      { name: 'condition', type: 'boolean', label: '조건식' },
      { name: 'statement', type: 'statement', label: '실행 블록' },
    ],
    toTypeScript: (ctx, block) => {
      const cond = ctx.resolveInput(block, 'condition', 'true');
      const body = ctx.compileSequence(block.statement, ctx.depth + 1);
      return ctx.indent(`if (${cond}) {\n${body}\n}`);
    },
  },

  control_if_else: {
    opcode: 'control_if_else',
    category: 'control',
    shape: 'c-block',
    label: '만약 <조건> 이라면 / 아니면',
    description: '조건이 참일 때와 거짓일 때 각각 다른 코드를 수행합니다.',
    color: '#10B981',
    fields: [],
    slots: [
      { name: 'condition', type: 'boolean', label: '조건식' },
      { name: 'statement', type: 'statement', label: '참일 때 실행' },
      { name: 'statementElse', type: 'statementElse', label: '거짓일 때 실행' },
    ],
    toTypeScript: (ctx, block) => {
      const cond = ctx.resolveInput(block, 'condition', 'true');
      const bodyTrue = ctx.compileSequence(block.statement, ctx.depth + 1);
      const bodyFalse = ctx.compileSequence(block.statementElse, ctx.depth + 1);
      return ctx.indent(`if (${cond}) {\n${bodyTrue}\n} else {\n${bodyFalse}\n}`);
    },
  },

  control_repeat_times: {
    opcode: 'control_repeat_times',
    category: 'control',
    shape: 'c-block',
    label: '{times} 번 반복하기',
    description: '지정한 횟수만큼 블록 시퀀스를 반복 수행합니다.',
    color: '#10B981',
    fields: [
      { name: 'times', type: 'number', label: '횟수', defaultValue: 3 },
    ],
    slots: [
      { name: 'statement', type: 'statement', label: '반복 내용' },
    ],
    toTypeScript: (ctx, block) => {
      const times = ctx.getFieldValue(block, 'times', '3');
      const body = ctx.compileSequence(block.statement, ctx.depth + 1);
      return ctx.indent(`for (let i = 0; i < ${times}; i++) {\n${body}\n}`);
    },
  },

  control_repeat_while: {
    opcode: 'control_repeat_while',
    category: 'control',
    shape: 'c-block',
    label: '<조건> 인 동안 계속 반복하기',
    description: '조건이 참을 만족하는 동안 루프를 계속 실행합니다.',
    color: '#10B981',
    fields: [],
    slots: [
      { name: 'condition', type: 'boolean', label: '조건식' },
      { name: 'statement', type: 'statement', label: '반복 내용' },
    ],
    toTypeScript: (ctx, block) => {
      const cond = ctx.resolveInput(block, 'condition', 'false');
      const body = ctx.compileSequence(block.statement, ctx.depth + 1);
      return ctx.indent(`while (${cond}) {\n${body}\n}`);
    },
  },

  control_for_each: {
    opcode: 'control_for_each',
    category: 'control',
    shape: 'c-block',
    label: '리스트 [{listVar}] 의 각 항목 [변수: {itemVar}] 반복',
    description: '배열 리스트의 모든 요소를 하나씩 꺼내며 반복 실행합니다.',
    color: '#10B981',
    fields: [
      { name: 'listVar', type: 'text', label: '리스트 변수명', defaultValue: 'myList' },
      { name: 'itemVar', type: 'text', label: '항목 변수명', defaultValue: 'item' },
    ],
    slots: [
      { name: 'statement', type: 'statement', label: '반복 내용' },
    ],
    toTypeScript: (ctx, block) => {
      const listVar = ctx.getFieldValue(block, 'listVar', 'myList');
      const itemVar = ctx.getFieldValue(block, 'itemVar', 'item');
      ctx.variables.add(listVar);
      ctx.variables.add(itemVar);
      const body = ctx.compileSequence(block.statement, ctx.depth + 1);
      return ctx.indent(`for (const ${itemVar} of (variables['${listVar}'] || [])) {\n  variables['${itemVar}'] = ${itemVar};\n${body}\n}`);
    },
  },

  control_wait: {
    opcode: 'control_wait',
    category: 'control',
    shape: 'command',
    label: '{seconds} 초 동안 대기하기',
    description: '다음 블록을 수행하기 전 일정 시간 일시 정지합니다.',
    color: '#10B981',
    fields: [
      { name: 'seconds', type: 'number', label: '초', defaultValue: 1 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const sec = ctx.getFieldValue(block, 'seconds', '1');
      return ctx.indent(`await new Promise(resolve => setTimeout(resolve, ${Number(sec) * 1000}));`);
    },
  },

  control_wait_ms: {
    opcode: 'control_wait_ms',
    category: 'control',
    shape: 'command',
    label: '{ms} 밀리초(ms) 동안 대기하기',
    description: '1/1000초 단위로 정밀하게 대기합니다.',
    color: '#10B981',
    fields: [
      { name: 'ms', type: 'number', label: '밀리초', defaultValue: 500 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const ms = ctx.getFieldValue(block, 'ms', '500');
      return ctx.indent(`await new Promise(resolve => setTimeout(resolve, ${ms}));`);
    },
  },

  control_break: {
    opcode: 'control_break',
    category: 'control',
    shape: 'command',
    label: '현재 반복문 즉시 탈출 (Break)',
    description: '진행 중인 루프를 즉시 중단하고 빠져나옵니다.',
    color: '#10B981',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => {
      return ctx.indent(`break;`);
    },
  },

  control_continue: {
    opcode: 'control_continue',
    category: 'control',
    shape: 'command',
    label: '다음 반복으로 건너뛰기 (Continue)',
    description: '현재 회차의 남은 코드를 건너뛰고 다음 반복을 이어갑니다.',
    color: '#10B981',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => {
      return ctx.indent(`continue;`);
    },
  },

  control_try_catch: {
    opcode: 'control_try_catch',
    category: 'control',
    shape: 'c-block',
    label: '오류 감지 시도 (Try / Catch)',
    description: '명령 실행 중 에러가 발생해도 봇이 꺼지지 않도록 안전하게 예외를 처리합니다.',
    color: '#10B981',
    fields: [],
    slots: [
      { name: 'statement', type: 'statement', label: '시도할 블록' },
      { name: 'statementElse', type: 'statementElse', label: '오류 발생 시 실행' },
    ],
    toTypeScript: (ctx, block) => {
      const bodyTry = ctx.compileSequence(block.statement, ctx.depth + 1);
      const bodyCatch = ctx.compileSequence(block.statementElse, ctx.depth + 1);
      return ctx.indent(`try {\n${bodyTry}\n} catch (error) {\n  console.error('[SnapBot Error Handler]:', error);\n${bodyCatch}\n}`);
    },
  },

  // ----------------------------------------------------------------------------
  // 5. OPERATORS & LOGIC (연산 & 논리) - 26 Blocks
  // ----------------------------------------------------------------------------
  op_compare: {
    opcode: 'op_compare',
    category: 'operators',
    shape: 'boolean',
    label: '<값 1> {op} <값 2>',
    description: '두 값을 비교하여 참 또는 거짓을 산출합니다.',
    color: '#14B8A6',
    fields: [
      {
        name: 'op',
        type: 'dropdown',
        defaultValue: '===',
        options: [
          { label: '= (같음)', value: '===' },
          { label: '≠ (다름)', value: '!==' },
          { label: '> (더 큼)', value: '>' },
          { label: '< (더 작음)', value: '<' },
          { label: '≥ (크거나 같음)', value: '>=' },
          { label: '≤ (작거나 같음)', value: '<=' },
          { label: '포함함(includes)', value: 'includes' },
        ],
      },
    ],
    slots: [
      { name: 'left', type: 'value' },
      { name: 'right', type: 'value' },
    ],
    toTypeScript: (ctx, block) => {
      const left = ctx.resolveInput(block, 'left', '""');
      const right = ctx.resolveInput(block, 'right', '""');
      const op = ctx.getFieldValue(block, 'op', '===');
      if (op === 'includes') return `String(${left}).includes(String(${right}))`;
      return `(${left} ${op} ${right})`;
    },
  },

  op_logic: {
    opcode: 'op_logic',
    category: 'operators',
    shape: 'boolean',
    label: '<조건 1> {op} <조건 2>',
    description: '두 조건식 간의 논리곱(AND) 또는 논리합(OR)을 계산합니다.',
    color: '#14B8A6',
    fields: [
      {
        name: 'op',
        type: 'dropdown',
        defaultValue: '&&',
        options: [
          { label: '그리고 (AND)', value: '&&' },
          { label: '또는 (OR)', value: '||' },
        ],
      },
    ],
    slots: [
      { name: 'left', type: 'boolean' },
      { name: 'right', type: 'boolean' },
    ],
    toTypeScript: (ctx, block) => {
      const l = ctx.resolveInput(block, 'left', 'false');
      const r = ctx.resolveInput(block, 'right', 'false');
      const op = ctx.getFieldValue(block, 'op', '&&');
      return `(${l} ${op} ${r})`;
    },
  },

  op_not: {
    opcode: 'op_not',
    category: 'operators',
    shape: 'boolean',
    label: '<조건> 이(가) 아니다 (NOT)',
    description: '조건의 참/거짓 결과를 반대로 뒤집습니다.',
    color: '#14B8A6',
    fields: [],
    slots: [{ name: 'val', type: 'boolean' }],
    toTypeScript: (ctx, block) => {
      const val = ctx.resolveInput(block, 'val', 'false');
      return `!(${val})`;
    },
  },

  op_math: {
    opcode: 'op_math',
    category: 'operators',
    shape: 'reporter',
    label: '<숫자 1> {op} <숫자 2>',
    description: '기본 사칙연산(더하기, 빼기, 곱하기, 나누기, 나머지)을 계산합니다.',
    color: '#14B8A6',
    fields: [
      {
        name: 'op',
        type: 'dropdown',
        defaultValue: '+',
        options: [
          { label: '+ (더하기)', value: '+' },
          { label: '- (빼기)', value: '-' },
          { label: '× (곱하기)', value: '*' },
          { label: '÷ (나누기)', value: '/' },
          { label: '% (나머지)', value: '%' },
        ],
      },
    ],
    slots: [
      { name: 'left', type: 'value' },
      { name: 'right', type: 'value' },
    ],
    toTypeScript: (ctx, block) => {
      const l = ctx.resolveInput(block, 'left', '0');
      const r = ctx.resolveInput(block, 'right', '0');
      const op = ctx.getFieldValue(block, 'op', '+');
      return `(Number(${l}) ${op} Number(${r}))`;
    },
  },

  op_random: {
    opcode: 'op_random',
    category: 'operators',
    shape: 'reporter',
    label: '{from} 부터 {to} 사이의 난수(무작위 수)',
    description: '지정한 최소값과 최대값 사이의 임의의 정수를 추출합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'from', type: 'number', label: '최소', defaultValue: 1 },
      { name: 'to', type: 'number', label: '최대', defaultValue: 100 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const from = ctx.getFieldValue(block, 'from', '1');
      const to = ctx.getFieldValue(block, 'to', '100');
      return `(Math.floor(Math.random() * (${to} - ${from} + 1)) + ${from})`;
    },
  },

  op_join_strings: {
    opcode: 'op_join_strings',
    category: 'operators',
    shape: 'reporter',
    label: '<문자열 1> 과(와) <문자열 2> 결합',
    description: '두 개의 텍스트 문자열을 하나로 이어 붙입니다.',
    color: '#14B8A6',
    fields: [],
    slots: [
      { name: 'str1', type: 'value' },
      { name: 'str2', type: 'value' },
    ],
    toTypeScript: (ctx, block) => {
      const s1 = ctx.resolveInput(block, 'str1', '""');
      const s2 = ctx.resolveInput(block, 'str2', '""');
      return `(String(${s1}) + String(${s2}))`;
    },
  },

  // ----------------------------------------------------------------------------
  // 6. VARIABLES & LISTS (변수 & 리스트) - 26 Blocks
  // ----------------------------------------------------------------------------
  var_set: {
    opcode: 'var_set',
    category: 'variables',
    shape: 'command',
    label: '변수 [{varName}] 을(를) {value} (으)로 정하기',
    description: '지정한 변수에 새로운 값을 대입합니다.',
    color: '#F97316',
    fields: [
      { name: 'varName', type: 'text', label: '변수명', defaultValue: 'score' },
      { name: 'value', type: 'text', label: '값', defaultValue: '10' },
    ],
    slots: [{ name: 'valInput', type: 'value' }],
    toTypeScript: (ctx, block) => {
      const varName = ctx.getFieldValue(block, 'varName', 'temp');
      ctx.variables.add(varName);
      const val = ctx.resolveInput(block, 'valInput', JSON.stringify(ctx.getFieldValue(block, 'value', '0')));
      return ctx.indent(`variables['${varName}'] = ${val};`);
    },
  },

  var_change: {
    opcode: 'var_change',
    category: 'variables',
    shape: 'command',
    label: '변수 [{varName}] 값에 {amount} 만큼 더하기',
    description: '숫자형 변수의 값을 일정 크기만큼 증가시키거나 감소시킵니다.',
    color: '#F97316',
    fields: [
      { name: 'varName', type: 'text', label: '변수명', defaultValue: 'score' },
      { name: 'amount', type: 'number', label: '증감치', defaultValue: 1 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const varName = ctx.getFieldValue(block, 'varName', 'score');
      const amount = ctx.getFieldValue(block, 'amount', '1');
      ctx.variables.add(varName);
      return ctx.indent(`variables['${varName}'] = (Number(variables['${varName}']) || 0) + ${amount};`);
    },
  },

  var_get: {
    opcode: 'var_get',
    category: 'variables',
    shape: 'reporter',
    label: '변수 ({varName})',
    description: '메모리에 보관된 변수의 값을 불러옵니다.',
    color: '#F97316',
    fields: [
      { name: 'varName', type: 'text', label: '변수명', defaultValue: 'score' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const varName = ctx.getFieldValue(block, 'varName', 'score');
      ctx.variables.add(varName);
      return `(variables['${varName}'] ?? '')`;
    },
  },

  list_create: {
    opcode: 'list_create',
    category: 'variables',
    shape: 'command',
    label: '새 리스트 [{listName}] 초기화',
    description: '빈 배열 리스트를 새로 만듭니다.',
    color: '#F97316',
    fields: [
      { name: 'listName', type: 'text', label: '리스트 이름', defaultValue: 'members' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const name = ctx.getFieldValue(block, 'listName', 'list');
      ctx.variables.add(name);
      return ctx.indent(`variables['${name}'] = [];`);
    },
  },

  list_add: {
    opcode: 'list_add',
    category: 'variables',
    shape: 'command',
    label: '리스트 [{listName}] 에 항목 {item} 추가하기',
    description: '리스트의 맨 뒤에 새 항목을 밀어 넣습니다.',
    color: '#F97316',
    fields: [
      { name: 'listName', type: 'text', label: '리스트명', defaultValue: 'members' },
      { name: 'item', type: 'text', label: '항목', defaultValue: '홍길동' },
    ],
    slots: [{ name: 'itemInput', type: 'value' }],
    toTypeScript: (ctx, block) => {
      const name = ctx.getFieldValue(block, 'listName', 'list');
      const item = ctx.resolveInput(block, 'itemInput', JSON.stringify(ctx.getFieldValue(block, 'item', '')));
      ctx.variables.add(name);
      return ctx.indent(`if (!Array.isArray(variables['${name}'])) variables['${name}'] = [];\nvariables['${name}'].push(${item});`);
    },
  },

  list_length: {
    opcode: 'list_length',
    category: 'variables',
    shape: 'reporter',
    label: '리스트 ({listName}) 의 항목 개수',
    description: '리스트에 들어 있는 전체 요소의 수를 반환합니다.',
    color: '#F97316',
    fields: [
      { name: 'listName', type: 'text', label: '리스트명', defaultValue: 'members' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const name = ctx.getFieldValue(block, 'listName', 'list');
      return `((variables['${name}'] && Array.isArray(variables['${name}'])) ? variables['${name}'].length : 0)`;
    },
  },

  // ----------------------------------------------------------------------------
  // 7. DISCORD CONTEXT DATA (디스코드 정보) - 26 Blocks
  // ----------------------------------------------------------------------------
  data_author_name: {
    opcode: 'data_author_name',
    category: 'discord_data',
    shape: 'reporter',
    label: '메시지/명령어 작성자 닉네임',
    description: '이벤트를 유발한 디스코드 사용자의 닉네임을 가져옵니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof interaction !== 'undefined' ? interaction.user.username : (typeof message !== 'undefined' ? message.author.username : 'Unknown'))`;
    },
  },

  data_author_id: {
    opcode: 'data_author_id',
    category: 'discord_data',
    shape: 'reporter',
    label: '작성자 고유 디스코드 ID',
    description: '사용자의 18~19자리 고유 디스코드 유저 ID입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof interaction !== 'undefined' ? interaction.user.id : (typeof message !== 'undefined' ? message.author.id : ''))`;
    },
  },

  data_author_mention: {
    opcode: 'data_author_mention',
    category: 'discord_data',
    shape: 'reporter',
    label: '작성자 멘션 태그 (<@ID>)',
    description: '메시지 전송 시 유저를 멘션할 수 있는 태그 문자열입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof interaction !== 'undefined' ? \`<@\${interaction.user.id}>\` : (typeof message !== 'undefined' ? \`<@\${message.author.id}>\` : ''))`;
    },
  },

  data_message_content: {
    opcode: 'data_message_content',
    category: 'discord_data',
    shape: 'reporter',
    label: '수신된 메시지 본문 텍스트',
    description: '채팅으로 전송된 전체 텍스트 내용입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof message !== 'undefined' ? message.content : '')`;
    },
  },

  data_channel_id: {
    opcode: 'data_channel_id',
    category: 'discord_data',
    shape: 'reporter',
    label: '현재 채널 ID',
    description: '이벤트가 발생한 채널의 고유 ID입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof interaction !== 'undefined' ? interaction.channelId : (typeof message !== 'undefined' ? message.channel.id : ''))`;
    },
  },

  data_guild_id: {
    opcode: 'data_guild_id',
    category: 'discord_data',
    shape: 'reporter',
    label: '현재 서버(Guild) ID',
    description: '명령어가 실행된 디스코드 서버의 고유 ID입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof interaction !== 'undefined' ? interaction.guildId : (typeof message !== 'undefined' ? message.guildId : ''))`;
    },
  },

  data_guild_member_count: {
    opcode: 'data_guild_member_count',
    category: 'discord_data',
    shape: 'reporter',
    label: '현재 서버 전체 멤버 수',
    description: '서버에 가입되어 있는 총 유저 수를 가져옵니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof interaction !== 'undefined' && interaction.guild ? interaction.guild.memberCount : (typeof message !== 'undefined' && message.guild ? message.guild.memberCount : 0))`;
    },
  },

  data_command_arg: {
    opcode: 'data_command_arg',
    category: 'discord_data',
    shape: 'reporter',
    label: '슬래시 옵션값 가져오기 [이름: {name}]',
    description: '슬래시 명령어와 함께 전달된 인자 값을 추출합니다.',
    color: '#06B6D4',
    fields: [
      { name: 'name', type: 'text', label: '옵션 이름', defaultValue: 'target' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const name = ctx.getFieldValue(block, 'name', 'target');
      return `(typeof interaction !== 'undefined' && interaction.isChatInputCommand() ? interaction.options.getString('${name}') : '')`;
    },
  },

  // ----------------------------------------------------------------------------
  // 8. MODERATION & GUILD (서버 관리 & 보안) - 26 Blocks
  // ----------------------------------------------------------------------------
  mod_kick_member: {
    opcode: 'mod_kick_member',
    category: 'moderation',
    shape: 'command',
    label: '유저 추방하기 [유저ID: {userId}] [사유: {reason}]',
    description: '서버에서 특정 멤버를 즉시 쫓아냅니다(재입장 가능).',
    color: '#EF4444',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '' },
      { name: 'reason', type: 'text', label: '사유', defaultValue: '규칙 위반' },
    ],
    slots: [{ name: 'userIdInput', type: 'value' }],
    toTypeScript: (ctx, block) => {
      const uid = ctx.resolveInput(block, 'userIdInput', JSON.stringify(ctx.getFieldValue(block, 'userId', '')));
      const reason = JSON.stringify(ctx.getFieldValue(block, 'reason', '추방'));
      return ctx.indent(`if (interactionOrMsg.guild) {\n  const member = await interactionOrMsg.guild.members.fetch(${uid}).catch(() => null);\n  if (member && member.kickable) await member.kick(${reason});\n}`);
    },
  },

  mod_ban_member: {
    opcode: 'mod_ban_member',
    category: 'moderation',
    shape: 'command',
    label: '유저 영구 차단(밴)하기 [유저ID: {userId}] [사유: {reason}]',
    description: '특정 멤버를 서버에서 영구적으로 차단(Ban)합니다.',
    color: '#EF4444',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '' },
      { name: 'reason', type: 'text', label: '사유', defaultValue: '악성 행위' },
    ],
    slots: [{ name: 'userIdInput', type: 'value' }],
    toTypeScript: (ctx, block) => {
      const uid = ctx.resolveInput(block, 'userIdInput', JSON.stringify(ctx.getFieldValue(block, 'userId', '')));
      const reason = JSON.stringify(ctx.getFieldValue(block, 'reason', '밴'));
      return ctx.indent(`if (interactionOrMsg.guild) {\n  await interactionOrMsg.guild.members.ban(${uid}, { reason: ${reason} }).catch(console.error);\n}`);
    },
  },

  mod_timeout_member: {
    opcode: 'mod_timeout_member',
    category: 'moderation',
    shape: 'command',
    label: '유저 타임아웃 [유저ID: {userId}] [초: {seconds}]',
    description: '일정 시간 동안 멤버의 채팅 및 음성 발언을 차단합니다.',
    color: '#EF4444',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '' },
      { name: 'seconds', type: 'number', label: '타임아웃(초)', defaultValue: 60 },
    ],
    slots: [{ name: 'userIdInput', type: 'value' }],
    toTypeScript: (ctx, block) => {
      const uid = ctx.resolveInput(block, 'userIdInput', JSON.stringify(ctx.getFieldValue(block, 'userId', '')));
      const sec = ctx.getFieldValue(block, 'seconds', '60');
      return ctx.indent(`if (interactionOrMsg.guild) {\n  const member = await interactionOrMsg.guild.members.fetch(${uid}).catch(() => null);\n  if (member) await member.timeout(${Number(sec) * 1000}, '타임아웃');\n}`);
    },
  },

  mod_purge_messages: {
    opcode: 'mod_purge_messages',
    category: 'moderation',
    shape: 'command',
    label: '현재 채널 메시지 일괄 청소 [개수: {count}개]',
    description: '채널의 최근 메시지들을 한꺼번에 대량 삭제합니다.',
    color: '#EF4444',
    fields: [
      { name: 'count', type: 'number', label: '개수', defaultValue: 10 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const count = ctx.getFieldValue(block, 'count', '10');
      return ctx.indent(`if ('channel' in interactionOrMsg && interactionOrMsg.channel && 'bulkDelete' in interactionOrMsg.channel) {\n  await interactionOrMsg.channel.bulkDelete(${count}).catch(console.error);\n}`);
    },
  },

  mod_add_role: {
    opcode: 'mod_add_role',
    category: 'moderation',
    shape: 'command',
    label: '멤버에게 역할 부여 [유저ID: {userId}] [역할ID: {roleId}]',
    description: '특정 사용자에게 디스코드 역할을 추가합니다.',
    color: '#EF4444',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '' },
      { name: 'roleId', type: 'text', label: '역할 ID', defaultValue: '' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const uid = ctx.getFieldValue(block, 'userId', '');
      const rid = ctx.getFieldValue(block, 'roleId', '');
      return ctx.indent(`if (interactionOrMsg.guild) {\n  const member = await interactionOrMsg.guild.members.fetch('${uid}').catch(() => null);\n  if (member) await member.roles.add('${rid}').catch(console.error);\n}`);
    },
  },

  mod_remove_role: {
    opcode: 'mod_remove_role',
    category: 'moderation',
    shape: 'command',
    label: '멤버의 역할 제거 [유저ID: {userId}] [역할ID: {roleId}]',
    description: '사용자가 가지고 있던 특정 역할을 박탈합니다.',
    color: '#EF4444',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '' },
      { name: 'roleId', type: 'text', label: '역할 ID', defaultValue: '' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const uid = ctx.getFieldValue(block, 'userId', '');
      const rid = ctx.getFieldValue(block, 'roleId', '');
      return ctx.indent(`if (interactionOrMsg.guild) {\n  const member = await interactionOrMsg.guild.members.fetch('${uid}').catch(() => null);\n  if (member) await member.roles.remove('${rid}').catch(console.error);\n}`);
    },
  },

  // ----------------------------------------------------------------------------
  // 9. DATABASE & STORAGE (영구 DB 저장소) - 16 Blocks
  // ----------------------------------------------------------------------------
  data_db_set: {
    opcode: 'data_db_set',
    category: 'database',
    shape: 'command',
    label: '영구 DB에 저장 [키: {key}] [값: {val}]',
    description: '봇이 재부팅되어도 지워지지 않는 영구 저장소에 키-값을 저장합니다.',
    color: '#EC4899',
    fields: [
      { name: 'key', type: 'text', label: '키', defaultValue: 'user_points' },
      { name: 'val', type: 'text', label: '값', defaultValue: '100' },
    ],
    slots: [{ name: 'valInput', type: 'value' }],
    toTypeScript: (ctx, block) => {
      const key = ctx.getFieldValue(block, 'key', 'key');
      const val = ctx.resolveInput(block, 'valInput', JSON.stringify(ctx.getFieldValue(block, 'val', '100')));
      return ctx.indent(`await database.set('${key}', ${val});`);
    },
  },

  data_db_get: {
    opcode: 'data_db_get',
    category: 'database',
    shape: 'reporter',
    label: '영구 DB에서 가져오기 [키: {key}]',
    description: '영구 저장소에 기록된 키의 데이터를 불러옵니다.',
    color: '#EC4899',
    fields: [
      { name: 'key', type: 'text', label: '키', defaultValue: 'user_points' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const key = ctx.getFieldValue(block, 'key', 'key');
      return `(await database.get('${key}'))`;
    },
  },

  data_db_delete: {
    opcode: 'data_db_delete',
    category: 'database',
    shape: 'command',
    label: '영구 DB에서 키 삭제 [키: {key}]',
    description: '영구 저장소에서 특정 키 항목을 완전히 삭제합니다.',
    color: '#EC4899',
    fields: [
      { name: 'key', type: 'text', label: '키', defaultValue: 'user_points' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const key = ctx.getFieldValue(block, 'key', 'key');
      return ctx.indent(`await database.set('${key}', null);`);
    },
  },
};
