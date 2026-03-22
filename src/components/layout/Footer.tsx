import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/80">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-24">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-black-900 sm:text-3xl md:text-3xl">
              CAPITAL CARE
            </h3>
            {/* <p className="mt-2 inline-flex bg-cyan-400 px-1 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white">
              trusted financial partner
            </p> */}

            <div className="mt-8 space-y-2">
              <a
                href="tel:+91-9205559500"
                className="flex w-fit items-center gap-3 font-medium text-blue-900 hover:text-cyan-600"
              >
                <FaPhone className="h-5 w-5" />
                <span className="text-base leading-none font-bold sm:text-lg md:text-xl">
                  +91-9205559500
                </span>
              </a>
              <a
                href="https://wa.me/919205559500"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-3 font-bold text-blue-900 hover:text-cyan-600"
              >
                <FaWhatsapp className="h-5 w-5" />
                <span className="text-base leading-none font-bold sm:text-lg md:text-xl">
                  +91-9205559500
                </span>
              </a>
              <a
                href="mailto:info@capitalcare.in"
                className="flex w-fit items-center gap-3 font-bold text-blue-900 hover:text-cyan-600"
              >
                <FaEnvelope className="h-5 w-5" />
                <span className="text-base leading-none font-bold sm:text-lg md:text-xl">
                  info@capitalcare.in
                </span>
              </a>
            </div>

            <div className="mt-12">
              <h4 className="text-lg font-bold text-slate-900 sm:text-2xl">Follow Us On:</h4>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white transition hover:brightness-110"
                >
                  <FaFacebookF className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-yellow-400 via-pink-500 to-violet-600 text-white transition hover:brightness-110"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-black text-white transition hover:brightness-110"
                >
                  <FaXTwitter className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-sky-600 text-white transition hover:brightness-110"
                >
                  <FaLinkedinIn className="h-6 w-6" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex h-8 w-12 items-center justify-center rounded-xl bg-red-600 text-white transition hover:brightness-110"
                >
                  <FaYoutube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start pt-2 lg:items-start lg:pt-4">
            <h4 className="text-xl font-extrabold text-blue-900 sm:text-2xl md:text-3xl">
              Contact Information
            </h4>
            <p className="mt-4 max-w-xl text-sm font-bold leading-relaxed text-slate-900 sm:text-lg md:text-xl">
              Capital Care Fincorp Limited,
              <br />
              2nd Floor, A-45, WEA, Karol Bagh,
              <br />
              New Delhi, Delhi 110005.
            </p>

            <p className="mt-6 text-lg font-bold leading-tight text-blue-900 sm:text-2xl md:text-3xl">
              ISO 9001:2015 &amp; 27001:2013 Certified
            </p>
          </div>
        </div>

        <div className="mt-4  pt-4">
          <div className="grid grid-cols-2 gap-4 text-center text-xs font-medium text-slate-600 sm:grid-cols-4 sm:text-base">
            <Link href="/about-us" className="hover:text-slate-900">
              About Us
            </Link>
            <Link href="/contact-us" className="hover:text-slate-900">
              Contact Us
            </Link>
            <Link href="/loans" className="hover:text-slate-900">
              Loans
            </Link>
            <Link href="/insurance" className="hover:text-slate-900">
              Insurance
            </Link>
          </div>
        </div>

        <div className="mt-2 border-t border-slate-200 pt-4 text-sm font-medium text-slate-500">
          © {new Date().getFullYear()} CapitalCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

