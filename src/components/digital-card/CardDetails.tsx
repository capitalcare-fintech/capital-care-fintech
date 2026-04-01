"use client";

import type { CardData } from "./CardPreview";

const labelClass = "block text-xs font-semibold text-yellow-600 mb-1 dark:text-yellow-400";
const valueClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100";

type Props = { data: CardData };

export function CardDetails({ data }: Props) {
  const fields: { label: string; value: string }[] = [
    { label: "Name",                 value: data.name },
    { label: "Phone",                value: data.phone },
    { label: "Email",                value: data.email },
    { label: "Relationship Manager", value: data.relationshipManager },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-5 text-base font-bold text-slate-900 dark:text-white">Card Details</h2>
      <div className="flex flex-col gap-4">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <label className={labelClass}>{label}</label>
            <div className={valueClass}>{value || <span className="text-slate-400">—</span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
