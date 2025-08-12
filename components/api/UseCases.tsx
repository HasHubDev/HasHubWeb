import { Search, FileBarChart, Brain, Database, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function UseCases() {
  const useCases = [
    {
      icon: Search,
      title: "Intelligent Search (RAG)",
      description: "Combine hashub-doc and hashub-vector to power your Retrieval-Augmented Generation applications.",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Document parsing", "Vector embeddings", "Semantic search"]
    },
    {
      icon: FileBarChart,
      title: "Automated Data Entry",
      description: "Automatically extract structured data from invoices, receipts, and forms to streamline workflows.",
      gradient: "from-green-500 to-emerald-500",
      features: ["Form processing", "Table extraction", "Data validation"]
    },
    {
      icon: Brain,
      title: "Content Analysis & Categorization",
      description: "Understand and categorize large volumes of documents for insights and moderation.",
      gradient: "from-purple-500 to-violet-500",
      features: ["Document classification", "Content analysis", "Sentiment detection"]
    },
    {
      icon: Database,
      title: "Knowledge Management Systems",
      description: "Create a fully searchable, intelligent knowledge base for your team or customers.",
      gradient: "from-orange-500 to-red-500",
      features: ["Document indexing", "Smart search", "Knowledge discovery"]
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Build What's <span className="text-primary">Next</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how developers are using Hashub APIs to create intelligent applications 
            that transform how businesses handle documents and search.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="group relative bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${useCase.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <useCase.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {useCase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${useCase.gradient} rounded-full`} />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More */}
                <Button variant="outline" className="group/btn border-primary/20 hover:border-primary/40">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-muted/50 rounded-2xl p-12 border border-border">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Building?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with our free tier and see how Hashub APIs can transform your application. 
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 group">
              Get Your Free API Key
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 border-primary/20 hover:border-primary/40">
              Explore Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
