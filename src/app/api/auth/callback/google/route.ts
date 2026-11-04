import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendOtpVerificationEmail } from '@/lib/auth/email';
import { setPendingRegistration } from '@/lib/auth/pending';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const origin = req.headers.get('x-forwarded-host')
    ? `${req.headers.get('x-forwarded-proto') || 'https'}://${req.headers.get('x-forwarded-host')}`
    : req.nextUrl.origin || 'https://snapbot.koharu.live';

  if (error || !code) {
    return NextResponse.redirect(`${origin}/login?error=google_auth_failed`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${origin}/api/auth/callback/google`;

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId || '',
        client_secret: clientSecret || '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('Google Token Exchange Error:', tokenData);
      return NextResponse.redirect(`${origin}/login?error=token_exchange_failed`);
    }

    // 2. Fetch Google User Profile
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await userRes.json();
    if (!userRes.ok || !profile.email) {
      return NextResponse.redirect(`${origin}/login?error=profile_fetch_failed`);
    }

    const email = profile.email.toLowerCase().trim();
    const nickname = (profile.name || profile.given_name || email.split('@')[0]).trim();
    const avatarUrl = profile.picture;

    // 3. Find or Create User in database (with emailVerified initially false until OTP confirmed)
    let user = null;

    try {
      user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            nickname,
            avatarUrl,
            provider: 'google',
            providerId: profile.id,
            emailVerified: false,
          },
        });
      } else {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            avatarUrl: avatarUrl || user.avatarUrl,
            providerId: profile.id,
          },
        });
      }
    } catch (dbErr) {
      console.warn('[Google OAuth DB Warning]:', dbErr);
    }

    // 4. Generate 6-digit numeric OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    try {
      await prisma.emailVerification.create({
        data: {
          email,
          userId: user?.id,
          code: otpCode,
          expiresAt,
        },
      });
    } catch (e) {
      console.error('[Google OAuth EmailVerification DB Error]:', e);
    }

    // Cache pending nickname to guarantee it is preserved during OTP verification
    setPendingRegistration(email, nickname, 'google');

    // Send 6-digit OTP verification email via Resend
    await sendOtpVerificationEmail(email, otpCode, nickname);

    // Redirect to OTP verification screen with email prefilled
    return NextResponse.redirect(`${origin}/verify-otp?email=${encodeURIComponent(email)}&provider=google`);
  } catch (err) {
    console.error('Google OAuth Callback Exception:', err);
    return NextResponse.redirect(`${origin}/login?error=unknown_oauth_error`);
  }
}
