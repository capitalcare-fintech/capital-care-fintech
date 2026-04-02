export type LoanType =
  | "personal-loan"
  | "business-loan"
  | "loan-against-property"
  | "home-loan"
  | "new-car-loan"
  | "used-car-loan";

export type ApplicationStatus = "submitted" | "in_review" | "approved" | "rejected";

type LoanSubtypeConfig = {
  requiredFields: string[];
  requiredDocs: string[];
};

type LoanTypeConfig = {
  label: string;
  subtypes: Record<string, LoanSubtypeConfig>;
};

const personalCommonFields = [
  "fullName",
  "email",
  "mobile",
  "gender",
  "dob",
  "city",
  "pinCode",
  "residenceType",
  "panNumber",
  "desiredLoanAmount",
];

const businessCommonFields = [
  "fullName",
  "email",
  "mobile",
  "dob",
  "businessName",
  "annualTurnover",
  "businessNature",
  "city",
  "pinCode",
  "officeCity",
  "residenceType",
  "panNumber",
  "desiredLoanAmount",
];

const lapCommonFields = [
  "fullName",
  "email",
  "mobile",
  "dob",
  "city",
  "pinCode",
  "residenceType",
  "panNumber",
  "propertyType",
  "propertyLocation",
  "desiredLoanAmount",
];

const homeLoanCommonFields = [
  "fullName",
  "email",
  "mobile",
  "dob",
  "city",
  "pinCode",
  "residenceType",
  "panNumber",
  "propertyType",
  "propertyLocation",
  "desiredLoanAmount",
];

const carLoanCommonFields = [
  "fullName",
  "email",
  "mobile",
  "dob",
  "city",
  "pinCode",
  "residenceType",
  "panNumber",
  "carMakeModel",
  "quotationAmount",
];

export const LOAN_APPLICATION_CONFIG: Record<LoanType, LoanTypeConfig> = {
  "personal-loan": {
    label: "Personal Loan",
    subtypes: {
      salaried: {
        requiredFields: [...personalCommonFields, "yearlyIncome", "employerName"],
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "electricity_bill",
          "office_icard",
          "salary_slip",
          "bank_statement",
          "form16",
        ],
      },
      "self-employed": {
        requiredFields: [...personalCommonFields, "annualTurnover", "businessDetails"],
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "electricity_bill",
          "itr",
          "bank_statement",
          "office_proof",
        ],
      },
    },
  },
  "business-loan": {
    label: "Business Loan",
    subtypes: {
      proprietorship: {
        requiredFields: businessCommonFields,
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "aadhar_co_applicant",
          "pan_co_applicant",
          "photo_co_applicant",
          "gst_certificate",
          "residence_bill",
          "office_proof",
          "financials_2y",
          "bank_statement_current",
          "gst_return_3b",
        ],
      },
      partnership: {
        requiredFields: businessCommonFields,
        requiredDocs: [
          "company_pan",
          "partnership_deed",
          "partners_kyc",
          "residence_bill",
          "office_proof",
          "company_financials_2y",
          "bank_statement_current",
          "partners_itr_2y",
          "partners_savings_1y",
          "gst_return_3b",
        ],
      },
      "private-limited": {
        requiredFields: businessCommonFields,
        requiredDocs: [
          "company_pan",
          "moa_aoa",
          "director_shareholding",
          "directors_kyc",
          "residence_bill",
          "office_proof",
          "company_financials_2y",
          "bank_statement_current",
          "directors_itr_2y",
          "directors_savings_1y",
          "gst_return_3b",
        ],
      },
    },
  },
  "loan-against-property": {
    label: "Loan Against Property",
    subtypes: {
      salaried: {
        requiredFields: [...lapCommonFields, "monthlyIncome", "employerName"],
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "aadhar_co_applicant",
          "pan_co_applicant",
          "photo_co_applicant",
          "residence_bill",
          "office_id",
          "salary_slip_3m",
          "bank_statement_6m",
          "form16_2y",
          "property_chain",
        ],
      },
      "self-employed": {
        requiredFields: [...lapCommonFields, "annualTurnover", "businessDetails"],
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "aadhar_co_applicant",
          "pan_co_applicant",
          "photo_co_applicant",
          "residence_bill",
          "gst_certificate",
          "financials_2y",
          "bank_statement_current",
          "gst_return_3b",
          "office_proof",
          "property_chain",
        ],
      },
    },
  },
  "home-loan": {
    label: "Home Loan",
    subtypes: {
      salaried: {
        requiredFields: [...homeLoanCommonFields, "monthlyIncome", "employerName"],
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "aadhar_co_applicant",
          "pan_co_applicant",
          "photo_co_applicant",
          "residence_bill",
          "office_id",
          "salary_slip_3m",
          "bank_statement_6m",
          "form16_2y",
          "property_chain",
          "agreement_to_sale",
        ],
      },
      "self-employed": {
        requiredFields: [...homeLoanCommonFields, "annualTurnover", "businessDetails"],
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "aadhar_co_applicant",
          "pan_co_applicant",
          "photo_co_applicant",
          "residence_bill",
          "gst_certificate",
          "financials_2y",
          "bank_statement_current",
          "gst_return_3b",
          "office_proof",
          "property_chain",
          "agreement_to_sale",
        ],
      },
    },
  },
  "new-car-loan": {
    label: "New Car Loan",
    subtypes: {
      salaried: {
        requiredFields: [...carLoanCommonFields, "monthlyIncome", "employerName"],
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "aadhar_co_applicant",
          "pan_co_applicant",
          "photo_co_applicant",
          "residence_bill",
          "office_id",
          "salary_slip_6m",
          "bank_statement_1y",
          "form16_2y",
          "loan_details",
        ],
      },
      "self-employed": {
        requiredFields: [...carLoanCommonFields, "annualTurnover", "businessDetails"],
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "aadhar_co_applicant",
          "pan_co_applicant",
          "photo_co_applicant",
          "residence_bill",
          "itr_2y_computation",
          "bank_statement_current",
          "loan_details",
          "office_proof",
        ],
      },
    },
  },
  "used-car-loan": {
    label: "Used Car Loan",
    subtypes: {
      salaried: {
        requiredFields: [...carLoanCommonFields, "monthlyIncome", "employerName"],
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "aadhar_co_applicant",
          "pan_co_applicant",
          "photo_co_applicant",
          "residence_bill",
          "office_id",
          "salary_slip_3m",
          "bank_statement_6m",
          "form16_2y",
          "loan_details",
          "rc_photo",
          "car_insurance",
        ],
      },
      "self-employed": {
        requiredFields: [...carLoanCommonFields, "annualTurnover", "businessDetails"],
        requiredDocs: [
          "aadhar_applicant",
          "pan_applicant",
          "photo_applicant",
          "aadhar_co_applicant",
          "pan_co_applicant",
          "photo_co_applicant",
          "residence_bill",
          "itr_2y_computation",
          "bank_statement_current",
          "loan_details",
          "office_proof",
          "rc_photo",
          "car_insurance",
        ],
      },
    },
  },
};

export const APPLICATION_STATUSES: ApplicationStatus[] = ["submitted", "in_review", "approved", "rejected"];

export function isLoanType(value: string): value is LoanType {
  return value in LOAN_APPLICATION_CONFIG;
}

export function isApplicationStatus(value: string): value is ApplicationStatus {
  return APPLICATION_STATUSES.includes(value as ApplicationStatus);
}
