"use client";

import { motion } from "framer-motion";
import {
  HiOutlineBriefcase,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import { LoanCard } from "@/components/loan/LoanCard";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const LOAN_OPTIONS = [
  {
    title: "Business Loan",
    href: "/add-lead/business",
    illustration: (
      <HiOutlineBriefcase className="h-20 w-20 text-sky-500 transition-transform duration-300 group-hover:scale-105 dark:text-sky-400" />
    ),
  },
  {
    title: "Personal Loan",
    href: "/add-lead/personal",
    illustration: (
      <HiOutlineUser className="h-20 w-20 text-indigo-500 transition-transform duration-300 group-hover:scale-105 dark:text-indigo-400" />
    ),
  },
  {
    title: "Secure Loan",
    href: "/add-lead/secure",
    illustration: (
      <HiOutlineLockClosed className="h-20 w-20 text-emerald-500 transition-transform duration-300 group-hover:scale-105 dark:text-emerald-400" />
    ),
  },
] as const;

export default function AddLeadSelectLoanPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 py-10 transition-colors duration-300 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="mx-auto w-full max-w-5xl px-4 md:px-8"
      >
        <div className="rounded-3xl border border-slate-200/90 bg-slate-100/90 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:p-10">
          <h1 className="mb-8 text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
            Select Loan Type
          </h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {LOAN_OPTIONS.map((opt, i) => (
              <motion.div
                key={opt.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * i, ease: easeOut }}
              >
                <LoanCard
                  title={opt.title}
                  href={opt.href}
                  illustration={opt.illustration}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
