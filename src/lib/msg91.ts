// Shared MSG91 OTP widget utilities
// Used by sign-up and OtpVerificationGate — do NOT import from sign-up/page.tsx

export type Msg91VerifyResponse = {
  type?: string;
  message?: string;
  verified?: boolean;
  accessToken?: string;
  token?: string;
};

export type Msg91ErrorResponse = {
  message?: string | string[];
  error?: string;
  errors?: string[];
};

export type Msg91InitConfig = {
  widgetId: string;
  tokenAuth: string;
  exposeMethods: boolean;
  success: () => void;
  failure: () => void;
  captchaRenderId?: string;
  captchaVerified?: (verified: boolean) => void;
};

export type Msg91Window = Window & {
  initSendOTP?: (config: Msg91InitConfig) => void;
  sendOtp?: (
    identifier: string,
    success?: (response: unknown) => void,
    failure?: (error: unknown) => void
  ) => void;
  retryOtp?: (
    channel: string,
    success?: (response: unknown) => void,
    failure?: (error: unknown) => void,
    reqId?: string
  ) => void;
  verifyOtp?: (
    otp: string,
    success?: (response: unknown) => void,
    failure?: (error: unknown) => void,
    reqId?: string | null
  ) => void;
};

const SCRIPT_ID = "msg91-otp-provider-script";
const SCRIPT_URL = "https://verify.msg91.com/otp-provider.js";
const METHOD_WAIT_MS = 7000;

export const MSG91_CAPTCHA_CONTAINER_ID = "msg91-captcha-root";
export const MSG91_WIDGET_ID = process.env.NEXT_PUBLIC_MSG91_WIDGET_ID ?? "";
export const MSG91_WIDGET_TOKEN_AUTH = process.env.NEXT_PUBLIC_MSG91_WIDGET_TOKEN_AUTH ?? "";

let bootstrapPromise: Promise<void> | null = null;

export const OTP_TIMEOUT_MS = 15_000;

/** Wraps a MSG91 callback-based call in a Promise with a timeout. */
export function withTimeout<T>(
  executor: (resolve: (v: T) => void, reject: (e: unknown) => void) => void
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Request timed out. Please check your connection and try again.")),
      OTP_TIMEOUT_MS
    );
    executor(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); }
    );
  });
}

export function getMsg91Window() {
  return window as Msg91Window;
}

export function extractMsg91AccessToken(response: unknown): string {
  if (typeof response === "string") return response;
  if (!response || typeof response !== "object") return "";
  const p = response as Msg91VerifyResponse;
  return p.accessToken ?? p.token ?? (typeof p.message === "string" ? p.message : "");
}

export function extractMsg91ErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message;
  if (!error || typeof error !== "object") return fallback;
  const p = error as Msg91ErrorResponse;
  if (Array.isArray(p.message) && p.message.length > 0) return p.message.join(", ");
  if (typeof p.message === "string" && p.message.trim()) return p.message;
  if (Array.isArray(p.errors) && p.errors.length > 0) return p.errors.join(", ");
  if (typeof p.error === "string" && p.error.trim()) return p.error;
  return fallback;
}

export function normalizeOtpIdentifier(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  if (/^91\d{10}$/.test(clean)) return `+${clean}`;
  if (/^\d{10}$/.test(clean)) return `+91${clean}`;
  return phone;
}

export async function loadMsg91Widget(): Promise<void> {
  const w = getMsg91Window();

  if (w.sendOtp && w.verifyOtp && document.querySelector("msg91-otp-provider")) return;
  if (bootstrapPromise) return bootstrapPromise;

  bootstrapPromise = new Promise<void>((resolve, reject) => {
    if (!MSG91_WIDGET_ID || !MSG91_WIDGET_TOKEN_AUTH) {
      reject(new Error("MSG91 OTP widget is not configured."));
      return;
    }

    const waitForMethods = () => {
      const start = Date.now();
      const poll = () => {
        if (w.sendOtp && w.verifyOtp) { resolve(); return; }
        if (Date.now() - start > METHOD_WAIT_MS) {
          reject(new Error("MSG91 widget initialized but OTP methods are unavailable."));
          return;
        }
        window.setTimeout(poll, 100);
      };
      poll();
    };

    const initWidget = () => {
      if (!w.initSendOTP) { reject(new Error("MSG91 OTP widget failed to initialize.")); return; }
      try {
        w.initSendOTP({
          widgetId: MSG91_WIDGET_ID,
          tokenAuth: MSG91_WIDGET_TOKEN_AUTH,
          exposeMethods: true,
          captchaRenderId: MSG91_CAPTCHA_CONTAINER_ID,
          captchaVerified: () => undefined,
          success: () => undefined,
          failure: () => undefined,
        });
        waitForMethods();
      } catch (err) {
        reject(err instanceof Error ? err : new Error("MSG91 OTP widget failed to initialize."));
      }
    };

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (w.initSendOTP) { initWidget(); }
      else {
        existing.addEventListener("load", initWidget, { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load MSG91 OTP widget.")), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = SCRIPT_URL;
    script.onload = initWidget;
    script.onerror = () => reject(new Error("Failed to load MSG91 OTP widget."));
    document.head.appendChild(script);
  }).catch((err) => { bootstrapPromise = null; throw err; });

  return bootstrapPromise;
}
