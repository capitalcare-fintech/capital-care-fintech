import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "New Car Loan in India | Best Car Finance Deals | Capital Care",
  description:
    "Apply for new car loan online with competitive rates, flexible EMI plans, and easy documentation. Compare car finance options and get quick processing.",
  keywords: [
    "new car loan",
    "car loan online",
    "new car finance",
    "car loan interest rate",
    "best car loan in india",
    "car loan emi",
    "car loan eligibility",
    "new vehicle loan",
    "auto loan india",
    "car loan documents",
    "apply car loan online",
    "zero down payment car loan",
  ],
  alternates: {
    canonical: "https://www.capitalcarefintech.com/loans/new-car-loan",
  },
  openGraph: {
    title: "New Car Loan in India | Capital Care",
    description:
      "Find suitable new car finance offers with transparent charges and flexible repayment options.",
    url: "https://www.capitalcarefintech.com/loans/new-car-loan",
    siteName: "Capital Care Fintech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Car Loan in India | Capital Care",
    description: "Apply online for new car loan with easy steps and lender comparison support.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NewCarLoanLayout({ children }: { children: ReactNode }) {
  return children;
}
