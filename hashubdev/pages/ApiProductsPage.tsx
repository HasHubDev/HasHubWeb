import { Navbar } from "../components/Navbar";
import { ApiHero } from "../components/api/ApiHero";
import { ApiShowcase } from "../components/api/ApiShowcase";
import { UseCases } from "../components/api/UseCases";
import { ApiPricing } from "../components/api/ApiPricing";
import { GettingStarted } from "../components/api/GettingStarted";
import { Footer } from "../components/Footer";

export function ApiProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ApiHero />
      <ApiShowcase />
      <UseCases />
      <ApiPricing />
      <GettingStarted />
      <Footer />
    </div>
  );
}
