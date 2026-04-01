"use client";

export function PayoutBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-700 via-blue-600 to-indigo-800 px-6 py-8 text-white shadow-lg dark:from-blue-900 dark:via-blue-800 dark:to-indigo-950 md:px-10 md:py-10">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-indigo-400/10 blur-2xl" />

      <div className="relative flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
        {/* Left: brand */}
        <div className="shrink-0 md:w-36">
          <p className="text-xl font-extrabold tracking-tight text-white drop-shadow">
            Capital Care
          </p>
          <p className="mt-0.5 text-xs text-blue-200">Your Trusted Finance Partner</p>
        </div>

        {/* Divider */}
        <div className="hidden h-16 w-px bg-white/20 md:block" />

        {/* Center: heading */}
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl">
            Exclusive Bumper Payout Offer
          </h1>
          <p className="mt-1 text-sm font-medium text-blue-200">April 2026</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
            <span className="rounded-full bg-green-500 px-3 py-0.5 text-xs font-bold text-white shadow">
              100% Payout
            </span>
            <span className="text-xs text-blue-100">Personal Loan Payout Structure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
