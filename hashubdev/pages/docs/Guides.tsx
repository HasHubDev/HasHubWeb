import { useState } from "react";
import { BookOpen, Clock, ArrowRight, Search } from "lucide-react";

export function Guides() {
  const [selectedGuide, setSelectedGuide] = useState('getting-started');

  const guides = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using Hashub APIs',
      readTime: '5 min read',
      category: 'Basics'
    },
    {
      id: 'doc-processing',
      title: 'Document Processing',
      description: 'Complete guide to processing documents with hashub-doc',
      readTime: '10 min read',
      category: 'hashub-doc'
    },
    {
      id: 'text-embeddings',
      title: 'Text Embeddings',
      description: 'How to generate and use text embeddings',
      readTime: '8 min read',
      category: 'hashub-vector'
    },
    {
      id: 'authentication',
      title: 'Authentication',
      description: 'Secure your API requests with proper authentication',
      readTime: '3 min read',
      category: 'Basics'
    },
    {
      id: 'error-handling',
      title: 'Error Handling',
      description: 'Best practices for handling API errors',
      readTime: '6 min read',
      category: 'Best Practices'
    },
    {
      id: 'rate-limits',
      title: 'Rate Limits & Optimization',
      description: 'Understanding rate limits and optimizing performance',
      readTime: '7 min read',
      category: 'Best Practices'
    }
  ];

  const getGuideContent = (guideId: string) => {
    switch (guideId) {
      case 'getting-started':
        return {
          title: 'Getting Started with Hashub APIs',
          content: `
# Getting Started with Hashub APIs

Welcome to Hashub! This guide will help you make your first API call and understand the basics of our platform.

## Overview

Hashub provides two powerful APIs:
- **hashub-doc**: Intelligent document processing
- **hashub-vector**: Text embedding generation

## Quick Start

### 1. Get Your API Key

First, you'll need an API key. You can find it in your [API Keys](/docs/api-keys) section.

### 2. Make Your First Call

Here's a simple example using the hashub-vector API:

\`\`\`bash
curl -X POST "https://api.hashub.dev/v1/vector/embed" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello, world!",
    "model": "text-embedding-ada-002"
  }'
\`\`\`

### 3. Understand the Response

The API will return a JSON response with your text embedding:

\`\`\`json
{
  "success": true,
  "data": {
    "embedding": [0.0123, -0.0456, ...],
    "model": "text-embedding-ada-002",
    "tokens": 3,
    "dimensions": 1536
  }
}
\`\`\`

## Next Steps

- [Learn about document processing](/docs/guides/doc-processing)
- [Explore text embeddings](/docs/guides/text-embeddings)
- [Test APIs in the Playground](/docs/playground)

## Need Help?

If you have questions, check out our [API Reference](/docs/api-reference) or contact support.
          `
        };
      case 'doc-processing':
        return {
          title: 'Document Processing with hashub-doc',
          content: `
# Document Processing with hashub-doc

The hashub-doc API allows you to extract structured content from various document formats including PDFs, images, and more.

## Supported Formats

- PDF files
- Image formats (PNG, JPEG, TIFF)
- Office documents (Word, PowerPoint)
- Scanned documents with OCR

## Basic Usage

### Processing a PDF

\`\`\`python
import hashub

client = hashub.Client(api_key="your-api-key")

result = client.doc.process(
    file="invoice.pdf",
    output_format="markdown"
)

print(result.markdown)
\`\`\`

### Output Formats

You can specify different output formats:

- \`markdown\`: Clean, structured markdown
- \`json\`: Structured JSON with bounding boxes
- \`both\`: Both markdown and JSON

### Advanced Features

#### Language Detection

The API automatically detects document language, but you can specify it:

\`\`\`python
result = client.doc.process(
    file="document.pdf",
    language="en"  # Force English
)
\`\`\`

#### Table Extraction

Tables are automatically detected and extracted:

\`\`\`json
{
  "tables": [
    {
      "data": [["Header 1", "Header 2"], ["Row 1", "Row 2"]],
      "bounding_box": [150, 200, 450, 280]
    }
  ]
}
\`\`\`

## Best Practices

1. **File Size**: Keep files under 50MB for optimal performance
2. **Quality**: Higher resolution images produce better results
3. **Format**: PDF files generally work best for text documents
          `
        };
      default:
        return {
          title: 'Guide Not Found',
          content: 'This guide is not available yet.'
        };
    }
  };

  const currentGuide = getGuideContent(selectedGuide);
  const categories = [...new Set(guides.map(g => g.category))];
  const tableOfContents = currentGuide.content
    .split('\n')
    .filter(line => line.startsWith('#'))
    .map(line => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s*/, '');
      return { level, text, id: text.toLowerCase().replace(/\s+/g, '-') };
    });

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Guide Navigation */}
      <div className="w-80 border-r border-border p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Guides</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Learn how to build powerful applications with Hashub
          </p>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search guides..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {guides.filter(g => g.category === category).map((guide) => (
                  <button
                    key={guide.id}
                    onClick={() => setSelectedGuide(guide.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors group ${
                      selectedGuide === guide.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium">{guide.title}</h4>
                      <ArrowRight className={`w-4 h-4 mt-0.5 transition-transform ${
                        selectedGuide === guide.id ? 'translate-x-1' : 'group-hover:translate-x-1'
                      }`} />
                    </div>
                    <p className="text-sm opacity-80 mb-2">{guide.description}</p>
                    <div className="flex items-center gap-2 text-xs opacity-70">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 p-8 max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold text-foreground m-0">{currentGuide.title}</h1>
              </div>
            </div>
            
            <div 
              className="text-foreground"
              dangerouslySetInnerHTML={{ 
                __html: currentGuide.content
                  .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-foreground mb-6 mt-8">$1</h1>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-foreground mb-4 mt-6">$1</h2>')
                  .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium text-foreground mb-3 mt-4">$1</h3>')
                  .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto mb-4"><code>$2</code></pre>')
                  .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>')
                  .replace(/^\* (.*$)/gim, '<li class="mb-1">$1</li>')
                  .replace(/^(\d+)\. (.*$)/gim, '<li class="mb-1">$2</li>')
                  .replace(/\n\n/g, '</p><p class="mb-4">')
                  .replace(/^(?!<[h|l|p|c])(.*$)/gim, '<p class="mb-4">$1</p>')
              }}
            />
          </article>
        </div>

        {/* Right Sidebar - Table of Contents */}
        <div className="w-64 border-l border-border p-6">
          <div className="sticky top-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">On this page</h3>
            <nav className="space-y-2">
              {tableOfContents.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  className={`block text-sm transition-colors hover:text-primary ${
                    item.level === 1 ? 'font-medium' : 'ml-4 text-muted-foreground'
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
