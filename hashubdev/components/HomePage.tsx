import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { SocialProof } from './SocialProof';
import { HowItWorks } from './HowItWorks';
import { DocApiSection } from './DocApiSection';
import { VectorApiSection } from './VectorApiSection';
import { AboutSection } from './AboutSection';
import { FinalCTA } from './FinalCTA';
import { Footer } from './Footer';

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProof />
        <HowItWorks />
        <DocApiSection />
        <VectorApiSection />
        <AboutSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
