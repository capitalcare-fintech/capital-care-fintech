import { MetadataRoute } from "next";

const BASE_URL = "https://www.capitalcarefintech.com";

const IMPORTANT_ROUTES = [
  "/",
  "/about-us",
  "/contact-us",
  "/partners",
  "/credit-score",
  "/become-partner",
  "/become-partner/register",
  "/partner-login",
  "/partner-apply",
  "/sign-in",
  "/sign-up",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimer",

  "/loans/personal-loan",
  "/loans/business-loan",
  "/loans/loan-against-property",
  "/loans/home-loan",
  "/loans/new-car-loan",
  "/loans/used-car-loan",

  "/loans/personal-loan/apply",
  "/loans/business-loan/apply",
  "/loans/loan-against-property/apply",
  "/loans/home-loan/apply",
  "/loans/new-car-loan/apply",
  "/loans/used-car-loan/apply",

  "/insurance/health-insurance",
  "/insurance/life-insurance",
  "/insurance/motor-insurance",

  "/insurance/health-insurance/apply",
  "/insurance/life-insurance/apply",
  "/insurance/motor-insurance/apply",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return IMPORTANT_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
  }));
}