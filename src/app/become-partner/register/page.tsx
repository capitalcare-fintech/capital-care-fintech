"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineDeviceMobile, HiOutlineArrowLeft } from "react-icons/hi";
import { Stepper } from "@/components/partner/Stepper";
import { getSignedIn } from "@/lib/authClient";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function MobileVerifyForm() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type") ?? "individual";

  // Already logged in → skip straight to dashboard
  useEffect(() => {
    if (getSignedIn()) router.replace("/partner-dashboard");
  }, [router]);

  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  function validate(): boolean {
    if (!/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return false;
    }
    setError("");
    return true;
  }

  function handleContinue() {
    if (!validate()) return;
    router.push(`/become-partner/verify-otp?type=${type}&mobile=${mobile}`);
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 py-10">
      {/* Stepper */}
      <div className="mb-8 w-full max-w-3xl">
        <Stepper current={1} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="w-full max-w-md rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_8px_40px_-12px_rgba(14,165,233,0.2)] md:p-10"
      >
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-indigo-500 text-white shadow-md">
            <HiOutlineDeviceMobile className="h-8 w-8" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome!</h1>
          <p className="mt-2 text-sm text-slate-500">
            Let&apos;s get started by verifying your mobile number
          </p>
          {type && (
            <span className="mt-3 inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 capitalize">
              {type}
            </span>
          )}
        </div>

        {/* Input */}
        <div className="mb-6 grid gap-2">
          <label className="text-sm font-medium text-slate-700">Mobile Number</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
              +91
            </span>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
                setError("");
              }}
              placeholder="Enter your mobile number"
              maxLength={10}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </div>
          {error ? (
            <p className="text-xs text-red-500">{error}</p>
          ) : (
            <p className="text-xs text-slate-400">
              We&apos;ll send you an OTP to verify your number
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="grid gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            className="w-full rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Continue
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.back()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <HiOutlineArrowLeft className="h-4 w-4" />
            Back
          </motion.button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-sky-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <MobileVerifyForm />
    </Suspense>
  );
}
