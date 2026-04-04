export type BusinessApplicantType = "proprietorship" | "partnership" | "private-limited";

interface DocumentItem {
  type: string;
  label: string;
  isRequired: boolean;
  category: string;
}

export const DOCUMENT_REQUIREMENTS: Record<BusinessApplicantType, DocumentItem[]> = {
  proprietorship: [
    { type: "aadhar_applicant", label: "Aadhar Card (Applicant)", isRequired: false, category: "Applicant KYC" },
    { type: "pan_applicant", label: "PAN Card (Applicant)", isRequired: false, category: "Applicant KYC" },
    { type: "photo_applicant", label: "Photo (Applicant)", isRequired: false, category: "Applicant KYC" },
    { type: "aadhar_co_applicant", label: "Aadhar Card (Co-applicant)", isRequired: false, category: "Co-applicant KYC" },
    { type: "pan_co_applicant", label: "PAN Card (Co-applicant)", isRequired: false, category: "Co-applicant KYC" },
    { type: "photo_co_applicant", label: "Photo (Co-applicant)", isRequired: false, category: "Co-applicant KYC" },
    { type: "gst_certificate", label: "GST Registration Certificate", isRequired: false, category: "Business" },
    { type: "residence_bill", label: "Residence Electricity Bill", isRequired: false, category: "Residence" },
    { type: "office_proof", label: "Office Address Proof", isRequired: false, category: "Business" },
    { type: "financials_2y", label: "Last 2 Years Financials with CA Stamp", isRequired: false, category: "Financial" },
    { type: "bank_statement_current", label: "Last 1 Year Current Account Statement", isRequired: false, category: "Financial" },
    { type: "gst_return_3b", label: "Last 1 Year GST Returns 3B", isRequired: false, category: "Financial" },
    { type: "loan_details", label: "Running Loan Details (if any)", isRequired: false, category: "Other" },
  ],
  partnership: [
    { type: "company_pan", label: "Company PAN Card", isRequired: false, category: "Company" },
    { type: "partnership_deed", label: "Partnership Deed", isRequired: false, category: "Company" },
    { type: "partners_kyc", label: "Partners KYC (Aadhar, PAN, Photo)", isRequired: false, category: "Partners KYC" },
    { type: "residence_bill", label: "Residence Latest Electricity Bill", isRequired: false, category: "Residence" },
    { type: "office_proof", label: "Office Address Proof", isRequired: false, category: "Company" },
    { type: "company_financials_2y", label: "Last 2 Years Company Financials with CA Stamp", isRequired: false, category: "Financial" },
    { type: "bank_statement_current", label: "Last 1 Year Current Account Statement", isRequired: false, category: "Financial" },
    { type: "partners_itr_2y", label: "Last 2 Years Partners ITR with Computations", isRequired: false, category: "Partners Financial" },
    { type: "partners_savings_1y", label: "Last 1 Year Partners Savings Statement", isRequired: false, category: "Partners Financial" },
    { type: "gst_return_3b", label: "Last 1 Year GST Returns 3B", isRequired: false, category: "Financial" },
    { type: "loan_details", label: "Running Loan Details (if any)", isRequired: false, category: "Other" },
  ],
  "private-limited": [
    { type: "company_pan", label: "Company PAN Card", isRequired: false, category: "Company" },
    { type: "moa_aoa", label: "MOA / AOA", isRequired: false, category: "Company" },
    { type: "director_shareholding", label: "Directors and Shareholding List (CA Certified)", isRequired: false, category: "Company" },
    { type: "directors_kyc", label: "All Directors KYC (Aadhar, PAN, Photo)", isRequired: false, category: "Directors KYC" },
    { type: "residence_bill", label: "Residence Latest Electricity Bill", isRequired: false, category: "Residence" },
    { type: "office_proof", label: "Office Address Proof", isRequired: false, category: "Company" },
    { type: "company_financials_2y", label: "Last 2 Years Company Financials with CA Stamp", isRequired: false, category: "Financial" },
    { type: "bank_statement_current", label: "Last 1 Year Current Account Statement", isRequired: false, category: "Financial" },
    { type: "directors_itr_2y", label: "Last 2 Years Directors ITR with Computations", isRequired: false, category: "Directors Financial" },
    { type: "directors_savings_1y", label: "Last 1 Year Directors Savings Statement", isRequired: false, category: "Directors Financial" },
    { type: "gst_return_3b", label: "Last 1 Year GST Returns 3B", isRequired: false, category: "Financial" },
    { type: "loan_details", label: "Running Loan Details (if any)", isRequired: false, category: "Other" },
  ],
};

export const getDocumentsByCategory = (applicantType: BusinessApplicantType) => {
  const docs = DOCUMENT_REQUIREMENTS[applicantType];
  const categories = Array.from(new Set(docs.map((d) => d.category)));

  return categories.map((cat) => ({
    name: cat,
    documents: docs.filter((d) => d.category === cat),
  }));
};
