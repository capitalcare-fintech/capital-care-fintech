// Partner dashboard auth — completely independent from main site auth
export const PARTNER_SESSION_KEY = "partnerToken";       // localStorage: JSON session
export const PARTNER_COOKIE      = "capitalcare_partner"; // JS-readable cookie

export type PartnerSession = { name: string; partnerId: string };

// ─── cookie helpers ──────────────────────────────────────────────────────────

function setCookie(value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${PARTNER_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${7 * 24 * 3600}; SameSite=Lax`;
}

function deleteCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${PARTNER_COOKIE}=; path=/; max-age=0`;
}

function getCookie(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${PARTNER_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

// ─── public API ──────────────────────────────────────────────────────────────

export function getPartnerSignedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    console.log("partnerToken:", window.localStorage.getItem(PARTNER_SESSION_KEY));
    if (getCookie()) return true;
    return !!window.localStorage.getItem(PARTNER_SESSION_KEY);
  } catch {
    return false;
  }
}

export function getPartnerSession(): PartnerSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PARTNER_SESSION_KEY);
    return raw ? (JSON.parse(raw) as PartnerSession) : null;
  } catch {
    return null;
  }
}

export function savePartnerSession(data: PartnerSession) {
  if (typeof window === "undefined") return;
  try {
    // Write cookie FIRST so any subsequent read sees it immediately
    setCookie(JSON.stringify(data));
    window.localStorage.setItem(PARTNER_SESSION_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("capitalcare:partner-auth"));
  } catch {
    // ignore
  }
}

export function clearPartnerSession() {
  if (typeof window === "undefined") return;
  try {
    // Clear partner session
    deleteCookie();
    window.localStorage.removeItem(PARTNER_SESSION_KEY);
    // Clear profile cache so next user sees a blank card/profile
    window.localStorage.removeItem("profileData");
    window.localStorage.removeItem("profileImage");
    window.dispatchEvent(new Event("capitalcare:partner-auth"));
  } catch {
    // ignore
  }
}
