'use client';

// ==============================================================================
// SnapBot Real-time Multi-Language Code Viewer & Exporter
// Supports TypeScript (discord.js), JavaScript (Node.js), and Python (discord.py)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState, useMemo } from 'react';
import JSZip from 'jszip';
import { WorkspaceData } from '@/lib/snapbot/core/types';
import { compileWorkspace, compileToJavaScript, compileToPython } from '@/lib/snapbot/compiler/compiler';
import { useI18n } from '@/lib/i18n/context';
import { sounds } from '@/lib/audio/sounds';
import {
  Copy,
  Check,
  Download,
  FileCode2,
  Terminal,
  FileDown,
  Layers,
  Sparkles,
} from 'lucide-react';

export type TargetLanguage = 'typescript' | 'javascript' | 'python';

interface CodeViewerProps {
  code?: string;
  workspaceData?: WorkspaceData;
  projectName: string;
  blockCount: number;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  code: fallbackCode = '',
  workspaceData,
  projectName,
  blockCount,
}) => {
  const { t } = useI18n();
  const [activeLang, setActiveLang] = useState<TargetLanguage>('typescript');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Dynamically compile code for selected language
  const codeByLanguage = useMemo(() => {
    if (!workspaceData) {
      return {
        typescript: fallbackCode,
        javascript: fallbackCode,
        python: `# SnapBot Python export\n# Connect workspace to view real-time Python output`,
      };
    }
    const tsRes = compileWorkspace(workspaceData);
    const jsCode = compileToJavaScript(workspaceData);
    const pyCode = compileToPython(workspaceData);

    return {
      typescript: tsRes.code,
      javascript: jsCode,
      python: pyCode,
    };
  }, [workspaceData, fallbackCode]);

  const activeCode = codeByLanguage[activeLang];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeCode);
    sounds.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Single File Download (.ts / .js / .py)
  const handleDownloadSingleFile = () => {
    const ext = activeLang === 'typescript' ? 'ts' : activeLang === 'javascript' ? 'js' : 'py';
    const mime = activeLang === 'python' ? 'text/x-python' : 'text/javascript';
    const blob = new Blob([activeCode], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bot.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 2. Full Project ZIP Export
  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      const zip = new JSZip();
      const safeProjectName = projectName.toLowerCase().replace(/[^a-z0-9-_]/g, '-');

      if (activeLang === 'python') {
        // Python Package
        zip.file(
          'requirements.txt',
          `discord.py>=2.3.2\npython-dotenv>=1.0.0\naiohttp>=3.9.0\n`
        );
        zip.file(
          '.env.example',
          `# SnapBot Discord Bot Credentials (Python)\nDISCORD_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"\n`
        );
        zip.file('.gitignore', `__pycache__/\n*.pyc\n.env\nvenv/\n`);
        zip.file('bot.py', codeByLanguage.python);
        zip.file(
          'README.txt',
          `==============================================================================\n${projectName} - Discord Bot (Python discord.py)\nGenerated with SnapBot (https://snapbot.koharu.live)\n==============================================================================\n\nHow to run:\n1. Install Python 3.10+.\n2. Install dependencies:\n   pip install -r requirements.txt\n3. Copy .env.example to .env and insert your Discord Bot Token:\n   cp .env.example .env\n4. Start your bot:\n   python bot.py\n`
        );
      } else if (activeLang === 'javascript') {
        // JavaScript (Node.js CommonJS) Package
        const packageJson = {
          name: safeProjectName,
          version: '1.0.0',
          description: `Discord bot created with SnapBot (https://snapbot.koharu.live)`,
          main: 'src/bot.js',
          scripts: {
            start: 'node src/bot.js',
          },
          dependencies: {
            'discord.js': '^14.16.3',
            dotenv: '^16.4.5',
          },
        };
        zip.file('package.json', JSON.stringify(packageJson, null, 2));
        zip.file(
          '.env.example',
          `# SnapBot Discord Bot Credentials (JavaScript)\nDISCORD_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"\nDISCORD_CLIENT_ID="YOUR_APPLICATION_ID_HERE"\n`
        );
        zip.file('.gitignore', `node_modules/\n.env\n`);
        zip.file('src/bot.js', codeByLanguage.javascript);
        zip.file(
          'README.txt',
          `==============================================================================\n${projectName} - Discord Bot (JavaScript discord.js)\nGenerated with SnapBot (https://snapbot.koharu.live)\n==============================================================================\n\nHow to run:\n1. Install Node.js 18+ or 20+.\n2. Install dependencies:\n   npm install\n3. Copy .env.example to .env and insert your Discord Bot Token:\n   cp .env.example .env\n4. Start your bot:\n   npm start\n`
        );
      } else {
        // TypeScript Package
        const packageJson = {
          name: safeProjectName,
          version: '1.0.0',
          description: `Discord bot created with SnapBot (https://snapbot.koharu.live)`,
          main: 'dist/bot.js',
          scripts: {
            build: 'tsc',
            start: 'node dist/bot.js',
            dev: 'ts-node src/bot.ts',
          },
          dependencies: {
            'discord.js': '^14.16.3',
            dotenv: '^16.4.5',
          },
          devDependencies: {
            '@types/node': '^20.14.0',
            typescript: '^5.5.0',
            'ts-node': '^10.9.2',
          },
        };
        zip.file('package.json', JSON.stringify(packageJson, null, 2));
        zip.file(
          'tsconfig.json',
          JSON.stringify(
            {
              compilerOptions: {
                target: 'ES2022',
                module: 'commonjs',
                moduleResolution: 'node',
                outDir: './dist',
                rootDir: './src',
                strict: true,
                esModuleInterop: true,
                skipLibCheck: true,
                forceConsistentCasingInFileNames: true,
              },
              include: ['src/**/*'],
            },
            null,
            2
          )
        );
        zip.file(
          '.env.example',
          `# SnapBot Discord Bot Credentials (TypeScript)\nDISCORD_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"\nDISCORD_CLIENT_ID="YOUR_APPLICATION_ID_HERE"\n`
        );
        zip.file('.gitignore', `node_modules/\ndist/\n.env\n`);
        zip.file('src/bot.ts', codeByLanguage.typescript);
        zip.file(
          'README.txt',
          `==============================================================================\n${projectName} - Discord Bot (TypeScript discord.js)\nGenerated with SnapBot (https://snapbot.koharu.live)\n==============================================================================\n\nHow to run:\n1. Install Node.js 18+ or 20+.\n2. Install dependencies:\n   npm install\n3. Copy .env.example to .env and insert your Discord Bot Token:\n   cp .env.example .env\n4. Build and start your bot:\n   npm run build && npm start\n`
        );
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${safeProjectName}_${activeLang}_snapbot.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('ZIP 생성 오류:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 border-l border-slate-800 text-slate-200">
      {/* Top Language Switcher Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveLang('typescript')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeLang === 'typescript'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>TypeScript</span>
          </button>

          <button
            onClick={() => setActiveLang('javascript')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeLang === 'javascript'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>JavaScript</span>
          </button>

          <button
            onClick={() => setActiveLang('python')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeLang === 'python'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Python</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono">
            {blockCount} {t.studio.blocksCount}
          </span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-900/40">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>
            {activeLang === 'typescript'
              ? 'src/bot.ts'
              : activeLang === 'javascript'
              ? 'src/bot.js'
              : 'bot.py'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Copy Code */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
            title={t.studio.copyCode}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? t.studio.copied : t.studio.copyCode}</span>
          </button>

          {/* Download Single File */}
          <button
            onClick={handleDownloadSingleFile}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
            title={`${t.studio.downloadFile} (.${activeLang === 'typescript' ? 'ts' : activeLang === 'javascript' ? 'js' : 'py'})`}
          >
            <FileDown className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">.{activeLang === 'typescript' ? 'ts' : activeLang === 'javascript' ? 'js' : 'py'}</span>
          </button>

          {/* Download ZIP */}
          <button
            onClick={handleDownloadZip}
            disabled={isExporting}
            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-all shadow-sm shadow-indigo-600/30"
            title={t.studio.downloadZip}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? t.studio.compressing : t.studio.downloadZip}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed custom-scrollbar bg-[#090D16]">
        <pre className="text-slate-300 select-text">
          <code>{activeCode}</code>
        </pre>
      </div>

      {/* Terminal Tip */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/60 text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate">
          <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">
            {activeLang === 'python'
              ? 'pip install -r requirements.txt && python bot.py'
              : activeLang === 'javascript'
              ? 'npm install && npm start'
              : 'npm install && npm run build && npm start'}
          </span>
        </div>
      </div>
    </div>
  );
};
