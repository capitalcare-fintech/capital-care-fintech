"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useRequireAuth } from "@/lib/useRequireAuth";
import {
  HiOutlineOfficeBuilding, HiOutlineUser, HiOutlineCheckCircle,
  HiOutlineBriefcase, HiOutlineUserGroup, HiOutlineTrendingUp,
  HiOutlineAcademicCap, HiOutlineCurrencyRupee, HiOutlineLightningBolt,
  HiOutlineStar, HiOutlineClipboardCheck, HiOutlineClock,
  HiOutlineGlobe, HiOutlineSparkles,
} from "react-icons/hi";
import { FaHandshake } from "react-icons/fa";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const BUSINESS_TYPES = [  { icon: HiOutlineOfficeBuilding, title: "Proprietorship", subtitle: "Single owner business entity", highlighted: false, href: "/become-partner/register?type=proprietorship" },
  { icon: HiOutlineUser, title: "Individual", subtitle: "Personal account for self", highlighted: true, href: "/become-partner/register?type=individual" },
];

const ASSOCIATE_TYPES = [
  { icon: HiOutlineBriefcase,   title: "LIC Agent" },
  { icon: HiOutlineUserGroup,   title: "Direct Selling Agent" },
  { icon: HiOutlineTrendingUp,  title: "Mutual Fund Agent Partner" },
  { icon: HiOutlineAcademicCap, title: "Chartered Accountant Partner" },
];

const ELIGIBILITY = [
  { label: "Age",                         detail: "Minimum age for becoming a DSA is 25 years" },
  { label: "Nationality",                 detail: "Must be a resident citizen of India" },
  { label: "Educational Qualifications",  detail: "Basic knowledge of loan documentation required" },
  { label: "Professional Qualifications", detail: "Open for working professionals and business owners" },
];

const BENEFITS = [
  { icon: HiOutlineCurrencyRupee,  title: "No Investment Required" },
  { icon: HiOutlineStar,           title: "Get Highest Payouts" },
  { icon: HiOutlineTrendingUp,     title: "High Potential Industry" },
  { icon: HiOutlineSparkles,       title: "Get Recognition and Awards" },
  { icon: HiOutlineClipboardCheck, title: "Easy Process" },
  { icon: HiOutlineClock,          title: "Earn at your own Freedom" },
  { icon: HiOutlineGlobe,          title: "Association with Fintech Brand" },
  { icon: HiOutlineLightningBolt,  title: "Instant Growth" },
];

function vu(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" as const },
    transition: { duration: 0.45, delay, ease: easeOut },
  };
}

function IllustrationBox({ accent = "bg-sky-400" }: { accent?: string }) {
  return (
    <div className="flex h-full min-h-[280px] w-full items-center justify-center rounded-3xl bg-sky-50">
      <div className="flex flex-col items-center gap-4 opacity-20">
        <div className={`h-24 w-24 rounded-full ${accent}`} />
        <div className={`h-3 w-40 rounded-full ${accent}`} />
        <div className={`h-3 w-28 rounded-full ${accent}`} />
        <div className={`h-3 w-20 rounded-full ${accent}`} />
      </div>
    </div>
  );
}

function SectionHeading({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">{desc}</p>
    </div>
  );
}

export default function BecomePartnerPage() {
  const router = useRouter();
  const { ready } = useRequireAuth("/become-partner");
  if (!ready) return null;

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <div className="px-4 pt-10 md:px-8 lg:px-12">
        <motion.div
          {...vu()}
          className="overflow-hidden rounded-3xl border border-sky-100 bg-linear-to-br from-white via-sky-50 to-cyan-50 px-8 py-16 text-center shadow-[0_16px_45px_-28px_rgba(14,165,233,0.35)] md:px-16 md:py-24"
        >
          <motion.div {...vu(0.1)} className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-700">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            DSA Partner Program
          </motion.div>
          <motion.h1 {...vu(0.18)} className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Are you a Loan Expert?
          </motion.h1>
          <motion.p {...vu(0.26)} className="mx-auto mt-5 max-w-2xl text-base text-slate-500 md:text-lg">
            Join us as a DSA Loan Partner and grow your income by helping customers get the best loan deals across India.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Business type selection ── */}
      <div className="px-4 py-16 md:px-8 lg:px-12">
        <motion.div {...vu()} className="text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">Choose your business type to get started</h2>
          <p className="mb-10 text-base text-slate-500">Select the option that best describes you</p>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {BUSINESS_TYPES.map(({ icon: Icon, title, subtitle, highlighted, href }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1, ease: easeOut }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={["relative flex flex-col items-center gap-6 rounded-2xl border p-10 shadow-sm transition-shadow hover:shadow-lg", highlighted ? "border-sky-300 bg-linear-to-br from-sky-50 to-indigo-50 ring-2 ring-sky-200" : "border-slate-200 bg-white"].join(" ")}
              >
                {highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-sky-400 to-indigo-500 px-4 py-1 text-xs font-bold text-white shadow">
                    Recommended
                  </div>
                )}
                <div className={["inline-flex h-20 w-20 items-center justify-center rounded-2xl", highlighted ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-500"].join(" ")}>
                  <Icon className="h-10 w-10" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-900">{title}</p>
                  <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => router.push(href)}
                  className={["w-full rounded-xl py-3 text-sm font-semibold transition", highlighted ? "bg-linear-to-r from-sky-400 to-indigo-500 text-white hover:brightness-110" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"].join(" ")}
                >
                  Proceed
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Who can associate ── */}
      <div className="bg-slate-50 px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div {...vu()}>
            <SectionHeading
              title="Who can associate with us?"
              desc="Anyone with an interest in finance and a drive to earn extra income can join CapitalCare as a DSA Loan Partner. Whether you're a professional, agent, or entrepreneur — there's a place for you here."
            />
          </motion.div>
          <div className="grid items-stretch gap-10 md:grid-cols-2">
            <motion.div {...vu(0.1)} className="min-h-[320px]">
              <IllustrationBox accent="bg-sky-400" />
            </motion.div>
            <div className="grid grid-cols-2 gap-5 content-start">
              {ASSOCIATE_TYPES.map(({ icon: Icon, title }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
                  whileHover={{ y: -3 }}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-sky-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Eligibility criteria ── */}
      <div className="px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div {...vu()}>
            <SectionHeading
              title="Eligibility Criteria for DSA"
              desc="We keep the bar accessible. If you meet these basic criteria, you're ready to start your journey as a CapitalCare DSA partner."
            />
          </motion.div>
          <div className="grid items-stretch gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-5">
              {ELIGIBILITY.map(({ label, detail }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
                  className="flex items-start gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm"
                >
                  <HiOutlineCheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-sky-500" />
                  <div>
                    <p className="font-semibold text-slate-800">{label}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div {...vu(0.1)} className="min-h-[320px]">
              <IllustrationBox accent="bg-indigo-400" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Benefits ── */}
      <div className="bg-slate-50 px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div {...vu()}>
            <SectionHeading
              title="Benefits of choosing CapitalCare"
              desc="Partnering with CapitalCare means joining a fast-growing fintech brand with the tools, support, and rewards to help you succeed."
            />
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06, ease: easeOut }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="flex flex-col items-center gap-4 rounded-2xl border border-sky-100 bg-white p-7 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="text-sm font-semibold text-slate-800">{title}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...vu(0.1)} className="mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/become-partner/register")}
              className="inline-flex items-center gap-3 rounded-xl bg-linear-to-r from-sky-400 to-indigo-500 px-10 py-4 text-base font-semibold text-white hover:brightness-110"
            >
              <FaHandshake className="h-5 w-5" />
              Become a Partner Today
            </motion.button>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
