"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPartnerSignedIn } from "@/lib/partnerAuthClient";

/** Use on /partner-login and /partner-apply. Redirects to dashboard if already authed. */
export function useRedirectIfPartnerAuthed(redirectTo = "/partner-dashboard") {
  const router = useRouter();
  const [ready, setReady] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !getPartnerSignedIn();
  });

  useEffect(() => {
    if (getPartnerSignedIn()) {
      router.replace(redirectTo);
    } else {
      setReady(true);
    }
  }, [router, redirectTo]);

  return ready;
}
