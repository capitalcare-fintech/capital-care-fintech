import type { InsuranceType } from "@/lib/insurance-application-config";

export type InsuranceDocumentItem = {
  type: string;
  label: string;
  isRequired: boolean;
  category: string;
};

export const INSURANCE_DOCUMENT_REQUIREMENTS: Record<InsuranceType, InsuranceDocumentItem[]> = {
  "health-insurance": [
    { type: "aadhar_applicant", label: "Aadhaar Card", isRequired: false, category: "Applicant KYC" },
    { type: "pan_applicant", label: "PAN Card", isRequired: false, category: "Applicant KYC" },
    { type: "photo_applicant", label: "Photo", isRequired: false, category: "Applicant KYC" },
    { type: "previous_policy_copy", label: "Previous Policy Copy", isRequired: false, category: "Health Specific" },
    { type: "medical_reports", label: "Recent Medical Reports", isRequired: false, category: "Health Specific" },
  ],
  "life-insurance": [
    { type: "aadhar_applicant", label: "Aadhaar Card", isRequired: false, category: "Applicant KYC" },
    { type: "pan_applicant", label: "PAN Card", isRequired: false, category: "Applicant KYC" },
    { type: "photo_applicant", label: "Photo", isRequired: false, category: "Applicant KYC" },
    { type: "income_proof", label: "Income Proof (ITR/Form 16/Salary Slips)", isRequired: false, category: "Life Specific" },
    { type: "signature", label: "Signature", isRequired: false, category: "Life Specific" },
    { type: "medical_reports", label: "Medical Reports", isRequired: false, category: "Life Specific" },
  ],
  "motor-insurance": [
    { type: "aadhar_applicant", label: "Aadhaar Card", isRequired: false, category: "Applicant KYC" },
    { type: "pan_applicant", label: "PAN Card", isRequired: false, category: "Applicant KYC" },
    { type: "photo_applicant", label: "Photo", isRequired: false, category: "Applicant KYC" },
    { type: "rc_copy", label: "RC Copy", isRequired: false, category: "Vehicle Documents" },
    { type: "driving_license", label: "Driving License", isRequired: false, category: "Vehicle Documents" },
    { type: "previous_policy_copy", label: "Previous Policy Copy", isRequired: false, category: "Vehicle Documents" },
    { type: "vehicle_photos", label: "Vehicle Photos", isRequired: false, category: "Vehicle Documents" },
  ],
};

export function getInsuranceDocumentsByCategory(insuranceType: InsuranceType) {
  const docs = INSURANCE_DOCUMENT_REQUIREMENTS[insuranceType];
  const categories = Array.from(new Set(docs.map((doc) => doc.category)));
  return categories.map((category) => ({
    name: category,
    documents: docs.filter((doc) => doc.category === category),
  }));
}
