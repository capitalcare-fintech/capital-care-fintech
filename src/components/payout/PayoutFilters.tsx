"use client";

import { HiOutlineDownload, HiOutlineRefresh } from "react-icons/hi";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => currentYear - i);

const PRODUCTS = ["Personal Loan", "Business Loan", "Home Loan", "Loan Against Property"];

type Props = {
  product: string;
  month: string;
  year: string;
  loading: boolean;
  onProductChange: (v: string) => void;
  onMonthChange: (v: string) => void;
  onYearChange: (v: string) => void;
  onUpdate: () => void;
  onDownload: () => void;
};

const selectClass =
  "rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";

export function PayoutFilters({
  product, month, year, loading,
  onProductChange, onMonthChange, onYearChange,
  onUpdate, onDownload,
}: Props) {
  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      {/* Product */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Product's Name <span className="text-red-500">*</span>
        </label>
        <select
          value={product}
          onChange={(e) => onProductChange(e.target.value)}
          className={selectClass}
        >
          {PRODUCTS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Month */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Month</label>
        <select
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
          className={selectClass}
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Year */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Year</label>
        <select
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className={selectClass}
        >
          {YEARS.map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>
      </div>

      {/* Update */}
      <button
        type="button"
        onClick={onUpdate}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        <HiOutlineRefresh className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        Update
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Download */}
      <button
        type="button"
        onClick={onDownload}
        aria-label="Download payout data"
        className="flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        <HiOutlineDownload className="h-4 w-4" />
        Download
      </button>
    </div>
  );
}
