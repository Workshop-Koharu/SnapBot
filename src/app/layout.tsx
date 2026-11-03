import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SnapBot (스냅봇) - 엔트리·스크래치 방식의 비주얼 디스코드 봇 IDE & 라이브러리',
  description:
    '외부 블록 에디터 라이브러리 없이 순수 TypeScript로 밑바닥부터 개발된 스크래치·엔트리 스타일의 오픈소스 디스코드 봇 비주얼 코딩 플랫폼.',
  keywords: [
    'SnapBot',
    '스냅봇',
    '디스코드 봇',
    '블록코딩',
    '엔트리',
    '스크래치',
    'discord.js',
    'TypeScript',
    '오픈소스',
  ],
  authors: [{ name: 'Workshop-Koharu', url: 'https://github.com/Workshop-Koharu' }],
  metadataBase: new URL('https://snapbot.koharu.live'),
  openGraph: {
    title: 'SnapBot (스냅봇) - 비주얼 블록 코딩 디스코드 봇 플랫폼',
    description:
      '블록을 조립하면 바로 완성되는 디스코드 봇! 순수 TypeScript 자석 스냅 엔진 & discord.js v14 실시간 컴파일러.',
    url: 'https://snapbot.koharu.live',
    siteName: 'SnapBot',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnapBot (스냅봇)',
    description: '스크래치·엔트리 스타일의 오픈소스 디스코드 봇 비주얼 코딩 플랫폼',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>" />
      </head>
      <body className="min-h-screen bg-[#090D16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
