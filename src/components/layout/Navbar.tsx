"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { NAV_ITEMS, type NavItem } from "@/lib/homeContent";
import capitalCareLogo from "@/assets/logo/capitalCareLogo.jpeg";
import { useAuth } from "@/lib/useAuth";
import { useSidebar } from "@/context/SidebarProvider";
import { useTheme } from "@/context/ThemeProvider";
import { isPartnerAppRoute } from "@/lib/partnerRoutes";

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

export function Navbar() {
  const pathname = usePathname();
  const isPartnerDashboard = isPartnerAppRoute(pathname);
  const items = useMemo(() => NAV_ITEMS, []);
  const { signedIn, signOut } = useAuth();
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { open: sidebarOpen, setOpen: setSidebarOpen, toggle: toggleSidebar } =
    useSidebar();
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpenLabel(null);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenLabel(null);
        setMobileOpen(false);
        if (isPartnerDashboard) setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPartnerDashboard, setSidebarOpen]);

  if (isPartnerDashboard) {
    const darkOn = themeMounted && theme === "dark";
    return (
      <header
        ref={(el) => {
          rootRef.current = el;
        }}
        className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/90"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleSidebar()}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              aria-expanded={sidebarOpen}
              aria-controls="partner-dashboard-sidebar"
            >
              <IconMenu className="h-5 w-5" />
            </button>
            <Link href="/" className="flex items-center p-4">
              <Image
                src={capitalCareLogo}
                alt="Capital Care"
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>
            <span className="hidden rounded-full border border-sky-200 bg-sky-50 px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-sky-700 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-300 md:inline-flex">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineSun className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden />
            <button
              type="button"
              onClick={() => toggleTheme()}
              className={[
                "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
                darkOn ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-600",
              ].join(" ")}
              aria-label={darkOn ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={darkOn}
            >
              <span
                className={[
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ease-out",
                  darkOn ? "translate-x-5" : "translate-x-0.5",
                ].join(" ")}
              />
            </button>
            <HiOutlineMoon className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      ref={(el) => {
        rootRef.current = el;
      }}
      className="sticky top-0 z-40 border-b border-slate-200/80 bg-white transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex w-full items-center justify-between px-4 py-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Image
              src={capitalCareLogo}
              alt="Capital Care"
              priority
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {items.map((item) => {
            if (!isDropdown(item)) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm ${pathname===item.href?"text-blue-700 font-semibold": "text-slate-700 font-medium"} hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white`}
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
                onMouseEnter={() => {
                  if (closeTimerRef.current) {
                    clearTimeout(closeTimerRef.current);
                    closeTimerRef.current = null;
                  }
                  setOpenLabel(item.label);
                }}
                onMouseLeave={() => {
                  closeTimerRef.current = setTimeout(() => setOpenLabel(null), 150);
                }}
              >
                <button
                  type="button"
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2  hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white ${pathname.startsWith(`/${item.label.toLowerCase()}`) ? "text-blue-700 font-semibold" : "text-sm font-medium text-slate-700"}`}
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
                      open ? "rotate-180 text-slate-900 dark:text-white" : "text-slate-500",
                    ].join(" ")}
                  />
                </button>

                {open ? (
                  <div
                    role="menu"
                    className="absolute left-0 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-sky-500/10 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="p-2">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          role="menuitem"
                          onClick={() => setOpenLabel(null)}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
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
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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
          <div className="w-full px-4 py-4 md:px-8 lg:px-12">
            <div className="grid gap-2">
              {items.map((item) => {
                if (!isDropdown(item)) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      target={item.newTab ? "_blank" : undefined}
                      rel={item.newTab ? "noopener noreferrer" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <details
                    key={item.label}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
                      <span>{item.label}</span>
                      <IconChevronDown className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="grid gap-1 px-2 pb-2">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              })}

              <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
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
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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
