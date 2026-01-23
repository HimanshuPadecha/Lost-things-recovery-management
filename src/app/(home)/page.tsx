import FeaturesSection from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import HowItWorksSection from "@/components/how-it-works-section";
import { StatsSection } from "@/components/status-section";
import CTASection  from "@/components/cta-section";


const Page = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection/>
      <FeaturesSection />
      <CTASection/>
    </>
  );
};

export default Page;
