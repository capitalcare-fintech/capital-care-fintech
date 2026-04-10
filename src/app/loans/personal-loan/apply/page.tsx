"use client";

import { useState } from "react";
import DocumentUploadCard from "./document-upload-card";
import { DOCUMENT_REQUIREMENTS, getDocumentsByCategory } from "./documents-config";

type EmploymentType = "salaried" | "self-employed";
type ResidenceType = "owned" | "owned-by-parents" | "rented";

type LoanProvider = {
  name: string;
  logo: string;
  processingTime: string;
  approvalChance: string;
  interestRate: string;
  emi: string;
  minCreditScore: number;
};

type SubmitApiResponse = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  data?: {
    applicationId?: string;
  };
};

type CreditScoreApiResponse = {
  success: boolean;
  data?: {
    name: string;
    credit_score: number;
    date: string;
    next_update_in: string;
  };
  error?: string;
};

const loanProviders: LoanProvider[] = [
  {
    name: "Axis FastLoan",
    logo: "AF",
    processingTime: "24 hours",
    approvalChance: "High",
    interestRate: "10.50% p.a.",
    emi: "INR 2,149 / lakh",
    minCreditScore: 700,
  },
  {
    name: "Nova Finance",
    logo: "NF",
    processingTime: "48 hours",
    approvalChance: "Medium",
    interestRate: "12.20% p.a.",
    emi: "INR 2,233 / lakh",
    minCreditScore: 650,
  },
  {
    name: "Urban Credit",
    logo: "UC",
    processingTime: "72 hours",
    approvalChance: "Moderate",
    interestRate: "14.00% p.a.",
    emi: "INR 2,320 / lakh",
    minCreditScore: 600,
  },
  {
    name: "People Trust Bank",
    logo: "PT",
    processingTime: "Same day",
    approvalChance: "Very High",
    interestRate: "9.90% p.a.",
    emi: "INR 2,120 / lakh",
    minCreditScore: 740,
  },
];


// Simple SVG Icon Components
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const PercentIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M6 2a1 1 0 100 2 1 1 0 000-2zM4 5a2 2 0 11 4 0 2 2 0 01-4 0zM8 14a1 1 0 100 2 1 1 0 000-2zm-2 3a2 2 0 11 4 0 2 2 0 01-4 0zm6-14a1 1 0 110 2 1 1 0 010-2z" />
  </svg>
);

const stepLabels = [
  "Personal Details",
  "Employment Type",
  "Employment Info",
  "Residence Details",
  "Financial Details",
  "Document Upload",
  "Confirmation",
];

export default function PersonalLoanPage() {
  const [step, setStep] = useState(1);
  const [employmentType, setEmploymentType] = useState<EmploymentType | "">("");
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: typeof window !== "undefined" ? (sessionStorage.getItem("otp_verified_mobile") ?? "") : "",
    gender: "",
    dob: "",

    yearlyIncome: "",
    employerName: "",
    annualTurnover: "",
    businessDetails: "",
    professionType: "",

    city: "",
    pinCode: "",
    residenceType: "" as ResidenceType | "",

    panNumber: "",
    desiredLoanAmount: "",
  });

  const eligibleOffers = formData.desiredLoanAmount
    ? loanProviders.filter((provider) => (creditScore ?? 0) >= provider.minCreditScore)
    : [];

  const [documents, setDocuments] = useState<Record<string, File | null>>({});
  const documentConfig = employmentType ? DOCUMENT_REQUIREMENTS[employmentType as "salaried" | "self-employed"] : [];
  const requiredDocs = documentConfig.filter(d => d.isRequired);
  const uploadedCount = requiredDocs.filter(d => documents[d.type]).length;

  const progress = Math.round((step / 7) * 100);

  const updateField = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const calculateAge = (dateString: string): number => {
    if (!dateString) return 0;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getMaxDateForAge18 = (): string => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  const handleEmploymentSelect = (value: EmploymentType) => {
    setEmploymentType(value);
    setError("");
    setStep(3);
  };

  const handleNextStep = () => {
    if (step === 3) {
      if (!employmentType) {
        setError("Please select employment type.");
        return;
      }

      let validationError = "";
      if (employmentType === "salaried") {
        if (!formData.yearlyIncome.trim()) validationError = "Yearly income is required.";
        if (!formData.employerName.trim()) validationError = "Employer name is required.";
      } else if (employmentType === "self-employed") {
        if (!formData.annualTurnover.trim()) validationError = "Annual income is required.";
        if (!formData.businessDetails.trim()) validationError = "Business/Profession details are required.";
      }

      if (validationError) {
        setError(validationError);
        return;
      }

      setError("");
      setStep(4);
    } else if (step === 4) {
      if (!formData.city.trim()) {
        setError("City is required.");
        return;
      }
      if (!formData.pinCode.trim()) {
        setError("PIN code is required.");
        return;
      }
      if (!formData.residenceType) {
        setError("Residence type is required.");
        return;
      }

      setError("");
      setStep(5);
    } else if (step === 5) {
      if (!formData.panNumber.trim()) {
        setError("PAN number is required.");
        return;
      }
      if (!formData.desiredLoanAmount) {
        setError("Desired loan amount is required.");
        return;
      }

      setError("");
      setStep(6);
    }
  };

  const handleSubmitApplication = async () => {
    if (uploadedCount !== requiredDocs.length) {
      setError(`Please upload all ${requiredDocs.length} required documents`);
      return;
    }

    if (!employmentType) {
      setError("Please select employment type.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("loanType", "personal-loan");
      payload.append("loanSubtype", employmentType);
      payload.append("formData", JSON.stringify(formData));

      Object.entries(documents).forEach(([docType, file]) => {
        if (file) payload.append(docType, file);
      });

      const res = await fetch("/api/loan-applications", {
        method: "POST",
        body: payload,
      });

      const result = (await res.json()) as SubmitApiResponse;
      if (!res.ok || !result?.success) {
        const firstFieldError = result?.fieldErrors
          ? Object.values(result.fieldErrors)[0]?.[0]
          : "";
        setError(firstFieldError || result?.error || "Submission failed. Please try again.");
        return;
      }

      setApplicationId(result?.data?.applicationId ?? "");
      setCreditScore(720);
      setStep(7);
    } catch (submitError) {
      console.error("[personal-loan/apply] submit error", submitError);
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setEmploymentType("");
    setCreditScore(null);
    setApplicationId("");
    setError("");
    setDocuments({});
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      gender: "",
      dob: "",
      yearlyIncome: "",
      employerName: "",
      annualTurnover: "",
      businessDetails: "",
      professionType: "",
      city: "",
      pinCode: "",
      residenceType: "",
      panNumber: "",
      desiredLoanAmount: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border-l-4 border-red-500 p-4 flex gap-3">
            <AlertIcon />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Main Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">Personal Loan</h1>
            <p className="text-sm text-slate-600 mb-8">Fast approval, transparent process, simple documentation</p>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-sky-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7">
              {stepLabels.map((label, index) => {
                const currentStep = index + 1;
                const isActive = step === currentStep;
                const isComplete = step > currentStep;

                return (
                  <div
                    key={label}
                    className={`rounded-lg border px-3 py-2 text-center text-xs font-semibold md:text-sm ${
                      isActive
                        ? "border-sky-300 bg-sky-50 text-sky-700"
                        : isComplete
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-slate-50 text-slate-500"
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Personal Details</h2>
                <p className="mt-1 text-sm text-gray-600">Please provide your basic information</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="As per PAN"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    readOnly
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => updateField("gender", e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => updateField("dob", e.target.value)}
                    max={getMaxDateForAge18()}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!formData.fullName.trim()) { setError("Full name is required."); return; }
                  if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError("Valid email is required."); return; }
                  if (!formData.gender) { setError("Gender is required."); return; }
                  if (!formData.dob) { setError("Date of birth is required."); return; }
                  if (calculateAge(formData.dob) < 18) { setError("You must be at least 18 years old to apply."); return; }
                  setError(""); setStep(2);
                }}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Employment Type */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Employment Type</h2>
                <p className="mt-1 text-sm text-gray-600">How do you earn your income?</p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { value: "salaried", label: "Salaried", desc: "Fixed monthly income" },
                  { value: "self-employed", label: "Self Employed", desc: "Business or profession" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleEmploymentSelect(opt.value as EmploymentType)}
                    className="rounded-lg border-2 border-gray-200 p-4 text-left hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <p className="font-semibold text-gray-900 text-sm">{opt.label}</p>
                    <p className="text-xs text-gray-600 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Employment Details */}
          {step === 3 && employmentType && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Employment Information</h2>
                <p className="mt-1 text-sm text-gray-600">Tell us more about your income</p>
              </div>

              <div className="space-y-4">
                {employmentType === "salaried" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Yearly Income</label>
                      <select
                        value={formData.yearlyIncome}
                        onChange={(e) => updateField("yearlyIncome", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select range</option>
                        <option value="3-5">₹3 - ₹5 Lacs</option>
                        <option value="5-10">₹5 - ₹10 Lacs</option>
                        <option value="10-20">₹10 - ₹20 Lacs</option>
                        <option value="20-50">₹20 - ₹50 Lacs</option>
                        <option value="50+">₹50 Lacs +</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Employer Name</label>
                      <input
                        value={formData.employerName}
                        onChange={(e) => updateField("employerName", e.target.value)}
                        placeholder="Your company"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}

                {employmentType === "self-employed" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={formData.annualTurnover}
                        onChange={(e) => updateField("annualTurnover", e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="₹"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business/Profession Details</label>
                      <input
                        value={formData.businessDetails}
                        onChange={(e) => updateField("businessDetails", e.target.value)}
                        placeholder="e.g., Type of business or profession"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 text-sm hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-blue-700 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Residence Details */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Residence Details</h2>
                <p className="mt-1 text-sm text-gray-600">Current residential information</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Your city"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">PIN Code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.pinCode}
                    onChange={(e) => updateField("pinCode", e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                    maxLength={6}
                    placeholder="6-digit PIN"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Residence Type</p>
                <div className="grid gap-2 md:grid-cols-3">
                  {[
                    { value: "owned", label: "Owned" },
                    { value: "owned-by-parents", label: "Family Owned" },
                    { value: "rented", label: "Rented" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateField("residenceType", opt.value)}
                      className={`rounded-lg border-2 p-3 text-sm font-semibold transition ${
                        formData.residenceType === opt.value
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-gray-200 text-gray-900 hover:border-blue-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 text-sm hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-blue-700 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Financial Details */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Financial Details</h2>
                <p className="mt-1 text-sm text-gray-600">Loan amount and tax details</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number</label>
                <input
                  value={formData.panNumber}
                  onChange={(e) => updateField("panNumber", e.target.value.toUpperCase())}
                  placeholder="AAABP1234A"
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Desired Loan Amount</p>
                <div className="grid gap-2 md:grid-cols-3">
                  {[
                    "Upto ₹1 Lac",
                    "₹1 - ₹3 Lacs",
                    "₹3 - ₹5 Lacs",
                    "₹5 - ₹7 Lacs",
                    "₹7 - ₹10 Lacs",
                    "₹10 Lacs +",
                  ].map((amount, idx) => (
                    <button
                      key={idx}
                      onClick={() => updateField("desiredLoanAmount", amount)}
                      className={`rounded-lg border-2 p-3 text-center text-sm font-semibold transition ${
                        formData.desiredLoanAmount === amount
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-gray-200 text-gray-900 hover:border-blue-300"
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 text-sm hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(6)}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-blue-700 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Document Uploads */}
          {step === 6 && employmentType && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Upload Documents</h2>
                <p className="mt-1 text-sm text-gray-600">You may upload these documents, our team will reach out to you.</p>
              </div>

              {/* <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 flex gap-2">
                <InfoIcon />
                <div className="text-sm text-sky-900">
                  <p className="font-semibold">Required: {uploadedCount}/{requiredDocs.length} documents</p>
                  <p className="text-xs mt-1">Upload all mandatory documents to proceed</p>
                </div>
              </div> */}

              <div className="space-y-6">
                {getDocumentsByCategory(employmentType as "salaried" | "self-employed").map((category) => (
                  <div key={category.name}>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">{category.name}</h3>
                    <div className="space-y-3">
                      {category.documents.map((doc) => (
                        <DocumentUploadCard
                          key={doc.type}
                          type={doc.type}
                          label={doc.label}
                          isRequired={doc.isRequired}
                          file={documents[doc.type] || null}
                          onFileSelect={(file) => setDocuments((prev) => ({ ...prev, [doc.type]: file }))}
                          onRemove={() => setDocuments((prev) => ({ ...prev, [doc.type]: null }))}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 text-sm hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmitApplication}
                  disabled={loading}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-blue-700 transition"
                >
                  {loading ? "Submitting..." : "Continue to Submit"}
                </button>
              </div>
            </div>
          )}

          {/* Step 7: Request Submitted */}
          {step === 7 && (
            <div className="space-y-6 text-center py-8">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckIcon />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Request Submitted!</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Your loan application has been submitted successfully.
                </p>
                {applicationId && (
                  <p className="mt-1 text-xs text-gray-500">Application ID: {applicationId}</p>
                )}
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <p className="text-xs text-blue-700">
                  Our team will review your documents and contact you shortly with the next steps.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetFlow}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-blue-700 transition"
                >
                  Apply for Another Loan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
