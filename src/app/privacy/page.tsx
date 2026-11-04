'use client';

// ==============================================================================
// SnapBot Exhaustive Privacy Policy Page (/privacy)
// Fully compliant with GDPR, CCPA, PIPA, APPI & Discord Developer Guidelines
// Built 100% in TSX Web Page (Strict Rule: Zero additional .md files)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2, Server, Globe, UserCheck } from 'lucide-react';
import { useI18n, LanguageSelector } from '@/lib/i18n/context';

export default function PrivacyPage() {
  const { lang, t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <span className="text-sm font-extrabold text-white">{t.footer.privacy}</span>
        <LanguageSelector />
      </header>

      <main className="max-w-4xl w-full mx-auto px-6 py-12 flex-1 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        {/* Title Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{t.footer.privacy}</h1>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ko'
                ? '최종 개정일: 2026년 11월 4일 | 버전: 2.4.0 (GDPR, CCPA, 개인정보보호법 준수)'
                : lang === 'ja'
                ? '最終改定日: 2026年11月4日 | バージョン: 2.4.0 (GDPR、APPI、個人情報保護法準拠)'
                : 'Last Updated: November 4, 2026 | Version: 2.4.0 (GDPR, CCPA, PIPA & APPI Compliant)'}
            </p>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* ENGLISH POLICY CONTENT                                               */}
        {/* ==================================================================== */}
        {lang === 'en' && (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                1. Overview & Scope
              </h2>
              <p>
                Workshop-Koharu (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or the &quot;Platform&quot;) operates the <strong>SnapBot</strong> visual block coding IDE and Discord bot development suite hosted at <code>https://snapbot.koharu.live</code>. This Privacy Policy outlines in exhaustive detail our principles, protocols, and technical practices regarding the collection, handling, storage, encryption, and deletion of personal data from our global users.
              </p>
              <p>
                By accessing SnapBot, creating a user account, assembling bot workspaces in the studio, or utilizing our APIs, you explicitly consent to the data practices described herein. If you do not agree with any provision of this Privacy Policy, please discontinue usage immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" />
                2. Information We Collect
              </h2>
              <p>
                We adhere to strict data minimization principles under GDPR Article 5(1)(c) and collect only the data strictly necessary to provide an enterprise-grade visual IDE:
              </p>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="font-semibold text-white text-xs">A. Account Credentials & Profile Data</div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs">
                  <li><strong>Email Address:</strong> Used exclusively for authentication, password recovery, verification OTPs, and security alerts.</li>
                  <li><strong>Cryptographic Password Hash:</strong> When registering via email/password, your password is salted and hashed using bcrypt (12 rounds) or Argon2id. We never store or transmit plaintext passwords.</li>
                  <li><strong>Nickname & Profile Avatar:</strong> Public handle used within the workspace and community template gallery.</li>
                  <li><strong>OAuth Identity (Google):</strong> When authenticating via Google Sign-In, we receive your verified Google User ID, primary email address, display name, and avatar URL. We never access your Google Drive, Contacts, or third-party scopes.</li>
                </ul>

                <div className="font-semibold text-white text-xs pt-2">B. Bot Projects & Workspace AST Data</div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs">
                  <li><strong>Block AST Data:</strong> Block configurations, sequence coordinates, custom variable names, and event configurations created in the studio canvas.</li>
                  <li><strong>Virtual Simulator State:</strong> Local chat simulations, test slash commands, and virtual channel hierarchies. Note: Voice channel states are kept strictly in local browser memory and are NEVER recorded or transmitted.</li>
                </ul>

                <div className="font-semibold text-white text-xs pt-2">C. Technical Telemetry & Cookies</div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs">
                  <li><strong>HTTP Request Headers:</strong> IP address, browser User-Agent, operating system type, screen resolution, and language preference.</li>
                  <li><strong>Cookies & Local Storage:</strong> Session tokens (<code>snapbot_session</code>), cookie preferences (<code>snapbot_cookie_consent</code>), and UI language settings (<code>snapbot_lang</code>).</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-indigo-400" />
                3. Discord Token Security & Zero-Leakage Policy
              </h2>
              <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400 text-xs">
                  <Lock className="w-4 h-4" />
                  Zero-Knowledge Discord Bot Tokens
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  SnapBot adheres to the Discord Developer Terms of Service. When you test bots in our in-browser Virtual Simulator, SnapBot uses a sandboxed mock gateway and <strong>never requires nor stores your live Discord Bot Token on our remote servers</strong>. When downloading exported TypeScript, JavaScript, or Python source code, tokens are configured solely via your local <code>.env</code> file on your own computer or private server.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                4. Third-Party Sub-Processors & Data Sharing
              </h2>
              <p>
                We do not sell, rent, monetize, or trade your personal information with third-party ad exchanges or data brokers. Data is processed solely by certified infrastructure sub-processors:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <thead className="bg-slate-900 text-slate-200">
                    <tr>
                      <th className="p-3 border-b border-slate-800">Sub-Processor</th>
                      <th className="p-3 border-b border-slate-800">Purpose</th>
                      <th className="p-3 border-b border-slate-800">Location</th>
                      <th className="p-3 border-b border-slate-800">Privacy Safeguards</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-400">
                    <tr>
                      <td className="p-3 font-semibold text-slate-200">Vercel Inc.</td>
                      <td className="p-3">Edge CDN, SSL hosting, Next.js serverless execution</td>
                      <td className="p-3">Global Edge / USA</td>
                      <td className="p-3">SOC 2 Type II, ISO 27001, EU Standard Contractual Clauses (SCC)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-200">Neon / PostgreSQL</td>
                      <td className="p-3">Encrypted database storage for user accounts and projects</td>
                      <td className="p-3">AWS Region (Virginia / Frankfurt)</td>
                      <td className="p-3">AES-256 encryption at rest, TLS 1.3 in transit</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-200">Resend Inc.</td>
                      <td className="p-3">Transactional OTP delivery &amp; account notification emails</td>
                      <td className="p-3">USA / Global</td>
                      <td className="p-3">GDPR DPA signed, zero marketing spam guarantee</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-200">Google LLC</td>
                      <td className="p-3">Federated single-sign-on (OAuth 2.0)</td>
                      <td className="p-3">Global</td>
                      <td className="p-3">OAuth 2.0 PKCE, Google API Services User Data Policy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                5. Your Legal Rights (GDPR, CCPA, PIPA)
              </h2>
              <p>Depending on your geographic residency, you are entitled to exercise the following statutory rights:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs">
                <li><strong>Right of Access (Article 15 GDPR):</strong> Request a structured, machine-readable export of all data associated with your profile.</li>
                <li><strong>Right to Rectification (Article 16 GDPR):</strong> Correct inaccuracies in your email, nickname, or project metadata.</li>
                <li><strong>Right to Erasure / &quot;Right to be Forgotten&quot; (Article 17 GDPR):</strong> Permanently delete your user account, stored projects, and verification history.</li>
                <li><strong>Right to Data Portability (Article 20 GDPR):</strong> Download all your bot projects as standardized JSON AST files at any time via the studio toolbar.</li>
                <li><strong>California Consumer Privacy Act (CCPA):</strong> We do not sell personal data. You have the right to request disclosure of categories of information collected without discriminatory treatment.</li>
              </ul>
              <p className="pt-1">
                To submit a formal data privacy request, email our Data Protection Officer at: <code>privacy@koharu.live</code> or <code>admin@koharu.live</code>. Requests are processed within 14 business days.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-400" />
                6. Data Retention & Deletion Schedule
              </h2>
              <p>
                Account profiles and project workspaces are retained for as long as your account remains active. If an account is inactive for more than 24 consecutive months, we will issue two email notifications prior to scheduling unverified accounts or temporary projects for permanent cryptographic erasure.
              </p>
              <p>
                Six-digit email verification OTP codes expire automatically 10 minutes following dispatch and are scrubbed permanently from temporary memory tables.
              </p>
            </section>
          </div>
        )}

        {/* ==================================================================== */}
        {/* KOREAN POLICY CONTENT                                                */}
        {/* ==================================================================== */}
        {lang === 'ko' && (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                제1조 (총칙 및 개인정보보호 원칙)
              </h2>
              <p>
                Workshop-Koharu(이하 &quot;운영진&quot; 또는 &quot;스냅봇&quot;)은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 본 개인정보 처리방침은 스냅봇 웹 IDE 플랫폼(<code>https://snapbot.koharu.live</code>)을 이용하는 모든 회원 및 방문자의 개인정보가 어떠한 용도와 방식으로 처리되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 상세히 안내합니다.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" />
                제2조 (처리하는 개인정보의 항목 및 수집 방법)
              </h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="font-semibold text-white text-xs">1. 필수 수집 항목</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                  <li><strong>이메일 가입 시:</strong> 이메일 주소, 단방향 암호화 비밀번호(bcrypt/Argon2id 해시), 닉네임</li>
                  <li><strong>구글 소셜 로그인 시:</strong> 구글 고유 식별자(ID), 기본 이메일 주소, 프로필 이름, 아바타 이미지 URL</li>
                  <li><strong>서비스 이용 과정에서 자동 생성되는 항목:</strong> IP 주소, 쿠키(Cookie), 접속 일시, 브라우저 종류 및 OS 정보, 세션 식별자</li>
                </ul>

                <div className="font-semibold text-white text-xs pt-2">2. 블록 코딩 프로젝트 및 가상 시뮬레이터 데이터</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                  <li>사용자가 제작한 블록 트리 JSON 데이터, 사용자 정의 변수명, 이벤트 블록 구성값</li>
                  <li>가상 디스코드 시뮬레이터의 채널 목록 및 채팅 테스트 기록 (음성 채널 상태는 전적으로 사용자의 웹 브라우저 로컬 스토리지에만 저장되며 일체 원격 서버로 전송되지 않습니다.)</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-400" />
                제3조 (디스코드 봇 토큰 절대 미수집 정책)
              </h2>
              <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl space-y-2">
                <p className="text-slate-300 text-xs leading-relaxed">
                  스냅봇은 디스코드 개발자 정책(Discord Developer Terms of Service)을 100% 준수합니다. 웹 스튜디오의 가상 시뮬레이터는 완전한 자체 샌드박스 가상 게이트웨이로 작동하므로, <strong>사용자의 실제 디스코드 봇 토큰(Bot Token)을 당사 서버로 전송받거나 저장하지 않습니다.</strong> 완성된 코드를 다운로드하여 실행할 때 토큰은 오직 사용자의 로컬 환경 <code>.env</code> 파일에만 저장됩니다.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                제4조 (개인정보 처리 위탁 및 국외 이전)
              </h2>
              <p>스냅봇은 안정적인 서비스 제공을 위해 아래와 같이 전문 인프라에 처리를 위탁하고 있습니다:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <thead className="bg-slate-900 text-slate-200">
                    <tr>
                      <th className="p-3 border-b border-slate-800">수탁 업체</th>
                      <th className="p-3 border-b border-slate-800">위탁 업무 내용</th>
                      <th className="p-3 border-b border-slate-800">보유 및 이용 기간</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-400">
                    <tr>
                      <td className="p-3 font-semibold text-slate-200">Vercel Inc.</td>
                      <td className="p-3">글로벌 엣지 인프라 호스팅, 서버리스 애플리케이션 운영</td>
                      <td className="p-3">서비스 탈퇴 시 또는 계약 종료 시까지</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-200">Neon / PostgreSQL</td>
                      <td className="p-3">암호화된 회원 정보 및 프로젝트 데이터 저장 관리</td>
                      <td className="p-3">회원 탈퇴 시 즉시 파기</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-200">Resend Inc.</td>
                      <td className="p-3">본인 확인 6자리 인증번호 OTP 발송 및 계정 알림 메일 전송</td>
                      <td className="p-3">발송 후 즉시 폐기</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-200">Google LLC</td>
                      <td className="p-3">구글 소셜 로그인 인증 연동</td>
                      <td className="p-3">소셜 연동 해제 시까지</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                제5조 (정보주체의 권리·의무 및 행사방법)
              </h2>
              <p>정보주체는 스냅봇에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구 (회원 탈퇴 및 계정 영구 삭제)</li>
                <li>처리정지 요구</li>
              </ul>
              <p className="pt-1">
                권리 행사는 개인정보보호 담당 부서(<code>privacy@koharu.live</code> 또는 <code>admin@koharu.live</code>)로 전자우편을 통해 접수하실 수 있으며, 지체 없이 조치하겠습니다.
              </p>
            </section>
          </div>
        )}

        {/* ==================================================================== */}
        {/* JAPANESE POLICY CONTENT                                              */}
        {/* ==================================================================== */}
        {lang === 'ja' && (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                第1条（総則および適用範囲）
              </h2>
              <p>
                Workshop-Koharu（以下「当運営」）は、ビジュアルブロックコーディングプラットフォーム「SnapBot」（<code>https://snapbot.koharu.live</code>）を提供するにあたり、日本の個人情報保護法、GDPR、その他適用されるプライバシー保護法令を遵守し、ユーザーの個人情報の適切な保護と管理に努めます。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" />
                第2条（収集する情報および利用目的）
              </h2>
              <p>当運営は、以下の個人情報を収集・利用します：</p>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2 text-xs text-slate-400">
                <p>・<strong>アカウント情報：</strong>メールアドレス、ハッシュ化されたパスワード（平文保存一切なし）、ニックネーム、Googleアカウント認証識別子</p>
                <p>・<strong>プロジェクトデータ：</strong>エディタで作成されたブロック定義、変数情報、ワークスペース設定</p>
                <p>・<strong>シミュレータデータ：</strong>仮想チャンネルおよびチャットシミュレーション（ボイスチャンネル接続状態はブラウザのローカルストレージにのみ保存され、サーバーへの通信は一切行われません）</p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-400" />
                第3条（Discordボットトークンの不所持ポリシー）
              </h2>
              <p>
                SnapBotでは、Discord公式の利用規約に従い、スタジオ内のブラウザシミュレータにおいてユーザーの実際のDiscordボットトークンをサーバーへ送信・保存させることは一切ありません。生成されたコードの実行は、ユーザー自身のローカルPCまたは独自サーバー上の環境変数（.env）を介して行われます。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                第4条（お問い合わせ及びユーザー権利の行使）
              </h2>
              <p>
                ユーザーは、自身の個人情報の開示、訂正、削除、アカウント解約をいつでも請求することができます。お問い合わせは <code>privacy@koharu.live</code> までご連絡ください。
              </p>
            </section>
          </div>
        )}

        {/* Contact Footer Card */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
          <div>
            <div className="text-white font-bold text-xs sm:text-sm">Data Protection Officer (DPO)</div>
            <p className="text-slate-400 text-xs">Workshop-Koharu Privacy & Security Committee</p>
            <p className="text-slate-400 text-xs mt-0.5">Email: <code>privacy@koharu.live</code> | <code>admin@koharu.live</code></p>
          </div>

          <Link
            href="/terms"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-colors"
          >
            {t.footer.terms} &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
