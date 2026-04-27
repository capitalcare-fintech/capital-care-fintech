
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loanConfigurations, type LoanConfig } from "@/lib/loanConfig";

const rupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const PRIMARY_LOANS = ["personal-loan", "business-loan", "home-loan"];

function calculateEmi(principal: number, annualRatePercent: number, tenureMonths: number) {
  const monthlyRate = annualRatePercent / 12 / 100;

  if (monthlyRate === 0 || tenureMonths === 0 || principal === 0) {
    return {
      emi: 0,
      totalPayment: 0,
      totalInterest: 0,
    };
  }

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return { emi, totalPayment, totalInterest };
}

function getRandomValue(min: number, max: number, decimals: number = 0): number {
  const random = Math.random() * (max - min) + min;
  return Math.round(random * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function EmiCalculator() {
  const [selectedLoan, setSelectedLoan] = useState<LoanConfig>(loanConfigurations["personal-loan"]);
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      setAmount(0);
      setRate(0);
      setTenure(0);
      setIsInitialized(true);
    }
  }, [selectedLoan, isInitialized]);

  const { emi, totalPayment, totalInterest } = useMemo(
    () => calculateEmi(amount, rate, tenure),
    [amount, rate, tenure],
  );

  const principalPercent = amount && totalPayment > 0 ? Math.max(0, Math.min(100, (amount / totalPayment) * 100)) : 0;

  const handleLoanChange = (loanId: string) => {
    const newLoan = loanConfigurations[loanId];
    setSelectedLoan(newLoan);
    setIsInitialized(false); // Reset to generate new random values
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 0;
    setAmount(Math.max(0, value));
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 0;
    setRate(Math.max(0, value));
  };

  const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 0;
    setTenure(Math.max(0, value));
  };
  const showAmount=selectedLoan.name==="Personal Loan"||selectedLoan.name==="Business Loan";

  return (
    <section className="rounded-3xl p-4 md:p-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">EMI Calculator</h2>
        <p className="mt-2 text-sm text-slate-600">Select a loan type and calculate your monthly EMI</p>
      </div>

      {/* Loan Type Selection - Horizontal Buttons */}
      <div className="mb-8 flex flex-wrap gap-3">
        {PRIMARY_LOANS.map((loanId) => {
          const loan = loanConfigurations[loanId];
          return (
            <button
              key={loanId}
              onClick={() => handleLoanChange(loanId)}
              className={`rounded-lg border-2 px-6 py-3 font-semibold transition-all ${
                selectedLoan.id === loanId
                  ? "border-sky-500 bg-sky-100 text-sky-700"
                  : "border-slate-300 bg-white text-slate-700 hover:border-sky-400"
              }`}
            >
              <span className="mr-2">{loan.icon}</span>
              {loan.name}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1.2fr] min-h-[600px]">
        {/* Left Sidebar - Loan Image & Details */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col h-full">
          {/* Loan Image */}
          <div className="rounded-2xl relative w-full h-64 mb-6 overflow-hidden flex-shrink-0">
            <Image
              src={selectedLoan.image}
              alt={selectedLoan.name}
              fill
              className="object-contain"
              sizes="(max-width: 720px) 100vw, 50vw"
            />
          </div>

          {/* Loan Details */}
          <div className="space-y-4 flex-1 overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-900">{selectedLoan.name}</h3>

<div>
  <p className="text-xs font-semibold uppercase text-slate-500">Interest Rate</p>
  <p className="font-semibold text-slate-900 mt-1">
    {selectedLoan.minRate.toFixed(2)}% p.a.
  </p>
</div>

{showAmount && (
  <div>
  <p className="text-xs font-semibold uppercase text-slate-500">Max Loan Amount</p>
  <p className="font-semibold text-slate-900 mt-1">upto {selectedLoan.maxAmount}</p>
</div>
)}

            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Key Benefits</p>
              <ul className="mt-2 space-y-1">
                {selectedLoan.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Basic Documents</p>
              <ul className="mt-2 space-y-1">
                {selectedLoan.documents.slice(0, 2).map((doc) => (
                  <li key={doc} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href={`/loans/${selectedLoan.id}/apply`}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 flex-shrink-0"
          >
            Apply Now
          </Link>
        </div>

        {/* Right Side - Calculator */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col h-full">
          {/* Pie Chart */}
          <div className="flex justify-center mb-6 flex-shrink-0">
            <div
              className="relative h-48 w-48 rounded-full"
              style={{
                background: `conic-gradient(#0891b2 ${principalPercent}%, #1e40af ${principalPercent}% 100%)`,
              }}
              aria-label="Principal versus interest chart"
              role="img"
            >
              <div className="absolute inset-6 flex flex-col items-center justify-center rounded-full bg-white text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Monthly EMI</p>
                <p className="text-2xl font-bold text-slate-900">{rupee.format(emi)}</p>
              </div>
            </div>
          </div>

          {/* Input Fields - Smaller Width */}
          <div className="space-y-4 flex-1 overflow-y-auto">
            {/* Loan Amount Input */}
            <div className="max-w-xs">
              <label htmlFor="amount" className="block text-sm font-semibold text-slate-700 mb-2">
                Loan Amount (₹)
              </label>
              <input
                id="amount"
                type="number"
                value={amount || ""}
                onChange={handleAmountChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Enter loan amount"
              />
            </div>

            {/* Tenure Input */}
            <div className="max-w-xs">
              <label htmlFor="tenure" className="block text-sm font-semibold text-slate-700 mb-2">
                Tenure (Months)
              </label>
              <input
                id="tenure"
                type="number"
                value={tenure || ""}
                onChange={handleTenureChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Enter tenure"
              />
            </div>

            {/* Interest Rate Input */}
            <div className="max-w-xs">
              <label htmlFor="rate" className="block text-sm font-semibold text-slate-700 mb-2">
                Interest Rate (% p.a.)
              </label>
              <input
                id="rate"
                type="number"
                value={rate || ""}
                onChange={handleRateChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Enter rate"
              />
            </div>

            {/* Summary */}
            <div className="grid gap-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm mt-6 max-w-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Principal</span>
                <span className="font-semibold text-slate-900">{rupee.format(amount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Interest</span>
                <span className="font-semibold text-slate-900">{rupee.format(totalInterest)}</span>
              </div>
              <div className="border-t border-sky-300 pt-3 mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-lg font-bold text-sky-600">{rupee.format(totalPayment)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
