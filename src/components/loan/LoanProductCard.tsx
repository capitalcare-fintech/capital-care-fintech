"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface LoanProductCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  available: boolean;
  bg: string;
  iconBg: string;
  delay?: number;
}

export function LoanProductCard({
  icon: Icon, title, description, href, available, bg, iconBg, delay = 0,
}: LoanProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: easeOut }}
      whileHover={available ? { y: -5, scale: 1.02 } : {}}
      className={[
        "relative flex flex-col gap-5 rounded-2xl border p-6 shadow-sm transition-all duration-300",
        available ? "hover:shadow-lg cursor-pointer" : "opacity-60 cursor-not-allowed",
        bg,
      ].join(" ")}
    >
      {!available && (
        <span className="absolute right-3 top-3 rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          Coming Soon
        </span>
      )}

      <div className={["inline-flex h-14 w-14 items-center justify-center rounded-xl", iconBg].join(" ")}>
        <Icon className="h-7 w-7" />
      </div>

      <div className="flex-1">
        <p className="text-base font-bold text-slate-800">{title}</p>
        <p className="mt-1.5 text-xs leading-5 text-slate-500">{description}</p>
      </div>

      {available ? (
        <Link
          href={href}
          className="inline-flex w-fit items-center rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md"
        >
          Apply Now →
        </Link>
      ) : (
        <span className="inline-flex w-fit cursor-not-allowed items-center rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-400">
          Coming Soon
        </span>
      )}
    </motion.div>
  );
}
