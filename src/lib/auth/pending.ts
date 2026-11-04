// ==============================================================================
// SnapBot In-Memory Pending Registration & Nickname Cache
// Ensures user-chosen nicknames are never lost even if DB is reconnecting
// (c) 2026 Workshop-Koharu
// ==============================================================================

interface PendingInfo {
  nickname: string;
  provider: 'local' | 'google';
  createdAt: number;
}

// Global in-memory map to preserve nickname between register/oauth and verify-otp
const pendingMap = new Map<string, PendingInfo>();

export function setPendingRegistration(email: string, nickname: string, provider: 'local' | 'google' = 'local') {
  const normalized = email.trim().toLowerCase();
  pendingMap.set(normalized, {
    nickname: nickname.trim(),
    provider,
    createdAt: Date.now(),
  });
}

export function getPendingNickname(email: string): string | null {
  const normalized = email.trim().toLowerCase();
  const info = pendingMap.get(normalized);
  if (!info) return null;
  // Expire after 30 minutes
  if (Date.now() - info.createdAt > 30 * 60 * 1000) {
    pendingMap.delete(normalized);
    return null;
  }
  return info.nickname;
}

export function clearPendingRegistration(email: string) {
  const normalized = email.trim().toLowerCase();
  pendingMap.delete(normalized);
}

