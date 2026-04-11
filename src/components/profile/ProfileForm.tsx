"use client";

import type { ProfileData } from "./MyProfilePage";

type Props = {
  data: ProfileData;
  setData: React.Dispatch<React.SetStateAction<ProfileData>>;
  errors: Record<string, string>;
};

export function ProfileForm({ data, setData, errors }: Props) {
  function handleChange(field: keyof Omit<ProfileData, "address">) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {/* Name */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-yellow-600 dark:text-yellow-400">
          Name
        </label>
        <input
          value={data.name}
          onChange={handleChange("name")}
          placeholder="Full Name"
          className={
            errors.name
              ? "w-full rounded-xl border border-red-500 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-red-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              : "w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          }
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-yellow-600 dark:text-yellow-400">
          Phone Number
        </label>
        <input
          value={data.phone}
          onChange={handleChange("phone")}
          placeholder="10-digit phone"
          maxLength={10}
          className={
            errors.phone
              ? "w-full rounded-xl border border-red-500 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-red-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              : "w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          }
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      {/* RM */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-yellow-600 dark:text-yellow-400">
          Relationship Manager
        </label>
        <input
          value={data.relationshipManager}
          onChange={handleChange("relationshipManager")}
          placeholder="RM Name"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />
      </div>

      {/* Email */}
      <div className="sm:col-span-2 lg:col-span-3">
        <label className="mb-1.5 block text-xs font-medium text-yellow-600 dark:text-yellow-400">
          Email ID
        </label>
        <input
          type="email"
          value={data.email}
          onChange={handleChange("email")}
          placeholder="Enter your email address"
          className={
            errors.email
              ? "w-full rounded-xl border border-red-500 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-red-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
              : "w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          }
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>
    </div>
  );
}
