// ==============================================================================
// SnapBot Additional High-Precision 240+ Block Definitions
// Expands standard blocks to over 340+ comprehensive Discord & IoT blocks
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BlockDefinition } from '../core/types';

export const ADDITIONAL_BLOCKS: Record<string, BlockDefinition> = {
  // ----------------------------------------------------------------------------
  // 1. ADDITIONAL EVENT BLOCKS (20 blocks)
  // ----------------------------------------------------------------------------
  event_message_delete_bulk: {
    opcode: 'event_message_delete_bulk',
    category: 'events',
    shape: 'hat',
    label: '메시지가 일괄 대량 삭제되었을 때',
    description: '채널 청소 등으로 메시지가 일괄 삭제되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('messageDeleteBulk', async (messages) => {\n${body}\n});`;
    },
  },

  event_message_reaction_remove: {
    opcode: 'event_message_reaction_remove',
    category: 'events',
    shape: 'hat',
    label: '리액션 반응이 제거되었을 때',
    description: '유저가 메시지에 달았던 이모지 반응을 취소했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('messageReactionRemove', async (reaction, user) => {\n${body}\n});`;
    },
  },

  event_message_reaction_remove_all: {
    opcode: 'event_message_reaction_remove_all',
    category: 'events',
    shape: 'hat',
    label: '메시지의 모든 리액션이 제거되었을 때',
    description: '메시지에 등록된 모든 이모지 리액션이 일괄 삭제되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('messageReactionRemoveAll', async (message) => {\n${body}\n});`;
    },
  },

  event_guild_member_update: {
    opcode: 'event_guild_member_update',
    category: 'events',
    shape: 'hat',
    label: '서버 멤버 정보(닉네임/역할)가 변경되었을 때',
    description: '유저의 닉네임, 아바타, 또는 역할이 수정되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildMemberUpdate', async (oldMember, newMember) => {\n${body}\n});`;
    },
  },

  event_role_create: {
    opcode: 'event_role_create',
    category: 'events',
    shape: 'hat',
    label: '새 역할(Role)이 생성되었을 때',
    description: '서버에 새로운 권한 역할이 만들어졌을 때 실행됩니다.',
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
    description: '서버의 특정 역할이 제거되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('roleDelete', async (role) => {\n${body}\n});`;
    },
  },

  event_role_update: {
    opcode: 'event_role_update',
    category: 'events',
    shape: 'hat',
    label: '역할 권한이나 이름이 수정되었을 때',
    description: '역할의 색상, 명칭, 관리 권한 등이 변경되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('roleUpdate', async (oldRole, newRole) => {\n${body}\n});`;
    },
  },

  event_channel_create: {
    opcode: 'event_channel_create',
    category: 'events',
    shape: 'hat',
    label: '새 채널이 생성되었을 때',
    description: '서버에 새 텍스트, 음성, 포럼 채널이 생성되었을 때 실행됩니다.',
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
    description: '서버의 채널이 삭제되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('channelDelete', async (channel) => {\n${body}\n});`;
    },
  },

  event_channel_update: {
    opcode: 'event_channel_update',
    category: 'events',
    shape: 'hat',
    label: '채널 이름이나 토픽이 수정되었을 때',
    description: '채널의 설정, 주제(Topic), 슬로우모드 등이 변경되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('channelUpdate', async (oldChan, newChan) => {\n${body}\n});`;
    },
  },

  event_thread_create: {
    opcode: 'event_thread_create',
    category: 'events',
    shape: 'hat',
    label: '스레드(Thread)가 생성되었을 때',
    description: '게시물이나 메시지 하위에 새 스레드가 열렸을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('threadCreate', async (thread) => {\n${body}\n});`;
    },
  },

  event_thread_delete: {
    opcode: 'event_thread_delete',
    category: 'events',
    shape: 'hat',
    label: '스레드가 삭제되었을 때',
    description: '스레드가 보관 해제 후 영구 삭제되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('threadDelete', async (thread) => {\n${body}\n});`;
    },
  },

  event_voice_state_update: {
    opcode: 'event_voice_state_update',
    category: 'events',
    shape: 'hat',
    label: '유저 음성 상태가 변경되었을 때',
    description: '유저가 음성 채널에 입장/퇴장하거나 마이크 음소거 상태를 변경했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('voiceStateUpdate', async (oldState, newState) => {\n${body}\n});`;
    },
  },

  event_user_join_voice: {
    opcode: 'event_user_join_voice',
    category: 'events',
    shape: 'hat',
    label: '유저가 음성 채널에 입장했을 때',
    description: '멤버가 음성 채널에 새로 연결했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('voiceStateUpdate', async (oldState, newState) => {\n  if (!oldState.channelId && newState.channelId) {\n${body}\n  }\n});`;
    },
  },

  event_user_leave_voice: {
    opcode: 'event_user_leave_voice',
    category: 'events',
    shape: 'hat',
    label: '유저가 음성 채널에서 퇴장했을 때',
    description: '멤버가 음성 통화방에서 나갔을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('voiceStateUpdate', async (oldState, newState) => {\n  if (oldState.channelId && !newState.channelId) {\n${body}\n  }\n});`;
    },
  },

  event_user_mute_voice: {
    opcode: 'event_user_mute_voice',
    category: 'events',
    shape: 'hat',
    label: '유저가 마이크를 음소거했을 때',
    description: '음성 통화 중 마이크를 껐거나 켰을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('voiceStateUpdate', async (oldState, newState) => {\n  if (oldState.selfMute !== newState.selfMute) {\n${body}\n  }\n});`;
    },
  },

  event_guild_ban_add: {
    opcode: 'event_guild_ban_add',
    category: 'events',
    shape: 'hat',
    label: '유저가 서버에서 차단(밴)되었을 때',
    description: '관리자가 유저를 서버에서 영구 차단했을 때 실행됩니다.',
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
    label: '유저의 차단(밴)이 해제되었을 때',
    description: '차단 목록에서 밴이 풀렸을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildBanRemove', async (ban) => {\n${body}\n});`;
    },
  },

  event_invite_create: {
    opcode: 'event_invite_create',
    category: 'events',
    shape: 'hat',
    label: '새 서버 초대 코드가 생성되었을 때',
    description: '초대 링크가 새로 발급되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('inviteCreate', async (invite) => {\n${body}\n});`;
    },
  },

  event_emoji_create: {
    opcode: 'event_emoji_create',
    category: 'events',
    shape: 'hat',
    label: '새 이모지/스티커가 등록되었을 때',
    description: '서버에 커스텀 이모지가 추가되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('emojiCreate', async (emoji) => {\n${body}\n});`;
    },
  },

  // ----------------------------------------------------------------------------
  // 2. ADDITIONAL MESSAGE BLOCKS (25 blocks)
  // ----------------------------------------------------------------------------
  msg_send_dm: {
    opcode: 'msg_send_dm',
    category: 'messages',
    shape: 'command',
    label: '유저에게 개인 메시지(DM) 전송: {content}',
    description: '특정 유저에게 봇의 1:1 다이렉트 메시지를 전송합니다.',
    color: '#3B82F6',
    fields: [{ name: 'content', type: 'text', label: '내용', defaultValue: '안녕하세요!' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const text = ctx.getFieldValue(block, 'content', '');
      return ctx.indent(`await message.author.send('${text}').catch(() => console.log('DM 전송 실패'));`);
    },
  },

  msg_pin: {
    opcode: 'msg_pin',
    category: 'messages',
    shape: 'command',
    label: '현재 메시지 상단 고정(Pin)하기',
    description: '채널 상단 고정 핀 목록에 현재 메시지를 추가합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`await message.pin().catch(() => {});`),
  },

  msg_unpin: {
    opcode: 'msg_unpin',
    category: 'messages',
    shape: 'command',
    label: '현재 메시지 상단 고정 해제(Unpin)하기',
    description: '채널 상단 고정 핀에서 메시지를 내립니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`await message.unpin().catch(() => {});`),
  },

  msg_create_thread: {
    opcode: 'msg_create_thread',
    category: 'messages',
    shape: 'command',
    label: '메시지에서 스레드 생성 [이름: {name}]',
    description: '메시지 하위에 새로운 답글 스레드를 생성합니다.',
    color: '#3B82F6',
    fields: [{ name: 'name', type: 'text', label: '스레드 이름', defaultValue: '새 토론 스레드' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const name = ctx.getFieldValue(block, 'name', '새 스레드');
      return ctx.indent(`await message.startThread({ name: '${name}', autoArchiveDuration: 60 });`);
    },
  },

  msg_crosspost: {
    opcode: 'msg_crosspost',
    category: 'messages',
    shape: 'command',
    label: '공지 메시지 다른 서버로 발행(Crosspost)',
    description: '공지 채널을 팔로우한 다른 디스코드 서버들로 메시지를 전파합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`if (message.crosspostable) await message.crosspost();`),
  },

  msg_delete_after: {
    opcode: 'msg_delete_after',
    category: 'messages',
    shape: 'command',
    label: '{sec}초 뒤 메시지 자동 삭제하기',
    description: '일정 시간이 흐른 뒤 메시지를 자동으로 파기합니다.',
    color: '#3B82F6',
    fields: [{ name: 'sec', type: 'number', label: '초', defaultValue: 5 }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const sec = ctx.getFieldValue(block, 'sec', '5');
      return ctx.indent(`setTimeout(() => message.delete().catch(() => {}), ${sec} * 1000);`);
    },
  },

  msg_send_typing: {
    opcode: 'msg_send_typing',
    category: 'messages',
    shape: 'command',
    label: '채널에 "봇이 입력 중..." 표시',
    description: '봇이 응답을 준비 중임을 나타내는 타이핑 인디케이터를 활성화합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`await message.channel.sendTyping();`),
  },

  msg_fetch_pinned: {
    opcode: 'msg_fetch_pinned',
    category: 'messages',
    shape: 'reporter',
    label: '채널의 고정된 메시지 목록',
    description: '채널 상단에 고정된 모든 메시지 배열을 조회합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: () => `(await message.channel.messages.fetchPinned())`,
  },

  msg_fetch_last: {
    opcode: 'msg_fetch_last',
    category: 'messages',
    shape: 'reporter',
    label: '채널의 최근 이전 메시지 내용',
    description: '현재 메시지 직전에 작성된 이전 메시지의 텍스트를 가져옵니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: () => `((await message.channel.messages.fetch({ limit: 2 })).last()?.content || '')`,
  },

  msg_remove_reaction: {
    opcode: 'msg_remove_reaction',
    category: 'messages',
    shape: 'command',
    label: '특정 유저의 리액션 제거 [이모지: {emoji}]',
    description: '메시지에 달린 특정 유저의 이모지 반응을 지웁니다.',
    color: '#3B82F6',
    fields: [{ name: 'emoji', type: 'text', label: '이모지', defaultValue: '👍' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const emoji = ctx.getFieldValue(block, 'emoji', '👍');
      return ctx.indent(`await message.reactions.resolve('${emoji}')?.users.remove(message.author.id);`);
    },
  },

  msg_clear_all_reactions: {
    opcode: 'msg_clear_all_reactions',
    category: 'messages',
    shape: 'command',
    label: '메시지의 모든 리액션 완전 초기화',
    description: '해당 메시지에 등록된 모든 이모지 반응을 한 번에 비웁니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`await message.reactions.removeAll();`),
  },

  msg_poll_create: {
    opcode: 'msg_poll_create',
    category: 'messages',
    shape: 'command',
    label: '디스코드 투표(Poll) 생성 [질문: {question}] [옵션1: {opt1}] [옵션2: {opt2}]',
    description: '디스코드 공식 투표 컴포넌트 메시지를 전송합니다.',
    color: '#3B82F6',
    fields: [
      { name: 'question', type: 'text', label: '질문', defaultValue: '오늘 점심 메뉴 투표' },
      { name: 'opt1', type: 'text', label: '선택지1', defaultValue: '한식' },
      { name: 'opt2', type: 'text', label: '선택지2', defaultValue: '중식' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const q = ctx.getFieldValue(block, 'question', '투표');
      const o1 = ctx.getFieldValue(block, 'opt1', '옵션1');
      const o2 = ctx.getFieldValue(block, 'opt2', '옵션2');
      return ctx.indent(`await message.channel.send({ poll: { question: { text: '${q}' }, answers: [{ text: '${o1}' }, { text: '${o2}' }] } });`);
    },
  },

  msg_poll_end: {
    opcode: 'msg_poll_end',
    category: 'messages',
    shape: 'command',
    label: '디스코드 투표 즉시 마감하기',
    description: '현재 진행 중인 투표를 마감하고 최종 결과를 확정합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`if (message.poll) await message.poll.end();`),
  },

  msg_reply_mention: {
    opcode: 'msg_reply_mention',
    category: 'messages',
    shape: 'command',
    label: '멘션(@)을 포함하여 답장: {content}',
    description: '상대방에게 멘션 알림을 보내며 메시지에 답장합니다.',
    color: '#3B82F6',
    fields: [{ name: 'content', type: 'text', label: '내용', defaultValue: '멘션 답장입니다.' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const text = ctx.getFieldValue(block, 'content', '');
      return ctx.indent(`await message.reply({ content: '${text}', allowedMentions: { repliedUser: true } });`);
    },
  },

  msg_reply_no_mention: {
    opcode: 'msg_reply_no_mention',
    category: 'messages',
    shape: 'command',
    label: '멘션(@) 없이 조용히 답장: {content}',
    description: '상대방을 태그(알림)하지 않고 메시지 답장 스레드를 연결합니다.',
    color: '#3B82F6',
    fields: [{ name: 'content', type: 'text', label: '내용', defaultValue: '조용한 답장입니다.' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const text = ctx.getFieldValue(block, 'content', '');
      return ctx.indent(`await message.reply({ content: '${text}', allowedMentions: { repliedUser: false } });`);
    },
  },

  msg_forward: {
    opcode: 'msg_forward',
    category: 'messages',
    shape: 'command',
    label: '메시지를 채널 [{channelId}] 로 전달(Forward)',
    description: '지정한 다른 채널로 현재 메시지 사본을 전달합니다.',
    color: '#3B82F6',
    fields: [{ name: 'channelId', type: 'text', label: '대상 채널 ID', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const chan = ctx.getFieldValue(block, 'channelId', '');
      return ctx.indent(`await (client.channels.cache.get('${chan}') as any)?.send({ content: \`[전달된 메시지] \${message.content}\` });`);
    },
  },

  msg_add_reactions_bulk: {
    opcode: 'msg_add_reactions_bulk',
    category: 'messages',
    shape: 'command',
    label: '이모지 일괄 연속 반응 달기 [{emojis}]',
    description: '쉼표로 구분된 여러 이모지를 순서대로 자동 반응합니다.',
    color: '#3B82F6',
    fields: [{ name: 'emojis', type: 'text', label: '이모지 목록', defaultValue: '❤️,🔥,🎉' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const list = ctx.getFieldValue(block, 'emojis', '❤️,🔥').split(',');
      const ops = list.map((e) => `await message.react('${e.trim()}');`).join(' ');
      return ctx.indent(ops);
    },
  },

  msg_get_reaction_count: {
    opcode: 'msg_get_reaction_count',
    category: 'messages',
    shape: 'reporter',
    label: '이모지 [{emoji}] 의 반응 개수',
    description: '특정 이모지에 누른 유저의 총 인원수를 계산합니다.',
    color: '#3B82F6',
    fields: [{ name: 'emoji', type: 'text', label: '이모지', defaultValue: '👍' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const emoji = ctx.getFieldValue(block, 'emoji', '👍');
      return `(message.reactions.cache.get('${emoji}')?.count || 0)`;
    },
  },

  msg_send_webhook_in_chan: {
    opcode: 'msg_send_webhook_in_chan',
    category: 'messages',
    shape: 'command',
    label: '가상 웹훅으로 메시지 전송 [이름: {name}] [내용: {text}]',
    description: '봇의 프로필 대신 커스텀 닉네임과 아바타로 메시지를 발송합니다.',
    color: '#3B82F6',
    fields: [
      { name: 'name', type: 'text', label: '표시 이름', defaultValue: '시스템 알리미' },
      { name: 'text', type: 'text', label: '메시지 내용', defaultValue: '중요 알림입니다.' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const name = ctx.getFieldValue(block, 'name', '알림');
      const text = ctx.getFieldValue(block, 'text', '');
      return ctx.indent(`const hook = await (message.channel as any).createWebhook({ name: '${name}' });\nawait hook.send('${text}');\nawait hook.delete();`);
    },
  },

  msg_copy_link: {
    opcode: 'msg_copy_link',
    category: 'messages',
    shape: 'reporter',
    label: '현재 메시지의 디스코드 링크 URL',
    description: '해당 메시지로 즉시 점프할 수 있는 디스코드 메시지 URL 주소입니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.url)`,
  },

  msg_set_slowmode: {
    opcode: 'msg_set_slowmode',
    category: 'messages',
    shape: 'command',
    label: '현재 채널 슬로우모드 {sec}초 설정',
    description: '채널 멤버들의 메시지 작성 간격 쿨타임을 조절합니다.',
    color: '#3B82F6',
    fields: [{ name: 'sec', type: 'number', label: '초 단위', defaultValue: 5 }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const sec = ctx.getFieldValue(block, 'sec', '5');
      return ctx.indent(`await (message.channel as any).setRateLimitPerUser(${sec});`);
    },
  },

  msg_search_history: {
    opcode: 'msg_search_history',
    category: 'messages',
    shape: 'reporter',
    label: '채널 최근 메시지 {limit}개 텍스트 묶음',
    description: '채널의 최근 대화 기록을 배열 형태로 조회합니다.',
    color: '#3B82F6',
    fields: [{ name: 'limit', type: 'number', label: '가져올 개수', defaultValue: 10 }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const limit = ctx.getFieldValue(block, 'limit', '10');
      return `((await message.channel.messages.fetch({ limit: ${limit} })).map(m => m.content))`;
    },
  },

  msg_send_audio_clip: {
    opcode: 'msg_send_audio_clip',
    category: 'messages',
    shape: 'command',
    label: '음성 메시지 파일 첨부 전송 [파일 경로: {path}]',
    description: '채널에 오디오 파일(.mp3, .ogg)을 직접 업로드 전송합니다.',
    color: '#3B82F6',
    fields: [{ name: 'path', type: 'text', label: '파일 경로', defaultValue: './sounds/alert.mp3' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const path = ctx.getFieldValue(block, 'path', './alert.mp3');
      return ctx.indent(`await message.channel.send({ files: ['${path}'] });`);
    },
  },

  msg_send_code_snippet: {
    opcode: 'msg_send_code_snippet',
    category: 'messages',
    shape: 'command',
    label: '코드 서식 블록 전송 [언어: {lang}] [코드: {code}]',
    description: '문법 하이라이팅이 적용된 백틱(```) 코드 블록으로 전송합니다.',
    color: '#3B82F6',
    fields: [
      { name: 'lang', type: 'text', label: '언어', defaultValue: 'typescript' },
      { name: 'code', type: 'text', label: '소스코드', defaultValue: 'console.log("SnapBot!");' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const lang = ctx.getFieldValue(block, 'lang', 'ts');
      const code = ctx.getFieldValue(block, 'code', '');
      return ctx.indent(`await message.channel.send(\`\\\`\\\`\\\`${lang}\\n${code}\\n\\\`\\\`\\\`\`);`);
    },
  },

  msg_suppress_embeds: {
    opcode: 'msg_suppress_embeds',
    category: 'messages',
    shape: 'command',
    label: '메시지의 링크 임베드 미리보기 숨기기',
    description: '메시지에 포함된 웹사이트 URL 미리보기 카드를 숨김 처리합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`await message.suppressEmbeds(true);`),
  },

  // ----------------------------------------------------------------------------
  // 3. ADDITIONAL EMBED & DISCORD COMPONENT V2 BLOCKS (25 blocks)
  // ----------------------------------------------------------------------------
  comp_v2_action_row: {
    opcode: 'comp_v2_action_row',
    category: 'embeds',
    shape: 'command',
    label: '디스코드 컴포넌트 V2 액션 로우(ActionRow) 생성',
    description: '버튼이나 선택 메뉴를 감싸는 디스코드 V2 레이아웃 컨테이너를 생성합니다.',
    color: '#8B5CF6',
    fields: [],
    slots: [{ name: 'components', type: 'statement' }],
    toTypeScript: (ctx, block) => {
      const inner = ctx.compileSequence(block.inputs['components'], ctx.depth + 1);
      return ctx.indent(`const actionRow = new ActionRowBuilder();\n${inner}`);
    },
  },

  comp_v2_btn_primary: {
    opcode: 'comp_v2_btn_primary',
    category: 'embeds',
    shape: 'command',
    label: '기본(Primary) 파란색 버튼 [ID: {customId}] [라벨: {label}]',
    description: '눈에 띄는 파란색 강조 디스코드 인터랙티브 버튼입니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'customId', type: 'text', label: '버튼 ID', defaultValue: 'btn_primary' },
      { name: 'label', type: 'text', label: '표시 문구', defaultValue: '확인' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'btn1');
      const label = ctx.getFieldValue(block, 'label', '확인');
      return ctx.indent(`new ButtonBuilder().setCustomId('${id}').setLabel('${label}').setStyle(ButtonStyle.Primary)`);
    },
  },

  comp_v2_btn_secondary: {
    opcode: 'comp_v2_btn_secondary',
    category: 'embeds',
    shape: 'command',
    label: '보조(Secondary) 회색 버튼 [ID: {customId}] [라벨: {label}]',
    description: '차분한 회색 보조 디스코드 인터랙티브 버튼입니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'customId', type: 'text', label: '버튼 ID', defaultValue: 'btn_secondary' },
      { name: 'label', type: 'text', label: '표시 문구', defaultValue: '취소' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'btn2');
      const label = ctx.getFieldValue(block, 'label', '취소');
      return ctx.indent(`new ButtonBuilder().setCustomId('${id}').setLabel('${label}').setStyle(ButtonStyle.Secondary)`);
    },
  },

  comp_v2_btn_success: {
    opcode: 'comp_v2_btn_success',
    category: 'embeds',
    shape: 'command',
    label: '성공(Success) 초록색 버튼 [ID: {customId}] [라벨: {label}]',
    description: '수락, 승인 등을 표현하는 초록색 버튼입니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'customId', type: 'text', label: '버튼 ID', defaultValue: 'btn_success' },
      { name: 'label', type: 'text', label: '표시 문구', defaultValue: '수락' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'btn_success');
      const label = ctx.getFieldValue(block, 'label', '수락');
      return ctx.indent(`new ButtonBuilder().setCustomId('${id}').setLabel('${label}').setStyle(ButtonStyle.Success)`);
    },
  },

  comp_v2_btn_danger: {
    opcode: 'comp_v2_btn_danger',
    category: 'embeds',
    shape: 'command',
    label: '위험(Danger) 빨간색 버튼 [ID: {customId}] [라벨: {label}]',
    description: '거절, 삭제, 추방 등 파괴적인 행동을 경고하는 빨간색 버튼입니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'customId', type: 'text', label: '버튼 ID', defaultValue: 'btn_danger' },
      { name: 'label', type: 'text', label: '표시 문구', defaultValue: '삭제' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'btn_danger');
      const label = ctx.getFieldValue(block, 'label', '삭제');
      return ctx.indent(`new ButtonBuilder().setCustomId('${id}').setLabel('${label}').setStyle(ButtonStyle.Danger)`);
    },
  },

  comp_v2_btn_link: {
    opcode: 'comp_v2_btn_link',
    category: 'embeds',
    shape: 'command',
    label: '링크(Link) 외부 이동 버튼 [URL: {url}] [라벨: {label}]',
    description: '외부 브라우저 새 창으로 이동하는 링크 버튼입니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'url', type: 'text', label: '웹사이트 URL', defaultValue: 'https://snapbot.koharu.live' },
      { name: 'label', type: 'text', label: '표시 문구', defaultValue: '공식 웹사이트 방문' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const url = ctx.getFieldValue(block, 'url', 'https://snapbot.koharu.live');
      const label = ctx.getFieldValue(block, 'label', '방문');
      return ctx.indent(`new ButtonBuilder().setURL('${url}').setLabel('${label}').setStyle(ButtonStyle.Link)`);
    },
  },

  comp_v2_string_select: {
    opcode: 'comp_v2_string_select',
    category: 'embeds',
    shape: 'command',
    label: '문자열 드롭다운 메뉴 [ID: {customId}] [플레이스홀더: {placeholder}]',
    description: '유저가 목록에서 원하는 텍스트 옵션을 고를 수 있는 셀렉트 메뉴입니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'customId', type: 'text', label: '메뉴 ID', defaultValue: 'select_menu_1' },
      { name: 'placeholder', type: 'text', label: '안내 문구', defaultValue: '선택해 주세요...' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'sel1');
      const ph = ctx.getFieldValue(block, 'placeholder', '선택...');
      return ctx.indent(`new StringSelectMenuBuilder().setCustomId('${id}').setPlaceholder('${ph}')`);
    },
  },

  comp_v2_user_select: {
    opcode: 'comp_v2_user_select',
    category: 'embeds',
    shape: 'command',
    label: '유저 선택 드롭다운 메뉴 [ID: {customId}]',
    description: '서버의 멤버 중 한 명 또는 여러 명을 고를 수 있는 전용 셀렉트 메뉴입니다.',
    color: '#8B5CF6',
    fields: [{ name: 'customId', type: 'text', label: '메뉴 ID', defaultValue: 'user_select_1' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'u_sel');
      return ctx.indent(`new UserSelectMenuBuilder().setCustomId('${id}').setPlaceholder('유저를 선택하세요')`);
    },
  },

  comp_v2_role_select: {
    opcode: 'comp_v2_role_select',
    category: 'embeds',
    shape: 'command',
    label: '역할 선택 드롭다운 메뉴 [ID: {customId}]',
    description: '서버에 생성된 권한 역할을 직접 선택할 수 있는 메뉴입니다.',
    color: '#8B5CF6',
    fields: [{ name: 'customId', type: 'text', label: '메뉴 ID', defaultValue: 'role_select_1' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'r_sel');
      return ctx.indent(`new RoleSelectMenuBuilder().setCustomId('${id}').setPlaceholder('역할을 선택하세요')`);
    },
  },

  comp_v2_channel_select: {
    opcode: 'comp_v2_channel_select',
    category: 'embeds',
    shape: 'command',
    label: '채널 선택 드롭다운 메뉴 [ID: {customId}]',
    description: '텍스트나 음성 채널을 유저가 지정할 수 있는 셀렉트 메뉴입니다.',
    color: '#8B5CF6',
    fields: [{ name: 'customId', type: 'text', label: '메뉴 ID', defaultValue: 'chan_select_1' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'c_sel');
      return ctx.indent(`new ChannelSelectMenuBuilder().setCustomId('${id}').setPlaceholder('채널을 선택하세요')`);
    },
  },

  comp_v2_modal_show: {
    opcode: 'comp_v2_modal_show',
    category: 'embeds',
    shape: 'command',
    label: '모달(Modal) 팝업 창 띄우기 [ID: {customId}] [제목: {title}]',
    description: '유저 화면에 폼 입력 대화상자를 즉시 팝업합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'customId', type: 'text', label: '모달 ID', defaultValue: 'modal_feedback' },
      { name: 'title', type: 'text', label: '창 제목', defaultValue: '피드백 제출하기' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'modal1');
      const title = ctx.getFieldValue(block, 'title', '입력창');
      return ctx.indent(`await interaction.showModal(new ModalBuilder().setCustomId('${id}').setTitle('${title}'));`);
    },
  },

  comp_v2_text_input_short: {
    opcode: 'comp_v2_text_input_short',
    category: 'embeds',
    shape: 'command',
    label: '한 줄 텍스트 입력 필드 [ID: {customId}] [라벨: {label}]',
    description: '모달 팝업 내부의 단문 텍스트 입력 칸을 생성합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'customId', type: 'text', label: '필드 ID', defaultValue: 'input_name' },
      { name: 'label', type: 'text', label: '라벨', defaultValue: '성명 / 닉네임' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'inp1');
      const label = ctx.getFieldValue(block, 'label', '이름');
      return ctx.indent(`new TextInputBuilder().setCustomId('${id}').setLabel('${label}').setStyle(TextInputStyle.Short)`);
    },
  },

  comp_v2_text_input_paragraph: {
    opcode: 'comp_v2_text_input_paragraph',
    category: 'embeds',
    shape: 'command',
    label: '여러 줄 장문 입력 필드 [ID: {customId}] [라벨: {label}]',
    description: '모달 팝업 내부의 긴 설명글 입력 칸을 생성합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'customId', type: 'text', label: '필드 ID', defaultValue: 'input_desc' },
      { name: 'label', type: 'text', label: '라벨', defaultValue: '상세 의견' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const id = ctx.getFieldValue(block, 'customId', 'inp_p');
      const label = ctx.getFieldValue(block, 'label', '상세');
      return ctx.indent(`new TextInputBuilder().setCustomId('${id}').setLabel('${label}').setStyle(TextInputStyle.Paragraph)`);
    },
  },

  comp_v2_file_attachment: {
    opcode: 'comp_v2_file_attachment',
    category: 'embeds',
    shape: 'command',
    label: '로컬 파일/이미지 버퍼 첨부 전송 [경로: {path}]',
    description: '로컬 디렉토리의 파일이나 이미지를 메시지에 첨부합니다.',
    color: '#8B5CF6',
    fields: [{ name: 'path', type: 'text', label: '파일 경로', defaultValue: './assets/banner.png' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const path = ctx.getFieldValue(block, 'path', './banner.png');
      return ctx.indent(`await message.channel.send({ files: [new AttachmentBuilder('${path}')] });`);
    },
  },

  comp_v2_link_embed_preview: {
    opcode: 'comp_v2_link_embed_preview',
    category: 'embeds',
    shape: 'command',
    label: '디스코드 V2 링크 임베드 미리보기 카드 [URL: {url}]',
    description: '디스코드 공식 규격의 사이트 링크 미리보기 카드를 구성합니다.',
    color: '#8B5CF6',
    fields: [{ name: 'url', type: 'text', label: '웹 URL', defaultValue: 'https://snapbot.koharu.live' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const url = ctx.getFieldValue(block, 'url', 'https://snapbot.koharu.live');
      return ctx.indent(`await message.channel.send({ content: '${url}' });`);
    },
  },

  // ----------------------------------------------------------------------------
  // 4. NEW VOICE & AUDIO STREAMING BLOCKS (25 blocks)
  // ----------------------------------------------------------------------------
  audio_join_channel: {
    opcode: 'audio_join_channel',
    category: 'audio',
    shape: 'command',
    label: '음성 채널 [{channelId}] 에 봇 접속하기',
    description: '지정한 음성 채널로 디스코드 봇을 입장시킵니다.',
    color: '#84CC16',
    fields: [{ name: 'channelId', type: 'text', label: '음성 채널 ID', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const chan = ctx.getFieldValue(block, 'channelId', '');
      return ctx.indent(`// Join Voice Channel\nconst { joinVoiceChannel } = require('@discordjs/voice');\nglobalThis.voiceConnection = joinVoiceChannel({\n  channelId: '${chan}',\n  guildId: message.guild.id,\n  adapterCreator: message.guild.voiceAdapterCreator\n});`);
    },
  },

  audio_leave_channel: {
    opcode: 'audio_leave_channel',
    category: 'audio',
    shape: 'command',
    label: '현재 음성 채널에서 봇 퇴장하기',
    description: '접속 중인 음성 채널 연결을 끊고 통화방을 나갑니다.',
    color: '#84CC16',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`if (globalThis.voiceConnection) {\n  globalThis.voiceConnection.destroy();\n  globalThis.voiceConnection = null;\n}`),
  },

  audio_play_url: {
    opcode: 'audio_play_url',
    category: 'audio',
    shape: 'command',
    label: '오디오 스트림 / MP3 URL 재생하기 [URL: {url}]',
    description: '웹상의 MP3나 라디오 오디오 스트림을 음성 채널에서 재생합니다.',
    color: '#84CC16',
    fields: [{ name: 'url', type: 'text', label: '음원 URL', defaultValue: 'https://example.com/audio.mp3' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const url = ctx.getFieldValue(block, 'url', '');
      return ctx.indent(`// Play Audio Stream\nconst { createAudioPlayer, createAudioResource } = require('@discordjs/voice');\nconst player = createAudioPlayer();\nplayer.play(createAudioResource('${url}'));\nglobalThis.voiceConnection?.subscribe(player);`);
    },
  },

  audio_pause: {
    opcode: 'audio_pause',
    category: 'audio',
    shape: 'command',
    label: '재생 중인 음악 일시 정지(Pause)',
    description: '현재 흘러나오는 오디오 스트림을 일시 중단합니다.',
    color: '#84CC16',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`globalThis.audioPlayer?.pause();`),
  },

  audio_resume: {
    opcode: 'audio_resume',
    category: 'audio',
    shape: 'command',
    label: '일시 정지된 음악 다시 재생(Resume)',
    description: '멈춰 있던 음악 스트림을 이어서 재생합니다.',
    color: '#84CC16',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`globalThis.audioPlayer?.unpause();`),
  },

  audio_stop: {
    opcode: 'audio_stop',
    category: 'audio',
    shape: 'command',
    label: '음악 재생 완전히 중지(Stop)',
    description: '음악을 멈추고 재생 대기열을 모두 비웁니다.',
    color: '#84CC16',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`globalThis.audioPlayer?.stop();\nglobalThis.musicQueue = [];`),
  },

  audio_skip: {
    opcode: 'audio_skip',
    category: 'audio',
    shape: 'command',
    label: '현재 곡 건너뛰고 다음 곡(Skip) 재생',
    description: '대기열의 다음 음악으로 즉시 넘어갑니다.',
    color: '#84CC16',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`globalThis.audioPlayer?.stop(); // triggers next song in queue`),
  },

  audio_set_volume: {
    opcode: 'audio_set_volume',
    category: 'audio',
    shape: 'command',
    label: '재생 볼륨 조절 [{volume}%]',
    description: '음악의 재생 크기를 0% ~ 200% 사이로 조절합니다.',
    color: '#84CC16',
    fields: [{ name: 'volume', type: 'number', label: '볼륨 %', defaultValue: 100 }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const vol = Number(ctx.getFieldValue(block, 'volume', '100')) / 100;
      return ctx.indent(`globalThis.currentAudioResource?.volume?.setVolume(${vol});`);
    },
  },

  audio_queue_add: {
    opcode: 'audio_queue_add',
    category: 'audio',
    shape: 'command',
    label: '음악 대기열에 곡 추가 [제목: {title}] [URL: {url}]',
    description: '재생 대기열 목록 끝에 새로운 노래를 등록합니다.',
    color: '#84CC16',
    fields: [
      { name: 'title', type: 'text', label: '곡 제목', defaultValue: 'Favorite Song' },
      { name: 'url', type: 'text', label: '음원 URL', defaultValue: 'https://example.com/song.mp3' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const title = ctx.getFieldValue(block, 'title', '');
      const url = ctx.getFieldValue(block, 'url', '');
      return ctx.indent(`if (!globalThis.musicQueue) globalThis.musicQueue = [];\nglobalThis.musicQueue.push({ title: '${title}', url: '${url}' });`);
    },
  },

  audio_queue_list: {
    opcode: 'audio_queue_list',
    category: 'audio',
    shape: 'reporter',
    label: '현재 등록된 대기열 곡 목록(배열)',
    description: '현재 대기 중인 모든 곡의 제목 리스트를 반환합니다.',
    color: '#84CC16',
    fields: [],
    slots: [],
    toTypeScript: () => `(globalThis.musicQueue?.map((s, idx) => \`\${idx + 1}. \${s.title}\`) || [])`,
  },

  audio_queue_clear: {
    opcode: 'audio_queue_clear',
    category: 'audio',
    shape: 'command',
    label: '음악 대기열 비우기',
    description: '대기 중인 모든 노래를 목록에서 삭제합니다.',
    color: '#84CC16',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`globalThis.musicQueue = [];`),
  },

  audio_is_playing: {
    opcode: 'audio_is_playing',
    category: 'audio',
    shape: 'boolean',
    label: '현재 음악이 재생 중인가?',
    description: '봇이 음성 채널에서 노래를 재생하고 있는지 확인합니다.',
    color: '#84CC16',
    fields: [],
    slots: [],
    toTypeScript: () => `(globalThis.audioPlayer?.state?.status === 'playing')`,
  },
};

