"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FileText, Network, Check, Copy, ChevronRight } from "lucide-react";

export function ApiShowcase() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'doc' | 'vector'>('doc');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const docCodeExamples = {
    curl: `curl -X POST "https://api.hashub.dev/v1/doc/process" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf" \\
  -F "output_format=markdown"`,
    python: `import hashub

client = hashub.Client(api_key="YOUR_API_KEY")

result = client.doc.process(
    file="document.pdf",
    output_format="markdown"
)

print(result.markdown)`,
    javascript: `import { HashubClient } from '@hashub/sdk';

const client = new HashubClient('YOUR_API_KEY');

const result = await client.doc.process({
  file: 'document.pdf',
  outputFormat: 'markdown'
});

console.log(result.markdown);`
  };

  const vectorCodeExamples = {
    curl: `curl -X POST "https://api.hashub.dev/v1/vector/embed" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Modern AI applications need semantic search",
    "model": "text-embedding-ada-002"
  }'`,
    python: `import hashub

client = hashub.Client(api_key="YOUR_API_KEY")

embedding = client.vector.embed(
    text="Modern AI applications need semantic search",
    model="text-embedding-ada-002"
)

print(embedding.vector)`,
    javascript: `import { HashubClient } from '@hashub/sdk';

const client = new HashubClient('YOUR_API_KEY');

const embedding = await client.vector.embed({
  text: 'Modern AI applications need semantic search',
  model: 'text-embedding-ada-002'
});

console.log(embedding.vector);`
  };

  const docResponse = `{
  "success": true,
  "data": {
    "markdown": "# Quarterly Report Q4 2024\\n\\n## Executive Summary\\n\\nRevenue increased by 23% compared to Q3...",
    "json": {
      "title": "Quarterly Report Q4 2024",
      "sections": [
        {
          "heading": "Executive Summary",
          "content": "Revenue increased by 23%...",
          "bounding_box": [120, 80, 400, 150]
        }
      ],
      "tables": [
        {
          "data": [["Metric", "Q3", "Q4"], ["Revenue", "$2.1M", "$2.6M"]],
          "bounding_box": [150, 200, 450, 280]
        }
      ]
    },
    "metadata": {
      "pages": 3,
      "language": "en",
      "confidence": 0.98
    }
  }
}`;

  const vectorResponse = `{
  "success": true,
  "data": {
    "embedding": [
      0.0123, -0.0456, 0.0789, -0.0234, 0.0567,
      -0.0890, 0.0345, -0.0678, 0.0912, -0.0123,
      ... // 1536 dimensions total
    ],
    "model": "text-embedding-ada-002",
    "tokens": 7,
    "dimensions": 1536
  }
}`;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Two Powerful APIs, Infinite Possibilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to build intelligent document processing and semantic search into your applications.
          </p>
        </div>

        {/* API Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-background border border-border rounded-lg p-1 inline-flex">
            <button
              onClick={() => setActiveTab('doc')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'doc'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileText className="w-5 h-5 inline-block mr-2" />
              hashub-doc
            </button>
            <button
              onClick={() => setActiveTab('vector')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'vector'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Network className="w-5 h-5 inline-block mr-2" />
              hashub-vector
            </button>
          </div>
        </div>

        {/* hashub-doc API */}
        {activeTab === 'doc' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Description */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">hashub-doc</h3>
                    <p className="text-lg text-primary font-medium">Intelligent Document Processing API</p>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Turn unstructured PDFs and images into clean, structured Markdown and JSON. 
                  With support for 80+ languages and smart extraction of tables, titles, and layouts, 
                  it's the ultimate document parsing solution.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    '80+ Language Support & OCR',
                    'Smart Layout Analysis',
                    'Table & Title Extraction',
                    'JSON Output with Bounding Boxes',
                    'Batch Processing Support',
                    'Enterprise Security'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="group"
                onClick={() => navigate('/docs/playground')}
              >
                Try hashub-doc API
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right - Code Demo */}
            <div className="space-y-6">
              <CodeBlock
                title="Request"
                languages={['curl', 'python', 'javascript']}
                codeExamples={docCodeExamples}
                onCopy={copyToClipboard}
                copiedCode={copiedCode}
                id="doc-request"
              />
              
              <CodeBlock
                title="Response"
                content={docResponse}
                onCopy={copyToClipboard}
                copiedCode={copiedCode}
                id="doc-response"
                language="json"
                maxHeight="300px"
              />
            </div>
          </div>
        )}

        {/* hashub-vector API */}
        {activeTab === 'vector' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Description */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Network className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">hashub-vector</h3>
                    <p className="text-lg text-primary font-medium">Multi-Model Text Embedding API</p>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Generate state-of-the-art text embeddings using a variety of powerful models. 
                  Perfect for semantic search, clustering, and RAG applications without the hassle 
                  of managing infrastructure.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    '6+ State-of-the-Art Models',
                    'Fast, Low-Latency Responses',
                    'Consistent Vector Dimensions',
                    'Pay-as-you-go Pricing',
                    'Official Python SDK',
                    'Batch Processing'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="group"
                onClick={() => navigate('/docs/playground')}
              >
                Try hashub-vector API
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right - Code Demo */}
            <div className="space-y-6">
              <CodeBlock
                title="Request"
                languages={['curl', 'python', 'javascript']}
                codeExamples={vectorCodeExamples}
                onCopy={copyToClipboard}
                copiedCode={copiedCode}
                id="vector-request"
              />
              
              <CodeBlock
                title="Response"
                content={vectorResponse}
                onCopy={copyToClipboard}
                copiedCode={copiedCode}
                id="vector-response"
                language="json"
                maxHeight="300px"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface CodeBlockProps {
  title: string;
  languages?: string[];
  codeExamples?: Record<string, string>;
  content?: string;
  onCopy: (text: string, id: string) => void;
  copiedCode: string | null;
  id: string;
  language?: string;
  maxHeight?: string;
}

function CodeBlock({ 
  title, 
  languages, 
  codeExamples, 
  content, 
  onCopy, 
  copiedCode, 
  id, 
  language = 'json',
  maxHeight 
}: CodeBlockProps) {
  const [activeLanguage, setActiveLanguage] = useState(languages?.[0] || language);

  const getContent = () => {
    if (content) return content;
    if (codeExamples && activeLanguage) return codeExamples[activeLanguage];
    return '';
  };

  const currentContent = getContent();

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{title}</span>
        {languages && (
          <div className="flex items-center gap-1">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeLanguage === lang 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Code Content */}
      <div className="relative">
        <div 
          className="p-4 bg-background/50 font-mono text-sm overflow-auto"
          style={{ maxHeight }}
        >
          <pre className="text-foreground whitespace-pre-wrap leading-relaxed">
            {currentContent}
          </pre>
        </div>
        <button
          onClick={() => onCopy(currentContent, id)}
          className="absolute top-3 right-3 p-2 bg-muted hover:bg-muted/80 rounded border border-border transition-colors"
        >
          {copiedCode === id ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
