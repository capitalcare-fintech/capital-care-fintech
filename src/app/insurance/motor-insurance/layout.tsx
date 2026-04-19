import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Motor Insurance in India | Car & Bike Cover | Capital Care",
  description:
    "Get motor insurance for car and bike with third-party and comprehensive plans. Compare add-ons, claim options, and renew policy online quickly.",
  keywords: [
    "motor insurance",
    "car insurance",
    "bike insurance",
    "third party car insurance",
    "comprehensive car insurance",
    "car insurance renewal",
    "vehicle insurance online",
    "zero dep car insurance",
    "motor insurance claim",
    "cashless garage insurance",
    "best car insurance policy",
    "two wheeler insurance",
  ],
  alternates: {
    canonical: "https://www.capitalcarefintech.com/insurance/motor-insurance",
  },
  openGraph: {
    title: "Motor Insurance in India | Capital Care",
    description:
      "Compare third-party and comprehensive motor plans with add-ons and streamlined claim support.",
    url: "https://www.capitalcarefintech.com/insurance/motor-insurance",
    siteName: "Capital Care Fintech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Motor Insurance in India | Capital Care",
    description: "Buy or renew car and bike insurance online with flexible coverage options.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MotorInsuranceLayout({ children }: { children: ReactNode }) {
  return children;
}
