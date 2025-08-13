"use client";

import { useState } from "react";
import { 
  Play, 
  Copy, 
  Upload, 
  FileText, 
  Network, 
  Check,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "../../components/ui/button";

export function Playground() {
  const [selectedApi, setSelectedApi] = useState<'doc' | 'vector'>('doc');
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('text-embedding-ada-002');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('curl');

  const apiKey = "sk-hashub_live_••••••••••••••••••••••••••••••••1234";

  const models = [
    { value: 'text-embedding-ada-002', label: 'text-embedding-ada-002 (OpenAI)' },
    { value: 'text-embedding-3-small', label: 'text-embedding-3-small (OpenAI)' },
    { value: 'text-embedding-3-large', label: 'text-embedding-3-large (OpenAI)' },
    { value: 'all-MiniLM-L6-v2', label: 'all-MiniLM-L6-v2 (Sentence Transformers)' },
  ];

  const generateCode = () => {
    if (selectedApi === 'doc') {
      const codes = {
        curl: `curl -X POST "https://api.hashub.dev/v1/doc/process" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -F "file=@document.pdf" \\
  -F "output_format=markdown"`,
        python: `import hashub

client = hashub.Client(api_key="${apiKey}")

result = client.doc.process(
    file="document.pdf",
    output_format="markdown"
)

print(result.markdown)`,
        javascript: `import { HashubClient } from '@hashub/sdk';

const client = new HashubClient('${apiKey}');

const result = await client.doc.process({
  file: 'document.pdf',
  outputFormat: 'markdown'
});

console.log(result.markdown);`
      };
      return codes[activeTab as keyof typeof codes];
    } else {
      const codes = {
        curl: `curl -X POST "https://api.hashub.dev/v1/vector/embed" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "${inputText || 'Your text here'}",
    "model": "${selectedModel}"
  }'`,
        python: `import hashub

client = hashub.Client(api_key="${apiKey}")

embedding = client.vector.embed(
    text="${inputText || 'Your text here'}",
    model="${selectedModel}"
)

print(embedding.vector)`,
        javascript: `import { HashubClient } from '@hashub/sdk';

const client = new HashubClient('${apiKey}');

const embedding = await client.vector.embed({
  text: '${inputText || 'Your text here'}',
  model: '${selectedModel}'
});

console.log(embedding.vector);`
      };
      return codes[activeTab as keyof typeof codes];
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const runRequest = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (selectedApi === 'doc') {
        setResponse({
          success: true,
          data: {
            markdown: "# Sample Document\\n\\nThis is a processed document with extracted content.",
            metadata: {
              pages: 1,
              language: "en",
              confidence: 0.98
            }
          }
        });
      } else {
        setResponse({
          success: true,
          data: {
            embedding: Array.from({ length: 10 }, () => (Math.random() - 0.5) * 2),
            model: selectedModel,
            tokens: inputText.split(' ').length,
            dimensions: selectedModel.includes('large') ? 3072 : 1536
          }
        });
      }
    } catch (err) {
      setError('Failed to process request. Please check your configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-8 border-b border-border">
        <h1 className="text-3xl font-bold text-foreground mb-2">Playground</h1>
        <p className="text-lg text-muted-foreground">Test your API calls in real-time</p>
      </div>

      {/* Main Content - Three Panes */}
      <div className="flex-1 flex">
        {/* Left Pane - Configuration */}
        <div className="w-80 border-r border-border p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Configuration</h3>
            
            {/* API Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Select API</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedApi('doc')}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedApi === 'doc' 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <FileText className="w-5 h-5 mb-2" />
                  <div className="text-sm font-medium">hashub-doc</div>
                </button>
                <button
                  onClick={() => setSelectedApi('vector')}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedApi === 'vector' 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <Network className="w-5 h-5 mb-2" />
                  <div className="text-sm font-medium">hashub-vector</div>
                </button>
              </div>
            </div>

            {/* API-specific inputs */}
            {selectedApi === 'doc' ? (
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">File Upload</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Drop a PDF or image file here</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose File
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Output Format</label>
                  <select className="w-full p-2 border border-border rounded-lg bg-background text-foreground">
                    <option value="markdown">Markdown</option>
                    <option value="json">JSON</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Input Text</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter the text you want to embed..."
                  className="w-full h-32 p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    {models.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Authentication */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">API Key</label>
              <div className="p-3 bg-muted rounded-lg">
                <code className="text-sm font-mono text-foreground">{apiKey}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Center Pane - Request */}
        <div className="flex-1 border-r border-border p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Request</h3>
            
            {/* Code Tabs */}
            <div className="flex gap-2 border-b border-border">
              {['curl', 'python', 'javascript'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab === 'javascript' ? 'Node.js' : tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="relative bg-muted rounded-lg">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="text-sm font-medium text-foreground">Code Example</span>
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
                  {generateCode()}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Response */}
        <div className="w-96 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Response</h3>
              <Button 
                onClick={runRequest}
                disabled={isLoading || (selectedApi === 'vector' && !inputText.trim())}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Run Request
              </Button>
            </div>

            {/* Response Content */}
            <div className="bg-muted rounded-lg min-h-[400px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Processing request...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="p-4 text-center">
                  <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              ) : response ? (
                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-2">200 OK</div>
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap overflow-auto">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-sm text-muted-foreground">Click "Run Request" to see the response</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
