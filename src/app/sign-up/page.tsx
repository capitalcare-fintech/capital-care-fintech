"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Field = "fullName" | "phone" | "otp" | "password";

const MOCK_OTP = "123456";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({ fullName: "", phone: "", otp: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field: Field, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: Partial<Record<Field, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter a valid 10-digit phone number";
    if (!otpVerified) e.otp = "Please verify OTP first";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
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
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong");
        return;
      }

      router.push("/sign-in?registered=1");
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-2 text-2xl font-bold text-white">Create account</h1>
        <p className="mb-8 text-sm text-white/60">Sign up to get started with CapitalCare</p>

        {serverError && (
          <div className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
          {/* Full Name */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-white/80">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              placeholder="John Doe"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            />
            {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
          </div>

          {/* Phone + OTP send */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-white/80">Phone Number</label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="9876543210"
                maxLength={10}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              />
              <button
                type="button"
                onClick={sendOtp}
                className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
              >
                {otpSent ? "Resend" : "Send OTP"}
              </button>
            </div>
            {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
          </div>

          {/* OTP verify */}
          {otpSent && (
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-white/80">OTP</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.otp}
                  onChange={(e) => set("otp", e.target.value)}
                  placeholder="Enter OTP"
                  maxLength={6}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={otpVerified}
                  className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-50"
                >
                  {otpVerified ? "Verified ✓" : "Verify"}
                </button>
              </div>
              {errors.otp && <p className="text-xs text-red-400">{errors.otp}</p>}
            </div>
          )}

          {/* Password */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-white/80">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="Min. 6 characters"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            />
            {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-3 text-sm font-semibold text-slate-950 hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-sky-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
