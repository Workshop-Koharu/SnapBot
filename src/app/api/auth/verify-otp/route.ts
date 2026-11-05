// ==============================================================================
// SnapBot 6-Digit OTP Verification API
// Confirms Code, Sets Password, Issues Session Token & Sends Welcome Email
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/auth/email';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';
import { getPendingNickname, clearPendingRegistration } from '@/lib/auth/pending';
import {
  findUser,
  upsertUser,
  verifyCode,
  getPendingPassword,
  clearPendingPassword,
} from '@/lib/auth/user-store';

export async function POST(req: NextRequest) {
  try {
    const { email, code, nickname: reqNickname } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: '이메일과 인증번호를 모두 입력해 주세요.' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedCode = String(code).trim();

    // Verify 6-digit code against resilient store and Prisma
    const isValid = await verifyCode(normalizedEmail, normalizedCode);
    if (!isValid) {
      return NextResponse.json(
        { error: '인증번호가 일치하지 않거나 만료되었습니다. 다시 확인해 주세요.' },
        { status: 400 }
      );
    }

    let user = await findUser(normalizedEmail);

    // Resolve accurate user nickname without ever defaulting to email prefix
    const pendingName = getPendingNickname(normalizedEmail);
    const finalNickname = (
      user?.nickname ||
      pendingName ||
      (reqNickname ? String(reqNickname).trim() : null) ||
      'SnapBot User'
    ).trim();

    // Check for any pending password to link
    const pendingPwd = getPendingPassword(normalizedEmail);

    // Update user to emailVerified in resilient store and DB
    user = await upsertUser({
      email: normalizedEmail,
      nickname: finalNickname,
      emailVerified: true,
      ...(pendingPwd ? { passwordHash: pendingPwd } : {}),
      provider: user?.provider || 'local',
    });

    clearPendingRegistration(normalizedEmail);
    clearPendingPassword(normalizedEmail);

    // 1. Send Welcome Email upon successful OTP verification with the actual user nickname
    try {
      await sendWelcomeEmail(normalizedEmail, finalNickname);
    } catch (mailErr) {
      console.error('[Welcome Email Error]:', mailErr);
    }

    // 2. Generate Session Token & Set Cookie
    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
    });

    const response = NextResponse.json({
      success: true,
      message: '이메일 인증이 성공적으로 완료되었습니다.',
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl,
      },
    });

    setSessionCookie(response.headers, token);
    return response;
  } catch (error) {
    console.error('인증 처리 에러:', error);
    return NextResponse.json({ error: '인증 처리 중 문제가 발생했습니다.' }, { status: 500 });
  }
}
