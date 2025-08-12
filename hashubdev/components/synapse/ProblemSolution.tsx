"use client";

import { X, CheckCircle, Clock, Search, FileQuestion, MessageSquare, CheckCheck, Zap, Database, Users } from "lucide-react";

export function ProblemSolution() {
  const problems = [
    {
      icon: FileQuestion,
      title: "Files Lost in Folders",
      description: "Critical information buried in countless directories"
    },
    {
      icon: MessageSquare,
      title: "Unanswered Emails",
      description: "Important questions lost in overflowing inboxes"
    },
    {
      icon: Search,
      title: "Time-Wasting Searches",
      description: "Hours spent hunting for information that should be instant"
    },
    {
      icon: Clock,
      title: "Outdated Information",
      description: "Teams working with questionable or obsolete data"
    }
  ];

  const solutions = [
    {
      icon: CheckCheck,
      title: "Instant, Accurate Answers",
      description: "Get precise information in seconds, not hours"
    },
    {
      icon: Zap,
      title: "Increased Team Productivity",
      description: "Focus on high-value work instead of information hunting"
    },
    {
      icon: Database,
      title: "Centralized Knowledge Hub",
      description: "All company knowledge accessible from one intelligent interface"
    },
    {
      icon: Users,
      title: "Reliable Corporate Memory",
      description: "Never lose institutional knowledge when people leave"
    }
  ];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            <span className="text-foreground">Stop Letting Information Access</span>
            <br />
            <span className="text-primary">Consume Your Valuable Time</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The difference between chaos and clarity is having the right system in place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Before - Problems */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 mb-4">
                <X className="w-5 h-5" />
                <span className="font-semibold">Traditional Methods</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Current Reality</h3>
              <p className="text-muted-foreground">
                Most companies are drowning in their own data, unable to extract value efficiently.
              </p>
            </div>

            <div className="space-y-6">
              {problems.map((problem, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 bg-red-500/5 border border-red-500/10 rounded-xl hover:bg-red-500/10 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <problem.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{problem.title}</h4>
                    <p className="text-muted-foreground text-sm">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Metrics */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">The Hidden Cost</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-500">23%</div>
                  <div className="text-xs text-muted-foreground">Time Wasted Searching</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">$12K</div>
                  <div className="text-xs text-muted-foreground">Cost per Employee/Year</div>
                </div>
              </div>
            </div>
          </div>

          {/* After - Solutions */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">With Hashub Synapse</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Transformed Future</h3>
              <p className="text-muted-foreground">
                Turn your information chaos into a competitive advantage with intelligent systems.
              </p>
            </div>

            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 bg-primary/5 border border-primary/10 rounded-xl hover:bg-primary/10 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <solution.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{solution.title}</h4>
                    <p className="text-muted-foreground text-sm">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Success Metrics */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4">The Transformation</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">80%</div>
                  <div className="text-xs text-muted-foreground">Faster Information Access</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs text-muted-foreground">Hours Saved/Employee/Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-background border border-border rounded-xl p-6 shadow-lg">
            <div className="text-left">
              <h4 className="font-semibold text-foreground">Ready to make the switch?</h4>
              <p className="text-sm text-muted-foreground">See how Synapse can transform your workflow</p>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
