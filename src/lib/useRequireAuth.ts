"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSignedIn } from "@/lib/authClient";

/**
 * Protects a page. Returns `ready=true` only when the user is confirmed signed in.
 * Redirects to sign-in (with ?next=) otherwise.
 */
export function useRequireAuth(redirectTo = "/sign-in") {
  const router = useRouter();
  // Initialise synchronously — avoids a flash of the spinner on fast loads
  const [ready, setReady] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return getSignedIn();
  });

  useEffect(() => {
    if (getSignedIn()) {
      setReady(true);
    } else {
      const current = window.location.pathname + window.location.search;
      router.replace(`${redirectTo}?next=${encodeURIComponent(current)}`);
    }
  }, [router, redirectTo]);

  return ready;
}
