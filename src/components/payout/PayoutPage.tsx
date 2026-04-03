"use client";

import { useCallback, useEffect, useState } from "react";
import { PayoutBanner } from "./PayoutBanner";
import { PayoutFilters } from "./PayoutFilters";
import { PayoutTable, type PayoutRow } from "./PayoutTable";

const CURRENT_MONTH = new Date().toLocaleString("default", { month: "long" });
const CURRENT_YEAR  = String(new Date().getFullYear());

export function PayoutPage() {
  const [product, setProduct] = useState("Personal Loan");
  const [month,   setMonth]   = useState(CURRENT_MONTH);
  const [year,    setYear]    = useState(CURRENT_YEAR);
  const [rows,    setRows]    = useState<PayoutRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (p: string, m: string, y: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/payout?product=${encodeURIComponent(p)}&month=${encodeURIComponent(m)}&year=${encodeURIComponent(y)}`,
      );
      const json = await res.json();
      setRows(json.rows ?? []);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load on mount
  useEffect(() => { fetchData(product, month, year); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleUpdate() { fetchData(product, month, year); }

  function handleDownload() {
    if (rows.length === 0) return;
    const header = "Slab,Loan Amount,Payout %,Remarks";
    const body   = rows.map((r) => `${r.slab},${r.loanAmount},${r.payout},${r.remarks ?? ""}`).join("\n");
    const blob   = new Blob([`${header}\n${body}`], { type: "text/csv" });
    const url    = URL.createObjectURL(blob);
    const a      = document.createElement("a");
    a.href       = url;
    a.download   = `payout-${product.replace(/\s+/g, "-")}-${month}-${year}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <PayoutBanner />
        <PayoutFilters
          product={product}
          month={month}
          year={year}
          loading={loading}
          onProductChange={setProduct}
          onMonthChange={setMonth}
          onYearChange={setYear}
          onUpdate={handleUpdate}
          onDownload={handleDownload}
        />
        <PayoutTable rows={rows} loading={loading} product={product} month={month} year={year} />
      </div>
    </div>
  );
}
