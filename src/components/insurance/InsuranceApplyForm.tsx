"use client";

import { useMemo, useState } from "react";
import type { InsuranceType } from "@/lib/insurance-application-config";
import DocumentUploadCard from "./DocumentUploadCard";
import {
  getInsuranceDocumentsByCategory,
  INSURANCE_DOCUMENT_REQUIREMENTS,
} from "./insurance-documents-config";

type InsuranceApplyFormProps = {
  insuranceType: InsuranceType;
  heading: string;
};

type SubmitApiResponse = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  data?: {
    applicationId?: string;
  };
};

type FormDataState = {
  fullName: string;
  mobile: string;
  dob: string;
  email: string;

  coverageFor: string;
  membersCount: string;
  city: string;
  pinCode: string;
  sumInsured: string;
  existingHealthInsurance: string;

  annualIncome: string;
  occupationType: string;
  desiredSumAssured: string;
  policyTermYears: string;
  maritalStatus: string;

  vehicleType: string;
  registrationNumber: string;
  makeModel: string;
  manufacturingYear: string;
  insurancePlanType: string;

  preExistingDisease: string;
  heightCm: string;
  weightKg: string;
  tobaccoUse: string;
  hospitalizationLast2Years: string;

  tobaccoOrAlcoholUse: string;
  majorIllness: string;
  majorIllnessDetails: string;
  nomineeName: string;
  nomineeRelation: string;
  nomineeDob: string;
  existingLifeCover: string;

  isRenewal: string;
  previousInsurer: string;
  policyExpiryDate: string;
  previousClaim: string;
  ncbPercentage: string;
  addons: string[];
};

const initialFormState: FormDataState = {
  fullName: "",
  mobile: "",
  dob: "",
  email: "",

  coverageFor: "",
  membersCount: "",
  city: "",
  pinCode: "",
  sumInsured: "",
  existingHealthInsurance: "",

  annualIncome: "",
  occupationType: "",
  desiredSumAssured: "",
  policyTermYears: "",
  maritalStatus: "",

  vehicleType: "",
  registrationNumber: "",
  makeModel: "",
  manufacturingYear: "",
  insurancePlanType: "",

  preExistingDisease: "",
  heightCm: "",
  weightKg: "",
  tobaccoUse: "",
  hospitalizationLast2Years: "",

  tobaccoOrAlcoholUse: "",
  majorIllness: "",
  majorIllnessDetails: "",
  nomineeName: "",
  nomineeRelation: "",
  nomineeDob: "",
  existingLifeCover: "",

  isRenewal: "",
  previousInsurer: "",
  policyExpiryDate: "",
  previousClaim: "",
  ncbPercentage: "",
  addons: [],
};

const stepLabels = ["Basic Details", "Coverage Details", "Eligibility Details", "Document Upload"];
const mockOtpValue = "1234";

function getTypeLabel(insuranceType: InsuranceType): string {
  if (insuranceType === "health-insurance") return "Health Insurance";
  if (insuranceType === "life-insurance") return "Life Insurance";
  return "Motor Insurance";
}

export default function InsuranceApplyForm({ insuranceType, heading }: InsuranceApplyFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [otpStage, setOtpStage] = useState<"pending" | "sent" | "verified">("pending");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [formData, setFormData] = useState<FormDataState>(initialFormState);
  const [documents, setDocuments] = useState<Record<string, File | null>>({});

  const requiredDocs = useMemo(
    () => INSURANCE_DOCUMENT_REQUIREMENTS[insuranceType].filter((doc) => doc.isRequired),
    [insuranceType],
  );
  const uploadedCount = requiredDocs.filter((doc) => documents[doc.type]).length;

  const updateField = (key: keyof FormDataState, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));

    if (key === "fullName" || key === "mobile" || key === "dob" || key === "email") {
      setOtpStage("pending");
      setGeneratedOtp("");
      setEnteredOtp("");
    }
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
    return maxDate.toISOString().split("T")[0];
  };

  const handleDobChange = (value: string) => {
    const [year] = value.split("-");
    if (year && year.length > 4) return;
    updateField("dob", value);
  };

  const validateBasicDetails = (): string => {
    if (!formData.fullName.trim()) return "Name as per PAN is required.";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      return "Valid 10-digit mobile number is required.";
    }
    if (!formData.dob) return "Date of birth is required.";
    if (calculateAge(formData.dob) < 18) {
      return "You must be at least 18 years old to apply.";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Valid email is required.";
    }
    return "";
  };

  const handleSendOtp = () => {
    const validationError = validateBasicDetails();
    if (validationError) {
      setError(validationError);
      return;
    }

    setGeneratedOtp(mockOtpValue);
    setOtpStage("sent");
    setEnteredOtp("");
    setError("");
  };

  const handleVerifyOtp = () => {
    if (!enteredOtp.trim()) {
      setError("Please enter OTP.");
      return;
    }

    if (enteredOtp !== mockOtpValue) {
      setError("Invalid OTP. Please try again.");
      return;
    }

    setOtpStage("verified");
    setError("");
    setEnteredOtp("");
    setStep(2);
  };

  const handleCoverageForChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      coverageFor: value,
      membersCount: value === "self" ? "1" : "",
    }));
  };

  const toggleAddOn = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      addons: prev.addons.includes(value)
        ? prev.addons.filter((item) => item !== value)
        : [...prev.addons, value],
    }));
  };

  const validateStep = (currentStep: number): string => {
    if (currentStep === 1) {
      const basicValidation = validateBasicDetails();
      if (basicValidation) return basicValidation;
      if (otpStage !== "verified") return "Please verify OTP to continue.";
    }

    if (currentStep === 2) {
      if (insuranceType === "health-insurance") {
        if (!formData.coverageFor) return "Please select who needs to be insured.";
        if (!formData.membersCount) return "Please select members count.";
        if (!formData.city.trim()) return "City is required.";
        if (!formData.pinCode.trim()) return "PIN code is required.";
        if (!/^\d{6}$/.test(formData.pinCode)) return "PIN code must be 6 digits.";
        if (!formData.sumInsured) return "Please select sum insured.";
        if (!formData.existingHealthInsurance) return "Please select existing insurance status.";
      }

      if (insuranceType === "life-insurance") {
        if (!formData.annualIncome) return "Annual income is required.";
        if (!formData.occupationType) return "Occupation type is required.";
        if (!formData.desiredSumAssured) return "Desired sum assured is required.";
        if (!formData.policyTermYears) return "Policy term is required.";
        if (!formData.maritalStatus) return "Marital status is required.";
      }

      if (insuranceType === "motor-insurance") {
        if (!formData.vehicleType) return "Vehicle type is required.";
        if (!formData.registrationNumber.trim()) return "Registration number is required.";
        if (!formData.makeModel.trim()) return "Make and model is required.";
        if (!formData.manufacturingYear) return "Manufacturing year is required.";
        if (!formData.insurancePlanType) return "Insurance plan type is required.";
      }
    }

    if (currentStep === 3) {
      if (insuranceType === "health-insurance") {
        if (!formData.preExistingDisease) return "Please select pre-existing disease status.";
        if (!formData.heightCm.trim()) return "Height is required.";
        if (!formData.weightKg.trim()) return "Weight is required.";
        if (!formData.tobaccoUse) return "Please select tobacco use status.";
        if (!formData.hospitalizationLast2Years) return "Please select hospitalization status.";
      }

      if (insuranceType === "life-insurance") {
        if (!formData.tobaccoOrAlcoholUse) return "Please select tobacco/alcohol use status.";
        if (!formData.majorIllness) return "Please select major illness status.";
        if (formData.majorIllness === "yes" && !formData.majorIllnessDetails.trim()) {
          return "Please add major illness details.";
        }
        if (!formData.nomineeName.trim()) return "Nominee name is required.";
        if (!formData.nomineeRelation.trim()) return "Nominee relation is required.";
        if (!formData.nomineeDob) return "Nominee DOB is required.";
      }

      if (insuranceType === "motor-insurance") {
        if (!formData.isRenewal) return "Please select policy type (new or renewal).";
        if (formData.isRenewal === "yes" && !formData.previousInsurer.trim()) {
          return "Previous insurer is required for renewal.";
        }
        if (formData.isRenewal === "yes" && !formData.policyExpiryDate) {
          return "Policy expiry date is required for renewal.";
        }
        if (!formData.previousClaim) return "Please select claim history.";
      }
    }

    return "";
  };

  const handleNext = () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setError("");
    if (step === 1 && otpStage !== "pending") {
      setOtpStage("pending");
      setGeneratedOtp("");
      setEnteredOtp("");
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = async () => {
    if (uploadedCount !== requiredDocs.length) {
      setError(`Please upload all ${requiredDocs.length} required documents.`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("insuranceType", insuranceType);
      payload.append("formData", JSON.stringify({
        ...formData,
        addons: formData.addons.join(", "),
      }));

      Object.entries(documents).forEach(([docType, file]) => {
        if (file) payload.append(docType, file);
      });

      const res = await fetch("/api/insurance-applications", {
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
      setStep(5);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const progress = Math.min(Math.round((step / 4) * 100), 100);

  if (step === 5) {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <h1 className="text-2xl font-bold text-emerald-900">Application Submitted</h1>
        <p className="mt-3 text-sm text-emerald-800">
          Your {getTypeLabel(insuranceType)} application has been submitted successfully.
        </p>
        <p className="mt-2 text-sm font-semibold text-emerald-900">Application ID: {applicationId || "Pending"}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 md:text-2xl">{heading}</h1>
        <p className="mt-1 text-sm text-slate-600">{getTypeLabel(insuranceType)} application in 4 quick steps.</p>
      </div>

      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-sky-600 transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mb-8 grid grid-cols-2 gap-2 md:grid-cols-4">
        {stepLabels.map((label, index) => {
          const indexStep = index + 1;
          const active = step === indexStep;
          const completed = step > indexStep;
          return (
            <div
              key={label}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold md:text-sm ${
                active
                  ? "border-sky-300 bg-sky-50 text-sky-700"
                  : completed
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-500"
              }`}
            >
              {indexStep}. {label}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {step === 1 && otpStage === "pending" && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Name as per PAN</span>
              <input
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Enter full name"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Mobile Number</span>
              <input
                value={formData.mobile}
                onChange={(e) => updateField("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                maxLength={10}
                placeholder="10-digit mobile"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Date of Birth</span>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => handleDobChange(e.target.value)}
                max={getMaxDateForAge18()}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="name@example.com"
              />
            </label>
          </div>
        </div>
      )}

      {step === 1 && (otpStage === "sent" || otpStage === "verified") && (
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">Enter OTP sent to {formData.mobile}</p>
            {otpStage === "sent" && (
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="Enter 4-digit OTP"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm sm:max-w-xs"
                  maxLength={4}
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Resend
                </button>
              </div>
            )}

            {otpStage === "verified" && (
              <p className="mt-3 text-sm font-semibold text-emerald-700">✓ OTP verified successfully.</p>
            )}

            {generatedOtp && otpStage === "sent" && (
              <p className="mt-2 text-xs text-slate-500">Mock OTP for testing: {generatedOtp}</p>
            )}
          </div>
        </div>
      )}

      {step === 2 && insuranceType === "health-insurance" && (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Who to insure</span>
            <select
              value={formData.coverageFor}
              onChange={(e) => handleCoverageForChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="self">Self</option>
              <option value="self-family">Self + Family</option>
              <option value="parents">Parents</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Members count</span>
            <select
              value={formData.membersCount}
              onChange={(e) => updateField("membersCount", e.target.value)}
              disabled={formData.coverageFor === "self"}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4+">4+</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">City</span>
            <input
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">PIN Code</span>
            <input
              value={formData.pinCode}
              onChange={(e) => updateField("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Preferred sum insured</span>
            <select
              value={formData.sumInsured}
              onChange={(e) => updateField("sumInsured", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="500000">5 Lakh</option>
              <option value="1000000">10 Lakh</option>
              <option value="2000000">20 Lakh</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Existing health insurance</span>
            <select
              value={formData.existingHealthInsurance}
              onChange={(e) => updateField("existingHealthInsurance", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </div>
      )}

      {step === 2 && insuranceType === "life-insurance" && (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Annual income</span>
            <input
              value={formData.annualIncome}
              onChange={(e) => updateField("annualIncome", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="e.g. 800000"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Occupation type</span>
            <select
              value={formData.occupationType}
              onChange={(e) => updateField("occupationType", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-employed</option>
              <option value="business">Business</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Desired sum assured</span>
            <select
              value={formData.desiredSumAssured}
              onChange={(e) => updateField("desiredSumAssured", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="2500000">25 Lakh</option>
              <option value="5000000">50 Lakh</option>
              <option value="10000000">1 Crore</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Policy term (years)</span>
            <select
              value={formData.policyTermYears}
              onChange={(e) => updateField("policyTermYears", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="10">10 Years</option>
              <option value="20">20 Years</option>
              <option value="30">30 Years</option>
            </select>
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Marital status</span>
            <select
              value={formData.maritalStatus}
              onChange={(e) => updateField("maritalStatus", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </label>
        </div>
      )}

      {step === 2 && insuranceType === "motor-insurance" && (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Vehicle type</span>
            <select
              value={formData.vehicleType}
              onChange={(e) => updateField("vehicleType", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Registration number</span>
            <input
              value={formData.registrationNumber}
              onChange={(e) => updateField("registrationNumber", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="MH12AB1234"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Make and model</span>
            <input
              value={formData.makeModel}
              onChange={(e) => updateField("makeModel", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Maruti Swift"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Manufacturing year</span>
            <input
              type="number"
              value={formData.manufacturingYear}
              onChange={(e) => updateField("manufacturingYear", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              min="1990"
              max={new Date().getFullYear()}
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Insurance type</span>
            <select
              value={formData.insurancePlanType}
              onChange={(e) => updateField("insurancePlanType", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="third-party">Third-party</option>
              <option value="comprehensive">Comprehensive</option>
            </select>
          </label>
        </div>
      )}

      {step === 3 && insuranceType === "health-insurance" && (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Any pre-existing disease?</span>
            <select
              value={formData.preExistingDisease}
              onChange={(e) => updateField("preExistingDisease", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Tobacco use</span>
            <select
              value={formData.tobaccoUse}
              onChange={(e) => updateField("tobaccoUse", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Height (cm)</span>
            <input
              type="number"
              value={formData.heightCm}
              onChange={(e) => updateField("heightCm", e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              min="0"
              max="300"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Weight (kg)</span>
            <input
              type="number"
              value={formData.weightKg}
              onChange={(e) => updateField("weightKg", e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              min="0"
              max="300"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Hospitalized in last 2 years?</span>
            <select
              value={formData.hospitalizationLast2Years}
              onChange={(e) => updateField("hospitalizationLast2Years", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </div>
      )}

      {step === 3 && insuranceType === "life-insurance" && (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Tobacco/Alcohol use</span>
            <select
              value={formData.tobaccoOrAlcoholUse}
              onChange={(e) => updateField("tobaccoOrAlcoholUse", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Major illness history</span>
            <select
              value={formData.majorIllness}
              onChange={(e) => updateField("majorIllness", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          {formData.majorIllness === "yes" && (
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Major illness details</span>
              <textarea
                value={formData.majorIllnessDetails}
                onChange={(e) => updateField("majorIllnessDetails", e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                rows={3}
              />
            </label>
          )}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Nominee name</span>
            <input
              value={formData.nomineeName}
              onChange={(e) => updateField("nomineeName", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Nominee relation</span>
            <input
              value={formData.nomineeRelation}
              onChange={(e) => updateField("nomineeRelation", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Nominee DOB</span>
            <input
              type="date"
              value={formData.nomineeDob}
              onChange={(e) => updateField("nomineeDob", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Existing life cover (optional)</span>
            <input
              value={formData.existingLifeCover}
              onChange={(e) => updateField("existingLifeCover", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
        </div>
      )}

      {step === 3 && insuranceType === "motor-insurance" && (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Is this a renewal?</span>
            <select
              value={formData.isRenewal}
              onChange={(e) => updateField("isRenewal", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No (new policy)</option>
            </select>
          </label>
          {formData.isRenewal === "yes" && (
            <>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Previous insurer</span>
                <input
                  value={formData.previousInsurer}
                  onChange={(e) => updateField("previousInsurer", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Policy expiry date</span>
                <input
                  type="date"
                  value={formData.policyExpiryDate}
                  onChange={(e) => updateField("policyExpiryDate", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
            </>
          )}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Any claim in last year?</span>
            <select
              value={formData.previousClaim}
              onChange={(e) => updateField("previousClaim", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">NCB Percentage (optional)</span>
            <input
              value={formData.ncbPercentage}
              onChange={(e) => updateField("ncbPercentage", e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="e.g. 20"
            />
          </label>
          <div className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Add-ons needed (optional)</span>
            <div className="grid gap-2 md:grid-cols-3">
              {["zero-dep", "roadside-assistance", "engine-protect"].map((addon) => (
                <label key={addon} className="flex items-center gap-2 rounded border border-slate-200 p-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.addons.includes(addon)}
                    onChange={() => toggleAddOn(addon)}
                  />
                  <span>{addon}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          {getInsuranceDocumentsByCategory(insuranceType).map((group) => (
            <div key={group.name} className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">{group.name}</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {group.documents.map((doc) => (
                  <DocumentUploadCard
                    key={doc.type}
                    type={doc.type}
                    label={doc.label}
                    isRequired={doc.isRequired}
                    file={documents[doc.type] ?? null}
                    onFileSelect={(file) => setDocuments((prev) => ({ ...prev, [doc.type]: file }))}
                    onRemove={() => setDocuments((prev) => ({ ...prev, [doc.type]: null }))}
                  />
                ))}
              </div>
            </div>
          ))}

          <p className="text-sm text-slate-600">
            Required uploaded: {uploadedCount} / {requiredDocs.length}
          </p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={(step === 1 && otpStage === "pending") || loading}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>

        {step === 1 && otpStage === "pending" ? (
          <button
            type="button"
            onClick={handleSendOtp}
            className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Send OTP
          </button>
        ) : step === 1 && otpStage === "verified" ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Next
          </button>
        ) : step < 4 && step > 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Continue
          </button>
        ) : step === 4 ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        ) : null}
      </div>
    </section>
  );
}
