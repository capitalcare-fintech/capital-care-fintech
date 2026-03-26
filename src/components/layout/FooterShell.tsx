"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { isPartnerAppRoute } from "@/lib/partnerRoutes";

export function FooterShell() {
  const pathname = usePathname();
  if (isPartnerAppRoute(pathname)) {
    return null;
  }
  return <Footer />;
}
