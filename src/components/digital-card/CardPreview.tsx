"use client";

import Image from "next/image";
import capitalCareLogo from "@/assets/logo/capitalCareLogo.jpeg";
import { HiOutlinePhone, HiOutlineMail, HiOutlineUser } from "react-icons/hi";

export type CardData = {
  name: string;
  phone: string;
  email: string;
  relationshipManager: string;
  profileImage: string;
};

type Props = { data: CardData; cardRef: React.RefObject<HTMLDivElement | null> };

export function CardPreview({ data, cardRef }: Props) {
  const initials = data.name
    ? data.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "CC";

  const isEmpty = !data.name && !data.phone && !data.email;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-slate-300 px-8 py-16 text-center dark:border-slate-700">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Complete your profile</p>
        <p className="text-xs text-slate-400 dark:text-slate-500">Save your profile details to generate your digital card.</p>
      </div>
    );
  }

  return (
    /* Gradient border wrapper */
    <div className="rounded-3xl bg-linear-to-br from-green-400 via-yellow-300 to-yellow-500 p-0.75 shadow-xl">
      {/* Card body — white bg for capture, theme-adaptive visually */}
      <div
        ref={cardRef}
        className="flex flex-col items-center gap-5 rounded-3xl bg-white px-8 py-8 dark:bg-slate-900"
      >
        {/* Logo */}
        <div className="flex w-full items-center justify-between">
          <Image
            src={capitalCareLogo}
            alt="CapitalCare"
            className="h-8 w-auto object-contain"
            priority
          />
          <span className="rounded-full border border-green-400 px-3 py-0.5 text-xs font-bold text-green-600 dark:text-green-400">
            Referral Partner
          </span>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
          {data.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.profileImage}
              alt={data.name}
              className="h-20 w-20 rounded-full object-cover ring-4 ring-yellow-300"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-2xl font-extrabold text-slate-900 ring-4 ring-yellow-300">
              {initials}
            </div>
          )}
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {data.name || "Your Name"}
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Referral Partner
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-linear-to-r from-green-300 via-yellow-300 to-yellow-400" />

        {/* Details */}
        <div className="flex w-full flex-col gap-2.5 text-sm">
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <HiOutlineUser className="h-4 w-4 shrink-0 text-yellow-500" />
            <span className="text-xs text-slate-400 dark:text-slate-500 w-6">RM</span>
            <span className="font-medium">{data.relationshipManager || "—"}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <HiOutlinePhone className="h-4 w-4 shrink-0 text-yellow-500" />
            <span className="font-medium">{data.phone || "—"}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
            <HiOutlineMail className="h-4 w-4 shrink-0 text-yellow-500" />
            <span className="break-all font-medium">{data.email || "—"}</span>
          </div>
        </div>

        {/* Footer tag */}
        <div className="mt-1 w-full rounded-xl bg-linear-to-r from-green-400 to-yellow-400 py-1.5 text-center text-xs font-bold tracking-widest text-white uppercase">
          CapitalCare · Fintech
        </div>
      </div>
    </div>
  );
}
