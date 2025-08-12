"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Copy, Check } from "lucide-react";
import logoImg from '../../public/logo.png';

export function ApiHero() {
  const navigate = useNavigate();
  const [currentCode, setCurrentCode] = useState(0);
  const [copied, setCopied] = useState(false);

  const codeExamples = [
    {
      language: "cURL",
      code: `curl -X POST "https://api.hashub.dev/v1/doc/process" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "file_url": "https://example.com/document.pdf",
    "output_format": "markdown"
  }'`
    },
    {
      language: "Python",
      code: `import requests

response = requests.post(
    "https://api.hashub.dev/v1/doc/process",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "file_url": "https://example.com/document.pdf",
        "output_format": "markdown"
    }
)

data = response.json()`
    },
    {
      language: "JavaScript",
      code: `const response = await fetch('https://api.hashub.dev/v1/doc/process', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    file_url: 'https://example.com/document.pdf',
    output_format: 'markdown'
  })
});

const data = await response.json();`
    }
  ];

  const responseExample = `{
  "success": true,
  "data": {
    "markdown": "# Invoice\\n\\n**Date:** 2024-03-15\\n**Invoice #:** INV-001\\n\\n| Item | Quantity | Price |\\n|------|----------|-------|\\n| Service A | 2 | $150.00 |\\n| Service B | 1 | $75.00 |\\n\\n**Total:** $225.00",
    "metadata": {
      "pages": 1,
      "language": "en",
      "processing_time": 2.3
    }
  }
}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCode((prev) => (prev + 1) % codeExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [codeExamples.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm tracking-wider uppercase text-primary/90 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <img src={logoImg} alt="Hashub" className="w-4 h-4" />
                Developer APIs
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">APIs for</span>
                <br />
                <span className="text-primary">Modern AI</span>
                <br />
                <span className="text-foreground">Applications</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                Build powerful document intelligence and semantic search features with just a few lines of code. 
                <span className="text-foreground font-medium"> Production-ready, scalable, and easy to integrate.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 group"
                onClick={() => navigate('/docs/api-keys')}
              >
                Get Your Free API Key
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-primary/20 hover:border-primary/40"
                onClick={() => navigate('/docs/api-reference')}
              >
                View Documentation
              </Button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                99.9% Uptime
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                &lt; 200ms Response Time
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                SOC 2 Compliant
              </div>
            </div>
          </div>

          {/* Right - Code Demo */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
            {/* Code Editor */}
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl">
              {/* Editor Header */}
              <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">api-call.{codeExamples[currentCode].language.toLowerCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {codeExamples.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCode(index)}
                      className={`px-3 py-1 text-xs rounded transition-colors ${
                        currentCode === index 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {codeExamples[index].language}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Code Content */}
              <div className="relative">
                <div className="p-4 bg-background/50 font-mono text-sm">
                  <pre className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {codeExamples[currentCode].code}
                  </pre>
                </div>
                <button
                  onClick={() => copyToClipboard(codeExamples[currentCode].code)}
                  className="absolute top-3 right-3 p-2 bg-muted hover:bg-muted/80 rounded border border-border transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Response */}
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-xl">
              <div className="bg-muted/50 border-b border-border px-4 py-3">
                <span className="text-sm text-muted-foreground font-mono">Response (200 OK)</span>
              </div>
              <div className="p-4 bg-background/50 font-mono text-sm max-h-48 overflow-y-auto">
                <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
                  {responseExample}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
