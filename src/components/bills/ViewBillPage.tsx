"use client";

import { useCallback, useEffect, useState } from "react";
import { BillHeader } from "./BillHeader";
import { BillFilters } from "./BillFilters";
import { BillList, type Bill } from "./BillList";
import { AddBillModal } from "./AddBillModal";
import { Toast } from "@/components/profile/Toast";

export function ViewBillPage() {
  const [bills, setBills]       = useState<Bill[]>([]);
  const [loading, setLoading]   = useState(false);
  const [search, setSearch]     = useState("");
  const [status, setStatus]     = useState("Paid");
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast]       = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchBills = useCallback(async (s: string, st: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (st) params.set("status", st);
      if (s)  params.set("search", s);
      const res  = await fetch(`/api/bills?${params.toString()}`);
      const json = await res.json();
      setBills(json.bills ?? []);
    } catch {
      setBills([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBills(search, status); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const t = setTimeout(() => fetchBills(search, status), 300);
    return () => clearTimeout(t);
  }, [search, status, fetchBills]);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }

  function handleSuccess() {
    setModalOpen(false);
    showToast("success", "Bill uploaded successfully");
    fetchBills(search, status);
  }

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-950">
      {toast && <Toast type={toast.type} message={toast.message} />}
      {modalOpen && (
        <AddBillModal onClose={() => setModalOpen(false)} onSuccess={handleSuccess} />
      )}
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <BillHeader onAddBill={() => setModalOpen(true)} />
        <BillFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />
        <BillList bills={bills} loading={loading} />
      </div>
    </div>
  );
}
