"use client";

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SynapseHero } from '../components/synapse/SynapseHero';
import { ProblemSolution } from '../components/synapse/ProblemSolution';
import { Architecture } from '../components/synapse/Architecture';
import { PricingPackages } from '../components/synapse/PricingPackages';
import { CaseStudy } from '../components/synapse/CaseStudy';
import { FAQ } from '../components/synapse/FAQ';
import { FinalCTA } from '../components/synapse/FinalCTA';

export default function SynapsePage() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Navbar />
      <main>
        <SynapseHero />
        <ProblemSolution />
        <Architecture />
        <PricingPackages />
        <CaseStudy />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export { SynapsePage };
