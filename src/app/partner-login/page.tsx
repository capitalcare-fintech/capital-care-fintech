"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineIdentification, HiOutlineLockClosed,
  HiOutlineEye, HiOutlineEyeOff, HiOutlineShieldCheck,
} from "react-icons/hi";
import { FaHandshake } from "react-icons/fa";
import { savePartnerSession } from "@/lib/partnerAuthClient";
import { useRedirectIfPartnerAuthed } from "@/lib/useRedirectIfPartnerAuthed";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

type View = "login" | "set-password";

export default function PartnerLoginPage() {
  const router = useRouter();
  const ready  = useRedirectIfPartnerAuthed("/partner-dashboard");
  const [view, setView] = useState<View>("login");

  // Login form
  const [partnerId, setPartnerId] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Set-password form
  const [firstLoginPartnerId, setFirstLoginPartnerId] = useState("");
  const [firstLoginName, setFirstLoginName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [setPwdError, setSetPwdError] = useState("");
  const [setPwdLoading, setSetPwdLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!partnerId.trim() || !password) {
      setLoginError("Partner ID and password are required");
      return;
    }
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/partner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId: partnerId.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) { setLoginError(data.error || "Login failed"); return; }

      if (data.firstLogin) {
        setFirstLoginPartnerId(data.partnerId);
        setFirstLoginName(data.name);
        setView("set-password");
      } else {
        savePartnerSession({ name: data.partner.name, partnerId: data.partner.partnerId });
        setTimeout(() => router.push("/partner-dashboard"), 0);
      }
    } catch {
      setLoginError("Network error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 8) { setSetPwdError("Password must be at least 8 characters"); return; }
    if (newPassword !== confirmPassword) { setSetPwdError("Passwords do not match"); return; }
    setSetPwdLoading(true);
    setSetPwdError("");
    try {
      const res = await fetch("/api/partner/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partnerId: firstLoginPartnerId, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setSetPwdError(data.error || "Failed to set password"); return; }
      savePartnerSession({ name: data.partner.name, partnerId: data.partner.partnerId });
      setTimeout(() => router.push("/partner-dashboard"), 0);
    } catch {
      setSetPwdError("Network error. Please try again.");
    } finally {
      setSetPwdLoading(false);
    }
  }

  const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="mb-6 text-center"
        >
          <div className="mb-3 flex justify-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-indigo-500 text-white shadow-md">
              <FaHandshake className="h-7 w-7" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {view === "login" ? "Partner Login" : "Set Your Password"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {view === "login"
              ? "Sign in to your CapitalCare Partner Dashboard"
              : `Welcome, ${firstLoginName}! Please set a new password to continue.`}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="rounded-2xl border border-sky-100 bg-white p-8 shadow-sm"
            >
              {loginError && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {loginError}
                </div>
              )}
              <form onSubmit={handleLogin} className="grid gap-5" noValidate>
                {/* Partner ID */}
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Partner ID</label>
                  <div className="relative">
                    <HiOutlineIdentification className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={partnerId}
                      onChange={(e) => { setPartnerId(e.target.value); setLoginError(""); }}
                      placeholder="Capital@name.agent12345678"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <div className="relative">
                    <HiOutlineLockClosed className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
                      placeholder="Your password"
                      className={inputCls}
                    />
                    <button type="button" onClick={() => setShowPwd((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPwd ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-4 py-2.5">
                  <HiOutlineShieldCheck className="h-4 w-4 shrink-0 text-sky-500" />
                  <p className="text-xs text-slate-500">
                    First time? Use your mobile number as the temporary password.
                  </p>
                </div>

                <motion.button type="submit" disabled={loginLoading}
                  whileHover={{ scale: loginLoading ? 1 : 1.02 }} whileTap={{ scale: loginLoading ? 1 : 0.98 }}
                  className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
                >
                  {loginLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Signing in…
                    </span>
                  ) : "Sign In"}
                </motion.button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Not a partner yet?{" "}
                <Link href="/partner-apply" target="_blank" className="font-semibold text-sky-600 hover:underline">
                  Apply here
                </Link>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="set-password"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="rounded-2xl border border-sky-100 bg-white p-8 shadow-sm"
            >
              <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                🔐 This is your first login. Please set a secure password to continue.
              </div>

              {setPwdError && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {setPwdError}
                </div>
              )}

              <form onSubmit={handleSetPassword} className="grid gap-5" noValidate>
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium text-slate-700">New Password</label>
                  <div className="relative">
                    <HiOutlineLockClosed className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setSetPwdError(""); }}
                      placeholder="Min. 8 characters"
                      className={inputCls}
                    />
                    <button type="button" onClick={() => setShowNew((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showNew ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                  <div className="relative">
                    <HiOutlineLockClosed className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setSetPwdError(""); }}
                      placeholder="Re-enter password"
                      className={inputCls}
                    />
                    <button type="button" onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showConfirm ? <HiOutlineEyeOff className="h-4 w-4" /> : <HiOutlineEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <motion.button type="submit" disabled={setPwdLoading}
                  whileHover={{ scale: setPwdLoading ? 1 : 1.02 }} whileTap={{ scale: setPwdLoading ? 1 : 0.98 }}
                  className="rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 py-3 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
                >
                  {setPwdLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Setting password…
                    </span>
                  ) : "Set Password & Continue"}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
