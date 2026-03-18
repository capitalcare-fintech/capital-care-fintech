export const AUTH_FLAG_KEY = "capitalcare:signedIn";
export const AUTH_USER_KEY = "capitalcare:user";

export type AuthUser = { id: number; name: string; phone: string };

export function getSignedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
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
    window.localStorage.setItem(AUTH_FLAG_KEY, next ? "true" : "false");
    if (user) {
      window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else if (!next) {
      window.localStorage.removeItem(AUTH_USER_KEY);
    }
    window.dispatchEvent(new Event("capitalcare:auth"));
  } catch {
    // ignore
  }
}
