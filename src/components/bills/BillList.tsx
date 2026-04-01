"use client";

import { HiOutlineDocumentText } from "react-icons/hi";

export type Bill = {
  id: number;
  partner_name: string;
  document_name: string;
  amount: number;
  status: "Paid" | "Pending" | "Rejected";
  bill_date: string;
};

const STATUS_STYLES: Record<string, string> = {
  Paid:     "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  Pending:  "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

type Props = { bills: Bill[]; loading: boolean };

export function BillList({ bills, loading }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (bills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
        <HiOutlineDocumentText className="h-14 w-14 text-slate-300 dark:text-slate-600" />
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No bills found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left dark:border-slate-700 dark:bg-slate-800">
              {["#", "Partner", "Document", "Amount", "Date", "Status"].map((h) => (
                <th key={h} className="px-5 py-3 font-semibold text-slate-600 dark:text-slate-300">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, i) => (
              <tr
                key={bill.id}
                className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                <td className="px-5 py-3 text-slate-400 dark:text-slate-500">{i + 1}</td>
                <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">{bill.partner_name}</td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{bill.document_name}</td>
                <td className="px-5 py-3 text-slate-700 dark:text-slate-300">
                  ₹{Number(bill.amount).toLocaleString("en-IN")}
                </td>
                <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                  {new Date(bill.bill_date).toLocaleDateString("en-IN")}
                </td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[bill.status] ?? ""}`}>
                    {bill.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
