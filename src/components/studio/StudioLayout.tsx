'use client';

// ==============================================================================
// SnapBot Studio Full IDE Layout
// Clean modern Entry & Scratch style visual IDE with Mobile Responsiveness
// (c) 2026 Workshop-Koharu
// ==============================================================================

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { WorkspaceManager } from '@/lib/snapbot/core/workspace';
import { compileWorkspace } from '@/lib/snapbot/compiler/compiler';
import { BotSimulator } from '@/lib/snapbot/runtime/simulator';
import { Palette } from './Palette';
import { Canvas } from './Canvas';
import { CodeViewer } from './CodeViewer';
import { SimulatorPane } from './SimulatorPane';
import { useI18n, LanguageSelector } from '@/lib/i18n/context';
import {
  Undo2,
  Redo2,
  Play,
  Code2,
  Download,
  Upload,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';

interface StudioLayoutProps {
  projectId?: string;
  initialData?: any;
}

type MobileTab = 'canvas' | 'blocks' | 'simulator' | 'code';

export const StudioLayout: React.FC<StudioLayoutProps> = ({ projectId, initialData }) => {
  const { t } = useI18n();
  const [manager] = useState(() => new WorkspaceManager(initialData));
  const [, setTick] = useState(0);
  const [projectName, setProjectName] = useState(manager.getProjectName());
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  // Desktop right pane tab: 'simulator' or 'code'
  const [rightTab, setRightTab] = useState<'code' | 'simulator'>('simulator');
  const [isRightPaneOpen, setIsRightPaneOpen] = useState(true);

  // Mobile navigation active tab
  const [mobileTab, setMobileTab] = useState<MobileTab>('canvas');

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

    // Also persist local changes if working on a local project
    if (projectId && typeof window !== 'undefined') {
      try {
        const local = JSON.parse(localStorage.getItem('snapbot_local_projects') || '[]');
        const idx = local.findIndex((p: any) => p.id === projectId);
        if (idx >= 0) {
          local[idx].workspaceJson = data;
          local[idx].updatedAt = new Date().toISOString();
          localStorage.setItem('snapbot_local_projects', JSON.stringify(local));
        }
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      setSaveStatus('saved');
    }, 400);
  };

  const handleAddBlock = (opcode: string) => {
    const newBlock = manager.addBlock(opcode, 180 + Math.random() * 40, 140 + Math.random() * 40);
    if (newBlock) {
      setSelectedBlockId(newBlock.id);
      handleWorkspaceChange();
      // On mobile, switch back to canvas to see the block immediately!
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        setMobileTab('canvas');
      }
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
        alert('Invalid SnapBot workspace JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#090D16] font-sans">
      {/* Studio Top Navigation Bar */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/95 px-3 sm:px-4 flex items-center justify-between shrink-0 select-none z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white px-2 py-1.5 rounded-lg hover:bg-slate-800 transition-colors text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t.studio.backToDashboard}</span>
          </Link>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Logo & Project Title */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700 shrink-0">
              <img src="/icon.png" alt="SnapBot" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            </div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                manager.setProjectName(e.target.value);
                handleWorkspaceChange();
              }}
              className="bg-transparent text-xs font-bold text-white hover:bg-slate-800/60 focus:bg-slate-800 px-2 py-1 rounded-md border border-transparent focus:border-indigo-500 outline-none transition-colors w-28 sm:w-44 truncate"
            />
          </div>

          <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{saveStatus === 'saved' ? t.studio.saved : t.studio.saving}</span>
          </div>
        </div>

        {/* Center: Undo / Redo */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={handleUndo}
            title={t.studio.undo}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            title={t.studio.redo}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSelector />

          <label className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.studio.importJson}</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={handleExportJson}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.studio.exportJson}</span>
          </button>

          {/* Desktop Right Pane Tab Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setRightTab('simulator');
                setIsRightPaneOpen(true);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isRightPaneOpen && rightTab === 'simulator'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{t.studio.simulatorTab}</span>
            </button>

            <button
              onClick={() => {
                setRightTab('code');
                setIsRightPaneOpen(true);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isRightPaneOpen && rightTab === 'code'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>
                {t.studio.codeTab} ({compiledResult.blockCount})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace: Desktop Grid / Mobile View Switcher */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Palette */}
        <div className="hidden md:block h-full">
          <Palette onAddBlock={handleAddBlock} />
        </div>

        {/* Desktop & Mobile Canvas Area */}
        <div
          className={`flex-1 h-full relative ${
            mobileTab === 'canvas' ? 'block' : 'hidden md:block'
          }`}
        >
          <Canvas
            manager={manager}
            onWorkspaceChange={handleWorkspaceChange}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
          />
        </div>

        {/* Mobile-Only Palette View */}
        <div className={`md:hidden w-full h-full ${mobileTab === 'blocks' ? 'block' : 'hidden'}`}>
          <Palette onAddBlock={handleAddBlock} />
        </div>

        {/* Mobile-Only Simulator View */}
        <div
          className={`md:hidden w-full h-full ${mobileTab === 'simulator' ? 'block' : 'hidden'}`}
        >
          <SimulatorPane simulator={simulator} />
        </div>

        {/* Mobile-Only Code View */}
        <div className={`md:hidden w-full h-full ${mobileTab === 'code' ? 'block' : 'hidden'}`}>
          <CodeViewer
            code={compiledResult.code}
            projectName={projectName}
            blockCount={compiledResult.blockCount}
          />
        </div>

        {/* Desktop Right Pane */}
        {isRightPaneOpen && (
          <div className="hidden md:block w-[450px] lg:w-[480px] h-full shrink-0 border-l border-slate-800 transition-all">
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

      {/* Mobile Bottom Responsive Tab Bar (< md) */}
      <nav className="md:hidden h-14 bg-slate-900 border-t border-slate-800 px-2 flex items-center justify-around shrink-0 z-30 select-none">
        <button
          onClick={() => setMobileTab('blocks')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
            mobileTab === 'blocks' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400'
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>{t.studio.mobileBlocks}</span>
        </button>

        <button
          onClick={() => setMobileTab('canvas')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
            mobileTab === 'canvas' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span>{t.studio.mobileCanvas}</span>
        </button>

        <button
          onClick={() => setMobileTab('simulator')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
            mobileTab === 'simulator' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400'
          }`}
        >
          <Play className="w-4 h-4 mb-0.5" />
          <span>{t.studio.mobileSimulator}</span>
        </button>

        <button
          onClick={() => setMobileTab('code')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
            mobileTab === 'code' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400'
          }`}
        >
          <Code2 className="w-4 h-4 mb-0.5" />
          <span>{t.studio.mobileCode}</span>
        </button>
      </nav>
    </div>
  );
};
