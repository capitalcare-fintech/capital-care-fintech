"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

type LoanDetail = {
  title: string;
  description: string;
  features: string[];
  href: string;
  reverse?: boolean;
  accent: string;
  bg: string;
};

const LOANS: LoanDetail[] = [
  {
    title: "Business Loan",
    description:
      "Whether you're scaling operations, buying equipment, or managing cash flow — our business loans are designed to move as fast as your ambitions. Get up to ₹50 Lakhs with minimal documentation.",
    features: ["Up to ₹50 Lakhs", "Approval in 24 hrs", "Flexible tenure", "No collateral required"],
    href: "/loans",
    accent: "bg-sky-400",
    bg: "bg-sky-50",
    reverse: false,
  },
  {
    title: "Personal Loan",
    description:
      "From medical emergencies to dream vacations — a personal loan puts money in your hands when you need it most. No end-use restrictions, instant disbursal.",
    features: ["Up to ₹25 Lakhs", "Disbursal in 2 hrs", "Zero prepayment charges", "100% online process"],
    href: "/loans",
    accent: "bg-indigo-400",
    bg: "bg-indigo-50",
    reverse: true,
  },
  {
    title: "Home Loan",
    description:
      "Turn your dream home into reality with our competitive home loan rates. We partner with 70+ banks and NBFCs to get you the best deal possible.",
    features: ["Up to ₹5 Crores", "Lowest interest rates", "Long tenure options", "Balance transfer available"],
    href: "/loans",
    accent: "bg-emerald-400",
    bg: "bg-emerald-50",
    reverse: false,
  },
];

function IllustrationPlaceholder({ bg, accent }: { bg: string; accent: string }) {
  return (
    <div className={`flex h-56 w-full items-center justify-center rounded-2xl ${bg} md:h-72`}>
      <div className="flex flex-col items-center gap-3 opacity-40">
        <div className={`h-16 w-16 rounded-full ${accent}`} />
        <div className={`h-3 w-32 rounded-full ${accent}`} />
        <div className={`h-3 w-24 rounded-full ${accent}`} />
      </div>
    </div>
  );
}

export function LoanDetailSection() {
  return (
    <section className="w-full px-4 pt-14 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="mb-10 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">Explore products</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Find the right loan for you
        </h2>
      </motion.div>

      <div className="flex flex-col gap-10">
        {LOANS.map(({ title, description, features, href, reverse, accent, bg }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
            className={`grid items-center gap-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm md:grid-cols-2 md:p-10 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            {/* Text */}
            <div className="flex flex-col gap-5">
              <div>
                <div className={`mb-2 h-1 w-10 rounded-full ${accent}`} />
                <h3 className="text-xl font-bold text-slate-900 md:text-2xl">{title}</h3>
              </div>
              <p className="text-sm leading-7 text-slate-500">{description}</p>
              <ul className="grid grid-cols-2 gap-2">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className="inline-flex w-fit items-center rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Apply Now →
              </Link>
            </div>

            {/* Illustration */}
            <IllustrationPlaceholder bg={bg} accent={accent} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
