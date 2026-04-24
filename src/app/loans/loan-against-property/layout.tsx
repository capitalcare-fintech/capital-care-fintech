import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Loan Against Property in India | LAP Rates | Capital Care",
  description:
    "Unlock your property value with Loan Against Property for business, education, or debt consolidation. Check LAP eligibility, rates, and apply online.",
  keywords: [
    "loan against property",
    "lap loan",
    "property backed loan",
    "mortgage loan india",
    "lap interest rate",
    "loan against residential property",
    "loan against commercial property",
    "secured loan against property",
    "lap eligibility",
    "lap documents",
    "apply lap online",
    "property mortgage loan",
  ],
  alternates: {
    canonical: "https://www.capitalcarefintech.com/loans/loan-against-property",
  },
  openGraph: {
    title: "Loan Against Property in India | Capital Care",
    description:
      "Get secured funding against property with flexible tenure and transparent lender charges.",
    url: "https://www.capitalcarefintech.com/loans/loan-against-property",
    siteName: "Capital Care Fintech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan Against Property in India | Capital Care",
    description: "Apply for LAP online with guided documentation and profile-based lender options.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoanAgainstPropertyLayout({ children }: { children: ReactNode }) {
  return children;
}
