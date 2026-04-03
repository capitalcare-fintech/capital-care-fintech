import React from "react";

type DocumentUploadCardProps = {
  type: string;
  label: string;
  isRequired: boolean;
  file: File | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
};

const FileIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export default function DocumentUploadCard({
  label,
  isRequired,
  file,
  onFileSelect,
  onRemove,
}: DocumentUploadCardProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(selectedFile.type)) {
      alert("Invalid file type. Please upload PDF or image files only.");
      return;
    }

    if (selectedFile.size > maxSize) {
      alert("File size exceeds 10MB limit.");
      return;
    }

    onFileSelect(selectedFile);
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4 transition hover:border-blue-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-900">{label}</p>
            {isRequired && <span className="text-xs font-semibold text-red-600">Required</span>}
          </div>

          {file ? (
            <div className="mt-3 flex items-center gap-2 rounded border border-emerald-200 bg-emerald-50 p-2">
              <FileIcon />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-emerald-900">{file.name}</p>
                <p className="text-xs text-emerald-700">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <label className="block">
                <div className="relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-blue-400 hover:bg-blue-50">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <p className="text-xs text-gray-600">Click to upload or drag and drop</p>
                  <p className="mt-1 text-xs text-gray-500">PDF or Image (Max 10MB)</p>
                </div>
              </label>
            </div>
          )}
        </div>

        {file && (
          <button
            onClick={onRemove}
            className="ml-2 rounded p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            type="button"
          >
            <TrashIcon />
          </button>
        )}
      </div>
    </div>
  );
}
