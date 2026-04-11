"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import type { IconType } from "react-icons";
import {
  HiOutlineCash,
  HiOutlineCheckCircle,
  HiOutlineClipboardList,
  HiOutlineCreditCard,
  HiOutlineDocumentText,
  HiOutlineLink,
  HiOutlineLogout,
  HiOutlineSpeakerphone,
  HiOutlineTemplate,
  HiOutlineUser,
  HiOutlineUserAdd,
  HiOutlineUsers,
} from "react-icons/hi";
import { clearPartnerSession } from "@/lib/partnerAuthClient";
import { useSidebar } from "@/context/SidebarProvider";
import { isPartnerAppRoute } from "@/lib/partnerRoutes";

export type SidebarNavItem = {
  label: string;
  href: string;
  icon: IconType;
};

export const PARTNER_SIDEBAR_ITEMS: SidebarNavItem[] = [
  { label: "DSA Dashboard",  href: "/partner-dashboard",              icon: HiOutlineTemplate },
  { label: "My Profile",     href: "/partner-dashboard/my-profile",   icon: HiOutlineUser },
  { label: "Payout Details", href: "/partner-dashboard/payout-details", icon: HiOutlineCash },
  { label: "View Bill",      href: "/partner-dashboard/view-bill",    icon: HiOutlineDocumentText },
  { label: "Digital Card",   href: "/partner-dashboard/digital-card", icon: HiOutlineCreditCard },

  // — Coming soon — uncomment when implemented —
  // { label: "Transaction History",       href: "/partner-dashboard/transaction-history",       icon: HiOutlineClipboardList },
  // { label: "Marketing",                 href: "/partner-dashboard/marketing",                 icon: HiOutlineSpeakerphone },
  // { label: "Disbursement Confirmation", href: "/partner-dashboard/disbursement-confirmation", icon: HiOutlineCheckCircle },
  // { label: "SubPartner Onboarding",     href: "/partner-dashboard/subpartner-onboarding",     icon: HiOutlineUserAdd },
  // { label: "UTM Link",                  href: "/partner-dashboard/utm-link",                  icon: HiOutlineLink },
  // { label: "SubPartner's List",         href: "/partner-dashboard/subpartners-list",          icon: HiOutlineUsers },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/partner-dashboard") {
    return pathname === "/partner-dashboard";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const { open, setOpen } = useSidebar();
  const router = useRouter();

  const onLogout = useCallback(() => {
    // Only clear partner session — do NOT touch userToken / main site auth
    clearPartnerSession();
    setOpen(false);
    router.push("/");
  }, [setOpen, router]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!isPartnerAppRoute(pathname)) {
    return null;
  }

  return (
    <>
      <div
        role="presentation"
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 ease-out",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setOpen(false)}
      />

      <aside
        id="partner-dashboard-sidebar"
        aria-hidden={!open}
        className={[
          "fixed left-0 top-0 z-[60] flex h-full w-[min(100%,18rem)] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-out dark:border-slate-700 dark:bg-slate-900 md:max-w-sm",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-700">
          <p className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Menu
          </p>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-5 w-5">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Partner dashboard">
          <ul className="flex flex-col gap-1">
            {PARTNER_SIDEBAR_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = isActivePath(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                      active
                        ? "bg-sky-100 text-sky-900 shadow-md shadow-sky-500/15 dark:bg-sky-900/50 dark:text-sky-100"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t border-slate-200 pt-3 dark:border-slate-700">
              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <HiOutlineLogout className="h-5 w-5 shrink-0" aria-hidden />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
