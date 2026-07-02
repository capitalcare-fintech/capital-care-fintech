"use client";

import { useMemo, useState, type ChangeEvent } from "react";

const rupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

type EmiResult = {
  emi: number;
  totalPayment: number;
  totalInterest: number;
};

function calculateEmi(principal: number, annualRatePercent: number, tenureYears: number): EmiResult {
  const tenureMonths = Math.max(0, Math.round(tenureYears * 12));
  const monthlyRate = annualRatePercent / 12 / 100;

  if (principal <= 0) {
    return {
      emi: 0,
      totalPayment: 0,
      totalInterest: 0,
    };
  }

  if (tenureMonths <= 0) {
    return {
      emi: 0,
      totalPayment: principal,
      totalInterest: 0,
    };
  }


  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * tenureMonths;

  return {
    emi,
    totalPayment,
    totalInterest: totalPayment - principal,
  };
}

function getSliderBackground(value: number, min: number, max: number) {
  const percent = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, #0369a1 0%, #0369a1 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`;
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function sanitizeNumericInput(value: string, allowDecimal: boolean) {
  const cleaned = value.trim().replace(allowDecimal ? /[^\d.]/g : /[^\d]/g, "");

  if (!allowDecimal) {
    return cleaned.replace(/^0+(?=\d)/, "");
  }

  const dotIndex = cleaned.indexOf(".");
  if (dotIndex === -1) {
    return cleaned.replace(/^0+(?=\d)/, "");
  }

  const integerPart = cleaned.slice(0, dotIndex).replace(/^0+(?=\d)/, "");
  const decimalPart = cleaned.slice(dotIndex + 1).replace(/\./g, "");
  const safeInteger = integerPart === "" ? "0" : integerPart;

  if (cleaned.endsWith(".") && decimalPart.length === 0) {
    return `${safeInteger}.`;
  }

  return `${safeInteger}.${decimalPart}`;
}

function parseInputToNumber(value: string) {
  if (value === "" || value === ".") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatInputValue(value: number, maxFractionDigits: number = 2) {
  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(maxFractionDigits).replace(/\.?0+$/, "");
}

export function EmiCalculatorSlider() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(7);
  const [tenure, setTenure] = useState(5);
  const [amountInput, setAmountInput] = useState("100000");
  const [rateInput, setRateInput] = useState("7");
  const [tenureInput, setTenureInput] = useState("5");

  const { emi, totalPayment, totalInterest } = useMemo(
    () => calculateEmi(amount, rate, tenure),
    [amount, rate, tenure],
  );

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const normalized = sanitizeNumericInput(event.target.value, true);
    const parsed = parseInputToNumber(normalized);
    if (parsed !== null && parsed > 100000000) {
      setAmount(100000000);
      setAmountInput("100000000");
      return;
    }

    setAmountInput(normalized);
    if (parsed !== null) {
      setAmount(clampValue(parsed, 0, 100000000));
    }
  };

  const handleRateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const normalized = sanitizeNumericInput(event.target.value, true);
    const parsed = parseInputToNumber(normalized);
    if (parsed !== null && parsed > 35) {
      setRate(35);
      setRateInput("35");
      return;
    }

    setRateInput(normalized);
    if (parsed !== null) {
      setRate(clampValue(parsed, 7, 35));
    }
  };

  const handleTenureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const normalized = sanitizeNumericInput(event.target.value, true);
    const parsed = parseInputToNumber(normalized);
    if (parsed !== null && parsed > 30) {
      setTenure(30);
      setTenureInput("30");
      return;
    }

    setTenureInput(normalized);
    if (parsed !== null) {
      setTenure(clampValue(parsed, 0, 30));
    }
  };

  const handleAmountBlur = () => {
    const finalValue = clampValue(parseInputToNumber(amountInput) ?? 0, 0, 100000000);
    setAmount(finalValue);
    setAmountInput(formatInputValue(finalValue));
  };

  const handleRateBlur = () => {
    const finalValue = clampValue(parseInputToNumber(rateInput) ?? 7, 7, 35);
    setRate(finalValue);
    setRateInput(formatInputValue(finalValue));
  };

  const handleTenureBlur = () => {
    const finalValue = clampValue(parseInputToNumber(tenureInput) ?? 0, 0, 30);
    setTenure(finalValue);
    setTenureInput(formatInputValue(finalValue));
  };

  const handleAmountSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    setAmount(nextValue);
    setAmountInput(formatInputValue(nextValue));
  };

  const handleRateSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = clampValue(Number(event.target.value), 7, 35);
    setRate(nextValue);
    setRateInput(formatInputValue(nextValue));
  };

  const handleTenureSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    setTenure(nextValue);
    setTenureInput(formatInputValue(nextValue));
  };

  return (
    <section className="rounded-[28px] bg-[#eef3fb] px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-center gap-2 text-center">
          <span className="hidden h-px w-20 bg-slate-300 sm:block" />
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              EMI Calculators
            </h2>
            <p className="mt-2 text-xs text-slate-700 md:text-sm">Help your customers make informed decisions</p>
          </div>
          <span className="hidden h-px w-20 bg-slate-300 sm:block" />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] xl:gap-6">
          <div className="space-y-5 rounded-3xl bg-[#eef3fb] p-1 md:p-2">
            <div>
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <label htmlFor="loan-amount" className="text-base font-medium text-slate-900 md:text-lg">
                  Loan Amount
                </label>
                <div className="flex items-center rounded-md bg-white px-3 py-1.5 text-sm shadow-sm ring-1 ring-slate-200">
                  <span className="mr-1 text-slate-500">₹</span>
                  <input
                    id="loan-amount"
                    type="text"
                    inputMode="decimal"
                    value={amountInput}
                    onChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                    className="w-24 border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
                    min={0}
                    max={100000000}
                  />
                </div>
              </div>
              <input
                aria-label="Loan amount slider"
                type="range"
                min={0}
                max={100000000}
                step={1000}
                value={amount}
                onChange={handleAmountSliderChange}
                className="emi-slider h-2 w-full cursor-pointer appearance-none rounded-full"
                style={{ background: getSliderBackground(amount, 0, 100000000) }}
              />
            </div>

            <div>
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <label htmlFor="interest-rate" className="text-base font-medium text-slate-900 md:text-lg">
                  Rate of Interest (p.a)
                </label>
                <div className="flex items-center rounded-md bg-white px-3 py-1.5 text-sm shadow-sm ring-1 ring-slate-200">
                  <input
                    id="interest-rate"
                    type="text"
                    inputMode="decimal"
                    value={rateInput}
                    onChange={handleRateChange}
                    onBlur={handleRateBlur}
                    className="w-16 border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
                    min={7}
                    max={35}
                    step={0.1}
                  />
                  <span className="ml-1 text-slate-500">%</span>
                </div>
              </div>
              <input
                aria-label="Interest rate slider"
                type="range"
                min={0}
                max={35}
                step={0.1}
                value={rate}
                onChange={handleRateSliderChange}
                className="emi-slider h-2 w-full cursor-pointer appearance-none rounded-full"
                style={{ background: getSliderBackground(rate, 0, 35) }}
              />
            </div>

            <div>
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <label htmlFor="loan-tenure" className="text-base font-medium text-slate-900 md:text-lg">
                  Loan Tenure (Years)
                </label>
                <div className="flex items-center rounded-md bg-white px-3 py-1.5 text-sm shadow-sm ring-1 ring-slate-200">
                  <input
                    id="loan-tenure"
                    type="text"
                    inputMode="decimal"
                    value={tenureInput}
                    onChange={handleTenureChange}
                    onBlur={handleTenureBlur}
                    className="w-16 border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
                    min={0}
                    max={30}
                    step={1}
                  />
                  <span className="ml-1 text-slate-500">Yr</span>
                </div>
              </div>
              <input
                aria-label="Loan tenure slider"
                type="range"
                min={0}
                max={30}
                step={1}
                value={tenure}
                onChange={handleTenureSliderChange}
                className="emi-slider h-2 w-full cursor-pointer appearance-none rounded-full"
                style={{ background: getSliderBackground(tenure, 0, 30) }}
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-100 md:p-7">
            <div className="space-y-5 text-[15px] text-slate-900 md:text-base">
              <div className="flex items-center justify-between gap-3">
                <span>Monthly EMI:</span>
                <span className="font-medium">{rupee.format(Math.round(emi))}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Principal Amount:</span>
                <span className="font-medium">{rupee.format(amount)}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Total Interest:</span>
                <span className="font-medium">{rupee.format(Math.round(totalInterest))}</span>
              </div>

              <div className="pt-2">
                <div className="h-px bg-slate-200" />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1 text-[16px] font-semibold md:text-[17px]">
                <span>Total Amount:</span>
                <span>{rupee.format(Math.round(totalPayment))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmiCalculatorSlider;