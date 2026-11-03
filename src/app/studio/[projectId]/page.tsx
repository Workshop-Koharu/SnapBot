'use client';

// ==============================================================================
// SnapBot Studio Project Route (/studio/[projectId])
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StudioLayout } from '@/components/studio/StudioLayout';
import { Bot, Loader2 } from 'lucide-react';

export default function ProjectStudioPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (res.ok) {
          const data = await res.json();
          setProjectData(data.project?.workspaceJson);
        }
      } catch (e) {
        console.error('Failed to load project:', e);
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
        <span className="text-xs font-medium">프로젝트 워크스페이스 불러오는 중...</span>
      </div>
    );
  }

  return <StudioLayout projectId={projectId} initialData={projectData} />;
}
