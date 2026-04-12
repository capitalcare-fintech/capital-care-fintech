import type { StaticImageData } from "next/image";
import heroInsuranceImage from "@/assets/heroSlide/insurance-image.png";
import heroLoanImage from "@/assets/heroSlide/loan-image.png";
import inDemandBusinessImage from "@/assets/inDemand/buisness.png";
import inDemandEducationImage from "@/assets/inDemand/education.png";
import inDemandHomeImage from "@/assets/inDemand/home.png";
import inDemandPersonalImage from "@/assets/inDemand/personal.png";
import healthInsurance from "@/assets/health-insurance/health-insuranceForm.png";
import lifeInsurance from "@/assets/life-insurance/lifeInsurance6.png";
import motorInsurance from "@/assets/motor-insurance/motorInsurance4.jpg";
import homeLoan from "@/assets/exploreProducts/homeLoan.png";
import businessLoan from "@/assets/exploreProducts/buisnessLoan.png";
import personalLoan from "@/assets/exploreProducts/personalLoan.png";
import lap from "@/assets/inDemand/buisness.png";

export type NavItem =
  | {
    label: string;
    href: string;
    newTab?: boolean;
    items?: undefined;
  }
  | {
    label: string;
    href?: undefined;
    newTab?: undefined;
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
      { label: "Health Insurance", href: "/insurance/health-insurance" },
      { label: "Life Insurance", href: "/insurance/life-insurance" },
      { label: "Motor Insurance", href: "/insurance/motor-insurance" },
    ],
  },
  // { label: "Credit-Score", href: "/credit-score" },
  { label: "Contact-Us", href: "/contact-us" },
  { label: "About-us", href: "/about-us" },
  { label: "Become Our Partner", href: "/partner-login", newTab: true },
];

export type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  advantages?: string[]
  image: StaticImageData;
  imageAlt: string;
};

export const HERO_SLIDES: HeroSlide[] = [
 {
  eyebrow: "Home Loan",
  title: "Turn your dream home into reality.",
  description:
    "Get affordable home loans with low interest rates, flexible tenure, and quick approvals tailored to your needs.",
  ctaLabel: "Apply for home loan",
  ctaHref: "/loans/home-loan",
  image: homeLoan,
  imageAlt: "Home loan financing and house purchase illustration",
  advantages: ["Low interest rates", "Flexible tenure", "Quick approval"],
},
  {
    eyebrow: "Health Insurance",
  title: "Protect your health, secure your future.",
  description:
    "Get comprehensive health coverage for you and your family with cashless hospitalization and wide network hospitals.",
  ctaLabel: "View health plans",
  ctaHref: "/insurance/health-insurance",
  image: healthInsurance,
  imageAlt: "Health insurance and medical protection illustration",
  advantages: ["Cashless treatment", "Wide network", "Affordable premiums"],
  },
  {
   eyebrow: "Loan Against Property",
  title: "Unlock the value of your property.",
  description:
    "Leverage your property to get high-value loans at competitive interest rates for personal or business needs.",
  ctaLabel: "Check LAP options",
  ctaHref: "/loans/loan-against-property",
  image: lap,
  imageAlt: "Loan against property illustration",
  advantages: ["High loan value", "Lower interest rates", "Long repayment tenure"],
  },
  {
     eyebrow: "Life Insurance",
  title: "Secure your family’s future today.",
  description:
    "Ensure financial protection for your loved ones with flexible life insurance plans and long-term benefits.",
  ctaLabel: "Explore life insurance",
  ctaHref: "/insurance/life-insurance",
  image: lifeInsurance,
  imageAlt: "Life insurance protection illustration",
  advantages: ["Financial security", "Tax benefits", "Long-term coverage"],

  },
  {
   eyebrow: "Motor Insurance",
  title: "Drive with confidence and protection.",
  description:
    "Protect your vehicle against accidents, theft, and damages with comprehensive motor insurance plans.",
  ctaLabel: "Get motor insurance",
  ctaHref: "/insurance/motor-insurance",
  image: motorInsurance,
  imageAlt: "Car insurance and protection illustration",
  advantages: ["Instant policy", "Cashless garages", "Affordable plans"],
  },
  {
    eyebrow: "Personal Loan",
  title: "Fast approvals, transparent rates.",
  description:
    "Compare personal loan options for your needs — from emergencies to big life goals with zero hidden charges.",
  ctaLabel: "Explore personal loan",
  ctaHref: "/loans/personal-loan",
  image: personalLoan,
  imageAlt: "Personal loan and financial support illustration",
  advantages: ["Instant approval", "No collateral", "Flexible repayment"],
  },
  {
   eyebrow: "Business Loan",
  title: "Fuel your business growth.",
  description:
    "Access capital to expand operations, manage cash flow, or invest in new opportunities with ease.",
  ctaLabel: "Get business loan",
  ctaHref: "/loans/business-loan",
  image: businessLoan,
  imageAlt: "Business growth and funding illustration",
  advantages: ["High loan amount", "Minimal documentation", "Quick disbursal"],
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
    href: "/loans/personal-loan/apply",
    image: inDemandPersonalImage,
    imageAlt: "Personal loan form illustration",
  },
  {
    title: "L.A.P",
    // title: "Loan Against Property",
    // subtitle: "Collateral-backed security",
    subtitle: "Loan Against Property",
    href: "/loans/loan-against-property/apply",
    image: inDemandEducationImage,
    imageAlt: "Loan against property illustration",
  },
  {
    title: "Business Loan",
    subtitle: "Grow smarter",
    href: "/loans/business-loan/apply",
    image: inDemandBusinessImage,
    imageAlt: "Business growth financing illustration",
  },
  {
    title: "Home Loan",
    subtitle: "Long-term comfort",
    href: "/loans/home-loan/apply",
    image: inDemandHomeImage,
    imageAlt: "Home loan and mortgage illustration",
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

