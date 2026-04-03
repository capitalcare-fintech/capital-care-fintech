"use client";

import { useState } from "react";
import DocumentUploadCard from "./document-upload-card";
import { BusinessApplicantType, DOCUMENT_REQUIREMENTS, getDocumentsByCategory } from "./documents-config";

type ResidenceType = "owned" | "owned-by-family" | "rented";

const mockOtpValue = "1234";

const CheckIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const AlertIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const InfoIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

const stepLabels = [
  "Personal Details",
  "Business Type",
  "Business Info",
  "Residence Details",
  "Financial Details",
  "Document Upload",
  "Confirmation",
];

export default function BusinessLoanApplyPage() {
  const [step, setStep] = useState(1);
  const [applicantType, setApplicantType] = useState<BusinessApplicantType | "">("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const [otpStage, setOtpStage] = useState<"pending" | "sent" | "verified">("pending");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",

    businessName: "",
    annualTurnover: "",
    businessNature: "",
    yearsInOperation: "",

    city: "",
    pinCode: "",
    officeCity: "",
    residenceType: "" as ResidenceType | "",

    panNumber: "",
    desiredLoanAmount: "",
  });

  const [documents, setDocuments] = useState<Record<string, File | null>>({});

  const documentConfig = applicantType ? DOCUMENT_REQUIREMENTS[applicantType] : [];
  const requiredDocs = documentConfig.filter((d) => d.isRequired);
  const uploadedCount = requiredDocs.filter((d) => documents[d.type]).length;

  const progress = Math.round((step / 7) * 100);

  const updateField = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const calculateAge = (dateString: string) => {
    if (!dateString) {
      return 0;
    }
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getMaxDateForAge18 = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split("T")[0];
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
    if (!formData.dob) {
      setError("Date of birth is required.");
      return;
    }
    if (calculateAge(formData.dob) < 18) {
      setError("You must be at least 18 years old to apply for a loan.");
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
      return;
    }

    setError("Invalid OTP. Please try again.");
  };

  const handleApplicantSelect = (value: BusinessApplicantType) => {
    setApplicantType(value);
    setError("");
    setStep(3);
  };

  const handleNextStep = () => {
    if (step === 3) {
      if (!applicantType) {
        setError("Please select applicant type.");
        return;
      }
      if (!formData.businessName.trim()) {
        setError("Business name is required.");
        return;
      }
      if (!formData.annualTurnover.trim()) {
        setError("Annual turnover is required.");
        return;
      }
      if (!formData.businessNature.trim()) {
        setError("Business nature is required.");
        return;
      }

      setError("");
      setStep(4);
      return;
    }

    if (step === 4) {
      if (!formData.city.trim()) {
        setError("City is required.");
        return;
      }
      if (!formData.pinCode.trim()) {
        setError("PIN code is required.");
        return;
      }
      if (!formData.officeCity.trim()) {
        setError("Office city is required.");
        return;
      }
      if (!formData.residenceType) {
        setError("Residence type is required.");
        return;
      }

      setError("");
      setStep(5);
      return;
    }

    if (step === 5) {
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

    if (!applicantType) {
      setError("Please select applicant type.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("loanType", "business-loan");
      payload.append("loanSubtype", applicantType);
      payload.append("formData", JSON.stringify(formData));

      Object.entries(documents).forEach(([docType, file]) => {
        if (file) payload.append(docType, file);
      });

      const res = await fetch("/api/loan-applications", {
        method: "POST",
        body: payload,
      });

      const result = await res.json();
      if (!res.ok || !result?.success) {
        const fieldErrors = result?.fieldErrors as Record<string, string[]> | undefined;
        const firstFieldError = fieldErrors ? Object.values(fieldErrors)[0]?.[0] : "";
        setError(firstFieldError || result?.error || "Submission failed. Please try again.");
        return;
      }

      setApplicationId(result?.data?.applicationId ?? "");
      setStep(7);
    } catch (submitError) {
      console.error("[business-loan/apply] submit error", submitError);
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setApplicantType("");
    setError("");
    setSubmitting(false);
    setApplicationId("");
    setDocuments({});
    setOtpStage("pending");
    setGeneratedOtp("");
    setEnteredOtp("");
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      dob: "",
      businessName: "",
      annualTurnover: "",
      businessNature: "",
      yearsInOperation: "",
      city: "",
      pinCode: "",
      officeCity: "",
      residenceType: "",
      panNumber: "",
      desiredLoanAmount: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {error && (
          <div className="mb-6 flex gap-3 rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
            <AlertIcon />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">Business Loan</h1>
            <p className="text-sm text-slate-600 mb-6">Structured business funding with profile-based document checklist</p>
            <div className="pt-2">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-sky-600 transition-all duration-500" style={{ width: `${progress}%` }} />
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
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Personal Details</h2>
                <p className="mt-1 text-sm text-gray-600">Please provide basic contact details</p>
              </div>

              {otpStage === "pending" && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">Full Name</label>
                      <input
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="As per PAN"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="your@email.com"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">Mobile Number</label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={formData.mobile}
                        onChange={(e) => updateField("mobile", e.target.value.replace(/[^0-9]/g, ""))}
                        maxLength={10}
                        placeholder="10-digit mobile"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">Date of Birth</label>
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
                    onClick={handleSendOtp}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Send OTP
                  </button>
                </>
              )}

              {(otpStage === "sent" || otpStage === "verified") && (
                <div className="space-y-4">
                  <div className="flex gap-2 rounded-lg border border-sky-200 bg-sky-50 p-3">
                    <InfoIcon />
                    <p className="text-sm text-sky-900">
                      OTP sent to <strong>{formData.mobile}</strong>
                      {generatedOtp && (
                        <span className="mt-1 block text-xs">
                          Test OTP: <strong>{generatedOtp}</strong>
                        </span>
                      )}
                    </p>
                  </div>

                  {otpStage === "verified" ? (
                    <div className="flex gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                      <CheckIcon />
                      <p className="text-sm text-emerald-800">OTP verified successfully</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Enter 4-Digit OTP</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                          placeholder="0000"
                          maxLength={4}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-lg font-semibold tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Verify OTP
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Business Type</h2>
                <p className="mt-1 text-sm text-gray-600">Select your company constitution</p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { value: "proprietorship", label: "Proprietorship", desc: "Single owner business" },
                  { value: "partnership", label: "Partnership", desc: "Partner-driven firm" },
                  { value: "private-limited", label: "Private Limited", desc: "Company structure" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleApplicantSelect(opt.value as BusinessApplicantType)}
                    className="rounded-lg border-2 border-gray-200 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
                  >
                    <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                    <p className="mt-1 text-xs text-gray-600">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && applicantType && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Business Information</h2>
                <p className="mt-1 text-sm text-gray-600">Tell us about your business profile</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Business Name</label>
                  <input
                    value={formData.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                    placeholder="Registered business name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Annual Turnover</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.annualTurnover}
                    onChange={(e) => updateField("annualTurnover", e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="Amount in INR"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Business Nature</label>
                  <input
                    value={formData.businessNature}
                    onChange={(e) => updateField("businessNature", e.target.value)}
                    placeholder="Manufacturing / Trading / Services"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Years in Operation</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formData.yearsInOperation}
                    onChange={(e) => updateField("yearsInOperation", e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="Years"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Residence and Office Details</h2>
                <p className="mt-1 text-sm text-gray-600">Current location and residence profile</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Residence City</label>
                  <input
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Your city"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">PIN Code</label>
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

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Office City</label>
                  <input
                    value={formData.officeCity}
                    onChange={(e) => updateField("officeCity", e.target.value)}
                    placeholder="Office location"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-gray-700">Residence Type</p>
                <div className="grid gap-2 md:grid-cols-3">
                  {[
                    { value: "owned", label: "Owned" },
                    { value: "owned-by-family", label: "Owned by Family" },
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
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Financial Details</h2>
                <p className="mt-1 text-sm text-gray-600">Loan requirement and PAN details</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">PAN Number</label>
                <input
                  value={formData.panNumber}
                  onChange={(e) => updateField("panNumber", e.target.value.toUpperCase())}
                  placeholder="AAABP1234A"
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-gray-700">Desired Loan Amount</p>
                <div className="grid gap-2 md:grid-cols-3">
                  {[
                    "Upto INR 10 Lacs",
                    "INR 10 - INR 25 Lacs",
                    "INR 25 - INR 50 Lacs",
                    "INR 50 Lacs - INR 1 Cr",
                    "INR 1 Cr - INR 3 Cr",
                    "INR 3 Cr +",
                  ].map((amount) => (
                    <button
                      key={amount}
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
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 6 && applicantType && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Upload Documents</h2>
                <p className="mt-1 text-sm text-gray-600">Upload all required business documents for verification</p>
              </div>

              <div className="flex gap-2 rounded-lg border border-sky-200 bg-sky-50 p-3">
                <InfoIcon />
                <div className="text-sm text-sky-900">
                  <p className="font-semibold">
                    Required: {uploadedCount}/{requiredDocs.length} documents
                  </p>
                  <p className="mt-1 text-xs">Upload all mandatory documents to proceed</p>
                </div>
              </div>

              <div className="space-y-6">
                {getDocumentsByCategory(applicantType).map((category) => (
                  <div key={category.name}>
                    <h3 className="mb-3 text-sm font-semibold text-gray-700">{category.name}</h3>
                    <div className="space-y-3">
                      {category.documents.map((doc) => (
                        <DocumentUploadCard
                          key={doc.type}
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
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmitApplication}
                  disabled={submitting}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {submitting ? "Submitting..." : "Continue to Submit"}
                </button>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6 py-8 text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckIcon />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Request Submitted!</h2>
                <p className="mt-2 text-sm text-gray-600">Your business loan request has been submitted successfully.</p>
                {applicationId && (
                  <p className="mt-1 text-xs text-gray-500">Application ID: {applicationId}</p>
                )}
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-xs text-blue-700">
                  Our team will review your profile and documents and contact you shortly with next steps.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetFlow}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
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
