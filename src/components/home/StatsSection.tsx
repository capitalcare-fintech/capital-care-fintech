"use client";

import { motion } from "framer-motion";
import { HiOutlineStar, HiOutlineUsers, HiOutlineCurrencyRupee, HiOutlineOfficeBuilding, HiOutlineLocationMarker } from "react-icons/hi";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const STATS = [
  { icon: HiOutlineStar,             value: "4.5/5",         label: "Customer Rating",        sub: "Based on 10K+ reviews" },
  { icon: HiOutlineUsers,            value: "10K+",          label: "Happy Customers",        sub: "And growing every day" },
  { icon: HiOutlineCurrencyRupee,    value: "₹5L Cr+",       label: "Loan Disbursed",         sub: "Across all categories" },
  { icon: HiOutlineOfficeBuilding,   value: "70+",           label: "Banks & NBFCs",          sub: "Trusted lending partners" },
  { icon: HiOutlineLocationMarker,   value: "170+",          label: "Branches",               sub: "Pan India presence" },
];

export function StatsSection() {
  return (
    <section className="w-full px-4 pt-14 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="overflow-hidden rounded-3xl border border-sky-100 bg-white px-6 py-8 shadow-sm md:px-10"
      >
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-sky-600">
          Trusted by our customers
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map(({ icon: Icon, value, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: easeOut }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-sm font-semibold text-slate-700">{label}</p>
              <p className="text-xs text-slate-400">{sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
