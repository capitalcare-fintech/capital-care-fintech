"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
  HiOutlineUser,
  HiOutlineChatAlt2,
  HiCheckCircle,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";

// ── Animation variants ───────────────────────────────────────────────────────
const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: easeOut },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
};

const slideRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
};

// ── Contact info items ───────────────────────────────────────────────────────
const INFO = [
  {
    icon: HiOutlineLocationMarker,
    title: "Our Office",
    lines: ["4th Floor, Tower B, Cyber City", "Gurugram, Haryana – 122002"],
    color: "bg-sky-50 text-sky-500",
  },
  {
    icon: HiOutlinePhone,
    title: "Phone Support",
    lines: ["+91 98765 43210", "Toll-free: 1800-123-4567"],
    color: "bg-indigo-50 text-indigo-500",
    href: "tel:+919876543210",
  },
  {
    icon: HiOutlineMail,
    title: "Email Us",
    lines: ["support@capitalcare.in", "loans@capitalcare.in"],
    color: "bg-cyan-50 text-cyan-600",
    href: "mailto:support@capitalcare.in",
  },
  {
    icon: HiOutlineClock,
    title: "Working Hours",
    lines: ["Mon – Fri: 9:00 AM – 6:00 PM", "Saturday: 10:00 AM – 2:00 PM","Sunday: Closed"],
    color: "bg-violet-50 text-violet-500",
  },
];

// ── Types ────────────────────────────────────────────────────────────────────
type FormState = { fullName: string; email: string; phone: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

// ── Reusable input with icon ─────────────────────────────────────────────────
function InputField({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
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

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition duration-200 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ContactUsPage() {
  const [form, setForm] = useState<FormState>({ fullName: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validate(): boolean {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter a valid 10-digit phone number";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      setForm({ fullName: "", email: "", phone: "", message: "" });
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">

      {/* ── Hero ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-12 overflow-hidden rounded-3xl border border-sky-100 bg-linear-to-br from-white via-sky-50 to-cyan-50 px-8 py-14 text-center shadow-[0_16px_45px_-28px_rgba(14,165,233,0.35)] md:py-20"
      >
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-700"
        >
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          Get in Touch
        </motion.div>
        <motion.h1
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="show"
          className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
        >
          Contact Us
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="show"
          className="mx-auto mt-4 max-w-xl text-base text-slate-500 md:text-lg"
        >
          We&apos;re here to help you with your financial needs. Our team typically responds within 24 hours.
        </motion.p>
      </motion.div>

      {/* ── Contact info cards ── */}
      <ContactInfoCards />

      {/* ── Main two-column layout ── */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

        {/* Left — Contact form */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-sky-100 bg-white p-8 shadow-sm"
        >
          <h2 className="mb-1 text-xl font-bold text-slate-900">Send us a message</h2>
          <p className="mb-6 text-sm text-slate-500">
            Fill in the form below and we&apos;ll get back to you shortly.
          </p>

          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {serverError}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 py-10 text-center"
              >
                <HiCheckCircle className="h-16 w-16 text-green-500" />
                <p className="text-lg font-bold text-slate-800">Message sent!</p>
                <p className="text-sm text-slate-500">
                  Thanks for reaching out. We&apos;ll respond within 24 hours.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSubmitted(false)}
                  className="mt-2 rounded-xl border border-sky-200 bg-sky-50 px-5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-100"
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="grid gap-4"
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField label="Full Name" icon={HiOutlineUser} error={errors.fullName}>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      placeholder="John Doe"
                      className={inputCls}
                    />
                  </InputField>
                  <InputField label="Phone Number" icon={HiOutlinePhone} error={errors.phone}>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
                      className={inputCls}
                    />
                  </InputField>
                </div>

                <InputField label="Email Address" icon={HiOutlineMail} error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="john@example.com"
                    className={inputCls}
                  />
                </InputField>

                <div className="grid gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <div className="relative">
                    <HiOutlineChatAlt2 className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                      className={inputCls + " resize-none"}
                    />
                  </div>
                  {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                </div>

                {/* Trust badge */}
                <div className="flex items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-4 py-2.5">
                  <HiOutlineShieldCheck className="h-4 w-4 shrink-0 text-sky-500" />
                  <p className="text-xs text-slate-500">
                    We usually respond within <span className="font-semibold text-slate-700">24 hours</span>. Your data is safe with us.
                  </p>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right — Contact info + map */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5"
        >
          {/* Info items */}
          {INFO.map(({ icon: Icon, title, lines, color, href }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate="show"
              whileHover={{ y: -2 }}
              className="flex items-start gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition"
            >
              <div className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-800">{title}</p>
                {lines.map((l) =>
                  href ? (
                    <a key={l} href={href} className="block text-xs leading-5 text-sky-600 hover:underline">
                      {l}
                    </a>
                  ) : (
                    <p key={l} className="text-xs leading-5 text-slate-500">{l}</p>
                  )
                )}
              </div>
            </motion.div>
          ))}

          {/* Map */}
          <motion.div
            variants={fadeUp}
            custom={5}
            initial="hidden"
            animate="show"
            className="overflow-hidden rounded-2xl border border-sky-100 shadow-sm"
          >
            <iframe
              title="CapitalCare Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.3!2d77.0856!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM0LjIiTiA3N8KwMDUnMDguMiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="220"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
