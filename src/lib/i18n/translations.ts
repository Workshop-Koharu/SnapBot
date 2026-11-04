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
    settings: string;
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
    exportLanguage: string;
    exportTypeScript: string;
    exportJavaScript: string;
    exportPython: string;
    downloadFile: string;
    authRequiredTitle: string;
    authRequiredDesc: string;
    loginToContinue: string;
    registerToContinue: string;
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
    integrations: string;
    audio: string;
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
    channelsTitle: string;
    textChannels: string;
    voiceChannels: string;
    announcementChannels: string;
    forumChannels: string;
    addChannelBtn: string;
    channelNamePlaceholder: string;
    channelTypeLabel: string;
    voiceConnected: string;
    voiceDisconnected: string;
    joinVoice: string;
    leaveVoice: string;
    muteMic: string;
    unmuteMic: string;
    deafen: string;
    undeafen: string;
    voiceLocalOnlyNotice: string;
    newForumPost: string;
    postTitlePlaceholder: string;
    postContentPlaceholder: string;
    createPost: string;
    forumEmpty: string;
  };
  // Explore / Templates
  explore: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    all: string;
    utility: string;
    welcome: string;
    moderation: string;
    database: string;
    integrations: string;
    remixBtn: string;
    blocksLabel: string;
    authorLabel: string;
    tplPingTitle: string;
    tplPingDesc: string;
    tplWelcomeTitle: string;
    tplWelcomeDesc: string;
    tplModTitle: string;
    tplModDesc: string;
    tplDbTitle: string;
    tplDbDesc: string;
    tplApiTitle: string;
    tplApiDesc: string;
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
    manageSettings: string;
    settingsTitle: string;
    settingsDesc: string;
    savePreferences: string;
    rejectOptional: string;
    essentialTitle: string;
    essentialDesc: string;
    functionalTitle: string;
    functionalDesc: string;
    analyticsTitle: string;
    analyticsDesc: string;
    marketingTitle: string;
    marketingDesc: string;
    alwaysActive: string;
  };
  // Legal & Footer
  footer: {
    privacy: string;
    terms: string;
    cookiePolicy: string;
    documentation: string;
    community: string;
  };
  // User Settings Page
  settings: {
    title: string;
    subtitle: string;
    profileTab: string;
    preferencesTab: string;
    securityTab: string;
    cookiesTab: string;
    nicknameLabel: string;
    emailLabel: string;
    verifiedBadge: string;
    languageLabel: string;
    soundsLabel: string;
    soundsDesc: string;
    testSnapBtn: string;
    testBloopBtn: string;
    defaultExportLabel: string;
    saveBtn: string;
    savedToast: string;
    dangerZone: string;
    clearDraftsBtn: string;
    clearDraftsDesc: string;
    deleteAccountBtn: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      studio: 'Block Studio',
      dashboard: 'My Projects',
      explore: 'Community Hub',
      docs: 'Docs & API',
      settings: 'Settings',
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
      exportLanguage: 'Target Language',
      exportTypeScript: 'TypeScript (discord.js)',
      exportJavaScript: 'JavaScript (Node.js)',
      exportPython: 'Python (discord.py)',
      downloadFile: 'Download Code',
      authRequiredTitle: 'Sign In Required',
      authRequiredDesc: 'Please sign in or create an account to access the Block Studio IDE.',
      loginToContinue: 'Sign In',
      registerToContinue: 'Sign Up',
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
      integrations: 'API & Hardware',
      audio: 'Voice & Audio',
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
      channelsTitle: 'CHANNELS',
      textChannels: 'TEXT CHANNELS',
      voiceChannels: 'VOICE CHANNELS',
      announcementChannels: 'ANNOUNCEMENTS',
      forumChannels: 'FORUMS',
      addChannelBtn: 'Add Channel',
      channelNamePlaceholder: 'channel-name',
      channelTypeLabel: 'Channel Type',
      voiceConnected: 'Voice Connected',
      voiceDisconnected: 'Voice Disconnected',
      joinVoice: 'Join Voice',
      leaveVoice: 'Disconnect',
      muteMic: 'Mute',
      unmuteMic: 'Unmute',
      deafen: 'Deafen',
      undeafen: 'Undeafen',
      voiceLocalOnlyNotice: 'Voice status is simulated locally in browser and never sent to any server.',
      newForumPost: 'New Forum Post',
      postTitlePlaceholder: 'Post Title',
      postContentPlaceholder: 'Write your post here...',
      createPost: 'Publish Post',
      forumEmpty: 'No forum posts yet. Create the first discussion thread!',
    },
    explore: {
      badge: 'Bot Template Gallery',
      title: 'Featured Discord Bot Templates',
      subtitle: 'Pick a pre-configured template and remix it instantly into your studio workspace.',
      searchPlaceholder: 'Search templates (e.g. Welcome, Moderation, API)...',
      all: 'All',
      utility: 'Utility',
      welcome: 'Welcome',
      moderation: 'Moderation',
      database: 'Database',
      integrations: 'API & Hardware',
      remixBtn: 'Remix to Studio',
      blocksLabel: 'blocks',
      authorLabel: 'Author',
      tplPingTitle: 'Ping Pong & Interactive Button Bot',
      tplPingDesc: 'Handles basic /ping slash command replies and interactive Discord button click events.',
      tplWelcomeTitle: 'Auto Welcome & Rich Embed Bot',
      tplWelcomeDesc: 'Automatically greets new members with colorful embed cards and server rules when they join.',
      tplModTitle: 'Moderation & Bulk Cleaner Bot',
      tplModDesc: 'Enforces moderation rules with timeout, kick, and bulk message cleanup in channels.',
      tplDbTitle: 'Persistent DB Points & Daily Streak',
      tplDbDesc: 'Persists user points and daily streak data across restarts using built-in database blocks.',
      tplApiTitle: 'OpenAI & Weather REST API Bot',
      tplApiDesc: 'Calls external AI endpoints and weather APIs to respond with live data in Discord.',
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
      manageSettings: 'Cookie Settings',
      settingsTitle: 'Privacy & Cookie Preferences',
      settingsDesc: 'Configure which cookies you allow us to store on your device.',
      savePreferences: 'Save Preferences',
      rejectOptional: 'Reject Optional',
      essentialTitle: 'Strictly Necessary Cookies',
      essentialDesc: 'Required for core authentication, security, and project storage. Cannot be disabled.',
      functionalTitle: 'Functional & Preferences',
      functionalDesc: 'Remembers your language choice, active layout tabs, and editor preferences.',
      analyticsTitle: 'Performance & Diagnostics',
      analyticsDesc: 'Helps us measure compilation performance and diagnose unexpected editor errors.',
      marketingTitle: 'Integration & External APIs',
      marketingDesc: 'Enables external webhook previews and third-party API test fixtures.',
      alwaysActive: 'Always Active',
    },
    footer: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookiePolicy: 'Cookie Policy',
      documentation: 'Documentation',
      community: 'Community',
    },
    settings: {
      title: 'Preferences & Settings',
      subtitle: 'Manage your profile nickname, sound effects, UI language, and bot defaults.',
      profileTab: 'Profile',
      preferencesTab: 'Preferences',
      securityTab: 'Security',
      cookiesTab: 'Cookies',
      nicknameLabel: 'Display Nickname',
      emailLabel: 'Email Address',
      verifiedBadge: 'Verified',
      languageLabel: 'Platform Language',
      soundsLabel: 'Sound Effects',
      soundsDesc: 'Play audio feedback on magnetic block snap, trash deletion, and simulator messages.',
      testSnapBtn: 'Test Snap Sound',
      testBloopBtn: 'Test Message Bloop',
      defaultExportLabel: 'Default Code Export',
      saveBtn: 'Save Settings',
      savedToast: 'Settings saved successfully!',
      dangerZone: 'Danger Zone',
      clearDraftsBtn: 'Clear Local Workspace Drafts',
      clearDraftsDesc: 'Removes locally cached offline project drafts from browser storage.',
      deleteAccountBtn: 'Delete Account',
    },
  },

  ja: {
    nav: {
      studio: 'ブロックスタジオ',
      dashboard: 'マイプロジェクト',
      explore: 'コミュニティ',
      docs: 'ドキュメント & API',
      settings: '設定',
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
      exportLanguage: '対象言語',
      exportTypeScript: 'TypeScript (discord.js)',
      exportJavaScript: 'JavaScript (Node.js)',
      exportPython: 'Python (discord.py)',
      downloadFile: 'コード単体保存',
      authRequiredTitle: 'ログインが必要です',
      authRequiredDesc: 'ブロックスタジオを利用するにはログインまたは新規登録を行ってください。',
      loginToContinue: 'ログイン',
      registerToContinue: '新規登録',
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
      integrations: 'API & ハードウェア',
      audio: '音声 & サウンド',
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
      channelsTitle: 'チャンネル一覧',
      textChannels: 'テキストチャンネル',
      voiceChannels: 'ボイスチャンネル',
      announcementChannels: 'アナウンスチャンネル',
      forumChannels: 'フォーラムチャンネル',
      addChannelBtn: 'チャンネル追加',
      channelNamePlaceholder: 'チャンネル名',
      channelTypeLabel: 'チャンネルの種類',
      voiceConnected: 'ボイス接続中',
      voiceDisconnected: 'ボイス未接続',
      joinVoice: 'ボイス接続',
      leaveVoice: '接続切断',
      muteMic: 'ミュート',
      unmuteMic: 'ミュート解除',
      deafen: 'スピーカーOFF',
      undeafen: 'スピーカーON',
      voiceLocalOnlyNotice: 'ボイス接続はブラウザ内でローカルシミュレートされ、サーバーには送信されません。',
      newForumPost: '新規投稿',
      postTitlePlaceholder: '投稿のタイトル',
      postContentPlaceholder: '投稿内容を入力...',
      createPost: '投稿を作成',
      forumEmpty: 'フォーラムの投稿はまだありません。最初のスレッドを作成しましょう！',
    },
    explore: {
      badge: 'Botテンプレートギャラリー',
      title: '公式Discord Botテンプレート',
      subtitle: '設定済みテンプレートを選んで、ワンクリックでスタジオへリミックス(Remix)できます。',
      searchPlaceholder: 'テンプレート検索 (例: 歓迎, 管理, API)...',
      all: 'すべて',
      utility: '便利機能',
      welcome: '自動歓迎',
      moderation: 'サーバー管理',
      database: 'データベース',
      integrations: 'API & ハードウェア',
      remixBtn: 'スタジオへリミックス',
      blocksLabel: '個のブロック',
      authorLabel: '作成者',
      tplPingTitle: 'ピンポン & インタラクティブボタンBot',
      tplPingDesc: '基本的な /ping スラッシュコマンドとクリック可能なDiscordボタンイベントを処理します。',
      tplWelcomeTitle: '自動歓迎 & リッチEmbed案内Bot',
      tplWelcomeDesc: '新しいメンバーが参加した際、カラーEmbedカードとサーバー規約を自動案内します。',
      tplModTitle: 'モデレーション & 一括削除自動Bot',
      tplModDesc: 'タイムアウト、追放(Kick)、チャンネル内のメッセージ一括削除を実行します。',
      tplDbTitle: '永続DBポイント & デイリーログインBot',
      tplDbDesc: '内蔵データベースブロックを活用し、再起動後もユーザーのポイントと記録を保持します。',
      tplApiTitle: 'OpenAI & 天気予報 REST API Bot',
      tplApiDesc: '外部AIエンドポイントや天気APIを呼び出し、リアルタイムな情報をDiscordへ送信します。',
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
      manageSettings: 'Cookie設定',
      settingsTitle: 'プライバシー & Cookie設定',
      settingsDesc: '端末に保存を許可するCookieの種類を選択してください。',
      savePreferences: '設定を保存',
      rejectOptional: '任意のCookieを拒否',
      essentialTitle: '必須Cookie',
      essentialDesc: 'ログイン認証、セッション維持、セキュリティに不可欠です。無効化できません。',
      functionalTitle: '機能 & 設定Cookie',
      functionalDesc: '選択した言語やUIレイアウト設定を記憶します。',
      analyticsTitle: 'パフォーマンス & 診断',
      analyticsDesc: 'コードコンパイルの処理時間や予期しないエラーの診断に役立てられます。',
      marketingTitle: '外部連携 & API',
      marketingDesc: 'Webhook連携や外部APIテスト機能の利用を円滑にします。',
      alwaysActive: '常に有効',
    },
    footer: {
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
      cookiePolicy: 'Cookieポリシー',
      documentation: 'ドキュメント',
      community: 'コミュニティ',
    },
    settings: {
      title: '環境設定 & アカウント',
      subtitle: 'プロフィールニックネーム、効果音、UI言語、ボットの初期設定を管理します。',
      profileTab: 'プロフィール',
      preferencesTab: '環境設定',
      securityTab: 'セキュリティ',
      cookiesTab: 'クッキー',
      nicknameLabel: '表示ニックネーム',
      emailLabel: 'メールアドレス',
      verifiedBadge: '認証済み',
      languageLabel: '言語設定',
      soundsLabel: '効果音',
      soundsDesc: 'ブロックの磁石スナップ、削除、シミュレータのメッセージ着信時に効果音を再生します。',
      testSnapBtn: 'スナップ音テスト',
      testBloopBtn: '着信音テスト',
      defaultExportLabel: 'デフォルト出力形式',
      saveBtn: '設定を保存',
      savedToast: '設定が保存されました！',
      dangerZone: '危険なゾーン',
      clearDraftsBtn: 'ローカルの下書きを消去',
      clearDraftsDesc: 'ブラウザにキャッシュされたオフラインプロジェクトのドラフトを消去します。',
      deleteAccountBtn: 'アカウント削除',
    },
  },

  ko: {
    nav: {
      studio: '블록 스튜디오',
      dashboard: '내 프로젝트',
      explore: '커뮤니티 허브',
      docs: '공식 가이드 & API',
      settings: '설정',
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
      exportLanguage: '대상 언어',
      exportTypeScript: 'TypeScript (discord.js)',
      exportJavaScript: 'JavaScript (Node.js)',
      exportPython: 'Python (discord.py)',
      downloadFile: '코드 단일 파일 저장',
      authRequiredTitle: '로그인이 필요합니다',
      authRequiredDesc: '블록 스튜디오를 사용하시려면 로그인 또는 무료 회원가입을 완료해 주세요.',
      loginToContinue: '로그인',
      registerToContinue: '회원가입',
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
      integrations: 'API & 하드웨어',
      audio: '음성 & 사운드 (Voice)',
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
      channelsTitle: '채널 목록',
      textChannels: '채팅 채널',
      voiceChannels: '음성 채널',
      announcementChannels: '공지 채널',
      forumChannels: '포럼 채널',
      addChannelBtn: '채널 추가',
      channelNamePlaceholder: '채널 이름',
      channelTypeLabel: '채널 유형',
      voiceConnected: '음성 통화 연결됨',
      voiceDisconnected: '음성 통화 종료됨',
      joinVoice: '음성 연결',
      leaveVoice: '연결 끊기',
      muteMic: '마이크 끄기',
      unmuteMic: '마이크 켜기',
      deafen: '스피커 끄기',
      undeafen: '스피커 켜기',
      voiceLocalOnlyNotice: '음성 채널 상태는 브라우저 로컬 스토리지에만 저장되며 외부 서버로 절대 전송되지 않습니다.',
      newForumPost: '새 포럼 글 작성',
      postTitlePlaceholder: '게시글 제목',
      postContentPlaceholder: '토론 또는 질문 내용을 작성하세요...',
      createPost: '게시글 등록',
      forumEmpty: '아직 포럼 게시글이 없습니다. 첫 번째 토론 글을 작성해 보세요!',
    },
    explore: {
      badge: '봇 템플릿 갤러리',
      title: '공식 디스코드 봇 템플릿',
      subtitle: '검증된 블록 조합 템플릿을 선택하여 내 스튜디오로 원클릭 리믹스(Remix)하세요.',
      searchPlaceholder: '템플릿 검색 (예: 환영, 관리, API, DB)...',
      all: '전체',
      utility: '편의 기능',
      welcome: '자동 환영',
      moderation: '서버 관리',
      database: '데이터베이스',
      integrations: 'API & 하드웨어',
      remixBtn: '내 작업실로 리믹스 (Remix)',
      blocksLabel: '개 블록',
      authorLabel: '제작자',
      tplPingTitle: '핑퐁 & 인터랙티브 버튼 봇',
      tplPingDesc: '기본적인 /ping 슬래시 명령어 응답과 클릭 가능한 디스코드 버튼 이벤트를 처리하는 입문용 봇입니다.',
      tplWelcomeTitle: '서버 자동 환영 & 임베드 안내 봇',
      tplWelcomeDesc: '새로운 멤버가 디스코드 서버에 입장했을 때 아름다운 컬러 임베드 카드와 서버 규칙을 자동으로 안내합니다.',
      tplModTitle: '서버 관리 & 일괄 청소 자동 봇',
      tplModDesc: '명령어로 유저 타임아웃, 추방(Kick)을 실행하고 채팅 채널의 이전 메시지를 일괄 삭제(Bulk Delete)합니다.',
      tplDbTitle: '영구 DB 포인트 & 출석체크 봇',
      tplDbDesc: '영구 데이터베이스 블록을 활용하여 유저별 점수 및 출석 데이터를 재부팅 후에도 영구 저장하고 조회합니다.',
      tplApiTitle: 'OpenAI & 날씨 REST API 연동 봇',
      tplApiDesc: '외부 날씨 및 인공지능 API 엔드포인트를 호출하여 실시간 정보를 디스코드 채팅방에 전송합니다.',
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
      manageSettings: '쿠키 설정',
      settingsTitle: '개인정보 및 쿠키 설정',
      settingsDesc: '브라우저 기기에 저장되는 쿠키의 범위를 직접 구성하실 수 있습니다.',
      savePreferences: '설정 저장',
      rejectOptional: '선택 쿠키 거부',
      essentialTitle: '필수 쿠키 (Strictly Necessary)',
      essentialDesc: '회원 인증 세션, 사이트 보안 및 봇 프로젝트 저장에 필수적이며 비활성화할 수 없습니다.',
      functionalTitle: '기능 및 개인화 쿠키',
      functionalDesc: '선택하신 언어 설정, 스튜디오 레이아웃 및 환경 설정을 브라우저에 기억합니다.',
      analyticsTitle: '성능 및 진단 쿠키',
      analyticsDesc: '블록 코드 컴파일 성능을 측정하고 예기치 못한 에러를 진단하는 데 활용됩니다.',
      marketingTitle: '외부 연동 및 하드웨어 API',
      marketingDesc: '외부 웹훅 및 IoT 장치와의 안전한 데이터 교환을 보조합니다.',
      alwaysActive: '항상 활성',
    },
    footer: {
      privacy: '개인정보 처리방침',
      terms: '이용약관',
      cookiePolicy: '쿠키 정책',
      documentation: '공식 문서',
      community: '커뮤니티',
    },
    settings: {
      title: '환경설정 및 계정 관리',
      subtitle: '프로필 닉네임, UI 효과음, 표시 언어 및 디스코드 봇 기본값을 관리합니다.',
      profileTab: '프로필',
      preferencesTab: '환경설정',
      securityTab: '보안',
      cookiesTab: '쿠키',
      nicknameLabel: '표시 닉네임',
      emailLabel: '이메일 주소',
      verifiedBadge: '인증됨',
      languageLabel: '기본 표시 언어',
      soundsLabel: '인터랙션 효과음',
      soundsDesc: '블록 자석 스냅 결합, 휴지통 삭제, 가상 시뮬레이터 메시지 수신 시 오디오 피드백을 재생합니다.',
      testSnapBtn: '스냅 사운드 테스트',
      testBloopBtn: '메시지 알림음 테스트',
      defaultExportLabel: '기본 코드 내보내기 형식',
      saveBtn: '설정 저장',
      savedToast: '설정이 성공적으로 저장되었습니다!',
      dangerZone: '위험 구역',
      clearDraftsBtn: '로컬 오프라인 작업 임시데이터 초기화',
      clearDraftsDesc: '브라우저에 임시 보관된 로컬 프로젝트 드래프트 데이터를 완전히 삭제합니다.',
      deleteAccountBtn: '계정 탈퇴',
    },
  },
};

