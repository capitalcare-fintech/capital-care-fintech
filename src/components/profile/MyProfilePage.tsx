"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/authClient";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileForm } from "./ProfileForm";
import { AddressTabs } from "./AddressTabs";
import { Toast } from "./Toast";

export type ProfileData = {
  name: string;
  phone: string;
  email: string;
  relationshipManager: string;
  profileImage: string;
  address: {
    line1: string;
    line2: string;
    line3: string;
    locality: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
  };
};

const EMPTY: ProfileData = {
  name: "",
  phone: "",
  email: "",
  relationshipManager: "",
  profileImage: "",
  address: { line1: "", line2: "", line3: "", locality: "", landmark: "", city: "", state: "", pincode: "" },
};

type Toast = { type: "success" | "error"; message: string } | null;

export function MyProfilePage() {
  const [data, setData] = useState<ProfileData>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Prefill from API on mount
  useEffect(() => {
    const user = getUser();
    const phone = user?.phone ?? "";
    if (!phone) { setLoading(false); return; }

    fetch(`/api/profile?phone=${encodeURIComponent(phone)}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.profile) {
          setData(json.profile);
        } else {
          // seed phone + name from auth
          setData((prev) => ({ ...prev, phone, name: user?.name ?? "" }));
        }
      })
      .catch(() => {
        setData((prev) => ({ ...prev, phone, name: user?.name ?? "" }));
      })
      .finally(() => setLoading(false));
  }, []);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleAvatarChange(file: File) {
    if (!data.phone) {
      showToast("error", "Save your phone number first before uploading an avatar");
      return;
    }
    setAvatarUploading(true);
    try {
      const form = new FormData();
      form.append("avatar", file);
      form.append("phone", data.phone);
      const res = await fetch("/api/profile/upload-avatar", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setData((prev) => ({ ...prev, profileImage: json.imageUrl }));
      showToast("success", "Avatar updated");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Upload failed");
    } finally {
      setAvatarUploading(false);
    }
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!data.name.trim()) e.name = "Name is required";
    if (!/^\d{10}$/.test(data.phone.trim())) e.phone = "Phone must be 10 digits";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      e.email = "Invalid email address";
    if (data.address.pincode && !/^\d+$/.test(data.address.pincode.trim()))
      e.pincode = "Pincode must be numeric";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Save failed");
      showToast("success", "Profile saved successfully");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-10 transition-colors duration-300 dark:bg-slate-950">
      {toast && <Toast type={toast.type} message={toast.message} />}
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 md:p-8">
          <ProfileHeader
            profileImage={data.profileImage}
            uploading={avatarUploading}
            onAvatarChange={handleAvatarChange}
          />
          <ProfileForm data={data} setData={setData} errors={errors} />
          <AddressTabs data={data} setData={setData} errors={errors} />

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-yellow-400 px-8 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-yellow-300 disabled:opacity-60"
            >
              {saving && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
              )}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
