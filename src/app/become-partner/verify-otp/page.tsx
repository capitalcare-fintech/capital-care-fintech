"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineArrowLeft, HiCheck } from "react-icons/hi";
import { Stepper } from "@/components/partner/Stepper";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const MOCK_OTP = "1234";
const RESEND_SECONDS = 30;

function OtpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type") ?? "individual";
  const mobile = params.get("mobile") ?? "";

  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend countdown
  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  function handleDigit(i: number, val: string) {
    const d = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = d;
    setDigits(next);
    setError("");
    if (d && i < 3) inputRefs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (text.length === 4) {
      setDigits(text.split(""));
      inputRefs.current[3]?.focus();
    }
    e.preventDefault();
  }

  async function handleVerify() {
    const otp = digits.join("");
    if (otp.length < 4) { setError("Please enter the 4-digit OTP"); return; }
    if (otp !== MOCK_OTP) { setError("Invalid OTP. Please try again."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setVerified(true);
    setTimeout(() => router.push("/partner-dashboard"), 1500);
  }

  function handleResend() {
    setDigits(["", "", "", ""]);
    setError("");
    setTimer(RESEND_SECONDS);
    inputRefs.current[0]?.focus();
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 py-10">
      {/* Stepper */}
      <div className="mb-8 w-full max-w-3xl">
        <Stepper current={2} />
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
            <HiOutlineShieldCheck className="h-8 w-8" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {verified ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 py-4 text-center"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-500">
                <HiCheck className="h-7 w-7" />
              </div>
              <p className="text-lg font-bold text-slate-900">Mobile Verified!</p>
              <p className="text-sm text-slate-500">Redirecting to your dashboard…</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-slate-900">Verify Mobile Number</h1>
                <p className="mt-2 text-sm text-slate-500">We&apos;ve sent a 4-digit code to</p>
                <p className="mt-1 font-semibold text-slate-800">+91-{mobile}</p>
                <p className="mt-1 text-xs text-slate-400">(Mock OTP: {MOCK_OTP})</p>
              </div>

              {/* 4-box OTP input */}
              <div className="mb-2 flex justify-center gap-3" onPaste={handlePaste}>
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleDigit(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={[
                      "h-14 w-14 rounded-xl border-2 text-center text-xl font-bold text-slate-900 outline-none transition",
                      error ? "border-red-400 bg-red-50" : d ? "border-sky-400 bg-sky-50" : "border-slate-200 bg-slate-50 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100",
                    ].join(" ")}
                  />
                ))}
              </div>

              {error && <p className="mb-4 text-center text-xs text-red-500">{error}</p>}

              {/* Resend */}
              <div className="mb-6 text-center">
                {timer > 0 ? (
                  <p className="text-xs text-slate-400">Resend OTP in <span className="font-semibold text-sky-600">{timer}s</span></p>
                ) : (
                  <button onClick={handleResend} className="text-xs font-semibold text-sky-600 hover:underline">
                    Resend OTP
                  </button>
                )}
              </div>

              {/* Terms */}
              <p className="mb-6 text-center text-xs text-slate-400">
                By submitting the OTP, you agree to CapitalCare{" "}
                <Link href="/terms" className="font-semibold text-sky-600 hover:underline">
                  Terms &amp; Conditions
                </Link>
              </p>

              {/* Buttons */}
              <div className="grid gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={handleVerify}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Verifying…
                    </>
                  ) : "Verify"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  onClick={() => router.back()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <HiOutlineArrowLeft className="h-4 w-4" /> Back
                </motion.button>
              </div>

              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-semibold text-sky-600 hover:underline">Login</Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return <Suspense><OtpForm /></Suspense>;
}
