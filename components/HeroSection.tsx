"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { FileText, Code, Play } from "lucide-react";
import logoImg from '../public/logo.png';

type Stage = 0 | 1 | 2 | 3 | 4 | 5;

const JSON_SAMPLE = `{
  "title": "Contract Agreement",
  "sections": [
    {
      "heading": "Payment Terms",
      "content": "Due within 30 days",
      "bbox": [120, 340, 480, 380]
    }
  ]
}`;

export function HeroSection() {
  const [stage, setStage] = useState<Stage>(0);
  const [typed, setTyped] = useState("");
  const timers = useRef<number[]>([]);

  // Senaryo zaman çizelgesi
  const schedule = useMemo(
    () => [
      { at: 100,   s: 1 },   // PDF sahneye girer
      { at: 1500,  s: 2 },   // JSON dönüşümü
      { at: 3000,  s: 3 },   // Vectorleşme
      { at: 4500,  s: 4 },   // Chat UI
      { at: 6000,  s: 5 },   // Metin/CTA reveal
    ],
    []
  );

  useEffect(() => {
    // Zamanlayıcılar
    schedule.forEach(({ at, s }) => {
      const id = window.setTimeout(() => setStage(s as Stage), at);
      timers.current.push(id);
    });
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [schedule]);

  // JSON typewriter yalnızca Stage 2’de
  useEffect(() => {
    if (stage < 2) return;
    setTyped("");
    let i = 0;
    const id = window.setInterval(() => {
      if (i < JSON_SAMPLE.length) {
        setTyped((prev) => prev + JSON_SAMPLE[i]);
        i += 1;
      } else {
        clearInterval(id);
      }
    }, 18);
    return () => clearInterval(id);
  }, [stage]);

  const showChat = stage >= 4;
  const showContent = stage >= 5;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-16">
      {/* Arkaplan koyulaşma */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${showContent ? "bg-background/60" : "bg-background/0"}`}
        aria-hidden
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`grid grid-cols-1 gap-12 items-center ${showContent ? 'lg:grid-cols-2' : ''}`}>
          {/* Sol metin – finalde oturur */}
          <div
            className={`space-y-8 transition-all duration-1000 ${showContent ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="text-foreground">From Any Document</span>
                <br />
                <span className="text-foreground">to </span>
                <span className="text-primary">Instant Answers</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Extract, vectorize, and chat with your data — all in one platform.
              </p>
            </div>
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3">
                <Play className="w-5 h-5 mr-2" />
                Try Live Demo
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Explore Solutions
              </Button>
            </div>
          </div>

          {/* Sağ sahne – büyük animasyon */}
          <div className={`relative h-96 lg:h-[520px] flex items-center justify-center ${showContent ? 'hidden lg:flex' : 'flex'}`}>
            {/* Büyük glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/25 to-accent/25 rounded-full blur-3xl motion-safe:animate-pulse-glow" />

            {/* 1) PDF giriş */}
            <div
              className={`absolute transition-all duration-[1400ms] ease-out ${
                stage >= 1 ? "left-8 opacity-100" : "-left-full opacity-0"
              } ${stage >= 2 ? "scale-75 -translate-y-4" : ""}`}
              aria-hidden={stage < 1}
            >
              <div
                className="bg-secondary/70 backdrop-blur-sm border border-border rounded-lg p-6 shadow-2xl w-56"
                style={{ filter: stage >= 2 ? "blur(2px)" : "none" }}
              >
                <FileText className="w-16 h-16 text-primary mb-4" />
                <div className="space-y-3">
                  <div className="h-3 bg-muted-foreground/40 rounded w-24" />
                  <div className="h-3 bg-muted-foreground/40 rounded w-20" />
                  <div className="h-3 bg-muted-foreground/40 rounded w-28" />
                  <div className="h-2 bg-muted-foreground/30 rounded w-16" />
                  <div className="h-2 bg-muted-foreground/30 rounded w-24" />
                </div>
              </div>
            </div>

            {/* 2) Dönüşüm çekirdeği (Hashub hub) */}
            <div className={`relative z-10 transition-all duration-1000 ${stage >= 2 ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-secondary to-muted flex items-center justify-center motion-safe:animate-spin-slow shadow-2xl">
                <img 
                  src={logoImg} 
                  alt="Hashub Logo" 
                  className="w-10 h-10 motion-safe:animate-pulse"
                />
              </div>
              {stage >= 2 && (
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-0 w-16 h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-full -translate-y-1/2" />
                  <div className="absolute top-1/2 right-0 w-16 h-0.5 bg-gradient-to-l from-primary to-transparent translate-x-full -translate-y-1/2" />
                </div>
              )}
            </div>

            {/* 2) JSON kod bloğu */}
            <div
              className={`absolute right-8 top-10 transition-all duration-1000 ease-out ${
                stage >= 2 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              } ${stage >= 3 ? "scale-90" : ""}`}
            >
              <div className="bg-secondary/70 backdrop-blur-sm border border-border rounded-lg p-4 shadow-2xl w-72">
                <div className="flex items-center space-x-2 mb-3">
                  <Code className="w-6 h-6 text-primary" />
                  <span className="text-sm text-primary font-mono">hashub.json</span>
                </div>
                <pre className="text-xs font-mono text-foreground overflow-hidden">{typed}</pre>
              </div>
            </div>

            {/* 2-3) Parçacık akışı */}
            {stage >= 2 && stage < 4 && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full motion-safe:animate-particle"
                    style={{
                      left: `${28 + (i % 8) * 6}%`,
                      top: `${40 + Math.floor(i / 8) * 18}%`,
                      animationDelay: `${i * 0.06}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* 3) Vector görselleştirme */}
            {stage >= 3 && stage < 4 && (
              <div className="absolute right-2 top-16 w-[300px] h-[220px] pointer-events-none">
                {/* Noktalar */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-accent rounded-full motion-safe:animate-rise"
                    style={{
                      left: `${10 + i * 8}%`,
                      top: `${20 + (i % 5) * 15}%`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                ))}
                {/* Bağlantılar */}
                <svg className="absolute inset-0 w-full h-full opacity-70">
                  <defs>
                    <linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <path d="M30,40 L120,70 L80,130 L160,100" stroke="url(#vg)" strokeWidth="1.2" fill="none" />
                </svg>
              </div>
            )}

            {/* Ambient parçacıklar */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full motion-safe:animate-float"
                  style={{ left: `${15 + i * 15}%`, top: `${25 + i * 12}%`, animationDelay: `${i * 0.8}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4) Chat UI - Container dışında */}
      {showChat && (
        <div
          className={`z-50 absolute transition-all duration-1000 ease-out
            ${showContent ? 
              'hidden sm:block right-4 sm:right-8 md:right-16 lg:right-32 xl:right-48 2xl:right-64 top-[calc(50vh-20px)]' 
              : 'right-4 sm:right-8 md:right-16 lg:right-32 xl:right-48 2xl:right-64 top-[calc(50vh-20px)]'
            } ${
            stage >= 4 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-75"
          }`}
        >
          {/* Mobile Phone Frame */}
          <div className="relative">
            {/* Phone Outline */}
            <div className="w-72 h-[480px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[32px] p-2 shadow-2xl">
              {/* Screen */}
              <div className="w-full h-full bg-background rounded-[28px] overflow-hidden relative">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-6 py-3 bg-secondary/50">
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-foreground rounded-full"></div>
                    <div className="w-1 h-1 bg-foreground rounded-full"></div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  </div>
                  <div className="text-xs font-medium text-foreground">9:41</div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-2 border border-foreground rounded-sm">
                      <div className="w-2 h-1 bg-primary rounded-sm"></div>
                    </div>
                  </div>
                </div>
                
                {/* Chat Header */}
                <div className="flex items-center space-x-3 px-4 py-3 bg-secondary/30 border-b border-border/30">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30">
                    <img 
                      src={logoImg} 
                      alt="Hashub Logo" 
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground">Hashub Synapse</div>
                    <div className="text-xs text-primary flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-1 animate-pulse"></div>
                      AI Active
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-6 h-6 rounded-full bg-muted/30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 px-4 py-4 space-y-4 bg-gradient-to-b from-background to-secondary/10">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-xs">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3 shadow-sm">
                        <div className="text-sm">What's in my contract about payment terms?</div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right mt-1 px-2">9:41</div>
                    </div>
                  </div>
                  
                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="max-w-xs">
                      <div 
                        className={`bg-secondary/80 text-foreground rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-border/50 transition-all duration-700 ${
                          stage >= 4 ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                        style={{ transitionDelay: "800ms" }}
                      >
                        <div className="text-sm">According to section 3, payment is due within 30 days.</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 px-2">9:41</div>
                    </div>
                  </div>
                  
                  {/* Typing Indicator */}
                  <div className="flex justify-start">
                    <div className="bg-secondary/60 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Input Area */}
                <div className="p-4 bg-secondary/20 border-t border-border/30">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-secondary/60 rounded-full px-4 py-2 border border-border/30">
                      <div className="text-sm text-muted-foreground">Ask about your document...</div>
                    </div>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 text-primary-foreground">→</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Glow Effect */}
            {stage >= 4 && (
              <div className="absolute inset-0 rounded-[32px] bg-primary/10 blur-xl -z-10 animate-pulse"></div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
