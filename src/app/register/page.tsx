'use client';

// ==============================================================================
// SnapBot User Registration & 6-Digit OTP Verification Flow
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bot, Mail, Lock, User, ArrowRight, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  // Registration step: 1 = Form, 2 = 6-digit OTP verification
  const [step, setStep] = useState<1 | 2>(1);

  // Form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  // OTP inputs
  const [otpCode, setOtpCode] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes
  const [isResending, setIsResending] = useState(false);

  // Status message
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 10-Minute Countdown Timer for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timerSeconds]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Step 1: Submit Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nickname }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '회원가입 요청에 실패했습니다.');
      }

      // Transition to Step 2: OTP screen
      setStep(2);
      setTimerSeconds(600);
      setSuccessMsg(`인증번호 6자리가 ${email} 주소로 발송되었습니다.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify 6-digit OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '인증번호가 일치하지 않습니다.');
      }

      setSuccessMsg('인증이 완료되었습니다! 잠시 후 스튜디오로 이동합니다.');
      setTimeout(() => {
        router.push('/studio');
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP code
  const handleResendOtp = async () => {
    setErrorMsg('');
    setIsResending(true);
    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '재전송 실패');
      setTimerSeconds(600);
      setSuccessMsg('새로운 인증번호가 발송되었습니다.');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090D16] p-6 text-slate-100">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
              <img src="/icon.png" alt="SnapBot" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-extrabold text-lg text-white">SnapBot</span>
          </Link>
          <h2 className="text-xl font-bold text-white">
            {step === 1 ? '회원가입' : '이메일 6자리 인증번호 입력'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {step === 1
              ? 'SnapBot으로 나만의 디스코드 봇을 무료로 만들어 보세요.'
              : `${email} 주소로 발송된 6자리 번호를 입력해 주세요.`}
          </p>
        </div>

        {/* Alert Messages */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {step === 1 ? (
          /* STEP 1: Registration Form */
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">이메일 주소</label>
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
              <label className="block text-xs font-medium text-slate-300 mb-1.5">닉네임</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="디스코드 개발자"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-700/80 focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">비밀번호</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="8자 이상 안전한 비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-700/80 focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] mt-2"
            >
              <span>{loading ? '인증번호 발송 중...' : '이메일 인증번호 받기'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Social Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                <span className="bg-slate-900 px-2 text-slate-500">또는</span>
              </div>
            </div>

            {/* Google OAuth Button */}
            <a
              href="/api/auth/google"
              className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition-all shadow-md"
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
              <span>Google 계정으로 계속하기</span>
            </a>
          </form>
        ) : (
          /* STEP 2: 6-Digit OTP Verification Form */
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-300 font-medium">인증번호 6자리</span>
                <span className="text-indigo-400 font-mono font-semibold">
                  남은 시간: {formatTimer(timerSeconds)}
                </span>
              </div>

              <input
                type="text"
                maxLength={6}
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="123456"
                className="w-full bg-slate-950 text-white text-center font-mono text-2xl tracking-[12px] rounded-xl py-3 border border-slate-700/80 focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otpCode.length !== 6}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
            >
              <span>{loading ? '인증 확인 중...' : '인증 완료 및 가입 승인'}</span>
            </button>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                &larr; 이메일 다시 입력
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                <span>인증번호 재전송</span>
              </button>
            </div>
          </form>
        )}

        {/* Bottom Link to Login */}
        <div className="mt-6 text-center text-xs text-slate-400">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-indigo-400 hover:underline font-semibold">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}

