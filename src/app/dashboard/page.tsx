"use client";

import { useRequireAuth } from "@/lib/useRequireAuth";
import { getUser } from "@/lib/authClient";

export default function DashboardPage() {
  const ready = useRequireAuth();
  const user  = getUser();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Dashboard
        </p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Welcome{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          You are signed in to your CapitalCare account.
        </p>
      </div>
    </div>
  );
}
