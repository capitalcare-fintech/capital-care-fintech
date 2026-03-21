import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto mt-16 w-auto ">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold text-slate-900">CapitalCare</div>
            <div className="mt-1 text-sm text-slate-500">
              Fintech experience blueprint — content placeholders for now.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/about-us" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              About
            </Link>
            <Link
              href="/contact-us"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Contact
            </Link>
            <Link
              href="/credit-score"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Credit score
            </Link>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6 text-xs font-medium text-slate-500">
          © {new Date().getFullYear()} CapitalCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

