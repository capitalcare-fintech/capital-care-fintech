"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { setSignedIn } from "@/lib/authClient";
import { useRedirectIfAuthed } from "@/lib/useRedirectIfAuthed";

type Field = "fullName" | "phone" | "otp" | "password";

const MOCK_OTP = "123456";

const inputCls = "rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";

export default function SignUpPage() {
  const router = useRouter();
  const ready  = useRedirectIfAuthed("/");

  const [form, setForm]           = useState({ fullName: "", phone: "", otp: "", password: "" });
  const [errors, setErrors]       = useState<Partial<Record<Field, string>>>({});
  const [otpSent, setOtpSent]     = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading]     = useState(false);
  const [showPwd, setShowPwd]     = useState(false);
  const [terms, setTerms]         = useState(false);

  function set(field: Field, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    // numeric only, max 10 digits
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((f) => ({ ...f, phone: val }));
    setErrors((e) => ({ ...e, phone: "" }));
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

  function sendOtp() {
    if (!/^\d{10}$/.test(form.phone)) {
      setErrors((e) => ({ ...e, phone: "Enter a valid 10-digit phone number" }));
      return;
    }
    setOtpSent(true);
    setOtpVerified(false);
    alert(`OTP sent (mock): ${MOCK_OTP}`);
  }

  function verifyOtp() {
    if (form.otp === MOCK_OTP) {
      setOtpVerified(true);
      setErrors((e) => ({ ...e, otp: "" }));
    } else {
      setErrors((e) => ({ ...e, otp: "Invalid OTP" }));
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
        body: JSON.stringify({ fullName: form.fullName, phone: form.phone, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.error || "Something went wrong"); return; }
      // auto sign-in after registration then redirect to home
      setSignedIn(true, { id: data.id ?? 0, name: form.fullName, phone: form.phone });
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
          {/* Full Name */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="Name"
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
                placeholder="Phone No."
                maxLength={10}
                className={inputCls + " flex-1"}
              />
              <button
                type="button"
                onClick={sendOtp}
                className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-100"
              >
                {otpSent ? "Resend" : "Send OTP"}
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
                  disabled={otpVerified}
                  className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-100 disabled:opacity-50"
                >
                  {otpVerified ? "Verified ✓" : "Verify"}
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
