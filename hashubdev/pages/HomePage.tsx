import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { SocialProof } from "../components/SocialProof";
import { HowItWorks } from "../components/HowItWorks";
import { DocApiSection } from "../components/DocApiSection";
import { VectorApiSection } from "../components/VectorApiSection";
import { AboutSection } from "../components/AboutSection";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProof />
      <HowItWorks />
      <DocApiSection />
      <VectorApiSection />
      <AboutSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
