"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { setSignedIn } from "@/lib/authClient";

export default function SignInPage() {
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
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-2 text-2xl font-bold text-white">Welcome back</h1>
        <p className="mb-8 text-sm text-white/60">Sign in to your CapitalCare account</p>

        {successMsg && (
          <div className="mb-4 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {successMsg}
          </div>
        )}

        {serverError && (
          <div className="mb-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-white/80">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="9876543210"
              maxLength={10}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            />
            {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-white/80">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="Your password"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            />
            {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-3 text-sm font-semibold text-slate-950 hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-sky-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
