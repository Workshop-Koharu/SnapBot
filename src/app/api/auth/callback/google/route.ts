// ==============================================================================
// SnapBot Google OAuth Callback Handler
// Integrates Resilient User Storage & 6-Digit OTP Verification
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { sendOtpVerificationEmail } from '@/lib/auth/email';
import { setPendingRegistration } from '@/lib/auth/pending';
import { upsertUser, recordVerification } from '@/lib/auth/user-store';

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
    // 1. Exchange authorization code for Google access token
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
    const avatarUrl = profile.picture || null;

    // 3. Persist Google User in resilient store
    const user = await upsertUser({
      email,
      nickname,
      avatarUrl,
      provider: 'google',
      providerId: profile.id,
      emailVerified: false,
    });

    // 4. Generate 6-digit numeric OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await recordVerification(email, otpCode, user.id);

    // Cache pending nickname to guarantee it is preserved during OTP verification
    setPendingRegistration(email, nickname, 'google');

    // Send 6-digit OTP verification email via Resend
    await sendOtpVerificationEmail(email, otpCode, nickname);

    // Redirect to dedicated OTP verification screen with email prefilled
    return NextResponse.redirect(`${origin}/verify-otp?email=${encodeURIComponent(email)}&provider=google`);
  } catch (err) {
    console.error('Google OAuth Callback Exception:', err);
    return NextResponse.redirect(`${origin}/login?error=unknown_oauth_error`);
  }
}
