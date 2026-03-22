"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { setSignedIn } from "@/lib/authClient";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [form, setForm] = useState({ phone: "", password: "" });
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.get("registered") === "1") {
      setSuccessMsg("Account created! Please sign in.");
    }
  }, [params]);

  function set(field: "phone" | "password", value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: { phone?: string; password?: string } = {};
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter a valid 10-digit phone number";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something went wrong");
        return;
      }

      setSignedIn(true, data.user);
      router.push("/dashboard");
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-16">
      <div className="rounded-2xl border border-sky-100 bg-white p-8 shadow-[0_8px_30px_-12px_rgba(14,165,233,0.25)]">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="mb-8 text-sm text-slate-500">Sign in to your CapitalCare account</p>

        {successMsg && (
          <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            {successMsg}
          </div>
        )}

        {serverError && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-slate-700">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="9876543210"
              maxLength={10}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="Your password"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
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
          <Link href="/sign-up" className="font-medium text-sky-600 hover:underline">
            Sign up
          </Link>
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
