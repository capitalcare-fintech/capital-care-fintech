export type DocumentType = "salaried" | "self-employed";

interface DocumentItem {
  type: string;
  label: string;
  isRequired: boolean;
  category: string;
}

export const DOCUMENT_REQUIREMENTS: Record<DocumentType, DocumentItem[]> = {
  salaried: [
    // Applicant KYC
    { type: "aadhar_applicant", label: "Aadhar Card (Applicant)", isRequired: true, category: "Applicant KYC" },
    { type: "pan_applicant", label: "PAN Card (Applicant)", isRequired: true, category: "Applicant KYC" },
    { type: "photo_applicant", label: "Photo (Applicant)", isRequired: true, category: "Applicant KYC" },
    
    // Residence Proof
    { type: "electricity_bill", label: "Latest Electricity Bill", isRequired: true, category: "Residence" },
    
    // Employment Proof
    { type: "office_icard", label: "Office I-Card", isRequired: true, category: "Employment" },
    
    // Income Proof
    { type: "salary_slip", label: "Last 3 Month Salary Slip", isRequired: true, category: "Income" },
    { type: "bank_statement", label: "Last 6 Month Bank Statement", isRequired: true, category: "Income" },
    { type: "form16", label: "Last 2 Years Form 16", isRequired: true, category: "Income" },
    
    // Optional
    { type: "loan_details", label: "Existing Loan Details (if any)", isRequired: false, category: "Other" },
  ],
  "self-employed": [
    // Applicant KYC
    { type: "aadhar_applicant", label: "Aadhar Card (Applicant)", isRequired: true, category: "Applicant KYC" },
    { type: "pan_applicant", label: "PAN Card (Applicant)", isRequired: true, category: "Applicant KYC" },
    { type: "photo_applicant", label: "Photo (Applicant)", isRequired: true, category: "Applicant KYC" },
    
    // Residence Proof
    { type: "electricity_bill", label: "Residence Electricity Bill", isRequired: true, category: "Residence" },
    
    // Income Proof
    { type: "itr", label: "Last 2 Years ITR with Computation", isRequired: true, category: "Income" },
    { type: "bank_statement", label: "Last 1 Year Bank Statement (Current Account)", isRequired: true, category: "Income" },
    
    // Business Proof
    { type: "office_proof", label: "Office Address Proof", isRequired: true, category: "Business" },
    
    // Optional
    { type: "loan_details", label: "Existing Loan Details (if any)", isRequired: false, category: "Other" },
  ],
};

export const getDocumentsByCategory = (employmentType: DocumentType) => {
  const docs = DOCUMENT_REQUIREMENTS[employmentType];
  const categories = Array.from(new Set(docs.map(d => d.category)));
  return categories.map(cat => ({
    name: cat,
    documents: docs.filter(d => d.category === cat),
  }));
};

export const getTotalRequiredDocuments = (employmentType: DocumentType) => {
  return DOCUMENT_REQUIREMENTS[employmentType].filter(d => d.isRequired).length;
};
