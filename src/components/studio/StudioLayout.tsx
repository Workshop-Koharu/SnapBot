'use client';

// ==============================================================================
// SnapBot Studio Full IDE Layout
// Clean modern Entry & Scratch style visual IDE
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WorkspaceManager } from '@/lib/snapbot/core/workspace';
import { compileWorkspace } from '@/lib/snapbot/compiler/compiler';
import { BotSimulator } from '@/lib/snapbot/runtime/simulator';
import { Palette } from './Palette';
import { Canvas } from './Canvas';
import { CodeViewer } from './CodeViewer';
import { SimulatorPane } from './SimulatorPane';
import {
  Undo2,
  Redo2,
  Play,
  Code2,
  Download,
  Upload,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

interface StudioLayoutProps {
  projectId?: string;
  initialData?: any;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ projectId, initialData }) => {
  const [manager] = useState(() => new WorkspaceManager(initialData));
  const [, setTick] = useState(0);
  const [projectName, setProjectName] = useState(manager.getProjectName());
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // Right pane tab: 'simulator' or 'code'
  const [rightTab, setRightTab] = useState<'code' | 'simulator'>('simulator');
  const [isRightPaneOpen, setIsRightPaneOpen] = useState(true);

  const simulator = useMemo(() => new BotSimulator(manager.exportData()), [manager]);

  const [compiledResult, setCompiledResult] = useState(() =>
    compileWorkspace(manager.exportData())
  );

  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  const handleWorkspaceChange = () => {
    setTick((t) => t + 1);
    const data = manager.exportData();
    const result = compileWorkspace(data);
    setCompiledResult(result);
    simulator.updateWorkspace(data);
    setSaveStatus('saving');

    setTimeout(() => {
      setSaveStatus('saved');
    }, 500);
  };

  const handleAddBlock = (opcode: string) => {
    const newBlock = manager.addBlock(opcode, 220 + Math.random() * 40, 160 + Math.random() * 40);
    if (newBlock) {
      setSelectedBlockId(newBlock.id);
      handleWorkspaceChange();
    }
  };

  const handleUndo = () => {
    if (manager.undo()) {
      handleWorkspaceChange();
    }
  };

  const handleRedo = () => {
    if (manager.redo()) {
      handleWorkspaceChange();
    }
  };

  const handleExportJson = () => {
    const data = manager.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_workspace.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        manager.loadFromData(parsed);
        setProjectName(manager.getProjectName());
        handleWorkspaceChange();
      } catch (err) {
        alert('올바른 SnapBot 워크스페이스 JSON 파일이 아닙니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#090D16] font-sans">
      {/* Studio Top Navigation Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/95 px-4 flex items-center justify-between shrink-0 select-none z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>대시보드</span>
          </Link>

          <div className="h-4 w-px bg-slate-800" />

          {/* Logo & Project Title */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
              <img src="/icon.png" alt="SnapBot" className="w-5 h-5 object-contain" />
            </div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                manager.setProjectName(e.target.value);
                handleWorkspaceChange();
              }}
              className="bg-transparent text-xs font-bold text-white hover:bg-slate-800/60 focus:bg-slate-800 px-2 py-1 rounded-md border border-transparent focus:border-indigo-500 outline-none transition-colors w-40 md:w-52"
            />
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{saveStatus === 'saved' ? '저장됨' : '저장 중...'}</span>
          </div>
        </div>

        {/* Center: Undo / Redo */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={handleUndo}
            title="실행 취소 (Undo)"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            title="다시 실행 (Redo)"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right Toolbar Controls */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">불러오기</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">내보내기</span>
          </button>

          <div className="h-4 w-px bg-slate-800" />

          {/* Right Pane Tab Toggle (Simulator vs Code) */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setRightTab('simulator');
                setIsRightPaneOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isRightPaneOpen && rightTab === 'simulator'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>봇 시뮬레이터</span>
            </button>

            <button
              onClick={() => {
                setRightTab('code');
                setIsRightPaneOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isRightPaneOpen && rightTab === 'code'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>TS 코드 ({compiledResult.blockCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Workspace Grid */}
      <div className="flex-1 flex overflow-hidden relative">
        <Palette onAddBlock={handleAddBlock} />

        <div className="flex-1 h-full relative">
          <Canvas
            manager={manager}
            onWorkspaceChange={handleWorkspaceChange}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
          />
        </div>

        {isRightPaneOpen && (
          <div className="w-[480px] h-full shrink-0 border-l border-slate-800 transition-all">
            {rightTab === 'code' ? (
              <CodeViewer
                code={compiledResult.code}
                projectName={projectName}
                blockCount={compiledResult.blockCount}
              />
            ) : (
              <SimulatorPane simulator={simulator} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
