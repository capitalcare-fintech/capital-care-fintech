"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { setSignedIn } from "@/lib/authClient";
import { useRedirectIfAuthed } from "@/lib/useRedirectIfAuthed";

type Field = "fullName" | "phone" | "otp" | "password";

type Msg91VerifyResponse = {
  type?: string;
  message?: string;
  verified?: boolean;
  accessToken?: string;
  token?: string;
};

type Msg91ErrorResponse = {
  message?: string | string[];
  error?: string;
  errors?: string[];
  type?: string;
  code?: number;
};

type Msg91InitConfig = {
  widgetId: string;
  tokenAuth: string;
  exposeMethods: boolean;
  success: () => void;
  failure: () => void;
  captchaRenderId?: string;
  captchaVerified?: (verified: boolean) => void;
};

type Msg91Window = Window & {
  initSendOTP?: (config: Msg91InitConfig) => void;
  sendOtp?: (
    identifier: string,
    success?: (response: unknown) => void,
    failure?: (error: unknown) => void
  ) => void;
  verifyOtp?: (
    otp: string,
    success?: (response: unknown) => void,
    failure?: (error: unknown) => void,
    reqId?: string | null
  ) => void;
};

const MSG91_WIDGET_SCRIPT_ID = "msg91-otp-provider-script";
const MSG91_WIDGET_SCRIPT_URL = "https://verify.msg91.com/otp-provider.js";
const MSG91_CAPTCHA_CONTAINER_ID = "msg91-captcha-root";
const MSG91_WIDGET_ID = process.env.NEXT_PUBLIC_MSG91_WIDGET_ID ?? "";
const MSG91_WIDGET_TOKEN_AUTH = process.env.NEXT_PUBLIC_MSG91_WIDGET_TOKEN_AUTH ?? "";
const MSG91_METHOD_WAIT_MS = 7000;
let msg91WidgetBootstrapPromise: Promise<void> | null = null;

const inputCls = "rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";

function getMsg91Window() {
  return window as Msg91Window;
}

function msg91Log(step: string, details?: unknown) {
  console.log(`[MSG91 signup] ${step}`, details ?? "");
}

function msg91Error(step: string, details?: unknown) {
  console.error(`[MSG91 signup] ${step}`, details ?? "");
}

function extractMsg91AccessToken(response: unknown) {
  if (typeof response === "string") {
    return response;
  }

  if (!response || typeof response !== "object") {
    return "";
  }

  const payload = response as Msg91VerifyResponse;
  return payload.accessToken ?? payload.token ?? (typeof payload.message === "string" ? payload.message : "");
}

function extractMsg91ErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (!error || typeof error !== "object") {
    return fallback;
  }

  const payload = error as Msg91ErrorResponse;

  if (Array.isArray(payload.message) && payload.message.length > 0) {
    return payload.message.join(", ");
  }

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  if (Array.isArray(payload.errors) && payload.errors.length > 0) {
    return payload.errors.join(", ");
  }

  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error;
  }

  return fallback;
}

function normalizeOtpIdentifier(phone: string) {
  const clean = phone.replace(/\D/g, "");
  if (/^91\d{10}$/.test(clean)) return `+${clean}`;
  if (/^\d{10}$/.test(clean)) return `+91${clean}`;
  return phone;
}

async function loadMsg91Widget() {
  const msg91Window = getMsg91Window();

  msg91Log("loadMsg91Widget:start", {
    hasInitSendOTP: typeof msg91Window.initSendOTP === "function",
    hasSendOtp: typeof msg91Window.sendOtp === "function",
    hasVerifyOtp: typeof msg91Window.verifyOtp === "function",
    hasWidgetElement: Boolean(document.querySelector("msg91-otp-provider")),
  });

  if (msg91Window.sendOtp && msg91Window.verifyOtp && document.querySelector("msg91-otp-provider")) {
    msg91Log("loadMsg91Widget:already-ready");
    return;
  }

  if (msg91WidgetBootstrapPromise) {
    return msg91WidgetBootstrapPromise;
  }

  msg91WidgetBootstrapPromise = new Promise<void>((resolve, reject) => {
    if (!MSG91_WIDGET_ID || !MSG91_WIDGET_TOKEN_AUTH) {
      msg91Error("loadMsg91Widget:missing-env", {
        hasWidgetId: Boolean(MSG91_WIDGET_ID),
        hasTokenAuth: Boolean(MSG91_WIDGET_TOKEN_AUTH),
      });
      reject(new Error("MSG91 OTP widget is not configured."));
      return;
    }

    const waitForWidgetMethods = () => {
      const startedAt = Date.now();

      msg91Log("loadMsg91Widget:wait-for-methods");

      const poll = () => {
        if (msg91Window.sendOtp && msg91Window.verifyOtp) {
          msg91Log("loadMsg91Widget:methods-ready");
          resolve();
          return;
        }

        if (Date.now() - startedAt > MSG91_METHOD_WAIT_MS) {
          msg91Error("loadMsg91Widget:methods-timeout", {
            hasSendOtp: typeof msg91Window.sendOtp === "function",
            hasVerifyOtp: typeof msg91Window.verifyOtp === "function",
          });
          reject(new Error("MSG91 widget initialized but OTP methods are unavailable."));
          return;
        }

        window.setTimeout(poll, 100);
      };

      poll();
    };

    const initializeWidget = () => {
      if (!msg91Window.initSendOTP) {
        msg91Error("loadMsg91Widget:init-missing");
        reject(new Error("MSG91 OTP widget failed to initialize."));
        return;
      }

      try {
        msg91Log("loadMsg91Widget:initSendOTP-call", {
          widgetId: MSG91_WIDGET_ID,
          tokenAuthSet: Boolean(MSG91_WIDGET_TOKEN_AUTH),
        });
        msg91Window.initSendOTP({
          widgetId: MSG91_WIDGET_ID,
          tokenAuth: MSG91_WIDGET_TOKEN_AUTH,
          exposeMethods: true,
          captchaRenderId: MSG91_CAPTCHA_CONTAINER_ID,
          captchaVerified: (verified) => {
            msg91Log("captcha:verified-state", { verified });
          },
          success: () => undefined,
          failure: () => undefined,
        });
        waitForWidgetMethods();
      } catch (error) {
        msg91Error("loadMsg91Widget:init-error", error);
        reject(error instanceof Error ? error : new Error("MSG91 OTP widget failed to initialize."));
      }
    };

    const existingScript = document.getElementById(MSG91_WIDGET_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      msg91Log("loadMsg91Widget:script-exists");
      if (msg91Window.initSendOTP) {
        initializeWidget();
      } else {
        existingScript.addEventListener("load", initializeWidget, { once: true });
        existingScript.addEventListener(
          "error",
          () => {
            msg91Error("loadMsg91Widget:existing-script-error");
            reject(new Error("Failed to load MSG91 OTP widget."));
          },
          { once: true }
        );
      }
      return;
    }

    msg91Log("loadMsg91Widget:inject-script", { src: MSG91_WIDGET_SCRIPT_URL });
    const script = document.createElement("script");
    script.id = MSG91_WIDGET_SCRIPT_ID;
    script.async = true;
    script.src = MSG91_WIDGET_SCRIPT_URL;
    script.onload = () => {
      msg91Log("loadMsg91Widget:script-loaded");
      initializeWidget();
    };
    script.onerror = () => {
      msg91Error("loadMsg91Widget:script-error");
      reject(new Error("Failed to load MSG91 OTP widget."));
    };
    document.head.appendChild(script);
  }).finally(() => {
    msg91WidgetBootstrapPromise = null;
  });

  return msg91WidgetBootstrapPromise;
}

export default function SignUpPage() {
  const router = useRouter();
  const ready = useRedirectIfAuthed("/");

  const [form, setForm] = useState({ fullName: "", phone: "", otp: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpAccessToken, setOtpAccessToken] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [terms, setTerms] = useState(false);

  function set(field: Field, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    // numeric only, max 10 digits
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((f) => ({ ...f, phone: val, otp: "" }));
    setErrors((e) => ({ ...e, phone: "" }));
    setOtpSent(false);
    setOtpVerified(false);
    setOtpAccessToken("");
  }

  function validate(): boolean {
    const e: Partial<Record<Field | "terms", string>> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter a valid 10-digit phone number";
    if (!otpVerified) e.otp = "Please verify OTP first";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (!terms) e.terms = "You must agree to the Terms & Conditions";
    setErrors(e as Partial<Record<Field, string>>);
    return Object.keys(e).length === 0;
  }

  async function sendOtp() {
    if (!/^\d{10}$/.test(form.phone)) {
      setErrors((e) => ({ ...e, phone: "Enter a valid 10-digit phone number" }));
      return;
    }
    msg91Log("sendOtp:clicked", { phone: form.phone });
    setOtpLoading(true);
    setOtpVerified(false);
    setOtpAccessToken("");
    setServerError("");

    try {
      await loadMsg91Widget();
      const msg91Window = getMsg91Window();

      if (!msg91Window.sendOtp) {
        msg91Error("sendOtp:method-missing");
        throw new Error("MSG91 OTP widget is unavailable.");
      }

      const identifier = normalizeOtpIdentifier(form.phone);
      msg91Log("sendOtp:calling-widget", {
        identifier,
        hasSendOtp: typeof msg91Window.sendOtp === "function",
        hasVerifyOtp: typeof msg91Window.verifyOtp === "function",
      });

      msg91Window.sendOtp(
        identifier,
        () => {
          msg91Log("sendOtp:success-callback");
          setOtpSent(true);
          setOtpLoading(false);
          setErrors((e) => ({ ...e, phone: "", otp: "" }));
        },
        (error) => {
          const message = extractMsg91ErrorMessage(error, "Unable to send OTP right now.");
          msg91Error("sendOtp:error-callback", error);
          setOtpLoading(false);
          setErrors((e) => ({ ...e, phone: message }));
        }
      );
    } catch (error) {
      msg91Error("sendOtp:exception", error);
      setOtpLoading(false);
      setErrors((e) => ({
        ...e,
        phone: error instanceof Error ? error.message : "Unable to send OTP right now.",
      }));
    }
  }

  async function verifyOtp() {
    if (!form.otp.trim()) {
      setErrors((e) => ({ ...e, otp: "Enter the OTP first" }));
      return;
    }

    msg91Log("verifyOtp:clicked", { otpLength: form.otp.length });
    setOtpLoading(true);
    setServerError("");

    try {
      await loadMsg91Widget();
      const msg91Window = getMsg91Window();

      if (!msg91Window.verifyOtp) {
        msg91Error("verifyOtp:method-missing");
        throw new Error("MSG91 OTP widget is unavailable.");
      }

      msg91Log("verifyOtp:calling-widget", {
        hasSendOtp: typeof msg91Window.sendOtp === "function",
        hasVerifyOtp: typeof msg91Window.verifyOtp === "function",
      });

      msg91Window.verifyOtp(
        form.otp,
        (response) => {
          msg91Log("verifyOtp:success-callback", response);
          const accessToken = extractMsg91AccessToken(response);

          if (!accessToken) {
            msg91Error("verifyOtp:no-access-token", response);
            setOtpLoading(false);
            setErrors((e) => ({ ...e, otp: "OTP verified, but no access token was returned." }));
            return;
          }

          setOtpAccessToken(accessToken);
          setOtpVerified(true);
          setOtpLoading(false);
          setErrors((e) => ({ ...e, otp: "" }));
        },
        (error) => {
          const message = error instanceof Error ? error.message : "Invalid OTP";
          msg91Error("verifyOtp:error-callback", error);
          setOtpLoading(false);
          setErrors((e) => ({ ...e, otp: message }));
          setOtpVerified(false);
          setOtpAccessToken("");
        }
      );
    } catch (error) {
      msg91Error("verifyOtp:exception", error);
      setOtpLoading(false);
      setErrors((e) => ({
        ...e,
        otp: error instanceof Error ? error.message : "Invalid OTP",
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res  = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          password: form.password,
          otpAccessToken,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.error || "Something went wrong"); return; }
      // auto sign-in after registration then redirect to home
      setSignedIn(true, { id: data.id ?? 0, name: data.fullName ?? form.fullName, phone: data.phone ?? form.phone });
      setTimeout(() => router.push("/"), 0);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-16">
      <div className="rounded-2xl border border-sky-100 bg-white p-8 shadow-[0_8px_30px_-12px_rgba(14,165,233,0.25)]">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Create account</h1>
        <p className="mb-8 text-sm text-slate-500">Sign up to get started with CapitalCare</p>

        {serverError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
          <div id={MSG91_CAPTCHA_CONTAINER_ID} className="min-h-1" />

          {/* Full Name */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="John Doe"
              className={inputCls + " w-full"}
            />
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
          </div>

          {/* Phone */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-slate-700">Phone Number</label>
            <div className="flex gap-2">
              <input
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={handlePhone}
                placeholder="9876543210"
                maxLength={10}
                className={inputCls + " flex-1"}
              />
              <button
                type="button"
                onClick={sendOtp}
                disabled={otpLoading}
                className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-100"
              >
                {otpLoading ? "Sending..." : otpSent ? "Resend" : "Send OTP"}
              </button>
            </div>
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* OTP */}
          {otpSent && (
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-slate-700">OTP</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.otp}
                  onChange={(e) => set("otp", e.target.value)}
                  placeholder="Enter OTP"
                  maxLength={6}
                  className={inputCls + " flex-1"}
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={otpVerified || otpLoading}
                  className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-100 disabled:opacity-50"
                >
                  {otpLoading ? "Verifying..." : otpVerified ? "Verified ✓" : "Verify"}
                </button>
              </div>
              {errors.otp && <p className="text-xs text-red-500">{errors.otp}</p>}
            </div>
          )}

          {/* Password with toggle */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Min. 6 characters"
                className={inputCls + " w-full pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => { setTerms(e.target.checked); setErrors((err) => ({ ...err, terms: "" })); }}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-sky-500"
              />
              <span className="text-sm text-slate-600">
                I agree to the{" "}
                <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer"
                  className="font-medium text-sky-600 hover:underline">
                  Terms &amp; Conditions
                </a>
              </span>
            </label>
            {(errors as Record<string, string>).terms && (
              <p className="text-xs text-red-500">{(errors as Record<string, string>).terms}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-sky-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
