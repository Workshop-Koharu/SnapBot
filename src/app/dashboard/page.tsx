'use client';

// ==============================================================================
// SnapBot User Dashboard (/dashboard)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Bot,
  Plus,
  Play,
  Copy,
  Trash2,
  Globe,
  Lock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  Calendar,
} from 'lucide-react';

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
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newBotName, setNewBotName] = useState('새로운 디스코드 봇');
  const [newBotPreset, setNewBotPreset] = useState<'empty' | 'starter' | 'moderation'>('starter');

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newBotName,
          description: 'SnapBot으로 제작된 디스코드 봇',
          workspaceJson: { version: 1, blocks: {}, variables: [] },
          compiledCode: '',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setShowNewModal(false);
        router.push(`/studio/${data.project.id}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('정말로 이 봇 프로젝트를 삭제하시겠습니까?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      {/* Dashboard Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-base text-white">SnapBot Studio</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/explore"
            className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            커뮤니티 허브
          </Link>
          <Link
            href="/studio"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
          >
            <Play className="w-3.5 h-3.5" />
            <span>스튜디오 바로가기</span>
          </Link>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-6xl w-full mx-auto px-6 py-10 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white">내 디스코드 봇 프로젝트</h1>
            <p className="text-xs text-slate-400 mt-1">
              블록으로 제작 중인 모든 디스코드 봇 목록입니다.
            </p>
          </div>

          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>새 봇 프로젝트 만들기</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-3xl bg-slate-900/40 border border-slate-800/80">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">아직 생성된 봇 프로젝트가 없습니다</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              단 1분 만에 첫 번째 블록 디스코드 봇을 만들고 실행해 보세요!
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowNewModal(true)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                새 프로젝트 만들기
              </button>
              <Link
                href="/studio"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors"
              >
                빈 스튜디오 열기
              </Link>
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
                            <Globe className="w-3 h-3" /> 공개
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                            <Lock className="w-3 h-3" /> 비공개
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {proj.description || 'SnapBot으로 조립된 디스코드 봇 프로젝트'}
                    </p>

                    <div className="flex items-center gap-3 mt-4 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{blockCount}개 블록</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(proj.updatedAt).toLocaleDateString('ko-KR')}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/80">
                    <Link
                      href={`/studio/${proj.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      <span>스튜디오 열기</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      title="프로젝트 삭제"
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
              <h3 className="text-lg font-bold text-white mb-2">새 봇 프로젝트 생성</h3>
              <p className="text-xs text-slate-400 mb-4">
                프로젝트 이름을 입력하고 프리셋 템플릿을 선택하세요.
              </p>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    프로젝트 이름
                  </label>
                  <input
                    type="text"
                    required
                    value={newBotName}
                    onChange={(e) => setNewBotName(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30"
                  >
                    프로젝트 시작
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
