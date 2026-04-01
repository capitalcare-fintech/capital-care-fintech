"use client";

import { HiOutlineFolder } from "react-icons/hi";

export type PayoutRow = {
  slab: string;
  loanAmount: string;
  payout: string;
  remarks?: string;
};

type Props = {
  rows: PayoutRow[];
  loading: boolean;
  product: string;
  month: string;
  year: string;
};

export function PayoutTable({ rows, loading, product, month, year }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
        <HiOutlineFolder className="h-16 w-16 text-slate-300 dark:text-slate-600" />
        <div>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            No payout data found
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            No records for {product} — {month} {year}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-700 dark:bg-slate-800">
              <th className="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300">#</th>
              <th className="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300">Slab</th>
              <th className="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300">Loan Amount</th>
              <th className="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300">Payout %</th>
              <th className="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{i + 1}</td>
                <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">{row.slab}</td>
                <td className="px-5 py-3 text-slate-700 dark:text-slate-300">{row.loanAmount}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                    {row.payout}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{row.remarks ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
