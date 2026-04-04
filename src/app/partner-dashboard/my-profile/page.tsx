"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineCamera, HiCheckCircle, HiXCircle } from "react-icons/hi";
import { getUser } from "@/lib/authClient";

console.log("Profile page loaded");

// ─── types ────────────────────────────────────────────────────────────────────

type Address = {
  line1: string;
  line2: string;
  line3: string;
  locality: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
};

type ProfileData = {
  name: string;
  phone: string;
  email: string;
  relationshipManager: string;
  profileImage: string;
  address: Address;
};

const EMPTY: ProfileData = {
  name: "",
  phone: "",
  email: "",
  relationshipManager: "",
  profileImage: "",
  address: {
    line1: "", line2: "", line3: "",
    locality: "", landmark: "", city: "",
    state: "", pincode: "",
  },
};

const TABS = ["Permanent", "Residence", "Office", "Aadhaar"] as const;
type Tab = (typeof TABS)[number];

// ─── page component ───────────────────────────────────────────────────────────

export default function MyProfilePage() {
  const [data, setData]           = useState<ProfileData>(EMPTY);
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [saving, setSaving]       = useState(false);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("Permanent");
  const [toast, setToast]         = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const fileRef                   = useRef<HTMLInputElement>(null);

  // prefill on mount — localStorage first (instant), then DB (authoritative)
  useEffect(() => {
    // restore avatar from localStorage immediately (no flicker)
    const savedImage = localStorage.getItem("profileImage");

    // try cached profile data for instant render
    const cached = localStorage.getItem("profileData");
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as ProfileData;
        setData({ ...parsed, profileImage: savedImage ?? parsed.profileImage ?? "" });
      } catch { /* ignore bad cache */ }
    } else if (savedImage) {
      setData((p) => ({ ...p, profileImage: savedImage }));
    }

    const user  = getUser();
    const phone = user?.phone ?? "";
    if (!phone) { setLoading(false); return; }

    fetch(`/api/profile?phone=${encodeURIComponent(phone)}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.profile) {
          const fresh = { ...json.profile, profileImage: savedImage ?? json.profile.profileImage ?? "" };
          setData(fresh);
          localStorage.setItem("profileData", JSON.stringify(fresh));
        } else {
          setData((p) => ({ ...p, phone, name: user?.name ?? "" }));
        }
      })
      .catch(() => setData((p) => ({ ...p, phone, name: user?.name ?? "" })))
      .finally(() => setLoading(false));
  }, []);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  // avatar — stored in localStorage, no backend dependency
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
      alert("Only JPG, PNG, or WebP allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Max file size is 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      localStorage.setItem("profileImage", result);
      setData((p) => ({ ...p, profileImage: result }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!/^\d{10}$/.test(data.phone.trim())) e.phone = "Phone must be 10 digits";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "Invalid email";
    if (data.address.pincode && !/^\d+$/.test(data.address.pincode.trim())) e.pincode = "Pincode must be numeric";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);
    try {
      const res  = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Save failed");
      // cache to localStorage so digital card + next load are instant
      localStorage.setItem("profileData", JSON.stringify(data));
      showToast("success", "Profile saved successfully");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const initials = data.name
    ? data.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "FN";

  // loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  // main render
  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10">

      {/* Toast notification */}
      {toast !== null && (
        <div
          role="alert"
          style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}
          className={
            toast.type === "success"
              ? "flex items-center gap-3 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-xl"
              : "flex items-center gap-3 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-xl"
          }
        >
          {toast.type === "success"
            ? <HiCheckCircle className="h-5 w-5" />
            : <HiXCircle className="h-5 w-5" />}
          {toast.msg}
        </div>
      )}

      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-md md:p-8">

          {/* ── PROFILE HEADER ── */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            {/* Avatar */}
            <div className="flex flex-col items-start gap-3">
              <div className="relative">
                <button
                  type="button"
                  aria-label="Upload profile photo"
                  onClick={() => fileRef.current?.click()}
                  className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-blue-500 text-3xl font-bold text-white transition focus:outline-none"
                >
                  {data.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={data.profileImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <span className="select-none">{initials}</span>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 transition group-hover:opacity-100">
                    <HiOutlineCamera className="h-6 w-6 text-white" />
                  </span>
                </button>
                <span className="pointer-events-none absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white ring-2 ring-white">
                  <HiOutlineCamera className="h-3.5 w-3.5" />
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <span className="rounded-full border border-blue-300 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-blue-600">
                Individual
              </span>
            </div>

            {/* Refer and Verify buttons removed */}
          </div>

          {/* ── FORM FIELDS ── */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-blue-600">Name</label>
              <input
                value={data.name}
                onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
                placeholder="Full Name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-blue-600">Phone Number</label>
              <input
                value={data.phone}
                onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
                placeholder="10-digit phone"
                maxLength={10}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-blue-600">Relationship Manager</label>
              <input
                value={data.relationshipManager}
                onChange={(e) => setData((p) => ({ ...p, relationshipManager: e.target.value }))}
                placeholder="RM Name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="mb-1.5 block text-xs font-medium text-blue-600">Email ID</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>

          {/* ── ADDRESS TABS ── */}
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={
                    activeTab === tab
                      ? "rounded-full bg-blue-500 px-5 py-2 text-xs font-semibold text-white shadow-sm"
                      : "rounded-full bg-gray-100 px-5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200"
                  }
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex flex-col gap-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-blue-600">Address Line 1</label>
                  <input value={data.address.line1} onChange={(e) => setData((p) => ({ ...p, address: { ...p.address, line1: e.target.value } }))} placeholder="Address Line 1"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-blue-600">Address Line 2</label>
                  <input value={data.address.line2} onChange={(e) => setData((p) => ({ ...p, address: { ...p.address, line2: e.target.value } }))} placeholder="Address Line 2"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-blue-600">Address Line 3</label>
                  <input value={data.address.line3} onChange={(e) => setData((p) => ({ ...p, address: { ...p.address, line3: e.target.value } }))} placeholder="Address Line 3"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-600">Locality</label>
                    <input value={data.address.locality} onChange={(e) => setData((p) => ({ ...p, address: { ...p.address, locality: e.target.value } }))} placeholder="Locality"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-600">Landmark</label>
                    <input value={data.address.landmark} onChange={(e) => setData((p) => ({ ...p, address: { ...p.address, landmark: e.target.value } }))} placeholder="Landmark"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-600">City</label>
                    <input value={data.address.city} onChange={(e) => setData((p) => ({ ...p, address: { ...p.address, city: e.target.value } }))} placeholder="City"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-600">State</label>
                    <input value={data.address.state} onChange={(e) => setData((p) => ({ ...p, address: { ...p.address, state: e.target.value } }))} placeholder="State"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-600">Pincode</label>
                    <input
                      maxLength={6}
                      placeholder="Pincode"
                      value={data.address.pincode}
                      onChange={(e) => setData((p) => ({ ...p, address: { ...p.address, pincode: e.target.value } }))}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                    {errors.pincode && <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SAVE BUTTON ── */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex min-w-36 items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 disabled:opacity-60"
            >
              {saving && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
