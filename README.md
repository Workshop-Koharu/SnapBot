# SnapBot (스냅봇) 🤖

> **"스크래치(Scratch)와 엔트리(Entry)처럼 블록을 조립하면 바로 작동하는 오픈소스 디스코드 봇 비주얼 코딩 IDE & 공식 라이브러리"**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25%20Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![discord.js](https://img.shields.io/badge/discord.js-v14-5865F2?logo=discord&logoColor=white)](https://discord.js.org/)
[![Website](https://img.shields.io/badge/Website-snapbot.koharu.live-6366F1)](https://snapbot.koharu.live)
[![Organization](https://img.shields.io/badge/GitHub-Workshop--Koharu-181717?logo=github)](https://github.com/Workshop-Koharu/SnapBot)

---

## 📌 목차 (Table of Contents)
1. [프로젝트 소개 (Introduction)](#-프로젝트-소개)
2. [핵심 아키텍처 및 철학 (Core Architecture)](#-핵심-아키텍처-및-철학)
3. [주요 기능 (Key Features)](#-주요-기능)
4. [표준 블록 카테고리 (Block Catalog)](#-표준-블록-카테고리)
5. [공식 라이브러리 패키지 구조 (Packages)](#-공식-라이브러리-패키지-구조)
6. [로컬 개발 환경 설정 (Local Setup)](#-로컬-개발-환경-설정)
7. [환경 변수 설정 안내 (Environment Variables)](#-환경-변수-설정-안내)
8. [Vercel 배포 가이드 (Vercel Deployment)](#-vercel-배포-가이드)
9. [오픈소스 기여 가이드 (Contributing Guide)](#-오픈소스-기여-가이드)
10. [보안 정책 (Security Policy)](#-보안-정책)
11. [변경 이력 (Changelog)](#-변경-이력)
12. [행동 강령 (Code of Conduct)](#-행동-강령)
13. [라이선스 (License)](#-라이선스)

---

## 🌟 프로젝트 소개
**SnapBot (스냅봇)**은 프로그래밍을 처음 접하는 초보자부터 빠른 프로토타입 봇을 원하는 숙련된 개발자까지, 누구나 웹 브라우저에서 레고 블록을 맞추듯 시각적으로 디스코드 봇을 만들 수 있는 차세대 오픈소스 개발 플랫폼입니다.

- **공식 웹사이트**: [https://snapbot.koharu.live](https://snapbot.koharu.live)
- **공식 GitHub 저장소**: [https://github.com/Workshop-Koharu/SnapBot](https://github.com/Workshop-Koharu/SnapBot)
- **라이선스**: MIT License (Workshop-Koharu)

기존의 Blockly나 스크래치 서드파티 템플릿에 의존하던 방식에서 벗어나, **순수 TypeScript로 자체 구축된 수학적 SVG 렌더링 엔진과 자석 스냅(Magnetic Snapping) 물리 엔진**을 기반으로 동작합니다.

---

## 🏗️ 핵심 아키텍처 및 철학 (Zero-Base Architecture)

SnapBot은 무거운 서드파티 블록 에디터 템플릿을 일체 사용하지 않고, 다음과 같은 자체 레이어로 구성되어 있습니다:

```
┌────────────────────────────────────────────────────────┐
│                   SnapBot Web Studio                   │
│   (Next.js App Router + Tailwind CSS + Lucide Icons)   │
└────────────────────────────────────────────────────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
┌─────────────────────────┐         ┌─────────────────────────┐
│     @snapbot/ui-canvas  │         │    @snapbot/runtime     │
│ - SVG 블록 패스 기하학     │         │ - 브라우저 디스코드 시뮬레이터│
│ - 2D 유클리드 자석 스냅  │         │ - 가상 웹소켓 게이트웨이  │
│ - 무한 줌 & 패닝 캔버스 │         │ - 가상 챗 & 버튼 인터랙션│
└─────────────────────────┘         └─────────────────────────┘
       │                                       ▲
       ▼                                       │
┌─────────────────────────┐         ┌─────────────────────────┐
│      @snapbot/core      │────────▶│   @snapbot/compiler     │
│ - Visual AST 트리 모델  │         │ - discord.js v14 생성기 │
│ - 입출력 슬롯 연결 검증 │         │ - TS / JS 클린 코드 컴파일│
│ - Undo/Redo 이력 관리자 │         │ - 슬래시 명령어 자동 등록 │
└─────────────────────────┘         └─────────────────────────┘
       │
       ▼
┌─────────────────────────┐
│     @snapbot/blocks     │
│ - 이벤트(Hat) / 메시지  │
│ - 임베드 / 버튼 / 모달  │
│ - 제어(C-Block) / 변수  │
│ - 서버 관리(Moderation) │
└─────────────────────────┘
```

---

## ✨ 주요 기능

1. **순수 TypeScript 자석 스냅(Magnetic Snapping) 엔진**
   - 블록을 드래그하여 다른 블록의 홈(Notch)이나 돌기(Tab) 근처로 가져가면 반경 32px 내에서 자석처럼 부드럽게 달라붙습니다.
2. **최신 `discord.js` v14 실시간 트랜스파일러**
   - 블록을 수정하는 즉시 우측 코드 뷰어에 최적화된 TypeScript 코드가 실시간으로 생성됩니다.
3. **토큰 없는 브라우저 봇 시뮬레이터**
   - 봇 토큰 발급 전이라도 브라우저 내 가상 `#general` 채널에서 직접 메시지를 보내고, `/ping` 명령어를 실행하고, 버튼을 클릭해 볼 수 있습니다.
4. **원클릭 ZIP 다운로드**
   - 완성된 봇 프로젝트를 `package.json`, `tsconfig.json`, `.env.example`, `src/bot.ts`가 포함된 압축 파일로 한 번에 다운로드하여 로컬에서 바로 실행할 수 있습니다.
5. **보안 이메일 인증(Resend OTP) 및 구글 소셜 로그인**
   - 6자리 일회용 인증번호(OTP) 이메일 발송과 Google OAuth 2.0 연동을 기본 지원합니다.
6. **Supabase PostgreSQL & Prisma ORM 영구 데이터베이스**
   - 봇 프로젝트 및 커뮤니티 공유 데이터를 안전하게 저장합니다.

---

## 🧩 표준 블록 카테고리

| 카테고리 | 블록 형태 | 대표 블록 (Opcode) | 설명 |
| :--- | :--- | :--- | :--- |
| **이벤트 (Events)** | 모자(Hat) 블록 | `event_ready`, `event_message_create`, `event_interaction_create`, `event_button_click` | 봇의 모든 동작이 시작되는 트리거 시작 블록 |
| **메시지 & 응답** | 커맨드 블록 | `action_send_message`, `action_reply_message`, `action_reply_ephemeral`, `action_delete_message` | 채널 메시지 전송, 답장, 비공개 응답, 반응(이모지) 달기 |
| **임베드 & UI** | 커맨드 블록 | `action_create_embed`, `action_embed_add_field`, `action_add_button` | 카드형 임베드 메시지, 인터랙티브 클릭 버튼 |
| **흐름 및 제어** | C자형 감싸기 & 육각형 | `control_if`, `control_if_else`, `control_repeat_times`, `control_wait`, `operator_compare` | 만약 ~라면 조건문, N번 반복, 딜레이 대기, 대소 비교 |
| **변수 & 데이터** | 둥근 알약형 & 커맨드 | `var_set`, `var_get`, `data_author_name`, `data_db_set`, `data_db_get` | 메모리 변수 할당, 작성자 정보, 영구 DB 저장 |
| **서버 관리** | 커맨드 블록 | `mod_kick_member`, `mod_ban_member`, `mod_timeout_member`, `mod_purge_messages` | 유저 추방, 차단, 타임아웃, 메시지 일괄 청소 |

---

## 📦 공식 라이브러리 패키지 구조

SnapBot 프로젝트의 핵심 코드는 모듈화되어 있습니다:

- `src/lib/snapbot/core/`: 블록 상태, 유클리드 거리 기반 스냅 포인트 계산, 직렬화
- `src/lib/snapbot/blocks/`: 30개 이상의 디스코드 표준 블록 명세
- `src/lib/snapbot/compiler/`: AST 트리를 `discord.js` v14 실행 파일로 변환
- `src/lib/snapbot/runtime/`: 브라우저용 가상 디스코드 채널 및 이벤트 루프 시뮬레이터
- `src/lib/snapbot/ui/`: 수학적 곡률과 노치를 계산하는 SVG Path 생성기

---

## 💻 로컬 개발 환경 설정

### 1. 저장소 복제 (Clone)
```bash
git clone https://github.com/Workshop-Koharu/SnapBot.git
cd SnapBot
```

### 2. 패키지 설치
```bash
npm install
```

### 3. 환경 변수 파일 복사 및 설정
```bash
cp .env.example .env
```
`.env` 파일에 데이터베이스 연결 주소와 Resend API 키를 입력합니다.

### 4. Prisma 클라이언트 생성
```bash
npx prisma generate
```

### 5. 로컬 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000` 에 접속합니다.

---

## 🔐 환경 변수 설정 안내

| 환경 변수명 | 필수 여부 | 기본 예시값 | 설명 |
| :--- | :---: | :--- | :--- |
| `DATABASE_URL` | 필수 | `postgresql://postgres:...@...supabase.co:5432/postgres` | Supabase PostgreSQL 연결 URI |
| `RESEND_API_KEY` | 필수 | `re_...` | Resend 이메일 발송 API 키 |
| `EMAIL_FROM` | 필수 | `SnapBot <admin@koharu.live>` | 인증번호 및 환영 이메일 발신 주소 |
| `NEXT_PUBLIC_APP_URL`| 필수 | `https://snapbot.koharu.live` | 공식 서비스 도메인 주소 |
| `AUTH_SECRET` | 필수 | 32자 이상의 무작위 문자열 | JWT 세션 암호화 키 |
| `GOOGLE_CLIENT_ID` | 선택 | `...apps.googleusercontent.com` | Google Cloud OAuth 2.0 클라이언트 ID |
| `GOOGLE_CLIENT_SECRET`| 선택 | `GOCSPX-...` | Google Cloud OAuth 2.0 클라이언트 보안 비밀 |

---

## 🚀 Vercel 배포 가이드

1. **Vercel 대시보드**에 로그인한 후 **[Add New...] &rarr; [Project]**를 선택합니다.
2. GitHub 저장소 **`Workshop-Koharu/SnapBot`**을 Import합니다.
3. **Environment Variables**에 위의 모든 필수 환경변수를 등록합니다.
4. **Build Command**가 `prisma generate && next build` 로 설정되어 있는지 확인합니다.
5. **[Deploy]**를 누르면 자동으로 빌드되어 배포가 완료됩니다.
6. 배포 후 Vercel의 **Settings &rarr; Domains** 메뉴에서 `snapbot.koharu.live` 커스텀 도메인을 추가하고 CNAME 레코드를 연결합니다.

---

## 🤝 오픈소스 기여 가이드 (Contributing Guide)

우리는 커뮤니티의 모든 기여(새로운 블록 제안, 버그 제보, 문서 개선 등)를 환영합니다!

1. 본 저장소를 Fork합니다.
2. 기능 추가 브랜치를 생성합니다 (`git checkout -b feature/awesome-new-block`).
3. 변경 사항을 커밋합니다 (`git commit -m 'feat: Add voice channel connection block'`).
4. 브랜치에 푸시합니다 (`git push origin feature/awesome-new-block`).
5. `main` 브랜치를 향해 Pull Request를 작성합니다.

> **※ 주의 (파일 규칙)**: 본 저장소는 단일 `README.md` 통합 원칙을 따르므로 별도의 `.md` 파일을 추가하지 마시고 모든 가이드 문서는 웹 라우트(`.tsx`) 또는 본 파일에 기여해 주세요.

---

## 🛡️ 보안 정책 (Security Policy)

SnapBot은 유저의 봇 토큰과 개인정보를 최우선으로 보호합니다.
보안 취약점을 발견하신 경우 공개 이슈를 생성하지 마시고 `admin@koharu.live`로 즉시 제보해 주시기 바랍니다. 신속하게 패치 및 대응하겠습니다.

---

## 📜 변경 이력 (Changelog)

### v1.0.0 (2026-11-03)
- 🚀 SnapBot 최초 공식 릴리즈
- 🧩 순수 TypeScript 기반 2D 자석 스냅(Magnetic Snapping) 물리 블록 엔진 구축
- 💬 discord.js v14 실시간 코드 생성기(`@snapbot/compiler`) 구현
- 🎮 브라우저 인메모리 가상 디스코드 채널 시뮬레이터(`@snapbot/runtime`) 구현
- 📧 Resend 연동 6자리 OTP 인증 회원가입 및 환영 이메일 자동 발송 시스템 도입
- 🌐 Google OAuth 2.0 소셜 로그인 인프라 완비
- 📦 원클릭 ZIP 프로젝트 다운로드 및 JSON 워크스페이스 저장/불러오기 기능 탑재

---

## 🤝 행동 강령 (Code of Conduct)

모든 기여자 및 참가자는 서로를 존중하며 친절하고 포용적인 태도로 소통해야 합니다. 괴롭힘, 혐오 표현, 차별적 언행은 엄격히 금지됩니다.

---

## 📄 라이선스 (License)

본 프로젝트는 **MIT License**에 따라 자유롭게 사용, 수정, 배포할 수 있습니다.
자세한 라이선스 전문은 [LICENSE](LICENSE) 파일을 참조하세요.

Copyright (c) 2026 **Workshop-Koharu** (<https://github.com/Workshop-Koharu>).
