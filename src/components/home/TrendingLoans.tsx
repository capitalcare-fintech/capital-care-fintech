"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineBriefcase, HiOutlineUser, HiOutlineAcademicCap, HiOutlineLockClosed, HiOutlineLightningBolt } from "react-icons/hi";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const LOANS = [
  {
    icon: HiOutlineBriefcase,
    title: "Business Loan",
    desc: "Fuel your business growth with quick approvals and flexible repayment.",
    bg: "bg-sky-50 border-sky-200",
    iconBg: "bg-sky-100 text-sky-600",
    href: "/loans",
  },
  {
    icon: HiOutlineUser,
    title: "Personal Loan",
    desc: "Meet personal expenses instantly with minimal documentation.",
    bg: "bg-indigo-50 border-indigo-200",
    iconBg: "bg-indigo-100 text-indigo-600",
    href: "/loans",
  },
  {
    icon: HiOutlineAcademicCap,
    title: "Professional Loan",
    desc: "Tailored loans for doctors, CAs, and other professionals.",
    bg: "bg-violet-50 border-violet-200",
    iconBg: "bg-violet-100 text-violet-600",
    href: "/loans",
  },
  {
    icon: HiOutlineLockClosed,
    title: "Secure Loan",
    desc: "Collateral-backed loans with lower interest rates.",
    bg: "bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600",
    href: "/loans",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "Instant Loan",
    desc: "Get funds in your account within hours — no paperwork.",
    bg: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100 text-amber-600",
    href: "/loans",
  },
];

export function TrendingLoans() {
  return (
    <section className="w-full px-4 pt-14 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="mb-8 flex items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">Trending now</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Loans &amp; Offers
          </h2>
        </div>
        <Link href="/loans" className="text-sm font-semibold text-sky-600 hover:text-sky-800">
          View all →
        </Link>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {LOANS.map(({ icon: Icon, title, desc, bg, iconBg, href }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`flex flex-col gap-4 rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md ${bg}`}
          >
            <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="mb-1 font-bold text-slate-800">{title}</p>
              <p className="text-xs leading-5 text-slate-500">{desc}</p>
            </div>
            <Link
              href={href}
              className="inline-flex w-fit items-center rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-sky-50 hover:text-sky-700"
            >
              Apply Now →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
