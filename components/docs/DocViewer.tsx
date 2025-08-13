import { useState, useEffect } from 'react';
import { 
  FileText, 
  Code, 
  Copy, 
  CheckCircle, 
  ExternalLink,
  BookOpen,
  Terminal,
  Zap,
  Play
} from 'lucide-react';

interface DocViewerProps {
  docPath: string;
  title: string;
}

interface CodeExample {
  language: string;
  title: string;
  code: string;
  description?: string;
}

const codeExamples: Record<string, CodeExample[]> = {
  '/docs/quickstart': [
    {
      language: 'bash',
      title: 'Fast OCR - cURL',
      description: 'Extract text from documents using our Fast OCR endpoint',
      code: `curl -X POST "https://api.hashub.ai/v1/doc/ocr/fast" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@/path/to/your/document.pdf" \\
  -F "lang=en"`
    },
    {
      language: 'python',
      title: 'Fast OCR - Python',
      description: 'Python implementation using requests library',
      code: `import requests

api_key = "YOUR_API_KEY"
url = "https://api.hashub.ai/v1/doc/ocr/fast"

headers = {
    "Authorization": f"Bearer {api_key}"
}

files = {
    "file": open("/path/to/your/document.pdf", "rb"),
    "lang": (None, "en")
}

response = requests.post(url, headers=headers, files=files)
result = response.json()

if result.get("success"):
    print(f"Extracted text: {result['data']['text']}")
else:
    print(f"Error: {result.get('error', {}).get('message')}")`
    },
    {
      language: 'javascript',
      title: 'Fast OCR - JavaScript',
      description: 'JavaScript implementation using fetch API',
      code: `const apiKey = "YOUR_API_KEY";
const url = "https://api.hashub.ai/v1/doc/ocr/fast";

const formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("lang", "en");

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${apiKey}\`
  },
  body: formData
});

const result = await response.json();

if (result.success) {
  console.log("Extracted text:", result.data.text);
} else {
  console.error("Error:", result.error?.message);
}`
    }
  ],
  '/docs/auth': [
    {
      language: 'bash',
      title: 'Authentication - cURL',
      description: 'How to authenticate your API requests',
      code: `# Using Authorization header
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.hashub.ai/v1/doc/ocr/fast

# Verify your API key
curl -X GET "https://api.hashub.ai/v1/auth/verify" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    },
    {
      language: 'python',
      title: 'Authentication - Python',
      description: 'Setting up authentication in Python',
      code: `import os
import requests

# Store API key in environment variable
api_key = os.getenv("HASHUB_API_KEY")

# Create session with default headers
session = requests.Session()
session.headers.update({
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
})

# Verify API key
response = session.get("https://api.hashub.ai/v1/auth/verify")
if response.status_code == 200:
    print("API key is valid")
else:
    print("Invalid API key")`
    },
    {
      language: 'javascript',
      title: 'Authentication - JavaScript',
      description: 'Setting up authentication in JavaScript/Node.js',
      code: `// Environment variable setup
const API_KEY = process.env.HASHUB_API_KEY;

// Create reusable headers
const defaultHeaders = {
  "Authorization": \`Bearer \${API_KEY}\`,
  "Content-Type": "application/json"
};

// Verify API key function
async function verifyApiKey() {
  try {
    const response = await fetch("https://api.hashub.ai/v1/auth/verify", {
      headers: defaultHeaders
    });
    
    if (response.ok) {
      console.log("API key is valid");
      return true;
    } else {
      console.error("Invalid API key");
      return false;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
}`
    }
  ],
  '/docs/overview': [
    {
      language: 'bash',
      title: 'API Overview - cURL',
      description: 'Basic API structure and endpoints',
      code: `# Document API Base URL
https://api.hashub.ai/v1/doc/

# Vector API Base URL  
https://api.hashub.ai/v1/vector/

# Health check
curl https://api.hashub.ai/health

# Get API status
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.hashub.ai/v1/status`
    },
    {
      language: 'python',
      title: 'HashHub Python SDK',
      description: 'Getting started with the official Python SDK',
      code: `# Install the SDK
# pip install hashub-python

from hashub import HashubClient

# Initialize client
client = HashubClient(api_key="YOUR_API_KEY")

# Document OCR
result = client.doc.ocr.fast(
    file_path="/path/to/document.pdf",
    language="en"
)

# Vector embeddings
embeddings = client.vector.embed(
    model="hashub-multilingual-v1",
    input=["Hello world", "Machine learning"]
)

print(f"OCR Result: {result.text}")
print(f"Embeddings: {embeddings.data}")`
    },
    {
      language: 'javascript',
      title: 'HashHub JavaScript SDK',
      description: 'Getting started with the official JavaScript SDK',
      code: `// Install the SDK
// npm install @hashub/javascript-sdk

import { HashubClient } from '@hashub/javascript-sdk';

// Initialize client
const client = new HashubClient({
  apiKey: 'YOUR_API_KEY'
});

// Document OCR
const ocrResult = await client.doc.ocr.fast({
  file: fileBuffer,
  language: 'en'
});

// Vector embeddings
const embeddings = await client.vector.embed({
  model: 'hashub-multilingual-v1',
  input: ['Hello world', 'Machine learning']
});

console.log('OCR Result:', ocrResult.text);
console.log('Embeddings:', embeddings.data);`
    }
  ]
};

export function DocViewer({ docPath, title }: DocViewerProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeExample, setActiveExample] = useState(0);
  const [copiedStates, setCopiedStates] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Construct the full path to the markdown file
        let fullPath = docPath;
        
        // Add .md extension if not present
        if (!fullPath.endsWith('.md')) {
          fullPath = `${fullPath}.md`;
        }
        
        // Handle base path for Vite dev server
        const basePath = import.meta.env.BASE_URL || '/';
        const finalPath = basePath === '/' ? fullPath : `${basePath}${fullPath.startsWith('/') ? fullPath.substring(1) : fullPath}`;
        
        console.log('Loading doc from:', finalPath);
        
        const response = await fetch(finalPath);
        if (!response.ok) {
          throw new Error(`Failed to load documentation: ${response.statusText}`);
        }
        
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load documentation');
        console.error('Error loading documentation:', err);
      } finally {
        setLoading(false);
      }
    };

    if (docPath) {
      loadContent();
    }
  }, [docPath]);

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const examples = codeExamples[docPath] || [];

  if (loading) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-800">Documentation Not Found</h3>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <p className="text-sm text-red-600">
              The documentation you're looking for might have been moved or doesn't exist yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex">
      {/* Documentation Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>📖 Documentation</span>
              <span>•</span>
              <span>Last updated: Today</span>
              {examples.length > 0 && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Code className="w-4 h-4" />
                    {examples.length} code example{examples.length > 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="markdown-content"
              style={{
                lineHeight: '1.7',
                fontSize: '16px'
              }}
            >
              {content.split('\n').map((line, index) => {
                // Headers
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">{line.substring(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-semibold text-gray-800 mb-4 mt-8">{line.substring(3)}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-medium text-gray-700 mb-3 mt-6">{line.substring(4)}</h3>;
                }
                if (line.startsWith('#### ')) {
                  return <h4 key={index} className="text-lg font-medium text-gray-700 mb-2 mt-4">{line.substring(5)}</h4>;
                }
                
                // Code blocks
                if (line.startsWith('```')) {
                  return null; // Handle code blocks separately
                }
                
                // Lists
                if (line.startsWith('- ')) {
                  return <li key={index} className="mb-2 ml-4">{line.substring(2)}</li>;
                }
                if (/^\d+\. /.test(line)) {
                  return <li key={index} className="mb-2 ml-4">{line.replace(/^\d+\. /, '')}</li>;
                }
                
                // Bold and italic
                let processedLine = line
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
                  .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>');
                
                // Links
                processedLine = processedLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>');
                
                // Warning boxes
                if (line.includes('⚠️ **') || line.includes('⚠️ **Important**')) {
                  return (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="text-yellow-600">⚠️</div>
                        <div dangerouslySetInnerHTML={{ __html: processedLine.replace('⚠️ ', '') }} />
                      </div>
                    </div>
                  );
                }
                
                // Empty lines
                if (line.trim() === '') {
                  return <br key={index} />;
                }
                
                // Regular paragraphs
                return (
                  <p key={index} className="mb-4 text-gray-700" dangerouslySetInnerHTML={{ __html: processedLine }} />
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/api-reference"
                className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Code className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-900">API Reference</div>
                  <div className="text-sm text-blue-700">Complete API docs</div>
                </div>
              </a>
              <a
                href="/dashboard/playground"
                className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Play className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-900">Try in Playground</div>
                  <div className="text-sm text-green-700">Test the API</div>
                </div>
              </a>
              <a
                href="https://github.com/HasHubDev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">GitHub</div>
                  <div className="text-sm text-gray-700">View source code</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples Sidebar */}
      {examples.length > 0 && (
        <div className="w-96 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
          <div className="sticky top-0 bg-gray-50 pb-4">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Code Examples</h3>
            </div>
            
            {/* Example Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setActiveExample(index)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    activeExample === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {example.language.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Active Example */}
          {examples[activeExample] && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {examples[activeExample].title}
                </h4>
                {examples[activeExample].description && (
                  <p className="text-sm text-gray-600 mb-4">
                    {examples[activeExample].description}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {examples[activeExample].language}
                  </span>
                  <button
                    onClick={() => copyToClipboard(examples[activeExample].code, activeExample)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    {copiedStates[activeExample] ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{examples[activeExample].code}</code>
                </pre>
              </div>

              {/* Try in Playground Link */}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="/dashboard/playground"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  Try this in Playground
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
