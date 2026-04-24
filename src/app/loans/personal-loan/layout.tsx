import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Personal Loan Online in India | Fast Approval | Capital Care",
  description:
    "Apply for personal loan online with fast approval, competitive interest rates, and minimal documentation. Check eligibility, EMI options, and secure processing.",
  keywords: [
    "personal loan",
    "instant personal loan",
    "personal loan online",
    "quick personal loan",
    "salary loan",
    "unsecured personal loan",
    "personal loan interest rate",
    "personal loan eligibility",
    "best personal loan in india",
    "apply personal loan online",
    "low interest personal loan",
    "personal loan emi calculator",
  ],
  alternates: {
    canonical: "https://www.capitalcarefintech.com/loans/personal-loan",
  },
  openGraph: {
    title: "Personal Loan Online in India | Capital Care",
    description:
      "Get fast personal loan approval with flexible tenure and transparent charges.",
    url: "https://www.capitalcarefintech.com/loans/personal-loan",
    siteName: "Capital Care Fintech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Loan Online in India | Capital Care",
    description:
      "Apply for a personal loan online with quick eligibility checks and easy documentation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PersonalLoanLayout({ children }: { children: ReactNode }) {
  return children;
}
