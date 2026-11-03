'use client';

// ==============================================================================
// SnapBot Terms of Service Page (/terms)
// Built 100% in TSX Web Page (Strict Rule: Zero additional .md files)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { useI18n, LanguageSelector } from '@/lib/i18n/context';

export default function TermsPage() {
  const { lang, t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <span className="text-sm font-extrabold text-white">{t.footer.terms}</span>
        <LanguageSelector />
      </header>

      <main className="max-w-4xl w-full mx-auto px-6 py-12 flex-1 space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{t.footer.terms}</h1>
            <p className="text-xs text-slate-400">Last Revised: November 3, 2026</p>
          </div>
        </div>

        {lang === 'en' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing or using SnapBot at <code>https://snapbot.koharu.live</code>, you agree to comply with and be bound by these Terms of Service. If you do not agree, you must discontinue using the platform.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. Permitted Use & Discord Policies</h2>
              <p>
                SnapBot provides visual tools to generate Discord bot code. Users are solely responsible for ensuring their bots adhere to Discord's Developer Terms of Service and Community Guidelines. Generating malicious, abusive, or spam bots is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Intellectual Property</h2>
              <p>
                The code and bot logic you assemble using SnapBot belongs to you. You are free to export, deploy, and execute your compiled bot scripts in any environment.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Disclaimer of Warranty</h2>
              <p>
                The platform is provided "AS IS" without warranties of any kind. SnapBot and Workshop-Koharu are not affiliated with or endorsed by Discord Inc.
              </p>
            </section>
          </div>
        )}

        {lang === 'ja' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. 利用規約への同意</h2>
              <p>
                SnapBot（<code>https://snapbot.koharu.live</code>）にアクセスし利用することにより、利用者は本規約に同意したものとみなされます。
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. 利用のルールと禁止事項</h2>
              <p>
                利用者はDiscordの公式利用規約および開発者ポリシーを遵守する必要があります。スパム、不正アクセス、迷惑行為を目的としたBotの作成は固く禁止されています。
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. 権利の帰属</h2>
              <p>
                SnapBot上で組み立てられたBotのロジックおよび生成コードの権利は利用者に帰属します。
              </p>
            </section>
          </div>
        )}

        {lang === 'ko' && (
          <div className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. 약관의 효력 및 변경</h2>
              <p>
                본 약관은 SnapBot 서비스를 이용하는 모든 사용자에게 적용됩니다. 서비스를 이용함으로써 본 약관에 동의하는 것으로 간주됩니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. 이용자의 의무 및 금지 행위</h2>
              <p>
                이용자는 디스코드(Discord) 공식 개발자 정책 및 서비스 약관을 준수해야 하며, 악성 스팸, 서버 테러, 불법 프로그램을 목적으로 한 봇 제작 및 배포는 엄격히 금지됩니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. 저작권 및 면책</h2>
              <p>
                스튜디오를 통해 조립된 봇 코드의 저작권은 이용자에게 있습니다. 본 서비스는 Discord Inc.와 공식적인 제휴 관계가 없습니다.
              </p>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

