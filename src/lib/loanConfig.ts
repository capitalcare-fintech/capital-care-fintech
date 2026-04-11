export interface LoanConfig {
  id: string;
  name: string;
  maxAmount: number;
  minRate: number;
  minTenure: number;
  maxTenure: number;
  benefits: string[];
  documents: string[];
  icon: string;
  // Use a path from /public (e.g. /exploreProducts/personalLoan.png) or an absolute URL.
  image: string;
}

export const loanConfigurations: Record<string, LoanConfig> = {
  "personal-loan": {
    id: "personal-loan",
    name: "Personal Loan",
    maxAmount: 10000000,
    minRate: 9.99,
    minTenure: 6,
    maxTenure: 84,
    benefits: [
      "No collateral required",
      "Quick approval and disbursement",
      "Flexible repayment tenure",
      "Minimal documentation",
    ],
    documents: [
      "Aadhar Card & PAN Card",
      "Recent salary slips (3 months)",
      "Bank statements (6 months)",
      "Form 16 (last 2 years)",
    ],
    icon: "💼",
    image: "/exploreProducts/personalLoan.png",
  },
  "business-loan": {
    id: "business-loan",
    name: "Business Loan",
    maxAmount: 2500000,
    minRate: 8.5,
    minTenure: 12,
    maxTenure: 120,
    benefits: [
      "Custom loan amounts",
      "Easy business expansion",
      "Flexible repayment",
      "Priority approval process",
    ],
    documents: [
      "Business registration proof",
      "Last 2 years ITR",
      "Bank statements (12 months)",
      "Business financial documents",
    ],
    icon: "🏢",
    image: "/exploreProducts/buisnessLoan.png",
  },
  "home-loan": {
    id: "home-loan",
    name: "Home Loan",
    maxAmount: 100000000,
    minRate: 7.05,
    minTenure: 60,
    maxTenure: 360,
    benefits: [
      "Competitive interest rates",
      "Long tenure options",
      "Tax benefits available",
      "No prepayment penalty",
    ],
    documents: [
      "Property registration documents",
      "Income proof (salary slips/ITR)",
      "Bank statements (6-12 months)",
      "Work experience certificate",
    ],
    icon: "🏠",
    image: "/exploreProducts/homeLoan.png",
  },
};

export const getLoanConfig = (loanType: string): LoanConfig => {
  return loanConfigurations[loanType] || loanConfigurations["personal-loan"];
};
