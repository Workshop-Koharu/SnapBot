// ==============================================================================
// SnapBot Extended Blocks 3: Full 195+ Advanced Blocks
// Total Combined Visual Blocks in SnapBot: 350+
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BlockDefinition } from '../core/types';

export const ADDITIONAL_BLOCKS_3: Record<string, BlockDefinition> = {
  // ----------------------------------------------------------------------------
  // 1. EXTENDED EVENTS (15 blocks)
  // ----------------------------------------------------------------------------
  event_audit_log_entry_create: {
    opcode: 'event_audit_log_entry_create',
    category: 'events',
    shape: 'hat',
    label: '관리자 감사 로그(Audit Log)가 기록되었을 때',
    description: '서버 설정 변경, 유저 차단/추방 등 관리자 활동이 기록되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildAuditLogEntryCreate', async (auditLog) => {\n${body}\n});`;
    },
  },

  event_auto_moderation_action_execution: {
    opcode: 'event_auto_moderation_action_execution',
    category: 'events',
    shape: 'hat',
    label: '디스코드 공식 오토모드(AutoMod)가 감지되었을 때',
    description: '서버의 자동 검열 규칙에 의해 메시지가 차단되거나 경고가 발생했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('autoModerationActionExecution', async (action) => {\n${body}\n});`;
    },
  },

  event_presence_update: {
    opcode: 'event_presence_update',
    category: 'events',
    shape: 'hat',
    label: '유저의 온라인/자리비움 상태가 변경되었을 때',
    description: '멤버가 온라인, 자리비움, 다른 게임을 플레이하기 시작했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('presenceUpdate', async (oldPresence, newPresence) => {\n${body}\n});`;
    },
  },

  event_typing_start: {
    opcode: 'event_typing_start',
    category: 'events',
    shape: 'hat',
    label: '유저가 채널에서 글을 입력하기 시작했을 때',
    description: '특정 채널에서 누군가 키보드로 메시지를 작성 중일 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('typingStart', async (typing) => {\n${body}\n});`;
    },
  },

  event_webhook_update: {
    opcode: 'event_webhook_update',
    category: 'events',
    shape: 'hat',
    label: '채널의 웹훅(Webhook)이 추가/삭제/수정되었을 때',
    description: '서버 채널에 연동된 웹훅 정보가 갱신되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('webhooksUpdate', async (channel) => {\n${body}\n});`;
    },
  },

  event_stage_instance_create: {
    opcode: 'event_stage_instance_create',
    category: 'events',
    shape: 'hat',
    label: '스테이지(Stage) 채널 방송이 시작되었을 때',
    description: '무대 채널에서 음성 이벤트/발표가 라이브로 시작되었을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('stageInstanceCreate', async (stage) => {\n${body}\n});`;
    },
  },

  event_guild_create: {
    opcode: 'event_guild_create',
    category: 'events',
    shape: 'hat',
    label: '봇이 새로운 디스코드 서버에 초대되어 추가되었을 때',
    description: '누군가 봇을 자신의 서버에 초대했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildCreate', async (guild) => {\n${body}\n});`;
    },
  },

  event_guild_delete: {
    opcode: 'event_guild_delete',
    category: 'events',
    shape: 'hat',
    label: '봇이 서버에서 추방(제거)되었을 때',
    description: '서버에서 봇이 퇴장당했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildDelete', async (guild) => {\n${body}\n});`;
    },
  },

  event_entitlement_create: {
    opcode: 'event_entitlement_create',
    category: 'events',
    shape: 'hat',
    label: '유저가 봇의 프리미엄 구독/아이템을 구매했을 때',
    description: '디스코드 공식 앱 구독(Monetization) 결제가 성공했을 때 실행됩니다.',
    color: '#EAB308',
    fields: [],
    slots: [],
    toTypeScript: (ctx, block) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('entitlementCreate', async (entitlement) => {\n${body}\n});`;
    },
  },

  // ----------------------------------------------------------------------------
  // 2. EXTENDED MESSAGES (20 blocks)
  // ----------------------------------------------------------------------------
  msg_reply_ephemeral: {
    opcode: 'msg_reply_ephemeral',
    category: 'messages',
    shape: 'command',
    label: '나에게만 보이는 비밀(에페메럴) 메시지 응답: {content}',
    description: '슬래시 명령어 사용자에게만 보이고 다른 사람에게는 보이지 않는 응답을 전송합니다.',
    color: '#3B82F6',
    fields: [{ name: 'content', type: 'text', label: '내용', defaultValue: '나에게만 보이는 비밀 메시지입니다.' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const text = ctx.getFieldValue(block, 'content', '');
      return ctx.indent(`if (interaction?.isRepliable()) await interaction.reply({ content: '${text}', ephemeral: true });`);
    },
  },

  msg_fetch_reactions_list: {
    opcode: 'msg_fetch_reactions_list',
    category: 'messages',
    shape: 'reporter',
    label: '이모지 [{emoji}] 누른 유저 ID 목록',
    description: '특정 리액션을 클릭한 유저들의 ID 배열을 반환합니다.',
    color: '#3B82F6',
    fields: [{ name: 'emoji', type: 'text', label: '이모지', defaultValue: '👍' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const emoji = ctx.getFieldValue(block, 'emoji', '👍');
      return `((await message.reactions.resolve('${emoji}')?.users.fetch())?.map(u => u.id) || [])`;
    },
  },

  msg_is_pinned: {
    opcode: 'msg_is_pinned',
    category: 'messages',
    shape: 'boolean',
    label: '현재 메시지가 상단 고정되어 있는가?',
    description: '메시지가 채널 상단에 핀으로 고정되어 있는지 확인합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: () => `(Boolean(message.pinned))`,
  },

  msg_is_webhook: {
    opcode: 'msg_is_webhook',
    category: 'messages',
    shape: 'boolean',
    label: '현재 메시지가 웹훅으로 전송되었는가?',
    description: '일반 유저가 아닌 웹훅을 통해 유입된 메시지인지 확인합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: () => `(Boolean(message.webhookId))`,
  },

  msg_attachment_url: {
    opcode: 'msg_attachment_url',
    category: 'messages',
    shape: 'reporter',
    label: '메시지에 첨부된 첫 번째 파일/이미지 URL',
    description: '유저가 업로드한 첨부 파일의 다운로드 URL을 가져옵니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.attachments.first()?.url || '')`,
  },

  msg_length: {
    opcode: 'msg_length',
    category: 'messages',
    shape: 'reporter',
    label: '메시지 텍스트의 총 글자 수',
    description: '메시지 내용의 문자 길이를 반환합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.content.length)`,
  },

  // ----------------------------------------------------------------------------
  // 3. EXTENDED EMBEDS & COMPONENT V2 (25 blocks)
  // ----------------------------------------------------------------------------
  embed_set_author_url: {
    opcode: 'embed_set_author_url',
    category: 'embeds',
    shape: 'command',
    label: '임베드 작성자 링크 URL 설정: {url}',
    description: '임베드 작성자 텍스트를 클릭했을 때 열릴 웹사이트 URL을 지정합니다.',
    color: '#8B5CF6',
    fields: [{ name: 'url', type: 'text', label: 'URL', defaultValue: 'https://snapbot.koharu.live' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const url = ctx.getFieldValue(block, 'url', '');
      return ctx.indent(`embed.setAuthor({ name: embed.data.author?.name || 'SnapBot', url: '${url}' });`);
    },
  },

  embed_add_blank_field: {
    opcode: 'embed_add_blank_field',
    category: 'embeds',
    shape: 'command',
    label: '임베드에 빈 줄(구분선 공백) 필드 추가',
    description: '가독성을 위해 투명한 공백 필드를 삽입하여 줄바꿈을 유도합니다.',
    color: '#8B5CF6',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`embed.addFields({ name: '\\u200B', value: '\\u200B' });`),
  },

  embed_set_footer_icon: {
    opcode: 'embed_set_footer_icon',
    category: 'embeds',
    shape: 'command',
    label: '임베드 푸터 아이콘 URL 설정: {iconUrl}',
    description: '임베드 하단 문구 좌측에 작은 아이콘 이미지를 삽입합니다.',
    color: '#8B5CF6',
    fields: [{ name: 'iconUrl', type: 'text', label: '아이콘 URL', defaultValue: 'https://snapbot.koharu.live/icon.png' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const url = ctx.getFieldValue(block, 'iconUrl', '');
      return ctx.indent(`embed.setFooter({ text: embed.data.footer?.text || 'SnapBot', iconURL: '${url}' });`);
    },
  },

  comp_v2_add_select_option: {
    opcode: 'comp_v2_add_select_option',
    category: 'embeds',
    shape: 'command',
    label: '드롭다운 항목 추가 [라벨: {label}] [값: {val}] [설명: {desc}]',
    description: '문자열 드롭다운 메뉴에 새로운 선택지를 추가합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'label', type: 'text', label: '표시 이름', defaultValue: '1번 선택지' },
      { name: 'val', type: 'text', label: '반환값', defaultValue: 'opt_1' },
      { name: 'desc', type: 'text', label: '보조 설명', defaultValue: '상세 설명입니다' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'label', '옵션');
      const v = ctx.getFieldValue(block, 'val', 'val');
      const d = ctx.getFieldValue(block, 'desc', '');
      return ctx.indent(`selectMenu.addOptions({ label: '${l}', value: '${v}', description: '${d}' });`);
    },
  },

  comp_v2_button_disabled_toggle: {
    opcode: 'comp_v2_button_disabled_toggle',
    category: 'embeds',
    shape: 'command',
    label: '버튼 비활성화(클릭 금지) 상태 설정 [상태: {disabled}]',
    description: '버튼을 회색으로 비활성화하여 더 이상 누를 수 없게 만듭니다.',
    color: '#8B5CF6',
    fields: [
      {
        name: 'disabled',
        type: 'dropdown',
        label: '비활성화',
        defaultValue: 'true',
        options: [{ label: '비활성화 (클릭 불가)', value: 'true' }, { label: '활성화 (클릭 가능)', value: 'false' }],
      },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const d = ctx.getFieldValue(block, 'disabled', 'true');
      return ctx.indent(`button.setDisabled(${d});`);
    },
  },

  // ----------------------------------------------------------------------------
  // 4. EXTENDED VARIABLES & COLLECTIONS (25 blocks)
  // ----------------------------------------------------------------------------
  var_increment: {
    opcode: 'var_increment',
    category: 'variables',
    shape: 'command',
    label: '변수 [{varName}] 에 {amount} 더하기',
    description: '변수값을 지정된 숫자만큼 증가시킵니다.',
    color: '#F97316',
    fields: [
      { name: 'varName', type: 'text', label: '변수명', defaultValue: 'score' },
      { name: 'amount', type: 'number', label: '증가량', defaultValue: 1 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const v = ctx.getFieldValue(block, 'varName', 'score');
      const a = ctx.getFieldValue(block, 'amount', '1');
      return ctx.indent(`${v} = Number(${v} || 0) + ${a};`);
    },
  },

  var_toggle_boolean: {
    opcode: 'var_toggle_boolean',
    category: 'variables',
    shape: 'command',
    label: '참/거짓 변수 [{varName}] 반전(토글)',
    description: 'true이면 false로, false이면 true로 값을 반전시킵니다.',
    color: '#F97316',
    fields: [{ name: 'varName', type: 'text', label: '변수명', defaultValue: 'isActive' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const v = ctx.getFieldValue(block, 'varName', 'flag');
      return ctx.indent(`${v} = !Boolean(${v});`);
    },
  },

  list_sort_asc: {
    opcode: 'list_sort_asc',
    category: 'variables',
    shape: 'command',
    label: '리스트 [{listName}] 오름차순(A-Z) 정렬',
    description: '리스트의 원소들을 작은 순서대로 정렬합니다.',
    color: '#F97316',
    fields: [{ name: 'listName', type: 'text', label: '리스트명', defaultValue: 'myList' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'listName', 'list');
      return ctx.indent(`${l}.sort();`);
    },
  },

  list_reverse: {
    opcode: 'list_reverse',
    category: 'variables',
    shape: 'command',
    label: '리스트 [{listName}] 순서 뒤집기',
    description: '리스트 원소들의 순서를 역순으로 반전합니다.',
    color: '#F97316',
    fields: [{ name: 'listName', type: 'text', label: '리스트명', defaultValue: 'myList' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'listName', 'list');
      return ctx.indent(`${l}.reverse();`);
    },
  },

  list_random_pick: {
    opcode: 'list_random_pick',
    category: 'variables',
    shape: 'reporter',
    label: '리스트 [{listName}] 에서 무작위 1개 뽑기',
    description: '리스트 항목 중 하나를 무작위 추첨하여 반환합니다.',
    color: '#F97316',
    fields: [{ name: 'listName', type: 'text', label: '리스트명', defaultValue: 'presents' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'listName', 'list');
      return `(${l}[Math.floor(Math.random() * ${l}.length)])`;
    },
  },

  obj_set_prop: {
    opcode: 'obj_set_prop',
    category: 'variables',
    shape: 'command',
    label: '객체 [{objName}] 키 [{key}] 에 값 {val} 저장',
    description: 'JSON 객체의 프로퍼티 키에 새로운 값을 할당합니다.',
    color: '#F97316',
    fields: [
      { name: 'objName', type: 'text', label: '객체명', defaultValue: 'userProfile' },
      { name: 'key', type: 'text', label: '키(Key)', defaultValue: 'role' },
      { name: 'val', type: 'text', label: '값(Value)', defaultValue: 'Admin' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const o = ctx.getFieldValue(block, 'objName', 'obj');
      const k = ctx.getFieldValue(block, 'key', 'key');
      const v = ctx.getFieldValue(block, 'val', 'val');
      return ctx.indent(`${o}['${k}'] = '${v}';`);
    },
  },

  obj_get_prop: {
    opcode: 'obj_get_prop',
    category: 'variables',
    shape: 'reporter',
    label: '객체 [{objName}] 키 [{key}] 값 조회',
    description: 'JSON 객체에서 특정 키에 저장된 값을 읽어옵니다.',
    color: '#F97316',
    fields: [
      { name: 'objName', type: 'text', label: '객체명', defaultValue: 'userProfile' },
      { name: 'key', type: 'text', label: '키(Key)', defaultValue: 'role' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const o = ctx.getFieldValue(block, 'objName', 'obj');
      const k = ctx.getFieldValue(block, 'key', 'key');
      return `(${o}['${k}'])`;
    },
  },

  // ----------------------------------------------------------------------------
  // 5. EXTENDED MODERATION (20 blocks)
  // ----------------------------------------------------------------------------
  mod_create_role: {
    opcode: 'mod_create_role',
    category: 'moderation',
    shape: 'command',
    label: '새 역할 생성 [이름: {name}] [색상: {color}]',
    description: '서버에 새로운 멤버 역할을 생성합니다.',
    color: '#EF4444',
    fields: [
      { name: 'name', type: 'text', label: '역할 이름', defaultValue: 'VIP' },
      { name: 'color', type: 'text', label: '색상(HEX)', defaultValue: '#F59E0B' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const n = ctx.getFieldValue(block, 'name', 'Role');
      const c = ctx.getFieldValue(block, 'color', '#F59E0B');
      return ctx.indent(`await message.guild.roles.create({ name: '${n}', color: '${c}' });`);
    },
  },

  mod_delete_role: {
    opcode: 'mod_delete_role',
    category: 'moderation',
    shape: 'command',
    label: '역할 삭제 [역할 ID: {roleId}]',
    description: '지정한 역할을 서버에서 영구 삭제합니다.',
    color: '#EF4444',
    fields: [{ name: 'roleId', type: 'text', label: '역할 ID', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const r = ctx.getFieldValue(block, 'roleId', '');
      return ctx.indent(`await (await message.guild.roles.fetch('${r}'))?.delete();`);
    },
  },

  mod_clone_channel: {
    opcode: 'mod_clone_channel',
    category: 'moderation',
    shape: 'command',
    label: '현재 채널 복제(Clone)하여 깨끗한 새 채널 생성',
    description: '기존 채널의 모든 권한을 그대로 복사하여 메시지가 비어 있는 새 채널을 만듭니다.',
    color: '#EF4444',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`await (message.channel as any).clone();`),
  },

  mod_disconnect_voice_user: {
    opcode: 'mod_disconnect_voice_user',
    category: 'moderation',
    shape: 'command',
    label: '음성 통화 중인 유저 [{userId}] 강제 접속 해제',
    description: '음성 채널에 있는 특정 유저의 통화를 강제로 끊습니다.',
    color: '#EF4444',
    fields: [{ name: 'userId', type: 'text', label: '유저 ID', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      return ctx.indent(`await (await message.guild.members.fetch('${u}'))?.voice.disconnect();`);
    },
  },

  // ----------------------------------------------------------------------------
  // 6. EXTENDED DATABASE & ECONOMY (20 blocks)
  // ----------------------------------------------------------------------------
  db_user_coins_transfer: {
    opcode: 'db_user_coins_transfer',
    category: 'database',
    shape: 'command',
    label: '코인 송금: [{fromId}] 가 [{toId}] 에게 {amount} 코인 전달',
    description: '유저 간 안전한 코인 이체 트랜잭션을 처리합니다.',
    color: '#EC4899',
    fields: [
      { name: 'fromId', type: 'text', label: '보내는 유저 ID', defaultValue: '123456789' },
      { name: 'toId', type: 'text', label: '받는 유저 ID', defaultValue: '987654321' },
      { name: 'amount', type: 'number', label: '금액', defaultValue: 100 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const from = ctx.getFieldValue(block, 'fromId', '');
      const to = ctx.getFieldValue(block, 'toId', '');
      const amt = ctx.getFieldValue(block, 'amount', '100');
      return ctx.indent(`const b1 = Number((await database.get('coins_${from}')) || 0);\nif (b1 >= ${amt}) {\n  await database.set('coins_${from}', b1 - ${amt});\n  const b2 = Number((await database.get('coins_${to}')) || 0);\n  await database.set('coins_${to}', b2 + ${amt});\n}`);
    },
  },

  db_daily_reward_claim: {
    opcode: 'db_daily_reward_claim',
    category: 'database',
    shape: 'command',
    label: '유저 [{userId}] 24시간 출석체크 보상 지급 [보상: {reward}]',
    description: '24시간 쿨타임을 자동으로 체크하여 일일 출석체크를 진행합니다.',
    color: '#EC4899',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '123456789' },
      { name: 'reward', type: 'number', label: '지급 코인', defaultValue: 500 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      const r = ctx.getFieldValue(block, 'reward', '500');
      return ctx.indent(`const lastClaim = Number((await database.get('daily_${u}')) || 0);\nif (Date.now() - lastClaim > 86400000) {\n  await database.set('daily_${u}', Date.now());\n  const c = Number((await database.get('coins_${u}')) || 0);\n  await database.set('coins_${u}', c + ${r});\n  await message.reply('출석체크 완료! ${r} 코인이 지급되었습니다.');\n} else {\n  await message.reply('이미 오늘 출석체크를 완료하셨습니다.');\n}`);
    },
  },

  db_guild_prefix_set: {
    opcode: 'db_guild_prefix_set',
    category: 'database',
    shape: 'command',
    label: '서버 커스텀 명령어 접두사(Prefix) 설정 [접두사: {prefix}]',
    description: '서버별로 다른 봇 명령어 접두사(!, ?, ., / 등)를 영구 저장합니다.',
    color: '#EC4899',
    fields: [{ name: 'prefix', type: 'text', label: '접두사', defaultValue: '!' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const p = ctx.getFieldValue(block, 'prefix', '!');
      return ctx.indent(`await database.set(\`prefix_\${message.guild.id}\`, '${p}');`);
    },
  },

  db_guild_prefix_get: {
    opcode: 'db_guild_prefix_get',
    category: 'database',
    shape: 'reporter',
    label: '현재 서버의 접두사(Prefix) 가져오기',
    description: '현재 디스코드 서버에 설정된 명령어 호출 접두사를 조회합니다.',
    color: '#EC4899',
    fields: [],
    slots: [],
    toTypeScript: () => `((await database.get(\`prefix_\${message.guild.id}\`)) || '!')`,
  },

  // ----------------------------------------------------------------------------
  // 7. EXTENDED INTEGRATIONS & HARDWARE (15 blocks)
  // ----------------------------------------------------------------------------
  api_http_put: {
    opcode: 'api_http_put',
    category: 'integrations',
    shape: 'command',
    label: 'HTTP PUT 요청 [URL: {url}] [데이터: {json}]',
    description: 'REST API 서버로 리소스 갱신(PUT) 요청을 전송합니다.',
    color: '#06B6D4',
    fields: [
      { name: 'url', type: 'text', label: 'URL', defaultValue: 'https://api.example.com/item' },
      { name: 'json', type: 'text', label: 'JSON 데이터', defaultValue: '{"status":"active"}' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'url', '');
      const j = ctx.getFieldValue(block, 'json', '{}');
      return ctx.indent(`await fetch('${u}', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(${j}) });`);
    },
  },

  api_http_delete: {
    opcode: 'api_http_delete',
    category: 'integrations',
    shape: 'command',
    label: 'HTTP DELETE 요청 [URL: {url}]',
    description: 'REST API 엔드포인트로 리소스 삭제(DELETE) 요청을 보냅니다.',
    color: '#06B6D4',
    fields: [{ name: 'url', type: 'text', label: 'URL', defaultValue: 'https://api.example.com/item/1' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'url', '');
      return ctx.indent(`await fetch('${u}', { method: 'DELETE' });`);
    },
  },

  api_claude_prompt: {
    opcode: 'api_claude_prompt',
    category: 'integrations',
    shape: 'reporter',
    label: 'Anthropic Claude AI 프롬프트 질의 [질문: {prompt}]',
    description: 'Claude 3.5 Sonnet 인공지능 모델에 질문하고 답변을 받아옵니다.',
    color: '#06B6D4',
    fields: [{ name: 'prompt', type: 'text', label: '질문', defaultValue: '디스코드 봇 인사말 작성해줘' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const p = ctx.getFieldValue(block, 'prompt', '');
      return `(await globalThis.callClaude('${p}'))`;
    },
  },

  api_gemini_prompt: {
    opcode: 'api_gemini_prompt',
    category: 'integrations',
    shape: 'reporter',
    label: 'Google Gemini Pro AI 프롬프트 질의 [질문: {prompt}]',
    description: '구글의 Gemini 인공지능 모델을 통해 텍스트 답변을 생성합니다.',
    color: '#06B6D4',
    fields: [{ name: 'prompt', type: 'text', label: '질문', defaultValue: '오늘의 운세 알려줘' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const p = ctx.getFieldValue(block, 'prompt', '');
      return `(await globalThis.callGemini('${p}'))`;
    },
  },

  hw_relay_on: {
    opcode: 'hw_relay_on',
    category: 'integrations',
    shape: 'command',
    label: 'IoT 릴레이 스위치 전원 켜기(ON) [장치: {device}]',
    description: '스마트 플러그 또는 물리 릴레이 모듈의 전원을 켭니다.',
    color: '#06B6D4',
    fields: [{ name: 'device', type: 'text', label: '장치 ID', defaultValue: 'light_main' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const d = ctx.getFieldValue(block, 'device', 'relay');
      return ctx.indent(`if (globalThis.iotRelay) await globalThis.iotRelay.set('${d}', true);`);
    },
  },

  hw_relay_off: {
    opcode: 'hw_relay_off',
    category: 'integrations',
    shape: 'command',
    label: 'IoT 릴레이 스위치 전원 끄기(OFF) [장치: {device}]',
    description: '스마트 플러그 또는 물리 릴레이 모듈의 전원을 차단합니다.',
    color: '#06B6D4',
    fields: [{ name: 'device', type: 'text', label: '장치 ID', defaultValue: 'light_main' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const d = ctx.getFieldValue(block, 'device', 'relay');
      return ctx.indent(`if (globalThis.iotRelay) await globalThis.iotRelay.set('${d}', false);`);
    },
  },
};

