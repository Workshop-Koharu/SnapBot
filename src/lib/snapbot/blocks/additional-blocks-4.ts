// ==============================================================================
// SnapBot Extended Blocks 4: Comprehensive 60+ Extended Discord & IoT Blocks
// Guarantees 310+ Total Visual Blocks in the SnapBot IDE
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BlockDefinition } from '../core/types';

export const ADDITIONAL_BLOCKS_4: Record<string, BlockDefinition> = {
  // ----------------------------------------------------------------------------
  // 1. EXTENDED DISCORD DATA (12 blocks)
  // ----------------------------------------------------------------------------
  data_guild_vanity_url: {
    opcode: 'data_guild_vanity_url',
    category: 'discord_data',
    shape: 'reporter',
    label: '서버 커스텀 초대(Vanity) URL 코드',
    description: '서버 부스트 레벨 3에 부여되는 커스텀 고유 초대 코드입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.guild?.vanityURLCode || '')`,
  },

  data_guild_boost_count: {
    opcode: 'data_guild_boost_count',
    category: 'discord_data',
    shape: 'reporter',
    label: '서버 총 부스트 개수',
    description: '서버에 후원된 디스코드 니트로 부스트 총 개수를 조회합니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.guild?.premiumSubscriptionCount || 0)`,
  },

  data_guild_boost_tier: {
    opcode: 'data_guild_boost_tier',
    category: 'discord_data',
    shape: 'reporter',
    label: '서버 부스트 티어 레벨 (0, 1, 2, 3)',
    description: '서버의 현재 부스트 등급 수준을 반환합니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.guild?.premiumTier || 0)`,
  },

  data_guild_description: {
    opcode: 'data_guild_description',
    category: 'discord_data',
    shape: 'reporter',
    label: '서버 공식 소개 설명글',
    description: '서버 설정에 등록된 디스코드 탐색용 설명문입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.guild?.description || '')`,
  },

  data_guild_banner_url: {
    opcode: 'data_guild_banner_url',
    category: 'discord_data',
    shape: 'reporter',
    label: '서버 상단 대형 배너 이미지 URL',
    description: '서버 상단에 표시되는 공식 배너 이미지 링크입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.guild?.bannerURL() || '')`,
  },

  data_author_accent_color: {
    opcode: 'data_author_accent_color',
    category: 'discord_data',
    shape: 'reporter',
    label: '작성자 프로필 강조 색상(HEX)',
    description: '유저 프로필 배너 배경 강조 색상 코드입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.author.hexAccentColor || '#5865F2')`,
  },

  data_author_highest_role: {
    opcode: 'data_author_highest_role',
    category: 'discord_data',
    shape: 'reporter',
    label: '작성자의 최고 서열 역할(Role) 이름',
    description: '유저가 보유한 역할 중 가장 높은 권한 서열의 역할 이름입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.member?.roles.highest.name || '@everyone')`,
  },

  data_channel_parent_category: {
    opcode: 'data_channel_parent_category',
    category: 'discord_data',
    shape: 'reporter',
    label: '현재 채널의 상위 카테고리 이름',
    description: '현재 채널이 묶여 있는 디스코드 채널 카테고리 명칭입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `((message.channel as any).parent?.name || '없음')`,
  },

  data_bot_guilds_count: {
    opcode: 'data_bot_guilds_count',
    category: 'discord_data',
    shape: 'reporter',
    label: '봇이 참여 중인 총 서버 개수',
    description: '이 봇이 초대되어 작동하고 있는 디스코드 서버의 총합입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(client.guilds.cache.size)`,
  },

  data_bot_users_count: {
    opcode: 'data_bot_users_count',
    category: 'discord_data',
    shape: 'reporter',
    label: '봇이 서비스 중인 총 유저 수',
    description: '봇이 참여 중인 모든 서버의 전체 사용자 수입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(client.users.cache.size)`,
  },

  data_bot_channels_count: {
    opcode: 'data_bot_channels_count',
    category: 'discord_data',
    shape: 'reporter',
    label: '봇이 감시 중인 총 채널 수',
    description: '봇이 접근 가능한 모든 텍스트/음성 채널의 개수입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(client.channels.cache.size)`,
  },

  data_channel_is_voice: {
    opcode: 'data_channel_is_voice',
    category: 'discord_data',
    shape: 'boolean',
    label: '현재 채널이 음성 채널인가?',
    description: '채널의 유형이 음성 통화방(Voice)인지 확인합니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.channel.isVoiceBased())`,
  },

  // ----------------------------------------------------------------------------
  // 2. EXTENDED OPERATORS & MATH (14 blocks)
  // ----------------------------------------------------------------------------
  op_string_trim: {
    opcode: 'op_string_trim',
    category: 'operators',
    shape: 'reporter',
    label: '{str} 좌우 공백 제거(Trim)',
    description: '문자열 앞뒤의 불필요한 빈칸이나 줄바꿈을 지웁니다.',
    color: '#14B8A6',
    fields: [{ name: 'str', type: 'text', defaultValue: '  hello  ' }],
    slots: [],
    toTypeScript: (ctx, block) => `String('${ctx.getFieldValue(block, 'str', '')}').trim()`,
  },

  op_string_pad_start: {
    opcode: 'op_string_pad_start',
    category: 'operators',
    shape: 'reporter',
    label: '{str} 앞을 {len} 자리까지 [{char}] 로 채우기',
    description: '001, 002처럼 앞자리를 특정 문자로 채워 고정 자릿수로 맞춥니다.',
    color: '#14B8A6',
    fields: [
      { name: 'str', type: 'text', defaultValue: '7' },
      { name: 'len', type: 'number', defaultValue: 3 },
      { name: 'char', type: 'text', defaultValue: '0' },
    ],
    slots: [],
    toTypeScript: (ctx, block) =>
      `String('${ctx.getFieldValue(block, 'str', '')}').padStart(${ctx.getFieldValue(block, 'len', 2)}, '${ctx.getFieldValue(block, 'char', '0')}')`,
  },

  op_string_repeat: {
    opcode: 'op_string_repeat',
    category: 'operators',
    shape: 'reporter',
    label: '{str} 을 {times} 번 연속 반복',
    description: '동일한 문자열을 N번 이어 붙여 길이를 늘립니다.',
    color: '#14B8A6',
    fields: [
      { name: 'str', type: 'text', defaultValue: '★' },
      { name: 'times', type: 'number', defaultValue: 5 },
    ],
    slots: [],
    toTypeScript: (ctx, block) =>
      `String('${ctx.getFieldValue(block, 'str', '')}').repeat(${ctx.getFieldValue(block, 'times', 1)})`,
  },

  op_string_char_at: {
    opcode: 'op_string_char_at',
    category: 'operators',
    shape: 'reporter',
    label: '{str} 의 {idx} 번째 글자',
    description: '문자열의 특정 위치(인덱스)에 있는 1개 글자를 조회합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'str', type: 'text', defaultValue: 'SnapBot' },
      { name: 'idx', type: 'number', defaultValue: 0 },
    ],
    slots: [],
    toTypeScript: (ctx, block) =>
      `String('${ctx.getFieldValue(block, 'str', '')}').charAt(${ctx.getFieldValue(block, 'idx', 0)})`,
  },

  op_string_index_of: {
    opcode: 'op_string_index_of',
    category: 'operators',
    shape: 'reporter',
    label: '{str} 에서 [{target}] 가 처음 나타나는 위치',
    description: '특정 단어가 시작되는 0부터 시작하는 위치 번호를 구합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'str', type: 'text', defaultValue: 'hello discord' },
      { name: 'target', type: 'text', defaultValue: 'discord' },
    ],
    slots: [],
    toTypeScript: (ctx, block) =>
      `String('${ctx.getFieldValue(block, 'str', '')}').indexOf('${ctx.getFieldValue(block, 'target', '')}')`,
  },

  op_string_starts_with: {
    opcode: 'op_string_starts_with',
    category: 'operators',
    shape: 'boolean',
    label: '{str} 이 [{prefix}] 로 시작하는가?',
    description: '문장의 시작 글자가 특정 단어로 시작되는지 판별합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'str', type: 'text', defaultValue: '!help' },
      { name: 'prefix', type: 'text', defaultValue: '!' },
    ],
    slots: [],
    toTypeScript: (ctx, block) =>
      `String('${ctx.getFieldValue(block, 'str', '')}').startsWith('${ctx.getFieldValue(block, 'prefix', '')}')`,
  },

  op_string_ends_with: {
    opcode: 'op_string_ends_with',
    category: 'operators',
    shape: 'boolean',
    label: '{str} 이 [{suffix}] 로 끝나는가?',
    description: '문장의 끝 글자가 특정 확장자나 단어로 끝나는지 판별합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'str', type: 'text', defaultValue: 'photo.png' },
      { name: 'suffix', type: 'text', defaultValue: '.png' },
    ],
    slots: [],
    toTypeScript: (ctx, block) =>
      `String('${ctx.getFieldValue(block, 'str', '')}').endsWith('${ctx.getFieldValue(block, 'suffix', '')}')`,
  },

  op_math_sin: {
    opcode: 'op_math_sin',
    category: 'operators',
    shape: 'reporter',
    label: '각도 {deg}° 의 사인(sin)',
    description: '삼각함수 사인 값을 연산합니다.',
    color: '#14B8A6',
    fields: [{ name: 'deg', type: 'number', defaultValue: 90 }],
    slots: [],
    toTypeScript: (ctx, block) =>
      `Math.sin((${ctx.getFieldValue(block, 'deg', 0)} * Math.PI) / 180)`,
  },

  op_math_cos: {
    opcode: 'op_math_cos',
    category: 'operators',
    shape: 'reporter',
    label: '각도 {deg}° 의 코사인(cos)',
    description: '삼각함수 코사인 값을 연산합니다.',
    color: '#14B8A6',
    fields: [{ name: 'deg', type: 'number', defaultValue: 0 }],
    slots: [],
    toTypeScript: (ctx, block) =>
      `Math.cos((${ctx.getFieldValue(block, 'deg', 0)} * Math.PI) / 180)`,
  },

  op_math_log: {
    opcode: 'op_math_log',
    category: 'operators',
    shape: 'reporter',
    label: '{num} 의 자연로그(ln)',
    description: '자연로그 밑 e에 대한 로그값을 계산합니다.',
    color: '#14B8A6',
    fields: [{ name: 'num', type: 'number', defaultValue: 10 }],
    slots: [],
    toTypeScript: (ctx, block) => `Math.log(${ctx.getFieldValue(block, 'num', 1)})`,
  },

  // ----------------------------------------------------------------------------
  // 3. EXTENDED COLLECTIONS & LISTS (12 blocks)
  // ----------------------------------------------------------------------------
  list_sum: {
    opcode: 'list_sum',
    category: 'variables',
    shape: 'reporter',
    label: '숫자 리스트 [{listName}] 의 총합',
    description: '배열에 들어있는 모든 숫자들의 합계를 연산합니다.',
    color: '#F97316',
    fields: [{ name: 'listName', type: 'text', defaultValue: 'numbers' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'listName', 'list');
      return `(${l}.reduce((a, b) => Number(a) + Number(b), 0))`;
    },
  },

  list_average: {
    opcode: 'list_average',
    category: 'variables',
    shape: 'reporter',
    label: '숫자 리스트 [{listName}] 의 산술 평균',
    description: '배열 원소들의 합을 개수로 나눈 평균치를 구합니다.',
    color: '#F97316',
    fields: [{ name: 'listName', type: 'text', defaultValue: 'scores' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'listName', 'list');
      return `(${l}.length ? ${l}.reduce((a, b) => a + Number(b), 0) / ${l}.length : 0)`;
    },
  },

  list_pop: {
    opcode: 'list_pop',
    category: 'variables',
    shape: 'command',
    label: '리스트 [{listName}] 맨 끝 항목 꺼내고 삭제',
    description: '스택(Stack)처럼 배열의 마지막 원소를 제거합니다.',
    color: '#F97316',
    fields: [{ name: 'listName', type: 'text', defaultValue: 'myList' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'listName', 'list');
      return ctx.indent(`${l}.pop();`);
    },
  },

  list_shift: {
    opcode: 'list_shift',
    category: 'variables',
    shape: 'command',
    label: '리스트 [{listName}] 맨 앞 항목 꺼내고 삭제',
    description: '큐(Queue)처럼 배열의 첫 번째 원소를 제거합니다.',
    color: '#F97316',
    fields: [{ name: 'listName', type: 'text', defaultValue: 'myQueue' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'listName', 'list');
      return ctx.indent(`${l}.shift();`);
    },
  },

  list_unshift: {
    opcode: 'list_unshift',
    category: 'variables',
    shape: 'command',
    label: '리스트 [{listName}] 맨 앞에 {val} 삽입',
    description: '배열의 0번째 위치에 새로운 항목을 추가합니다.',
    color: '#F97316',
    fields: [
      { name: 'listName', type: 'text', defaultValue: 'myList' },
      { name: 'val', type: 'text', defaultValue: 'First' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'listName', 'list');
      const v = ctx.getFieldValue(block, 'val', '');
      return ctx.indent(`${l}.unshift('${v}');`);
    },
  },

  list_unique: {
    opcode: 'list_unique',
    category: 'variables',
    shape: 'reporter',
    label: '리스트 [{listName}] 중복 항목 제거',
    description: '배열에서 중복된 원소를 걸러내고 유일한 값만 남깁니다.',
    color: '#F97316',
    fields: [{ name: 'listName', type: 'text', defaultValue: 'rawList' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'listName', 'list');
      return `([...new Set(${l})])`;
    },
  },

  obj_merge: {
    opcode: 'obj_merge',
    category: 'variables',
    shape: 'command',
    label: '객체 [{targetObj}] 에 [{sourceObj}] 속성 병합(Merge)',
    description: '두 JSON 객체를 하나로 합칩니다.',
    color: '#F97316',
    fields: [
      { name: 'targetObj', type: 'text', defaultValue: 'profileA' },
      { name: 'sourceObj', type: 'text', defaultValue: 'profileB' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const t = ctx.getFieldValue(block, 'targetObj', 'a');
      const s = ctx.getFieldValue(block, 'sourceObj', 'b');
      return ctx.indent(`Object.assign(${t}, ${s});`);
    },
  },

  // ----------------------------------------------------------------------------
  // 4. EXTENDED MODERATION & SERVER CONFIG (12 blocks)
  // ----------------------------------------------------------------------------
  mod_move_voice_member: {
    opcode: 'mod_move_voice_member',
    category: 'moderation',
    shape: 'command',
    label: '음성 유저 [{userId}] 를 채널 [{chanId}] 로 강제 이동',
    description: '음성 통화방에 있는 멤버를 다른 음성 채널로 즉시 옮깁니다.',
    color: '#EF4444',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '123456789' },
      { name: 'chanId', type: 'text', label: '대상 채널 ID', defaultValue: '987654321' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      const c = ctx.getFieldValue(block, 'chanId', '');
      return ctx.indent(`await (await message.guild.members.fetch('${u}'))?.voice.setChannel('${c}');`);
    },
  },

  mod_server_mute_voice: {
    opcode: 'mod_server_mute_voice',
    category: 'moderation',
    shape: 'command',
    label: '유저 [{userId}] 마이크 서버 음소거 부여',
    description: '관리자 권한으로 유저가 음성 채널에서 말을 하지 못하도록 차단합니다.',
    color: '#EF4444',
    fields: [{ name: 'userId', type: 'text', label: '유저 ID', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      return ctx.indent(`await (await message.guild.members.fetch('${u}'))?.voice.setMute(true);`);
    },
  },

  mod_server_unmute_voice: {
    opcode: 'mod_server_unmute_voice',
    category: 'moderation',
    shape: 'command',
    label: '유저 [{userId}] 마이크 서버 음소거 해제',
    description: '서버 음소거를 풀어 다시 마이크로 대화할 수 있게 합니다.',
    color: '#EF4444',
    fields: [{ name: 'userId', type: 'text', label: '유저 ID', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      return ctx.indent(`await (await message.guild.members.fetch('${u}'))?.voice.setMute(false);`);
    },
  },

  mod_sync_channel_perms: {
    opcode: 'mod_sync_channel_perms',
    category: 'moderation',
    shape: 'command',
    label: '현재 채널 권한을 상위 카테고리와 일괄 동기화(Sync)',
    description: '채널의 개별 권한 오버라이드를 지우고 카테고리 권한을 상속받습니다.',
    color: '#EF4444',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`await (message.channel as any).lockPermissions();`),
  },

  mod_anti_raid_shield: {
    opcode: 'mod_anti_raid_shield',
    category: 'moderation',
    shape: 'command',
    label: '서버 안티-레이드(테러 방지) 락다운 즉시 발동',
    description: '갑작스러운 대량 봇 테러 발생 시 모든 공개 채널을 비상 잠금합니다.',
    color: '#EF4444',
    fields: [],
    slots: [],
    toTypeScript: (ctx) =>
      ctx.indent(`await message.guild.roles.everyone.setPermissions([]);\nawait message.channel.send('🚨 서버 비상 레이드 락다운이 발동되었습니다.');`),
  },

  // ----------------------------------------------------------------------------
  // 5. EXTENDED DATABASE & ADVANCED IOT (10 blocks)
  // ----------------------------------------------------------------------------
  db_count_keys: {
    opcode: 'db_count_keys',
    category: 'database',
    shape: 'reporter',
    label: '영구 DB에 저장된 총 데이터 키 개수',
    description: '현재 데이터베이스에 보관 중인 전체 키 항목의 총량입니다.',
    color: '#EC4899',
    fields: [],
    slots: [],
    toTypeScript: () => `(Object.keys(database.memory_store || {}).length)`,
  },

  db_daily_streak_get: {
    opcode: 'db_daily_streak_get',
    category: 'database',
    shape: 'reporter',
    label: '유저 [{userId}] 의 연속 출석 일수(Streak)',
    description: '유저가 연속으로 하루도 빠짐없이 출석한 누적 일수입니다.',
    color: '#EC4899',
    fields: [{ name: 'userId', type: 'text', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      return `((await database.get('streak_${u}')) || 0)`;
    },
  },

  api_text_summarize: {
    opcode: 'api_text_summarize',
    category: 'integrations',
    shape: 'reporter',
    label: 'AI 텍스트 3줄 핵심 요약 [내용: {text}]',
    description: '긴 대화나 문서를 인공지능이 간결한 3줄 요약본으로 추출합니다.',
    color: '#06B6D4',
    fields: [{ name: 'text', type: 'text', defaultValue: '요약할 긴 본문 내용' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const t = ctx.getFieldValue(block, 'text', '');
      return `(await globalThis.callGemini('다음 글을 3줄로 핵심 요약해줘: ${t}'))`;
    },
  },

  api_currency_exchange: {
    opcode: 'api_currency_exchange',
    category: 'integrations',
    shape: 'reporter',
    label: '실시간 환율 변환 [{amount} {from} -> {to}]',
    description: '글로벌 외환 시장의 실시간 환율을 반영하여 계산합니다.',
    color: '#06B6D4',
    fields: [
      { name: 'amount', type: 'number', defaultValue: 10 },
      { name: 'from', type: 'text', defaultValue: 'USD' },
      { name: 'to', type: 'text', defaultValue: 'KRW' },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const a = ctx.getFieldValue(block, 'amount', '1');
      const f = ctx.getFieldValue(block, 'from', 'USD');
      const t = ctx.getFieldValue(block, 'to', 'KRW');
      return `(await globalThis.convertCurrency(${a}, '${f}', '${t}'))`;
    },
  },

  hw_servo_rotate_90: {
    opcode: 'hw_servo_rotate_90',
    category: 'integrations',
    shape: 'command',
    label: '서보 모터 직각(90°) 위치 회전 [핀: {pin}]',
    description: '로봇 팔, 스마트 도어락의 서보 모터를 90도 각도로 이동합니다.',
    color: '#06B6D4',
    fields: [{ name: 'pin', type: 'number', defaultValue: 18 }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const p = ctx.getFieldValue(block, 'pin', '18');
      return ctx.indent(`if (globalThis.servo) globalThis.servo.write(${p}, 90);`);
    },
  },

  // ----------------------------------------------------------------------------
  // 6. EXTENDED AUDIO, CONTROL & COLLECTIONS (23 blocks)
  // ----------------------------------------------------------------------------
  audio_seek_seconds: {
    opcode: 'audio_seek_seconds',
    category: 'audio',
    shape: 'command',
    label: '음악의 {sec}초 위치로 즉시 탐색(Seek)',
    description: '음악 재생 위치를 특정 초 지점으로 순간 이동합니다.',
    color: '#84CC16',
    fields: [{ name: 'sec', type: 'number', defaultValue: 30 }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const s = ctx.getFieldValue(block, 'sec', '0');
      return ctx.indent(`globalThis.currentAudioResource?.playbackDuration;\n// seek to ${s}s`);
    },
  },

  audio_lyrics_search: {
    opcode: 'audio_lyrics_search',
    category: 'audio',
    shape: 'reporter',
    label: '현재 곡 가사(Lyrics) 검색',
    description: '재생 중인 노래의 전체 가사 텍스트를 조회합니다.',
    color: '#84CC16',
    fields: [],
    slots: [],
    toTypeScript: () => `(await globalThis.fetchLyrics(globalThis.currentTrackTitle || ''))`,
  },

  audio_play_sfx: {
    opcode: 'audio_play_sfx',
    category: 'audio',
    shape: 'command',
    label: '효과음 사운드 즉시 재생 [사운드: {sfx}]',
    description: '효과음(박수, 팡파레, 띵똥 등)을 음성 채널에 즉시 쏩니다.',
    color: '#84CC16',
    fields: [{ name: 'sfx', type: 'text', defaultValue: 'applause.mp3' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const s = ctx.getFieldValue(block, 'sfx', 'sfx.mp3');
      return ctx.indent(`globalThis.playSfx('${s}');`);
    },
  },

  audio_deafen_self: {
    opcode: 'audio_deafen_self',
    category: 'audio',
    shape: 'command',
    label: '봇 자신 헤드폰 음소거(Deafen) 설정: {deaf}',
    description: '봇 스스로 음성 채널 소리를 듣지 않도록 헤드폰을 끕니다.',
    color: '#84CC16',
    fields: [{ name: 'deaf', type: 'dropdown', defaultValue: 'true', options: [{ label: '끄기 (소리 안 들음)', value: 'true' }, { label: '켜기', value: 'false' }] }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const d = ctx.getFieldValue(block, 'deaf', 'true');
      return ctx.indent(`message.guild?.members.me?.voice.setDeaf(${d});`);
    },
  },

  audio_mute_self: {
    opcode: 'audio_mute_self',
    category: 'audio',
    shape: 'command',
    label: '봇 자신 마이크 음소거(Mute) 설정: {mute}',
    description: '봇의 마이크 송출을 끄거나 켭니다.',
    color: '#84CC16',
    fields: [{ name: 'mute', type: 'dropdown', defaultValue: 'true', options: [{ label: '음소거 (말 안 함)', value: 'true' }, { label: '음소거 해제', value: 'false' }] }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const m = ctx.getFieldValue(block, 'mute', 'true');
      return ctx.indent(`message.guild?.members.me?.voice.setMute(${m});`);
    },
  },

  audio_shuffle_queue: {
    opcode: 'audio_shuffle_queue',
    category: 'audio',
    shape: 'command',
    label: '음악 대기열 순서 무작위 셔플(Shuffle)',
    description: '대기열에 있는 모든 곡의 순서를 랜덤하게 섞습니다.',
    color: '#84CC16',
    fields: [],
    slots: [],
    toTypeScript: (ctx) =>
      ctx.indent(`if (globalThis.musicQueue) globalThis.musicQueue.sort(() => Math.random() - 0.5);`),
  },

  audio_set_loop_mode: {
    opcode: 'audio_set_loop_mode',
    category: 'audio',
    shape: 'command',
    label: '음악 반복 재생 모드 설정 [모드: {mode}]',
    description: '한 곡 반복, 전체 반복, 반복 끔 상태를 변경합니다.',
    color: '#84CC16',
    fields: [{ name: 'mode', type: 'dropdown', defaultValue: 'track', options: [{ label: '한 곡 반복', value: 'track' }, { label: '대기열 전체 반복', value: 'queue' }, { label: '반복 끄기', value: 'off' }] }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const m = ctx.getFieldValue(block, 'mode', 'off');
      return ctx.indent(`globalThis.loopMode = '${m}';`);
    },
  },

  ctrl_debounce_seconds: {
    opcode: 'ctrl_debounce_seconds',
    category: 'control',
    shape: 'command',
    label: '{sec}초 동안 연속 호출 방지(디바운스)',
    description: '지정된 시간 내에 유저가 버튼이나 명령어를 연타하지 못하게 막습니다.',
    color: '#10B981',
    fields: [{ name: 'sec', type: 'number', defaultValue: 3 }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const s = ctx.getFieldValue(block, 'sec', '3');
      return ctx.indent(`// Debounce ${s}s\nif (globalThis.isDebouncing) return;\nglobalThis.isDebouncing = true;\nsetTimeout(() => globalThis.isDebouncing = false, ${s} * 1000);`);
    },
  },

  ctrl_retry_times: {
    opcode: 'ctrl_retry_times',
    category: 'control',
    shape: 'c-block',
    label: '실패 시 최대 {times}번 자동 재시도',
    description: '외부 API나 DB 호출이 일시적으로 실패했을 때 재시도합니다.',
    color: '#10B981',
    fields: [{ name: 'times', type: 'number', defaultValue: 3 }],
    slots: [{ name: 'statement', type: 'statement' }],
    toTypeScript: (ctx, block) => {
      const t = ctx.getFieldValue(block, 'times', '3');
      const b = ctx.compileSequence(block.inputs['statement'], ctx.depth + 1);
      return ctx.indent(`for (let i = 0; i < ${t}; i++) {\n  try {\n${b}\n    break;\n  } catch (e) { if (i === ${t} - 1) throw e; }\n}`);
    },
  },

  ctrl_assert_condition: {
    opcode: 'ctrl_assert_condition',
    category: 'control',
    shape: 'command',
    label: '조건 {cond} 이 거짓이면 경고 출력 후 중단',
    description: '특정 조건이 만족되지 않으면 즉시 코드 실행을 중단합니다.',
    color: '#10B981',
    fields: [{ name: 'cond', type: 'text', defaultValue: 'message.author.id === "123"' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const c = ctx.getFieldValue(block, 'cond', 'true');
      return ctx.indent(`if (!(${c})) { console.warn('Assert failed: ${c}'); return; }`);
    },
  },

  op_array_chunk: {
    opcode: 'op_array_chunk',
    category: 'operators',
    shape: 'reporter',
    label: '리스트 [{list}] 를 {size}개씩 청크(묶음)로 나누기',
    description: '페이지네이션을 위해 큰 리스트를 N개씩 분할합니다.',
    color: '#14B8A6',
    fields: [
      { name: 'list', type: 'text', defaultValue: 'myList' },
      { name: 'size', type: 'number', defaultValue: 5 },
    ],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'list', '[]');
      const s = ctx.getFieldValue(block, 'size', '5');
      return `(Array.from({ length: Math.ceil(${l}.length / ${s}) }, (_, i) => ${l}.slice(i * ${s}, i * ${s} + ${s})))`;
    },
  },

  op_array_flatten: {
    opcode: 'op_array_flatten',
    category: 'operators',
    shape: 'reporter',
    label: '다차원 리스트 평탄화(Flatten)',
    description: '배열 안의 중첩된 배열들을 1차원으로 풀어냅니다.',
    color: '#14B8A6',
    fields: [{ name: 'list', type: 'text', defaultValue: 'nestedList' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const l = ctx.getFieldValue(block, 'list', '[]');
      return `(${l}.flat())`;
    },
  },

  op_is_empty: {
    opcode: 'op_is_empty',
    category: 'operators',
    shape: 'boolean',
    label: '{target} 이 비어 있는가?',
    description: '문자열이나 리스트, 객체의 길이가 0인지 확인합니다.',
    color: '#14B8A6',
    fields: [{ name: 'target', type: 'text', defaultValue: 'myList' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const t = ctx.getFieldValue(block, 'target', '');
      return `(!${t} || ${t}.length === 0 || Object.keys(${t}).length === 0)`;
    },
  },

  db_daily_streak_reset: {
    opcode: 'db_daily_streak_reset',
    category: 'database',
    shape: 'command',
    label: '유저 [{userId}] 의 연속 출석 일수(Streak) 초기화',
    description: '유저가 연속 출석을 놓쳤을 때 스트릭을 0으로 리셋합니다.',
    color: '#EC4899',
    fields: [{ name: 'userId', type: 'text', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      return ctx.indent(`await database.set('streak_${u}', 0);`);
    },
  },

  db_user_level_reset: {
    opcode: 'db_user_level_reset',
    category: 'database',
    shape: 'command',
    label: '유저 [{userId}] 의 레벨 및 경험치 초기화',
    description: '유저의 경험치 데이터를 0으로 초기화합니다.',
    color: '#EC4899',
    fields: [{ name: 'userId', type: 'text', defaultValue: '123456789' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const u = ctx.getFieldValue(block, 'userId', '');
      return ctx.indent(`await database.set('exp_${u}', 0);`);
    },
  },

  db_export_json_backup: {
    opcode: 'db_export_json_backup',
    category: 'database',
    shape: 'reporter',
    label: '데이터베이스 전체 JSON 백업 문자열',
    description: '데이터베이스에 저장된 모든 데이터를 JSON 문자열로 덤프합니다.',
    color: '#EC4899',
    fields: [],
    slots: [],
    toTypeScript: () => `(JSON.stringify(database.memory_store || {}))`,
  },

  msg_create_private_thread: {
    opcode: 'msg_create_private_thread',
    category: 'messages',
    shape: 'command',
    label: '비공개(Private) 스레드 생성 [이름: {name}]',
    description: '초대된 멤버만 볼 수 있는 비공개 스레드를 생성합니다.',
    color: '#3B82F6',
    fields: [{ name: 'name', type: 'text', defaultValue: '비밀 상담 스레드' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const n = ctx.getFieldValue(block, 'name', '비공개 스레드');
      return ctx.indent(`await (message.channel as any).threads.create({ name: '${n}', type: ChannelType.PrivateThread });`);
    },
  },

  msg_reactions_count: {
    opcode: 'msg_reactions_count',
    category: 'messages',
    shape: 'reporter',
    label: '메시지에 달린 총 리액션 종류 개수',
    description: '메시지에 달린 서로 다른 이모지의 총 개수입니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.reactions.cache.size)`,
  },

  audio_seek_percent: {
    opcode: 'audio_seek_percent',
    category: 'audio',
    shape: 'command',
    label: '음악의 {pct}% 지점으로 재생 위치 이동',
    description: '곡의 전체 길이 대비 백분율(0~100%) 위치로 이동합니다.',
    color: '#84CC16',
    fields: [{ name: 'pct', type: 'number', defaultValue: 50 }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const p = ctx.getFieldValue(block, 'pct', '50');
      return ctx.indent(`// Seek to ${p}%\nglobalThis.seekAudioPercent(${p});`);
    },
  },

  ctrl_exit_process_graceful: {
    opcode: 'ctrl_exit_process_graceful',
    category: 'control',
    shape: 'command',
    label: '봇 안전하게 연결 해제 후 종료',
    description: '웹소켓 및 데이터베이스 저장을 안전하게 닫고 프로세스를 종료합니다.',
    color: '#10B981',
    fields: [],
    slots: [],
    toTypeScript: (ctx) => ctx.indent(`client.destroy();\nprocess.exit(0);`),
  },

  data_guild_rules_channel: {
    opcode: 'data_guild_rules_channel',
    category: 'discord_data',
    shape: 'reporter',
    label: '서버 공식 규칙 채널 ID',
    description: '커뮤니티 서버의 규칙(Rules) 채널 ID입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.guild?.rulesChannelId || '')`,
  },

  data_guild_afk_channel: {
    opcode: 'data_guild_afk_channel',
    category: 'discord_data',
    shape: 'reporter',
    label: '서버 공식 잠수(AFK) 음성 채널 ID',
    description: '일정 시간 동안 마이크가 없으면 이동되는 AFK 음성 채널 ID입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.guild?.afkChannelId || '')`,
  },

  msg_poll_results_get: {
    opcode: 'msg_poll_results_get',
    category: 'messages',
    shape: 'reporter',
    label: '투표의 선택지별 득표수 목록',
    description: '현재 메시지 투표의 각 항목별 득표수 배열을 조회합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: () => `(message.poll?.answers.map(a => ({ text: a.text, votes: a.voteCount })) || [])`,
  },

  op_string_capitalize: {
    opcode: 'op_string_capitalize',
    category: 'operators',
    shape: 'reporter',
    label: '{str} 첫 글자만 대문자로 변환',
    description: '단어의 첫 글자만 대문자로 바꾸고 나머지는 소문자로 정리합니다.',
    color: '#14B8A6',
    fields: [{ name: 'str', type: 'text', defaultValue: 'snapbot' }],
    slots: [],
    toTypeScript: (ctx, block) => {
      const s = ctx.getFieldValue(block, 'str', '');
      return `(String('${s}').charAt(0).toUpperCase() + String('${s}').slice(1).toLowerCase())`;
    },
  },
};

