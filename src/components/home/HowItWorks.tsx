"use client";

import { motion } from "framer-motion";
import { HiOutlineCursorClick, HiOutlineDocumentText, HiOutlineLightningBolt } from "react-icons/hi";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const STEPS = [
  {
    num: "01",
    icon: HiOutlineCursorClick,
    title: "One Click Apply",
    desc: "Fill a simple form in under 2 minutes. No branch visit needed.",
    color: "bg-sky-50 text-sky-500 border-sky-200",
  },
  {
    num: "02",
    icon: HiOutlineDocumentText,
    title: "Online Documentation",
    desc: "Upload your documents digitally. Secure, fast, and paperless.",
    color: "bg-indigo-50 text-indigo-500 border-indigo-200",
  },
  {
    num: "03",
    icon: HiOutlineLightningBolt,
    title: "Quick Approval & Disbursal",
    desc: "Get approved within hours and money in your account same day.",
    color: "bg-emerald-50 text-emerald-500 border-emerald-200",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full px-4 pt-14 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="mb-10 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">Simple process</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Loan Provision Walkthrough
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          How it Works — from application to disbursal in 3 easy steps
        </p>
      </motion.div>

      <div className="relative grid gap-6 md:grid-cols-3">
        {/* Dotted connector — desktop only */}
        <div className="absolute left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] top-10 hidden border-t-2 border-dashed border-sky-200 md:block" />

        {STEPS.map(({ num, icon: Icon, title, desc, color }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12, ease: easeOut }}
            className="relative flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-sm"
          >
            {/* Step number badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-0.5 text-xs font-bold text-slate-400 shadow-sm ring-1 ring-slate-100">
              {num}
            </div>
            <div className={`mt-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <p className="font-bold text-slate-800">{title}</p>
            <p className="text-sm leading-6 text-slate-500">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
