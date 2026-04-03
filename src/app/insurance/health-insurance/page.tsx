import Image from "next/image";
import Link from "next/link";
import {
  hdfcErgoLogo,
  iciciLombardLogo,
  licLogo,
  relianceGeneralLogo,
  starHealthLogo,
  universalSompoLogo,
} from "@/assets/partners";
import {
  health_insurance1,
  health_insurance2,
  health_insurance3,
  health_insuranceForm,
  family_health_insurance,
} from "@/assets/health-insurance";

const trustLogos = [
  { src: hdfcErgoLogo, alt: "HDFC Ergo" },
  { src: iciciLombardLogo, alt: "ICICI Lombard" },
  { src: licLogo, alt: "LIC" },
  { src: starHealthLogo, alt: "Star Health" },
  { src: relianceGeneralLogo, alt: "Reliance General Insurance" },
  { src: universalSompoLogo, alt: "Universal Sompo" },
];

const keyBenefits = [
  {
    title: "Cashless hospitalization",
    description:
      "Get treatment at network hospitals without paying large upfront bills in emergencies.",
  },
  {
    title: "Pre and post hospitalization",
    description:
      "Coverage can include consultations, diagnostics, and medicines around your treatment window.",
  },
  {
    title: "Day-care procedures",
    description:
      "Modern procedures that do not require 24-hour admission can still be covered in many plans.",
  },
  {
    title: "Tax benefits",
    description:
      "Premiums may qualify for tax deductions under prevailing income tax rules.",
  },
];

const quickFacts = [
  "Plans for individuals, families, and senior citizens",
  "Flexible sum insured options",
  "Top-up and super top-up variants",
  "Optional add-ons like critical illness and OPD",
];

const documentsRequired = [
  {
    title: "Age Proof",
    description:
      "Driving licence, voter ID, passport, birth certificate, or any valid age document.",
  },
  {
    title: "Identity Proof",
    description:
      "PAN card, passport, driving licence, voter ID, or equivalent government-issued ID.",
  },
  {
    title: "Proof of Address",
    description:
      "Aadhaar card, utility bill, bank statement, passport, voter ID, or ration card.",
  },
  {
    title: "Medical Reports",
    description:
      "In some cases, a basic medical checkup report is needed during policy issuance or claims.",
  },
];

const payoutOptions = [
  {
    id: "01",
    title: "Cashless Treatment",
    description:
      "The insurer settles bills directly with a network hospital so you do not pay most treatment costs upfront.",
  },
  {
    id: "02",
    title: "Reimbursement Option",
    description:
      "You can pay first at a non-network hospital and claim eligible costs later by submitting bills and documents.",
  },
  {
    id: "03",
    title: "Hospital Daily Cash Benefit",
    description:
      "A fixed daily amount can be provided during hospitalization to support incidental non-medical expenses.",
  },
  {
    id: "04",
    title: "Top-Up Plans (Supplementary Coverage)",
    description:
      "Top-up plans add extra cover after a deductible and are useful when treatment costs exceed base policy limits.",
  },
  {
    id: "05",
    title: "Critical Illness Benefit",
    description:
      "A lump sum payout may be released on diagnosis of covered critical illnesses such as cancer or heart disease.",
  },
];

const policyTypes = [
  {
    title: "Medical Insurance for Individuals",
    description:
      "Individual health insurance is suitable for one person and covers eligible medical expenses, hospitalization, and treatment needs based on the selected plan.",
    details:
      "It is a practical choice for professionals and first-time buyers who want focused coverage, better control on premium budget, and flexibility to compare insurers.",
    image: health_insurance3,
    alt: "Individual health insurance",
  },
  {
    title: "Health Insurance Family",
    description:
      "Family health insurance allows multiple family members to be covered under one policy so benefits can be accessed without maintaining separate plans for each person.",
    details:
      "It helps optimize premium cost, simplifies policy management, and is useful for families looking for unified protection with options to customize sum insured.",
    image: family_health_insurance,
    alt: "Family health insurance",
  },
];

export default function HealthInsurancePage() {
  return (
    <main className="w-full overflow-hidden bg-slate-50 text-slate-900">
      <section className="relative w-full bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#f8fafc_40%,#ffffff_100%)] px-4 pb-16 pt-10 md:px-10 lg:px-16 xl:px-24">
        <div className="absolute -left-10 top-16 h-44 w-44 rounded-full bg-sky-200/30 blur-2xl" aria-hidden />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" aria-hidden />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Health Insurance
            </p>
            <h1 className="text-xl font-bold leading-tight text-slate-900 md:text-3xl">
              Protect your family with complete health coverage, not just a policy.
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-800 md:text-base">
              Compare trusted insurers, choose the right cover for your needs, and apply in minutes.
              This page is designed for full-width browsing so it feels natural on desktop and mobile.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {quickFacts.map((item) => (
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
                href="/insurance/health-insurance/apply"
                className="inline-flex items-center justify-center rounded-xl bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
              >
                Apply Now
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)]">
            <Image
              src={health_insurance1}
              alt="Health insurance overview"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-rose-50/40 px-4 py-12 md:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center text-lg font-bold text-slate-900 md:text-2xl">
            There are two simple types of health insurance policies:
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {policyTypes.map((type) => (
              <article
                key={type.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_45px_-28px_rgba(14,165,233,0.3)]"
              >
                <div className="relative min-h-80 w-full">
                  <Image
                    src={type.image}
                    alt={type.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg font-bold text-rose-500 md:text-2xl">{type.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">{type.description}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">{type.details}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-50 px-4 py-12 md:px-10 lg:px-16 xl:px-24">
        <div className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-[linear-gradient(90deg,#ffffff_0%,#eef2ff_100%)] p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.45)] lg:grid-cols-[1.15fr_0.85fr] md:p-8">
          <div>
            <h2 className="text-lg font-bold leading-tight text-slate-900 md:text-2xl">
              What are the <span className="text-sky-700">Documents Required</span> for an insurance claim?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
              Keep these documents ready while filing a claim for faster verification and smoother settlement.
            </p>

            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-800 md:text-base">
              {documentsRequired.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-sky-700">✧</span>
                  <span>
                    <span className="font-semibold text-slate-900">{item.title}:</span> {item.description}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
               <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-slate-900 bg-black px-7 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-200 hover:border-slate-900 hover:text-slate-900"
              >
                Talk to Advisor
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl">
            <Image
              src={health_insurance2}
              alt="Insurance claim document checklist"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>
      
      <section className="w-full bg-slate-100 px-4 py-10 md:px-10 lg:px-16 xl:px-24">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h2 className="text-lg font-bold text-slate-900 md:text-2xl">What your health plan should actually include</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
              A good policy should be practical during real emergencies. Focus on claim usability,
              network hospitals, and coverage depth instead of just premium amount.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {keyBenefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.45)]"
                >
                  <h3 className="text-base font-bold text-slate-900 md:text-lg">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-800 md:text-base">{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(2,132,199,0.45)]">
              <Image
                src={health_insuranceForm}
                alt="Health insurance benefits"
                className="h-auto w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-slate-100 px-4 py-12 md:px-10 lg:px-16 xl:px-24">
        <h2 className="text-center text-lg font-bold leading-tight text-slate-900 md:text-2xl">
          What are the <span className="text-cyan-600">Payout Options Available</span> in Health Insurance?
        </h2>
        <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-relaxed text-slate-800 md:text-base">
          Health insurance policies offer multiple payout routes so policyholders can choose convenience,
          flexibility, and stronger financial protection during treatment.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {payoutOptions.map((option) => (
            <article
              key={option.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-2xl font-semibold text-cyan-700">
                {option.id}
              </div>
              <h3 className="text-base font-bold text-cyan-700 md:text-lg">{option.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">{option.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/sign-in?next=/insurance/health-insurance"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
          >
            Apply Now
          </Link>
        </div>
      </section>

      <section className="w-full px-4 py-10 md:px-10 lg:px-16 xl:px-24">
        <h2 className="text-center text-lg font-bold text-slate-900 md:text-2xl">Trusted Insurance Partners</h2>
        <p className="mt-3 text-center text-sm text-slate-700 md:text-base">
          Strong network support across top insurers for better claims and service experience.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {trustLogos.map((logo) => (
            <article
              key={logo.alt}
              className="flex min-h-24 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                className="max-h-14 w-auto object-contain"
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
