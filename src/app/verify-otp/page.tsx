'use client';

// ==============================================================================
// SnapBot 6-Digit Security Code (OTP) Verification Screen (/verify-otp)
// Dedicated verification page for Email / Google OAuth registrations
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useI18n, LanguageSelector } from '@/lib/i18n/context';
import { sounds } from '@/lib/audio/sounds';
import {
  ShieldCheck,
  Mail,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowLeft,
} from 'lucide-react';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useI18n();

  const emailParam = searchParams.get('email') || '';
  const providerParam = searchParams.get('provider') || '';

  const [email, setEmail] = useState(emailParam);
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes
  const [loading, setLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  // Focus the first empty digit box on load
  useEffect(() => {
    const firstEmpty = digits.findIndex((d) => !d);
    const targetIdx = firstEmpty === -1 ? 0 : firstEmpty;
    inputRefs.current[targetIdx]?.focus();
  }, []);

  // 10-Minute Countdown Timer
  useEffect(() => {
    if (timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDigitChange = (index: number, val: string) => {
    setErrorMsg('');
    // Strip non-digits
    const clean = val.replace(/\D/g, '');

    if (!clean) {
      const nextDigits = [...digits];
      nextDigits[index] = '';
      setDigits(nextDigits);
      return;
    }

    // Handle single character
    const char = clean.slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = char;
    setDigits(nextDigits);
    sounds.play('snap');

    // Auto focus next input
    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const nextDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      nextDigits[i] = pasted[i] || '';
    }
    setDigits(nextDigits);
    sounds.play('snap');

    const lastIdx = Math.min(pasted.length, 5);
    inputRefs.current[lastIdx]?.focus();

    // If all 6 digits pasted, trigger submit
    if (pasted.length === 6) {
      executeVerify(pasted);
    }
  };

  const executeVerify = async (codeToSubmit: string) => {
    if (!email) {
      setErrorMsg(lang === 'ko' ? '이메일 주소를 입력해 주세요.' : 'Please provide an email address.');
      return;
    }

    if (codeToSubmit.length !== 6) {
      setErrorMsg(
        lang === 'ko'
          ? '6자리 인증번호를 모두 입력해 주세요.'
          : 'Please enter all 6 digits of the verification code.'
      );
      sounds.play('delete');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: codeToSubmit }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || (lang === 'ko' ? '인증에 실패했습니다.' : 'Verification failed.'));
      }

      sounds.play('success');
      setSuccessMsg(
        lang === 'ko'
          ? '인증이 성공적으로 완료되었습니다! 대시보드로 이동합니다.'
          : 'Verification successful! Redirecting to dashboard...'
      );

      setTimeout(() => {
        router.push('/dashboard');
      }, 900);
    } catch (err: any) {
      sounds.play('delete');
      setErrorMsg(err.message || '인증 처리 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = digits.join('');
    executeVerify(fullCode);
  };

  const handleResend = async () => {
    if (!email) return;
    setErrorMsg('');
    setIsResending(true);
    sounds.play('click');

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '재전송 실패');
      }

      setTimerSeconds(600);
      setSuccessMsg(
        lang === 'ko'
          ? '새로운 6자리 보안 코드가 발송되었습니다. 메일함을 확인해 주세요.'
          : 'A new 6-digit code has been sent. Please check your inbox.'
      );
      sounds.play('success');
    } catch (err: any) {
      sounds.play('delete');
      setErrorMsg(err.message || '인증번호 재전송에 실패했습니다.');
    } finally {
      setIsResending(false);
    }
  };

  const text = {
    title: lang === 'ko' ? '보안 인증코드 확인' : lang === 'ja' ? 'セキュリティ認証コードの確認' : 'Verify Security Code',
    desc:
      lang === 'ko'
        ? '계정 보호를 위해 이메일로 전송된 6자리 코드를 입력해 주세요.'
        : lang === 'ja'
        ? 'アカウント保護のため、メールに送信された6桁のコードを入力してください。'
        : 'Please enter the 6-digit security code sent to your email to verify your account.',
    emailSentTo:
      lang === 'ko'
        ? '인증 코드가 다음 주소로 발송되었습니다:'
        : lang === 'ja'
        ? '認証コードが以下のアドレスに送信されました:'
        : 'Verification code sent to:',
    timerLabel: lang === 'ko' ? '유효시간' : lang === 'ja' ? '有効期限' : 'Code expires in',
    submitBtn: lang === 'ko' ? '인증 완료 및 시작하기' : lang === 'ja' ? '認証を完了して始める' : 'Verify & Continue',
    verifying: lang === 'ko' ? '인증 확인 중...' : lang === 'ja' ? '認証確認中...' : 'Verifying...',
    resend: lang === 'ko' ? '인증번호 재전송' : lang === 'ja' ? 'コード再送信' : 'Resend Code',
    backToLogin: lang === 'ko' ? '로그인으로 돌아가기' : lang === 'ja' ? 'ログインに戻る' : 'Back to Login',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090D16] p-6 text-slate-100 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Top bar with language switcher */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/login"
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{text.backToLogin}</span>
          </Link>
          <LanguageSelector />
        </div>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3 shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{text.title}</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">{text.desc}</p>
          {email && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
              <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="font-medium truncate max-w-[240px]">{email}</span>
            </div>
          )}
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input if not in URL */}
          {!emailParam && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">이메일 주소</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-950 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          )}

          {/* 6-Digit PIN Boxes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-300">6자리 코드 입력</span>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{text.timerLabel}:</span>
                <span className={`font-mono font-bold ${timerSeconds < 60 ? 'text-rose-400' : 'text-slate-300'}`}>
                  {formatTimer(timerSeconds)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2" onPaste={handlePaste}>
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-full h-13 text-center text-xl font-bold bg-slate-950 text-white rounded-xl border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
                  aria-label={`Digit ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || digits.join('').length !== 6}
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.01]"
          >
            <span>{loading ? text.verifying : text.submitBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Resend Section */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>코드를 받지 못하셨나요?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
            <span>{text.resend}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#090D16] text-slate-400 text-xs">
          Loading...
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
