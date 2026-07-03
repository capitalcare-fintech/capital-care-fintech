"use client";

import { useState, useEffect } from "react";
import OtpVerificationGate from "@/components/OtpVerificationGate";

const STORAGE_KEY = "otp_verified_mobile";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function OtpGateLayout({ title, children }: Props) {
  const [verifiedMobile, setVerifiedMobile] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  // Always clear on mount — OTP must be verified fresh every time user visits an apply page
  useEffect(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setChecked(true);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  function handleVerified(mobile: string) {
    sessionStorage.setItem(STORAGE_KEY, mobile);
    setVerifiedMobile(mobile);
  }

  // Avoid flash before sessionStorage is read
  if (!checked) return null;

  if (!verifiedMobile) {
    return <OtpVerificationGate title={title} onVerified={handleVerified} />;
  }

  return <>{children}</>;
}