import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME } from './lib/auth/session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /studio and /settings subroutes
  if (pathname.startsWith('/studio') || pathname.startsWith('/settings')) {
    const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*', '/settings/:path*'],
};

