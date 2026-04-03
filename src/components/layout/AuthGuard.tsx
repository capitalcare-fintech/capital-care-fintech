"use client";

import { useRequireAuth } from "@/lib/useRequireAuth";
import type { ReactNode } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const ready = useRequireAuth();
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
      </div>
    );
  }
  return <>{children}</>;
}
