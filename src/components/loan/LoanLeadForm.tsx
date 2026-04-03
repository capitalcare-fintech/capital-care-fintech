"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUser, HiOutlinePhone, HiOutlineMail,
  HiOutlineCurrencyRupee, HiOutlineLocationMarker,
  HiOutlineChatAlt2, HiOutlineShieldCheck,
  HiOutlineClipboardList, HiCheckCircle,
} from "react-icons/hi";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export type LoanType =
  | "Personal Loan"
  | "Business Loan"
  | "Home Loan"
  | "Loan Against Property"
  | "Car Loan"
  | "Used Car Loan";

const LOAN_TYPES: { value: LoanType; label: string }[] = [
  { value: "Personal Loan",          label: "Personal Loan" },
  { value: "Business Loan",          label: "Business Loan" },
  { value: "Home Loan",              label: "Home Loan" },
  { value: "Loan Against Property",  label: "Loan Against Property" },
  { value: "Car Loan",               label: "Car Loan" },
  { value: "Used Car Loan",          label: "Used Car Loan" },
];

const THEME: Record<LoanType, { border: string; bg: string; badge: string; btn: string; accent: string }> = {
  "Personal Loan":         { border: "border-indigo-100",  bg: "from-white via-indigo-50 to-violet-50",  badge: "border-indigo-200 bg-indigo-50 text-indigo-700",   btn: "from-indigo-400 to-violet-500",  accent: "border-indigo-100 bg-indigo-50 text-indigo-500" },
  "Business Loan":         { border: "border-sky-100",     bg: "from-white via-sky-50 to-cyan-50",       badge: "border-sky-200 bg-sky-50 text-sky-700",            btn: "from-sky-400 to-indigo-500",     accent: "border-sky-100 bg-sky-50 text-sky-500" },
  "Home Loan":             { border: "border-emerald-100", bg: "from-white via-emerald-50 to-teal-50",   badge: "border-emerald-200 bg-emerald-50 text-emerald-700", btn: "from-emerald-400 to-teal-500",   accent: "border-emerald-100 bg-emerald-50 text-emerald-500" },
  "Loan Against Property": { border: "border-amber-100",   bg: "from-white via-amber-50 to-yellow-50",  badge: "border-amber-200 bg-amber-50 text-amber-700",       btn: "from-amber-400 to-orange-500",   accent: "border-amber-100 bg-amber-50 text-amber-500" },
  "Car Loan":              { border: "border-rose-100",    bg: "from-white via-rose-50 to-pink-50",      badge: "border-rose-200 bg-rose-50 text-rose-700",          btn: "from-rose-400 to-pink-500",      accent: "border-rose-100 bg-rose-50 text-rose-500" },
  "Used Car Loan":         { border: "border-purple-100",  bg: "from-white via-purple-50 to-fuchsia-50", badge: "border-purple-200 bg-purple-50 text-purple-700",    btn: "from-purple-400 to-fuchsia-500", accent: "border-purple-100 bg-purple-50 text-purple-500" },
};

type Form = { fullName: string; mobile: string; email: string; loanType: LoanType; loanAmount: string; city: string; message: string };
type Errors = Partial<Record<keyof Form, string>>;

const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";

function Field({ label, icon: Icon, error, children }: { label: string; icon: React.ElementType; error?: string; children: React.ReactNode }) {
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

export function LoanLeadForm({ defaultLoanType }: { defaultLoanType?: LoanType }) {
  const [form, setForm] = useState<Form>({
    fullName: "", mobile: "", email: "",
    loanType: defaultLoanType ?? "Personal Loan",
    loanAmount: "", city: "", message: "",
  });
  const [errors, setErrors]           = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);

  const theme = THEME[form.loanType];

  function set<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!form.fullName.trim())                            e.fullName   = "Full name is required";
    if (!/^\d{10}$/.test(form.mobile))                   e.mobile     = "Enter a valid 10-digit mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email      = "Enter a valid email address";
    if (!form.loanAmount.trim())                          e.loanAmount = "Loan amount is required";
    if (!form.city.trim())                                e.city       = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/loan-leads", {
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
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className={`mb-8 overflow-hidden rounded-3xl border ${theme.border} bg-linear-to-br ${theme.bg} px-8 py-10 text-center shadow-[0_12px_40px_-20px_rgba(14,165,233,0.2)]`}
      >
        <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${theme.badge}`}>
          {form.loanType}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Apply for a {form.loanType}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
          Fill in your details and we&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: easeOut }}
        className={`rounded-2xl border ${theme.border} bg-white p-8 shadow-sm`}
      >
        {serverError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</div>
        )}

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-10 text-center"
            >
              <HiCheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-lg font-bold text-slate-800">Application Submitted!</p>
              <p className="text-sm text-slate-500">We&apos;ll contact you within 24 hours.</p>
              <div className="mt-2 flex gap-3">
                <button onClick={() => setSubmitted(false)}
                  className={`rounded-xl border px-5 py-2 text-sm font-semibold transition ${theme.accent} hover:opacity-80`}>
                  Apply Again
                </button>
                <Link href="/add-lead"
                  className={`rounded-xl bg-linear-to-r ${theme.btn} px-5 py-2 text-sm font-semibold text-white hover:brightness-110`}>
                  Back to Services
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onSubmit={handleSubmit} className="grid gap-5" noValidate
            >
              {/* Loan Type selector */}
              <div className="grid gap-1.5">
                <label className="text-sm font-medium text-slate-700">Loan Type</label>
                <div className="relative">
                  <HiOutlineClipboardList className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    value={form.loanType}
                    onChange={(e) => set("loanType", e.target.value as LoanType)}
                    className={inputCls + " appearance-none"}
                  >
                  {LOAN_TYPES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" icon={HiOutlineUser} error={errors.fullName}>
                  <input type="text" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="John Doe" className={inputCls} />
                </Field>
                <Field label="Mobile Number" icon={HiOutlinePhone} error={errors.mobile}>
                  <input type="tel" value={form.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9876543210" className={inputCls} />
                </Field>
              </div>

              <Field label="Email Address" icon={HiOutlineMail} error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="john@example.com" className={inputCls} />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Loan Amount (₹)" icon={HiOutlineCurrencyRupee} error={errors.loanAmount}>
                  <input type="text" value={form.loanAmount} onChange={(e) => set("loanAmount", e.target.value.replace(/\D/g, ""))} placeholder="500000" className={inputCls} />
                </Field>
                <Field label="City" icon={HiOutlineLocationMarker} error={errors.city}>
                  <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Mumbai" className={inputCls} />
                </Field>
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-medium text-slate-700">Message <span className="text-slate-400">(optional)</span></label>
                <div className="relative">
                  <HiOutlineChatAlt2 className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <textarea rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Any additional details..." className={inputCls + " resize-none"} />
                </div>
              </div>

              <div className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 ${theme.accent}`}>
                <HiOutlineShieldCheck className="h-4 w-4 shrink-0" />
                <p className="text-xs text-slate-500">Your data is secure. We respond within <span className="font-semibold text-slate-700">24 hours</span>.</p>
              </div>

              <motion.button type="submit" disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`rounded-xl bg-linear-to-r ${theme.btn} py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60`}
              >
                {loading
                  ? <span className="flex items-center justify-center gap-2"><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Submitting…</span>
                  : "Submit Application"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
