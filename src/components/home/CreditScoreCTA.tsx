"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function ScoreMeter() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Arc meter placeholder */}
      <div className="relative flex h-36 w-36 items-center justify-center">
        <svg viewBox="0 0 120 80" className="absolute inset-0 h-full w-full" fill="none">
          {/* Background arc */}
          <path d="M10 70 A50 50 0 0 1 110 70" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
          {/* Score arc — ~72% fill */}
          <path d="M10 70 A50 50 0 0 1 92 24" stroke="url(#scoreGrad)" strokeWidth="10" strokeLinecap="round" />
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-6 text-center">
          <p className="text-2xl font-bold text-slate-800">750</p>
          <p className="text-xs font-semibold text-emerald-500">Excellent</p>
        </div>
      </div>
      <div className="flex gap-3 text-xs font-medium text-slate-400">
        <span>300</span>
        <span className="flex-1 text-center text-slate-300">——</span>
        <span>900</span>
      </div>
    </div>
  );
}

export function CreditScoreCTA() {
  return (
    <section className="w-full px-4 pt-14 pb-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="overflow-hidden rounded-3xl border border-sky-100 bg-linear-to-br from-white via-sky-50 to-indigo-50 shadow-[0_16px_45px_-28px_rgba(14,165,233,0.3)]"
      >
        <div className="grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-12">
          {/* Text */}
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-700">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Free Credit Check
            </div>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 md:text-3xl">
              Check your Credit Score in Minutes and Unlock Better Loan Offers!
            </h2>
            <p className="max-w-lg text-sm leading-7 text-slate-500">
              Your credit score determines your loan eligibility and interest rate. Check it for free — no impact on your score.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-fit">
              <Link
                href="/credit-score"
                className="inline-flex items-center rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Check Credit Score →
              </Link>
            </motion.div>
          </div>

          {/* Score meter */}
          <div className="flex justify-center md:justify-end">
            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
              <ScoreMeter />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
