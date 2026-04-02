import Image from "next/image";
import Link from "next/link";
import {
    motorInsurance1,
    motorInsurance2,
    motorInsurance3,
    motorInsurance4,
} from "@/assets/motor-insurance";
import {
    hdfcErgoLogo,
    iciciLombardLogo,
    magmaIsuranceLogo,
    orientalInsuranceLogo,
    relianceGeneralLogo,
    universalSompoLogo,
} from "@/assets/partners";

const trustLogos = [
    { src: hdfcErgoLogo, alt: "HDFC Ergo" },
    { src: iciciLombardLogo, alt: "ICICI Lombard" },
    { src: relianceGeneralLogo, alt: "Reliance General" },
    { src: universalSompoLogo, alt: "Universal Sompo" },
    { src: magmaIsuranceLogo, alt: "Magma Insurance" },
    { src: orientalInsuranceLogo, alt: "Oriental Insurance" },
];

const quickFacts = [
    "Coverage for private and commercial vehicles",
    "Third-party and comprehensive plans",
    "Add-ons like zero depreciation and RSA",
    "Fast claim support with network garages",
];

const policyTypes = [
    {
        title: "Third-Party Liability Cover",
        description:
            "Mandatory cover that protects you against legal liabilities for third-party injury, death, or property damage.",
        details:
            "It keeps you compliant with regulations while safeguarding against major out-of-pocket legal expenses.",
        image: motorInsurance2,
        alt: "Third-party motor insurance",
    },
    {
        title: "Comprehensive Motor Insurance",
        description:
            "Comprehensive plans include third-party coverage plus own-damage protection for your insured vehicle.",
        details:
            "You can enhance the plan with add-ons such as engine protection, zero depreciation, and consumable cover.",
        image: motorInsurance3,
        alt: "Comprehensive motor insurance",
    },
];

const documentsRequired = [
    {
        title: "For New Policy",
        description: "Vehicle RC, valid driving license, identity proof, and address proof.",
    },
    {
        title: "For Renewal",
        description: "Existing policy copy, RC, driving license, and KYC documents.",
    },
    {
        title: "For Accident Claim",
        description: "FIR (if applicable), photos of damage, RC, license, and repair estimate.",
    },
    {
        title: "For Theft Claim",
        description: "FIR, untrace report, RC, policy copy, keys, and ownership proof.",
    },
];

const keyBenefits = [
    {
        title: "Financial protection from repair bills",
        description:
            "Comprehensive cover helps absorb major repair costs from accidents, fire, flood, and natural events.",
    },
    {
        title: "Third-party liability support",
        description:
            "Protects you from legal and compensation costs due to third-party injury or property damage.",
    },
    {
        title: "Cashless network garages",
        description:
            "Repairs can be completed at partner garages with reduced upfront payment burden.",
    },
    {
        title: "Optional add-on flexibility",
        description:
            "Choose riders such as zero dep, NCB protect, roadside assistance, and engine guard.",
    },
];

const payoutOptions = [
    {
        id: "01",
        title: "Cashless Claim Settlement",
        description:
            "Vehicle is repaired at a network garage and the insurer directly settles eligible expenses.",
    },
    {
        id: "02",
        title: "Reimbursement Claim",
        description:
            "You can repair at a non-network garage and claim reimbursement by submitting bills and documents.",
    },
    {
        id: "03",
        title: "Total Loss Payout",
        description:
            "If damage is beyond economical repair, payout is made based on insured declared value terms.",
    },
    {
        id: "04",
        title: "Theft Claim Settlement",
        description:
            "In case of vehicle theft, settlement is processed after required police and insurer documentation.",
    },
];

export default function MotorInsurancePage() {
    return (
        <main className="w-full overflow-hidden bg-slate-50 text-slate-900">
            <section className="relative w-full bg-[radial-gradient(circle_at_top_left,#e0f2fe_0%,#f8fafc_40%,#ffffff_100%)] px-4 pb-16 pt-10 md:px-10 lg:px-16 xl:px-24">
                <div className="absolute -left-8 top-14 h-48 w-48 rounded-full bg-sky-200/30 blur-2xl" aria-hidden />
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" aria-hidden />

                <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-6">
                        <p className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                            Motor Insurance
                        </p>
                        <h1 className="text-xl font-bold leading-tight text-slate-900 md:text-3xl">
                            Keep every drive protected with smart and reliable motor insurance coverage.
                        </h1>
                        <p className="max-w-3xl text-sm leading-relaxed text-slate-800 md:text-base">
                            Choose the right plan for your car or bike, understand claim pathways, and apply quickly.
                            The full-width page design keeps each section easy to scan on mobile and desktop.
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
                                href="/contact-us"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                            >
                                Talk to Advisor
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)]">
                        <Image
                            src={motorInsurance1}
                            alt="Motor insurance overview"
                            className="h-80  object-fit"
                            priority
                        />
                    </div>
                </div>
            </section>

            <section className="w-full bg-rose-50/40 px-4 py-12 md:px-10 lg:px-16 xl:px-24">
                <div className="mx-auto w-full max-w-6xl">
                    <h2 className="text-center text-lg font-bold text-slate-900 md:text-2xl">
                        Core motor insurance plan options:
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
                <div className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-[linear-gradient(90deg,#ffffff_0%,#eef2ff_100%)] p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.45)] lg:grid-cols-[1.15fr_0.85fr] md:p-8">
                    <div>
                        <h2 className="text-lg font-bold leading-tight text-slate-900 md:text-2xl">
                            What are the <span className="text-sky-700">documents required</span> for policy and claim processing?
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
                            Keep vehicle and KYC documents ready to reduce delays during policy issuance, renewal, or claims.
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
                                href="/sign-in?next=/insurance/motor-insurance"
                                className="inline-flex items-center justify-center rounded-xl bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </div>

                    <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl">
                        <Image
                            src={motorInsurance4}
                            alt="Motor insurance claim documents"
                            className="h-auto w-full object-contain"
                        />
                    </div>
                </div>
            </section>

            <section className="w-full bg-slate-100 px-4 py-10 md:px-10 lg:px-16 xl:px-24">
                <div className="grid lg:flex items-start gap-8 lg:grid-cols-[1fr_0.9fr]">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 md:text-2xl">What your motor policy should actually include</h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
                            A strong policy balances premium, claim convenience, and real-world risk protection beyond just compliance.
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
                                src={motorInsurance2}
                                alt="Motor insurance benefits"
                                className="h-96 object-fit"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-white px-4 py-12 md:px-10 lg:px-16 xl:px-24">
                <h2 className="text-center text-lg font-bold leading-tight text-slate-900 md:text-2xl">
                    Payout options available in motor insurance
                </h2>
                <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-relaxed text-slate-800 md:text-base">
                    Motor insurance claims can be settled through multiple routes based on your service preference and situation.
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
                        href="/sign-in?next=/insurance/motor-insurance"
                        className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600"
                    >
                        Apply Now
                    </Link>
                </div>
            </section>

            <section className="w-full px-4 py-10 md:px-10 lg:px-16 xl:px-24">
                <h2 className="text-center text-lg font-bold text-slate-900 md:text-2xl">Trusted Insurance Partners</h2>
                <p className="mt-3 text-center text-sm text-slate-700 md:text-base">
                    Partnered with reputed insurers to support reliable policy service and claim journeys.
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
