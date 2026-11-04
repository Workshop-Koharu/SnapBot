import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { sendOtpVerificationEmail } from '@/lib/auth/email';
import { setPendingRegistration } from '@/lib/auth/pending';

export async function POST(req: NextRequest) {
  try {
    const { email, password, nickname } = await req.json();

    if (!email || !password || !nickname) {
      return NextResponse.json({ error: '모든 필드를 입력해 주세요.' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Check if user already exists
    let existingUser = null;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
    } catch (dbErr) {
      console.warn('[DB Warn]: Could not query user directly, continuing fallback', dbErr);
    }

    if (existingUser && existingUser.emailVerified) {
      return NextResponse.json(
        { error: '이미 가입되어 인증이 완료된 이메일 주소입니다. 로그인해 주세요.' },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create or update user
    let user = null;
    try {
      if (existingUser) {
        user = await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            passwordHash,
            nickname: String(nickname).trim(),
            emailVerified: false,
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            email: normalizedEmail,
            passwordHash,
            nickname: String(nickname).trim(),
            emailVerified: false,
            provider: 'local',
          },
        });
      }
    } catch (e) {
      console.error('[User Create/Update Error]:', e);
    }

    // Generate 6-digit numeric OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    try {
      await prisma.emailVerification.create({
        data: {
          email: normalizedEmail,
          userId: user?.id,
          code: otpCode,
          expiresAt,
        },
      });
    } catch (e) {
      console.error('[EmailVerification DB Error]:', e);
    }

    // Cache pending nickname to guarantee it is preserved during OTP verification
    setPendingRegistration(normalizedEmail, String(nickname).trim(), 'local');

    // Send verification email via Resend
    await sendOtpVerificationEmail(normalizedEmail, otpCode, String(nickname).trim());

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

