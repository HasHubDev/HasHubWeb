import { Check, FileText, Network, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

export function ApiPricing() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Simple, Transparent, and <span className="text-primary">Scalable</span> Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start for free, then pay only for what you use. No hidden fees, no complex contracts.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* hashub-doc Pricing */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">hashub-doc</h3>
                  <p className="text-muted-foreground">Document Processing API</p>
                </div>
              </div>

              {/* Free Tier */}
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-foreground">Free</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-semibold text-primary">100</span>
                  <span className="text-muted-foreground">pages included</span>
                </div>
                <ul className="space-y-3">
                  {[
                    'All document formats',
                    'OCR for 80+ languages',
                    'JSON & Markdown output',
                    'Basic support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pay as you go */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Pay as you go</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">$0.015</span>
                  <span className="text-muted-foreground">per page</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  After your free tier. Volume discounts available for enterprise customers.
                </p>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Get Started with hashub-doc
              </Button>
            </div>
          </div>

          {/* hashub-vector Pricing */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Network className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">hashub-vector</h3>
                  <p className="text-muted-foreground">Text Embedding API</p>
                </div>
              </div>

              {/* Free Tier */}
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-foreground">Free</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-semibold text-primary">1M</span>
                  <span className="text-muted-foreground">tokens included</span>
                </div>
                <ul className="space-y-3">
                  {[
                    '6+ embedding models',
                    'Fast response times',
                    'Batch processing',
                    'Basic support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pay as you go */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Pay as you go</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">$0.0001</span>
                  <span className="text-muted-foreground">per 1K tokens</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  After your free tier. Different models may have different pricing.
                </p>
              </div>

              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                Get Started with hashub-vector
              </Button>
            </div>
          </div>
        </div>

        {/* Model Pricing Comparison */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            hashub-vector Model Pricing
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Model</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Dimensions</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Price per 1K tokens</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Best for</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-medium">text-embedding-ada-002</td>
                  <td className="py-4 px-4">1536</td>
                  <td className="py-4 px-4 text-primary font-semibold">$0.0001</td>
                  <td className="py-4 px-4">General purpose, cost-effective</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-medium">text-embedding-3-small</td>
                  <td className="py-4 px-4">1536</td>
                  <td className="py-4 px-4 text-primary font-semibold">$0.00002</td>
                  <td className="py-4 px-4">Improved performance, budget-friendly</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-medium">text-embedding-3-large</td>
                  <td className="py-4 px-4">3072</td>
                  <td className="py-4 px-4 text-primary font-semibold">$0.00013</td>
                  <td className="py-4 px-4">Highest quality, larger dimensions</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-medium">all-MiniLM-L6-v2</td>
                  <td className="py-4 px-4">384</td>
                  <td className="py-4 px-4 text-primary font-semibold">$0.00001</td>
                  <td className="py-4 px-4">Lightweight, fast processing</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">multilingual-e5-large</td>
                  <td className="py-4 px-4">1024</td>
                  <td className="py-4 px-4 text-primary font-semibold">$0.00008</td>
                  <td className="py-4 px-4">Multilingual applications</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 text-center border border-primary/20">
          <MessageCircle className="w-12 h-12 text-primary mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Need Enterprise-Grade Solutions?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Custom volume pricing, dedicated support, on-premise deployment, 
            and SLA guarantees available for enterprise customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Contact Sales
            </Button>
            <Button variant="outline" size="lg" className="px-8 border-primary/20 hover:border-primary/40">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
