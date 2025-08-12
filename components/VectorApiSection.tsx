"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, Table as TableIcon, Code2 } from "lucide-react";
import logoImg from '../public/logo.png';

export function VectorApiSection() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"embed" | "search" | "scores">("embed");

  return (
    <section id="vector-api" className="relative py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-primary/90 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <img src={logoImg} alt="HasHub" className="w-3.5 h-3.5" /> Vector API
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Embed and search <span className="text-primary">your data</span> at scale.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Generate high-precision vector embeddings with multiple models, optimized for semantic search, RAG workflows, and personalized AI applications.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/90">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Multiple embedding models
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Optimized for semantic search & RAG
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Low-latency, scalable infrastructure
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Multilingual support
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-7" 
              onClick={() => navigate('/docs/playground')}
              data-analytics-id="vectorapi-try"
            >
              Try Vector API
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-7"
              onClick={() => navigate('/docs/api-reference')}
              data-analytics-id="vectorapi-docs"
            >
              View Docs
            </Button>
          </div>
        </div>

        {/* Right: Demo */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-primary/20 to-emerald-500/10 blur-2xl" />
          <div className="rounded-2xl border border-border bg-secondary/50 backdrop-blur-sm shadow-2xl p-4">
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setTab("embed")}
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border ${
                  tab === "embed" ? "bg-primary/15 border-primary text-primary" : "border-border hover:bg-white/5"
                }`}
                aria-pressed={tab === "embed"}
              >
                <Code2 className="w-4 h-4" /> Text Embedding
              </button>
              <button
                onClick={() => setTab("search")}
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border ${
                  tab === "search" ? "bg-primary/15 border-primary text-primary" : "border-border hover:bg-white/5"
                }`}
                aria-pressed={tab === "search"}
              >
                <Search className="w-4 h-4" /> Vector Search
              </button>
              <button
                onClick={() => setTab("scores")}
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border ${
                  tab === "scores" ? "bg-primary/15 border-primary text-primary" : "border-border hover:bg-white/5"
                }`}
                aria-pressed={tab === "scores"}
              >
                <TableIcon className="w-4 h-4" /> Similarity Scores
              </button>
            </div>

            {/* Content */}
            {tab === "embed" && (
              <pre className="text-xs font-mono text-foreground overflow-auto leading-relaxed">
{`Input text: "Machine learning enables systems to learn..."
Embedding: [0.0123, -0.9832, 0.3421, ... , 0.1287]`}
              </pre>
            )}

            {tab === "search" && (
              <div className="space-y-2 text-xs">
                <div className="font-semibold text-muted-foreground">Query:</div>
                <div className="p-2 rounded bg-background/50 border border-border">"AI applications in healthcare"</div>
                <div className="font-semibold text-muted-foreground mt-2">Top Results:</div>
                <ul className="space-y-1">
                  <li>1. "AI in Medical Diagnostics" – score: 0.912</li>
                  <li>2. "Deep Learning for Cancer Detection" – score: 0.879</li>
                  <li>3. "Healthcare Chatbots" – score: 0.861</li>
                </ul>
              </div>
            )}

            {tab === "scores" && (
              <div className="text-sm">
                <div className="grid grid-cols-3 text-xs">
                  <div className="p-2 border border-border font-medium">Document</div>
                  <div className="p-2 border border-border font-medium">Similarity</div>
                  <div className="p-2 border border-border font-medium">Rank</div>
                  <div className="p-2 border border-border">AI in Medical Diagnostics</div>
                  <div className="p-2 border border-border">0.912</div>
                  <div className="p-2 border border-border">1</div>
                  <div className="p-2 border border-border">Deep Learning for Cancer Detection</div>
                  <div className="p-2 border border-border">0.879</div>
                  <div className="p-2 border border-border">2</div>
                  <div className="p-2 border border-border">Healthcare Chatbots</div>
                  <div className="p-2 border border-border">0.861</div>
                  <div className="p-2 border border-border">3</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}