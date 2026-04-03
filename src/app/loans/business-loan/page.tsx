"use client";

import Image from "next/image";
import Link from "next/link";
import businessLoanImage from "@/assets/inDemand/buisness.png";
import chargesImage from "@/assets/heroSlide/loan-image.png";
import { useAuth } from "@/lib/useAuth";
import { FaBuilding, FaCheckCircle, FaStar, FaUniversity, FaUsers } from "react-icons/fa";

const featureCards = [
	{ title: "Higher loan eligibility", desc: "Get funding aligned to your business turnover and repayment profile." },
	{ title: "Flexible end use", desc: "Use funds for working capital, expansion, machinery, inventory, or cash flow management." },
	{ title: "Competitive rates", desc: "Compare lender programs and select the most practical business loan offer." },
	{ title: "Structured documentation", desc: "Submit profile-specific documents with clear guidance at each step." },
	{ title: "Fast in-principle decision", desc: "Quick screening helps you know the likely eligibility early." },
	{ title: "Digital application", desc: "Apply online and track status with minimal branch visits." },
	{ title: "Multiple business profiles", desc: "Available for proprietorship, partnership, and private limited entities." },
	{ title: "Transparent charges", desc: "Charges and lender-specific fees are shared upfront before final processing." },
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

export default function BusinessLoanPage() {
	const { signedIn } = useAuth();
	const applyHref = signedIn ? "/dashboard" : "/sign-in?next=/loans/business-loan/apply";

	return (
		<main className="min-h-screen w-full bg-background py-8">
			<div className="flex w-full flex-col gap-8">
				<section className="w-full px-40 py-10 md:px-10 lg:px-16">
					<div className="w-full">
						<h1 className="text-xl font-bold text-slate-900 md:text-3xl">Business Loan</h1>
						<p className="mt-4 w-full text-sm leading-relaxed text-slate-900 md:text-lg">
							Business Loan helps you manage growth opportunities, working capital cycles, and urgent commercial
							requirements with structured financing support. Capital Care helps you compare suitable lender options
							and proceed with practical documentation.
						</p>
						<p className="mt-3 w-full text-sm leading-relaxed text-slate-700 md:text-base">
							The application journey is straightforward: fill your profile details, verify OTP, upload required
							business documents based on company type, and submit. Our team then reviews and connects with you for
							sanction and disbursal process support.
						</p>

						<div className="mt-5">
							<Link
								href="/loans/business-loan/apply"
								className="inline-flex rounded-full bg-linear-to-r from-sky-400 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white hover:brightness-110"
							>
								Apply Now
							</Link>
						</div>

						<div className="mt-5 grid gap-3 text-sm text-slate-900 md:grid-cols-2 md:text-sm xl:grid-cols-4">
							<p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />For Proprietorship, Partnership, and Pvt Ltd</p>
							<p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />Working Capital and Expansion Funding</p>
							<p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />Fast In-Principle Review</p>
							<p className="flex items-center gap-2"><FaCheckCircle className="text-sky-600" />Transparent Lender Charges</p>
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
					<h2 className="text-center text-xl font-bold text-slate-900 md:text-2xl">Business Loan Features and Benefits</h2>
					<p className="mx-auto mt-4 max-w-6xl text-center text-sm text-slate-800 md:text-base">
						Choose flexible commercial funding options designed for operating businesses and growth plans.
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
					<h2 className="text-lg font-bold text-slate-900 md:text-2xl">What are the Eligibility Criteria for Business Loan?</h2>
					<ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-800 md:text-base">
						{eligibility.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</section>

				<section className="w-full px-4 md:px-10 lg:px-16">
					<h2 className="text-lg font-bold text-slate-900 md:text-2xl">What Documents are Required for Business Loan?</h2>
					<ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-800 md:text-base">
						{documents.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</section>

				<section className="w-full px-4 md:px-10 lg:px-16">
					<h2 className="text-lg font-bold text-slate-900 md:text-2xl">How to Apply for Business Loan?</h2>
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
							<Image src={businessLoanImage} alt="Apply business loan" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
						</div>
					</div>

					<div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-slate-700 md:text-base">
						Fill the form, upload profile-based documents, and submit. Our team coordinates further lender process.
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
					<h2 className="text-lg font-bold text-slate-900 md:text-2xl">Business Loan Interest Rate and Applicable Charges</h2>
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
							<Image src={chargesImage} alt="Business loan charges" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
						</div>
					</div>
				</section>

				<section className="w-full px-4 pb-10 md:px-10 lg:px-16">
					<h2 className="text-center text-lg font-bold text-slate-900 md:text-2xl">Types of Business Loan</h2>
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
