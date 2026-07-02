"use client";

import Image from "next/image";
import Link from "next/link";
import businessLoanHeroImage from "@/assets/loans/bl-1.png";
import businessLoanApplyImage from "@/assets/loans/bl-3.png";
import businessLoanChargesImage from "@/assets/loans/bl-2.png";
import { useAuth } from "@/lib/useAuth";
import { TrustedCustomersStats } from "../../../components/loan/TrustedCustomersStats";

const featureCards = [
	{ id: "01", title: "Higher loan eligibility", desc: "Get funding aligned to your business turnover and repayment profile." },
	{ id: "02", title: "Flexible end use", desc: "Use funds for working capital, expansion, machinery, inventory, or cash flow management." },
	{ id: "03", title: "Competitive rates", desc: "Compare lender programs and select the most practical business loan offer." },
	{ id: "04", title: "Structured documentation", desc: "Submit profile-specific documents with clear guidance at each step." },
	{ id: "05", title: "Fast in-principle decision", desc: "Quick screening helps you know the likely eligibility early." },
	{ id: "06", title: "Digital application", desc: "Apply online and track status with minimal branch visits." },
	{ id: "07", title: "Multiple business profiles", desc: "Available for proprietorship, partnership, and private limited entities." },
	{ id: "08", title: "Transparent charges", desc: "Charges and lender-specific fees are shared upfront before final processing." },
];

const eligibility = [
	"Indian business entity with active operations.",
	"Valid KYC of applicant/partners/directors as applicable.",
	"Business and residence proof documents should be available.",
	"Financial and banking track record should support repayment capacity.",
	"GST and ITR-related filings improve approval quality.",
];

const documents = [
	"Proprietorship: Applicant and co-applicant KYC, GST certificate, residence electricity bill, office address proof, last 2 years financials with CA stamp, last 1 year current account statement, last 1 year GST 3B, and running loan details (if any).",
	"Partnership: Company PAN, partnership deed, partners KYC, residence electricity bill, office address proof, last 2 years company financials with CA stamp, last 1 year current account statement, last 2 years partners ITR, last 1 year partners savings statement, last 1 year GST 3B, and running loan details (if any).",
	"Private Limited: Company PAN, MOA/AOA, CA-certified list of directors/shareholding, directors KYC, residence electricity bill, office address proof, last 2 years company financials with CA stamp, last 1 year current account statement, last 2 years directors ITR, last 1 year directors savings statement, last 1 year GST 3B, and running loan details (if any).",
	"Upload format supported: PDF, JPG, JPEG, PNG (maximum 10MB per file).",
];

const applySteps = [
	"Click Apply Now and complete personal, business, residence, and loan requirement details.",
	"Verify mobile number with OTP to continue the secure application flow.",
	"Select your business constitution type and upload the required documents.",
	"Submit the form; our team validates and connects with you for the next process.",
];

const chargeRows = [
	["Interest Rate", "As per lender program and business profile"],
	["Loan Processing Fees", "Approx. 0.5% to 3.5% of sanctioned amount"],
	["Pre-payment / Foreclosure", "Depends on lender and product terms"],
	["Legal / Technical Charges", "As per actuals and lender policy"],
	["Documentation Charges", "As per lender guidelines"],
	["EMI / Cheque Bounce", "As per lender schedule of charges"],
];

const loanTypes = [
	["Working Capital Loan", "Manage day-to-day cash flow and operational needs."],
	["Business Expansion Loan", "Scale your business operations and infrastructure."],
	["Machinery and Equipment Loan", "Purchase assets to improve productivity."],
	["Inventory Funding", "Maintain stock cycles without working capital stress."],
	["Invoice / Receivable Linked Funding", "Improve liquidity against receivables."],
];

const heroHighlights = [
  "For proprietorship, partnership, and Pvt Ltd",
  "Higher loan eligibility",
  "Flexible end use options",
  "Fast in-principle approval",
];

export default function BusinessLoanPage() {
  const { signedIn } = useAuth();
  const applyHref = signedIn ? "/loans/business-loan/apply" : "/sign-in?next=/loans/business-loan/apply";

  return (
    <main className="min-h-screen w-full bg-background pb-8">
      <div className="flex w-full flex-col gap-8">
        <section className="relative w-full bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#f8fafc_40%,#ffffff_100%)] px-4 pb-14 p-10 md:px-10 lg:px-16 xl:px-24">
          <div className="absolute -left-10 top-16 h-44 w-44 rounded-full bg-sky-200/30 blur-2xl" aria-hidden />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" aria-hidden />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                Business Loan
              </p>
              <h1 className="text-xl font-bold leading-tight text-slate-900 md:text-3xl">
                Manage growth, working capital, and commercial needs with structured financing.
              </h1>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-800 md:text-base">
                Compare top lenders, choose practical funding options, and complete a simple online
                application in minutes with CapitalCare.
              </p>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
                The process is straightforward: submit your details, verify your number, upload required business documents, and our
                loan team will guide you through approval and disbursal.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {heroHighlights.map((item) => (
                  <p
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm"
                  >
                    {item}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={applyHref}
                  className="inline-flex items-center justify-center rounded-xl bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)]">
              <Image
                src={businessLoanHeroImage}
                alt="Business loan overview"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="w-full bg-slate-100 px-4 py-12 md:px-10 lg:px-16 xl:px-24">
          <h2 className="text-center text-lg font-bold leading-tight text-slate-900 md:text-2xl">
            Online Business Loan <span className="text-sky-600">Features and Benefits</span>
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-relaxed text-slate-800 md:text-base">
            Flexible commercial funding options designed for operating businesses and growth plans.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {featureCards.map((feature) => (
              <article
                key={feature.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-2xl font-semibold text-sky-700">
                  {feature.id}
                </div>
                <h3 className="text-base font-bold text-sky-700 md:text-lg">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="w-full bg-slate-100 px-4 py-10 md:px-10 lg:px-16 xl:px-24">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="text-lg font-bold text-slate-900 md:text-2xl">
                How to Apply for <span className="text-sky-600">Business Loan Easy Approval?</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
                The application journey is simple. Share your details, verify your number, upload documents,
                and submit for review by our loan team.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {applySteps.map((step, index) => (
                  <article
                    key={step}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.45)]"
                  >
                    <h3 className="text-base font-bold text-slate-900 md:text-lg">Step {String(index + 1).padStart(2, "0")}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800 md:text-base">{step}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href={applyHref}
                  className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-black px-7 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-900 hover:bg-slate-200 hover:text-slate-900"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(2,132,199,0.45)]">
                <Image
                  src={businessLoanApplyImage}
                  alt="Business loan application process"
                  className="h-auto w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-slate-50 px-4 py-10 md:px-10 lg:px-16 xl:px-24">
          <h2 className="text-center text-lg font-bold leading-tight text-slate-900 md:text-2xl">
            Business Loan <span className="text-sky-700">Eligibility and Documents</span>
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-relaxed text-slate-800 md:text-base">
            Review these criteria and documents together before applying to avoid delays during verification.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-[linear-gradient(90deg,#ffffff_0%,#eff6ff_100%)] p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.45)] md:p-8">
              <h3 className="text-base font-bold leading-tight text-slate-900 md:text-xl">
                Eligibility <span className="text-sky-700">Criteria</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
                Basic checks help lenders evaluate repayment capability and process applications faster.
              </p>

              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-800 md:text-base">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1 text-sky-700">✧</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-black px-7 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-900 hover:bg-slate-200 hover:text-slate-900"
                >
                  Talk to Advisor
                </Link>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-[linear-gradient(90deg,#ffffff_0%,#eff6ff_100%)] p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.45)] md:p-8">
              <h3 className="text-base font-bold leading-tight text-slate-900 md:text-xl">
                Required <span className="text-sky-700">Documents</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
                Keep these documents ready to reduce review time and improve approval turnaround.
              </p>

              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-800 md:text-base">
                {documents.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1 text-sky-700">✧</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="w-full bg-slate-50 px-4 py-12 md:px-10 lg:px-16 xl:px-24">
          <div className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-[linear-gradient(90deg,#ffffff_0%,#eef2ff_100%)] p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.45)] lg:grid-cols-[1.15fr_0.85fr] md:p-8">
            <div>
              <h2 className="text-lg font-bold leading-tight text-slate-900 md:text-2xl">
                Business Loan <span className="text-sky-700">Interest Rate and Applicable Charges</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
                Keep these rate and fee components in mind while comparing lenders for better transparency and budgeting.
              </p>

              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-800 md:text-base">
                {chargeRows.map((row) => (
                  <li key={row[0]} className="flex items-start gap-3">
                    <span aria-hidden className="mt-1 text-sky-700">✧</span>
                    <span>
                      <span className="font-semibold text-slate-900">{row[0]}:</span> {row[1]}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href={applyHref}
                  className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-black px-7 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-900 hover:bg-slate-200 hover:text-slate-900"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl">
              <Image
                src={businessLoanChargesImage}
                alt="Business loan rate and charges"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </section>

        <section className="w-full bg-slate-100 px-4 pb-10 pt-4 md:px-10 lg:px-16 xl:px-24">
          <h2 className="text-center text-lg font-bold leading-tight text-slate-900 md:text-2xl">
            Types of <span className="text-sky-600">Business Loan</span>
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-relaxed text-slate-800 md:text-base">
            Choose the right loan category based on your business needs and repayment comfort.
          </p>

          <div className="mx-auto mt-8 grid w-full max-w-5xl gap-4 md:grid-cols-2">
            {loanTypes.map((row) => (
              <article
                key={row[0]}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_32px_-26px_rgba(15,23,42,0.42)]"
              >
                <h3 className="border-l-4 border-sky-500 pl-3 text-base font-bold text-slate-900 md:text-lg">{row[0]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">{row[1]}</p>
              </article>
            ))}
          </div>
        </section>

         <section className="w-full px-4 md:px-10 lg:px-16">
          <TrustedCustomersStats />
        </section>
      </div>
    </main>
  );
}
