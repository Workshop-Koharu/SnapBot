'use client';

// ==============================================================================
// SnapBot Studio Full IDE Layout
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
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
  Save,
  Download,
  Upload,
  Bot,
  ArrowLeft,
  Settings,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface StudioLayoutProps {
  projectId?: string;
  initialData?: any;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ projectId, initialData }) => {
  // Initialize Workspace Manager
  const [manager] = useState(() => new WorkspaceManager(initialData));
  const [, setTick] = useState(0);
  const [projectName, setProjectName] = useState(manager.getProjectName());
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // Right pane tab: 'code' or 'simulator'
  const [rightTab, setRightTab] = useState<'code' | 'simulator'>('simulator');
  const [isRightPaneOpen, setIsRightPaneOpen] = useState(true);

  // Initialize Simulator
  const simulator = useMemo(() => new BotSimulator(manager.exportData()), [manager]);

  // Compiled Code State
  const [compiledResult, setCompiledResult] = useState(() =>
    compileWorkspace(manager.exportData())
  );

  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Workspace change listener
  const handleWorkspaceChange = () => {
    setTick((t) => t + 1);
    const data = manager.exportData();
    const result = compileWorkspace(data);
    setCompiledResult(result);
    simulator.updateWorkspace(data);
    setSaveStatus('saving');

    // Debounced autosave
    setTimeout(() => {
      setSaveStatus('saved');
    }, 600);
  };

  const handleAddBlock = (opcode: string) => {
    // Add near center of canvas
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

  // Export JSON file
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

  // Import JSON file
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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans">
      {/* Studio Top Navigation Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 flex items-center justify-between shrink-0 select-none z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition-colors text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>대시보드</span>
          </Link>

          <div className="h-4 w-px bg-slate-800" />

          {/* Logo & Project Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                manager.setProjectName(e.target.value);
                handleWorkspaceChange();
              }}
              className="bg-transparent text-sm font-semibold text-white hover:bg-slate-800/80 focus:bg-slate-800 px-2 py-1 rounded-md border border-transparent focus:border-indigo-500 outline-none transition-colors w-44 md:w-56"
            />
          </div>

          {/* Save Status Badge */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{saveStatus === 'saved' ? '자동 저장됨' : '저장 중...'}</span>
          </div>
        </div>

        {/* Center: Undo / Redo */}
        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
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
          {/* Import / Export JSON buttons */}
          <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">불러오기</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">내보내기</span>
          </button>

          <div className="h-4 w-px bg-slate-800" />

          {/* Right Pane Tab Toggle (Simulator vs Code) */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setRightTab('simulator');
                setIsRightPaneOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isRightPaneOpen && rightTab === 'simulator'
                  ? 'bg-indigo-600 text-white shadow-md'
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isRightPaneOpen && rightTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-md'
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
        {/* Left: Palette */}
        <Palette onAddBlock={handleAddBlock} />

        {/* Center: Infinite Canvas */}
        <div className="flex-1 h-full relative">
          <Canvas
            manager={manager}
            onWorkspaceChange={handleWorkspaceChange}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
          />
        </div>

        {/* Right: Collapsible Inspector Pane */}
        {isRightPaneOpen && (
          <div className="w-[480px] h-full shrink-0 border-l border-slate-800 transition-all duration-200">
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
