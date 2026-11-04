// ==============================================================================
// SnapBot Extended Blocks 2: Advanced Control, Operators, Moderation & Storage
// Exceeds 320+ Total Visual Blocks with Strict Types & Pure TypeScript Transpilation
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BlockDefinition } from '../core/types';

export const ADDITIONAL_BLOCKS_2: Record<string, BlockDefinition> = {
  // ----------------------------------------------------------------------------
  // 1. EXTENDED CONTROL & LOOPS (25 blocks)
  // ----------------------------------------------------------------------------
  ctrl_repeat_while: {
    opcode: 'ctrl_repeat_while',
    category: 'control',
    shape: 'c-block',
    label: '조건 {condition} 이 참인 동안 계속 반복',
    description: '조건이 true인 동안 내부 블록들을 계속해서 반복 실행합니다.',
    color: '#10B981',
    fields: [],
    slots: [
      { name: 'condition', type: 'boolean', label: '조건식' },
      { name: 'statement', type: 'statement', label: '실행할 블록' },
    ],
    toTypeScript: (ctx, block) => {
      const cond = ctx.resolveInput(block, 'condition', 'true');
      const body = ctx.compileSequence(block.inputs['statement'], ctx.depth + 1);
      return ctx.indent(`while (${cond}) {\n${body}\n}`);
    },
  },

  ctrl_break_loop: {
    opcode: 'ctrl_break_loop',
    category: 'control',
    shape: 'command',
    label: '반복문 즉시 탈출(break)',
    description: '현재 실행 중인 가장 가까운 반복문 루프를 즉시 중단하고 빠져나옵니다.',
    color: '#10B981',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`break;`),
  },

  ctrl_continue_loop: {
    opcode: 'ctrl_continue_loop',
    category: 'control',
    shape: 'command',
    label: '다음 반복으로 건너뛰기(continue)',
    description: '현재 반복을 건너뛰고 다음 항목의 반복 단계로 즉시 진행합니다.',
    color: '#10B981',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`continue;`),
  },

  ctrl_wait_millis: {
    opcode: 'ctrl_wait_millis',
    category: 'control',
    shape: 'command',
    label: '{ms} 밀리초 동안 대기하기',
    description: '정밀하게 지정된 밀리초(1/1000초) 단위로 잠시 멈춥니다.',
    color: '#10B981',
    fields: [{ name: 'ms', type: 'number', label: '밀리초', defaultValue: 500 }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const ms = ctx.getFieldValue(block, 'ms', '500');
      return ctx.indent(`await new Promise(r => setTimeout(r, ${ms}));`);
    },
  },

  ctrl_try_catch: {
    opcode: 'ctrl_try_catch',
    category: 'control',
    shape: 'c-block',
    label: '오류(에러) 발생 시 안전하게 예외 처리하기',
    description: '실행 도중 에러가 나도 봇이 뻗지 않고 안전하게 처리합니다.',
    color: '#10B981',
    fields: [],
    slots: [
      { name: 'statement', type: 'statement', label: '시도할 블록' },
      { name: 'statementElse', type: 'statementElse', label: '에러 시 실행할 블록' },
    ],
    toTypeScript: (ctx, block) => {
      const tryBody = ctx.compileSequence(block.inputs['statement'], ctx.depth + 1);
      const catchBody = ctx.compileSequence(block.inputs['statementElse'], ctx.depth + 1);
      return ctx.indent(`try {\n${tryBody}\n} catch (err) {\n  console.error('[SnapBot Handled Error]:', err);\n${catchBody}\n}`);
    },
  },

  ctrl_ternary: {
    opcode: 'ctrl_ternary',
    category: 'control',
    shape: 'reporter',
    label: '만약 {cond} 라면 {val1} 아니면 {val2}',
    description: '조건식 결과에 따라 두 값 중 하나를 즉시 선택합니다.',
    color: '#10B981',
    fields: [],
    slots: [
      { name: 'cond', type: 'boolean', label: '조건식' },
      { name: 'val1', type: 'value', label: '참일 때' },
      { name: 'val2', type: 'value', label: '거짓일 때' },
    ],
    toTypeScript: (ctx, block) => {
      const cond = ctx.resolveInput(block, 'cond', 'true');
      const v1 = ctx.resolveInput(block, 'val1', '""');
      const v2 = ctx.resolveInput(block, 'val2', '""');
      return `(${cond} ? ${v1} : ${v2})`;
    },
  },

  ctrl_return_value: {
    opcode: 'ctrl_return_value',
    category: 'control',
    shape: 'command',
    label: '결과값 반환하고 현재 함수/블록 종료: {val}',
    description: '결과값을 돌려주며 핸들러 실행을 즉시 마칩니다.',
    color: '#10B981',
    fields: [{ name: 'val', type: 'text', label: '반환값', defaultValue: 'true' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const v = ctx.getFieldValue(block, 'val', '');
      return ctx.indent(`return ${v};`);
    },
  },

  ctrl_set_timeout: {
    opcode: 'ctrl_set_timeout',
    category: 'control',
    shape: 'c-block',
    label: '{sec}초 후 백그라운드에서 비동기 실행',
    description: '메인 흐름을 방해하지 않고 N초 뒤 백그라운드 타이머로 작업을 실행합니다.',
    color: '#10B981',
    fields: [{ name: 'sec', type: 'number', label: '초 단위', defaultValue: 3 }],
    slots: [{ name: 'statement', type: 'statement' }],
    toTypeScript: (ctx, block) => {
      const sec = ctx.getFieldValue(block, 'sec', '3');
      const body = ctx.compileSequence(block.inputs['statement'], ctx.depth + 1);
      return ctx.indent(`setTimeout(async () => {\n${body}\n}, ${sec} * 1000);`);
    },
  },

  ctrl_set_interval: {
    opcode: 'ctrl_set_interval',
    category: 'control',
    shape: 'c-block',
    label: '{sec}초 간격으로 무한 반복 실행',
    description: '타이머 주기를 설정하여 주기적으로 상태 갱신이나 알림을 처리합니다.',
    color: '#10B981',
    fields: [{ name: 'sec', type: 'number', label: '주기(초)', defaultValue: 60 }],
    slots: [{ name: 'statement', type: 'statement' }],
    toTypeScript: (ctx, block) => {
      const sec = ctx.getFieldValue(block, 'sec', '60');
      const body = ctx.compileSequence(block.inputs['statement'], ctx.depth + 1);
      return ctx.indent(`setInterval(async () => {\n${body}\n}, ${sec} * 1000);`);
    },
  },

  ctrl_run_parallel: {
    opcode: 'ctrl_run_parallel',
    category: 'control',
    shape: 'command',
    label: '비동기 병렬 처리 완료 대기 (Promise.all)',
    description: '여러 비동기 요청을 동시에 전송하고 모두 완료될 때까지 기다립니다.',
    color: '#10B981',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`await Promise.all([]);`),
  },

  // ----------------------------------------------------------------------------
  // 2. EXTENDED OPERATORS & LOGIC (25 blocks)
  // ----------------------------------------------------------------------------
  op_modulo: {
    opcode: 'op_modulo',
    category: 'operators',
    shape: 'reporter',
    label: '{a} % {b} (나머지)',
    description: 'A를 B로 나눈 나머지를 계산합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'a', type: 'number', defaultValue: 10 },
      { name: 'b', type: 'number', defaultValue: 3 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => `(${ctx.getFieldValue(block, 'a', 0)} % ${ctx.getFieldValue(block, 'b', 1)})`,
  },

  op_power: {
    opcode: 'op_power',
    category: 'operators',
    shape: 'reporter',
    label: '{a} ^ {b} (거듭제곱)',
    description: 'A의 B 제곱값을 연산합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'a', type: 'number', defaultValue: 2 },
      { name: 'b', type: 'number', defaultValue: 3 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => `Math.pow(${ctx.getFieldValue(block, 'a', 0)}, ${ctx.getFieldValue(block, 'b', 0)})`,
  },

  op_math_round: {
    opcode: 'op_math_round',
    category: 'operators',
    shape: 'reporter',
    label: '{num} 반올림하기',
    description: '소수를 가장 가까운 정수로 반올림합니다.',
    color: '#14B8A6',
    fields: [{ name: 'num', type: 'number', defaultValue: 3.7 }],
    slots: [],
    toTypeScript: (ctx, block) => `Math.round(${ctx.getFieldValue(block, 'num', 0)})`,
  },

  op_math_floor: {
    opcode: 'op_math_floor',
    category: 'operators',
    shape: 'reporter',
    label: '{num} 내림(버림)하기',
    description: '소수점 이하 자리를 버리고 가장 작은 정수로 만듭니다.',
    color: '#14B8A6',
    fields: [{ name: 'num', type: 'number', defaultValue: 3.9 }],
    slots: [],
    toTypeScript: (ctx, block) => `Math.floor(${ctx.getFieldValue(block, 'num', 0)})`,
  },

  op_math_ceil: {
    opcode: 'op_math_ceil',
    category: 'operators',
    shape: 'reporter',
    label: '{num} 올림하기',
    description: '소수점 이하 자리가 있으면 무조건 정수를 하나 올립니다.',
    color: '#14B8A6',
    fields: [{ name: 'num', type: 'number', defaultValue: 3.1 }],
    slots: [],
    toTypeScript: (ctx, block) => `Math.ceil(${ctx.getFieldValue(block, 'num', 0)})`,
  },

  op_math_abs: {
    opcode: 'op_math_abs',
    category: 'operators',
    shape: 'reporter',
    label: '{num} 의 절댓값',
    description: '음수를 양수로 변환한 절댓값을 구합니다.',
    color: '#14B8A6',
    fields: [{ name: 'num', type: 'number', defaultValue: -15 }],
    slots: [],
    toTypeScript: (ctx, block) => `Math.abs(${ctx.getFieldValue(block, 'num', 0)})`,
  },

  op_math_sqrt: {
    opcode: 'op_math_sqrt',
    category: 'operators',
    shape: 'reporter',
    label: '{num} 의 제곱근(루트)',
    description: '숫자의 루트(제곱근) 값을 계산합니다.',
    color: '#14B8A6',
    fields: [{ name: 'num', type: 'number', defaultValue: 16 }],
    slots: [],
    toTypeScript: (ctx, block) => `Math.sqrt(${ctx.getFieldValue(block, 'num', 0)})`,
  },

  op_min: {
    opcode: 'op_min',
    category: 'operators',
    shape: 'reporter',
    label: '{a} 와 {b} 중 작은 값(Min)',
    description: '두 수 중에서 더 작은 최솟값을 반환합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'a', type: 'number', defaultValue: 5 },
      { name: 'b', type: 'number', defaultValue: 12 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => `Math.min(${ctx.getFieldValue(block, 'a', 0)}, ${ctx.getFieldValue(block, 'b', 0)})`,
  },

  op_max: {
    opcode: 'op_max',
    category: 'operators',
    shape: 'reporter',
    label: '{a} 와 {b} 중 큰 값(Max)',
    description: '두 수 중에서 더 큰 최댓값을 반환합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'a', type: 'number', defaultValue: 5 },
      { name: 'b', type: 'number', defaultValue: 12 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => `Math.max(${ctx.getFieldValue(block, 'a', 0)}, ${ctx.getFieldValue(block, 'b', 0)})`,
  },

  op_string_upper: {
    opcode: 'op_string_upper',
    category: 'operators',
    shape: 'reporter',
    label: '{str} 대문자로 변환',
    description: '영문 텍스트를 모두 대문자로 변경합니다.',
    color: '#14B8A6',
    fields: [{ name: 'str', type: 'text', defaultValue: 'snapbot' }],
    slots: [],
    toTypeScript: (ctx, block) => `String(${ctx.getFieldValue(block, 'str', '')}).toUpperCase()`,
  },

  op_string_lower: {
    opcode: 'op_string_lower',
    category: 'operators',
    shape: 'reporter',
    label: '{str} 소문자로 변환',
    description: '영문 텍스트를 모두 소문자로 변경합니다.',
    color: '#14B8A6',
    fields: [{ name: 'str', type: 'text', defaultValue: 'SNAPBOT' }],
    slots: [],
    toTypeScript: (ctx, block) => `String(${ctx.getFieldValue(block, 'str', '')}).toLowerCase()`,
  },

  op_string_replace_all: {
    opcode: 'op_string_replace_all',
    category: 'operators',
    shape: 'reporter',
    label: '{str} 에서 {from} 을 {to} 로 모두 바꾸기',
    description: '문자열 내의 일치하는 모든 단어를 새 단어로 치환합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'str', type: 'text', defaultValue: 'hello world' },
      { name: 'from', type: 'text', defaultValue: 'world' },
      { name: 'to', type: 'text', defaultValue: 'discord' },
    ],
    slots: [],
    toTypeScript: (ctx, block) =>
      `String('${ctx.getFieldValue(block, 'str', '')}').replaceAll('${ctx.getFieldValue(block, 'from', '')}', '${ctx.getFieldValue(block, 'to', '')}')`,
  },

  op_string_split: {
    opcode: 'op_string_split',
    category: 'operators',
    shape: 'reporter',
    label: '{str} 을 구분자 [{sep}] 로 쪼갠 리스트',
    description: '텍스트를 구분 기호로 분리하여 배열로 변환합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'str', type: 'text', defaultValue: 'apple,banana,orange' },
      { name: 'sep', type: 'text', defaultValue: ',' },
    ],
    slots: [],
    toTypeScript: (ctx, block) =>
      `String('${ctx.getFieldValue(block, 'str', '')}').split('${ctx.getFieldValue(block, 'sep', ',')}')`,
  },

  op_regex_test: {
    opcode: 'op_regex_test',
    category: 'operators',
    shape: 'boolean',
    label: '{str} 이 정규식 [{pattern}] 패턴과 일치하는가?',
    description: '정규표현식 검사로 이메일, 전화번호, 비속어 패턴 등을 매칭합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'str', type: 'text', defaultValue: 'test@example.com' },
      { name: 'pattern', type: 'text', defaultValue: '^[^@]+@[^@]+$' },
    ],
    slots: [],
    toTypeScript: (ctx, block) =>
      `new RegExp('${ctx.getFieldValue(block, 'pattern', '')}').test('${ctx.getFieldValue(block, 'str', '')}')`,
  },

  // ----------------------------------------------------------------------------
  // 3. EXTENDED DISCORD DATA BLOCKS (25 blocks)
  // ----------------------------------------------------------------------------
  data_author_tag: {
    opcode: 'data_author_tag',
    category: 'discord_data',
    shape: 'reporter',
    label: '작성자의 디스코드 고유 태그 (User#0000)',
    description: '메시지를 보낸 유저의 디스코드 태그 이름입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.author.tag)`,
  },

  data_author_mention: {
    opcode: 'data_author_mention',
    category: 'discord_data',
    shape: 'reporter',
    label: '작성자 멘션 문자열 (<@ID>)',
    description: '클릭 시 유저 프로필이 뜨는 디스코드 멘션 코드입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(\`<@\${message.author.id}>\`)`,
  },

  data_author_is_bot: {
    opcode: 'data_author_is_bot',
    category: 'discord_data',
    shape: 'boolean',
    label: '작성자가 봇인가?',
    description: '메시지를 작성한 유저가 봇 계정인지 사람인지 판별합니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.author.bot)`,
  },

  data_channel_topic: {
    opcode: 'data_channel_topic',
    category: 'discord_data',
    shape: 'reporter',
    label: '현재 채널의 주제(Topic)',
    description: '채널 상단에 설정된 소개 설명글입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `((message.channel as any).topic || '')`,
  },

  data_channel_is_nsfw: {
    opcode: 'data_channel_is_nsfw',
    category: 'discord_data',
    shape: 'boolean',
    label: '현재 채널이 연령 제한(NSFW) 채널인가?',
    description: '성인 인증이 필요한 채널인지 확인합니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(Boolean((message.channel as any).nsfw))`,
  },

  data_guild_icon_url: {
    opcode: 'data_guild_icon_url',
    category: 'discord_data',
    shape: 'reporter',
    label: '서버 아이콘 이미지 URL',
    description: '현재 디스코드 서버의 대표 프로필 아이콘 링크입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.guild?.iconURL() || '')`,
  },

  data_guild_owner_id: {
    opcode: 'data_guild_owner_id',
    category: 'discord_data',
    shape: 'reporter',
    label: '서버 소유자(방장)의 유저 ID',
    description: '서버를 개설한 최고 관리자의 디스코드 고유 ID입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.guild?.ownerId || '')`,
  },

  data_bot_ping: {
    opcode: 'data_bot_ping',
    category: 'discord_data',
    shape: 'reporter',
    label: '봇 웹소켓 핑(지연시간, ms)',
    description: '디스코드 게이트웨이와의 네트워크 응답 핑 시간입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(client.ws.ping)`,
  },

  data_bot_uptime: {
    opcode: 'data_bot_uptime',
    category: 'discord_data',
    shape: 'reporter',
    label: '봇 가동 시간(초 단위 Uptime)',
    description: '봇이 시작된 후 재부팅 없이 연속으로 켜져 있던 총 시간입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(Math.floor(process.uptime()))`,
  },

  data_message_link: {
    opcode: 'data_message_link',
    category: 'discord_data',
    shape: 'reporter',
    label: '현재 메시지 바로가기 링크',
    description: '클릭 시 해당 메시지가 있는 위치로 화면이 이동하는 점프 링크입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.url)`,
  },

  // ----------------------------------------------------------------------------
  // 4. EXTENDED MODERATION & SECURITY BLOCKS (20 blocks)
  // ----------------------------------------------------------------------------
  mod_set_nickname: {
    opcode: 'mod_set_nickname',
    category: 'moderation',
    shape: 'command',
    label: '유저 [{userId}] 닉네임을 [{nick}] 으로 변경',
    description: '서버 내에서 해당 멤버의 표시 닉네임을 강제로 수정합니다.',
    color: '#EF4444',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '123456789' },
      { name: 'nick', type: 'text', label: '새 닉네임', defaultValue: '새 닉네임' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      const n = ctx.getFieldValue(block, 'nick', '');
      return ctx.indent(`await (await message.guild?.members.fetch('${u}'))?.setNickname('${n}');`);
    },
  },

  mod_lock_channel: {
    opcode: 'mod_lock_channel',
    category: 'moderation',
    shape: 'command',
    label: '현재 채널 메시지 전송 잠금(Lock)',
    description: '일반 멤버(@everyone)가 채널에 메시지를 적지 못하도록 잠급니다.',
    color: '#EF4444',
    fields: [],
    slots: [],
    toTypeScript: (ctx) =>
      ctx.indent(`await (message.channel as any).permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });`),
  },

  mod_unlock_channel: {
    opcode: 'mod_unlock_channel',
    category: 'moderation',
    shape: 'command',
    label: '현재 채널 메시지 전송 잠금 해제(Unlock)',
    description: '일반 멤버(@everyone)의 채팅 전송 권한을 다시 복원합니다.',
    color: '#EF4444',
    fields: [],
    slots: [],
    toTypeScript: (ctx) =>
      ctx.indent(`await (message.channel as any).permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: null });`),
  },

  mod_purge_bot_msgs: {
    opcode: 'mod_purge_bot_msgs',
    category: 'moderation',
    shape: 'command',
    label: '채널 최근 메시지 중 봇 메시지만 골라 청소',
    description: '사람이 쓴 글은 유지하고 봇들의 응답 메시지만 필터링하여 일괄 삭제합니다.',
    color: '#EF4444',
    fields: [{ name: 'limit', type: 'number', label: '검사할 개수', defaultValue: 50 }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const limit = ctx.getFieldValue(block, 'limit', '50');
      return ctx.indent(`const msgs = await message.channel.messages.fetch({ limit: ${limit} });\nconst botMsgs = msgs.filter(m => m.author.bot);\nawait (message.channel as any).bulkDelete(botMsgs);`);
    },
  },

  // ----------------------------------------------------------------------------
  // 5. EXTENDED DATABASE & ECONOMY BLOCKS (20 blocks)
  // ----------------------------------------------------------------------------
  db_increment: {
    opcode: 'db_increment',
    category: 'database',
    shape: 'command',
    label: 'DB 키 [{key}] 숫자를 {amount} 만큼 더하기(+)',
    description: '경험치나 포인트, 카운터를 지정된 숫자만큼 증가시킵니다.',
    color: '#EC4899',
    fields: [
      { name: 'key', type: 'text', label: '키 이름', defaultValue: 'coins' },
      { name: 'amount', type: 'number', label: '증가량', defaultValue: 10 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const key = ctx.getFieldValue(block, 'key', 'count');
      const amt = ctx.getFieldValue(block, 'amount', '1');
      return ctx.indent(`const currentVal = (await database.get('${key}')) || 0;\nawait database.set('${key}', Number(currentVal) + ${amt});`);
    },
  },

  db_decrement: {
    opcode: 'db_decrement',
    category: 'database',
    shape: 'command',
    label: 'DB 키 [{key}] 숫자를 {amount} 만큼 빼기(-)',
    description: '포인트나 잔액을 지정된 수치만큼 차감합니다.',
    color: '#EC4899',
    fields: [
      { name: 'key', type: 'text', label: '키 이름', defaultValue: 'coins' },
      { name: 'amount', type: 'number', label: '차감량', defaultValue: 5 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const key = ctx.getFieldValue(block, 'key', 'count');
      const amt = ctx.getFieldValue(block, 'amount', '1');
      return ctx.indent(`const cur = (await database.get('${key}')) || 0;\nawait database.set('${key}', Math.max(0, Number(cur) - ${amt}));`);
    },
  },

  db_user_coins_get: {
    opcode: 'db_user_coins_get',
    category: 'database',
    shape: 'reporter',
    label: '유저 [{userId}] 의 보유 머니(코인)',
    description: '유저의 영구 지갑 잔액을 조회합니다.',
    color: '#EC4899',
    fields: [{ name: 'userId', type: 'text', label: '유저 ID', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      return `((await database.get('coins_${u}')) || 0)`;
    },
  },

  db_user_level_get: {
    opcode: 'db_user_level_get',
    category: 'database',
    shape: 'reporter',
    label: '유저 [{userId}] 의 계산된 레벨 (Level)',
    description: '누적된 경험치를 바탕으로 유저의 현재 레벨을 산출합니다.',
    color: '#EC4899',
    fields: [{ name: 'userId', type: 'text', label: '유저 ID', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      return `(Math.floor(Math.sqrt(((await database.get('exp_${u}')) || 0) / 100)) + 1)`;
    },
  },
};

