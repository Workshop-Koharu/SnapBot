'use client';

// ==============================================================================
// SnapBot User Registration Page (/register)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useI18n, LanguageSelector } from '@/lib/i18n/context';
import { sounds } from '@/lib/audio/sounds';

function RegisterContent() {
  const router = useRouter();
  const { lang } = useI18n();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    sounds.play('click');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nickname }),
      });

      const data = await res.json();
      if (!res.ok) {
        sounds.play('delete');
        throw new Error(data.error || '회원가입 요청에 실패했습니다.');
      }

      sounds.play('snap');
      // Redirect to dedicated OTP verification screen
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const text = {
    title: lang === 'ko' ? '무료 회원가입' : lang === 'ja' ? '無料登録' : 'Create an Account',
    subtitle:
      lang === 'ko'
        ? 'SnapBot으로 나만의 강력한 디스코드 봇을 즉시 만들어보세요.'
        : lang === 'ja'
        ? 'SnapBotで自分だけのDiscordボットを作成しましょう。'
        : 'Build your own powerful Discord bots with SnapBot in minutes.',
    nicknameLabel: lang === 'ko' ? '닉네임 (활동명)' : lang === 'ja' ? 'ニックネーム' : 'Nickname',
    emailLabel: lang === 'ko' ? '이메일 주소' : lang === 'ja' ? 'メールアドレス' : 'Email Address',
    passwordLabel: lang === 'ko' ? '비밀번호' : lang === 'ja' ? 'パスワード' : 'Password',
    submitBtn: lang === 'ko' ? '인증번호 발송 및 계속하기' : lang === 'ja' ? '認証コードを送信' : 'Send Verification Code',
    submitting: lang === 'ko' ? '처리 중...' : lang === 'ja' ? '処理中...' : 'Processing...',
    or: lang === 'ko' ? '또는' : lang === 'ja' ? 'または' : 'OR',
    googleBtn:
      lang === 'ko'
        ? 'Google 계정으로 계속하기'
        : lang === 'ja'
        ? 'Googleで登録'
        : 'Sign up with Google',
    hasAccount: lang === 'ko' ? '이미 계정이 있으신가요?' : lang === 'ja' ? 'すでにアカウントをお持ちですか？' : 'Already have an account?',
    signIn: lang === 'ko' ? '로그인' : lang === 'ja' ? 'ログイン' : 'Sign in',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090D16] p-6 text-slate-100 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Language selector in top right */}
        <div className="flex justify-end mb-2">
          <LanguageSelector />
        </div>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
              <img src="/icon.png" alt="SnapBot" className="w-7 h-7 object-contain" />
            </div>
            <span className="font-extrabold text-lg text-white">SnapBot</span>
          </Link>
          <h2 className="text-xl font-bold text-white tracking-tight">{text.title}</h2>
          <p className="text-xs text-slate-400 mt-1">{text.subtitle}</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">{text.nicknameLabel}</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                required
                placeholder="코하루 (Koharu)"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-700/80 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">{text.emailLabel}</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-700/80 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">{text.passwordLabel}</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="최소 6자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-700/80 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.01] mt-2"
          >
            <span>{loading ? text.submitting : text.submitBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Social Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
              <span className="bg-slate-900 px-2 text-slate-500">{text.or}</span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <a
            href="/api/auth/google"
            onClick={() => sounds.play('click')}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition-all shadow-md hover:scale-[1.01]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{text.googleBtn}</span>
          </a>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          {text.hasAccount}{' '}
          <Link href="/login" className="text-indigo-400 hover:underline font-semibold">
            {text.signIn}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#090D16] text-slate-400 text-xs">
          Loading...
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
