'use client';

// ==============================================================================
// SnapBot Exhaustive Cookie Policy Page (/cookies)
// Fully compliant with EU ePrivacy Directive, GDPR & global privacy statutes
// Built 100% in TSX Web Page (Strict Rule: Zero additional .md files)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import Link from 'next/link';
import { ArrowLeft, Cookie, CheckCircle2, Sliders, Shield, Info, Settings2 } from 'lucide-react';
import { useI18n, LanguageSelector } from '@/lib/i18n/context';

export default function CookiePolicyPage() {
  const { lang, t } = useI18n();

  const handleOpenCookieSettings = () => {
    // Clear the stored consent flag and reload or trigger event
    localStorage.removeItem('snapbot_cookie_consent');
    document.cookie = 'snapbot_cookie_consent=; Path=/; max-age=0; SameSite=Lax';
    window.location.reload();
  };

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
        {/* Title Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{t.footer.cookiePolicy}</h1>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ko'
                ? '최종 개정일: 2026년 11월 4일 | 버전: 2.4.0 (EU ePrivacy 지침 및 쿠키 가이드라인 준수)'
                : lang === 'ja'
                ? '最終改定日: 2026年11月4日 | バージョン: 2.4.0'
                : 'Last Updated: November 4, 2026 | Version: 2.4.0 (EU ePrivacy & GDPR Compliant)'}
            </p>
          </div>
        </div>

        {/* Action Button: Manage Cookie Preferences */}
        <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>{t.cookies.manageSettings}</span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">
              {lang === 'ko'
                ? '언제든지 쿠키 동의 설정을 초기화하고 필수/선택 쿠키 설정을 다시 조정할 수 있습니다.'
                : lang === 'ja'
                ? 'いつでもクッキー同意設定をリセットし、好みの設定を再構成できます。'
                : 'You can reconfigure or revoke your cookie consent preferences at any time.'}
            </p>
          </div>

          <button
            onClick={handleOpenCookieSettings}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 shrink-0"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>{t.cookies.manageSettings}</span>
          </button>
        </div>

        {/* ==================================================================== */}
        {/* ENGLISH COOKIE POLICY                                                */}
        {/* ==================================================================== */}
        {lang === 'en' && (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-400" />
                1. What Are Cookies and Local Storage?
              </h2>
              <p>
                Cookies are small cryptographic text files placed onto your device by websites you visit. Similar technologies like HTML5 Local Storage and Session Storage store data within your browser. SnapBot uses these technologies to authenticate your session, remember your language choices, preserve block workspace state, and maintain secure access to the block IDE without tracking your personal web activity across third-party websites.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                2. Categories of Cookies We Utilize
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white mb-1">A. Strictly Necessary &amp; Essential Cookies (Always Active)</div>
                  <p className="text-slate-400 leading-relaxed">
                    Essential for the core functionality, security, and authentication of the SnapBot platform. These cookies cannot be turned off in our settings modal without breaking critical features such as login sessions, block compilation, and CSRF protection.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white mb-1">B. Functional &amp; Preference Cookies</div>
                  <p className="text-slate-400 leading-relaxed">
                    Allow the website to remember choices you make, such as your selected display language (<code>snapbot_lang</code>: English, Japanese, or Korean) and simulator view settings.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white mb-1">C. Performance &amp; Analytics Cookies</div>
                  <p className="text-slate-400 leading-relaxed">
                    Help us understand aggregated telemetry such as block render performance and AST compilation speed to optimize the visual physics engine. No personal identifiers or bot tokens are ever included in performance logs.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white mb-1">D. External API &amp; Integration Cookies</div>
                  <p className="text-slate-400 leading-relaxed">
                    Utilized only when testing third-party hardware blocks (MQTT, Serial, REST) or AI models to store local sandbox credentials temporarily within your own browser session.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                3. Detailed Inventory of Cookies &amp; Storage Keys
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <thead className="bg-slate-900 text-slate-200">
                    <tr>
                      <th className="p-3 border-b border-slate-800">Key Name</th>
                      <th className="p-3 border-b border-slate-800">Category</th>
                      <th className="p-3 border-b border-slate-800">Duration</th>
                      <th className="p-3 border-b border-slate-800">Purpose &amp; Security</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-400">
                    <tr>
                      <td className="p-3 font-mono font-bold text-indigo-400">snapbot_session</td>
                      <td className="p-3 font-semibold text-slate-200">Essential</td>
                      <td className="p-3">7 Days</td>
                      <td className="p-3">Encrypted HTTP-only auth token for user session verification</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-slate-300">snapbot_cookie_consent</td>
                      <td className="p-3 font-semibold text-slate-200">Essential</td>
                      <td className="p-3">1 Year</td>
                      <td className="p-3">Records your cookie consent acceptance level (all, essential, or custom)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-slate-300">snapbot_consent_functional</td>
                      <td className="p-3 font-semibold text-slate-200">Functional</td>
                      <td className="p-3">1 Year</td>
                      <td className="p-3">Preference flag for functional cookie storage</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-slate-300">snapbot_lang</td>
                      <td className="p-3 font-semibold text-slate-200">Functional</td>
                      <td className="p-3">1 Year</td>
                      <td className="p-3">Persists user&apos;s UI language choice (en, ja, ko) across pages</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-slate-300">snapbot_local_projects</td>
                      <td className="p-3 font-semibold text-slate-200">Functional</td>
                      <td className="p-3">Persistent</td>
                      <td className="p-3">Local browser storage for offline drafts and unsaved bot workspaces</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                4. Managing &amp; Disabling Cookies in Your Browser
              </h2>
              <p>
                In addition to our on-site Cookie Settings modal, you can control or delete cookies directly within your web browser settings. Note that disabling essential cookies may prevent you from signing in or saving bot workspaces.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Cookies and other site data</li>
                <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy &amp; Security &rarr; Cookies and Site Data</li>
                <li><strong>Apple Safari:</strong> Preferences &rarr; Privacy &rarr; Manage Website Data</li>
                <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies</li>
              </ul>
            </section>
          </div>
        )}

        {/* ==================================================================== */}
        {/* KOREAN COOKIE POLICY                                                 */}
        {/* ==================================================================== */}
        {lang === 'ko' && (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-400" />
                1. 쿠키(Cookie) 및 로컬 스토리지의 정의
              </h2>
              <p>
                쿠키는 사용자가 웹사이트를 방문할 때 웹 서버가 사용자의 브라우저로 전송하여 사용자 PC 또는 모바일 기기에 저장되는 작은 텍스트 파일입니다. 스냅봇은 웹 세션 유지, 사용자의 다국어 언어 설정 보존, 블록 코딩 에디터의 작업 내용 임시 저장 등을 위해 쿠키 및 HTML5 로컬 스토리지를 활용합니다.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                2. 쿠키의 분류 및 수집 목적
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white mb-1">A. 필수 쿠키 (Strictly Necessary Cookies - 상시 활성)</div>
                  <p className="text-slate-400 leading-relaxed">
                    스냅봇의 로그인 세션 유지, 보안 토큰 검증, CSRF 방어 등 핵심 기능 제공을 위해 반드시 필요한 쿠키입니다. 비활성화할 경우 로그인이 필요한 스튜디오 기능 이용이 불가능합니다.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white mb-1">B. 기능 및 환경설정 쿠키 (Functional Cookies)</div>
                  <p className="text-slate-400 leading-relaxed">
                    사용자가 선택한 표시 언어(한국어, 영어, 일본어), 가상 시뮬레이터 뷰 설정 및 임시 프로젝트 데이터를 저장하여 매번 다시 설정하지 않아도 되도록 편의를 제공합니다.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white mb-1">C. 성능 및 분석 쿠키 (Performance Cookies)</div>
                  <p className="text-slate-400 leading-relaxed">
                    블록 렌더링 물리 엔진 및 코드 트랜스파일러의 실행 속도를 측정하여 서비스 품질을 최적화하기 위해 익명화된 성능 지표를 분석합니다.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                3. 사용되는 주요 쿠키 목록
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <thead className="bg-slate-900 text-slate-200">
                    <tr>
                      <th className="p-3 border-b border-slate-800">쿠키명</th>
                      <th className="p-3 border-b border-slate-800">구분</th>
                      <th className="p-3 border-b border-slate-800">유효기간</th>
                      <th className="p-3 border-b border-slate-800">목적</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-400">
                    <tr>
                      <td className="p-3 font-mono font-bold text-indigo-400">snapbot_session</td>
                      <td className="p-3 font-semibold text-slate-200">필수</td>
                      <td className="p-3">7일</td>
                      <td className="p-3">로그인 상태 유지 및 사용자 인증 세션 식별자</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-slate-300">snapbot_cookie_consent</td>
                      <td className="p-3 font-semibold text-slate-200">필수</td>
                      <td className="p-3">1년</td>
                      <td className="p-3">사용자의 쿠키 수집 동의 여부 기록</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-slate-300">snapbot_lang</td>
                      <td className="p-3 font-semibold text-slate-200">기능</td>
                      <td className="p-3">1년</td>
                      <td className="p-3">사용자가 선택한 UI 언어(ko, en, ja) 저장</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* ==================================================================== */}
        {/* JAPANESE COOKIE POLICY                                               */}
        {/* ==================================================================== */}
        {lang === 'ja' && (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-400" />
                1. クッキー（Cookie）の概要
              </h2>
              <p>
                クッキーとは、ウェブサイトを閲覧した際にお客様のブラウザに保存される小さなテキストファイルです。SnapBotでは、セッション認証の維持、言語設定の保存、およびブロックエディタの円滑な動作のためにクッキーを使用しています。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                2. 使用するクッキーの種類
              </h2>
              <div className="space-y-2 text-xs text-slate-400 bg-slate-900/60 p-4 border border-slate-800 rounded-xl">
                <p>・<strong>必須クッキー（Always Active）：</strong>ログイン認証、セッション管理、セキュリティ保護に不可欠なクッキーです。</p>
                <p>・<strong>機能性クッキー：</strong>言語選択（英語・日本語・韓国語）やワークスペースの環境設定を保持します。</p>
                <p>・<strong>パフォーマンスクッキー：</strong>ブロック物理描画の処理速度やコンパイル速度を計測・改善するためのものです。</p>
              </div>
            </section>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
          <div>
            <div className="text-white font-bold text-xs sm:text-sm">Cookie Compliance Desk</div>
            <p className="text-slate-400 text-xs">Workshop-Koharu Privacy Team</p>
            <p className="text-slate-400 text-xs mt-0.5">Email: <code>privacy@koharu.live</code></p>
          </div>

          <Link
            href="/privacy"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-colors"
          >
            {t.footer.privacy} &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
