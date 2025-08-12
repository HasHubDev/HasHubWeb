"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Code2, Table as TableIcon, FileCode2 } from "lucide-react";

export function DocApiSection() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"json" | "md" | "table">("json");

  return (
    <section id="doc-api" className="relative py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-primary/90 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <FileText className="w-3.5 h-3.5" /> Doc API
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Parse documents. Extract structure. <span className="text-primary">Ship faster.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Convert your PDFs and images to Markdown/JSON with headings, paragraphs, tables, and position data.
            Connect documents to your search and RAG pipelines in seconds.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/90">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> 80+ language OCR
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Tables & headings extraction
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Markdown & JSON output
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Webhooks & async jobs
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-7" 
              onClick={() => navigate('/docs/playground')}
              data-analytics-id="docapi-try"
            >
              Try Doc API
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-7"
              onClick={() => navigate('/docs/api-reference')}
              data-analytics-id="docapi-docs"
            >
              View Docs
            </Button>
          </div>
        </div>

        {/* Right: Before/After + Tabs */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-primary/20 to-emerald-500/10 blur-2xl" />
          <div className="rounded-2xl border border-border bg-secondary/50 backdrop-blur-sm shadow-2xl p-4">
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-3">
              <button 
                onClick={() => setTab("md")} 
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border ${
                  tab === "md" ? "bg-primary/15 border-primary text-primary" : "border-border hover:bg-white/5"
                }`} 
                data-analytics-id="docapi-tab-md" 
                aria-pressed={tab === "md"}
              >
                <FileCode2 className="w-4 h-4" /> Markdown
              </button>
              <button 
                onClick={() => setTab("json")} 
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border ${
                  tab === "json" ? "bg-primary/15 border-primary text-primary" : "border-border hover:bg-white/5"
                }`} 
                data-analytics-id="docapi-tab-json" 
                aria-pressed={tab === "json"}
              >
                <Code2 className="w-4 h-4" /> JSON
              </button>
              <button 
                onClick={() => setTab("table")} 
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-md border ${
                  tab === "table" ? "bg-primary/15 border-primary text-primary" : "border-border hover:bg-white/5"
                }`} 
                data-analytics-id="docapi-tab-table" 
                aria-pressed={tab === "table"}
              >
                <TableIcon className="w-4 h-4" /> Table Preview
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 gap-4">
              {/* Before (doc preview) */}
              <div className="rounded-xl border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <FileText className="w-4 h-4 text-primary" />
                  input.pdf
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-muted/40 rounded" />
                  <div className="h-3 w-24 bg-muted/40 rounded" />
                  <div className="h-3 w-32 bg-muted/40 rounded" />
                  <div className="h-2 w-20 bg-muted/30 rounded" />
                  <div className="h-2 w-24 bg-muted/30 rounded" />
                </div>
              </div>

              {/* After (tab content) */}
              <div className="rounded-xl border border-border bg-background/60 p-4">
                {tab === "json" && (
                  <pre className="text-xs font-mono text-foreground overflow-auto leading-relaxed">
{`{
  "title": "Contract Agreement",
  "language": "en",
  "blocks": [
    {
      "type": "heading",
      "text": "Payment Terms",
      "level": 2,
      "bbox": [118,332,486,360]
    },
    {
      "type": "paragraph",
      "text": "Payment is due within 30 days."
    },
    {
      "type": "table",
      "headers": ["Item","Qty","Price"],
      "rows": [["A4 Paper","10","$12"]],
      "bbox": [90,420,520,560]
    }
  ],
  "meta": {
    "pages": 3,
    "confidence": 0.98
  }
}`}
                  </pre>
                )}

                {tab === "md" && (
                  <pre className="text-xs font-mono text-foreground overflow-auto leading-relaxed">
{`## Payment Terms

Payment is due within **30 days**.

| Item     | Qty | Price |
|----------|-----|-------|
| A4 Paper | 10  | $12   |`}
                  </pre>
                )}

                {tab === "table" && (
                  <div className="text-sm">
                    <div className="text-xs text-muted-foreground mb-2">Extracted table</div>
                    <div className="grid grid-cols-3 text-xs">
                      <div className="p-2 border border-border font-medium">Item</div>
                      <div className="p-2 border border-border font-medium">Qty</div>
                      <div className="p-2 border border-border font-medium">Price</div>
                      <div className="p-2 border border-border">A4 Paper</div>
                      <div className="p-2 border border-border">10</div>
                      <div className="p-2 border border-border">$12</div>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      bbox: [90,420,520,560] · confidence: 0.98
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mini badges */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
              <span className="px-2 py-1 rounded border border-border">PDF · PNG · JPG · HTML</span>
              <span className="px-2 py-1 rounded border border-border">Markdown · JSON · Text</span>
              <span className="px-2 py-1 rounded border border-border">Async jobs · Webhooks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}