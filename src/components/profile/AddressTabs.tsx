"use client";

import { useState } from "react";
import type { ProfileData } from "./MyProfilePage";

const TABS = ["Permanent", "Residence", "Office", "Aadhaar"] as const;
type Tab = (typeof TABS)[number];

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

type AddressKey = keyof ProfileData["address"];

function AddressForm({ data, setData, errors }: Props) {
  function handleChange(field: AddressKey) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({ ...prev, address: { ...prev.address, [field]: e.target.value } }));
  }

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/50">
      <div className="flex flex-col gap-4">
        {(["line1", "line2", "line3"] as AddressKey[]).map((f, i) => (
          <div key={f}>
            <label className={labelClass}>Address Line {i + 1}</label>
            <input
              className={inputNormal}
              value={data.address[f]}
              onChange={handleChange(f)}
              placeholder={`Address Line ${i + 1}`}
            />
          </div>
        ))}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(["locality", "landmark", "city"] as AddressKey[]).map((f) => (
            <div key={f}>
              <label className={labelClass}>{f.charAt(0).toUpperCase() + f.slice(1)}</label>
              <input
                className={inputNormal}
                value={data.address[f]}
                onChange={handleChange(f)}
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>State</label>
            <input
              className={inputNormal}
              value={data.address.state}
              onChange={handleChange("state")}
              placeholder="State"
            />
          </div>
          <div>
            <label className={labelClass}>Pincode</label>
            <input
              className={errors.pincode ? inputError : inputNormal}
              value={data.address.pincode}
              onChange={handleChange("pincode")}
              placeholder="Pincode"
              maxLength={6}
            />
            {errors.pincode && <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AddressTabs({ data, setData, errors }: Props) {
  const [active, setActive] = useState<Tab>("Permanent");

  return (
    <div className="mt-8">
      <div className="flex gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 w-fit transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/60">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={[
              "rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors duration-200",
              active === tab
                ? "bg-yellow-400 text-slate-900 shadow"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* All tabs share the same address object for now — extend to per-tab if needed */}
      <AddressForm data={data} setData={setData} errors={errors} />
    </div>
  );
}
