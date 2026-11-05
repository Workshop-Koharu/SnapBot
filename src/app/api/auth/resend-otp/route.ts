// ==============================================================================
// SnapBot Resend OTP API
// Generates fresh 6-digit code and dispatches via Resend
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { sendOtpVerificationEmail } from '@/lib/auth/email';
import { findUser, recordVerification } from '@/lib/auth/user-store';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: '이메일을 입력해 주세요.' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    let nickname = '사용자';
    const user = await findUser(normalizedEmail);
    if (user) {
      nickname = user.nickname;
    }

    await recordVerification(normalizedEmail, newOtp, user?.id);
    await sendOtpVerificationEmail(normalizedEmail, newOtp, nickname);

    return NextResponse.json({
      success: true,
      message: '새로운 6자리 인증번호가 전송되었습니다.',
    });
  } catch (error) {
    console.error('인증번호 재전송 에러:', error);
    return NextResponse.json({ error: '인증번호 재전송 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
