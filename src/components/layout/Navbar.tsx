"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { NAV_ITEMS, type NavItem } from "@/lib/homeContent";
import { useAuth } from "@/lib/useAuth";

function isDropdown(item: NavItem): item is Extract<NavItem, { items: unknown }> {
  return "items" in item;
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3.5 6H16.5M3.5 10H16.5M3.5 14H16.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3.5 9.2L10 3.75L16.5 9.2V16.25C16.5 16.94 15.94 17.5 15.25 17.5H12.25C11.56 17.5 11 16.94 11 16.25V13.25C11 12.56 10.44 12 9.75 12H10.25C9.56 12 9 12.56 9 13.25V16.25C9 16.94 8.44 17.5 7.75 17.5H4.75C4.06 17.5 3.5 16.94 3.5 16.25V9.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const items = useMemo(() => NAV_ITEMS, []);
  const { signedIn, signOut } = useAuth();
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpenLabel(null);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenLabel(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      ref={(el) => {
        rootRef.current = el;
      }}
      className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-semibold tracking-tight text-slate-900 hover:bg-slate-100"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-indigo-500 text-slate-950">
              CC
            </span>
            <span>CapitalCare</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {/* <Link
            href="/"
            aria-label="Home"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
          >
            <IconHome className="h-5 w-5" />
          </Link> */}

          {items.map((item) => {
            if (!isDropdown(item)) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              );
            }

            const open = openLabel === item.label;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenLabel(item.label)}
                onMouseLeave={() => setOpenLabel((prev) => (prev === item.label ? null : prev))}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  aria-haspopup="menu"
                  aria-expanded={open}
                  onFocus={() => setOpenLabel(item.label)}
                  onClick={() =>
                    setOpenLabel((prev) => (prev === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <IconChevronDown
                    className={[
                      "h-4 w-4 transition-transform",
                      open ? "rotate-180 text-slate-900" : "text-slate-500",
                    ].join(" ")}
                  />
                </button>

                {open ? (
                  <div
                    role="menu"
                    className="absolute left-0 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-sky-500/10"
                  >
                    <div className="p-2">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          role="menuitem"
                          onClick={() => setOpenLabel(null)}
                          className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* <Link
            href="/"
            aria-label="Home"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white md:hidden"
          >
            <IconHome className="h-5 w-5" />
          </Link> */}

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {signedIn ? (
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-full bg-linear-to-r from-sky-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:brightness-110"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-full bg-linear-to-r from-sky-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:brightness-110"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white/90 backdrop-blur md:hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-4">
            <div className="grid gap-2">
              {items.map((item) => {
                if (!isDropdown(item)) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <details
                    key={item.label}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                      <span>{item.label}</span>
                      <IconChevronDown className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="grid gap-1 px-2 pb-2">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              })}

              <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-2">
                {signedIn ? (
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="w-full rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:brightness-110"
                  >
                    Sign out
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:brightness-110"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

