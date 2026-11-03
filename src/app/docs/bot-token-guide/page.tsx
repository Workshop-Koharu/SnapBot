'use client';

// ==============================================================================
// SnapBot Discord Bot Token & Developer Portal Guide (/docs/bot-token-guide)
// Built 100% in TSX Web Page (Strict Rule: Zero additional .md files)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import Link from 'next/link';
import { Bot, ArrowLeft, Key, ExternalLink, ShieldAlert, CheckCircle2, Copy } from 'lucide-react';

export default function BotTokenGuidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 font-sans">
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur px-6 flex items-center justify-between shrink-0">
        <Link href="/docs" className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>공식 문서 홈으로</span>
        </Link>
        <span className="text-sm font-extrabold text-white">디스코드 봇 토큰 발급 가이드</span>
        <Link href="/studio" className="text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold">
          스튜디오 열기
        </Link>
      </header>

      <main className="max-w-4xl w-full mx-auto px-6 py-12 flex-1 space-y-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Key className="w-3.5 h-3.5" />
            <span>A to Z 초보자 친화 가이드</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3">
            디스코드 봇 토큰(Bot Token) 발급 및 서버 초대 방법
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            SnapBot 스튜디오에서 만든 봇을 실제 디스코드 서버에서 구동하려면 Discord 개발자 포털에서 봇 애플리케이션을 생성하고 토큰을 발급받아야 합니다. 아래의 단계를 순서대로 따라 해보세요.
          </p>
        </div>

        {/* Step 1 */}
        <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              1
            </span>
            <h2 className="text-lg font-bold text-white">Discord Developer Portal 접속 및 애플리케이션 생성</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-9">
            브라우저에서{' '}
            <a
              href="https://discord.com/developers/applications"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline inline-flex items-center gap-0.5"
            >
              <span>Discord Developer Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>{' '}
            에 접속하여 디스코드 계정으로 로그인합니다.
            우측 상단의 <strong>[New Application]</strong> 버튼을 누르고 봇 이름(예: MySnapBot)을 입력한 뒤 체크박스에 동의하고 <strong>[Create]</strong>를 클릭합니다.
          </p>
        </section>

        {/* Step 2 */}
        <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              2
            </span>
            <h2 className="text-lg font-bold text-white">봇(Bot) 탭에서 토큰(Token) 복사</h2>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed pl-9 space-y-2">
            <p>
              좌측 사이드바 메뉴에서 <strong>[Bot]</strong> 메뉴를 클릭합니다.
            </p>
            <p>
              <strong>Build-A-Bot</strong> 섹션에서 <strong>[Reset Token]</strong> 버튼을 누르면 비밀 봇 토큰이 화면에 나타납니다.
              <strong>[Copy]</strong> 버튼을 눌러 안전한 곳에 복사해 둡니다.
            </p>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-2 mt-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>
                주의: 봇 토큰은 절대 타인에게 공유하거나 GitHub 공개 저장소에 올리지 마세요!
              </span>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              3
            </span>
            <h2 className="text-lg font-bold text-white">특권 게이트웨이 인텐트(Privileged Gateway Intents) 활성화</h2>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed pl-9 space-y-2">
            <p>
              동일한 [Bot] 페이지에서 스크롤을 아래로 내리면 <strong>Privileged Gateway Intents</strong> 섹션이 있습니다.
              메시지 감지와 서버 멤버 입퇴장 이벤트를 정상 수신하기 위해 아래 세 항목을 모두 <strong>ON(활성화)</strong>으로 켭니다:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-200">
              <li><strong>Presence Intent</strong></li>
              <li><strong>Server Members Intent</strong> (새 멤버 입장/퇴장 감지)</li>
              <li><strong>Message Content Intent</strong> (메시지 본문 내용 읽기 필수)</li>
            </ul>
            <p>설정 후 페이지 하단의 <strong>[Save Changes]</strong> 초록색 버튼을 눌러 저장합니다.</p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              4
            </span>
            <h2 className="text-lg font-bold text-white">내 디스코드 서버로 봇 초대하기</h2>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed pl-9 space-y-2">
            <p>
              좌측 메뉴에서 <strong>[OAuth2] &rarr; [URL Generator]</strong>를 클릭합니다.
            </p>
            <p>
              1) <strong>SCOPES:</strong> <code>bot</code> 및 <code>applications.commands</code> 체크<br />
              2) <strong>BOT PERMISSIONS:</strong> <code>Administrator</code>(관리자) 또는 필요한 권한 체크
            </p>
            <p>
              페이지 최하단에 생성된 <strong>Generated URL</strong>을 복사하여 새 브라우저 탭에 붙여넣고, 내가 관리자로 있는 디스코드 서버를 선택하여 봇을 초대합니다.
            </p>
          </div>
        </section>

        {/* Step 5 */}
        <section className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">로컬에서 봇 실행하기</h2>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed pl-7 space-y-2">
            <p>
              스튜디오에서 다운로드한 ZIP 파일 내부의 <code>.env.example</code> 파일을 <code>.env</code> 로 복사한 뒤, 방금 발급받은 토큰을 입력합니다:
            </p>
            <div className="bg-slate-950 p-3 rounded-lg font-mono text-emerald-400">
              DISCORD_BOT_TOKEN="여기에_발급받은_봇_토큰_입력"<br />
              DISCORD_CLIENT_ID="여기에_애플리케이션_ID_입력"
            </div>
            <p>그 후 터미널에서 <code>npm install && npm start</code> 를 입력하면 봇이 성공적으로 실행됩니다!</p>
          </div>
        </section>
      </main>
    </div>
  );
}

