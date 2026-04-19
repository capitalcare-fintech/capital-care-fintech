import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Business Loan in India | Fast Working Capital | Capital Care",
  description:
    "Get business loan solutions for working capital, expansion, machinery, and cash flow. Compare lender offers and apply online with guided documentation.",
  keywords: [
    "business loan",
    "business loan online",
    "working capital loan",
    "msme loan",
    "small business loan",
    "startup business loan",
    "business expansion loan",
    "loan for proprietorship",
    "loan for partnership firm",
    "loan for private limited company",
    "business loan interest rate",
    "unsecured business loan",
  ],
  alternates: {
    canonical: "https://www.capitalcarefintech.com/loans/business-loan",
  },
  openGraph: {
    title: "Business Loan in India | Capital Care",
    description:
      "Compare business loan offers for working capital and expansion with transparent processing.",
    url: "https://www.capitalcarefintech.com/loans/business-loan",
    siteName: "Capital Care Fintech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Loan in India | Capital Care",
    description:
      "Apply for business loans online with profile-based eligibility and quick lender matching.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BusinessLoanLayout({ children }: { children: ReactNode }) {
  return children;
}
