"use client";

import { ArrowRight, Users, Clock, Target, Quote, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

export function CaseStudy() {
  const metrics = [
    {
      value: "80%",
      label: "Reduction in Research Time",
      description: "From hours to minutes"
    },
    {
      value: "500+",
      label: "Hours Saved per Employee/Year",
      description: "More time for high-value work"
    },
    {
      value: "95%",
      label: "User Satisfaction Rate",
      description: "Lawyers love the new system"
    },
    {
      value: "10x",
      label: "Faster Case Preparation",
      description: "Dramatic efficiency improvement"
    }
  ];

  const challenges = [
    "Thousands of legal precedent documents scattered across multiple systems",
    "Lawyers spending 3-4 hours daily searching for relevant case information",
    "Inconsistent document formatting making search nearly impossible",
    "Critical information often missed due to manual search limitations",
    "New associates struggling to navigate complex document archives"
  ];

  const solutions = [
    "Complete archive digitization with intelligent OCR processing",
    "Natural language search interface allowing lawyers to ask questions conversationally",
    "Semantic indexing that understands legal concepts and relationships",
    "Instant access to relevant precedents with confidence scoring",
    "Smart summarization of lengthy legal documents"
  ];

  const results = [
    "Research time reduced from hours to minutes",
    "100% of legal precedents now searchable and accessible",
    "Significant improvement in case preparation quality",
    "New associates productive from day one",
    "Firm-wide adoption with zero resistance"
  ];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-primary/90 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <Target className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">Success Story</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            <span className="text-foreground">Proven Success:</span>
            <br />
            <span className="text-primary">Transforming Legal Research</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How we helped soorgla.com revolutionize legal research with our core technology, 
            demonstrating the real-world impact of Hashub Synapse.
          </p>
        </div>

        {/* Hero Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center p-6 bg-secondary/20 border border-border rounded-xl">
              <div className="text-4xl lg:text-5xl font-extrabold text-primary mb-2">{metric.value}</div>
              <div className="font-semibold text-foreground mb-1">{metric.label}</div>
              <div className="text-sm text-muted-foreground">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Main Case Study */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Challenge & Solution */}
          <div className="space-y-12">
            {/* Challenge */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">The Challenge</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A prominent law firm was drowning in their own success. With thousands of legal precedent 
                documents accumulated over decades, lawyers were spending more time searching for information 
                than practicing law.
              </p>
              
              <div className="space-y-3">
                {challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground text-sm">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Solution</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Using Hashub's core technology stack, we created a comprehensive legal research platform 
                that understands context, relationships, and legal concepts.
              </p>
              
              <div className="space-y-3">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground text-sm">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Results & Testimonial */}
          <div className="space-y-12">
            {/* Results */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Achieved Results</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The transformation was immediate and dramatic. Lawyers went from dreading research 
                to confidently finding exactly what they needed in seconds.
              </p>
              
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground text-sm">{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-secondary/20 border border-border rounded-xl p-8">
              <Quote className="w-12 h-12 text-primary/50 mb-6" />
              
              <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                "This system has fundamentally changed how we practice law. What used to take our 
                associates half a day now happens in minutes. The AI understands legal concepts 
                better than many junior lawyers, and it never gets tired or misses important precedents."
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Senior Partner</div>
                  <div className="text-sm text-muted-foreground">Major Law Firm</div>
                </div>
              </div>
            </div>

            {/* Visit Website */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">See It in Action</h4>
                  <p className="text-sm text-muted-foreground">Visit soorgla.com to experience the technology firsthand</p>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Visit Site
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Deep Dive */}
        <div className="mt-20 pt-12 border-t border-border">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">Technology Implementation</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              The same core technologies powering soorgla.com are available in Hashub Synapse, 
              customized for your specific industry and use case.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-secondary/20 border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Real-time Processing</h4>
              <p className="text-sm text-muted-foreground">Documents processed and indexed instantly</p>
            </div>

            <div className="bg-secondary/20 border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Precision Search</h4>
              <p className="text-sm text-muted-foreground">Context-aware results with confidence scoring</p>
            </div>

            <div className="bg-secondary/20 border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">User Adoption</h4>
              <p className="text-sm text-muted-foreground">Intuitive interface requiring zero training</p>
            </div>

            <div className="bg-secondary/20 border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-orange-500" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Scalable Growth</h4>
              <p className="text-sm text-muted-foreground">System grows with expanding document volumes</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
            <h4 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Industry?
            </h4>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              The same technology that revolutionized legal research can transform your business. 
              Let's discuss how Synapse can solve your specific challenges.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              Schedule Your Strategy Session
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
