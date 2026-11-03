// ==============================================================================
// SnapBot Edge-Compatible JWT Session Manager (jose)
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET ||
    process.env.JWT_SECRET ||
    'snapbot-default-production-secret-key-32chars-minimum-2026'
);

export const SESSION_COOKIE_NAME = 'snapbot_session';

export interface UserSessionPayload {
  userId: string;
  email: string;
  nickname: string;
  avatarUrl?: string | null;
}

/**
 * Creates a signed JWT session token valid for 7 days.
 */
export async function createSessionToken(payload: UserSessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
}

/**
 * Verifies and decodes the JWT token.
 */
export async function verifySessionToken(token: string): Promise<UserSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      nickname: payload.nickname as string,
      avatarUrl: (payload.avatarUrl as string) || null,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Reads the current session from Next.js server cookie.
 */
export async function getCurrentSession(): Promise<UserSessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

/**
 * Sets the session cookie on a Next.js response.
 */
export function setSessionCookie(responseHeaders: Headers, token: string) {
  const isProd = process.env.NODE_ENV === 'production';
  const cookieValue = `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
    60 * 60 * 24 * 7
  }${isProd ? '; Secure' : ''}`;
  responseHeaders.append('Set-Cookie', cookieValue);
}

/**
 * Clears the session cookie.
 */
export function clearSessionCookie(responseHeaders: Headers) {
  responseHeaders.append(
    'Set-Cookie',
    `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
}
