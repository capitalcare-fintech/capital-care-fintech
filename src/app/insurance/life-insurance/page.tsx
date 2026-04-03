import Image from "next/image";
import Link from "next/link";
import {
    lifeInsurance1,
    lifeInsurance2,
    lifeInsurance3,
    lifeInsurance4,
    lifeInsurance5,
    lifeInsurance6,
} from "@/assets/life-insurance";
import {
    hdfcErgoLogo,
    iciciLombardLogo,
    licLogo,
    niva_bupaLogo,
    orientalInsuranceLogo,
    starHealthLogo,
} from "@/assets/partners";

const trustLogos = [
    { src: hdfcErgoLogo, alt: "HDFC Ergo" },
    { src: iciciLombardLogo, alt: "ICICI Lombard" },
    { src: licLogo, alt: "LIC" },
    { src: niva_bupaLogo, alt: "Niva Bupa" },
    { src: orientalInsuranceLogo, alt: "Oriental Insurance" },
    { src: starHealthLogo, alt: "Star Health" },
];

const quickFacts = [
    "Term and whole life options available",
    "Lump sum payout for nominee security",
    "Optional riders for wider protection",
    "Tax benefits under applicable rules",
];

const policyTypes = [
    {
        title: "Term Life Insurance",
        description:
            "Term life plans provide high coverage at affordable premiums for a fixed policy term, making them ideal for income replacement planning.",
        details:
            "If the policyholder passes away during the term, the nominee receives the sum assured to support household and financial commitments.",
        image: lifeInsurance2,
        alt: "Term life insurance",
    },
    {
        title: "Savings and Endowment Plans",
        description:
            "These plans combine life cover with disciplined long-term savings and can help create a corpus for future milestones.",
        details:
            "Depending on plan terms, you may receive maturity benefits while still ensuring life protection throughout the policy period.",
        image: lifeInsurance3,
        alt: "Savings life insurance",
    },
];

const documentsRequired = [
    {
        title: "Identity Proof",
        description: "Aadhaar card, PAN card, passport, voter ID, or driving license.",
    },
    {
        title: "Address Proof",
        description: "Utility bill, bank statement, passport, voter ID, or rent agreement.",
    },
    {
        title: "Income Proof",
        description: "Salary slips, ITR, Form 16, or recent bank statements.",
    },
    {
        title: "Age Proof",
        description: "Birth certificate, Aadhaar card, passport, or PAN card.",
    },
    {
        title: "Medical Details",
        description: "Medical reports may be requested based on age, sum assured, and plan type.",
    },
];

const keyBenefits = [
    {
        title: "Financial security for family",
        description:
            "Life cover creates a dependable financial cushion for your dependents in your absence.",
    },
    {
        title: "Goal protection",
        description:
            "Planned payouts can help protect long-term goals like education, home loans, and retirement.",
    },
    {
        title: "Rider flexibility",
        description:
            "Add-ons like accidental death, critical illness, and waiver of premium can strengthen protection.",
    },
    {
        title: "Long-term discipline",
        description:
            "Certain plan categories encourage consistent savings while providing life insurance benefits.",
    },
];

const payoutOptions = [
    {
        id: "01",
        title: "Lump Sum Payout",
        description:
            "Nominee receives the complete sum assured at once to handle immediate financial obligations.",
    },
    {
        id: "02",
        title: "Monthly Income Payout",
        description:
            "A regular monthly income option can support recurring household expenses over time.",
    },
    {
        id: "03",
        title: "Combination Payout",
        description:
            "A part lump sum with the remaining amount in installments balances liquidity and continuity.",
    },
    {
        id: "04",
        title: "Maturity Benefit",
        description:
            "Savings-linked plans may offer a maturity amount if the policyholder survives the full term.",
    },
];

export default function LifeInsurancePage() {
    return (
        <main className="w-full overflow-hidden bg-slate-50 text-slate-900">
            <section className="relative w-full bg-[radial-gradient(circle_at_top_left,#e0f2fe_0%,#f8fafc_40%,#ffffff_100%)] px-4 pb-16 pt-10 md:px-10 lg:px-16 xl:px-24">
                <div className="absolute -left-10 top-16 h-44 w-44 rounded-full bg-sky-200/30 blur-2xl" aria-hidden />
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl" aria-hidden />

                <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-6">
                        <p className="inline-flex rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                            Life Insurance
                        </p>
                        <h1 className="text-xl font-bold leading-tight text-slate-900 md:text-3xl">
                            Build lasting financial protection for your loved ones with the right life cover.
                        </h1>
                        <p className="max-w-3xl text-sm leading-relaxed text-slate-800 md:text-base">
                            Compare suitable plans, understand payout choices, and apply in minutes with confidence.
                            The layout follows full-width sections for a clean and easy reading experience.
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
                                href="/insurance/life-insurance/apply"
                                // href="/sign-in?next=/insurance/life-insurance/apply"
                                className="inline-flex items-center justify-center rounded-xl bg-cyan-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
                            >
                                Apply Now
                            </Link>  
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-4xl border border-slate-200  shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)]">
                        <Image
                            src={lifeInsurance1}
                            alt="Life insurance overview"
                            className="h-80  object-fit"
                            priority
                        />
                    </div>
                </div>
            </section>

            <section className="w-full bg-rose-50/40 px-4 py-12 md:px-10 lg:px-16 xl:px-24">
                <div className="mx-auto w-full max-w-6xl">
                    <h2 className="text-center text-lg font-bold text-slate-900 md:text-2xl">
                        Popular life insurance plan categories:
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
                                        className="object-fit"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="p-5 md:p-6">
                                    <h3 className="text-base font-bold text-slate-900 md:text-xl">{type.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">{type.description}</p>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">{type.details}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="w-full bg-slate-50 px-4 py-12 md:px-10 lg:px-16 xl:px-24">
                <div className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-[linear-gradient(90deg,#ffffff_0%,#ecfeff_100%)] p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.45)] lg:grid-cols-[1.15fr_0.85fr] md:p-8">
                    <div>
                        <h2 className="text-lg font-bold leading-tight text-slate-900 md:text-2xl">
                            What are the <span className="text-cyan-700">documents required</span> to apply?
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
                            Keeping basic KYC and income documents ready helps speed up proposal processing and underwriting.
                        </p>

                        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-800 md:text-base">
                            {documentsRequired.map((item) => (
                                <li key={item.title} className="flex items-start gap-3">
                                    <span aria-hidden className="mt-1 text-cyan-700">✧</span>
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
                            src={lifeInsurance4}
                            alt="Life insurance documents"
                            className="h-auto w-full object-contain"
                        />
                    </div>
                </div>
            </section>

            <section className="w-full bg-slate-100 px-4 py-10 md:px-10 lg:px-16 xl:px-24">
                <div className="grid lg:flex justify-center items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 md:text-2xl">What a strong life plan should include</h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
                            Evaluate protection quality based on claim settlement support, rider flexibility, and payout suitability.
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
                        <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(14,116,144,0.45)]">
                            <Image
                                src={lifeInsurance5}
                                alt="Life insurance planning"
                                className="h-auto w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-white px-4 py-12 md:px-10 lg:px-16 xl:px-24">
                <h2 className="text-center text-lg font-bold leading-tight text-slate-900 md:text-2xl">
                    Payout options available in life insurance
                </h2>
                <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-relaxed text-slate-800 md:text-base">
                    Life insurance plans can be structured to support immediate needs and long-term household stability.
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
                 <div className="mt-8 flex justify-center ">
                        <Link
                            href="/sign-in?next=/insurance/life-insurance"
                            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
                        >
                            Apply Now
                        </Link>
                    </div>
            </section>

            <section className="w-full px-4 py-10 md:px-10 lg:px-16 xl:px-24">
                <h2 className="text-center text-lg font-bold text-slate-900 md:text-2xl">Trusted Insurance Partners</h2>
                <p className="mt-3 text-center text-sm text-slate-700 md:text-base">
                    Access plans from reputed insurers with broad service and claim support.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {trustLogos.map((logo) => (
                        <article
                            key={logo.alt}
                            className="flex min-h-24 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-3"
                        >
                            <Image src={logo.src} alt={logo.alt} className="max-h-14 w-auto object-contain" />
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
