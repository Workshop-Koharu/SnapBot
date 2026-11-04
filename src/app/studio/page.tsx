'use client';

// ==============================================================================
// SnapBot Studio Main Route (Protected by Authentication)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StudioLayout } from '@/components/studio/StudioLayout';
import { Loader2, Lock, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

export default function StudioPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            return;
          }
        }
      } catch (e) {
        console.warn('Session check failed:', e);
      }
      setIsAuthenticated(false);
    }

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-300">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
        <span className="text-xs font-medium">Verifying authentication...</span>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-[#090D16] text-slate-100 p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-5 border border-indigo-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-extrabold text-white mb-2">
            {t.studio.authRequiredTitle}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            {t.studio.authRequiredDesc}
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/login?redirect=/studio"
              className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.studio.loginToContinue}</span>
            </Link>

            <Link
              href="/register?redirect=/studio"
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
            >
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span>{t.studio.registerToContinue}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <StudioLayout />;
}

