"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
  HiOutlineCurrencyRupee,
  HiOutlinePlus,
  HiOutlineSearch,
} from "react-icons/hi";
import { getSignedIn, getUser } from "@/lib/authClient";
import { useAuth } from "@/lib/useAuth";
import { useRequireAuth } from "@/lib/useRequireAuth";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const STATS = [
  {
    icon: HiOutlineClipboardList,
    label: "Total Cases",
    value: 0,
    color: "bg-sky-50 text-sky-500 dark:bg-sky-950/50 dark:text-sky-400",
  },
  {
    icon: HiOutlineCheckCircle,
    label: "Total Approvals",
    value: 0,
    color: "bg-green-50 text-green-500 dark:bg-green-950/40 dark:text-green-400",
  },
  {
    icon: HiOutlineCurrencyRupee,
    label: "Total Disbursals",
    value: 0,
    color: "bg-indigo-50 text-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-400",
  },
];

const LOAN_TABS = ["Personal Loan", "Business Loan", "Secure Loan"];

export default function PartnerDashboardPage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const ready = useRequireAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!ready) return;
    const user = getUser();
    if (user) setUserName(user.name);
  }, [ready]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: easeOut }}
          className="mb-6 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Welcome{userName ? `, ${userName}` : ""}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            You are signed in to your partner dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mb-6 flex items-center justify-between"
        >
          <h1 className="text-xl font-bold tracking-tight text-slate-900 underline decoration-sky-400 underline-offset-4 dark:text-slate-100 md:text-2xl">
            ENQUIRY LIST
          </h1>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => router.push("/add-lead")}
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
          >
            <HiOutlinePlus className="h-4 w-4" />
            Add Lead
          </motion.button>
        </motion.div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {STATS.map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div
                className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: easeOut }}
          className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
        >
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-1">
              {LOAN_TABS.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={[
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                    activeTab === i
                      ? "bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200",
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-900/40 sm:w-64"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-20 text-center">
            <HiOutlineClipboardList className="mb-3 h-12 w-12 text-slate-200 dark:text-slate-700" />
            <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">No Data Found</p>
            <p className="mt-1 text-xs text-slate-300 dark:text-slate-600">
              Add your first lead to get started
            </p>
          </div>
        </motion.div>

        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/");
            }}
            className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
          >
            Sign out
          </button>
        </div>
      </main>
    </div>
  );
}
