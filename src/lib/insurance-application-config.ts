export type InsuranceType = "health-insurance" | "life-insurance" | "motor-insurance";

export type InsuranceApplicationStatus = "submitted" | "in_review" | "approved" | "rejected";

type InsuranceTypeConfig = {
  label: string;
  requiredFields: string[];
  requiredDocs: string[];
};

const basicFields = ["fullName", "email", "mobile", "dob"];

export const INSURANCE_APPLICATION_CONFIG: Record<InsuranceType, InsuranceTypeConfig> = {
  "health-insurance": {
    label: "Health Insurance",
    requiredFields: [
      ...basicFields,
      "coverageFor",
      "membersCount",
      "city",
      "pinCode",
      "sumInsured",
      "existingHealthInsurance",
      "preExistingDisease",
      "heightCm",
      "weightKg",
      "tobaccoUse",
      "hospitalizationLast2Years",
    ],
    requiredDocs: [
    //   "aadhar_applicant",
    //   "pan_applicant",
    //   "photo_applicant",
    //   "previous_policy_copy",
    ],
  },
  "life-insurance": {
    label: "Life Insurance",
    requiredFields: [
      ...basicFields,
      "annualIncome",
      "occupationType",
      "desiredSumAssured",
      "policyTermYears",
      "maritalStatus",
      "tobaccoOrAlcoholUse",
      "majorIllness",
      "nomineeName",
      "nomineeRelation",
      "nomineeDob",
    ],
    requiredDocs: [
    //   "aadhar_applicant",
    //   "pan_applicant",
    //   "photo_applicant",
    //   "income_proof",
    //   "signature",
    ],
  },
  "motor-insurance": {
    label: "Motor Insurance",
    requiredFields: [
      ...basicFields,
      "vehicleType",
      "registrationNumber",
      "makeModel",
      "manufacturingYear",
      "insurancePlanType",
      "isRenewal",
      "previousClaim",
    ],
    requiredDocs: [
    //   "aadhar_applicant",
    //   "pan_applicant",
    //   "photo_applicant",
    //   "rc_copy",
    //   "driving_license",
    //   "previous_policy_copy",
    ],
  },
};

export const INSURANCE_APPLICATION_STATUSES: InsuranceApplicationStatus[] = [
  "submitted",
  "in_review",
  "approved",
  "rejected",
];

export function isInsuranceType(value: string): value is InsuranceType {
  return value in INSURANCE_APPLICATION_CONFIG;
}

export function isInsuranceApplicationStatus(value: string): value is InsuranceApplicationStatus {
  return INSURANCE_APPLICATION_STATUSES.includes(value as InsuranceApplicationStatus);
}
