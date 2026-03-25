"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUser, HiOutlinePhone, HiOutlineMail,
  HiOutlineCurrencyRupee, HiOutlineBriefcase,
  HiOutlineLocationMarker, HiOutlineChatAlt2,
  HiOutlineShieldCheck, HiCheckCircle,
} from "react-icons/hi";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const EMPLOYMENT_TYPES = [
  "Salaried",
  "Self-Employed",
  "Business Owner",
  "Freelancer",
  "Government Employee",
  "Other",
];

type Form = {
  fullName: string; mobile: string; email: string;
  loanAmount: string; employmentType: string;
  monthlyIncome: string; city: string; message: string;
};
type Errors = Partial<Record<keyof Form, string>>;

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";

function Field({ label, icon: Icon, error, children }: {
  label: string; icon: React.ElementType; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        {children}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function SecureLoanPage() {
  const [form, setForm] = useState<Form>({
    fullName: "", mobile: "", email: "",
    loanAmount: "", employmentType: "",
    monthlyIncome: "", city: "", message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);
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
    if (!form.loanAmount.trim()) e.loanAmount = "Loan amount is required";
    if (!form.employmentType) e.employmentType = "Select employment type";
    if (!form.monthlyIncome.trim()) e.monthlyIncome = "Monthly income is required";
    if (!form.city.trim()) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/secure-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.error || "Something went wrong"); return; }
      setSubmitted(true);
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
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-700">
          <HiOutlineShieldCheck className="h-3.5 w-3.5" />
          Secure Loan
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Apply for a Secure Loan
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
          Collateral-backed loans with competitive rates. Fill in your details and we&apos;ll get back to you within 24 hours.
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
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-10 text-center"
            >
              <HiCheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-lg font-bold text-slate-800">Application Submitted!</p>
              <p className="text-sm text-slate-500">
                We&apos;ve received your application and will contact you within 24 hours.
              </p>
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => { setSubmitted(false); setForm({ fullName: "", mobile: "", email: "", loanAmount: "", employmentType: "", monthlyIncome: "", city: "", message: "" }); }}
                  className="rounded-xl border border-sky-200 bg-sky-50 px-5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100"
                >
                  Apply Again
                </button>
                <Link href="/" className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:brightness-110">
                  Go Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onSubmit={handleSubmit} className="grid gap-5" noValidate
            >
              {/* Row 1 */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" icon={HiOutlineUser} error={errors.fullName}>
                  <input type="text" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="John Doe" className={inputCls} />
                </Field>
                <Field label="Mobile Number" icon={HiOutlinePhone} error={errors.mobile}>
                  <input type="tel" value={form.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9876543210" className={inputCls} />
                </Field>
              </div>

              {/* Row 2 */}
              <Field label="Email Address" icon={HiOutlineMail} error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="john@example.com" className={inputCls} />
              </Field>

              {/* Row 3 */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Loan Amount (₹)" icon={HiOutlineCurrencyRupee} error={errors.loanAmount}>
                  <input type="text" value={form.loanAmount} onChange={(e) => set("loanAmount", e.target.value.replace(/\D/g, ""))} placeholder="500000" className={inputCls} />
                </Field>
                <Field label="Monthly Income (₹)" icon={HiOutlineCurrencyRupee} error={errors.monthlyIncome}>
                  <input type="text" value={form.monthlyIncome} onChange={(e) => set("monthlyIncome", e.target.value.replace(/\D/g, ""))} placeholder="50000" className={inputCls} />
                </Field>
              </div>

              {/* Row 4 */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Employment Type</label>
                  <div className="relative">
                    <HiOutlineBriefcase className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={form.employmentType}
                      onChange={(e) => set("employmentType", e.target.value)}
                      className={inputCls + " appearance-none"}
                    >
                      <option value="">Select type</option>
                      {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  {errors.employmentType && <p className="text-xs text-red-500">{errors.employmentType}</p>}
                </div>
                <Field label="City" icon={HiOutlineLocationMarker} error={errors.city}>
                  <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Mumbai" className={inputCls} />
                </Field>
              </div>

              {/* Message */}
              <div className="grid gap-1.5">
                <label className="text-sm font-medium text-slate-700">Message <span className="text-slate-400">(optional)</span></label>
                <div className="relative">
                  <HiOutlineChatAlt2 className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <textarea rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Any additional details..." className={inputCls + " resize-none"} />
                </div>
              </div>

              {/* Trust badge */}
              <div className="flex items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-4 py-2.5">
                <HiOutlineShieldCheck className="h-4 w-4 shrink-0 text-sky-500" />
                <p className="text-xs text-slate-500">
                  Your data is secure. We respond within <span className="font-semibold text-slate-700">24 hours</span>.
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
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
