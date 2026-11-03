'use client';

// ==============================================================================
// SnapBot User Dashboard (/dashboard)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bot,
  Plus,
  Play,
  Trash2,
  Globe,
  Lock,
  ArrowRight,
  Sparkles,
  Layers,
  Calendar,
  Loader2,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import { LanguageSelector } from '@/lib/i18n/context';

interface ProjectItem {
  id: string;
  name: string;
  description?: string;
  workspaceJson: any;
  isPublic: boolean;
  updatedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { t, lang } = useI18n();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newBotName, setNewBotName] = useState('My Discord Bot');

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        const serverProjects: ProjectItem[] = data.projects || [];

        // Also merge local projects if available
        let localProjects: ProjectItem[] = [];
        try {
          localProjects = JSON.parse(localStorage.getItem('snapbot_local_projects') || '[]');
        } catch {
          // ignore
        }

        const combined = [...serverProjects];
        for (const lp of localProjects) {
          if (!combined.some((p) => p.id === lp.id)) {
            combined.push(lp);
          }
        }
        setProjects(combined);
        return;
      }
    } catch (e) {
      console.warn('API error fetching projects, checking localStorage:', e);
    } finally {
      setLoading(false);
    }

    // Fallback: read from local storage
    try {
      const local = JSON.parse(localStorage.getItem('snapbot_local_projects') || '[]');
      setProjects(local);
    } catch {
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (creating) return;
    setCreating(true);

    const projectName = newBotName.trim() || 'My Discord Bot';
    const initialWorkspace = {
      version: 1,
      blocks: {
        root_1: {
          id: 'root_1',
          type: 'event_ready',
          x: 120,
          y: 120,
          next: 'msg_1',
        },
        msg_1: {
          id: 'msg_1',
          type: 'action_send_message',
          x: 120,
          y: 180,
          fields: {
            CONTENT: 'Hello from SnapBot!',
          },
        },
      },
      variables: [],
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName,
          description: 'Created with SnapBot Studio',
          workspaceJson: initialWorkspace,
          compiledCode: '',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setShowNewModal(false);
        router.push(`/studio/${data.project.id}`);
        return;
      }
    } catch (e) {
      console.warn('Could not create on server, using local fallback:', e);
    }

    // Always reliable offline / guest fallback:
    const localId = 'proj_' + Math.random().toString(36).substring(2, 9);
    const newLocalProject: ProjectItem = {
      id: localId,
      name: projectName,
      description: 'Created with SnapBot Studio',
      workspaceJson: initialWorkspace,
      isPublic: false,
      updatedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('snapbot_local_projects') || '[]');
      existing.unshift(newLocalProject);
      localStorage.setItem('snapbot_local_projects', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setShowNewModal(false);
    router.push(`/studio/${localId}`);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm(t.dashboard.deleteConfirm || 'Are you sure you want to delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }

    try {
      const existing = JSON.parse(localStorage.getItem('snapbot_local_projects') || '[]');
      const filtered = existing.filter((p: any) => p.id !== id);
      localStorage.setItem('snapbot_local_projects', JSON.stringify(filtered));
    } catch {
      // ignore
    }

    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      {/* Dashboard Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-4 sm:px-6 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
            <img src="/icon.png" alt="SnapBot" className="w-5 h-5 object-contain" />
          </div>
          <span className="font-extrabold text-base text-white">SnapBot Studio</span>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link
            href="/explore"
            className="hidden sm:inline-block text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {t.nav.explore}
          </Link>
          <Link
            href="/studio"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{t.nav.studio}</span>
          </Link>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white">{t.dashboard.title}</h1>
            <p className="text-xs text-slate-400 mt-1">{t.dashboard.subtitle}</p>
          </div>

          {/* Unified single New Project button */}
          <button
            onClick={() => setShowNewModal(true)}
            disabled={creating}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            <span>{t.dashboard.createBotBtn}</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
            <p className="text-xs">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{t.dashboard.emptyTitle}</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              {t.dashboard.emptySubtitle}
            </p>
            {/* Unified action button: only ONE clear New Project button */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setShowNewModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:scale-105"
              >
                {t.dashboard.createBotBtn}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => {
              const blockCount = Object.keys(proj.workspaceJson?.blocks || {}).length;

              return (
                <div
                  key={proj.id}
                  className="group p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        {proj.isPublic ? (
                          <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            <Globe className="w-3 h-3" /> {t.dashboard.public}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                            <Lock className="w-3 h-3" /> {t.dashboard.private}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {proj.description || 'SnapBot Discord bot project'}
                    </p>

                    <div className="flex items-center gap-3 mt-4 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{blockCount} {t.dashboard.blocksLabel}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(proj.updatedAt).toLocaleDateString(
                            lang === 'ko' ? 'ko-KR' : lang === 'ja' ? 'ja-JP' : 'en-US'
                          )}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
                    <Link
                      href={`/studio/${proj.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      <span>{t.dashboard.openStudio}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      title={t.dashboard.deleteConfirm}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Create New Bot */}
        {showNewModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-2">{t.dashboard.modalTitle}</h3>
              <p className="text-xs text-slate-400 mb-4">{t.dashboard.modalSubtitle}</p>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t.dashboard.projectNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={newBotName}
                    onChange={(e) => setNewBotName(e.target.value)}
                    placeholder="e.g. My Awesome Bot"
                    className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
                  >
                    {t.dashboard.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 disabled:opacity-50"
                  >
                    {creating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{t.dashboard.confirmCreate}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

