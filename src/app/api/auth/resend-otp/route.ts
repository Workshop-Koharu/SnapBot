import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendOtpVerificationEmail } from '@/lib/auth/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: '이메일을 입력해 주세요.' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    let nickname = '사용자';
    try {
      const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
      if (user) {
        nickname = user.nickname;
        await prisma.emailVerification.create({
          data: {
            email: normalizedEmail,
            userId: user.id,
            code: newOtp,
            expiresAt,
          },
        });
      }
    } catch (e) {
      console.warn('[Resend DB Error]:', e);
    }

    await sendOtpVerificationEmail(normalizedEmail, newOtp, nickname);

    return NextResponse.json({
      success: true,
      message: '새로운 6자리 인증번호가 전송되었습니다.',
    });
  } catch (error) {
    return NextResponse.json({ error: '인증번호 재전송 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

