"use client";

import { Button } from "./ui/button";
import { Brain, Database, Cpu, Code2, Linkedin, Github, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - The Manifesto */}
      <section className="relative overflow-hidden py-20 lg:py-32 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  I Build Bridges Between{" "}
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Data and Decisions
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  I'm <span className="font-semibold text-foreground">Hasan</span>, the founder of Hashub and the architect behind the 
                  <span className="font-semibold text-primary"> hashub-doc</span> and 
                  <span className="font-semibold text-primary"> hashub-vector</span> APIs. 
                  My passion is transforming information chaos into intelligent, actionable assets for businesses.
                </p>
              </div>
            </div>

            {/* Professional Photo */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/20 p-1">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img 
                      src="/hasan-big-profile.png" 
                      alt="Hasan - Founder & AI Architect"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Founder & Architect
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Philosophy */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              More Than Code, It's About Solving the Right Problem
            </h2>
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl text-primary/20 font-serif">"</div>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
                <p>
                  I believe the most elegant code is useless if it doesn't solve a real-world business problem. 
                  My process always starts with understanding your goals, not just your technical requirements.
                </p>
                
                <p>
                  True solutions require more than just an algorithm; they require a robust, scalable, and 
                  maintainable system. From data ingestion to the final user interface, I build complete 
                  solutions, not just components.
                </p>
                
                <p>
                  My greatest satisfaction comes from tackling highly complex data challenges and engineering 
                  simple, intuitive solutions that anyone in an organization can use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              My Journey in Building Intelligent Systems
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-blue-600"></div>

            {/* Timeline Events */}
            <div className="space-y-16">
              {/* Event 1: soorgla.com */}
              <div className="relative flex items-start space-x-8">
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center ring-4 ring-background shadow-lg">
                  <span className="text-primary-foreground font-bold">S</span>
                </div>
                
                <div className="flex-1 bg-card rounded-xl p-8 shadow-sm border border-border/50">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-xl font-bold">2020-2023 - Founder & Lead Architect, soorgla.com</h3>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      I founded soorgla.com to solve one of the most demanding data challenges: legal research. 
                      We built a platform from the ground up that processed millions of court documents, enabling 
                      lawyers to find critical information in seconds. This experience in a high-stakes environment 
                      taught me invaluable lessons about OCR, NLP, and building mission-critical, scalable systems.
                    </p>
                    
                    <div className="flex items-center space-x-2 text-sm text-primary">
                      <ExternalLink className="w-4 h-4" />
                      <span>soorgla.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 2: Hashub.dev */}
              <div className="relative flex items-start space-x-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center ring-4 ring-background shadow-lg">
                  <span className="text-white font-bold">H</span>
                </div>
                
                <div className="flex-1 bg-card rounded-xl p-8 shadow-sm border border-border/50">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-xl font-bold">Today - Founder, Hashub.dev</h3>
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Current
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      I created Hashub to generalize the powerful solutions from my legal tech journey and make 
                      them accessible to all businesses. My goal is to provide the foundational tools—through my 
                      APIs and the Hashub Synapse service—that empower companies to finally unlock the true value 
                      hidden in their own data.
                    </p>
                    
                    <div className="flex items-center space-x-2 text-sm text-primary">
                      <ExternalLink className="w-4 h-4" />
                      <span>hashub.dev</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Toolkit */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">My Toolkit</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* AI & NLP */}
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI & NLP</h3>
                <p className="text-muted-foreground">
                  Architecting end-to-end RAG systems using state-of-the-art models from OpenAI, 
                  Google Vertex AI, and more.
                </p>
              </div>
            </div>

            {/* Search & Databases */}
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Search & Databases</h3>
                <p className="text-muted-foreground">
                  Expert-level design and management of Elasticsearch, including advanced vector search 
                  capabilities for semantic retrieval.
                </p>
              </div>
            </div>

            {/* System Architecture */}
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">System Architecture</h3>
                <p className="text-muted-foreground">
                  Designing robust, scalable, and maintainable cloud-native systems for mission-critical applications.
                </p>
              </div>
            </div>

            {/* Product & API Design */}
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">Product & API Design</h3>
                <p className="text-muted-foreground">
                  Crafting developer-first APIs and products that are powerful, yet simple and intuitive to integrate and use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond the Code */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Beyond the Code</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not architecting systems, you can usually find me exploring the historic sites 
                and mountains around Bursa, reading about the history of technology, or contributing to 
                open-source NLP projects.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe the best solutions are born from a blend of focused work and diverse inspiration.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold">Connect with me</h3>
              
              <div className="flex flex-col space-y-4">
                <a 
                  href="https://linkedin.com/in/hasanhub" 
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>LinkedIn</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <a 
                  href="https://github.com/hasanhub" 
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-600/20 rounded-lg flex items-center justify-center group-hover:bg-gray-600/30 transition-colors">
                    <Github className="w-5 h-5 text-gray-600" />
                  </div>
                  <span>GitHub</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Let's Build Something Great Together
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                If you have a complex data challenge or want to transform how your business uses information, 
                I'd love to hear about it.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg"
                onClick={() => navigate('/chat')}
              >
                Schedule Your Free Strategy Call
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg"
                onClick={() => navigate('/docs')}
              >
                View My Work
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
