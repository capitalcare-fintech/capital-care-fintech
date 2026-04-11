"use client";

import { useState } from "react";
import type { ProfileData } from "./MyProfilePage";

const TABS = ["Permanent", "Residence", "Office", "Aadhaar"] as const;
type Tab = (typeof TABS)[number];
type AddressKey = keyof ProfileData["address"];

type Props = {
  data: ProfileData;
  setData: React.Dispatch<React.SetStateAction<ProfileData>>;
  errors: Record<string, string>;
};

const fieldInput =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500";

const fieldLabel =
  "mb-1.5 block text-xs font-medium text-yellow-600 dark:text-yellow-400";

function AddressForm({ data, setData, errors }: Props) {
  function handleChange(field: AddressKey) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setData((prev) => ({ ...prev, address: { ...prev.address, [field]: e.target.value } }));
  }

  return (
    <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-5">
        <div>
          <label className={fieldLabel}>Address Line 1</label>
          <input className={fieldInput} value={data.address.line1} onChange={handleChange("line1")} placeholder="Address Line 1" />
        </div>
        <div>
          <label className={fieldLabel}>Address Line 2</label>
          <input className={fieldInput} value={data.address.line2} onChange={handleChange("line2")} placeholder="Address Line 2" />
        </div>
        <div>
          <label className={fieldLabel}>Address Line 3</label>
          <input className={fieldInput} value={data.address.line3} onChange={handleChange("line3")} placeholder="Address Line 3" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className={fieldLabel}>Locality</label>
            <input className={fieldInput} value={data.address.locality} onChange={handleChange("locality")} placeholder="Locality" />
          </div>
          <div>
            <label className={fieldLabel}>Landmark</label>
            <input className={fieldInput} value={data.address.landmark} onChange={handleChange("landmark")} placeholder="Landmark" />
          </div>
          <div>
            <label className={fieldLabel}>City</label>
            <input className={fieldInput} value={data.address.city} onChange={handleChange("city")} placeholder="City" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={fieldLabel}>State</label>
            <input className={fieldInput} value={data.address.state} onChange={handleChange("state")} placeholder="State" />
          </div>
          <div>
            <label className={fieldLabel}>Pincode</label>
            <input
              maxLength={6}
              placeholder="Pincode"
              value={data.address.pincode}
              onChange={handleChange("pincode")}
              className={
                errors.pincode
                  ? "w-full rounded-xl border border-red-500 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-red-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  : fieldInput
              }
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
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) =>
          active === tab ? (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className="rounded-full bg-yellow-500 px-5 py-2 text-xs font-semibold text-black shadow-md"
            >
              {tab}
            </button>
          ) : (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className="rounded-full bg-gray-200 px-5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {tab}
            </button>
          )
        )}
      </div>
      <AddressForm data={data} setData={setData} errors={errors} />
    </div>
  );
}
