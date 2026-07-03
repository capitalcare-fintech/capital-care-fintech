import { HeroSlider } from "@/components/home/HeroSlider";
import { CreditScorePopup } from "@/components/home/CreditScorePopup";
import { StatsSection } from "@/components/home/StatsSection";
import { TrendingLoans } from "@/components/home/TrendingLoans";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { LoanDetailSection } from "@/components/home/LoanDetailSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CreditScoreCTA } from "@/components/home/CreditScoreCTA";
import { InDemandLoans } from "@/components/home/InDemandLoans";
import { Reviews } from "@/components/home/Reviews";
import { Partners } from "@/components/home/Partners";
import { EmiCalculator } from "@/components/loans/EmiCalculator";
import EmiCalculatorSlider from "@/components/EmiCalculatorSlider";
import InstantLoan from "@/components/home/InstantLoan";
export default function Home() {
  return (
    <>
    {/* <InstantLoan /> */}
      {/* <CreditScorePopup /> */}
      <HeroSlider />
      {/* <TrendingLoans /> */}
      {/* <div className="px-4 md:px-10 lg:px-16">
        <EmiCalculator />
      </div> */}
      <EmiCalculatorSlider />
      <WhyChooseUs />
      <InDemandLoans />
      <LoanDetailSection />
      <HowItWorks />
      {/* <CreditScoreCTA /> */}
      <Reviews />
      <Partners />
      <StatsSection />
    </>
  );
}
