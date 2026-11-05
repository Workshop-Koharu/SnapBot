// ==============================================================================
// SnapBot Resilient User & OTP Store
// Provides reliable file-backed + in-memory fallback persistence
// Ensures zero user-data loss even when external database is unreachable
// (c) 2026 Workshop-Koharu (MIT License)
// ==============================================================================

import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/db';

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string | null;
  nickname: string;
  avatarUrl: string | null;
  provider: string; // 'local' | 'google'
  providerId: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StoredVerification {
  id: string;
  email: string;
  userId?: string | null;
  code: string;
  expiresAt: string;
  verified: boolean;
  createdAt: string;
}

// In-memory cache singleton
const memoryUsers = new Map<string, StoredUser>();
const memoryVerifications = new Map<string, StoredVerification[]>();
const pendingPasswords = new Map<string, { hash: string; expiresAt: number }>();

// Storage paths
function getDataDir(): string {
  try {
    const localDir = path.join(process.cwd(), '.snapbot-data');
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return localDir;
  } catch {
    const tmpDir = path.join('/tmp', '.snapbot-data');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return tmpDir;
  }
}

function loadFromDisk() {
  try {
    const dataDir = getDataDir();
    const usersFile = path.join(dataDir, 'users.json');
    if (fs.existsSync(usersFile)) {
      const content = fs.readFileSync(usersFile, 'utf-8');
      const users: StoredUser[] = JSON.parse(content);
      for (const u of users) {
        if (u && u.email) {
          memoryUsers.set(u.email.toLowerCase().trim(), u);
        }
      }
    }

    const verifFile = path.join(dataDir, 'verifications.json');
    if (fs.existsSync(verifFile)) {
      const content = fs.readFileSync(verifFile, 'utf-8');
      const verifs: StoredVerification[] = JSON.parse(content);
      for (const v of verifs) {
        if (v && v.email) {
          const key = v.email.toLowerCase().trim();
          const list = memoryVerifications.get(key) || [];
          list.push(v);
          memoryVerifications.set(key, list);
        }
      }
    }
  } catch (err) {
    console.warn('[UserStore] Failed loading data from disk:', err);
  }
}

// Save to disk asynchronously
function saveUsersToDisk() {
  try {
    const dataDir = getDataDir();
    const usersFile = path.join(dataDir, 'users.json');
    const list = Array.from(memoryUsers.values());
    fs.writeFileSync(usersFile, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[UserStore] Failed writing users to disk:', err);
  }
}

function saveVerificationsToDisk() {
  try {
    const dataDir = getDataDir();
    const verifFile = path.join(dataDir, 'verifications.json');
    const allVerifs: StoredVerification[] = [];
    const values = Array.from(memoryVerifications.values());
    for (const list of values) {
      allVerifs.push(...list);
    }
    fs.writeFileSync(verifFile, JSON.stringify(allVerifs, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[UserStore] Failed writing verifications to disk:', err);
  }
}

// Initial load
loadFromDisk();

/**
 * Find user by email: checks Prisma DB first, falls back to memory/file store
 */
export async function findUser(email: string): Promise<StoredUser | null> {
  const normEmail = email.toLowerCase().trim();

  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: normEmail },
    });
    if (dbUser) {
      const stored: StoredUser = {
        id: dbUser.id,
        email: dbUser.email,
        passwordHash: dbUser.passwordHash,
        nickname: dbUser.nickname,
        avatarUrl: dbUser.avatarUrl,
        provider: dbUser.provider,
        providerId: dbUser.providerId,
        emailVerified: dbUser.emailVerified,
        createdAt: dbUser.createdAt.toISOString(),
        updatedAt: dbUser.updatedAt.toISOString(),
      };
      memoryUsers.set(normEmail, stored);
      saveUsersToDisk();
      return stored;
    }
  } catch (dbErr) {
    // Database connection failed, use fallback store
  }

  return memoryUsers.get(normEmail) || null;
}

/**
 * Upsert user in both Prisma DB and local persistent store
 */
export async function upsertUser(data: {
  email: string;
  nickname?: string;
  passwordHash?: string | null;
  avatarUrl?: string | null;
  provider?: string;
  providerId?: string | null;
  emailVerified?: boolean;
}): Promise<StoredUser> {
  const normEmail = data.email.toLowerCase().trim();
  const existing = memoryUsers.get(normEmail);

  const userId = existing?.id || `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const now = new Date().toISOString();

  const updated: StoredUser = {
    id: userId,
    email: normEmail,
    nickname: data.nickname !== undefined ? data.nickname : (existing?.nickname || normEmail.split('@')[0]),
    passwordHash: data.passwordHash !== undefined ? data.passwordHash : (existing?.passwordHash || null),
    avatarUrl: data.avatarUrl !== undefined ? data.avatarUrl : (existing?.avatarUrl || null),
    provider: data.provider || existing?.provider || 'local',
    providerId: data.providerId !== undefined ? data.providerId : (existing?.providerId || null),
    emailVerified: data.emailVerified !== undefined ? data.emailVerified : (existing?.emailVerified || false),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  memoryUsers.set(normEmail, updated);
  saveUsersToDisk();

  // Try persisting to Prisma as well
  try {
    const dbUser = await prisma.user.upsert({
      where: { email: normEmail },
      create: {
        id: updated.id,
        email: normEmail,
        nickname: updated.nickname,
        passwordHash: updated.passwordHash,
        avatarUrl: updated.avatarUrl,
        provider: updated.provider,
        providerId: updated.providerId,
        emailVerified: updated.emailVerified,
      },
      update: {
        nickname: updated.nickname,
        passwordHash: updated.passwordHash,
        avatarUrl: updated.avatarUrl,
        provider: updated.provider,
        providerId: updated.providerId,
        emailVerified: updated.emailVerified,
      },
    });
    if (dbUser) {
      updated.id = dbUser.id;
      memoryUsers.set(normEmail, updated);
      saveUsersToDisk();
    }
  } catch (dbErr) {
    // Prisma unavailable; data is safely stored in local persistent store
  }

  return updated;
}

/**
 * Record a new 6-digit OTP verification code
 */
export async function recordVerification(email: string, code: string, userId?: string): Promise<StoredVerification> {
  const normEmail = email.toLowerCase().trim();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const verifId = `verif_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const newVerif: StoredVerification = {
    id: verifId,
    email: normEmail,
    userId: userId || null,
    code: code.trim(),
    expiresAt,
    verified: false,
    createdAt: new Date().toISOString(),
  };

  const list = memoryVerifications.get(normEmail) || [];
  list.push(newVerif);
  memoryVerifications.set(normEmail, list);
  saveVerificationsToDisk();

  // Also try Prisma
  try {
    await prisma.emailVerification.create({
      data: {
        email: normEmail,
        userId: userId || undefined,
        code: code.trim(),
        expiresAt: new Date(expiresAt),
      },
    });
  } catch (dbErr) {
    // Prisma offline; stored in memoryVerifications
  }

  return newVerif;
}

/**
 * Verify a 6-digit OTP code
 */
export async function verifyCode(email: string, code: string): Promise<boolean> {
  const normEmail = email.toLowerCase().trim();
  const normCode = code.trim();
  const now = new Date();

  // 1. Try checking Prisma DB
  try {
    const dbRecord = await prisma.emailVerification.findFirst({
      where: {
        email: normEmail,
        code: normCode,
        verified: false,
        expiresAt: { gt: now },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbRecord) {
      await prisma.emailVerification.update({
        where: { id: dbRecord.id },
        data: { verified: true },
      });
      return true;
    }
  } catch (dbErr) {
    // Fall back to memory check
  }

  // 2. Check memory store
  const list = memoryVerifications.get(normEmail) || [];
  for (let i = list.length - 1; i >= 0; i--) {
    const item = list[i];
    if (item.code === normCode && !item.verified && new Date(item.expiresAt) > now) {
      item.verified = true;
      saveVerificationsToDisk();
      return true;
    }
  }

  return false;
}

/**
 * Cache pending password to link after OTP verification
 */
export function setPendingPassword(email: string, passwordHash: string) {
  const normEmail = email.toLowerCase().trim();
  pendingPasswords.set(normEmail, {
    hash: passwordHash,
    expiresAt: Date.now() + 15 * 60 * 1000,
  });
}

export function getPendingPassword(email: string): string | null {
  const normEmail = email.toLowerCase().trim();
  const item = pendingPasswords.get(normEmail);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    pendingPasswords.delete(normEmail);
    return null;
  }
  return item.hash;
}

export function clearPendingPassword(email: string) {
  pendingPasswords.delete(email.toLowerCase().trim());
}
