import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Health Insurance in India | Family Mediclaim Plans | Capital Care",
  description:
    "Compare health insurance plans for individuals, families, and seniors. Get cashless hospitalization, tax benefits, and affordable mediclaim options.",
  keywords: [
    "health insurance",
    "best health insurance in india",
    "family health insurance",
    "mediclaim policy",
    "health insurance plan",
    "cashless health insurance",
    "senior citizen health insurance",
    "medical insurance",
    "health policy online",
    "health insurance premium",
    "top up health insurance",
    "critical illness cover",
  ],
  alternates: {
    canonical: "https://www.capitalcarefintech.com/insurance/health-insurance",
  },
  openGraph: {
    title: "Health Insurance in India | Capital Care",
    description:
      "Explore health insurance plans with cashless treatment, tax benefits, and flexible sum insured options.",
    url: "https://www.capitalcarefintech.com/insurance/health-insurance",
    siteName: "Capital Care Fintech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Insurance in India | Capital Care",
    description: "Compare family and individual health plans and apply online in minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HealthInsuranceLayout({ children }: { children: ReactNode }) {
  return children;
}
