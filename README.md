# SnapBot

A Scratch and Entry-style visual block-coding platform and official TypeScript engine for creating Discord bots.

- **Website**: [https://snapbot.koharu.live](https://snapbot.koharu.live)
- **Organization**: Workshop-Koharu

---

## Features

- **Pure TypeScript Zero-Base Engine**: Built from scratch with a custom SVG block renderer and magnetic snapping physics without Blockly or third-party visual block libraries.
- **200+ Standard Discord Blocks**: Covers 9 categories including Events, Messages, Embeds, Buttons/Modals, Control flow, Operators, Variables, Server Moderation, and Persistent Database storage.
- **Live discord.js v14 Transpiler**: Generates clean, production-ready TypeScript code in real time as blocks snap together.
- **In-Browser Bot Simulator**: Test incoming messages, slash commands, and button interactions directly in a simulated Discord channel without needing bot tokens.
- **One-Click ZIP Export**: Download ready-to-run projects bundled with `package.json`, `tsconfig.json`, and configured dependencies.
- **Mobile Responsive & Multilingual**: Fully interactive on desktop and mobile touch devices, supporting English, Japanese, and Korean.

---

## Architecture

```
src/lib/snapbot/
├── core/        # Block data models, magnetic snapping engine, serializer, undo/redo
├── blocks/      # 200+ standard block definitions and compilation rules
├── compiler/    # Visual AST to clean discord.js v14 TypeScript code generator
├── runtime/     # In-memory virtual Discord channel simulator
└── ui/          # Mathematical SVG block paths (hat, command, c-block, hexagon, reporter)
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env

# 3. Generate Prisma client
npx prisma generate

# 4. Start local development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Environment Variables (.env)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `RESEND_API_KEY` | Resend API key for verification emails | `re_...` |
| `EMAIL_FROM` | Sender email address | `SnapBot <admin@koharu.live>` |
| `NEXT_PUBLIC_APP_URL` | Base application URL | `https://snapbot.koharu.live` |
| `AUTH_SECRET` | Session JWT secret | 32+ char random string |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | `GOCSPX-...` |

---

&copy; 2026 [Workshop-Koharu](https://snapbot.koharu.live). All rights reserved.
