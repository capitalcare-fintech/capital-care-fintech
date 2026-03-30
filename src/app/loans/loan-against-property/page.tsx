"use client";

import Image from "next/image";
import Link from "next/link";
import lapImage from "@/assets/inDemand/property.jpg";
import chargesImage from "@/assets/heroSlide/loan-image.jpg";
import { useAuth } from "@/lib/useAuth";
import { FaBuilding, FaCheckCircle, FaStar, FaUniversity, FaUsers } from "react-icons/fa";

const featureCards = [
	{ title: "Secured funding", desc: "Get higher loan eligibility by mortgaging your residential or commercial property." },
	{ title: "Flexible usage", desc: "Use loan amount for business needs, education, medical support, or debt consolidation." },
	{ title: "Longer tenures", desc: "Repayment options are typically spread over longer durations for better affordability." },
	{ title: "Salaried and self-employed options", desc: "Both salaried and self-employed applicants can apply with profile-based documents." },
	{ title: "Structured verification", desc: "Property papers and income profile checks are handled in an organized process." },
	{ title: "Competitive pricing", desc: "Compare suitable lender options and choose practical interest structures." },
	{ title: "Transparent processing", desc: "Know lender-level processing and legal charges before final disbursal." },
	{ title: "Guided documentation", desc: "Our team supports document checklist completion from start to finish." },
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

export default function LoanAgainstPropertyPage() {
	const { signedIn } = useAuth();
	const applyHref = signedIn ? "/dashboard" : "/sign-in?next=/loans/loan-against-property/apply";

	return (
		<main className="min-h-screen w-full bg-background py-8">
			<div className="flex w-full flex-col gap-8">
				<section className="w-full px-40 py-10 md:px-10 lg:px-16">
					<div className="w-full">
						<h1 className="text-xl font-bold text-slate-900 md:text-3xl">Loan Against Property (LAP)</h1>
						<p className="mt-4 w-full text-sm leading-relaxed text-slate-900 md:text-lg">
							Loan Against Property helps you unlock value from your property and access larger funds for personal or
							business goals. Capital Care supports you with profile-based lender matching and documentation guidance.
						</p>
						<p className="mt-3 w-full text-sm leading-relaxed text-slate-700 md:text-base">
							The process is simple: fill your profile details, verify OTP, upload required documents, and submit.
							Once submitted, our loan team reviews your profile and property documents and helps you move ahead.
						</p>

						<div className="mt-5">
							<Link
								href="/loans/loan-against-property/apply"
								className="inline-flex rounded-full bg-linear-to-r from-sky-400 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
							>
								Apply Now
							</Link>
						</div>

						<div className="mt-5 grid gap-3 text-sm text-slate-900 md:grid-cols-2 md:text-sm xl:grid-cols-4">
							<p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />For Salaried and Self Employed</p>
							<p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />Higher Eligibility with Property Security</p>
							<p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />Flexible End Use</p>
							<p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />Guided Documentation Support</p>
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
					<h2 className="text-center text-xl font-bold text-slate-900 md:text-2xl">Loan Against Property Features and Benefits</h2>
					<p className="mx-auto mt-4 max-w-6xl text-center text-sm text-slate-800 md:text-base">
						Access secured funding with structured documentation and profile-specific lender options.
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
					<h2 className="text-lg font-bold text-slate-900 md:text-2xl">What are the Eligibility Criteria for LAP?</h2>
					<ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-800 md:text-base">
						{eligibility.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</section>

				<section className="w-full px-4 md:px-10 lg:px-16">
					<h2 className="text-lg font-bold text-slate-900 md:text-2xl">What Documents are Required for Loan Against Property?</h2>
					<ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-800 md:text-base">
						{documents.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</section>

				<section className="w-full px-4 md:px-10 lg:px-16">
					<h2 className="text-lg font-bold text-slate-900 md:text-2xl">How to Apply for Loan Against Property?</h2>
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
							<Image src={lapImage} alt="Apply loan against property" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
						</div>
					</div>

					<div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-slate-700 md:text-base">
						Submit details with property documents and required profile proof; our team coordinates the next process.
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
					<h2 className="text-lg font-bold text-slate-900 md:text-2xl">LAP Interest Rate and Applicable Charges</h2>
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
							<Image src={chargesImage} alt="LAP charges" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
						</div>
					</div>
				</section>

				<section className="w-full px-4 pb-10 md:px-10 lg:px-16">
					<h2 className="text-center text-lg font-bold text-slate-900 md:text-2xl">Types of Loan Against Property</h2>
					<div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
						<table className="w-full border-collapse text-left text-sm md:text-base">
							<thead className="bg-slate-100">
								<tr>
									<th className="border border-slate-200 px-4 py-3">Type</th>
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
