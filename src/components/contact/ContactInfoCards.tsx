"use client";

import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const CARDS = [
  {
    icon: MdEmail,
    label: "Email Id:",
    value: "info@capitalcare.in",
    href: "mailto:info@capitalcare.in",
    description: "If you have any queries, feel free to write to us. Our team will respond within 24 hours.",
    accent: "from-sky-400 to-cyan-400",
    iconBg: "bg-sky-50 text-sky-500",
    valueCls: "text-sky-600",
  },
  {
    icon: FaPhone,
    label: "Phone no:",
    value: "+91-7291919151",
    href: "tel:+917291919151",
    description: "Call us for any issues. Our team will resolve your query as soon as possible.",
    accent: "from-indigo-400 to-violet-400",
    iconBg: "bg-indigo-50 text-indigo-500",
    valueCls: "text-indigo-600",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp:",
    value: "7291919151",
    href: "https://wa.me/917291919151",
    description: "You can chat with us directly on WhatsApp for quick support.",
    accent: "from-green-400 to-emerald-400",
    iconBg: "bg-green-50 text-green-600",
    valueCls: "text-green-600",
  },
];

export function ContactInfoCards() {
  return (
    <div className="mb-10 grid gap-5 sm:grid-cols-3">
      {CARDS.map(({ icon: Icon, label, value, href, description, accent, iconBg, valueCls }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.1, ease: easeOut }}
          whileHover={{ y: -4, boxShadow: "0 12px 32px -8px rgba(14,165,233,0.18)" }}
          className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition-shadow"
        >
          {/* Gradient accent bar */}
          <div className={`absolute left-0 top-0 h-1 w-full bg-linear-to-r ${accent}`} />

          {/* Icon */}
          <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}>
            <Icon className="h-6 w-6" />
          </div>

          {/* Label + value */}
          <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`mb-3 block text-base font-bold hover:underline ${valueCls}`}
          >
            {value}
          </a>

          {/* Description */}
          <p className="text-xs leading-5 text-slate-500">{description}</p>
        </motion.div>
      ))}
    </div>
  );
}
