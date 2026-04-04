export type CarLoanApplicantType = "self-employed" | "salaried";

interface DocumentItem {
  type: string;
  label: string;
  isRequired: boolean;
  category: string;
}

export const DOCUMENT_REQUIREMENTS: Record<CarLoanApplicantType, DocumentItem[]> = {
  "self-employed": [
    { type: "aadhar_applicant", label: "Aadhar Card (Applicant)", isRequired: false, category: "Applicant KYC" },
    { type: "pan_applicant", label: "PAN Card (Applicant)", isRequired: false, category: "Applicant KYC" },
    { type: "photo_applicant", label: "Photo (Applicant)", isRequired: false, category: "Applicant KYC" },
    { type: "aadhar_co_applicant", label: "Aadhar Card (Co-applicant)", isRequired: false, category: "Co-applicant KYC" },
    { type: "pan_co_applicant", label: "PAN Card (Co-applicant)", isRequired: false, category: "Co-applicant KYC" },
    { type: "photo_co_applicant", label: "Photo (Co-applicant)", isRequired: false, category: "Co-applicant KYC" },
    { type: "residence_bill", label: "Residence Electricity Bill", isRequired: false, category: "Residence" },
    { type: "itr_2y_computation", label: "Last 2 Years ITR with Computation of Income", isRequired: false, category: "Financial" },
    { type: "bank_statement_current", label: "Last 1 Year Current Account Bank Statement", isRequired: false, category: "Financial" },
    { type: "office_proof", label: "Office Address Proof", isRequired: false, category: "Business" },
    { type: "loan_details", label: "Running Loan Details (if any)", isRequired: false, category: "Other" },
  ],
  salaried: [
    { type: "aadhar_applicant", label: "Aadhar Card (Applicant)", isRequired: false, category: "Applicant KYC" },
    { type: "pan_applicant", label: "PAN Card (Applicant)", isRequired: false, category: "Applicant KYC" },
    { type: "photo_applicant", label: "Photo (Applicant)", isRequired: false, category: "Applicant KYC" },
    { type: "aadhar_co_applicant", label: "Aadhar Card (Co-applicant)", isRequired: false, category: "Co-applicant KYC" },
    { type: "pan_co_applicant", label: "PAN Card (Co-applicant)", isRequired: false, category: "Co-applicant KYC" },
    { type: "photo_co_applicant", label: "Photo (Co-applicant)", isRequired: false, category: "Co-applicant KYC" },
    { type: "residence_bill", label: "Residence Latest Electricity Bill", isRequired: false, category: "Residence" },
    { type: "office_id", label: "Office I-card", isRequired: false, category: "Employment" },
    { type: "salary_slip_6m", label: "Last 6 Month Salary Slip", isRequired: false, category: "Income" },
    { type: "bank_statement_1y", label: "Last 1 Year Bank Statement", isRequired: false, category: "Income" },
    { type: "form16_2y", label: "Last 2 Years Form 16", isRequired: false, category: "Income" },
    { type: "loan_details", label: "Running Loan Details (if any)", isRequired: false, category: "Other" },
  ],
};

export const getDocumentsByCategory = (applicantType: CarLoanApplicantType) => {
  const docs = DOCUMENT_REQUIREMENTS[applicantType];
  const categories = Array.from(new Set(docs.map((d) => d.category)));

  return categories.map((cat) => ({
    name: cat,
    documents: docs.filter((d) => d.category === cat),
  }));
};
