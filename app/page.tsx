import Navbar from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import PricingFeatures from "./_components/PricingSection";
import TestimonialSection from "./_components/TestimonialsSection";
import FooterSection from "./_components/FooterSection";

export default function FitnessSaasLanding() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mx-auto">
        <HeroSection />
        <FeaturesSection />
        <PricingFeatures />
        <TestimonialSection />
      </main>
      <FooterSection />
    </div>
  )
}