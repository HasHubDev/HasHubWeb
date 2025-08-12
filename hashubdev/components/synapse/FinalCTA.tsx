"use client";

import { Calendar, ArrowRight, CheckCircle, Clock, Users, Zap } from "lucide-react";
import { Button } from "../ui/button";

export function FinalCTA() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Based on successful real-world implementations"
    },
    {
      icon: Clock,
      title: "Quick Implementation", 
      description: "Get started in weeks, not months"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated team ensuring your success"
    },
    {
      icon: Zap,
      title: "Immediate Impact",
      description: "See productivity gains from day one"
    }
  ];

  const guarantees = [
    "30-day money-back guarantee",
    "Free trial period included",
    "No long-term contracts required",
    "Transparent pricing with no hidden fees",
    "Migration support if you're not satisfied"
  ];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary/90 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-8">
            <img src="/logo.png" alt="Hashub" className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">Ready to Transform</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
            <span className="text-foreground">Turn Information</span>
            <br />
            <span className="text-foreground">from </span>
            <span className="text-red-500">Burden</span>
            <span className="text-foreground"> to </span>
            <span className="text-primary">Power</span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Stop letting scattered information slow down your business. 
            Take the first step toward unlocking your company's hidden potential 
            with an intelligent knowledge system.
          </p>

          {/* Primary CTA */}
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 mb-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Start with a Free Strategy Session
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              In 30 minutes, we'll assess your current information challenges and show you 
              exactly how Synapse can transform your workflow. No sales pressure, just insights.
            </p>
            
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-12 py-4 mb-4 group"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Schedule Free Strategy Session
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="text-sm text-muted-foreground">
              🎯 <strong>30 minutes</strong> • <strong>Zero commitment</strong> • <strong>Actionable insights</strong>
            </div>
          </div>
        </div>

        {/* Why Act Now */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Why Choose Hashub Synapse?</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-background/50 border border-border rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantees */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Risk-Free Guarantee</h3>
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
              <p className="text-muted-foreground mb-4">
                We're so confident in Synapse's ability to transform your business 
                that we offer comprehensive guarantees:
              </p>
              <div className="space-y-3">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground text-sm">{guarantee}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-12">
          <div className="bg-background/50 border border-border rounded-xl p-8">
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Join Forward-Thinking Companies Already Using Our Technology
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="bg-secondary/50 border border-border rounded-lg px-6 py-3 text-sm font-semibold">
                soorgla.com
              </div>
              <div className="bg-secondary/50 border border-border rounded-lg px-6 py-3 text-sm font-semibold">
                Leading Law Firms
              </div>
              <div className="bg-secondary/50 border border-border rounded-lg px-6 py-3 text-sm font-semibold">
                Healthcare Organizations
              </div>
              <div className="bg-secondary/50 border border-border rounded-lg px-6 py-3 text-sm font-semibold">
                Financial Services
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-background/50 border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <h4 className="font-semibold text-foreground mb-3">Explore Live Demo</h4>
            <p className="text-sm text-muted-foreground mb-4">
              See Synapse in action with real data and use cases
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Demo
            </Button>
          </div>

          <div className="bg-background/50 border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <h4 className="font-semibold text-foreground mb-3">Download Case Study</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Deep dive into our soorgla.com success story
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Get Case Study
            </Button>
          </div>

          <div className="bg-background/50 border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <h4 className="font-semibold text-foreground mb-3">Technical Documentation</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Review detailed technical specifications and APIs
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Docs
            </Button>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mt-16">
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-xl sm:text-2xl text-foreground/90 font-medium leading-relaxed mb-6">
              "The companies that thrive in the next decade will be those that can turn 
              their information into intelligence. The question isn't whether you need 
              this transformation—it's whether you'll lead it or follow it."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">H</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Hasan</div>
                <div className="text-sm text-muted-foreground">Founder, Hashub</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
