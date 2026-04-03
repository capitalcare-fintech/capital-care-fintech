"use client";

import { useEffect, useRef, useState } from "react";
import { getUser } from "@/lib/authClient";
import { CardPreview, type CardData } from "./CardPreview";
import { CardDetails } from "./CardDetails";
import { HiOutlineDownload } from "react-icons/hi";

const EMPTY: CardData = {
  name: "", phone: "", email: "", relationshipManager: "", profileImage: "",
};

export function DigitalCardPage() {
  const [data, setData]       = useState<CardData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const cardRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user  = getUser();
    const phone = user?.phone ?? "";
    if (!phone) { setLoading(false); return; }

    fetch(`/api/profile?phone=${encodeURIComponent(phone)}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.profile) {
          setData({
            name:                json.profile.name                ?? "",
            phone:               json.profile.phone               ?? "",
            email:               json.profile.email               ?? "",
            relationshipManager: json.profile.relationshipManager ?? "",
            profileImage:        json.profile.profileImage        ?? "",
          });
        } else {
          setData((p) => ({ ...p, phone, name: user?.name ?? "" }));
        }
      })
      .catch(() => setData((p) => ({ ...p, phone, name: user?.name ?? "" })))
      .finally(() => setLoading(false));
  }, []);

  async function downloadPng() {
    if (!cardRef.current) return;
    const { toPng } = await import("html-to-image");
    const url = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
    const a   = document.createElement("a");
    a.href    = url;
    a.download = "digital-card.png";
    a.click();
  }

  async function downloadPdf() {
    if (!cardRef.current || typeof window === "undefined") return;
    const { toPng } = await import("html-to-image");
    const { jsPDF } = await import("jspdf");
    const url = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
    const img = new window.Image();
    img.src   = url;
    await new Promise((res) => { img.onload = res; });
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [img.width, img.height] });
    pdf.addImage(url, "PNG", 0, 0, img.width, img.height);
    pdf.save("digital-card.pdf");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        {/* Download buttons */}
        <div className="mb-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={downloadPng}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <HiOutlineDownload className="h-4 w-4" />
            Download PNG
          </button>
          <button
            type="button"
            onClick={downloadPdf}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <HiOutlineDownload className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
          {/* Left: card preview */}
          <CardPreview data={data} cardRef={cardRef} />

          {/* Right: details panel */}
          <CardDetails data={data} />
        </div>
      </div>
    </div>
  );
}
