/** Client-side admin credentials (local only — not server security). */

const AUTH_KEY = "ward-ncd-admin-auth-v1";
const SESSION_KEY = "ward-ncd-admin-session-v1";

const DEFAULT_USER = "admin";
const DEFAULT_PASS = "admin123";

type AuthRecord = {
  username: string;
  /** Plain storage for local demo admin; changeable in UI */
  password: string;
};

function canStore(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function loadAuth(): AuthRecord {
  if (!canStore()) return { username: DEFAULT_USER, password: DEFAULT_PASS };
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return { username: DEFAULT_USER, password: DEFAULT_PASS };
    const parsed = JSON.parse(raw) as AuthRecord;
    if (!parsed?.username || !parsed?.password) {
      return { username: DEFAULT_USER, password: DEFAULT_PASS };
    }
    return parsed;
  } catch {
    return { username: DEFAULT_USER, password: DEFAULT_PASS };
  }
}

function saveAuth(rec: AuthRecord): void {
  if (!canStore()) return;
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(rec));
  } catch {
    /* ignore */
  }
}

export function getAdminUsername(): string {
  return loadAuth().username;
}

export function tryAdminLogin(username: string, password: string): boolean {
  const auth = loadAuth();
  const ok =
    username.trim() === auth.username && password === auth.password;
  if (ok && canStore()) {
    try {
      localStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  }
  return ok;
}

export function isAdminLoggedIn(): boolean {
  if (!canStore()) return false;
  try {
    return localStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function adminLogout(): void {
  if (!canStore()) return;
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function changeAdminPassword(
  currentPassword: string,
  newPassword: string,
): { ok: boolean; error?: string } {
  const auth = loadAuth();
  if (currentPassword !== auth.password) {
    return { ok: false, error: "current" };
  }
  const next = newPassword.trim();
  if (next.length < 4) {
    return { ok: false, error: "short" };
  }
  saveAuth({ ...auth, password: next });
  return { ok: true };
}

export function resetAdminToDefault(): void {
  saveAuth({ username: DEFAULT_USER, password: DEFAULT_PASS });
  adminLogout();
}
