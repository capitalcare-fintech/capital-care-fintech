"use client";

import { useEffect, useRef, useState } from "react";
import { HiX } from "react-icons/hi";
import { FileUpload } from "./FileUpload";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

const STATUS_OPTIONS = ["Paid", "Pending", "Rejected"] as const;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500";

export function AddBillModal({ onClose, onSuccess }: Props) {
  const [file, setFile]         = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus]     = useState<string>("Select");
  const [uploading, setUploading] = useState(false);
  const [error, setError]       = useState("");
  const overlayRef              = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  async function handleUpload() {
    setError("");
    if (!file)            return setError("Please select a file.");
    if (!fileName.trim()) return setError("File name is required.");
    if (status === "Select") return setError("Please select a status.");

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("fileName", fileName.trim());
      form.append("status", status);

      const res  = await fetch("/api/bills/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl transition-colors duration-300 dark:bg-slate-900">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <HiX className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Add Bill</h2>
          <div className="mx-auto mt-1.5 h-0.5 w-12 rounded-full bg-yellow-400" />
        </div>

        {/* Body */}
        <div className="px-6 pb-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-stretch">
            {/* Left: upload box */}
            <div className="sm:w-48 sm:shrink-0">
              <FileUpload file={file} onChange={setFile} />
            </div>

            {/* Right: fields */}
            <div className="flex flex-1 flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  File Name
                </label>
                <input
                  className={inputClass}
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter File Name"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Select Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={inputClass}
                >
                  <option value="Select" disabled>Select</option>
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="mt-3 text-center text-xs font-medium text-red-500">{error}</p>
          )}

          {/* Submit */}
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="flex min-w-[120px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {uploading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {uploading ? "Uploading…" : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
