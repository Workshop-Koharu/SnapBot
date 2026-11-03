// ==============================================================================
// SnapBot Standard Block Definitions
// Covers: Events, Messages, Embeds, Controls, Variables, Moderation
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { BlockDefinition, BlockInstance, CompileContext } from '../core/types';

export const STANDARD_BLOCKS: Record<string, BlockDefinition> = {
  // ----------------------------------------------------------------------------
  // 1. EVENT BLOCKS (모자 모양 Hat 블록)
  // ----------------------------------------------------------------------------
  event_ready: {
    opcode: 'event_ready',
    category: 'events',
    shape: 'hat',
    label: '🟢 봇이 켜졌을 때 (Ready)',
    description: '디스코드 봇이 정상적으로 로그인되고 준비되었을 때 실행됩니다.',
    color: '#F59E0B',
    fields: [],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.once('ready', async () => {\n  console.log(\`[SnapBot] 봇이 성공적으로 로그인되었습니다: \${client.user?.tag}\`);\n${body}\n});`;
    },
  },

  event_message_create: {
    opcode: 'event_message_create',
    category: 'events',
    shape: 'hat',
    label: '💬 새 메시지가 도착했을 때',
    description: '서버의 텍스트 채널에 누군가 메시지를 전송했을 때 실행됩니다.',
    color: '#F59E0B',
    fields: [
      {
        name: 'ignoreBots',
        type: 'dropdown',
        label: '봇 메시지 무시',
        defaultValue: 'true',
        options: [
          { label: '예 (봇 무시)', value: 'true' },
          { label: '아니오 (모두 수신)', value: 'false' },
        ],
      },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const ignoreBots = ctx.getFieldValue(block, 'ignoreBots', 'true') === 'true';
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      const botFilter = ignoreBots ? '  if (message.author.bot) return;\n' : '';
      return `client.on('messageCreate', async (message) => {\n${botFilter}${body}\n});`;
    },
  },

  event_interaction_create: {
    opcode: 'event_interaction_create',
    category: 'events',
    shape: 'hat',
    label: '⚡ 슬래시 명령어 /{commandName} 입력되었을 때',
    description: '디스코드 슬래시 명령어가 실행되었을 때 동작합니다.',
    color: '#F59E0B',
    fields: [
      {
        name: 'commandName',
        type: 'text',
        label: '명령어 이름',
        defaultValue: 'ping',
        placeholder: '예: ping, help, info',
      },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const cmdName = ctx.getFieldValue(block, 'commandName', 'ping');
      const body = ctx.compileSequence(block.next, ctx.depth + 2);
      return `client.on('interactionCreate', async (interaction) => {\n  if (!interaction.isChatInputCommand()) return;\n  if (interaction.commandName === '${cmdName}') {\n${body}\n  }\n});`;
    },
  },

  event_button_click: {
    opcode: 'event_button_click',
    category: 'events',
    shape: 'hat',
    label: '🔘 버튼 [ID: {customId}] 클릭되었을 때',
    description: '메시지에 부착된 인터랙티브 버튼이 눌렸을 때 실행됩니다.',
    color: '#F59E0B',
    fields: [
      {
        name: 'customId',
        type: 'text',
        label: '버튼 ID',
        defaultValue: 'my_button',
        placeholder: '버튼 custom_id',
      },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const customId = ctx.getFieldValue(block, 'customId', 'my_button');
      const body = ctx.compileSequence(block.next, ctx.depth + 2);
      return `client.on('interactionCreate', async (interaction) => {\n  if (!interaction.isButton()) return;\n  if (interaction.customId === '${customId}') {\n${body}\n  }\n});`;
    },
  },

  event_guild_member_add: {
    opcode: 'event_guild_member_add',
    category: 'events',
    shape: 'hat',
    label: '👋 새 멤버가 서버에 입장했을 때',
    description: '서버에 새로운 사용자가 참가했을 때 실행됩니다.',
    color: '#F59E0B',
    fields: [],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildMemberAdd', async (member) => {\n${body}\n});`;
    },
  },

  event_guild_member_remove: {
    opcode: 'event_guild_member_remove',
    category: 'events',
    shape: 'hat',
    label: '🚪 멤버가 서버에서 퇴장했을 때',
    description: '멤버가 서버를 나가거나 퇴장당했을 때 실행됩니다.',
    color: '#F59E0B',
    fields: [],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const body = ctx.compileSequence(block.next, ctx.depth + 1);
      return `client.on('guildMemberRemove', async (member) => {\n${body}\n});`;
    },
  },

  // ----------------------------------------------------------------------------
  // 2. MESSAGE & RESPONSE BLOCKS
  // ----------------------------------------------------------------------------
  action_send_message: {
    opcode: 'action_send_message',
    category: 'messages',
    shape: 'command',
    label: '📨 채널에 메시지 전송: {content}',
    description: '현재 채널 또는 지정한 채널로 일반 텍스트 메시지를 전송합니다.',
    color: '#3B82F6',
    fields: [
      {
        name: 'content',
        type: 'text',
        label: '내용',
        defaultValue: '안녕하세요! SnapBot으로 제작된 봇입니다.',
      },
    ],
    slots: [
      { name: 'contentInput', type: 'value', label: '내용 값' },
    ],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const content = ctx.resolveInput(block, 'contentInput', JSON.stringify(ctx.getFieldValue(block, 'content', '안녕하세요!')));
      return ctx.indent(`if ('channel' in interactionOrMsg && interactionOrMsg.channel) {\n  await interactionOrMsg.channel.send({ content: ${content} });\n} else if (typeof message !== 'undefined') {\n  await message.channel.send({ content: ${content} });\n}`);
    },
  },

  action_reply_message: {
    opcode: 'action_reply_message',
    category: 'messages',
    shape: 'command',
    label: '↩️ 메시지에 답장하기: {content}',
    description: '이벤트를 유발한 메시지 또는 명령어에 직접 답장합니다.',
    color: '#3B82F6',
    fields: [
      {
        name: 'content',
        type: 'text',
        label: '답장 내용',
        defaultValue: '요청하신 작업이 완료되었습니다!',
      },
    ],
    slots: [
      { name: 'contentInput', type: 'value', label: '내용 값' },
    ],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const content = ctx.resolveInput(block, 'contentInput', JSON.stringify(ctx.getFieldValue(block, 'content', '요청하신 작업이 완료되었습니다!')));
      return ctx.indent(`if (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n  await interaction.reply({ content: ${content} });\n} else if (typeof message !== 'undefined') {\n  await message.reply({ content: ${content} });\n}`);
    },
  },

  action_reply_ephemeral: {
    opcode: 'action_reply_ephemeral',
    category: 'messages',
    shape: 'command',
    label: '🤫 나에게만 보이는(Ephemeral) 답장: {content}',
    description: '명령어를 입력한 본인에게만 비밀스럽게 보이는 응답을 보냅니다.',
    color: '#3B82F6',
    fields: [
      {
        name: 'content',
        type: 'text',
        label: '비공개 내용',
        defaultValue: '이 메시지는 당신에게만 표시됩니다.',
      },
    ],
    slots: [
      { name: 'contentInput', type: 'value', label: '내용 값' },
    ],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const content = ctx.resolveInput(block, 'contentInput', JSON.stringify(ctx.getFieldValue(block, 'content', '이 메시지는 당신에게만 보입니다.')));
      return ctx.indent(`if (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n  await interaction.reply({ content: ${content}, ephemeral: true });\n}`);
    },
  },

  action_edit_message: {
    opcode: 'action_edit_message',
    category: 'messages',
    shape: 'command',
    label: '✏️ 응답 메시지 내용 수정하기: {content}',
    description: '이미 보낸 봇의 응답 메시지를 새 텍스트로 업데이트합니다.',
    color: '#3B82F6',
    fields: [
      {
        name: 'content',
        type: 'text',
        label: '수정할 내용',
        defaultValue: '수정 완료되었습니다!',
      },
    ],
    slots: [{ name: 'contentInput', type: 'value' }],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const content = ctx.resolveInput(block, 'contentInput', JSON.stringify(ctx.getFieldValue(block, 'content', '수정 완료!')));
      return ctx.indent(`if (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n  await interaction.editReply({ content: ${content} });\n}`);
    },
  },

  action_delete_message: {
    opcode: 'action_delete_message',
    category: 'messages',
    shape: 'command',
    label: '🗑️ 현재 메시지 삭제하기',
    description: '이벤트를 유발한 원본 메시지를 삭제합니다.',
    color: '#3B82F6',
    fields: [],
    slots: [],
    toTypeScript: (ctx: CompileContext) => {
      return ctx.indent(`if (typeof message !== 'undefined' && message.deletable) {\n  await message.delete().catch(console.error);\n}`);
    },
  },

  action_add_reaction: {
    opcode: 'action_add_reaction',
    category: 'messages',
    shape: 'command',
    label: '👍 메시지에 반응(이모지) 달기: {emoji}',
    description: '수신된 메시지에 유니코드 이모지 반응을 추가합니다.',
    color: '#3B82F6',
    fields: [
      {
        name: 'emoji',
        type: 'text',
        label: '이모지',
        defaultValue: '✅',
      },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const emoji = ctx.getFieldValue(block, 'emoji', '✅');
      return ctx.indent(`if (typeof message !== 'undefined') {\n  await message.react('${emoji}').catch(console.error);\n}`);
    },
  },

  // ----------------------------------------------------------------------------
  // 3. EMBED & COMPONENT BLOCKS
  // ----------------------------------------------------------------------------
  action_create_embed: {
    opcode: 'action_create_embed',
    category: 'embeds',
    shape: 'command',
    label: '📋 새 임베드 생성 [제목: {title}] [설명: {desc}] [색상: {color}]',
    description: '디스코드 전용 카드형 임베드를 생성하고 속성을 설정합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'title', type: 'text', label: '제목', defaultValue: '공지사항' },
      { name: 'desc', type: 'text', label: '설명', defaultValue: 'SnapBot으로 작성된 멋진 임베드입니다.' },
      { name: 'color', type: 'color', label: '색상', defaultValue: '#6366F1' },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const title = JSON.stringify(ctx.getFieldValue(block, 'title', '공지사항'));
      const desc = JSON.stringify(ctx.getFieldValue(block, 'desc', '설명'));
      const color = ctx.getFieldValue(block, 'color', '#6366F1');
      return ctx.indent(`const currentEmbed = new EmbedBuilder()\n  .setTitle(${title})\n  .setDescription(${desc})\n  .setColor('${color}')\n  .setTimestamp();`);
    },
  },

  action_embed_add_field: {
    opcode: 'action_embed_add_field',
    category: 'embeds',
    shape: 'command',
    label: '➕ 임베드 필드 추가 [이름: {name}] [값: {val}] [인라인: {inline}]',
    description: '임베드에 세부 항목(필드)을 추가합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'name', type: 'text', label: '필드 이름', defaultValue: '서버 상태' },
      { name: 'val', type: 'text', label: '필드 내용', defaultValue: '정상 작동 중' },
      {
        name: 'inline',
        type: 'dropdown',
        label: '한줄 표시',
        defaultValue: 'true',
        options: [
          { label: '한줄 나란히(true)', value: 'true' },
          { label: '아래로 배치(false)', value: 'false' },
        ],
      },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const name = JSON.stringify(ctx.getFieldValue(block, 'name', '필드 이름'));
      const val = JSON.stringify(ctx.getFieldValue(block, 'val', '값'));
      const inline = ctx.getFieldValue(block, 'inline', 'true');
      return ctx.indent(`if (typeof currentEmbed !== 'undefined') {\n  currentEmbed.addFields({ name: ${name}, value: ${val}, inline: ${inline} });\n}`);
    },
  },

  action_embed_set_footer: {
    opcode: 'action_embed_set_footer',
    category: 'embeds',
    shape: 'command',
    label: '🏷️ 임베드 푸터 설정 [문구: {text}]',
    description: '임베드 최하단에 작게 표시될 푸터 텍스트를 설정합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'text', type: 'text', label: '푸터 문구', defaultValue: 'Powered by SnapBot (snapbot.koharu.live)' },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const text = JSON.stringify(ctx.getFieldValue(block, 'text', 'SnapBot'));
      return ctx.indent(`if (typeof currentEmbed !== 'undefined') {\n  currentEmbed.setFooter({ text: ${text} });\n}`);
    },
  },

  action_send_embed: {
    opcode: 'action_send_embed',
    category: 'embeds',
    shape: 'command',
    label: '🚀 현재 임베드 전송하기',
    description: '지금까지 구성한 임베드를 채널 또는 답장으로 즉시 전송합니다.',
    color: '#8B5CF6',
    fields: [],
    slots: [],
    toTypeScript: (ctx: CompileContext) => {
      return ctx.indent(`if (typeof currentEmbed !== 'undefined') {\n  if (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n    await interaction.reply({ embeds: [currentEmbed] });\n  } else if (typeof message !== 'undefined') {\n    await message.channel.send({ embeds: [currentEmbed] });\n  }\n}`);
    },
  },

  action_add_button: {
    opcode: 'action_add_button',
    category: 'embeds',
    shape: 'command',
    label: '🔘 버튼 생성 및 전송 [라벨: {label}] [ID: {customId}] [색상: {style}]',
    description: '사용자가 클릭할 수 있는 인터랙티브 디스코드 버튼을 전송합니다.',
    color: '#8B5CF6',
    fields: [
      { name: 'label', type: 'text', label: '버튼 글자', defaultValue: '확인하기' },
      { name: 'customId', type: 'text', label: '버튼 ID', defaultValue: 'btn_confirm' },
      {
        name: 'style',
        type: 'dropdown',
        label: '스타일',
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
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const label = JSON.stringify(ctx.getFieldValue(block, 'label', '확인'));
      const customId = ctx.getFieldValue(block, 'customId', 'btn_confirm');
      const style = ctx.getFieldValue(block, 'style', 'Primary');
      return ctx.indent(`const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(\n  new ButtonBuilder().setCustomId('${customId}').setLabel(${label}).setStyle(ButtonStyle.${style})\n);\nif (typeof interaction !== 'undefined' && interaction.isRepliable()) {\n  await interaction.reply({ content: '버튼을 눌러주세요:', components: [actionRow] });\n} else if (typeof message !== 'undefined') {\n  await message.channel.send({ content: '버튼을 눌러주세요:', components: [actionRow] });\n}`);
    },
  },

  // ----------------------------------------------------------------------------
  // 4. CONTROL & LOGIC BLOCKS (C-Blocks & Hexagons)
  // ----------------------------------------------------------------------------
  control_if: {
    opcode: 'control_if',
    category: 'control',
    shape: 'c-block',
    label: '🔀 만약 <조건> 이라면',
    description: '조건이 참(True)일 때만 감싸진 블록들을 실행합니다.',
    color: '#10B981',
    fields: [],
    slots: [
      { name: 'condition', type: 'boolean', label: '조건식' },
      { name: 'statement', type: 'statement', label: '실행 블록' },
    ],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const cond = ctx.resolveInput(block, 'condition', 'true');
      const body = ctx.compileSequence(block.statement, ctx.depth + 1);
      return ctx.indent(`if (${cond}) {\n${body}\n}`);
    },
  },

  control_if_else: {
    opcode: 'control_if_else',
    category: 'control',
    shape: 'c-block',
    label: '🔀 만약 <조건> 이라면 / 아니면',
    description: '조건이 참일 때와 거짓일 때 각각 다른 블록을 실행합니다.',
    color: '#10B981',
    fields: [],
    slots: [
      { name: 'condition', type: 'boolean', label: '조건식' },
      { name: 'statement', type: 'statement', label: '참일 때 실행' },
      { name: 'statementElse', type: 'statementElse', label: '거짓일 때 실행' },
    ],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
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
    label: '🔁 {times} 번 반복하기',
    description: '지정한 횟수만큼 블록들을 반복 실행합니다.',
    color: '#10B981',
    fields: [
      { name: 'times', type: 'number', label: '횟수', defaultValue: 3 },
    ],
    slots: [
      { name: 'statement', type: 'statement', label: '반복할 내용' },
    ],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const times = ctx.getFieldValue(block, 'times', 3);
      const body = ctx.compileSequence(block.statement, ctx.depth + 1);
      return ctx.indent(`for (let i = 0; i < ${times}; i++) {\n${body}\n}`);
    },
  },

  control_wait: {
    opcode: 'control_wait',
    category: 'control',
    shape: 'command',
    label: '⏳ {seconds} 초 동안 기다리기',
    description: '다음 블록을 실행하기 전에 일정 시간 멈춥니다.',
    color: '#10B981',
    fields: [
      { name: 'seconds', type: 'number', label: '초(sec)', defaultValue: 1 },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const sec = ctx.getFieldValue(block, 'seconds', 1);
      const ms = Number(sec) * 1000;
      return ctx.indent(`await new Promise(resolve => setTimeout(resolve, ${ms}));`);
    },
  },

  operator_compare: {
    opcode: 'operator_compare',
    category: 'control',
    shape: 'boolean',
    label: '⟨값 1⟩ {op} ⟨값 2⟩',
    description: '두 값을 비교하여 참 또는 거짓을 반환합니다.',
    color: '#059669',
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
          { label: '포함함 (includes)', value: 'includes' },
        ],
      },
    ],
    slots: [
      { name: 'left', type: 'value', label: '값 1' },
      { name: 'right', type: 'value', label: '값 2' },
    ],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const left = ctx.resolveInput(block, 'left', '""');
      const right = ctx.resolveInput(block, 'right', '""');
      const op = ctx.getFieldValue(block, 'op', '===');
      if (op === 'includes') {
        return `String(${left}).includes(String(${right}))`;
      }
      return `(${left} ${op} ${right})`;
    },
  },

  operator_logic: {
    opcode: 'operator_logic',
    category: 'control',
    shape: 'boolean',
    label: '⟨조건 1⟩ {op} ⟨조건 2⟩',
    description: '두 조건의 논리곱(AND) 또는 논리합(OR)을 계산합니다.',
    color: '#059669',
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
      { name: 'left', type: 'boolean', label: '조건 1' },
      { name: 'right', type: 'boolean', label: '조건 2' },
    ],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const left = ctx.resolveInput(block, 'left', 'false');
      const right = ctx.resolveInput(block, 'right', 'false');
      const op = ctx.getFieldValue(block, 'op', '&&');
      return `(${left} ${op} ${right})`;
    },
  },

  operator_not: {
    opcode: 'operator_not',
    category: 'control',
    shape: 'boolean',
    label: '🚫 ⟨조건⟩ 이(가) 아니다 (NOT)',
    description: '조건의 참/거짓을 뒤집습니다.',
    color: '#059669',
    fields: [],
    slots: [{ name: 'val', type: 'boolean', label: '조건' }],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const val = ctx.resolveInput(block, 'val', 'false');
      return `!(${val})`;
    },
  },

  // ----------------------------------------------------------------------------
  // 5. VARIABLES & DATA BLOCKS (Rounded Reporters & Commands)
  // ----------------------------------------------------------------------------
  var_set: {
    opcode: 'var_set',
    category: 'variables',
    shape: 'command',
    label: '📦 변수 [{varName}] 을(를) {value} (으)로 정하기',
    description: '변수에 새로운 값을 할당합니다.',
    color: '#EC4899',
    fields: [
      { name: 'varName', type: 'text', label: '변수명', defaultValue: 'score' },
      { name: 'value', type: 'text', label: '값', defaultValue: '10' },
    ],
    slots: [{ name: 'valInput', type: 'value' }],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const varName = ctx.getFieldValue(block, 'varName', 'tempVar');
      ctx.variables.add(varName);
      const val = ctx.resolveInput(block, 'valInput', JSON.stringify(ctx.getFieldValue(block, 'value', '0')));
      return ctx.indent(`variables['${varName}'] = ${val};`);
    },
  },

  var_get: {
    opcode: 'var_get',
    category: 'variables',
    shape: 'reporter',
    label: '📦 변수 ({varName})',
    description: '변수에 저장된 값을 가져옵니다.',
    color: '#EC4899',
    fields: [
      { name: 'varName', type: 'text', label: '변수명', defaultValue: 'score' },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const varName = ctx.getFieldValue(block, 'varName', 'score');
      ctx.variables.add(varName);
      return `(variables['${varName}'] ?? '')`;
    },
  },

  data_author_name: {
    opcode: 'data_author_name',
    category: 'variables',
    shape: 'reporter',
    label: '👤 메시지 작성자 닉네임',
    description: '메시지를 보낸 사람의 디스코드 닉네임을 가져옵니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof interaction !== 'undefined' ? interaction.user.username : (typeof message !== 'undefined' ? message.author.username : 'Unknown'))`;
    },
  },

  data_author_id: {
    opcode: 'data_author_id',
    category: 'variables',
    shape: 'reporter',
    label: '🆔 메시지 작성자 ID',
    description: '메시지 작성자의 고유 디스코드 유저 ID를 반환합니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof interaction !== 'undefined' ? interaction.user.id : (typeof message !== 'undefined' ? message.author.id : ''))`;
    },
  },

  data_message_content: {
    opcode: 'data_message_content',
    category: 'variables',
    shape: 'reporter',
    label: '📝 메시지 내용 텍스트',
    description: '수신된 메시지의 전체 문자열 본문입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof message !== 'undefined' ? message.content : '')`;
    },
  },

  data_channel_id: {
    opcode: 'data_channel_id',
    category: 'variables',
    shape: 'reporter',
    label: '📢 현재 채널 ID',
    description: '현재 이벤트가 발생한 채널의 고유 ID입니다.',
    color: '#06B6D4',
    fields: [],
    slots: [],
    toTypeScript: () => {
      return `(typeof interaction !== 'undefined' ? interaction.channelId : (typeof message !== 'undefined' ? message.channel.id : ''))`;
    },
  },

  data_db_set: {
    opcode: 'data_db_set',
    category: 'variables',
    shape: 'command',
    label: '💾 영구 DB에 저장 [키: {key}] [값: {val}]',
    description: '봇이 재부팅되어도 사라지지 않는 영구 저장소에 키-값을 저장합니다.',
    color: '#EC4899',
    fields: [
      { name: 'key', type: 'text', label: 'DB 키', defaultValue: 'user_points' },
      { name: 'val', type: 'text', label: '값', defaultValue: '100' },
    ],
    slots: [{ name: 'valInput', type: 'value' }],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const key = ctx.getFieldValue(block, 'key', 'key');
      const val = ctx.resolveInput(block, 'valInput', JSON.stringify(ctx.getFieldValue(block, 'val', '100')));
      return ctx.indent(`await database.set('${key}', ${val});`);
    },
  },

  data_db_get: {
    opcode: 'data_db_get',
    category: 'variables',
    shape: 'reporter',
    label: '📂 영구 DB에서 가져오기 [키: {key}]',
    description: '영구 저장소에서 지정한 키의 값을 불러옵니다.',
    color: '#06B6D4',
    fields: [
      { name: 'key', type: 'text', label: 'DB 키', defaultValue: 'user_points' },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const key = ctx.getFieldValue(block, 'key', 'key');
      return `(await database.get('${key}'))`;
    },
  },

  // ----------------------------------------------------------------------------
  // 6. MODERATION BLOCKS
  // ----------------------------------------------------------------------------
  mod_kick_member: {
    opcode: 'mod_kick_member',
    category: 'moderation',
    shape: 'command',
    label: '👢 유저 추방하기 [유저ID: {userId}] [사유: {reason}]',
    description: '지정한 사용자를 서버에서 즉시 추방(Kick)합니다.',
    color: '#EF4444',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '' },
      { name: 'reason', type: 'text', label: '추방 사유', defaultValue: 'SnapBot 자동 관리 시스템에 의한 추방' },
    ],
    slots: [{ name: 'userIdInput', type: 'value' }],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const userId = ctx.resolveInput(block, 'userIdInput', JSON.stringify(ctx.getFieldValue(block, 'userId', '')));
      const reason = JSON.stringify(ctx.getFieldValue(block, 'reason', '추방'));
      return ctx.indent(`if (interactionOrMsg.guild) {\n  const target = await interactionOrMsg.guild.members.fetch(${userId}).catch(() => null);\n  if (target && target.kickable) await target.kick(${reason});\n}`);
    },
  },

  mod_ban_member: {
    opcode: 'mod_ban_member',
    category: 'moderation',
    shape: 'command',
    label: '🔨 유저 차단(밴)하기 [유저ID: {userId}] [사유: {reason}]',
    description: '지정한 사용자를 서버에서 영구 차단(Ban)합니다.',
    color: '#EF4444',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '' },
      { name: 'reason', type: 'text', label: '차단 사유', defaultValue: '서버 규칙 위반' },
    ],
    slots: [{ name: 'userIdInput', type: 'value' }],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const userId = ctx.resolveInput(block, 'userIdInput', JSON.stringify(ctx.getFieldValue(block, 'userId', '')));
      const reason = JSON.stringify(ctx.getFieldValue(block, 'reason', '차단'));
      return ctx.indent(`if (interactionOrMsg.guild) {\n  await interactionOrMsg.guild.members.ban(${userId}, { reason: ${reason} }).catch(console.error);\n}`);
    },
  },

  mod_timeout_member: {
    opcode: 'mod_timeout_member',
    category: 'moderation',
    shape: 'command',
    label: '⏰ 유저 타임아웃 [유저ID: {userId}] [초: {seconds}]',
    description: '지정 사용자를 일정 시간 동안 메시지를 보낼 수 없도록 타임아웃합니다.',
    color: '#EF4444',
    fields: [
      { name: 'userId', type: 'text', label: '유저 ID', defaultValue: '' },
      { name: 'seconds', type: 'number', label: '타임아웃(초)', defaultValue: 60 },
    ],
    slots: [{ name: 'userIdInput', type: 'value' }],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const userId = ctx.resolveInput(block, 'userIdInput', JSON.stringify(ctx.getFieldValue(block, 'userId', '')));
      const seconds = ctx.getFieldValue(block, 'seconds', 60);
      return ctx.indent(`if (interactionOrMsg.guild) {\n  const member = await interactionOrMsg.guild.members.fetch(${userId}).catch(() => null);\n  if (member) await member.timeout(${Number(seconds) * 1000}, 'SnapBot 타임아웃');\n}`);
    },
  },

  mod_purge_messages: {
    opcode: 'mod_purge_messages',
    category: 'moderation',
    shape: 'command',
    label: '🧹 메시지 일괄 청소 [개수: {count}개]',
    description: '현재 채널의 최근 메시지를 대량으로 일괄 삭제합니다.',
    color: '#EF4444',
    fields: [
      { name: 'count', type: 'number', label: '삭제할 개수', defaultValue: 10 },
    ],
    slots: [],
    toTypeScript: (ctx: CompileContext, block: BlockInstance) => {
      const count = ctx.getFieldValue(block, 'count', 10);
      return ctx.indent(`if ('channel' in interactionOrMsg && interactionOrMsg.channel && 'bulkDelete' in interactionOrMsg.channel) {\n  await interactionOrMsg.channel.bulkDelete(${count}).catch(console.error);\n}`);
    },
  },
};
