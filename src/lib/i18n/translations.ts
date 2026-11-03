// ==============================================================================
// SnapBot Comprehensive i18n Translation Dictionary
// Supported Languages: English ('en' - Default), Japanese ('ja'), Korean ('ko')
// (c) 2026 Workshop-Koharu
// ==============================================================================

export type Language = 'en' | 'ja' | 'ko';

export interface Translations {
  // Navigation & Common
  nav: {
    studio: string;
    dashboard: string;
    explore: string;
    docs: string;
    login: string;
    register: string;
    logout: string;
    startStudio: string;
    newProject: string;
  };
  // Landing Page
  landing: {
    badge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    openStudioBtn: string;
    exploreTemplatesBtn: string;
    assembledSequence: string;
    liveGeneratedCode: string;
    modulesTitle: string;
    modulesSubtitle: string;
    modCoreDesc: string;
    modBlocksDesc: string;
    modCompilerDesc: string;
    modRuntimeDesc: string;
    rightsReserved: string;
  };
  // Studio & IDE
  studio: {
    backToDashboard: string;
    saved: string;
    saving: string;
    undo: string;
    redo: string;
    importJson: string;
    exportJson: string;
    simulatorTab: string;
    codeTab: string;
    searchPlaceholder: string;
    blocksCount: string;
    clickOrDrag: string;
    noBlocksFound: string;
    trash: string;
    dropToDelete: string;
    deleteSelected: string;
    zoomIn: string;
    zoomOut: string;
    resetView: string;
    copyCode: string;
    downloadZip: string;
    compressing: string;
    copied: string;
    zipTip: string;
    mobileBlocks: string;
    mobileCanvas: string;
    mobileSimulator: string;
    mobileCode: string;
  };
  // Categories
  categories: {
    events: string;
    messages: string;
    embeds: string;
    control: string;
    operators: string;
    variables: string;
    discord_data: string;
    moderation: string;
    database: string;
  };
  // Context Menu
  contextMenu: {
    duplicate: string;
    detach: string;
    copyCode: string;
    deleteBlock: string;
    undo: string;
    redo: string;
    cleanUp: string;
    resetView: string;
    clearAll: string;
    clearConfirm: string;
  };
  // Simulator
  simulator: {
    channelTitle: string;
    online: string;
    chatTab: string;
    logsTab: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    inputPlaceholder: string;
    tipSlash: string;
    fillPing: string;
  };
  // Dashboard
  dashboard: {
    title: string;
    subtitle: string;
    createBotBtn: string;
    emptyTitle: string;
    emptySubtitle: string;
    openStudio: string;
    public: string;
    private: string;
    blocksLabel: string;
    modalTitle: string;
    modalSubtitle: string;
    projectNameLabel: string;
    cancel: string;
    confirmCreate: string;
    creating: string;
    deleteConfirm: string;
  };
  // Cookie Banner
  cookies: {
    bannerText: string;
    acceptAll: string;
    decline: string;
    learnMore: string;
  };
  // Legal & Footer
  footer: {
    privacy: string;
    terms: string;
    cookiePolicy: string;
    documentation: string;
    community: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      studio: 'Block Studio',
      dashboard: 'My Projects',
      explore: 'Community Hub',
      docs: 'Docs & API',
      login: 'Sign In',
      register: 'Sign Up',
      logout: 'Sign Out',
      startStudio: 'Launch Studio',
      newProject: 'New Project',
    },
    landing: {
      badge: 'Visual Block Coding Engine for Discord Bots',
      heroTitle1: 'Snap blocks like Scratch,',
      heroTitle2: 'run live in Discord',
      heroSubtitle:
        'A zero-dependency pure TypeScript block IDE with magnetic snapping physics. Assemble visual blocks to generate clean discord.js v14 code instantly.',
      openStudioBtn: 'Open Web Studio',
      exploreTemplatesBtn: 'Browse Templates',
      assembledSequence: 'Assembled Block Sequence',
      liveGeneratedCode: 'Live Generated discord.js v14 Code',
      modulesTitle: 'Modular Architecture',
      modulesSubtitle: 'Built cleanly in TypeScript across 4 dedicated engine packages.',
      modCoreDesc: 'Block data models, magnetic vector snapping physics, serialization, and undo/redo history.',
      modBlocksDesc: 'Over 200 standard Discord blocks: events, messages, embeds, control loops, and moderation.',
      modCompilerDesc: 'Analyzes visual AST trees and transpiles directly into production-ready discord.js code.',
      modRuntimeDesc: 'In-browser Discord simulator to test slash commands, messages, and buttons without a bot token.',
      rightsReserved: 'All rights reserved.',
    },
    studio: {
      backToDashboard: 'Dashboard',
      saved: 'Saved',
      saving: 'Saving...',
      undo: 'Undo (Ctrl+Z)',
      redo: 'Redo (Ctrl+Y)',
      importJson: 'Import',
      exportJson: 'Export',
      simulatorTab: 'Bot Simulator',
      codeTab: 'TS Code',
      searchPlaceholder: 'Search blocks (message, repeat, embed)...',
      blocksCount: 'blocks',
      clickOrDrag: 'Click or drag onto canvas',
      noBlocksFound: 'No matching blocks found.',
      trash: 'Trash',
      dropToDelete: 'Drop here to delete',
      deleteSelected: 'Delete Selected',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      resetView: 'Reset View',
      copyCode: 'Copy Code',
      downloadZip: '1-Click ZIP Download',
      compressing: 'Compressing...',
      copied: 'Copied!',
      zipTip: 'Unzip and run npm install && npm start to launch immediately.',
      mobileBlocks: 'Blocks',
      mobileCanvas: 'Canvas',
      mobileSimulator: 'Simulator',
      mobileCode: 'Code',
    },
    categories: {
      events: 'Events',
      messages: 'Messages & Reactions',
      embeds: 'Embeds & UI',
      control: 'Control & Loops',
      operators: 'Operators & Logic',
      variables: 'Variables & Lists',
      discord_data: 'Discord Info',
      moderation: 'Moderation & Security',
      database: 'Persistent DB',
    },
    contextMenu: {
      duplicate: 'Duplicate Block',
      detach: 'Detach Block',
      copyCode: 'Copy Generated Code',
      deleteBlock: 'Delete Block',
      undo: 'Undo',
      redo: 'Redo',
      cleanUp: 'Clean Up Blocks',
      resetView: 'Fit View (100%)',
      clearAll: 'Clear All Blocks',
      clearConfirm: 'Are you sure you want to delete all blocks on the canvas?',
    },
    simulator: {
      channelTitle: 'Virtual Channel (general)',
      online: 'Online',
      chatTab: 'Chat',
      logsTab: 'Logs',
      welcomeTitle: 'Welcome to #general!',
      welcomeSubtitle: 'Simulate and test your visual Discord bot in real-time right in your browser.',
      inputPlaceholder: 'Message #general or type /ping...',
      tipSlash: 'Tip: Execute slash commands using /commandName',
      fillPing: 'Try /ping',
    },
    dashboard: {
      title: 'Discord Bot Projects',
      subtitle: 'Create and manage your visual Discord bot workspaces.',
      createBotBtn: 'New Project',
      emptyTitle: 'No bot projects yet',
      emptySubtitle: 'Build your first visual block Discord bot in under a minute!',
      openStudio: 'Open Studio',
      public: 'Public',
      private: 'Private',
      blocksLabel: 'blocks',
      modalTitle: 'Create New Bot Project',
      modalSubtitle: 'Enter your project name to launch the studio workspace.',
      projectNameLabel: 'Project Name',
      cancel: 'Cancel',
      confirmCreate: 'Create Project',
      creating: 'Creating...',
      deleteConfirm: 'Are you sure you want to delete this bot project?',
    },
    cookies: {
      bannerText:
        'We use cookies to maintain your login session, save your language preferences, and store your bot projects.',
      acceptAll: 'Accept All',
      decline: 'Essential Only',
      learnMore: 'Cookie Policy',
    },
    footer: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookiePolicy: 'Cookie Policy',
      documentation: 'Documentation',
      community: 'Community',
    },
  },

  ja: {
    nav: {
      studio: 'ブロックスタジオ',
      dashboard: 'マイプロジェクト',
      explore: 'コミュニティ',
      docs: 'ドキュメント & API',
      login: 'ログイン',
      register: '新規登録',
      logout: 'ログアウト',
      startStudio: 'スタジオを開く',
      newProject: '新規プロジェクト',
    },
    landing: {
      badge: 'Discord Bot向けビジュアルブロックコーディングエンジン',
      heroTitle1: 'Scratchのように組み立てて、',
      heroTitle2: 'Discordで即座に動く自分だけのBot',
      heroSubtitle:
        '外部ライブラリに依存しない純粋なTypeScript磁石スナップエンジン。ブロックを組み立てるだけで、discord.js v14コードがリアルタイムに自動生成されます。',
      openStudioBtn: 'Webスタジオを開く',
      exploreTemplatesBtn: 'テンプレート一覧',
      assembledSequence: '組み立てられたブロック構成',
      liveGeneratedCode: 'リアルタイム生成されたdiscord.jsコード',
      modulesTitle: 'モジュール型アーキテクチャ',
      modulesSubtitle: '4つの専門エンジンパッケージにより強固に設計されています。',
      modCoreDesc: 'ブロックデータモデル、磁石ベクトルスナップ物理、JSON保存/読込、履歴管理。',
      modBlocksDesc: 'イベント、メッセージ、Embed、ループ、管理機能など200種以上の標準ブロック。',
      modCompilerDesc: 'ビジュアルASTを解析し、本番で即実行可能なdiscord.jsコードへ変換。',
      modRuntimeDesc: 'トークンなしでブラウザ上でコマンドやボタン動作をテストできるシミュレータ。',
      rightsReserved: 'All rights reserved.',
    },
    studio: {
      backToDashboard: 'ダッシュボード',
      saved: '保存済み',
      saving: '保存中...',
      undo: '元に戻す (Ctrl+Z)',
      redo: 'やり直し (Ctrl+Y)',
      importJson: '読み込み',
      exportJson: '書き出し',
      simulatorTab: 'Botシミュレータ',
      codeTab: 'TSコード',
      searchPlaceholder: 'ブロックを検索 (メッセージ、繰り返し、Embed)...',
      blocksCount: '個のブロック',
      clickOrDrag: 'クリックまたはドラッグして配置',
      noBlocksFound: '一致するブロックが見つかりません。',
      trash: 'ゴミ箱',
      dropToDelete: 'ここにドロップして削除',
      deleteSelected: '選択ブロックを削除',
      zoomIn: '拡大',
      zoomOut: '縮小',
      resetView: '表示リセット',
      copyCode: 'コードをコピー',
      downloadZip: 'ワンクリックZIP保存',
      compressing: '圧縮中...',
      copied: 'コピー完了!',
      zipTip: '解凍後、npm install && npm start で即座に実行できます。',
      mobileBlocks: 'ブロック',
      mobileCanvas: 'キャンバス',
      mobileSimulator: 'シミュレータ',
      mobileCode: 'コード',
    },
    categories: {
      events: 'イベント',
      messages: 'メッセージ & リアクション',
      embeds: 'Embed & UI',
      control: '制御 & ループ',
      operators: '演算 & 論理',
      variables: '変数 & リスト',
      discord_data: 'Discord情報',
      moderation: 'サーバー管理 & セキュリティ',
      database: '永続DBストレージ',
    },
    contextMenu: {
      duplicate: 'ブロックを複製',
      detach: 'ブロックを切り離す',
      copyCode: '生成コードをコピー',
      deleteBlock: 'ブロックを削除',
      undo: '元に戻す',
      redo: 'やり直し',
      cleanUp: 'ブロックを自動整列',
      resetView: '表示倍率をリセット (100%)',
      clearAll: '全ブロックを削除',
      clearConfirm: 'キャンバス上のすべてのブロックを削除しますか？',
    },
    simulator: {
      channelTitle: '仮想チャンネル (general)',
      online: 'オンライン',
      chatTab: 'チャット',
      logsTab: 'ログ',
      welcomeTitle: '#general チャンネルへようこそ！',
      welcomeSubtitle: '組み立てたDiscord Botをブラウザ上でリアルタイムにテストできます。',
      inputPlaceholder: '#general にメッセージ送信または /ping 入力...',
      tipSlash: 'ヒント: スラッシュコマンドは /コマンド名 で実行できます。',
      fillPing: '/ping を試す',
    },
    dashboard: {
      title: 'Discord Bot プロジェクト',
      subtitle: 'ビジュアルブロックで作成したBotプロジェクトを管理します。',
      createBotBtn: '新規プロジェクト作成',
      emptyTitle: 'プロジェクトがまだありません',
      emptySubtitle: '1分で最初のブロックDiscord Botを作成してみましょう！',
      openStudio: 'スタジオを開く',
      public: '公開',
      private: '非公開',
      blocksLabel: 'ブロック',
      modalTitle: '新規Botプロジェクト作成',
      modalSubtitle: 'プロジェクト名を入力してスタジオを開始してください。',
      projectNameLabel: 'プロジェクト名',
      cancel: 'キャンセル',
      confirmCreate: 'プロジェクト作成',
      creating: '作成中...',
      deleteConfirm: '本当にこのBotプロジェクトを削除しますか？',
    },
    cookies: {
      bannerText:
        '当サービスでは、セッションの維持、言語設定の保存、Botプロジェクトの管理のためにCookieを使用しています。',
      acceptAll: 'すべて同意',
      decline: '必須のみ',
      learnMore: 'Cookieポリシー',
    },
    footer: {
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
      cookiePolicy: 'Cookieポリシー',
      documentation: 'ドキュメント',
      community: 'コミュニティ',
    },
  },

  ko: {
    nav: {
      studio: '블록 스튜디오',
      dashboard: '내 프로젝트',
      explore: '커뮤니티 허브',
      docs: '공식 가이드 & API',
      login: '로그인',
      register: '회원가입',
      logout: '로그아웃',
      startStudio: '스튜디오 시작',
      newProject: '새 프로젝트',
    },
    landing: {
      badge: '비주얼 블록 코딩 디스코드 봇 플랫폼',
      heroTitle1: '스크래치처럼 조립하고,',
      heroTitle2: '디스코드에서 바로 작동하는 나만의 봇',
      heroSubtitle:
        '외부 라이브러리에 종속되지 않는 순수 TypeScript 자석 스냅 물리 엔진. 블록을 맞추면 discord.js v14 최신 코드가 실시간 자동 완성됩니다.',
      openStudioBtn: '블록 스튜디오 열기',
      exploreTemplatesBtn: '공개 템플릿 둘러보기',
      assembledSequence: '조립된 블록 시퀀스',
      liveGeneratedCode: '실시간 생성된 discord.js v14 소스코드',
      modulesTitle: '독립된 4대 핵심 패키지',
      modulesSubtitle: '4개의 자체 전용 엔진 패키지로 완성도 높게 구축되었습니다.',
      modCoreDesc: '블록 트리 데이터 모델, 자석 스냅 물리 엔진, 직렬화 및 Undo/Redo 이력 관리자.',
      modBlocksDesc: '이벤트, 메시지, 임베드, 제어문, 연산자, 변수, 관리(Mod) 등 200+ 표준 블록 정의.',
      modCompilerDesc: '조립된 블록을 분석하여 실행 가능한 클린 discord.js v14 TypeScript 코드로 트랜스파일.',
      modRuntimeDesc: '토큰 없이도 웹 브라우저 내 가상 채팅방에서 실시간으로 봇 동작을 검증하는 시뮬레이터.',
      rightsReserved: 'All rights reserved.',
    },
    studio: {
      backToDashboard: '대시보드',
      saved: '저장됨',
      saving: '저장 중...',
      undo: '실행 취소 (Ctrl+Z)',
      redo: '다시 실행 (Ctrl+Y)',
      importJson: '불러오기',
      exportJson: '내보내기',
      simulatorTab: '봇 시뮬레이터',
      codeTab: 'TS 코드',
      searchPlaceholder: '블록 검색 (메시지, 반복, 임베드)...',
      blocksCount: '개 블록',
      clickOrDrag: '클릭하거나 드래그하여 조립',
      noBlocksFound: '일치하는 블록이 없습니다.',
      trash: '휴지통',
      dropToDelete: '놓아서 삭제',
      deleteSelected: '선택 블록 삭제',
      zoomIn: '확대',
      zoomOut: '축소',
      resetView: '화면 리셋',
      copyCode: '코드 복사',
      downloadZip: '원클릭 ZIP 다운로드',
      compressing: '압축 중...',
      copied: '복사됨!',
      zipTip: '압축 해제 후 npm install && npm start 로 즉시 실행 가능합니다.',
      mobileBlocks: '블록',
      mobileCanvas: '캔버스',
      mobileSimulator: '시뮬레이터',
      mobileCode: '코드',
    },
    categories: {
      events: '이벤트',
      messages: '메시지 & 반응',
      embeds: '임베드 & UI',
      control: '흐름 제어 & 반복',
      operators: '연산 & 논리',
      variables: '변수 & 리스트',
      discord_data: '디스코드 정보',
      moderation: '서버 관리 & 보안',
      database: '영구 DB 저장소',
    },
    contextMenu: {
      duplicate: '블록 복제',
      detach: '블록 분리',
      copyCode: '생성 코드 복사',
      deleteBlock: '블록 삭제',
      undo: '실행 취소',
      redo: '다시 실행',
      cleanUp: '블록 자동 정렬',
      resetView: '화면 맞춤 (100%)',
      clearAll: '모든 블록 삭제',
      clearConfirm: '캔버스의 모든 블록을 삭제하시겠습니까?',
    },
    simulator: {
      channelTitle: '가상 테스트 채널 (general)',
      online: '온라인',
      chatTab: '채팅',
      logsTab: '로그',
      welcomeTitle: '#general 채널에 오신 것을 환영합니다!',
      welcomeSubtitle: '스튜디오에서 조립한 블록 디스코드 봇을 실시간으로 테스트해볼 수 있는 가상 공간입니다.',
      inputPlaceholder: '#general 에 메시지 전송 또는 /ping 입력...',
      tipSlash: '팁: 슬래시 명령어는 /명령어이름 형태로 입력하세요.',
      fillPing: '/ping 테스트 채우기',
    },
    dashboard: {
      title: '디스코드 봇 프로젝트',
      subtitle: '블록으로 제작 중인 모든 디스코드 봇 목록입니다.',
      createBotBtn: '새 프로젝트 생성',
      emptyTitle: '아직 생성된 봇 프로젝트가 없습니다',
      emptySubtitle: '단 1분 만에 첫 번째 블록 디스코드 봇을 만들고 실행해 보세요!',
      openStudio: '스튜디오 열기',
      public: '공개',
      private: '비공개',
      blocksLabel: '개 블록',
      modalTitle: '새 봇 프로젝트 생성',
      modalSubtitle: '프로젝트 이름을 입력하고 스튜디오를 시작하세요.',
      projectNameLabel: '프로젝트 이름',
      cancel: '취소',
      confirmCreate: '프로젝트 시작',
      creating: '생성 중...',
      deleteConfirm: '정말로 이 봇 프로젝트를 삭제하시겠습니까?',
    },
    cookies: {
      bannerText:
        'SnapBot은 세션 로그인 유지, 언어 설정 보관 및 봇 프로젝트 저장을 위해 쿠키를 사용합니다.',
      acceptAll: '모두 동의',
      decline: '필수만 허용',
      learnMore: '쿠키 정책',
    },
    footer: {
      privacy: '개인정보 처리방침',
      terms: '이용약관',
      cookiePolicy: '쿠키 정책',
      documentation: '공식 문서',
      community: '커뮤니티',
    },
  },
};

