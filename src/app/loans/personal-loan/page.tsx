"use client";

import Image from "next/image";
import Link from "next/link";
import personalLoanImage from "@/assets/inDemand/personal.png";
import chargesImage from "@/assets/heroSlide/loan-image.png";
import { EmiCalculator } from "@/components/loans/EmiCalculator";
import { useAuth } from "@/lib/useAuth";
import { FaBuilding, FaCheckCircle, FaStar, FaUniversity, FaUsers } from "react-icons/fa";

const featureCards = [
  { title: "Swift approval", desc: "Upload basic documents and get fast conditional approval." },
  { title: "Quick disbursement", desc: "Approved amount is digitally transferred to your account." },
  { title: "Minimal documentation", desc: "Simple KYC and income checks keep the process lightweight." },
  { title: "No collateral", desc: "Most personal loan options do not need collateral." },
  { title: "Friendly interest options", desc: "Compare multiple lenders and select the best match." },
  { title: "No hidden foreclosure surprises", desc: "Transparent lender terms for closure and prepayment." },
  { title: "Customizable tenure", desc: "Choose repayment duration based on your monthly budget." },
  { title: "Paperless process", desc: "Track your status online with easy digital communication." },
];

const eligibility = [
  "Age above 18 years.",
  "Salaried person with steady income.",
  "Minimum net monthly income as per city profile.",
  "Valid KYC and PAN details.",
  "Good repayment behavior improves offer quality.",
];

const documents = [
  "Aadhar Card (Applicant), PAN Card (Applicant), and Applicant Photo.",
  "Latest Electricity Bill for residence proof.",
  "Salaried profile: Office I-Card, last 3 month salary slips, last 6 month bank statement, and last 2 years Form 16.",
  "Self-employed profile: Last 2 years ITR with computation, last 1 year current account bank statement, and office address proof.",
  "Existing loan details (if any) can be uploaded as optional supporting documents.",
  "Upload format supported: PDF, JPG, JPEG, PNG (maximum 10MB per file).",
];

const applySteps = [
  "Click Apply Now and complete your personal, employment, residence, and loan details.",
  "Verify your mobile number using OTP and continue the application.",
  "Upload the required documents based on your employment profile.",
  "Submit the form; our team reviews the details and contacts you with the next steps.",
];

const chargeRows = [
  ["Interest Rate", "Starting from 9.99% per annum"],
  ["Loan Processing Fees", "0.5% to 5% of principal amount"],
  ["Pre-payment / Foreclosure", "Depends on lender policy and loan type"],
  ["Legal Fees", "Depends on actuals"],
  ["Stamp Duty Charges", "Depends on actuals"],
  ["EMI / Cheque Bounce", "Approximately INR 400 per bounce"],
];

const loanTypes = [
  ["Personal Loan for Wedding", "Make your wedding grand with an affordable personal loan."],
  ["Personal Loan for Travel", "Travel confidently with planned EMIs and easy disbursal."],
  ["Personal Loan for Medical Emergency", "Manage urgent bills with quick approval and disbursal."],
  ["Advance Salary Loan", "Access short-term funds before payday."],
  ["Personal Overdraft Loan", "Get additional money whenever needed."],
];

export default function PersonalLoanPage() {
  const { signedIn } = useAuth();
  const applyHref = signedIn ? "/dashboard" : "/sign-in?next=/loans/personal-loan/apply";

  return (
    <main className="min-h-screen w-full bg-background py-8">
      <div className="flex w-full flex-col gap-8">
        <section className="w-full px-40 py-10 md:px-10 lg:px-16">
          <div className="w-full">
            <div className="w-full">
              <h1 className="text-xl font-bold text-slate-900 md:text-3xl">Personal Loan</h1>
              <p className="mt-4 w-full text-sm leading-relaxed text-slate-900 md:text-lg">
                Personal Loan is your go-to solution for managing financial emergencies. Meet all your urgent
                financial needs with an instant personal loan while improving your credit score.
                Explore personal loans at competitive interest rates with CapitalCare.
              </p>
              <p className="mt-3 w-full text-sm leading-relaxed text-slate-700 md:text-base">
                The application journey is simple and practical: fill the required form fields,
                upload your documents, and submit. There is no separate profile search step.
                Once submitted, our loan team reviews your application and reaches out directly
                to guide you through approval and disbursal.
              </p>

              <div className="mt-5">
                <Link
                  href="/loans/personal-loan/apply"
                  className="inline-flex rounded-full bg-linear-to-r from-sky-400 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
                >
                  Apply Now
                </Link>
              </div>

              <div className="mt-5 grid gap-3 text-sm text-slate-900 md:grid-cols-2 md:text-sm xl:grid-cols-4">
                <p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />For Salaried Individuals</p>
                <p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />No Collateral Required</p>
                <p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />Disbursal in 24 Hours</p>
                <p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />Interest Rate @ 9.99% p.a.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-4 md:px-10 lg:px-16">
          <div className="rounded-2xl border border-sky-200/70 bg-white/90 px-5 py-5 shadow-[0_16px_45px_-28px_rgba(14,165,233,0.45)]">
            <div className="grid grid-cols-2 gap-5 text-center md:grid-cols-5">
              <div>
                <p className="text-xs font-semibold md:text-sm">Trusted by our customers</p>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-lg font-bold md:text-2xl"><FaStar className="text-sky-500" />4.5</p>
                <p className="text-sm text-slate-600 md:text-base">5 Rating</p>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-lg font-bold md:text-2xl"><FaUsers className="text-sky-600" />10K+</p>
                <p className="text-sm text-slate-600 md:text-base">Happy Customers</p>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-lg font-bold md:text-2xl"><FaUniversity className="text-sky-600" />90+</p>
                <p className="text-sm text-slate-600 md:text-base">Banks</p>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-lg font-bold md:text-2xl"><FaBuilding className="text-sky-600" />155</p>
                <p className="text-sm text-slate-600 md:text-base">Branches and Franchises</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-linear-to-br from-white via-sky-50 to-cyan-50 px-4 py-10 md:px-10 lg:px-16">
          <h2 className="text-center text-xl font-bold text-slate-900 md:text-2xl">Online Personal Loan Features and Benefits</h2>
          <p className="mx-auto mt-4 max-w-6xl text-center text-sm text-slate-800 md:text-base">
            Quick personal loans are the commonly preferred approach to fulfilling monetary requirements.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featureCards.map((feature, index) => (
              <article key={feature.title} className="rounded-3xl border border-sky-200/60 bg-white/95 p-5 shadow-[0_16px_45px_-28px_rgba(14,165,233,0.45)]">
                <div className="mb-2 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700 md:text-lg">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-bold text-slate-900 md:text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-700 md:text-base">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="w-full px-4 md:px-10 lg:px-16">
          <h2 className="text-lg font-bold text-slate-900 md:text-2xl">What are the Eligibility Criteria for a Quick Personal Loan?</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-800 md:text-base">
            {eligibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="w-full px-4 md:px-10 lg:px-16">
          <h2 className="text-lg font-bold text-slate-900 md:text-2xl">What Documents are Required for Fast Approval Personal Loan?</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-800 md:text-base">
            {documents.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="w-full px-4 md:px-10 lg:px-16">
          <h2 className="text-lg font-bold text-slate-900 md:text-2xl">How to Apply for Personal Loan Easy Approval?</h2>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.4fr]">
            <ol className="space-y-3">
              {applySteps.map((step, index) => (
                <li key={step} className="flex items-center gap-3 rounded-xl border border-sky-200 bg-white px-4 py-3 text-sm text-slate-800 md:text-base">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">{String(index + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="relative min-h-72 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Image src={personalLoanImage} alt="Apply personal loan" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-slate-700 md:text-base">
            No separate search is required. Fill the form, upload documents, and submit. Our team will contact you.
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href={applyHref}
              className="rounded-full bg-linear-to-r from-sky-400 to-indigo-500 px-10 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 md:text-base"
            >
              Apply Now
            </Link>
          </div>
        </section>

        <section className="w-full px-4 md:px-10 lg:px-16">
          <h2 className="text-lg font-bold text-slate-900 md:text-2xl">Personal Loan Interest Rate and Applicable Charges</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.4fr]">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full border-collapse text-left text-sm md:text-base">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border border-slate-200 px-4 py-3">Specifics</th>
                    <th className="border border-slate-200 px-4 py-3">Charges</th>
                  </tr>
                </thead>
                <tbody>
                  {chargeRows.map((row) => (
                    <tr key={row[0]}>
                      <td className="border border-slate-200 px-4 py-3">{row[0]}</td>
                      <td className="border border-slate-200 px-4 py-3">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="relative min-h-80 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Image src={chargesImage} alt="Loan charges" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
            </div>
          </div>
        </section>

        <section className="w-full px-4 pb-10 md:px-10 lg:px-16">
          <h2 className="text-center text-lg font-bold text-slate-900 md:text-2xl">Types of Online Personal Loan</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-3">Types of Personal Loan</th>
                  <th className="border border-slate-200 px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                {loanTypes.map((row) => (
                  <tr key={row[0]}>
                    <td className="border border-slate-200 px-4 py-3 font-semibold text-slate-900">{row[0]}</td>
                    <td className="border border-slate-200 px-4 py-3">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
