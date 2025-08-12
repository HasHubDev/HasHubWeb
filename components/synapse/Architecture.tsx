"use client";

import { FileText, Database, Brain, Monitor, ArrowRight, Cpu, Shield, Zap } from "lucide-react";

export function Architecture() {
  const components = [
    {
      number: "01",
      icon: FileText,
      title: "Data Processing & Understanding",
      subtitle: "hashub-doc & hashub-vector",
      description: "Intelligent engine that understands and structures every type of document",
      features: [
        "80+ Language OCR",
        "Smart content extraction",
        "Format normalization",
        "Metadata enrichment"
      ],
      color: "blue"
    },
    {
      number: "02",
      icon: Database,
      title: "Secure Storage & Search",
      subtitle: "Elasticsearch Infrastructure",
      description: "Scalable and secure database infrastructure for vectorized data",
      features: [
        "Vector embeddings",
        "Semantic indexing",
        "Real-time search",
        "Enterprise security"
      ],
      color: "green"
    },
    {
      number: "03",
      icon: Brain,
      title: "AI Intelligence & Reasoning",
      subtitle: "OpenAI & Vertex AI",
      description: "Industry-leading AI models providing accurate, context-aware responses",
      features: [
        "GPT-4 integration",
        "Claude reasoning",
        "Multi-model approach",
        "Context preservation"
      ],
      color: "purple"
    },
    {
      number: "04",
      icon: Monitor,
      title: "User-Friendly Interface",
      subtitle: "Custom Branded Experience",
      description: "Modern interfaces that your team can easily use, aligned with your brand",
      features: [
        "Custom branding",
        "Responsive design",
        "Multi-platform support",
        "Intuitive UX"
      ],
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      green: "text-green-500 bg-green-500/10 border-green-500/20",
      purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      orange: "text-orange-500 bg-orange-500/10 border-orange-500/20"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-primary/90 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <Cpu className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">Architecture</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            <span className="text-foreground">Not Just Software,</span>
            <br />
            <span className="text-primary">Complete Solution Architecture</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four interconnected components working in perfect harmony to transform 
            your information chaos into intelligent, actionable knowledge.
          </p>
        </div>

        {/* Architecture Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {components.map((component, index) => (
            <div key={index} className="relative">
              {/* Connection Arrow - Hidden on mobile, shown on larger screens */}
              {index < components.length - 1 && (
                <div className="hidden xl:block absolute top-1/2 -right-4 z-10">
                  <ArrowRight className="w-6 h-6 text-primary/50" />
                </div>
              )}

              <div className="group relative bg-secondary/30 hover:bg-secondary/50 border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {component.number}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${getColorClasses(component.color)}`}>
                  <component.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{component.title}</h3>
                    <div className="text-sm text-primary font-semibold mb-3">{component.subtitle}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{component.description}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {component.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-xl">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-bold text-foreground mb-2">Enterprise Security</h4>
            <p className="text-sm text-muted-foreground">
              Bank-level encryption, compliance-ready, with full data sovereignty
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-secondary/20 to-transparent border border-border rounded-xl">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-bold text-foreground mb-2">Lightning Fast</h4>
            <p className="text-sm text-muted-foreground">
              Sub-second response times with intelligent caching and optimization
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-xl">
            <Cpu className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-bold text-foreground mb-2">Scalable Infrastructure</h4>
            <p className="text-sm text-muted-foreground">
              Grows with your business, from startup to enterprise scale
            </p>
          </div>
        </div>

        {/* Technology Logos */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-foreground mb-2">Powered by Industry Leaders</h4>
            <p className="text-muted-foreground">Built on proven, enterprise-grade technologies</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-secondary/50 border border-border rounded-lg px-4 py-2 text-sm font-semibold">
              OpenAI GPT-4
            </div>
            <div className="bg-secondary/50 border border-border rounded-lg px-4 py-2 text-sm font-semibold">
              Anthropic Claude
            </div>
            <div className="bg-secondary/50 border border-border rounded-lg px-4 py-2 text-sm font-semibold">
              Elasticsearch
            </div>
            <div className="bg-secondary/50 border border-border rounded-lg px-4 py-2 text-sm font-semibold">
              Google Vertex AI
            </div>
            <div className="bg-secondary/50 border border-border rounded-lg px-4 py-2 text-sm font-semibold">
              React & TypeScript
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
