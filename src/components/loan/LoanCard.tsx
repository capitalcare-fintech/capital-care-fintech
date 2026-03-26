import Link from "next/link";
import type { ReactNode } from "react";

export type LoanCardProps = {
  title: string;
  href: string;
  illustration: ReactNode;
  className?: string;
};

export function LoanCard({ title, href, illustration, className }: LoanCardProps) {
  return (
    <Link
      href={href}
      className={[
        "group block cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-slate-200/50 outline-none transition-all duration-300 ease-out will-change-transform",
        "hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-300/40",
        "focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-slate-950/50 dark:hover:shadow-sky-900/30",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 transition-colors duration-300 group-hover:bg-slate-100 dark:bg-slate-800/80 dark:group-hover:bg-slate-800">
          {illustration}
        </div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h2>
      </div>
    </Link>
  );
}
