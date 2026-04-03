"use client";

import { useRef } from "react";
import { HiOutlineUpload, HiOutlineDocumentText } from "react-icons/hi";

type Props = {
  file: File | null;
  onChange: (f: File) => void;
};

const ACCEPTED = ".pdf,.jpg,.jpeg,.png";

export function FileUpload({ file, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) onChange(f);
    e.target.value = "";
  }

  return (
    <button
      type="button"
      onClick={() => ref.current?.click()}
      className="flex h-full min-h-[140px] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-yellow-400 bg-yellow-50 px-6 py-8 text-center transition hover:bg-yellow-100 dark:bg-yellow-400/10 dark:hover:bg-yellow-400/20"
    >
      {file ? (
        <>
          <HiOutlineDocumentText className="h-10 w-10 text-yellow-500" />
          <span className="max-w-[160px] truncate text-xs font-semibold text-yellow-700 dark:text-yellow-400">
            {file.name}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Click to change</span>
        </>
      ) : (
        <>
          <HiOutlineUpload className="h-10 w-10 text-yellow-500" />
          <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
            Upload Document
          </span>
          <span className="text-xs text-slate-400">PDF, JPG, PNG · max 5 MB</span>
        </>
      )}
      <input ref={ref} type="file" accept={ACCEPTED} className="hidden" onChange={handleChange} />
    </button>
  );
}
