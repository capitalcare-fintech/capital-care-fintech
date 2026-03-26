"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSignedIn } from "@/lib/authClient";

/**
 * Redirects to sign-in if the user is not authenticated.
 * Pass `redirectTo` to return the user back after login.
 * Returns `ready` — true once the auth check is complete.
 */
export function useRequireAuth(redirectTo?: string): { ready: boolean } {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getSignedIn()) {
      const returnPath = redirectTo ?? window.location.pathname;
      router.replace(`/sign-in?next=${encodeURIComponent(returnPath)}`);
    } else {
      setReady(true);
    }
  }, [router, redirectTo]);

  return { ready };
}
