"use client";

import { useState, useEffect } from "react";
import {
  loadMsg91Widget,
  getMsg91Window,
  extractMsg91AccessToken,
  extractMsg91ErrorMessage,
  normalizeOtpIdentifier,
  MSG91_CAPTCHA_CONTAINER_ID,
} from "@/lib/msg91";

type Props = {
  title: string;
  onVerified: (mobile: string) => void;
};

const steps = [
  { n: "01", label: "Verify Mobile", desc: "Enter your 10-digit mobile number and complete the captcha." },
  { n: "02", label: "Enter OTP", desc: "We'll send a one-time password to your number via SMS." },
  { n: "03", label: "Fill Application", desc: "Your verified number is pre-filled. Complete the form and submit." },
];

const OTP_TIMEOUT_MS = 15_000;

/** Wraps a MSG91 callback-based call in a Promise with a timeout. */
function withTimeout<T>(
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

export default function OtpVerificationGate({ title, onVerified }: Props) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    loadMsg91Widget().catch(() => {});
  }, []);

  // Countdown tick
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [resendTimer]);

  async function handleSendOtp() {
    if (!/^\d{10}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setSendLoading(true);
    try {
      await loadMsg91Widget();
      const w = getMsg91Window();

      if (otpSent) {
        // Use retryOtp for resend — sendOtp won't fire callbacks on a second call
        if (!w.retryOtp) throw new Error("OTP widget unavailable.");
        await withTimeout<void>((resolve, reject) =>
          w.retryOtp!(
            "11",
            () => resolve(undefined),
            (err) => reject(new Error(extractMsg91ErrorMessage(err, "Unable to resend OTP.")))
          )
        );
      } else {
        if (!w.sendOtp) throw new Error("OTP widget unavailable.");
        await withTimeout<void>((resolve, reject) =>
          w.sendOtp!(
            normalizeOtpIdentifier(mobile),
            () => resolve(undefined),
            (err) => reject(new Error(extractMsg91ErrorMessage(err, "Unable to send OTP.")))
          )
        );
      }

      setOtpSent(true);
      setOtp("");
      setResendTimer(30);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send OTP.");
    } finally {
      setSendLoading(false);
    }
  }

  async function handleVerifyOtp() {
    if (!otp.trim()) { setError("Please enter the OTP."); return; }
    setError("");
    setVerifyLoading(true);
    try {
      await loadMsg91Widget();
      const w = getMsg91Window();
      if (!w.verifyOtp) throw new Error("OTP widget unavailable.");

      const response = await withTimeout<unknown>((resolve, reject) =>
        w.verifyOtp!(
          otp,
          (res) => resolve(res),
          (err) => reject(new Error(extractMsg91ErrorMessage(err, "Invalid OTP. Please try again.")))
        )
      );

      const accessToken = extractMsg91AccessToken(response);
      if (!accessToken) throw new Error("OTP verified but no token returned. Please try again.");

      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
        signal: AbortSignal.timeout(OTP_TIMEOUT_MS),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (!res.ok || !data.success) throw new Error(data.error || "OTP verification failed.");

      onVerified(mobile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP.");
    } finally {
      setVerifyLoading(false);
    }
  }

  return (
    <main className="bg-slate-50 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{title} — Application</h1>
          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Verify your mobile number to begin your application. This takes less than a minute.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">

          
          {/* left — OTP form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-1 text-base font-bold text-slate-900 md:text-lg">Verify your mobile number</h2>
            <p className="mb-6 text-sm text-slate-500">
              {otpSent
                ? `OTP sent to +91-${mobile}. Enter it below to continue.`
                : "Enter your 10-digit mobile number to receive an OTP."}
            </p>

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Mobile */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm text-slate-500 select-none">
                    +91
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
                      setOtpSent(false);
                      setOtp("");
                      setError("");
                    }}
                    placeholder="10-digit mobile"
                    maxLength={10}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendLoading || verifyLoading || resendTimer > 0}
                    className="rounded-lg bg-linear-to-r from-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60 transition whitespace-nowrap"
                  >
                    {sendLoading
                      ? otpSent ? "Resending..." : "Sending..."
                      : otpSent
                        ? resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"
                        : "Send OTP"}
                  </button>
                </div>
                {/* Captcha renders here */}
                <div id={MSG91_CAPTCHA_CONTAINER_ID} className="min-h-1 mt-3" />
              </div>

              {/* OTP — always visible, disabled until OTP is sent */}
              <div>
                <label className={`mb-1.5 block text-sm font-semibold transition-colors ${otpSent ? "text-slate-700" : "text-slate-400"}`}>
                  One-Time Password
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    disabled={!otpSent}
                    onChange={(e) => { setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
                    placeholder="Enter OTP"
                    maxLength={6}
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm tracking-widest font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={!otpSent || verifyLoading || sendLoading}
                    className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    {verifyLoading ? "Verifying..." : "Verify & Continue"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  {otpSent ? "Didn't receive it? Check spam or click Resend above." : "OTP field will be enabled after you send the OTP."}
                </p>
              </div>
            </div>
          </div>

          {/* right — how it works */}
          <div className="rounded-2xl border border-sky-200/70 bg-white p-6 shadow-[0_16px_45px_-28px_rgba(14,165,233,0.35)] md:p-8">
            <h2 className="mb-1 text-base font-bold text-slate-900 md:text-lg">How it works</h2>
            <p className="mb-6 text-sm text-slate-500">Three quick steps to submit your application.</p>

            <ol className="space-y-5">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                    {s.n}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{s.label}</p>
                    <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-xs text-sky-800 leading-relaxed">
              Your mobile number will be pre-filled and locked in the application form after verification. This ensures the contact details we have on file are accurate.
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}