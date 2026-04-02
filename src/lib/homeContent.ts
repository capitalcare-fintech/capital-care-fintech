import type { StaticImageData } from "next/image";
import heroInsuranceImage from "@/assets/heroSlide/insurance-image.jpg";
import heroLoanImage from "@/assets/heroSlide/loan-image.jpg";
import inDemandBusinessImage from "@/assets/inDemand/buisness.jpg";
import inDemandEducationImage from "@/assets/inDemand/property.jpg";
import inDemandHomeImage from "@/assets/inDemand/home.jpg";
import inDemandPersonalImage from "@/assets/inDemand/personal.jpg";

export type NavItem =
  | {
    label: string;
    href: string;
    items?: undefined;
  }
  | {
    label: string;
    href?: undefined;
    items: { label: string; href: string }[];
  };

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Loans",
    items: [
      { label: "Personal Loan", href: "/loans/personal-loan" },
      { label: "Business Loan", href: "/loans/business-loan" },
      { label: "loan-against-property", href: "/loans/loan-against-property" },
      { label: "Home Loan", href: "/loans/home-loan" },
      { label: "New Car Loan", href: "/loans/new-car-loan" },
      { label: "Used Car Loan", href: "/loans/used-car-loan" },
    ],
  },
  {
    label: "Insurance",
    items: [
      { label: "Health Insurance", href: "/insurance" },
      { label: "Life Insurance", href: "/insurance" },
      { label: "Motor Insurance", href: "/insurance" },
    ],
  },
  { label: "Credit-Score", href: "/credit-score" },
  { label: "Contact-Us", href: "/contact-us" },
  { label: "About-us", href: "/about-us" },
  { label: "Become Our Partner", href: "/become-partner" },
];

export type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: StaticImageData;
  imageAlt: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "Loans",
    title: "Fast approvals, transparent rates.",
    description:
      "Compare loan options built for your goals — from short-term needs to long-term growth.",
    ctaLabel: "Explore personal loan",
    ctaHref: "/loans/personal-loan",
    image: heroLoanImage,
    imageAlt: "Loan approval and financing illustration",
  },
  {
    eyebrow: "Insurance",
    title: "Coverage that actually fits.",
    description:
      "Pick plans with clear benefits, flexible add-ons, and support when you need it most.",
    ctaLabel: "Explore insurance",
    ctaHref: "/insurance",
    image: heroInsuranceImage,
    imageAlt: "Health and insurance protection illustration",
  },
];

export type InDemandCard = {
  title: string;
  subtitle: string;
  href: string;
  image: StaticImageData;
  imageAlt: string;
};

export const IN_DEMAND_LOANS: InDemandCard[] = [
  {
    title: "Personal Loan",
    subtitle: "Instant to 24h",
    href: "/loans/personal-loan",
    image: inDemandPersonalImage,
    imageAlt: "Personal loan form illustration",
  },
  {
    title: "Loan Against Property",
    subtitle: "Collateral-backed security",
    href: "/loans/loan-against-property",
    image: inDemandEducationImage,
    imageAlt: "Loan against property illustration",
  },
  {
    title: "Business Loan",
    subtitle: "Grow smarter",
    href: "/loans/business-loan",
    image: inDemandBusinessImage,
    imageAlt: "Business growth financing illustration",
  },
  {
    title: "Home Loan",
    subtitle: "Long-term comfort",
    href: "/loans/home-loan",
    image: inDemandHomeImage,
    imageAlt: "Home loan and mortgage illustration",
  },
  {
    title: "New Car Loan",
    subtitle: "Drive new sooner",
    href: "/loans/new-car-loan",
    image: inDemandPersonalImage,
    imageAlt: "New car loan illustration",
  },
  {
    title: "Used Car Loan",
    subtitle: "Pre-owned made easy",
    href: "/loans/used-car-loan",
    image: inDemandEducationImage,
    imageAlt: "Used car loan illustration",
  },
];

export type Review = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  gender: "male" | "female";
};

export const REVIEWS: Review[] = [
  {
    name: "Monika",
    role: "Business owner",
    quote:
      "I took CapitalCare Business loan and my decision was perfectly alright for my business.",
    rating: 3.5,
    gender: "female",
  },
  {
    name: "Rishab Verma",
    role: "Professional",
    quote:
      "Took Medical Loan from CapitalCare when my CIBIL was low, and got my loan approved within a day.",
    rating: 4,
    gender: "male",
  },
  {
    name: "Sonia Sharma",
    role: "Entrepreneur",
    quote:
      "They are providing quick financial aid services and even have a portal to track the loan process.",
    rating: 4.5,
    gender: "female",
  },
  {
    name: "Mona",
    role: "Professional",
    quote:
      "Just got my personal loan worth Rs. 5 lakhs within a day.",
    rating: 5,
    gender: "female",
  },
  {
    name: "Rahul Verma",
    role: "Software Engineer",
    quote:
      "The loan approval process was smooth and hassle-free. I received funds much faster than expected.",
    rating: 4.7,
    gender: "male",
  },
  {
    name: "Priya Mehta",
    role: "Freelancer",
    quote:
      "Very user-friendly platform. Tracking my application status in real-time was really helpful.",
    rating: 4.6,
    gender: "female",
  },
  {
    name: "Amit Singh",
    role: "Business Owner",
    quote:
      "Quick disbursal and transparent terms. Helped me manage my business cash flow efficiently.",
    rating: 4.8,
    gender: "male",
  },
  {
    name: "Neha Gupta",
    role: "Marketing Manager",
    quote:
      "Customer support was excellent and guided me throughout the process.",
    rating: 4.4,
    gender: "female",
  },
  {
    name: "Vikas Yadav",
    role: "Startup Founder",
    quote:
      "A reliable platform for financial needs. The interface is clean and easy to use.",
    rating: 4.5,
    gender: "male",
  },
  {
    name: "Anjali Kapoor",
    role: "Designer",
    quote:
      "I liked how transparent everything was. No hidden charges at all.",
    rating: 4.6,
    gender: "female",
  },
  {
    name: "Rohit Jain",
    role: "Trader",
    quote:
      "Fast processing and minimal documentation made the experience very smooth.",
    rating: 4.7,
    gender: "male",
  },
  {
    name: "Kavita Nair",
    role: "Consultant",
    quote:
      "The portal makes it easy to keep track of everything. Highly recommended.",
    rating: 4.5,
    gender: "female",
  }

];

export type Partner = { name: string };

export const PARTNERS: Partner[] = [
  { name: "CapitalCare Bank" },
  { name: "BlueShield Insurance" },
  { name: "Nimbus Payments" },
  { name: "SecureScore" },
  { name: "Atlas Lending" },
  { name: "Harbor Finance" },
];

