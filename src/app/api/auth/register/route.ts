// ==============================================================================
// SnapBot User Registration API
// Integrates Resilient User Storage & 6-Digit OTP Email Verification
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendOtpVerificationEmail } from '@/lib/auth/email';
import { setPendingRegistration } from '@/lib/auth/pending';
import { findUser, upsertUser, recordVerification } from '@/lib/auth/user-store';

export async function POST(req: NextRequest) {
  try {
    const { email, password, nickname } = await req.json();

    if (!email || !password || !nickname) {
      return NextResponse.json({ error: '모든 필드를 입력해 주세요.' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const cleanNickname = String(nickname).trim();

    // Check if user already exists and is verified
    const existingUser = await findUser(normalizedEmail);
    if (existingUser && existingUser.emailVerified && existingUser.passwordHash) {
      return NextResponse.json(
        { error: '이미 가입되어 인증이 완료된 이메일 주소입니다. 로그인해 주세요.' },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create or update user in resilient store
    const user = await upsertUser({
      email: normalizedEmail,
      nickname: cleanNickname,
      passwordHash,
      emailVerified: false,
      provider: existingUser?.provider || 'local',
    });

    // Generate 6-digit numeric OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await recordVerification(normalizedEmail, otpCode, user.id);

    // Cache pending nickname to guarantee it is preserved during OTP verification
    setPendingRegistration(normalizedEmail, cleanNickname, 'local');

    // Send verification email via Resend
    await sendOtpVerificationEmail(normalizedEmail, otpCode, cleanNickname);

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
      message: '6자리 인증번호가 이메일로 발송되었습니다.',
    });
  } catch (error: any) {
    console.error('회원가입 에러:', error);
    return NextResponse.json({ error: '회원가입 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
