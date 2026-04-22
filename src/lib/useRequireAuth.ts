"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSignedIn } from "@/lib/authClient";

/**
 * Protects a page. Returns `ready=true` only when the user is confirmed signed in.
 * Always starts as false to avoid SSR/client hydration mismatch.
 */
export function useRequireAuth(redirectTo = "/sign-in") {
  const router = useRouter();
  const [ready, setReady] = useState(false);

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
