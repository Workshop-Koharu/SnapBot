'use client';

// ==============================================================================
// SnapBot Cookie Policy Page (/cookies)
// Built 100% in TSX Web Page (Strict Rule: Zero additional .md files)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';
import { useI18n, LanguageSelector } from '@/lib/i18n/context';

export default function CookiePolicyPage() {
  const { lang, t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <span className="text-sm font-extrabold text-white">{t.footer.cookiePolicy}</span>
        <LanguageSelector />
      </header>

      <main className="max-w-4xl w-full mx-auto px-6 py-12 flex-1 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{t.footer.cookiePolicy}</h1>
            <p className="text-xs text-slate-400">Updated: November 3, 2026</p>
          </div>
        </div>

        {lang === 'en' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device that help web applications remember your preferences, keep you logged in, and provide a seamless interactive experience.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. Cookies We Use</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Essential Authentication Cookies:</strong> <code>snapbot_session</code> maintains your secure login state across page navigations.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> <code>snapbot_lang</code> remembers your selected display language (English, Japanese, or Korean).
                </li>
                <li>
                  <strong>Consent Cookie:</strong> <code>snapbot_cookie_consent</code> records whether you have accepted our cookie notice.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Managing Your Cookies</h2>
              <p>
                You can configure your browser to block or delete cookies at any time. Please note that disabling essential cookies may prevent you from logging in or saving bot projects.
              </p>
            </section>
          </div>
        )}

        {lang === 'ja' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Cookieとは</h2>
              <p>
                Cookieとは、ウェブサイトを訪れた際にお客様の端末に保存される小さなデータファイルです。ログイン状態の保持や設定の記憶に役立ちます。
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. 使用するCookieの種類</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>必須認証Cookie:</strong> ログインセッションを安全に維持します。</li>
                <li><strong>設定Cookie:</strong> 選択された言語（英語、日本語、韓国語）を保持します。</li>
                <li><strong>同意Cookie:</strong> Cookie同意の選択結果を記録します。</li>
              </ul>
            </section>
          </div>
        )}

        {lang === 'ko' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. 쿠키(Cookie) 안내</h2>
              <p>
                쿠키는 사용자가 웹사이트를 방문할 때 이용자의 기기에 저장되는 작은 텍스트 파일입니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. 사용 목적</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>필수 세션 쿠키:</strong> 로그인 유지 및 계정 인증 관리</li>
                <li><strong>환경설정 쿠키:</strong> 사용자가 선택한 언어(영어, 일본어, 한국어) 설정 저장</li>
                <li><strong>동의 여부 기록:</strong> 쿠키 동의 팝업 확인 상태 저장</li>
              </ul>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

