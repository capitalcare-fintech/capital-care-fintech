"use client";

import { useEffect, useState } from "react";
import { getSignedIn, getUser, setSignedIn, type AuthUser } from "@/lib/authClient";

export function useAuth() {
  const [signedIn, setSignedInState] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const sync = () => {
      setSignedInState(getSignedIn());
      setUser(getUser());
    };
    sync();

    window.addEventListener("storage", sync);
    window.addEventListener("capitalcare:auth", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("capitalcare:auth", sync);
    };
  }, []);

  return {
    signedIn,
    user,
    signIn: () => setSignedIn(true),
    signOut: () => setSignedIn(false),
  };
}
