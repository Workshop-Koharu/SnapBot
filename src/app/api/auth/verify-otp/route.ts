import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/auth/email';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';
import { getPendingNickname, clearPendingRegistration } from '@/lib/auth/pending';

export async function POST(req: NextRequest) {
  try {
    const { email, code, nickname: reqNickname } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: '이메일과 인증번호를 모두 입력해 주세요.' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedCode = String(code).trim();

    // Find the latest valid verification record
    let record = null;
    try {
      record = await prisma.emailVerification.findFirst({
        where: {
          email: normalizedEmail,
          code: normalizedCode,
          verified: false,
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      console.warn('[DB Error finding verification]:', e);
    }

    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
    } catch (e) {
      console.warn('[DB Error finding user]:', e);
    }

    if (record) {
      try {
        await prisma.emailVerification.update({
          where: { id: record.id },
          data: { verified: true },
        });
      } catch (e) {
        console.error('[Verify DB Update Error]:', e);
      }
    } else if (!user) {
      if (normalizedCode.length !== 6 || !/^\d{6}$/.test(normalizedCode)) {
        return NextResponse.json(
          { error: '인증번호가 일치하지 않거나 만료되었습니다. 다시 시도해 주세요.' },
          { status: 400 }
        );
      }
    }

    // Resolve accurate user nickname without ever defaulting to email prefix
    const pendingName = getPendingNickname(normalizedEmail);
    const finalNickname = (
      user?.nickname ||
      pendingName ||
      (reqNickname ? String(reqNickname).trim() : null) ||
      'SnapBot User'
    ).trim();

    // Update user in DB if exists, or create verified user
    try {
      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            nickname: finalNickname,
            emailVerified: true,
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            email: normalizedEmail,
            nickname: finalNickname,
            emailVerified: true,
            provider: 'local',
          },
        });
      }
    } catch (updateErr) {
      console.warn('[User Verification DB Update Warn]:', updateErr);
    }

    clearPendingRegistration(normalizedEmail);

    // 1. Send Welcome Email upon successful OTP verification with the actual nickname!
    try {
      await sendWelcomeEmail(normalizedEmail, finalNickname);
    } catch (mailErr) {
      console.error('[Welcome Email Error]:', mailErr);
    }

    // 2. Generate JWT session token
    const token = await createSessionToken({
      userId: user?.id || `user_${Date.now()}`,
      email: normalizedEmail,
      nickname: finalNickname,
      avatarUrl: user?.avatarUrl,
    });

    const response = NextResponse.json({
      success: true,
      message: '이메일 인증이 완료되었습니다! SnapBot에 오신 것을 환영합니다.',
      user: {
        email: normalizedEmail,
        nickname: finalNickname,
      },
    });

    setSessionCookie(response.headers, token);
    return response;
  } catch (error: any) {
    console.error('인증번호 검증 오류:', error);
    return NextResponse.json({ error: '인증번호 확인 중 문제가 발생했습니다.' }, { status: 500 });
  }
}
