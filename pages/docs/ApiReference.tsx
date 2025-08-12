import { useState } from "react";
import { Search, Copy, Check } from "lucide-react";

export function ApiReference() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('doc-process');
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('curl');

  const endpoints = [
    {
      id: 'doc-process',
      group: 'Document Processing',
      name: 'Process Document',
      method: 'POST',
      path: '/v1/doc/process',
      description: 'Process a document and extract structured content'
    },
    {
      id: 'vector-embed',
      group: 'Text Embeddings',
      name: 'Create Embedding',
      method: 'POST', 
      path: '/v1/vector/embed',
      description: 'Generate text embeddings using various models'
    },
    {
      id: 'vector-models',
      group: 'Text Embeddings',
      name: 'List Models',
      method: 'GET',
      path: '/v1/vector/models',
      description: 'Get available embedding models'
    }
  ];

  const getEndpointDetails = (endpointId: string) => {
    switch (endpointId) {
      case 'doc-process':
        return {
          parameters: [
            { name: 'file', type: 'file', required: true, description: 'The document file to process (PDF, image, etc.)' },
            { name: 'output_format', type: 'string', required: false, description: 'Output format: "markdown", "json", or "both"' },
            { name: 'language', type: 'string', required: false, description: 'Expected document language (auto-detected if not specified)' }
          ],
          response: {
            success: true,
            data: {
              markdown: "# Document Title\n\nExtracted content...",
              json: {
                title: "Document Title",
                sections: [
                  {
                    heading: "Section 1",
                    content: "Section content...",
                    bounding_box: [120, 80, 400, 150]
                  }
                ],
                tables: []
              },
              metadata: {
                pages: 1,
                language: "en",
                confidence: 0.98
              }
            }
          }
        };
      case 'vector-embed':
        return {
          parameters: [
            { name: 'text', type: 'string', required: true, description: 'The text to embed' },
            { name: 'model', type: 'string', required: true, description: 'The embedding model to use' },
            { name: 'encoding_format', type: 'string', required: false, description: 'The format to return embeddings in' }
          ],
          response: {
            success: true,
            data: {
              embedding: [0.0123, -0.0456, 0.0789, "..."],
              model: "text-embedding-ada-002",
              tokens: 7,
              dimensions: 1536
            }
          }
        };
      default:
        return { parameters: [], response: {} };
    }
  };

  const generateCodeExample = () => {
    const endpoint = endpoints.find(e => e.id === selectedEndpoint);
    if (!endpoint) return '';

    if (selectedEndpoint === 'doc-process') {
      const codes = {
        curl: `curl -X POST "https://api.hashub.dev/v1/doc/process" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf" \\
  -F "output_format=markdown"`,
        python: `import hashub

client = hashub.Client(api_key="YOUR_API_KEY")

result = client.doc.process(
    file="document.pdf",
    output_format="markdown"
)`,
        javascript: `import { HashubClient } from '@hashub/sdk';

const client = new HashubClient('YOUR_API_KEY');

const result = await client.doc.process({
  file: 'document.pdf',
  outputFormat: 'markdown'
});`
      };
      return codes[activeTab as keyof typeof codes];
    } else {
      const codes = {
        curl: `curl -X POST "https://api.hashub.dev/v1/vector/embed" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Your text here",
    "model": "text-embedding-ada-002"
  }'`,
        python: `import hashub

client = hashub.Client(api_key="YOUR_API_KEY")

embedding = client.vector.embed(
    text="Your text here",
    model="text-embedding-ada-002"
)`,
        javascript: `import { HashubClient } from '@hashub/sdk';

const client = new HashubClient('YOUR_API_KEY');

const embedding = await client.vector.embed({
  text: 'Your text here',
  model: 'text-embedding-ada-002'
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
          {['Document Processing', 'Text Embeddings'].map((group) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {group}
              </h3>
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
                        endpoint.method === 'POST' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
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
      </div>

      {/* Center Content */}
      <div className="flex-1 p-8">
        {currentEndpoint && (
          <div className="max-w-4xl">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-sm font-mono px-3 py-1 rounded ${
                  currentEndpoint.method === 'POST' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {currentEndpoint.method}
                </span>
                <h1 className="text-3xl font-bold text-foreground">{currentEndpoint.name}</h1>
              </div>
              <div className="text-xl font-mono text-muted-foreground mb-4">
                https://api.hashub.dev{currentEndpoint.path}
              </div>
              <p className="text-lg text-muted-foreground">
                {currentEndpoint.description}
              </p>
            </div>

            {/* Parameters */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Parameters</h2>
              <div className="space-y-4">
                {details.parameters.map((param, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-primary font-mono font-medium">{param.name}</code>
                      <span className="text-sm text-muted-foreground">{param.type}</span>
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
              <div className="bg-card border border-border rounded-lg p-4">
                <pre className="text-sm font-mono text-foreground whitespace-pre-wrap overflow-auto">
                  {JSON.stringify(details.response, null, 2)}
                </pre>
              </div>
            </div>
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
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                {generateCodeExample()}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
