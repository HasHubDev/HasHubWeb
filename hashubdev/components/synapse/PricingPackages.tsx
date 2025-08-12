"use client";

import { Check, Star, Calendar, ArrowRight, Zap, Building, Crown } from "lucide-react";
import { Button } from "../ui/button";

export function PricingPackages() {
  const packages = [
    {
      name: "Starter",
      icon: Zap,
      price: "$2,997",
      period: "per month",
      description: "Perfect for small teams getting started with intelligent document processing",
      popular: false,
      features: [
        "Up to 10,000 documents",
        "Basic chat interface",
        "Email support",
        "Standard OCR (20 languages)",
        "Basic analytics",
        "2 custom integrations",
        "Standard security",
        "Community updates"
      ],
      limitations: [
        "Limited customization",
        "Standard response time",
        "Basic reporting"
      ]
    },
    {
      name: "Business",
      icon: Building,
      price: "$7,997",
      period: "per month",
      description: "Complete solution for growing businesses that need advanced features",
      popular: true,
      features: [
        "Up to 100,000 documents",
        "Advanced chat interface",
        "Priority phone & email support",
        "Advanced OCR (80+ languages)",
        "Advanced analytics & reporting",
        "Unlimited integrations",
        "Enhanced security features",
        "Custom branding",
        "API access",
        "Team collaboration tools",
        "Advanced search filters",
        "Export capabilities"
      ],
      limitations: []
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: "Custom",
      period: "pricing",
      description: "Fully customized solution with dedicated support for large organizations",
      popular: false,
      features: [
        "Unlimited documents",
        "Fully customized interface",
        "Dedicated success manager",
        "Premium AI models",
        "Real-time analytics dashboard",
        "White-label solution",
        "Enterprise-grade security",
        "Single Sign-On (SSO)",
        "Advanced compliance tools",
        "Custom AI model training",
        "Multi-tenant architecture",
        "24/7 phone support",
        "On-premise deployment option",
        "Custom SLA"
      ],
      limitations: []
    }
  ];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-primary/90 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <Star className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">Solution Packages</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            <span className="text-foreground">Tailored Solutions for</span>
            <br />
            <span className="text-primary">Every Business Need</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect package for your organization's size and requirements. 
            All plans include our core AI technology and can be customized further.
          </p>
          
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-background border border-border rounded-lg px-4 py-2">
            ✨ All packages include 30-day free trial and money-back guarantee
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`relative bg-background border rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                pkg.popular 
                  ? 'border-primary shadow-xl ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    ⭐ Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 ${
                  pkg.popular ? 'bg-primary/20 text-primary' : 'bg-secondary/50 text-foreground'
                }`}>
                  <pkg.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{pkg.description}</p>
                
                <div className="mb-6">
                  <div className="text-4xl font-extrabold text-foreground">{pkg.price}</div>
                  <div className="text-muted-foreground text-sm">{pkg.period}</div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
                
                {pkg.limitations.length > 0 && (
                  <div className="pt-4 border-t border-border/50">
                    <div className="text-xs text-muted-foreground mb-2">Limitations:</div>
                    {pkg.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5 text-muted-foreground">-</div>
                        <span className="text-muted-foreground text-xs">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Button 
                className={`w-full py-3 group ${
                  pkg.popular 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Strategy Session
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Additional Info */}
              <div className="mt-4 text-center">
                <div className="text-xs text-muted-foreground">
                  30-min consultation • No commitment
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-background border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-bold text-foreground text-center">Detailed Feature Comparison</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">Features</th>
                  <th className="text-center p-4 font-semibold text-foreground">Starter</th>
                  <th className="text-center p-4 font-semibold text-primary bg-primary/5">Business</th>
                  <th className="text-center p-4 font-semibold text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-border/50">
                  <td className="p-4 text-foreground">Document Limit</td>
                  <td className="p-4 text-center text-muted-foreground">10,000</td>
                  <td className="p-4 text-center bg-primary/5">100,000</td>
                  <td className="p-4 text-center text-muted-foreground">Unlimited</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 text-foreground">Interface Customization</td>
                  <td className="p-4 text-center text-muted-foreground">Basic</td>
                  <td className="p-4 text-center bg-primary/5">Advanced</td>
                  <td className="p-4 text-center text-muted-foreground">Full Custom</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 text-foreground">Managed Cloud Service</td>
                  <td className="p-4 text-center text-muted-foreground">Optional</td>
                  <td className="p-4 text-center bg-primary/5">Included</td>
                  <td className="p-4 text-center text-muted-foreground">Premium</td>
                </tr>
                <tr>
                  <td className="p-4 text-foreground">Support Level</td>
                  <td className="p-4 text-center text-muted-foreground">Email</td>
                  <td className="p-4 text-center bg-primary/5">Phone + Email</td>
                  <td className="p-4 text-center text-muted-foreground">24/7 Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8">
            <h4 className="text-2xl font-bold text-foreground mb-4">
              Not sure which package is right for you?
            </h4>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Schedule a free strategy session where we'll assess your needs and recommend 
              the perfect solution for your organization.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              <Calendar className="w-5 h-5 mr-2" />
              Get Personalized Recommendation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
