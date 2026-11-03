import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 모두 입력해 주세요.' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
    } catch (e) {
      console.warn('[DB Login Find Error]:', e);
    }

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: '등록되지 않은 이메일이거나 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: '등록되지 않은 이메일이거나 비밀번호가 올바르지 않습니다.' }, { status: 401 });
    }

    // Check if email has been verified
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          needsVerification: true,
          email: normalizedEmail,
          message: '이메일 인증이 완료되지 않았습니다. 인증번호를 입력해 주세요.',
        },
        { status: 403 }
      );
    }

    // Generate JWT
    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
    });

    const response = NextResponse.json({
      success: true,
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
    console.error('로그인 에러:', error);
    return NextResponse.json({ error: '로그인 처리 중 문제가 발생했습니다.' }, { status: 500 });
  }
}
