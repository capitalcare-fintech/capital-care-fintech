"use client";

import { useRequirePartnerAuth } from "@/lib/useRequirePartnerAuth";
import type { ReactNode } from "react";

export function PartnerAuthGuard({ children }: { children: ReactNode }) {
  const ready = useRequirePartnerAuth();
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
      </div>
    );
  }
  return <>{children}</>;
}
