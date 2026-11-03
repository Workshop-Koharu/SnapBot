import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      {
        error: 'GOOGLE_CLIENT_ID가 아직 설정되지 않았습니다. .env 파일에 구글 클라이언트 ID를 등록해 주세요.',
      },
      { status: 500 }
    );
  }

  // Detect base URL
  const origin = req.headers.get('x-forwarded-host')
    ? `${req.headers.get('x-forwarded-proto') || 'https'}://${req.headers.get('x-forwarded-host')}`
    : req.nextUrl.origin || 'https://snapbot.koharu.live';

  const redirectUri = `${origin}/api/auth/callback/google`;

  const scope = encodeURIComponent('openid email profile');
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

  return NextResponse.redirect(googleAuthUrl);
}
