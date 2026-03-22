"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineMenu, HiOutlineSun, HiOutlineMoon,
  HiOutlineClipboardList, HiOutlineCheckCircle, HiOutlineCurrencyRupee,
  HiOutlinePlus, HiOutlineSearch,
} from "react-icons/hi";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const STATS = [
  { icon: HiOutlineClipboardList,  label: "Total Cases",     value: 0, color: "bg-sky-50 text-sky-500" },
  { icon: HiOutlineCheckCircle,    label: "Total Approvals", value: 0, color: "bg-green-50 text-green-500" },
  { icon: HiOutlineCurrencyRupee,  label: "Total Disbursals",value: 0, color: "bg-indigo-50 text-indigo-500" },
];

const LOAN_TABS = ["Personal Loan", "Business Loan", "Secure Loan"];

export default function PartnerDashboardPage() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900">

        {/* ── Top Navbar ── */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
            {/* Left */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen((v) => !v)}
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                aria-label="Menu"
              >
                <HiOutlineMenu className="h-5 w-5" />
              </button>
              <div>
                <Link href="/" className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-indigo-500 text-xs font-bold text-white">
                    CC
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-slate-900">CapitalCare</p>
                    <p className="text-[10px] text-slate-400">Bharose ka dusra naam</p>
                  </div>
                </Link>
              </div>
              <span className="hidden rounded-full border border-sky-200 bg-sky-50 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-sky-700 md:inline-flex">
                Dashboard
              </span>
            </div>

            {/* Right — theme toggle */}
            <div className="flex items-center gap-2">
              <HiOutlineSun className="h-4 w-4 text-slate-400" />
              <button
                onClick={() => setDark((v) => !v)}
                className={["relative h-6 w-11 rounded-full transition-colors", dark ? "bg-indigo-500" : "bg-slate-200"].join(" ")}
                aria-label="Toggle theme"
              >
                <span className={["absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", dark ? "translate-x-5" : "translate-x-0.5"].join(" ")} />
              </button>
              <HiOutlineMoon className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">

          {/* Enquiry list header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mb-6 flex items-center justify-between"
          >
            <h1 className="text-xl font-bold tracking-tight text-slate-900 underline decoration-sky-400 underline-offset-4 md:text-2xl">
              ENQUIRY LIST
            </h1>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              <HiOutlinePlus className="h-4 w-4" />
              Add Lead
            </motion.button>
          </motion.div>

          {/* Stats cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {STATS.map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="text-xs font-medium text-slate-500">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: easeOut }}
            className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
          >
            {/* Tabs + Search */}
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-1">
                {LOAN_TABS.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={[
                      "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                      activeTab === i
                        ? "bg-sky-50 text-sky-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
                    ].join(" ")}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative">
                <HiOutlineSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <HiOutlineClipboardList className="mb-3 h-12 w-12 text-slate-200" />
              <p className="text-sm font-semibold text-slate-400">No Data Found</p>
              <p className="mt-1 text-xs text-slate-300">Add your first lead to get started</p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
