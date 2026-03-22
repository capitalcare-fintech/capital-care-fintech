"use client";

import { useState } from "react";

type EmploymentType = "salaried" | "self-employed-business" | "self-employed-professional";
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

const mockOtpValue = "1234";

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

export default function PersonalLoanPage() {
  const [step, setStep] = useState(1);
  const [employmentType, setEmploymentType] = useState<EmploymentType | "">("");
  const [creditScore, setCreditScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [otpStage, setOtpStage] = useState<"pending" | "sent" | "verified">("pending");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");

  const [formData, setFormData] = useState({
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
    residenceType: "" as ResidenceType | "",

    panNumber: "",
    desiredLoanAmount: "",
  });

  const eligibleOffers = formData.desiredLoanAmount
    ? loanProviders.filter((provider) => (creditScore ?? 0) >= provider.minCreditScore)
    : [];

  const progress = Math.round((step / 6) * 100);

  const updateField = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSendOtp = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Valid email is required.");
      return;
    }
    if (!formData.mobile.trim() || !/^\d{10,}$/.test(formData.mobile.replace(/\D/g, ""))) {
      setError("Valid mobile number is required.");
      return;
    }
    if (!formData.gender) {
      setError("Gender is required.");
      return;
    }
    if (!formData.dob) {
      setError("Date of birth is required.");
      return;
    }

    setGeneratedOtp(mockOtpValue);
    setOtpStage("sent");
    setError("");
  };

  const handleVerifyOtp = () => {
    if (!enteredOtp.trim()) {
      setError("Please enter OTP.");
      return;
    }
    if (enteredOtp === mockOtpValue) {
      setOtpStage("verified");
      setError("");
      setStep(2);
      setEnteredOtp("");
    } else {
      setError("Invalid OTP. Please try again.");
    }
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
      } else if (employmentType === "self-employed-business") {
        if (!formData.annualTurnover.trim()) validationError = "Annual turnover is required.";
        if (!formData.businessDetails.trim()) validationError = "Business details are required.";
      } else if (employmentType === "self-employed-professional") {
        if (!formData.professionType.trim()) validationError = "Profession type is required.";
        if (!formData.annualTurnover.trim()) validationError = "Annual income is required.";
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
      fetchCreditScore();
    }
  };

  const fetchCreditScore = async () => {
    setLoading(true);
    setError("");
    try {
      const nameParts = formData.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "NA";

      const response = await fetch("/api/credit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          gender: formData.gender,
          dob: formData.dob,
          email: formData.email,
          mobile: formData.mobile,
        }),
      });

      const data: CreditScoreApiResponse = await response.json();

      if (!response.ok || !data.success || !data.data) {
        setError(data.error || "Failed to fetch credit score.");
        return;
      }

      setCreditScore(data.data.credit_score);
      setStep(6);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setEmploymentType("");
    setCreditScore(null);
    setError("");
    setOtpStage("pending");
    setGeneratedOtp("");
    setEnteredOtp("");
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
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Personal Loan</h1>
          <p className="mt-2 text-sm text-gray-600">Fast approval, transparent process, simple documentation</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Step {step} of 6</span>
            <span className="text-sm font-semibold text-indigo-600">{progress}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-2 rounded-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border-l-4 border-red-500 p-4 flex gap-3">
            <AlertIcon />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Main Card */}
        <div className="rounded-lg bg-white shadow-sm p-8">
          {/* Step 1: Personal Details + OTP */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>
                <p className="mt-1 text-sm text-gray-600">Please provide your basic information</p>
              </div>

              {otpStage === "pending" && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="As per PAN"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="your@email.com"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                      <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => updateField("mobile", e.target.value)}
                        placeholder="10-digit mobile"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => updateField("gender", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-indigo-700 transition"
                  >
                    Send OTP
                  </button>
                </>
              )}

              {(otpStage === "sent" || otpStage === "verified") && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 flex gap-2">
                    <InfoIcon />
                    <p className="text-sm text-blue-800">
                      OTP sent to <strong>{formData.mobile}</strong>
                      {generatedOtp && (
                        <span className="block text-xs mt-1">Test OTP: <strong>{generatedOtp}</strong></span>
                      )}
                    </p>
                  </div>

                  {otpStage === "verified" ? (
                    <div className="rounded-lg bg-green-50 border border-green-200 p-3 flex gap-2">
                      <CheckIcon />
                      <p className="text-sm text-green-800">OTP verified successfully</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Enter 4-Digit OTP</label>
                        <input
                          type="text"
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value.slice(0, 4))}
                          placeholder="0000"
                          maxLength={4}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-lg tracking-widest font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-indigo-700 transition"
                      >
                        Verify OTP
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Employment Type */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Employment Type</h2>
                <p className="mt-1 text-sm text-gray-600">How do you earn your income?</p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { value: "salaried", label: "Salaried", desc: "Fixed monthly income" },
                  { value: "self-employed-business", label: "Business", desc: "Run a business" },
                  { value: "self-employed-professional", label: "Professional", desc: "Doctor, CA, etc." },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleEmploymentSelect(opt.value as EmploymentType)}
                    className="rounded-lg border-2 border-gray-200 p-4 text-left hover:border-indigo-500 hover:bg-indigo-50 transition"
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
                <h2 className="text-xl font-bold text-gray-900">Employment Information</h2>
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
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </>
                )}

                {employmentType === "self-employed-business" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Turnover</label>
                      <input
                        value={formData.annualTurnover}
                        onChange={(e) => updateField("annualTurnover", e.target.value)}
                        placeholder="₹"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business Details</label>
                      <input
                        value={formData.businessDetails}
                        onChange={(e) => updateField("businessDetails", e.target.value)}
                        placeholder="Type, firm name, etc."
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </>
                )}

                {employmentType === "self-employed-professional" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Profession Type</label>
                      <input
                        value={formData.professionType}
                        onChange={(e) => updateField("professionType", e.target.value)}
                        placeholder="e.g., Doctor, CA, Lawyer"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income</label>
                      <input
                        value={formData.annualTurnover}
                        onChange={(e) => updateField("annualTurnover", e.target.value)}
                        placeholder="₹"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-indigo-700 transition"
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
                <h2 className="text-xl font-bold text-gray-900">Residence Details</h2>
                <p className="mt-1 text-sm text-gray-600">Current residential information</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Your city"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">PIN Code</label>
                  <input
                    value={formData.pinCode}
                    onChange={(e) => updateField("pinCode", e.target.value)}
                    placeholder="6-digit PIN"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                          ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                          : "border-gray-200 text-gray-900 hover:border-indigo-300"
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
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-indigo-700 transition"
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
                <h2 className="text-xl font-bold text-gray-900">Financial Details</h2>
                <p className="mt-1 text-sm text-gray-600">Loan amount and tax details</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number</label>
                <input
                  value={formData.panNumber}
                  onChange={(e) => updateField("panNumber", e.target.value.toUpperCase())}
                  placeholder="AAABP1234A"
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
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
                          ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                          : "border-gray-200 text-gray-900 hover:border-indigo-300"
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
                  onClick={handleNextStep}
                  disabled={loading}
                  className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white text-sm hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? "Checking..." : "View Offers"}
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Loan Offers */}
          {step === 6 && creditScore !== null && (
            <div className="space-y-6">
              <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-4">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Your Score</p>
                <p className="text-3xl font-bold text-indigo-900 mt-2">{creditScore}</p>
              </div>

              {eligibleOffers.length === 0 ? (
                <div className="rounded-lg bg-amber-50 border border-amber-300 p-4 flex gap-2">
                  <AlertIcon />
                  <p className="text-sm text-amber-800">No offers available. Please try again later.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-600">{eligibleOffers.length} Offers Available</p>

                  {eligibleOffers.map((offer) => (
                    <div key={offer.name} className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition">
                      {/* Provider Header */}
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold text-xs">
                          {offer.logo}
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm">{offer.name}</h3>
                      </div>

                      {/* Details Grid */}
                      <div className="px-4 py-3 grid grid-cols-2 gap-3 md:grid-cols-4 text-xs">
                        <div>
                          <p className="text-gray-600 flex items-center gap-1 mb-1">
                            <ClockIcon />
                            Processing
                          </p>
                          <p className="font-semibold text-gray-900">{offer.processingTime}</p>
                        </div>

                        <div>
                          <p className="text-gray-600 flex items-center gap-1 mb-1">
                            <TrendingUpIcon />
                            Approval
                          </p>
                          <p className="font-semibold text-green-600">{offer.approvalChance}</p>
                        </div>

                        <div>
                          <p className="text-gray-600 flex items-center gap-1 mb-1">
                            <PercentIcon />
                            Rate
                          </p>
                          <p className="font-semibold text-indigo-600">{offer.interestRate}</p>
                        </div>

                        <div>
                          <p className="text-gray-600 font-semibold mb-1">EMI</p>
                          <p className="font-semibold text-gray-900">{offer.emi}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex gap-2">
                        <button className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-white font-semibold text-xs hover:bg-indigo-700 transition">
                          Apply Now
                        </button>
                        <button className="px-3 py-2 text-indigo-600 font-semibold text-xs hover:text-indigo-700 transition">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={resetFlow}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 text-sm hover:bg-gray-50 transition"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
