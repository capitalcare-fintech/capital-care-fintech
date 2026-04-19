import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Home Loan in India | Best Rates & EMI Options | Capital Care",
  description:
    "Explore home loan options with competitive interest rates, flexible EMI tenure, and simple documentation. Apply online for property purchase or balance transfer.",
  keywords: [
    "home loan",
    "apply home loan online",
    "home loan interest rate",
    "best home loan in india",
    "housing loan",
    "home loan emi",
    "home loan eligibility",
    "home loan documents",
    "home loan for salaried",
    "home loan for self employed",
    "home loan balance transfer",
    "property loan",
  ],
  alternates: {
    canonical: "https://www.capitalcarefintech.com/loans/home-loan",
  },
  openGraph: {
    title: "Home Loan in India | Capital Care",
    description:
      "Compare home loan options, rates, and tenure with guided support from application to disbursal.",
    url: "https://www.capitalcarefintech.com/loans/home-loan",
    siteName: "Capital Care Fintech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan in India | Capital Care",
    description: "Apply online for home loan with competitive rates and flexible EMI plans.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomeLoanLayout({ children }: { children: ReactNode }) {
  return children;
}
