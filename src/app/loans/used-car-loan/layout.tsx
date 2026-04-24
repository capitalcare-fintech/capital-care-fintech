import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Used Car Loan in India | Second Hand Car Finance | Capital Care",
  description:
    "Get used car loan online with competitive interest rates, flexible EMI options, and quick documentation support. Finance your second hand car with ease.",
  keywords: [
    "used car loan",
    "second hand car loan",
    "pre owned car loan",
    "used car finance",
    "car loan for used car",
    "used car loan interest rate",
    "used car loan emi",
    "used vehicle loan",
    "apply used car loan online",
    "old car loan",
    "best used car loan",
    "used car loan documents",
  ],
  alternates: {
    canonical: "https://www.capitalcarefintech.com/loans/used-car-loan",
  },
  openGraph: {
    title: "Used Car Loan in India | Capital Care",
    description:
      "Finance your pre-owned car with flexible EMI and transparent used car loan processing.",
    url: "https://www.capitalcarefintech.com/loans/used-car-loan",
    siteName: "Capital Care Fintech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Car Loan in India | Capital Care",
    description: "Apply for second hand car loan online with easy eligibility and documentation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function UsedCarLoanLayout({ children }: { children: ReactNode }) {
  return children;
}
