# SnapBot

엔트리(Entry)와 스크래치(Scratch)처럼 블록을 조립해 디스코드 봇을 만드는 오픈소스 비주얼 코딩 플랫폼 & 공식 TypeScript 라이브러리입니다.

- **웹사이트**: [https://snapbot.koharu.live](https://snapbot.koharu.live)
- **저장소**: [https://github.com/Workshop-Koharu/SnapBot](https://github.com/Workshop-Koharu/SnapBot)
- **라이선스**: MIT License (Workshop-Koharu)

---

## 특징

- **순수 TypeScript Zero-Base 엔진**: Blockly 등 기성 서드파티 에디터 없이 자체 SVG 블록 렌더러와 자석 스냅(Magnetic Snapping) 물리 엔진으로 구축했습니다.
- **200+ 표준 디스코드 블록**: 이벤트, 메시지, 임베드, 버튼/모달, 반복/조건문, 연산, 변수, 서버 관리(Mod), 영구 DB 등 9개 카테고리를 지원합니다.
- **discord.js v14 실시간 컴파일**: 블록을 조립하면 즉시 실행 가능한 깨끗한 TypeScript 코드가 실시간으로 생성됩니다.
- **브라우저 내장 봇 시뮬레이터**: 봇 토큰 없이도 브라우저 가상 채널에서 메시지 수신, 슬래시 명령어, 버튼 클릭을 즉시 테스트할 수 있습니다.
- **원클릭 ZIP 내보내기**: `package.json`, `tsconfig.json`, `.env.example`, `src/bot.ts`가 포함된 압축 파일로 내려받아 바로 실행할 수 있습니다.

---

## 패키지 구조

```
src/lib/snapbot/
├── core/        # 블록 데이터 모델, 자석 스냅 엔진, 직렬화, Undo/Redo
├── blocks/      # 200개 이상의 표준 블록 정의 및 컴파일 로직
├── compiler/    # Visual AST -> discord.js v14 TypeScript 코드 생성기
├── runtime/     # 브라우저 인메모리 가상 디스코드 채널 시뮬레이터
└── ui/          # 수학적 SVG 패스(모자, 커맨드, C자형, 육각형, 알약형) 지오메트리
```

---

## 로컬 개발 환경 실행

```bash
# 1. 저장소 복제 및 패키지 설치
git clone https://github.com/Workshop-Koharu/SnapBot.git
cd SnapBot
npm install

# 2. 환경변수 설정
cp .env.example .env

# 3. Prisma 클라이언트 생성
npx prisma generate

# 4. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 으로 접속합니다.

---

## 환경 변수 (.env)

| 변수명 | 설명 | 예시 |
| :--- | :--- | :--- |
| `DATABASE_URL` | Supabase PostgreSQL 연결 주소 | `postgresql://postgres:...@...supabase.co:5432/postgres` |
| `RESEND_API_KEY` | Resend 이메일 발송 API Key | `re_...` |
| `EMAIL_FROM` | 인증 메일 발신자 주소 | `SnapBot <admin@koharu.live>` |
| `NEXT_PUBLIC_APP_URL` | 서비스 기본 URL | `https://snapbot.koharu.live` |
| `AUTH_SECRET` | 세션 JWT 암호화 키 | 32자 이상 랜덤 문자열 |
| `GOOGLE_CLIENT_ID` | 구글 OAuth 클라이언트 ID | `...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | 구글 OAuth 보안 비밀 | `GOCSPX-...` |

---

## 기여 및 라이선스

버그 제보와 새로운 블록 제안 등 모든 기여를 환영합니다. Pull Request를 보내주시면 검토 후 반영됩니다.  
(주의: 저장소 내 단일 문서 유지 규칙에 따라 추가 `.md` 파일은 생성하지 않고 웹 라우트(`.tsx`) 또는 본 파일에 기여해 주세요.)

- **License**: MIT License &copy; 2026 [Workshop-Koharu](https://github.com/Workshop-Koharu)
