import { useState } from "react";
import { Search, Copy, Check, ExternalLink, Book, Code2 } from "lucide-react";

export function ApiReference() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('doc-ocr');
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('curl');

  const endpoints = [
    {
      id: 'doc-ocr',
      group: 'Document API',
      name: 'OCR Processing',
      method: 'POST',
      path: '/api/v1/ocr',
      description: 'Extract text from images and documents with layout awareness'
    },
    {
      id: 'doc-chat',
      group: 'Document API',
      name: 'Chat Completions',
      method: 'POST',
      path: '/api/v1/chat/completions',
      description: 'OpenAI-compatible interface for document processing'
    },
    {
      id: 'doc-status',
      group: 'Document API',
      name: 'Request Status',
      method: 'GET',
      path: '/api/v1/requests/{id}',
      description: 'Check the status of an OCR processing request'
    },
    {
      id: 'vector-embed',
      group: 'Vector API',
      name: 'Text Vectorization',
      method: 'POST', 
      path: '/vectorize',
      description: 'Convert text to high-quality embeddings with chunking support'
    },
    {
      id: 'vector-batch',
      group: 'Vector API',
      name: 'Batch Vectorization',
      method: 'POST',
      path: '/vectorize/batch',
      description: 'Process multiple texts efficiently in a single request'
    },
    {
      id: 'vector-chunked',
      group: 'Vector API',
      name: 'Chunked Vectorization',
      method: 'POST',
      path: '/vectorize/chunked',
      description: 'Get individual vectors for each text chunk'
    },
    {
      id: 'vector-models',
      group: 'Vector API',
      name: 'List Models',
      method: 'GET',
      path: '/models',
      description: 'Get available embedding models and specifications'
    }
  ];

  const getEndpointDetails = (endpointId: string) => {
    switch (endpointId) {
      case 'doc-ocr':
        return {
          baseUrl: 'https://doc.hashhub.dev',
          parameters: [
            { name: 'image', type: 'string', required: true, description: 'Base64 encoded image data (data URL format)' },
            { name: 'prompt_mode', type: 'string', required: false, description: 'Processing mode: "prompt_layout_all_en", "prompt_layout_all_tr", "prompt_text_only_en", "prompt_text_only_tr"' },
            { name: 'timeout', type: 'integer', required: false, description: 'Request timeout in seconds (default: 300)' },
            { name: 'enhance_options', type: 'object', required: false, description: 'Image enhancement settings with preset and overrides' }
          ],
          response: {
            request_id: "req_123456789",
            status: "completed",
            result: {
              text: "Extracted text content from the document...",
              confidence: 0.95,
              layout: {
                blocks: [
                  {
                    bbox: [120, 80, 400, 150],
                    text: "Block text content",
                    confidence: 0.98
                  }
                ],
                lines: ["Line 1", "Line 2"],
                words: ["Word1", "Word2", "Word3"]
              }
            },
            processing_time_seconds: 2.5
          }
        };
      case 'doc-chat':
        return {
          baseUrl: 'https://doc.hashhub.dev',
          parameters: [
            { name: 'messages', type: 'array', required: true, description: 'Array of message objects with role and content' },
            { name: 'model', type: 'string', required: false, description: 'Model name for processing (default: "gpt-4-vision")' },
            { name: 'max_tokens', type: 'integer', required: false, description: 'Maximum tokens in response' },
            { name: 'temperature', type: 'number', required: false, description: 'Temperature for response generation (0.0-2.0)' }
          ],
          response: {
            id: "chatcmpl-123456789",
            object: "chat.completion",
            created: 1640995200,
            model: "gpt-4-vision",
            choices: [
              {
                index: 0,
                message: {
                  role: "assistant",
                  content: "I can see this document contains...",
                },
                finish_reason: "stop"
              }
            ],
            usage: {
              prompt_tokens: 150,
              completion_tokens: 75,
              total_tokens: 225
            }
          }
        };
      case 'vector-embed':
        return {
          baseUrl: 'https://vector.hashhub.dev',
          parameters: [
            { name: 'text', type: 'string', required: true, description: 'Text to vectorize (max 1M characters)' },
            { name: 'model', type: 'string', required: false, description: 'Model alias: "gte_base", "e5_base", "nomic_base", "mpnet_base", "e5_small", "minilm_base"' },
            { name: 'chunk_size', type: 'integer', required: false, description: 'Maximum tokens per chunk (default: 512)' },
            { name: 'chunk_overlap', type: 'number', required: false, description: 'Overlap ratio between chunks 0.0-0.8 (default: 0.1)' }
          ],
          response: {
            vector: [0.1234, -0.5678, 0.9012, "... (768 dimensions)"],
            dimension: 768,
            chunks_processed: 3,
            chunking_method: "sentence_aware",
            usage: {
              prompt_tokens: 127,
              total_tokens: 127
            }
          }
        };
      case 'vector-batch':
        return {
          baseUrl: 'https://vector.hashhub.dev',
          parameters: [
            { name: 'texts', type: 'array', required: true, description: 'Array of texts to vectorize (batch size limits apply)' },
            { name: 'model', type: 'string', required: false, description: 'Model alias for processing' },
            { name: 'chunk_size', type: 'integer', required: false, description: 'Maximum tokens per chunk' },
            { name: 'chunk_overlap', type: 'number', required: false, description: 'Overlap ratio between chunks' }
          ],
          response: {
            vectors: [
              [0.1234, -0.5678, "..."],
              [0.2345, -0.6789, "..."],
              [0.3456, -0.7890, "..."]
            ],
            dimension: 768,
            total_chunks_processed: 8,
            chunking_method: "sentence_aware",
            usage: {
              prompt_tokens: 384,
              total_tokens: 384
            }
          }
        };
      default:
        return { baseUrl: 'https://api.hashhub.dev', parameters: [], response: {} };
    }
  };

  const generateCodeExample = () => {
    const endpoint = endpoints.find(e => e.id === selectedEndpoint);
    const details = getEndpointDetails(selectedEndpoint);
    if (!endpoint) return '';

    if (selectedEndpoint === 'doc-ocr') {
      const codes = {
        curl: `curl -X POST "${details.baseUrl}${endpoint.path}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "prompt_mode": "prompt_layout_all_en",
    "timeout": 300,
    "enhance_options": {
      "preset": "scan_medium",
      "overrides": {
        "contrast": 1.3,
        "sharpness": 1.2
      }
    }
  }'`,
        python: `import requests
import base64

# Encode image
with open("document.png", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()
    image_url = f"data:image/png;base64,{image_data}"

# Submit OCR request
response = requests.post(
    "${details.baseUrl}${endpoint.path}",
    json={
        "image": image_url,
        "prompt_mode": "prompt_layout_all_en",
        "enhance_options": {
            "preset": "scan_medium"
        }
    }
)

result = response.json()
print(f"Request ID: {result['request_id']}")`,
        javascript: `import fetch from 'node-fetch';
import fs from 'fs';

// Read and encode image
const imageBuffer = fs.readFileSync('document.png');
const imageBase64 = imageBuffer.toString('base64');
const imageUrl = \`data:image/png;base64,\${imageBase64}\`;

// Submit OCR request
const response = await fetch('${details.baseUrl}${endpoint.path}', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    image: imageUrl,
    prompt_mode: 'prompt_layout_all_en'
  })
});

const result = await response.json();
console.log('Request ID:', result.request_id);`
      };
      return codes[activeTab as keyof typeof codes];
    } else if (selectedEndpoint === 'vector-embed') {
      const codes = {
        curl: `curl -X POST "${details.baseUrl}${endpoint.path}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Artificial intelligence is transforming how we work and live.",
    "model": "gte_base",
    "chunk_size": 512
  }'`,
        python: `import httpx
import asyncio

async def vectorize_text():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "${details.baseUrl}${endpoint.path}",
            headers={"Authorization": "Bearer YOUR_API_KEY"},
            json={
                "text": "Artificial intelligence is transforming how we work and live.",
                "model": "gte_base",
                "chunk_size": 512
            }
        )
        
        result = response.json()
        print(f"Vector dimension: {result['dimension']}")
        print(f"Tokens used: {result['usage']['total_tokens']}")
        return result['vector']

vector = await vectorize_text()`,
        javascript: `const response = await fetch('${details.baseUrl}${endpoint.path}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Artificial intelligence is transforming how we work and live.',
    model: 'gte_base',
    chunk_size: 512
  })
});

const result = await response.json();
console.log(\`Vector dimension: \${result.dimension}\`);
console.log(\`Tokens used: \${result.usage.total_tokens}\`);`
      };
      return codes[activeTab as keyof typeof codes];
    } else {
      const codes = {
        curl: `curl -X ${endpoint.method} "${details.baseUrl}${endpoint.path}" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
        python: `import httpx
        
async with httpx.AsyncClient() as client:
    response = await client.${endpoint.method.toLowerCase()}(
        "${details.baseUrl}${endpoint.path}",
        headers={"Authorization": "Bearer YOUR_API_KEY"}
    )`,
        javascript: `const response = await fetch('${details.baseUrl}${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`
      };
      return codes[activeTab as keyof typeof codes];
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCodeExample());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const currentEndpoint = endpoints.find(e => e.id === selectedEndpoint);
  const details = getEndpointDetails(selectedEndpoint);

  return (
    <div className="h-full flex">
      {/* Left Navigation */}
      <div className="w-80 border-r border-border p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">API Reference</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Complete documentation for HashHub's Document and Vector APIs
          </p>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search endpoints..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
        </div>

        <div className="space-y-6">
          {['Document API', 'Vector API'].map((group) => (
            <div key={group}>
              <div className="flex items-center gap-2 mb-3">
                {group === 'Document API' ? (
                  <Book className="w-4 h-4 text-blue-500" />
                ) : (
                  <Code2 className="w-4 h-4 text-green-500" />
                )}
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  {group}
                </h3>
              </div>
              <div className="space-y-1">
                {endpoints.filter(e => e.group === group).map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setSelectedEndpoint(endpoint.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedEndpoint === endpoint.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                        endpoint.method === 'POST' ? 'bg-green-500 text-white' : 
                        endpoint.method === 'GET' ? 'bg-blue-500 text-white' :
                        'bg-purple-500 text-white'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="text-sm font-medium">{endpoint.name}</span>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {endpoint.path}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="space-y-3">
            <a
              href="/docs/guides"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Book className="w-4 h-4" />
              Integration Guides
            </a>
            <a
              href="https://github.com/HasHubDev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              GitHub Repository
            </a>
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className="flex-1 p-8 overflow-auto">
        {currentEndpoint && (
          <div className="max-w-4xl">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-sm font-mono px-3 py-1 rounded ${
                  currentEndpoint.method === 'POST' ? 'bg-green-500 text-white' : 
                  currentEndpoint.method === 'GET' ? 'bg-blue-500 text-white' :
                  'bg-purple-500 text-white'
                }`}>
                  {currentEndpoint.method}
                </span>
                <h1 className="text-3xl font-bold text-foreground">{currentEndpoint.name}</h1>
              </div>
              <div className="text-xl font-mono text-muted-foreground mb-4 p-3 bg-muted rounded-lg">
                {details.baseUrl}{currentEndpoint.path}
              </div>
              <p className="text-lg text-muted-foreground">
                {currentEndpoint.description}
              </p>
            </div>

            {/* Authentication */}
            {details.baseUrl.includes('vector') && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Authentication</h2>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-muted-foreground mb-3">
                    All Vector API requests require an API key in the Authorization header:
                  </p>
                  <code className="block bg-muted p-3 rounded text-sm font-mono">
                    Authorization: Bearer your_api_key_here
                  </code>
                </div>
              </div>
            )}

            {/* Parameters */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Parameters</h2>
              <div className="space-y-4">
                {details.parameters.map((param, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-primary font-mono font-medium">{param.name}</code>
                      <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded">
                        {param.type}
                      </span>
                      {param.required && (
                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">Required</span>
                      )}
                    </div>
                    <p className="text-muted-foreground">{param.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Response */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Response</h2>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b border-border">
                  <span className="text-sm font-medium text-foreground">Example Response</span>
                </div>
                <div className="p-4">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap overflow-auto">
                    {JSON.stringify(details.response, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Rate Limits */}
            {details.baseUrl.includes('vector') && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Rate Limits</h2>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-foreground">Free</div>
                      <div className="text-xs text-muted-foreground">100/hour</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-foreground">Starter</div>
                      <div className="text-xs text-muted-foreground">1,000/hour</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-foreground">Pro</div>
                      <div className="text-xs text-muted-foreground">10,000/hour</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-foreground">Enterprise</div>
                      <div className="text-xs text-muted-foreground">Unlimited</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Code Examples */}
      <div className="w-96 border-l border-border p-6">
        <div className="sticky top-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Code Examples</h3>
          
          {/* Language Tabs */}
          <div className="flex gap-1 mb-4 bg-muted rounded-lg p-1">
            {['curl', 'python', 'javascript'].map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === lang
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang === 'javascript' ? 'Node.js' : lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="bg-muted rounded-lg">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <span className="text-sm font-medium text-foreground">Example Request</span>
              <button
                onClick={copyCode}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="p-4">
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap overflow-auto">
                {generateCodeExample()}
              </pre>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 space-y-3">
            <div className="text-sm font-medium text-foreground mb-2">Quick Links</div>
            {selectedEndpoint.includes('doc') ? (
              <>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  • OCR Processing Guide
                </a>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  • Image Enhancement Options
                </a>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  • Supported Languages
                </a>
              </>
            ) : (
              <>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  • Model Comparison
                </a>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  • LangChain Integration
                </a>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  • Pricing Calculator
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
