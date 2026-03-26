"use client";

import { useMemo, useState } from "react";

type EmiCalculatorProps = {
  title?: string;
  minAmount?: number;
  maxAmount?: number;
  defaultAmount?: number;
  minRate?: number;
  maxRate?: number;
  defaultRate?: number;
  minTenure?: number;
  maxTenure?: number;
  defaultTenure?: number;
};

const rupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function calculateEmi(principal: number, annualRatePercent: number, tenureMonths: number) {
  const monthlyRate = annualRatePercent / 12 / 100;

  if (monthlyRate === 0) {
    const emi = principal / tenureMonths;
    return {
      emi,
      totalPayment: emi * tenureMonths,
      totalInterest: 0,
    };
  }

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return { emi, totalPayment, totalInterest };
}

function trackFillPercent(value: number, min: number, max: number) {
  if (max <= min) return 0;
  return ((value - min) / (max - min)) * 100;
}

export function EmiCalculator({
  title = "Personal Loan EMI Calculator",
  minAmount = 100000,
  maxAmount = 5000000,
  defaultAmount = 500000,
  minRate = 8,
  maxRate = 30,
  defaultRate = 12,
  minTenure = 6,
  maxTenure = 84,
  defaultTenure = 36,
}: EmiCalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenure);

  const { emi, totalPayment, totalInterest } = useMemo(
    () => calculateEmi(amount, rate, tenure),
    [amount, rate, tenure],
  );

  const principalPercent = Math.max(0, Math.min(100, (amount / totalPayment) * 100));

  return (
    <section className="rounded-3xl p-6 md:p-8 ">
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">{title}</h2>
        {/* <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
          Reusable widget
        </span> */}
      </div>

      <div className="grid gap-8 md:grid-cols-[220px_1fr] px-35">
        <div className="flex items-center justify-center">
          <div
            className="relative h-44 w-44 rounded-full"
            style={{
              background: `conic-gradient(#0891b2 ${principalPercent}%, #1e40af ${principalPercent}% 100%)`,
            }}
            aria-label="Principal versus interest chart"
            role="img"
          >
            <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Monthly EMI</p>
              <p className="text-lg font-bold text-slate-900">{rupee.format(emi)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <label className="block">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Loan Amount</span>
              <span>{rupee.format(amount)}</span>
            </div>
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-sky-600"
              style={{
                backgroundImage: `linear-gradient(to right, #0284c7 ${trackFillPercent(amount, minAmount, maxAmount)}%, #e2e8f0 ${trackFillPercent(amount, minAmount, maxAmount)}%)`,
              }}
            />
          </label>

          <label className="block">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Rate of Interest</span>
              <span>{rate.toFixed(1)}% p.a.</span>
            </div>
            <input
              type="range"
              min={minRate}
              max={maxRate}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-sky-600"
              style={{
                backgroundImage: `linear-gradient(to right, #0284c7 ${trackFillPercent(rate, minRate, maxRate)}%, #e2e8f0 ${trackFillPercent(rate, minRate, maxRate)}%)`,
              }}
            />
          </label>

          <label className="block">
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Tenure</span>
              <span>{tenure} months</span>
            </div>
            <input
              type="range"
              min={minTenure}
              max={maxTenure}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-sky-600"
              style={{
                backgroundImage: `linear-gradient(to right, #0284c7 ${trackFillPercent(tenure, minTenure, maxTenure)}%, #e2e8f0 ${trackFillPercent(tenure, minTenure, maxTenure)}%)`,
              }}
            />
          </label>

          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Principal</p>
              <p className="font-semibold text-slate-900">{rupee.format(amount)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Total Interest</p>
              <p className="font-semibold text-slate-900">{rupee.format(totalInterest)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Total Payable</p>
              <p className="font-semibold text-slate-900">{rupee.format(totalPayment)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
