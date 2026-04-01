"use client";

import { HiOutlinePlus } from "react-icons/hi";

type Props = { onAddBill: () => void };

export function BillHeader({ onAddBill }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
        Bill Management
      </h1>
      <button
        type="button"
        onClick={onAddBill}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        <HiOutlinePlus className="h-4 w-4" />
        Add Bill
      </button>
    </div>
  );
}
