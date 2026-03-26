import Link from "next/link";
import Image from "next/image";
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
import capitalCareLogo from "@/assets/logo/capitalCareLogo.png";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/80">
      <div className="w-full px-4 pt-10 pb-2 md:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-24">
          <div>
            <Image
              src={capitalCareLogo}
              alt="Capital Care"
              className="h-18 w-auto object-contain"
            />
            <div className="mt-8 space-y-2">
              <a
                href="tel:+91-9205559500"
                className="flex w-fit items-center gap-3 font-medium text-slate-700 hover:text-slate-900"
              >
                <FaPhone className="h-4 w-4" />
                <span className="text-sm leading-none font-semibold sm:text-base">
                  +91-9205559500
                </span>
              </a>
              <a
                href="https://wa.me/919205559500"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-3 font-semibold text-slate-700 hover:text-slate-900"
              >
                <FaWhatsapp className="h-4 w-4" />
                <span className="text-sm leading-none font-semibold sm:text-base">
                  +91-9205559500
                </span>
              </a>
              <a
                href="mailto:info@capitalcare.in"
                className="flex w-fit items-center gap-3 font-semibold text-slate-700 hover:text-slate-900"
              >
                <FaEnvelope className="h-4 w-4" />
                <span className="text-sm leading-none font-semibold sm:text-base">
                  info@capitalcare.in
                </span>
              </a>
            </div>

            <div className="mt-12">
              <h4 className="text-base font-semibold text-slate-900 sm:text-lg">Follow Us On:</h4>
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
            <h4 className="text-lg font-bold text-slate-900 sm:text-xl">
              Contact Information
            </h4>
            <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
              Capital Care Fincorp Limited,
              <br />
              Office No. 337, 3rd Floor Shubham Tower, Neelam Chowk,
              <br />
              Faridabad, Haryana.
            </p>
          </div>
        </div>

        <div className="mt-4  pt-4">
          <div className="grid grid-cols-2 gap-4 text-center text-[12px]  text-slate-600 sm:grid-cols-5 sm:text-sm">
            <Link href="/loans" className="hover:text-slate-900">
              Loans
            </Link>
            <Link href="/insurance" className="hover:text-slate-900">
              Insurance
            </Link>
            <Link href="/partners" className="hover:text-slate-900">
              Our Partners
            </Link>
            <Link href="/about-us" className="hover:text-slate-900">
              About Us
            </Link>
            <Link href="/contact-us" className="hover:text-slate-900">
              Contact Us
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

