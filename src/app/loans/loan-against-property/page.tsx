"use client";

import Image from "next/image";
import Link from "next/link";
import lapHeroImage from "@/assets/loans/lap-1.png";
import lapApplyImage from "@/assets/loans/lap-3.png";
import lapChargesImage from "@/assets/loans/lap-2.png";
import { useAuth } from "@/lib/useAuth";
import { TrustedCustomersStats } from "../../../components/loan/TrustedCustomersStats";

const featureCards = [
  { id: "01", title: "Secured funding", desc: "Get higher loan eligibility by mortgaging your residential or commercial property." },
  { id: "02", title: "Flexible usage", desc: "Use loan amount for business needs, education, medical support, or debt consolidation." },
  { id: "03", title: "Longer tenures", desc: "Repayment options are typically spread over longer durations for better affordability." },
  { id: "04", title: "Salaried and self-employed options", desc: "Both salaried and self-employed applicants can apply with profile-based documents." },
  { id: "05", title: "Structured verification", desc: "Property papers and income profile checks are handled in an organized process." },
  { id: "06", title: "Competitive pricing", desc: "Compare suitable lender options and choose practical interest structures." },
  { id: "07", title: "Transparent processing", desc: "Know lender-level processing and legal charges before final disbursal." },
  { id: "08", title: "Guided documentation", desc: "Our team supports document checklist completion from start to finish." },
];

const eligibility = [
  "Applicant should be at least 18 years old.",
  "Property ownership documents should be clear and complete.",
  "Valid applicant and co-applicant KYC documents are required.",
  "Income profile should support repayment capacity.",
  "Existing loan obligations must be disclosed if running.",
];

const documents = [
  "Self-employed (Proprietorship): Applicant and co-applicant KYC, residence electricity bill, GST registration certificate, last 2 years financials with CA stamp, last 1 year current account statement, last 1 year GST 3B return, running loan details (if any), office address proof, and property papers with complete chain.",
  "Salaried: Applicant and co-applicant KYC, residence electricity bill, office I-card, last 3 month salary slip, last 6 month bank statement, last 2 years Form 16, running loan details (if any), and property papers with complete chain.",
  "Upload format supported: PDF, JPG, JPEG, PNG (maximum 10MB per file).",
];

const applySteps = [
  "Click Apply Now and submit personal, income, residence, and loan requirement details.",
  "Verify mobile number with OTP and continue the secure flow.",
  "Select profile type (self-employed or salaried) and upload the required documents.",
  "Submit application; our team checks profile and property papers, then connects for next steps.",
];

const chargeRows = [
  ["Interest Rate", "As per lender program and applicant profile"],
  ["Processing Fees", "Approx. 0.5% to 2.5% of sanctioned amount"],
  ["Legal and Technical Valuation", "Depends on actuals and lender policy"],
  ["Pre-payment / Foreclosure", "Depends on lender terms"],
  ["Documentation Charges", "As applicable"],
  ["Penal / Bounce Charges", "As per lender schedule"],
];

const loanTypes = [
  ["LAP for Business Expansion", "Unlock property value for commercial growth and scaling."],
  ["LAP for Working Capital", "Support short-term and medium-term cash flow needs."],
  ["LAP for Debt Consolidation", "Consolidate higher-cost obligations into a structured loan."],
  ["LAP for Education and Medical Needs", "Fund major family requirements with secured borrowing."],
  ["LAP for Professional Needs", "Useful for professionals requiring larger ticket funding."],
];

const heroHighlights = [
  "For salaried and self-employed",
  "Higher eligibility with property security",
  "Flexible end use options",
  "Guided documentation support",
];

export default function LoanAgainstPropertyPage() {
  const { signedIn } = useAuth();
  const applyHref = signedIn ? "/loans/loan-against-property/apply" : "/sign-in?next=/loans/loan-against-property/apply";

  return (
    <main className="min-h-screen w-full bg-background pb-8">
      <div className="flex w-full flex-col gap-8">
        <section className="relative w-full bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#f8fafc_40%,#ffffff_100%)] px-4 pb-14 p-10 md:px-10 lg:px-16 xl:px-24">
          <div className="absolute -left-10 top-16 h-44 w-44 rounded-full bg-sky-200/30 blur-2xl" aria-hidden />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" aria-hidden />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                Loan Against Property
              </p>
              <h1 className="text-xl font-bold leading-tight text-slate-900 md:text-3xl">
                Unlock your property value and access larger funds for personal and business goals.
              </h1>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-800 md:text-base">
                Compare top lenders, choose the right tenure for your budget, and complete a simple online
                application in minutes with CapitalCare.
              </p>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
                The process is straightforward: submit your details, upload required property and income documents, and our
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
                src={lapHeroImage}
                alt="Loan against property overview"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="w-full bg-slate-100 px-4 py-12 md:px-10 lg:px-16 xl:px-24">
          <h2 className="text-center text-lg font-bold leading-tight text-slate-900 md:text-2xl">
            Online Loan Against Property <span className="text-cyan-600">Features and Benefits</span>
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-relaxed text-slate-800 md:text-base">
            Secured funding with flexible usage and structured eligibility for personal and business goals.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {featureCards.map((feature) => (
              <article
                key={feature.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-2xl font-semibold text-cyan-700">
                  {feature.id}
                </div>
                <h3 className="text-base font-bold text-cyan-700 md:text-lg">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="w-full bg-slate-100 px-4 py-10 md:px-10 lg:px-16 xl:px-24">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="text-lg font-bold text-slate-900 md:text-2xl">
                How to Apply for <span className="text-cyan-600">Loan Against Property Easy Approval?</span>
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
                  src={lapApplyImage}
                  alt="Loan against property application process"
                  className="h-auto w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-slate-50 px-4 py-10 md:px-10 lg:px-16 xl:px-24">
          <h2 className="text-center text-lg font-bold leading-tight text-slate-900 md:text-2xl">
            Loan Against Property <span className="text-sky-700">Eligibility and Documents</span>
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
                Loan Against Property <span className="text-sky-700">Interest Rate and Applicable Charges</span>
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
                src={lapChargesImage}
                alt="Loan against property rate and charges"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </section>

        <section className="w-full bg-slate-100 px-4 pb-10 pt-4 md:px-10 lg:px-16 xl:px-24">
          <h2 className="text-center text-lg font-bold leading-tight text-slate-900 md:text-2xl">
            Types of <span className="text-cyan-600">Loan Against Property</span>
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-relaxed text-slate-800 md:text-base">
            Choose the right loan purpose based on your needs and repayment comfort.
          </p>

          <div className="mx-auto mt-8 grid w-full max-w-5xl gap-4 md:grid-cols-2">
            {loanTypes.map((row) => (
              <article
                key={row[0]}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_32px_-26px_rgba(15,23,42,0.42)]"
              >
                <h3 className="border-l-4 border-cyan-500 pl-3 text-base font-bold text-slate-900 md:text-lg">{row[0]}</h3>
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
