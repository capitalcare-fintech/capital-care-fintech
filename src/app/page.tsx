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

export default function Home() {
  return (
    <>
      <CreditScorePopup />
      <HeroSlider />
      <StatsSection />
      <TrendingLoans />
      <WhyChooseUs />
      <InDemandLoans />
      <LoanDetailSection />
      <HowItWorks />
      <CreditScoreCTA />
      <Reviews />
      <Partners />
    </>
  );
}
