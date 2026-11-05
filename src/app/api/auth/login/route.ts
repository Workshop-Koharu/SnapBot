// ==============================================================================
// SnapBot User Login API
// Supports Seamless Local and Google OAuth Account Login with Password Linking
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createSessionToken, setSessionCookie } from '@/lib/auth/session';
import { sendOtpVerificationEmail } from '@/lib/auth/email';
import { findUser, upsertUser, recordVerification, setPendingPassword } from '@/lib/auth/user-store';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호를 모두 입력해 주세요.' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await findUser(normalizedEmail);

    if (!user) {
      return NextResponse.json(
        { error: '등록되지 않은 이메일 주소입니다. 먼저 회원가입을 진행해 주세요.' },
        { status: 401 }
      );
    }

    // Case 1: Account registered via Google OAuth without a local password yet
    if (!user.passwordHash) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      if (user.emailVerified) {
        // User already verified their email via Google OTP: link this password and log in immediately
        await upsertUser({
          email: user.email,
          passwordHash,
        });

        const token = await createSessionToken({
          userId: user.id,
          email: user.email,
          nickname: user.nickname,
          avatarUrl: user.avatarUrl,
        });

        const response = NextResponse.json({
          success: true,
          message: 'Google 계정에 비밀번호가 안전하게 연결되어 로그인되었습니다.',
          user: {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            avatarUrl: user.avatarUrl,
          },
        });

        setSessionCookie(response.headers, token);
        return response;
      } else {
        // User needs to confirm OTP first
        setPendingPassword(user.email, passwordHash);
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await recordVerification(user.email, otpCode, user.id);
        await sendOtpVerificationEmail(user.email, otpCode, user.nickname);

        return NextResponse.json(
          {
            needsVerification: true,
            email: user.email,
            message: '보안 인증을 위해 이메일로 6자리 보안 코드가 발송되었습니다.',
          },
          { status: 403 }
        );
      }
    }

    // Case 2: Standard account with existing password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: '비밀번호가 올바르지 않습니다. 다시 확인해 주세요.' }, { status: 401 });
    }

    // Check if email has been verified
    if (!user.emailVerified) {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      await recordVerification(user.email, otpCode, user.id);
      await sendOtpVerificationEmail(user.email, otpCode, user.nickname);

      return NextResponse.json(
        {
          needsVerification: true,
          email: normalizedEmail,
          message: '이메일 인증이 완료되지 않았습니다. 발송된 6자리 코드를 입력해 주세요.',
        },
        { status: 403 }
      );
    }

    // Generate JWT session
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
