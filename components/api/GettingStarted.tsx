import { UserPlus, BookOpen, Rocket, ArrowRight, Code2, Star } from "lucide-react";
import { Button } from "../ui/button";

export function GettingStarted() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create an Account",
      description: "Sign up for free and get your API key instantly. No credit card required for the free tier.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02", 
      icon: BookOpen,
      title: "Read the Docs",
      description: "Explore our comprehensive documentation with guides, examples, and best practices.",
      color: "from-purple-500 to-violet-500"
    },
    {
      number: "03",
      icon: Rocket,
      title: "Integrate & Scale",
      description: "Make your first successful API call and scale as your application grows.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Start Building in <span className="text-primary">Minutes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get up and running with Hashub APIs in just a few simple steps. 
            Our developer-first approach makes integration seamless.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent transform translate-x-1/2 z-0" />
              )}
              
              <div className="relative bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 z-10">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code Example */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Your First API Call</h3>
          </div>
          
          <div className="bg-background/50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-muted-foreground">
{`# Install the SDK
npm install @hashub/sdk

# Your first document processing call
import { HashubClient } from '@hashub/sdk';

const client = new HashubClient('your-api-key');

const result = await client.doc.process({
  file: 'invoice.pdf',
  outputFormat: 'markdown'
});

console.log(result.markdown);`}
            </pre>
          </div>
        </div>

        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-muted/50 rounded-2xl p-8 border border-border">
            <BookOpen className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Documentation</h3>
            <p className="text-muted-foreground mb-6">
              Comprehensive guides, API references, and code examples to help you get started quickly.
            </p>
            <Button variant="outline" className="group border-primary/20 hover:border-primary/40">
              View Docs
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 border border-border">
            <Star className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Community</h3>
            <p className="text-muted-foreground mb-6">
              Join our developer community for support, discussions, and to share your projects.
            </p>
            <Button variant="outline" className="group border-primary/20 hover:border-primary/40">
              Join Community
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Power Your Application with Hashub?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of developers building the next generation of AI applications. 
              Start with our generous free tier and scale as you grow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 group"
              >
                Get Your Free API Key Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
              >
                View Live Demo
              </Button>
            </div>
            
            <div className="mt-8 text-white/80 text-sm">
              🚀 Free tier includes 100 doc pages + 1M vector tokens • No credit card required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
