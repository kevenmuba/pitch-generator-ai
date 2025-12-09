import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ScenariosSection } from "@/components/home/ScenariosSection";
import { PricingSection } from "@/components/home/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ScenariosSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;