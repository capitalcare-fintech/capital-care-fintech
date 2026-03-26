"use client";

import { motion } from "framer-motion";
import {
  HiOutlineBriefcase,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import { LoanProductCard } from "@/components/loan/LoanProductCard";
import { useRequireAuth } from "@/lib/useRequireAuth";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const LOAN_OPTIONS = [
  {
    icon: HiOutlineLockClosed,
    title: "Secure Loan",
    description: "Collateral-backed loans with competitive rates and flexible tenure.",
    href: "/add-lead/secure-loan",
    bg: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600",
    available: true,
  },
  {
    icon: HiOutlineBriefcase,
    title: "Business Loan",
    description: "Fast approvals for growing businesses with flexible repayment.",
    href: "/add-lead/business-loan",
    bg: "bg-sky-50 border-sky-200",
    iconBg: "bg-sky-100 text-sky-500",
    available: true,
  },
  {
    icon: HiOutlineUser,
    title: "Personal Loan",
    description: "Instant funds for personal needs with minimal documentation.",
    href: "/add-lead/personal-loan",
    bg: "bg-indigo-50 border-indigo-200",
    iconBg: "bg-indigo-100 text-indigo-500",
    available: true,
  },
];

export default function AddLeadSelectLoanPage() {
  const { ready } = useRequireAuth("/add-lead");
  if (!ready) return null;
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 py-16 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="mx-auto w-full max-w-4xl px-4 md:px-8"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">
            Loan Products
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Choose a Loan to Apply
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500">
            Select the loan product that fits your needs and start your application.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LOAN_OPTIONS.map((option, i) => (
            <LoanProductCard key={option.title} {...option} delay={i * 0.1} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
