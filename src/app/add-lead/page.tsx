"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HiOutlineCash, HiOutlineShieldCheck } from "react-icons/hi";
import { useRequireAuth } from "@/lib/useRequireAuth";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const SERVICES = [
  {
    icon: HiOutlineCash,
    title: "Loans",
    description: "Generate leads for different types of loans including Secure, Business, and Personal.",
    href: "/add-lead/loan-form",
    bg: "bg-sky-50 border-sky-200 dark:bg-sky-950/30 dark:border-sky-800",
    iconBg: "bg-sky-100 text-sky-600 dark:bg-sky-900/60 dark:text-sky-400",
    available: true,
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Insurance",
    description: "Generate leads for insurance products including Health, Life, and Motor.",
    href: "/add-lead/insurance-form",
    bg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800",
    iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-400",
    available: true,
  },
];

export default function AddLeadPage() {
  const ready = useRequireAuth();
  const router = useRouter();

  if (!ready) return null;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 py-16 transition-colors duration-300 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="mx-auto w-full max-w-3xl px-4 md:px-8"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Services
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
            Choose a Service to Continue
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500 dark:text-slate-400">
            Select whether you want to generate leads for Loans or Insurance.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, description, href, bg, iconBg, available }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: easeOut }}
              className={[
                "relative flex flex-col gap-5 rounded-2xl border p-7 shadow-sm transition-all duration-300",
                available ? "cursor-pointer hover:shadow-lg hover:-translate-y-1" : "opacity-60 cursor-not-allowed",
                bg,
              ].join(" ")}
            >
              {!available && (
                <span className="absolute right-3 top-3 rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                  Coming Soon
                </span>
              )}

              <div className={["inline-flex h-14 w-14 items-center justify-center rounded-xl", iconBg].join(" ")}>
                <Icon className="h-7 w-7" />
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
              </div>

              {available ? (
                <button
                  type="button"
                  onClick={() => router.push(href)}
                  className="inline-flex w-fit items-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-sky-50 hover:text-sky-700 hover:shadow-md dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Continue →
                </button>
              ) : (
                <span className="inline-flex w-fit cursor-not-allowed items-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                  Coming Soon
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
