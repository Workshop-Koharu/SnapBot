'use client';

// ==============================================================================
// SnapBot Studio Project Route (/studio/[projectId])
// (c) 2026 Workshop-Koharu
// ==============================================================================

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StudioLayout } from '@/components/studio/StudioLayout';
import { Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function ProjectStudioPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.project?.workspaceJson) {
            setProjectData(data.project.workspaceJson);
            return;
          }
        }
      } catch (e) {
        console.warn('API fetch failed, checking local storage:', e);
      }

      // Local storage fallback for offline / guest projects
      try {
        if (typeof window !== 'undefined') {
          const localProjects = JSON.parse(localStorage.getItem('snapbot_local_projects') || '[]');
          const found = localProjects.find((p: any) => p.id === projectId);
          if (found && found.workspaceJson) {
            setProjectData(found.workspaceJson);
          }
        }
      } catch (err) {
        console.error('Failed to load local project', err);
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-300">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
        <span className="text-xs font-medium">{t.studio.saving || 'Loading project workspace...'}</span>
      </div>
    );
  }

  return <StudioLayout projectId={projectId} initialData={projectData} />;
}

