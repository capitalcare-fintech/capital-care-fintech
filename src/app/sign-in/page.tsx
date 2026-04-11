"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { setSignedIn } from "@/lib/authClient";
import { useRedirectIfAuthed } from "@/lib/useRedirectIfAuthed";

const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const ready  = useRedirectIfAuthed("/");

  const [form, setForm]           = useState({ phone: "", password: "" });
  const [errors, setErrors]       = useState<{ phone?: string; password?: string; terms?: string }>({});
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg]   = useState("");
  const [loading, setLoading]     = useState(false);
  const [showPwd, setShowPwd]     = useState(false);
  const [terms, setTerms]         = useState(false);

  useEffect(() => {
    if (params.get("registered") === "1") setSuccessMsg("Account created! Please sign in.");
  }, [params]);

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    // strip non-digits, cap at 10
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((f) => ({ ...f, phone: val }));
    setErrors((err) => ({ ...err, phone: "" }));
  }

  function validate(): boolean {
    const e: { phone?: string; password?: string; terms?: string } = {};
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter a valid 10-digit phone number";
    if (!form.password) e.password = "Password is required";
    if (!terms) e.terms = "You must agree to the Terms & Conditions";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res  = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.error || "Something went wrong"); return; }
      setSignedIn(true, data.user);
      const nextParam = params.get("next");
      const nextPath = nextParam && nextParam.startsWith("/") ? nextParam : "/";
      router.push(nextPath);
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
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="mb-8 text-sm text-slate-500">Sign in to your CapitalCare account</p>

        {successMsg && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMsg}
          </div>
        )}
        {serverError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
          {/* Phone */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-slate-700">Phone Number</label>
            <input
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={handlePhone}
              placeholder="Phone No."
              maxLength={10}
              className={inputCls}
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          {/* Password with toggle */}
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={(e) => { setForm((f) => ({ ...f, password: e.target.value })); setErrors((err) => ({ ...err, password: "" })); }}
                placeholder="Your password"
                className={inputCls + " pr-10"}
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
            {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-sky-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
