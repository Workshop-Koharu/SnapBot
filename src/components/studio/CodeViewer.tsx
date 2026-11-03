'use client';

// ==============================================================================
// SnapBot Real-time Generated Code Viewer & ZIP Exporter
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState } from 'react';
import JSZip from 'jszip';
import { Copy, Check, Download, FileCode2, Terminal } from 'lucide-react';

interface CodeViewerProps {
  code: string;
  projectName: string;
  blockCount: number;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ code, projectName, blockCount }) => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      const zip = new JSZip();

      // 1. package.json
      const packageJson = {
        name: projectName.toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
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

      // 2. tsconfig.json
      const tsConfig = {
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
      };
      zip.file('tsconfig.json', JSON.stringify(tsConfig, null, 2));

      // 3. .env.example
      zip.file(
        '.env.example',
        `# SnapBot Discord Bot Credentials\nDISCORD_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"\nDISCORD_CLIENT_ID="YOUR_APPLICATION_ID_HERE"\n`
      );

      // 4. .gitignore
      zip.file('.gitignore', `node_modules/\ndist/\n.env\n`);

      // 5. src/bot.ts
      zip.file('src/bot.ts', code);

      // Generate zip blob & trigger browser download
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName.toLowerCase().replace(/[^a-z0-9-_]/g, '_')}_snapbot.zip`;
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
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-200">생성된 TypeScript 코드</span>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
            {blockCount}개 블록 연동
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨!' : '코드 복사'}</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-all shadow-md shadow-indigo-600/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? '압축 중...' : '원클릭 ZIP 다운로드'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed custom-scrollbar bg-[#090D16]">
        <pre className="text-slate-300">
          <code>{code}</code>
        </pre>
      </div>

      {/* Terminal Tip */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/40 text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>ZIP 압축 해제 후 <code>npm install && npm start</code> 로 즉시 실행 가능합니다.</span>
        </div>
      </div>
    </div>
  );
};
