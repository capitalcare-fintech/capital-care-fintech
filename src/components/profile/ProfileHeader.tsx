"use client";

import Image from "next/image";
import { useRef } from "react";
import { HiOutlineCamera, HiArrowRight } from "react-icons/hi";
import { HiGift } from "react-icons/hi2";

type Props = {
  profileImage: string;
  uploading: boolean;
  onAvatarChange: (file: File) => void;
};

const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024;

export function ProfileHeader({ profileImage, uploading, onAvatarChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED.includes(file.type)) { alert("Only JPG, PNG, or WebP images are allowed."); return; }
    if (file.size > MAX_SIZE) { alert("File size must be under 2 MB."); return; }
    onAvatarChange(file);
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      {/* Avatar + badge */}
      <div className="flex flex-col items-start gap-3">
        <div className="relative">
          <button
            type="button"
            aria-label="Upload profile photo"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-yellow-500 text-3xl font-bold text-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 disabled:opacity-70"
          >
            {profileImage ? (
              <Image src={profileImage} alt="Profile" fill className="object-cover" sizes="80px" />
            ) : (
              <span className="select-none">FN</span>
            )}
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition group-hover:opacity-100">
              <HiOutlineCamera className="h-6 w-6 text-white" />
            </span>
            {uploading && (
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </span>
            )}
          </button>

          <span
            aria-hidden
            className="pointer-events-none absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-black ring-2 ring-white dark:ring-gray-800"
          >
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

        <span className="rounded-full border border-blue-500 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:border-blue-400 dark:text-blue-400">
          Individual
        </span>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-black shadow-md transition hover:bg-yellow-600"
        >
          <HiGift className="h-4 w-4" />
          Refer
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-gray-400 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          Verify
          <HiArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
