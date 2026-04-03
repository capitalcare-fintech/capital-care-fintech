"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPartnerSignedIn } from "@/lib/partnerAuthClient";

/** Protects partner-dashboard pages. Redirects to /partner-login if not authed. */
export function useRequirePartnerAuth() {
  const router = useRouter();
  const [ready, setReady] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return getPartnerSignedIn();
  });

  useEffect(() => {
    if (getPartnerSignedIn()) {
      setReady(true);
    } else {
      router.replace("/partner-login");
    }
  }, [router]);

  return ready;
}
