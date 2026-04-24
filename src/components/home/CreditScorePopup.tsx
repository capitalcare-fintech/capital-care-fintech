"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CreditScorePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = originalOverflow; };
  }, [open]);

  const close = () => setOpen(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_32px_70px_-28px_rgba(15,23,42,0.5)]">
        <button
          type="button"
          aria-label="Close popup"
          onClick={close}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-semibold text-slate-700 hover:bg-slate-50"
        >
          ×
        </button>

        <div className="relative px-5 pb-5 pt-8 md:px-6">
          <div className="pointer-events-none absolute -left-14 -top-10 h-40 w-40 rounded-full bg-cyan-100/80 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-blue-100/80 blur-2xl" />

          <div className="relative mb-4 grid place-items-center">
            <div className="relative h-36 w-48 rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-cyan-50 p-3">
              <div className="absolute -left-5 top-7 h-8 w-14 rotate-[-18deg] rounded-lg bg-orange-300/90" />
              <div className="absolute -right-4 top-8 h-8 w-14 rotate-12 rounded-lg bg-amber-300/90" />
              <div className="absolute -left-4 bottom-6 h-8 w-12 rotate-12 rounded-lg bg-rose-300/90" />

              <div className="mx-auto h-full w-full rounded-xl border border-blue-200 bg-white p-3">
                <div className="mb-3 h-3 w-16 rounded-full bg-blue-200" />
                <div className="mb-4 h-2 w-full rounded-full bg-slate-200" />
                <div className="mb-2 h-2 w-4/5 rounded-full bg-slate-200" />
                <div className="mb-2 h-2 w-3/5 rounded-full bg-slate-200" />
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <span className="h-8 rounded-lg bg-emerald-100" />
                  <span className="h-8 rounded-lg bg-amber-100" />
                  <span className="h-8 rounded-lg bg-rose-100" />
                </div>
              </div>

              <div className="absolute -right-6 bottom-2 flex h-16 w-16 items-center justify-center rounded-full border-8 border-blue-900 bg-white text-xl">
                🔎
              </div>
            </div>
          </div>

          <div className="relative text-center">
            <h3 className="text-3xl font-bold tracking-tight text-blue-900 md:text-4xl">Check Your Credit Score</h3>
            <div className="mx-auto my-3 h-1 w-24 rounded-full bg-linear-to-r from-blue-600 via-red-500 to-amber-400" />
            <p className="mx-auto max-w-sm text-base leading-7 text-slate-600">
              Access your latest score and credit insights in one secure step.
            </p>

            <div className="mt-5">
              <Link
                href={"/credit-score"}
                onClick={close}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-800 px-5 py-3 text-lg font-bold text-white transition hover:bg-blue-900"
              >
                Check Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
