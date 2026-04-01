"use client";

import type { ProfileData } from "./MyProfilePage";

type Props = {
  data: ProfileData;
  setData: React.Dispatch<React.SetStateAction<ProfileData>>;
  errors: Record<string, string>;
};

const labelClass = "block text-xs font-semibold text-yellow-600 mb-1 dark:text-yellow-400";
const inputBase =
  "w-full rounded-xl border px-4 py-2.5 text-sm transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500";
const inputNormal = `${inputBase} border-slate-300 focus:border-yellow-400 dark:border-slate-600`;
const inputError  = `${inputBase} border-red-500 focus:border-red-500 dark:border-red-500`;

export function ProfileForm({ data, setData, errors }: Props) {
  function handleChange(field: keyof Omit<ProfileData, "address">) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label className={labelClass}>Name</label>
        <input
          className={errors.name ? inputError : inputNormal}
          value={data.name}
          onChange={handleChange("name")}
          placeholder="Full Name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label className={labelClass}>Phone Number</label>
        <input
          className={errors.phone ? inputError : inputNormal}
          value={data.phone}
          onChange={handleChange("phone")}
          placeholder="10-digit phone"
          maxLength={10}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label className={labelClass}>Relationship Manager</label>
        <input
          className={inputNormal}
          value={data.relationshipManager}
          onChange={handleChange("relationshipManager")}
          placeholder="RM Name"
        />
      </div>

      <div className="sm:col-span-2 lg:col-span-3">
        <label className={labelClass}>Email ID</label>
        <input
          className={errors.email ? inputError : inputNormal}
          value={data.email}
          onChange={handleChange("email")}
          placeholder="Enter your email address"
          type="email"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>
    </div>
  );
}
