'use client';

// ==============================================================================
// SnapBot Privacy Policy Page (/privacy)
// Built 100% in TSX Web Page (Strict Rule: Zero additional .md files)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
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
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{t.footer.privacy}</h1>
            <p className="text-xs text-slate-400">Effective Date: November 3, 2026</p>
          </div>
        </div>

        {lang === 'en' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
              <p>
                SnapBot collects basic account information when you register or sign in using email or Google OAuth:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Email address and nickname</li>
                <li>Hashed password (for local email registration; never stored in plaintext)</li>
                <li>Discord Bot project configurations and workspace JSON data created in the studio</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. How We Use Information</h2>
              <p>
                We process your information to provide, maintain, and improve the SnapBot visual IDE, save your projects, authenticate your sessions, and deliver transaction emails (such as 6-digit verification codes and welcome messages via Resend).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Data Protection & Security</h2>
              <p>
                All data is transmitted securely over TLS/HTTPS and stored in encrypted PostgreSQL databases. We never sell, rent, or trade your personal data with third-party advertising networks.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Your Rights</h2>
              <p>
                You may request deletion of your account, bot workspaces, or personal data at any time by contacting our support team at <code>admin@koharu.live</code>.
              </p>
            </section>
          </div>
        )}

        {lang === 'ja' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. 収集する情報</h2>
              <p>SnapBotは、会員登録またはGoogle OAuthログイン時に以下の情報を収集します：</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>メールアドレスおよびニックネーム</li>
                <li>暗号化ハッシュ化されたパスワード（平文保存は一切行われません）</li>
                <li>スタジオ内で作成されたBotプロジェクトのワークスペースJSONデータ</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. 情報の利用目的</h2>
              <p>
                収集した情報は、SnapBotビジュアルIDEの提供、プロジェクトの保存、セッション認証、および確認コードや歓迎メールの配信にのみ使用されます。
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. セキュリティと保護</h2>
              <p>
                すべての通信はTLS/HTTPSによって暗号化されており、第三者の広告ネットワークへの個人情報提供・販売は一切行いません。
              </p>
            </section>
          </div>
        )}

        {lang === 'ko' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. 수집하는 개인정보 항목</h2>
              <p>SnapBot은 원활한 서비스 제공을 위해 가입 및 로그인 시 다음 정보를 수집합니다:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>이메일 주소, 닉네임</li>
                <li>암호화 해시 처리된 비밀번호 (평문 저장 절대 없음)</li>
                <li>스튜디오에서 작성된 디스코드 봇 프로젝트 데이터</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. 개인정보의 이용 목적</h2>
              <p>
                수집된 정보는 회원 식별, 봇 프로젝트 클라우드 저장, 6자리 OTP 인증번호 발송 및 가입 환영 안내 메일 전송 목적에만 한정하여 이용됩니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. 개인정보 파기 및 문의</h2>
              <p>
                이용자는 언제든지 본인의 계정 및 봇 프로젝트 삭제를 요청할 수 있으며, 관련 문의는 <code>admin@koharu.live</code>로 접수해 주시기 바랍니다.
              </p>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

