"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUser, HiOutlinePhone, HiOutlineMail,
  HiOutlineLocationMarker, HiOutlineBriefcase,
  HiOutlineAcademicCap, HiOutlineChatAlt2,
  HiOutlineShieldCheck, HiCheckCircle,
} from "react-icons/hi";
import { FaHandshake } from "react-icons/fa";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

type Form = {
  fullName: string; mobile: string; email: string; city: string;
  businessName: string; experience: string; reason: string;
};
type Errors = Partial<Record<keyof Form, string>>;

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";

function Field({ label, icon: Icon, error, optional, children }: {
  label: string; icon: React.ElementType; error?: string; optional?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label} {optional && <span className="text-slate-400">(optional)</span>}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        {children}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function PartnerApplyPage() {
  const [form, setForm] = useState<Form>({
    fullName: "", mobile: "", email: "", city: "",
    businessName: "", experience: "", reason: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [loading, setLoading] = useState(false);

  function set(field: keyof Form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.city.trim()) e.city = "City is required";
    if (form.reason.trim().length < 20) e.reason = "Please write at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/partner-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.error || "Something went wrong"); return; }
      setPartnerId(data.partnerId);
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 md:px-6">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="mb-8 overflow-hidden rounded-3xl border border-sky-100 bg-linear-to-br from-white via-sky-50 to-cyan-50 px-8 py-10 text-center shadow-[0_12px_40px_-20px_rgba(14,165,233,0.3)]"
      >
        <div className="mb-3 flex justify-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-indigo-500 text-white shadow-md">
            <FaHandshake className="h-7 w-7" />
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-700">
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          DSA Partner Program
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Become Our Partner
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
          Join CapitalCare as a DSA partner. Fill in your details and we&apos;ll send your Partner ID and credentials to your email.
        </p>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: easeOut }}
        className="rounded-2xl border border-sky-100 bg-white p-8 shadow-sm"
      >
        {serverError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <AnimatePresence mode="wait">
          {partnerId ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8 text-center"
            >
              <HiCheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-xl font-bold text-slate-800">Application Submitted!</p>
              <p className="text-sm text-slate-500">
                Your Partner ID and login credentials have been sent to <span className="font-semibold text-slate-700">{form.email}</span>
              </p>
              <div className="mt-2 w-full rounded-2xl border border-sky-200 bg-sky-50 p-5 text-left">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-sky-600">Your Partner ID</p>
                <p className="font-mono text-lg font-bold text-slate-900">{partnerId}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Default password: your mobile number. Please change it after first login.
                </p>
              </div>
              <div className="mt-2 flex gap-3">
                <Link
                  href="/partner-login"
                  className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
                >
                  Login to Dashboard →
                </Link>
                <Link href="/" className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Go Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onSubmit={handleSubmit} className="grid gap-5" noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" icon={HiOutlineUser} error={errors.fullName}>
                  <input type="text" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Name" className={inputCls} />
                </Field>
                <Field label="Mobile Number" icon={HiOutlinePhone} error={errors.mobile}>
                  <input type="tel" value={form.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Phone No." className={inputCls} />
                </Field>
              </div>

              <Field label="Email Address" icon={HiOutlineMail} error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="Email" className={inputCls} />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="City" icon={HiOutlineLocationMarker} error={errors.city}>
                  <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Mumbai" className={inputCls} />
                </Field>
                <Field label="Business Name" icon={HiOutlineBriefcase} optional>
                  <input type="text" value={form.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="Your business" className={inputCls} />
                </Field>
              </div>

              <Field label="Experience" icon={HiOutlineAcademicCap} optional>
                <input type="text" value={form.experience} onChange={(e) => set("experience", e.target.value)} placeholder="e.g. 3 years in finance" className={inputCls} />
              </Field>

              <div className="grid gap-1.5">
                <label className="text-sm font-medium text-slate-700">Why do you want to join?</label>
                <div className="relative">
                  <HiOutlineChatAlt2 className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <textarea
                    rows={4}
                    value={form.reason}
                    onChange={(e) => set("reason", e.target.value)}
                    placeholder="Tell us about your motivation and goals..."
                    className={inputCls + " resize-none"}
                  />
                </div>
                {errors.reason && <p className="text-xs text-red-500">{errors.reason}</p>}
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-4 py-2.5">
                <HiOutlineShieldCheck className="h-4 w-4 shrink-0 text-sky-500" />
                <p className="text-xs text-slate-500">
                  Your Partner ID and credentials will be sent to your email after submission.
                </p>
              </div>

              <motion.button
                type="submit" disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Submitting…
                  </span>
                ) : "Submit Application"}
              </motion.button>

              <p className="text-center text-sm text-slate-500">
                Already a partner?{" "}
                <Link href="/partner-login" className="font-semibold text-sky-600 hover:underline">
                  Login here
                </Link>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
