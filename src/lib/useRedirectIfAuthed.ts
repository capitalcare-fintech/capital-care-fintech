"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSignedIn } from "@/lib/authClient";

/**
 * Use on sign-in / sign-up pages.
 * If already signed in → redirect away immediately.
 * Returns `ready=true` only when confirmed NOT signed in.
 * Always starts as false to avoid SSR/client hydration mismatch.
 */
export function useRedirectIfAuthed(redirectTo = "/partner-dashboard") {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (getSignedIn()) {
      router.replace(redirectTo);
    } else {
      setReady(true);
    }
  }, [router, redirectTo]);

  return ready;
}
