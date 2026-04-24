import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Life Insurance in India | Term & Savings Plans | Capital Care",
  description:
    "Compare life insurance plans including term insurance and savings plans. Protect your family with nominee payout options and optional rider benefits.",
  keywords: [
    "life insurance",
    "term insurance",
    "best term insurance plan",
    "life cover plan",
    "life insurance policy",
    "family protection plan",
    "term insurance with return of premium",
    "savings life insurance",
    "life insurance premium",
    "online life insurance",
    "life insurance riders",
    "nominee payout life insurance",
  ],
  alternates: {
    canonical: "https://www.capitalcarefintech.com/insurance/life-insurance",
  },
  openGraph: {
    title: "Life Insurance in India | Capital Care",
    description:
      "Find suitable life insurance plans with flexible payout options and strong family financial protection.",
    url: "https://www.capitalcarefintech.com/insurance/life-insurance",
    siteName: "Capital Care Fintech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life Insurance in India | Capital Care",
    description: "Choose term and savings plans with optional rider coverage and easy online application.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LifeInsuranceLayout({ children }: { children: ReactNode }) {
  return children;
}
