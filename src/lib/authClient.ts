// Main website auth — completely independent from partner auth
export const AUTH_FLAG_KEY = "userToken";        // localStorage: "true" | "false"
export const AUTH_USER_KEY = "userToken_data";   // localStorage: JSON user object
export const AUTH_COOKIE   = "capitalcare_user"; // JS-readable cookie

export type AuthUser = { id: number; name: string; phone: string };

// ─── cookie helpers ──────────────────────────────────────────────────────────

function setCookie(value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE}=${value}; path=/; max-age=${7 * 24 * 3600}; SameSite=Lax`;
}

function deleteCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
}

function getCookie(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${AUTH_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

// ─── public API ──────────────────────────────────────────────────────────────

export function getSignedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (getCookie() === "true") return true;
    return window.localStorage.getItem(AUTH_FLAG_KEY) === "true";
  } catch {
    return false;
  }
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setSignedIn(next: boolean, user?: AuthUser) {
  if (typeof window === "undefined") return;
  try {
    if (next) {
      setCookie("true");
      window.localStorage.setItem(AUTH_FLAG_KEY, "true");
      if (user) window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      // Only remove user keys — never touch partnerToken
      deleteCookie();
      window.localStorage.removeItem(AUTH_FLAG_KEY);
      window.localStorage.removeItem(AUTH_USER_KEY);
    }
    window.dispatchEvent(new Event("capitalcare:auth"));
  } catch {
    // ignore
  }
}
