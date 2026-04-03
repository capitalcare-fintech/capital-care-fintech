"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSignedIn } from "@/lib/authClient";

/**
 * Use on sign-in / sign-up pages.
 * If already signed in → redirect away immediately.
 * Returns `ready=true` only when confirmed NOT signed in.
 */
export function useRedirectIfAuthed(redirectTo = "/partner-dashboard") {
  const router = useRouter();
  // Synchronous init: if already authed, start as not-ready (will redirect)
  const [ready, setReady] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !getSignedIn();
  });

  useEffect(() => {
    if (getSignedIn()) {
      router.replace(redirectTo);
    } else {
      setReady(true);
    }
  }, [router, redirectTo]);

  return ready;
}
