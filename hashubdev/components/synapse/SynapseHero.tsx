"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { FileText, Database, Brain, Monitor, ArrowRight, Calendar } from "lucide-react";

type Stage = 0 | 1 | 2 | 3 | 4;

export function SynapseHero() {
  const [stage, setStage] = useState<Stage>(0);
  const timers = useRef<number[]>([]);

  const schedule = useMemo(
    () => [
      { at: 500,   s: 1 },   // Data sources appear
      { at: 1500,  s: 2 },   // Processing
      { at: 2500,  s: 3 },   // AI Brain
      { at: 3500,  s: 4 },   // Interface reveal
    ],
    []
  );

  useEffect(() => {
    schedule.forEach(({ at, s }) => {
      const id = window.setTimeout(() => setStage(s as Stage), at);
      timers.current.push(id);
    });
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [schedule]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-primary/90 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <img src="/logo.png" alt="Hashub" className="w-4 h-4" />
                Enterprise Solution
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="text-primary">Hashub</span>
                <br />
                <span className="text-foreground">Synapse</span>
              </h1>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-foreground/90 font-medium leading-relaxed">
                Transform Your Company's Scattered Information into an 
                <span className="text-primary font-semibold"> Instantly Responsive Corporate Memory</span>
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Stop losing time searching through folders, emails, and documents. 
                Turn your data chaos into intelligent, searchable knowledge that works for you.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 group"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Free Strategy Session
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
              >
                View Live Demo
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              🎯 30 minutes • No commitment • Tailored strategy
            </div>
          </div>

          {/* Right Visualization */}
          <div className="relative h-96 lg:h-[600px] flex items-center justify-center">
            {/* Central Hub */}
            <div className="relative z-20">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-2xl">
                <img 
                  src="/logo.png" 
                  alt="Synapse Core" 
                  className="w-16 h-16 motion-safe:animate-pulse"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            </div>

            {/* Data Sources - Input */}
            <div 
              className={`absolute left-8 top-16 transition-all duration-1000 ${
                stage >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="bg-secondary/80 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl w-48">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold">Data Sources</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    PDFs, DOCs, Images
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Emails & Slack
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Web & Databases
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Layer */}
            <div 
              className={`absolute left-16 bottom-16 transition-all duration-1000 ${
                stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-secondary/80 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl w-44">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold">Processing</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div>✓ OCR & Text Extraction</div>
                  <div>✓ Vector Embeddings</div>
                  <div>✓ Semantic Indexing</div>
                </div>
              </div>
            </div>

            {/* AI Brain */}
            <div 
              className={`absolute right-8 top-20 transition-all duration-1000 ${
                stage >= 3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="bg-secondary/80 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl w-48">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold">AI Intelligence</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    GPT-4 & Claude
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Contextual Reasoning
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    Multi-language Support
                  </div>
                </div>
              </div>
            </div>

            {/* User Interface */}
            <div 
              className={`absolute right-16 bottom-12 transition-all duration-1000 ${
                stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-secondary/80 backdrop-blur-sm border border-border rounded-xl p-4 shadow-xl w-44">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="w-6 h-6 text-primary" />
                  <span className="text-sm font-semibold">Interface</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div>🎨 Custom Branding</div>
                  <div>📱 Multi-platform</div>
                  <div>⚡ Real-time Responses</div>
                </div>
              </div>
            </div>

            {/* Connection Lines */}
            {stage >= 2 && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full opacity-40">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <path d="M120,180 Q200,250 280,300" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
                  <path d="M160,400 Q240,350 320,300" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
                  <path d="M400,300 Q450,250 500,200" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
                  <path d="M400,300 Q450,350 500,400" stroke="url(#connectionGradient)" strokeWidth="2" fill="none" />
                </svg>
              </div>
            )}

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/40 rounded-full motion-safe:animate-float"
                  style={{ 
                    left: `${20 + i * 10}%`, 
                    top: `${30 + i * 8}%`, 
                    animationDelay: `${i * 0.5}s` 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
