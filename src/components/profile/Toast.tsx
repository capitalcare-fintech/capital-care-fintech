"use client";

import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export function Toast({ type, message }: { type: "success" | "error"; message: string }) {
  return (
    <div
      role="alert"
      className={[
        "fixed bottom-6 right-6 z-200 flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold shadow-xl transition-all duration-300",
        type === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white",
      ].join(" ")}
    >
      {type === "success" ? (
        <HiCheckCircle className="h-5 w-5 shrink-0" />
      ) : (
        <HiXCircle className="h-5 w-5 shrink-0" />
      )}
      {message}
    </div>
  );
}
