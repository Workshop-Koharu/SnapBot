'use client';

// ==============================================================================
// SnapBot Exhaustive Terms of Service Page (/terms)
// Professional Terms of Service with full legal definitions, Discord API adherence,
// liability limits, and intellectual property terms (Strict Rule: Zero .md files)
// (c) 2026 Workshop-Koharu
// ==============================================================================

import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, ShieldCheck, Code2, Scale, Ban } from 'lucide-react';
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
        {/* Title Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{t.footer.terms}</h1>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ko'
                ? '최종 개정일: 2026년 11월 4일 | 버전: 2.4.0 (전자상거래법 및 이용약관 규제법 준수)'
                : lang === 'ja'
                ? '最終改定日: 2026年11月4日 | バージョン: 2.4.0'
                : 'Last Revised: November 4, 2026 | Version: 2.4.0 (Global Enterprise Terms)'}
            </p>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* ENGLISH TERMS OF SERVICE                                             */}
        {/* ==================================================================== */}
        {lang === 'en' && (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-400" />
                1. Acceptance & Agreement to Terms
              </h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) and Workshop-Koharu (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), governing your access to and utilization of the <strong>SnapBot</strong> web platform, visual block studio IDE, compilers, and associated software tools available at <code>https://snapbot.koharu.live</code> (collectively, the &quot;Service&quot;).
              </p>
              <p>
                By creating an account, authenticating via email or Google OAuth, or assembling bot workflows on our platform, you explicitly affirm that you have read, understood, and agreed to be bound by these Terms and our companion Privacy Policy. If you do not agree to these Terms, you must immediately refrain from accessing the Service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                2. User Intellectual Property & Ownership of Generated Code
              </h2>
              <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <div className="font-bold text-white text-xs">A. Your Bot Code is 100% Yours</div>
                <p className="text-slate-300 text-xs">
                  Workshop-Koharu claims no intellectual property rights over the bot designs, block combinations, custom variables, or executable source code (TypeScript, JavaScript, Python) you generate using SnapBot. All output code is your exclusive intellectual property, and you are free to deploy, commercialize, or publish your bots without royalty obligations to us.
                </p>
                <div className="font-bold text-white text-xs pt-2">B. Community Hub & Remixing</div>
                <p className="text-slate-400 text-xs">
                  When you voluntarily share a bot template to our public Community Hub (/explore), you grant other authenticated users a non-exclusive license to inspect, copy, and remix your block configuration for their own Discord projects.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Ban className="w-4 h-4 text-rose-400" />
                3. Prohibited Activities & Discord Policy Compliance
              </h2>
              <p>
                You explicitly agree to comply with Discord Inc.&apos;s Developer Terms of Service and Community Guidelines. Under no circumstances may SnapBot be utilized to construct, deploy, or distribute:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400 text-xs">
                <li>Automated mass-messaging, DM advertising spam, or server raiding tools.</li>
                <li>Phishing mechanisms, token loggers, QR code grabbers, or credential harvesting exploits.</li>
                <li>Denial-of-Service (DoS) engines or deliberate Discord Gateway rate-limit abusing bots.</li>
                <li>Content that facilitates hate speech, harassment, stalking, non-consensual imagery, or child exploitation.</li>
                <li>Hardware control blocks used to compromise physical IoT equipment, unauthorized industrial systems, or weaponized relays.</li>
              </ul>
              <div className="p-3 bg-rose-950/20 border border-rose-800/40 rounded-xl text-rose-300 text-xs">
                Violation of these rules will result in immediate termination of your account, forfeiture of cloud projects, and reporting to relevant authorities if applicable.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                4. Virtual Discord Simulator & Local Audio Safeguards
              </h2>
              <p>
                The in-browser Discord Simulator provided within SnapBot Studio is a mock sandbox built to emulate Discord interactions. Voice channel simulations execute entirely in local browser memory via HTML5 Web Audio and <code>localStorage</code>. No voice transmissions, audio recordings, or biometric telemetry are transmitted to our remote servers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                5. Disclaimer of Warranties & Limitation of Liability
              </h2>
              <p>
                THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, WORKSHOP-KOHARU AND ITS CONTRIBUTORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, NOR ANY LOSS OF REVENUE, PROFITS, GUILD DATA, OR BOT DOWNTIME RESULTING FROM DISCORD API CHANGES, CLOUD OUTAGES, OR YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-400" />
                6. Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea, without giving effect to any principles of conflicts of law. Any legal proceeding arising out of or related to these Terms shall be instituted exclusively in the competent courts of Seoul, South Korea.
              </p>
            </section>
          </div>
        )}

        {/* ==================================================================== */}
        {/* KOREAN TERMS OF SERVICE                                              */}
        {/* ==================================================================== */}
        {lang === 'ko' && (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-400" />
                제1조 (목적 및 효력)
              </h2>
              <p>
                본 약관은 Workshop-Koharu(이하 &quot;운영진&quot;)이 제공하는 블록 코딩 기반 디스코드 봇 개발 플랫폼 스냅봇(SnapBot, <code>https://snapbot.koharu.live</code>) 및 관련 제반 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 운영진과 회원의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
              <p>
                회원이 회원가입 절차를 거쳐 본 약관에 동의하거나 서비스를 지속 이용하는 경우 본 약관의 내용을 숙지하고 수락한 것으로 간주합니다.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                제2조 (생성된 코드의 지식재산권 및 소유권)
              </h2>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
                <p className="text-white font-bold">1. 사용자의 100% 독립적 소유권</p>
                <p className="text-slate-300">
                  사용자가 스냅봇 스튜디오에서 조립하고 변환한 디스코드 봇 소스코드(TypeScript, JavaScript, Python) 및 프로젝트 설계안에 대한 저작권과 모든 지식재산권은 전적으로 사용자 본인에게 귀속됩니다. 운영진은 사용자가 생성한 봇 코드에 대해 어떠한 로열티나 소유권을 주장하지 않으며, 상업적 배포 및 운영이 자유롭게 허용됩니다.
                </p>
                <p className="text-white font-bold pt-2">2. 오픈소스 템플릿 공유</p>
                <p className="text-slate-400">
                  사용자가 탐색 탭(/explore)에 공개로 등록한 프로젝트 템플릿의 경우, 다른 사용자가 해당 블록 구성을 열람하고 자신의 작업실로 복제(리믹스)하여 활용할 수 있습니다.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Ban className="w-4 h-4 text-rose-400" />
                제3조 (금지행위 및 디스코드 운영정책 준수)
              </h2>
              <p>회원은 스냅봇을 이용하여 다음 각 호의 행위를 하거나 그러한 봇을 제작·배포할 수 없습니다:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                <li>디스코드 공식 개발자 약관(Developer Terms of Service) 및 커뮤니티 가이드라인을 위반하는 봇 제작</li>
                <li>대량 스팸 DM 발송, 서버 테러(Raid), 불법 홍보용 봇의 제작 및 실행</li>
                <li>타인의 계정 토큰 탈취, 악성코드 유포, 피싱(Phishing) 링크 생성 봇 제작</li>
                <li>디스코드 API 게이트웨이 고의 과부하 유발 및 비정상 트래픽 발생 행위</li>
                <li>외부 하드웨어 제어 블록을 이용한 불법 물리 시설 침해 또는 위험 기기 무단 조작 행위</li>
              </ul>
              <div className="p-3 bg-rose-950/20 border border-rose-800/40 rounded-xl text-rose-300 text-xs">
                위 조항을 위반한 경우 사전 통보 없이 계정 영구 정지, 프로젝트 삭제 조치가 취해질 수 있습니다.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                제4조 (면책조항 및 책임의 제한)
              </h2>
              <p>
                1. 운영진은 천재지변, 디스코드 사의 API 정책 변경, 클라우드 인프라 장애 또는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
              </p>
              <p>
                2. 사용자가 스냅봇에서 생성한 코드를 외부 서버 또는 로컬 환경에서 실행하여 발생하는 디스코드 서버 차단, 봇 토큰 정지, 시스템 장애 등의 손해에 대하여 운영진은 책임을 부담하지 않습니다.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-400" />
                제5조 (준거법 및 관할법원)
              </h2>
              <p>
                본 약관의 해석 및 운영진과 회원 간의 분쟁에 대하여는 대한민국 법률을 준거법으로 적용하며, 분쟁 발생 시 서울중앙지방법원을 제1심 전속 관할법원으로 합니다.
              </p>
            </section>
          </div>
        )}

        {/* ==================================================================== */}
        {/* JAPANESE TERMS OF SERVICE                                            */}
        {/* ==================================================================== */}
        {lang === 'ja' && (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-400" />
                第1条（規約の適用および承諾）
              </h2>
              <p>
                本利用規約は、Workshop-Koharu（以下「当運営」）が提供するビジュアルDiscordボットIDE「SnapBot」（<code>https://snapbot.koharu.live</code>）の利用条件を定めるものです。ユーザーは本サービスを利用することで、本規約に同意したものとみなされます。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                第2条（生成されたコードの権利帰属）
              </h2>
              <p>
                SnapBotのエディタを通じて作成・出力されたDiscordボットのソースコード（TypeScript、JavaScript、Python）の権利は、全て作成したユーザーに帰属します。ユーザーは生成されたボットコードを商用・非商用問わず自由に公開・実行することができます。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Ban className="w-4 h-4 text-rose-400" />
                第3条（禁止事項）
              </h2>
              <p>
                Discordの公式利用規約に反するボット（スパム、レイド、フィッシング、トークン窃盗、不正アクセス等）の作成および実行を厳禁します。
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                第4条（免責事項）
              </h2>
              <p>
                当運営は、Discordの仕様変更やAPI停止、ユーザー自身の実行環境におけるトラブル等に起因するいかなる損害についても責任を負いません。
              </p>
            </section>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
          <div>
            <div className="text-white font-bold text-xs sm:text-sm">SnapBot Legal Department</div>
            <p className="text-slate-400 text-xs">Workshop-Koharu Legal Compliance Group</p>
            <p className="text-slate-400 text-xs mt-0.5">Contact: <code>admin@koharu.live</code></p>
          </div>

          <Link
            href="/cookies"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-colors"
          >
            {t.footer.cookiePolicy} &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
