'use client';

// ==============================================================================
// SnapBot In-Browser Discord Bot Simulator View
// Full multi-channel support: Text, Voice, Announcement, and Forum channels
// Voice states are 100% strictly local in localStorage and never sent to servers
// (c) 2026 Workshop-Koharu
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { BotSimulator, SimMessage, SimLog } from '@/lib/snapbot/runtime/simulator';
import { useI18n } from '@/lib/i18n/context';
import {
  Send,
  Bot,
  User,
  Trash2,
  Terminal,
  MessageCircle,
  Hash,
  Volume2,
  Megaphone,
  MessagesSquare,
  Plus,
  Mic,
  MicOff,
  Headphones,
  PhoneOff,
  Radio,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  X,
  ExternalLink,
} from 'lucide-react';
import { sounds } from '@/lib/audio/sounds';

export type ChannelType = 'text' | 'voice' | 'announcement' | 'forum';

export interface SimChannel {
  id: string;
  name: string;
  type: ChannelType;
  unread?: number;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  repliesCount: number;
  createdAt: string;
}

interface SimulatorPaneProps {
  simulator: BotSimulator;
}

const DEFAULT_CHANNELS: SimChannel[] = [
  { id: 'general', name: 'general', type: 'text' },
  { id: 'bot-commands', name: 'bot-commands', type: 'text' },
  { id: 'announcements', name: 'announcements', type: 'announcement' },
  { id: 'general-voice', name: 'General Voice', type: 'voice' },
  { id: 'discussions', name: 'feature-discussions', type: 'forum' },
];

function extractDiscordLinkEmbed(text?: string) {
  if (!text) return null;
  const match = text.match(/https?:\/\/[^\s]+/i);
  if (!match) return null;
  const url = match[0];

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    if (host.includes('snapbot.koharu.live') || host.includes('koharu.live')) {
      return {
        url,
        provider: 'SnapBot Platform',
        title: 'SnapBot — Visual Block-Coding IDE for Discord Bots',
        description:
          'Build powerful Discord bots visually with zero latency, Scratch & Entry style magnetic snapping, and real-time discord.js v14 compilation.',
        color: '#6366F1',
        thumbnail: 'https://snapbot.koharu.live/icon.png',
        hasComponentV2: true,
      };
    }
    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      return {
        url,
        provider: 'YouTube',
        title: 'YouTube Media Content',
        description: 'Watch video streams, tutorials, and music on YouTube.',
        color: '#FF0000',
        thumbnail: 'https://www.youtube.com/favicon.ico',
        hasComponentV2: false,
      };
    }
    if (host.includes('discord.com') || host.includes('discord.gg')) {
      return {
        url,
        provider: 'Discord',
        title: 'Discord Application & Components V2 Preview',
        description: 'Interactive Discord components v2 with ActionRows, SelectMenus, and Buttons.',
        color: '#5865F2',
        thumbnail: null,
        hasComponentV2: true,
      };
    }
    return {
      url,
      provider: host,
      title: host,
      description: `External link preview: ${url}`,
      color: '#4752C4',
      thumbnail: null,
      hasComponentV2: false,
    };
  } catch {
    return null;
  }
}

export const SimulatorPane: React.FC<SimulatorPaneProps> = ({ simulator }) => {
  const { t } = useI18n();
  const [messages, setMessages] = useState<SimMessage[]>([]);
  const [logs, setLogs] = useState<SimLog[]>([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'logs'>('chat');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Channels state (persisted strictly in localStorage)
  const [channels, setChannels] = useState<SimChannel[]>(DEFAULT_CHANNELS);
  const [activeChannelId, setActiveChannelId] = useState<string>('general');

  // Add Channel Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChanName, setNewChanName] = useState('');
  const [newChanType, setNewChanType] = useState<ChannelType>('text');

  // Voice Chat State (Strictly local; never sent to server)
  const [isVoiceConnected, setIsVoiceConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  // Forum Posts State (Strictly local)
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: 'post-1',
      title: 'Welcome to the Bot Discussion Forum!',
      content: 'Feel free to share bot ideas, bug reports, or showcase your visual blocks here.',
      author: 'SnapBot Team',
      tags: ['Notice', 'Welcome'],
      repliesCount: 3,
      createdAt: 'Just now',
    },
    {
      id: 'post-2',
      title: 'How to setup slash commands with buttons?',
      content: 'Connect the "When slash command /ping received" block with "Create button" block in Embeds & UI.',
      author: 'CommunityMember',
      tags: ['Question', 'Help'],
      repliesCount: 5,
      createdAt: '10m ago',
    },
  ]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  // Load channels & voice state from localStorage on mount
  useEffect(() => {
    try {
      const storedChans = localStorage.getItem('snapbot_sim_channels');
      if (storedChans) {
        setChannels(JSON.parse(storedChans));
      }
      const storedVoice = localStorage.getItem('snapbot_sim_voice_state');
      if (storedVoice) {
        const parsed = JSON.parse(storedVoice);
        setIsVoiceConnected(parsed.connected || false);
        setIsMuted(parsed.muted || false);
        setIsDeafened(parsed.deafened || false);
      }
      const storedPosts = localStorage.getItem('snapbot_sim_forum_posts');
      if (storedPosts) {
        setForumPosts(JSON.parse(storedPosts));
      }
    } catch {
      // ignore
    }
  }, []);

  const prevMsgCountRef = useRef(0);

  // Sync simulator updates
  useEffect(() => {
    const update = () => {
      const msgs = simulator.getMessages();
      if (msgs.length > prevMsgCountRef.current && msgs.length > 0) {
        const last = msgs[msgs.length - 1];
        if (last.sender === 'bot') {
          sounds.playMessage();
        }
      }
      prevMsgCountRef.current = msgs.length;
      setMessages([...msgs]);
      setLogs([...simulator.getLogs()]);
    };

    update();
    const unsubscribe = simulator.subscribe(update);
    return () => unsubscribe();
  }, [simulator]);

  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const activeChannel = channels.find((c) => c.id === activeChannelId) || channels[0];

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const txt = input;
    setInput('');
    sounds.playMessage();
    await simulator.sendUserMessage(txt);
  };

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newChanName.trim().toLowerCase().replace(/\s+/g, '-');
    if (!cleanName) return;

    const newChan: SimChannel = {
      id: `chan-${Date.now()}`,
      name: cleanName,
      type: newChanType,
    };

    const updated = [...channels, newChan];
    setChannels(updated);
    try {
      localStorage.setItem('snapbot_sim_channels', JSON.stringify(updated));
    } catch {}

    setActiveChannelId(newChan.id);
    setNewChanName('');
    setShowAddModal(false);
  };

  const handleVoiceToggle = () => {
    const nextState = !isVoiceConnected;
    setIsVoiceConnected(nextState);
    try {
      localStorage.setItem(
        'snapbot_sim_voice_state',
        JSON.stringify({ connected: nextState, muted: isMuted, deafened: isDeafened })
      );
    } catch {}
  };

  const handleMuteToggle = () => {
    const next = !isMuted;
    setIsMuted(next);
    try {
      localStorage.setItem(
        'snapbot_sim_voice_state',
        JSON.stringify({ connected: isVoiceConnected, muted: next, deafened: isDeafened })
      );
    } catch {}
  };

  const handleDeafenToggle = () => {
    const next = !isDeafened;
    setIsDeafened(next);
    try {
      localStorage.setItem(
        'snapbot_sim_voice_state',
        JSON.stringify({ connected: isVoiceConnected, muted: isMuted, deafened: next })
      );
    } catch {}
  };

  const handleCreateForumPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      author: 'You',
      tags: ['Discussion'],
      repliesCount: 0,
      createdAt: 'Just now',
    };

    const updated = [newPost, ...forumPosts];
    setForumPosts(updated);
    try {
      localStorage.setItem('snapbot_sim_forum_posts', JSON.stringify(updated));
    } catch {}

    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostModal(false);
  };

  return (
    <div className="h-full flex bg-[#313338] text-slate-200 select-none overflow-hidden">
      {/* Discord Left Channel Sidebar (180px) */}
      <aside className="w-44 bg-[#2B2D31] flex flex-col border-r border-[#1F2023] shrink-0 text-xs">
        {/* Server Title Header */}
        <div className="h-12 px-3 border-b border-[#1F2023] flex items-center justify-between font-bold text-white shadow-sm">
          <span className="truncate">SnapBot Guild</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        {/* Channel Categories & List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 custom-scrollbar">
          {/* Text Channels */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider px-1 mb-1">
              <span>{t.simulator.textChannels}</span>
              <button
                onClick={() => {
                  setNewChanType('text');
                  setShowAddModal(true);
                }}
                title={t.simulator.addChannelBtn}
                className="hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-0.5">
              {channels
                .filter((c) => c.type === 'text')
                .map((chan) => (
                  <button
                    key={chan.id}
                    onClick={() => setActiveChannelId(chan.id)}
                    className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md font-medium text-xs transition-colors ${
                      activeChannelId === chan.id
                        ? 'bg-[#404249] text-white'
                        : 'text-slate-400 hover:bg-[#35373C] hover:text-slate-200'
                    }`}
                  >
                    <Hash className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="truncate">{chan.name}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Voice Channels */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider px-1 mb-1">
              <span>{t.simulator.voiceChannels}</span>
              <button
                onClick={() => {
                  setNewChanType('voice');
                  setShowAddModal(true);
                }}
                title={t.simulator.addChannelBtn}
                className="hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-0.5">
              {channels
                .filter((c) => c.type === 'voice')
                .map((chan) => (
                  <button
                    key={chan.id}
                    onClick={() => setActiveChannelId(chan.id)}
                    className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md font-medium text-xs transition-colors ${
                      activeChannelId === chan.id
                        ? 'bg-[#404249] text-white'
                        : 'text-slate-400 hover:bg-[#35373C] hover:text-slate-200'
                    }`}
                  >
                    <Volume2 className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="truncate">{chan.name}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Announcement Channels */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider px-1 mb-1">
              <span>{t.simulator.announcementChannels}</span>
              <button
                onClick={() => {
                  setNewChanType('announcement');
                  setShowAddModal(true);
                }}
                title={t.simulator.addChannelBtn}
                className="hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-0.5">
              {channels
                .filter((c) => c.type === 'announcement')
                .map((chan) => (
                  <button
                    key={chan.id}
                    onClick={() => setActiveChannelId(chan.id)}
                    className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md font-medium text-xs transition-colors ${
                      activeChannelId === chan.id
                        ? 'bg-[#404249] text-white'
                        : 'text-slate-400 hover:bg-[#35373C] hover:text-slate-200'
                    }`}
                  >
                    <Megaphone className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="truncate">{chan.name}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Forum Channels */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider px-1 mb-1">
              <span>{t.simulator.forumChannels}</span>
              <button
                onClick={() => {
                  setNewChanType('forum');
                  setShowAddModal(true);
                }}
                title={t.simulator.addChannelBtn}
                className="hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-0.5">
              {channels
                .filter((c) => c.type === 'forum')
                .map((chan) => (
                  <button
                    key={chan.id}
                    onClick={() => setActiveChannelId(chan.id)}
                    className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-md font-medium text-xs transition-colors ${
                      activeChannelId === chan.id
                        ? 'bg-[#404249] text-white'
                        : 'text-slate-400 hover:bg-[#35373C] hover:text-slate-200'
                    }`}
                  >
                    <MessagesSquare className="w-4 h-4 shrink-0 text-slate-400" />
                    <span className="truncate">{chan.name}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Voice Connected Footer status card */}
        {isVoiceConnected && (
          <div className="p-2 border-t border-[#1F2023] bg-[#232428]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>{t.simulator.voiceConnected}</span>
              </div>
              <button
                onClick={handleVoiceToggle}
                title={t.simulator.leaveVoice}
                className="p-1 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded transition-colors"
              >
                <PhoneOff className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-around bg-[#1E1F22] p-1 rounded">
              <button
                onClick={handleMuteToggle}
                className={`p-1.5 rounded transition-colors ${
                  isMuted ? 'text-rose-400 bg-rose-500/10' : 'text-slate-300 hover:text-white'
                }`}
                title={isMuted ? t.simulator.unmuteMic : t.simulator.muteMic}
              >
                {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleDeafenToggle}
                className={`p-1.5 rounded transition-colors ${
                  isDeafened ? 'text-rose-400 bg-rose-500/10' : 'text-slate-300 hover:text-white'
                }`}
                title={isDeafened ? t.simulator.undeafen : t.simulator.deafen}
              >
                <Headphones className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Channel Pane */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#313338]">
        {/* Discord Top Channel Header */}
        <div className="h-12 px-4 border-b border-[#1F2023] flex items-center justify-between bg-[#313338] shadow-sm shrink-0">
          <div className="flex items-center gap-2">
            {activeChannel.type === 'text' && <Hash className="w-5 h-5 text-slate-400" />}
            {activeChannel.type === 'voice' && <Volume2 className="w-5 h-5 text-slate-400" />}
            {activeChannel.type === 'announcement' && <Megaphone className="w-5 h-5 text-slate-400" />}
            {activeChannel.type === 'forum' && <MessagesSquare className="w-5 h-5 text-slate-400" />}
            <span className="font-semibold text-sm text-white">{activeChannel.name}</span>
            <div className="flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.simulator.online}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#2B2D31] p-1 rounded-lg border border-[#1F2023]">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'chat' ? 'bg-[#5865F2] text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.simulator.chatTab}</span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'logs' ? 'bg-[#5865F2] text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{t.simulator.logsTab} ({logs.length})</span>
            </button>
            <button
              onClick={() => simulator.clearChat()}
              title="Clear chat"
              className="p-1 text-slate-400 hover:text-red-400 rounded transition-colors ml-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* View Switcher based on Channel Type */}
        {activeTab === 'logs' ? (
          /* Logs Terminal Tab */
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1.5 bg-[#1E1F22] custom-scrollbar text-slate-300">
            <div className="text-slate-500 pb-2 border-b border-white/5">
              // SnapBot Simulator Internal Gateway Logs
            </div>
            {logs.map((lg) => {
              let color = 'text-slate-300';
              if (lg.type === 'event') color = 'text-cyan-400';
              if (lg.type === 'warn') color = 'text-amber-400';
              if (lg.type === 'error') color = 'text-rose-400';

              return (
                <div key={lg.id} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate-500 shrink-0">[{lg.timestamp}]</span>
                  <span className="uppercase text-[10px] px-1 rounded bg-white/5 font-semibold shrink-0">
                    {lg.type}
                  </span>
                  <span className={color}>{lg.message}</span>
                </div>
              );
            })}
          </div>
        ) : activeChannel.type === 'voice' ? (
          /* VOICE CHANNEL VIEW */
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#2B2D31]/40 text-center">
            <div className="max-w-md w-full bg-[#2B2D31] border border-[#1F2023] rounded-3xl p-6 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{activeChannel.name}</h3>
              <p className="text-xs text-slate-400 mb-6">
                {isVoiceConnected ? t.simulator.voiceConnected : t.simulator.voiceDisconnected}
              </p>

              {/* Local-only Notice Rule */}
              <div className="mb-6 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2 text-left">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{t.simulator.voiceLocalOnlyNotice}</span>
              </div>

              {/* Connected participants list */}
              {isVoiceConnected && (
                <div className="mb-6 space-y-2 text-left">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1E1F22]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-white">You</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isMuted ? (
                        <MicOff className="w-3.5 h-3.5 text-rose-400" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1E1F22]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#5865F2] flex items-center justify-center text-white text-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-white">SnapBot (BOT)</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Listening
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleVoiceToggle}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isVoiceConnected
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-[#5865F2] hover:bg-[#4752C4] text-white'
                }`}
              >
                {isVoiceConnected ? t.simulator.leaveVoice : t.simulator.joinVoice}
              </button>
            </div>
          </div>
        ) : activeChannel.type === 'forum' ? (
          /* FORUM CHANNEL VIEW */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#313338]">
            <div className="p-4 border-b border-[#1F2023] flex items-center justify-between bg-[#2B2D31]/40">
              <div>
                <h3 className="font-bold text-white text-sm">#{activeChannel.name}</h3>
                <p className="text-[11px] text-slate-400">Community discussion board</p>
              </div>
              <button
                onClick={() => setShowNewPostModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.simulator.newForumPost}</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {forumPosts.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  {t.simulator.forumEmpty}
                </div>
              ) : (
                forumPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-xl bg-[#2B2D31] border border-[#1F2023] hover:border-[#5865F2]/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-[#1E1F22] text-[#5865F2] rounded text-[10px] font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                      <span className="text-[10px] text-slate-500">{post.createdAt}</span>
                    </div>
                    <h4 className="font-bold text-white text-xs mb-1">{post.title}</h4>
                    <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed mb-3">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                      <span>By {post.author}</span>
                      <span className="flex items-center gap-1 text-[#5865F2]">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{post.repliesCount} replies</span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* TEXT & ANNOUNCEMENT CHANNEL VIEW */
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {/* Channel Welcome Banner */}
              <div className="text-center py-6 border-b border-white/5">
                <div className="w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center mx-auto mb-3 shadow-lg">
                  {activeChannel.type === 'announcement' ? (
                    <Megaphone className="w-6 h-6 text-white" />
                  ) : (
                    <Hash className="w-6 h-6 text-white" />
                  )}
                </div>
                <h3 className="text-white font-bold text-lg">
                  #{activeChannel.name}
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  {t.simulator.welcomeSubtitle}
                </p>
              </div>

              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                const isSys = msg.sender === 'system';

                if (isSys) {
                  return (
                    <div
                      key={msg.id}
                      className="text-center my-2 text-xs text-amber-400 bg-amber-500/10 py-1.5 px-3 rounded-lg border border-amber-500/20"
                    >
                      {msg.content}
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className="flex items-start gap-3 group hover:bg-[#2B2D31]/40 -mx-2 px-2 py-1 rounded"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md ${
                        isBot ? 'bg-[#5865F2] text-white' : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-xs text-white">{msg.authorName}</span>
                        {isBot && (
                          <span className="bg-[#5865F2] text-[10px] text-white font-bold px-1.5 py-0.2 rounded-sm uppercase tracking-wider">
                            BOT
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>

                      {msg.content && (
                        <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </p>
                      )}

                      {/* Embed rendering */}
                      {msg.embed && (
                        <div
                          className="mt-2 p-3 rounded-md bg-[#2B2D31] border-l-4 max-w-md shadow-md"
                          style={{ borderLeftColor: msg.embed.color || '#5865F2' }}
                        >
                          {msg.embed.title && (
                            <div className="font-bold text-white text-xs mb-1">
                              {msg.embed.title}
                            </div>
                          )}
                          {msg.embed.description && (
                            <div className="text-xs text-slate-300 leading-relaxed mb-2">
                              {msg.embed.description}
                            </div>
                          )}
                          {msg.embed.fields && msg.embed.fields.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/5">
                              {msg.embed.fields.map((f, idx) => (
                                <div key={idx} className={f.inline ? '' : 'col-span-2'}>
                                  <div className="text-[11px] font-semibold text-slate-400">
                                    {f.name}
                                  </div>
                                  <div className="text-xs text-white">{f.value}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          {msg.embed.footer && (
                            <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-white/5">
                              {msg.embed.footer}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Discord Rich Link Embed (Automatic detection if no explicit embed) */}
                      {!msg.embed && (() => {
                        const linkEmbed = extractDiscordLinkEmbed(msg.content);
                        if (!linkEmbed) return null;
                        return (
                          <div
                            className="mt-2 p-3 rounded-md bg-[#2B2D31] border-l-4 max-w-md shadow-md"
                            style={{ borderLeftColor: linkEmbed.color }}
                          >
                            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center justify-between">
                              <span>{linkEmbed.provider}</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </div>
                            <a
                              href={linkEmbed.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-[#00A8FC] hover:underline text-xs block mb-1"
                            >
                              {linkEmbed.title}
                            </a>
                            <p className="text-xs text-slate-300 leading-relaxed mb-2">
                              {linkEmbed.description}
                            </p>

                            {linkEmbed.thumbnail && (
                              <div className="mt-2">
                                <img
                                  src={linkEmbed.thumbnail}
                                  alt="Thumbnail"
                                  className="w-10 h-10 rounded-lg object-contain bg-slate-900 p-1 border border-slate-700"
                                />
                              </div>
                            )}

                            {/* Discord Component V2: ActionRow Buttons & Select Menu */}
                            {linkEmbed.hasComponentV2 && (
                              <div className="mt-3 pt-2.5 border-t border-white/5 space-y-2">
                                <div className="text-[10px] font-semibold text-slate-400">
                                  Discord Components V2 (ActionRow)
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <button
                                    onClick={() => {
                                      sounds.playClick();
                                      simulator.sendUserMessage('/ping');
                                    }}
                                    className="px-2.5 py-1 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-sm"
                                  >
                                    <span>Interactive Ping</span>
                                  </button>
                                  <a
                                    href={linkEmbed.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 bg-[#4E5058] hover:bg-[#6D6F78] text-white rounded text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-sm"
                                  >
                                    <span>Visit URL</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Interactive Buttons */}
                      {msg.buttons && msg.buttons.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2.5">
                          {msg.buttons.map((btn) => {
                            let btnClass = 'bg-[#5865F2] hover:bg-[#4752C4] text-white';
                            if (btn.style === 'Success')
                              btnClass = 'bg-emerald-600 hover:bg-emerald-500 text-white';
                            if (btn.style === 'Danger')
                              btnClass = 'bg-rose-600 hover:bg-rose-500 text-white';
                            if (btn.style === 'Secondary')
                              btnClass = 'bg-[#4E5058] hover:bg-[#6D6F78] text-white';

                            return (
                              <button
                                key={btn.customId}
                                onClick={() => simulator.clickButton(btn.customId)}
                                className={`px-3 py-1.5 rounded text-xs font-medium transition-all shadow-sm ${btnClass}`}
                              >
                                {btn.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Message Input */}
            <div className="p-4 bg-[#313338]">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  placeholder={`#${activeChannel.name} ${t.simulator.inputPlaceholder}`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-[#383A40] text-slate-100 placeholder-slate-400 text-xs rounded-lg pl-4 pr-12 py-3 border-none focus:outline-none focus:ring-1 focus:ring-[#5865F2]"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 p-1.5 text-slate-400 hover:text-white disabled:opacity-40 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1">
                <span>{t.simulator.tipSlash}</span>
                <button
                  type="button"
                  onClick={() => setInput('/ping')}
                  className="text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{t.simulator.fillPing}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create Channel */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#313338] border border-[#1F2023] rounded-2xl p-5 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">{t.simulator.addChannelBtn}</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateChannel} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  {t.simulator.channelTypeLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewChanType('text')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold text-left transition-colors ${
                      newChanType === 'text'
                        ? 'border-[#5865F2] bg-[#5865F2]/10 text-white'
                        : 'border-[#1F2023] bg-[#2B2D31] text-slate-400'
                    }`}
                  >
                    <Hash className="w-4 h-4" />
                    <span>Text</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewChanType('voice')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold text-left transition-colors ${
                      newChanType === 'voice'
                        ? 'border-[#5865F2] bg-[#5865F2]/10 text-white'
                        : 'border-[#1F2023] bg-[#2B2D31] text-slate-400'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Voice</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewChanType('announcement')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold text-left transition-colors ${
                      newChanType === 'announcement'
                        ? 'border-[#5865F2] bg-[#5865F2]/10 text-white'
                        : 'border-[#1F2023] bg-[#2B2D31] text-slate-400'
                    }`}
                  >
                    <Megaphone className="w-4 h-4" />
                    <span>Announce</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewChanType('forum')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold text-left transition-colors ${
                      newChanType === 'forum'
                        ? 'border-[#5865F2] bg-[#5865F2]/10 text-white'
                        : 'border-[#1F2023] bg-[#2B2D31] text-slate-400'
                    }`}
                  >
                    <MessagesSquare className="w-4 h-4" />
                    <span>Forum</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Channel Name
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.simulator.channelNamePlaceholder}
                  value={newChanName}
                  onChange={(e) => setNewChanName(e.target.value)}
                  className="w-full bg-[#1E1F22] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1F2023] focus:border-[#5865F2] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 bg-[#2B2D31] hover:bg-[#35373C] text-slate-300 rounded-xl text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Create Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Forum Post */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#313338] border border-[#1F2023] rounded-2xl p-5 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">{t.simulator.newForumPost}</h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateForumPost} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.simulator.postTitlePlaceholder}
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full bg-[#1E1F22] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1F2023] focus:border-[#5865F2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Content
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.simulator.postContentPlaceholder}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full bg-[#1E1F22] text-white text-xs rounded-xl px-3.5 py-2.5 border border-[#1F2023] focus:border-[#5865F2] focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-3.5 py-2 bg-[#2B2D31] hover:bg-[#35373C] text-slate-300 rounded-xl text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {t.simulator.createPost}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
