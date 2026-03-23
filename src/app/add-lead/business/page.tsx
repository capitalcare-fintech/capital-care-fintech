import Link from "next/link";

export default function AddLeadBusinessPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-slate-50 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Add Lead — Business Loan
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Lead form for this loan type will go here.
          </p>
          <Link
            href="/add-lead"
            className="mt-8 inline-block text-sm font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400"
          >
            ← Back to loan types
          </Link>
        </div>
      </div>
    </div>
  );
}
