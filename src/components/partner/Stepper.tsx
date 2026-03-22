"use client";

import { HiCheck } from "react-icons/hi";

const STEPS = [
  "Business Type",
  "Mobile Number",
  "Verify Mobile",
  "Partner Details",
  "Email Input",
  "Verify Email",
  "View Agreement",
  "Documents Upload",
];

export function Stepper({ current }: { current: number }) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex min-w-max items-center gap-0">
        {STEPS.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    done
                      ? "bg-sky-500 text-white"
                      : active
                        ? "bg-linear-to-r from-sky-400 to-indigo-500 text-white shadow-md"
                        : "bg-slate-100 text-slate-400",
                  ].join(" ")}
                >
                  {done ? <HiCheck className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={[
                    "max-w-[72px] text-center text-[10px] font-medium leading-tight",
                    active ? "text-sky-600" : done ? "text-slate-500" : "text-slate-400",
                  ].join(" ")}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={[
                    "mb-5 h-0.5 w-8 transition-colors",
                    i < current ? "bg-sky-400" : "bg-slate-200",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
