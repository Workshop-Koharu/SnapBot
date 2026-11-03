'use client';

// ==============================================================================
// SnapBot In-Browser Discord Bot Simulator View
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { BotSimulator, SimMessage, SimLog } from '@/lib/snapbot/runtime/simulator';
import {
  Send,
  Bot,
  User,
  Trash2,
  Terminal,
  MessageCircle,
  Hash,
  Sparkles,
} from 'lucide-react';

interface SimulatorPaneProps {
  simulator: BotSimulator;
}

export const SimulatorPane: React.FC<SimulatorPaneProps> = ({ simulator }) => {
  const [messages, setMessages] = useState<SimMessage[]>([]);
  const [logs, setLogs] = useState<SimLog[]>([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'logs'>('chat');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setMessages([...simulator.getMessages()]);
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

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const txt = input;
    setInput('');
    await simulator.sendUserMessage(txt);
  };

  return (
    <div className="h-full flex flex-col bg-[#313338] text-slate-200 select-none">
      {/* Discord Channel Header */}
      <div className="h-12 px-4 border-b border-[#1F2023] flex items-center justify-between bg-[#313338] shadow-sm">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-slate-400" />
          <span className="font-semibold text-sm text-white">가상 테스트 채널 (general)</span>
          <div className="flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>온라인</span>
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
            <span>채팅</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              activeTab === 'logs' ? 'bg-[#5865F2] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>로그 ({logs.length})</span>
          </button>
          <button
            onClick={() => simulator.clearChat()}
            title="채팅 비우기"
            className="p-1 text-slate-400 hover:text-red-400 rounded transition-colors ml-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area: Chat or Logs */}
      {activeTab === 'chat' ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {/* Discord Welcome Banner */}
            <div className="text-center py-6 border-b border-white/5">
              <div className="w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg">#general 채널에 오신 것을 환영합니다!</h3>
              <p className="text-slate-400 text-xs mt-1">
                스튜디오에서 조립한 블록 디스코드 봇을 실시간으로 테스트해볼 수 있는 가상 공간입니다.
              </p>
            </div>

            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              const isSys = msg.sender === 'system';

              if (isSys) {
                return (
                  <div key={msg.id} className="text-center my-2 text-xs text-amber-400 bg-amber-500/10 py-1.5 px-3 rounded-lg border border-amber-500/20">
                    {msg.content}
                  </div>
                );
              }

              return (
                <div key={msg.id} className="flex items-start gap-3 group hover:bg-[#2B2D31]/40 -mx-2 px-2 py-1 rounded">
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

                    {/* Discord Embed Box */}
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

                    {/* Buttons Row */}
                    {msg.buttons && msg.buttons.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2.5">
                        {msg.buttons.map((btn) => {
                          let btnClass = 'bg-[#5865F2] hover:bg-[#4752C4] text-white';
                          if (btn.style === 'Success') btnClass = 'bg-emerald-600 hover:bg-emerald-500 text-white';
                          if (btn.style === 'Danger') btnClass = 'bg-rose-600 hover:bg-rose-500 text-white';
                          if (btn.style === 'Secondary') btnClass = 'bg-[#4E5058] hover:bg-[#6D6F78] text-white';

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
                placeholder="#general 에 메시지 전송 또는 /ping 입력..."
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
              <span>팁: 슬래시 명령어는 <code>/명령어이름</code> 형태로 입력하세요.</span>
              <button
                type="button"
                onClick={() => setInput('/ping')}
                className="text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>/ping 테스트 채우기</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

