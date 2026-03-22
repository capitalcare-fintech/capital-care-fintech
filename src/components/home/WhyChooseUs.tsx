"use client";

import { motion } from "framer-motion";
import {
    HiOutlineUser,
    HiOutlineLightningBolt,
    HiOutlineLockClosed,
    HiOutlineDocumentText,
    HiOutlineDesktopComputer,
    HiOutlineReceiptTax,
} from "react-icons/hi";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const FEATURES = [
    {
        icon: HiOutlineUser,
        title: "Personalized Loan Options",
        desc: "We match you with loan products tailored to your financial profile, goals, and repayment capacity.",
        iconBg: "bg-sky-50 text-sky-500",
        border: "hover:border-sky-300",
    },
    {
        icon: HiOutlineLightningBolt,
        title: "One-day Approval & Disbursal",
        desc: "From application to money in your account — our streamlined process gets it done in under 24 hours.",
        iconBg: "bg-indigo-50 text-indigo-500",
        border: "hover:border-indigo-300",
    },
    {
        icon: HiOutlineLockClosed,
        title: "Secure Database",
        desc: "Your personal and financial data is encrypted and protected with bank-grade security at all times.",
        iconBg: "bg-violet-50 text-violet-500",
        border: "hover:border-violet-300",
    },
    {
        icon: HiOutlineDocumentText,
        title: "Minimal Documentation",
        desc: "No stacks of paperwork. Just a few key documents uploaded digitally — and you're good to go.",
        iconBg: "bg-emerald-50 text-emerald-500",
        border: "hover:border-emerald-300",
    },
    {
        icon: HiOutlineDesktopComputer,
        title: "User-Friendly Experience",
        desc: "A clean, intuitive interface that makes applying for a loan as simple as a few taps or clicks.",
        iconBg: "bg-cyan-50 text-cyan-500",
        border: "hover:border-cyan-300",
    },
    {
        icon: HiOutlineReceiptTax,
        title: "Lowest Interest Rates",
        desc: "We compare rates across 70+ banks and NBFCs so you always get the most competitive deal available.",
        iconBg: "bg-amber-50 text-amber-500",
        border: "hover:border-amber-300",
    },
];

export function WhyChooseUs() {
    return (
        <section className="w-full px-4 pt-14 md:px-6">
            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: easeOut }}
                className="mb-10 text-center"
            >
                <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">Our advantages</p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Why Choose{" "}
                    <span className="bg-linear-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                        CapitalCare
                    </span>
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500">
                    We combine technology, transparency, and trust to make your financial journey smooth and rewarding.
                </p>
            </motion.div>

            {/* Cards grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map(({ icon: Icon, title, desc, iconBg, border }, i) => (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: i * 0.07, ease: easeOut }}
                        whileHover={{ scale: 1.03 }}
                        className={`group flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md ${border}`}
                    >
                        {/* Icon */}
                        <div className={`mt-0.5 shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${iconBg}`}>
                            <Icon className="h-5 w-5" />
                        </div>

                        {/* Text */}
                        <div>
                            <p className="mb-1 font-semibold text-slate-800">{title}</p>
                            <p className="text-xs leading-5 text-slate-500">{desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
