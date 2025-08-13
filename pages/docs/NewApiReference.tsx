import { useState } from 'react';
import { 
  Search, 
  Code, 
  ExternalLink, 
  Copy, 
  ChevronDown, 
  ChevronRight,
  BookOpen,
  Zap,
  Loader2,
  CheckCircle,
  AlertCircle,
  Info,
  Play,
  Settings,
  Globe,
  Database,
  MessageSquare
} from 'lucide-react';
import { MarkdownRenderer } from '../../components/docs/MarkdownRenderer';
import { useMarkdown } from '../../components/docs/useMarkdown';
import { 
  getDocumentationByCategory,
  getDocumentationById,
  APIs
} from '../../components/docs/docsConfig';

interface EndpointMethod {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  description?: string;
  parameters?: any[];
  responses?: any;
}

const methodColors = {
  GET: 'bg-green-100 text-green-800 border-green-200',
  POST: 'bg-blue-100 text-blue-800 border-blue-200',
  PUT: 'bg-orange-100 text-orange-800 border-orange-200',
  DELETE: 'bg-red-100 text-red-800 border-red-200',
  PATCH: 'bg-purple-100 text-purple-800 border-purple-200'
};

export function ApiReference() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('doc-api-overview');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const currentDoc = getDocumentationById(selectedEndpoint);
  const { content, loading, error } = useMarkdown(currentDoc?.path || '');
  
  const categories = getDocumentationByCategory().filter(cat => 
    cat.name.includes('API') || cat.name.includes('Reference')
  );
  
  // Filter documentation based on search
  const filteredCategories = categories.map(category => ({
    ...category,
    docs: category.docs.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.docs.length > 0);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="h-full flex bg-background">
      {/* Left Sidebar - API Navigation */}
      <div className="w-80 border-r border-border bg-card">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              API Reference
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Complete API documentation and examples
            </p>
            
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search endpoints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* API Overview Cards */}
          <div className="mb-6 space-y-3">
            {Object.entries(APIs).map(([key, api]) => (
              <div
                key={key}
                className="p-3 bg-background rounded-lg border border-border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    api.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <h3 className="font-medium text-foreground">{api.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {api.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Active
                  </span>
                  <span className="text-xs text-muted-foreground">
                    v{api.version}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* API Sections */}
          <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
            {filteredCategories.map((category) => (
              <div key={category.name}>
                <button
                  onClick={() => toggleSection(category.name)}
                  className="w-full flex items-center justify-between p-2 text-left hover:bg-muted/50 rounded-lg transition-colors"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {category.name}
                  </h3>
                  {expandedSections[category.name] ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                
                {expandedSections[category.name] && (
                  <div className="ml-4 mt-2 space-y-1">
                    {category.docs.map((doc) => {
                      const isSelected = selectedEndpoint === doc.id;
                      
                      return (
                        <button
                          key={doc.id}
                          onClick={() => setSelectedEndpoint(doc.id)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Code className={`w-3 h-3 ${
                              isSelected ? 'text-primary-foreground' : 'text-primary'
                            }`} />
                            <span className="font-medium text-sm">
                              {doc.title}
                            </span>
                          </div>
                          <p className="text-xs opacity-80">
                            {doc.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto p-8">
            {/* Header */}
            {currentDoc && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      {currentDoc.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {currentDoc.description}
                    </p>
                  </div>
                </div>
                
                {/* API Info Bar */}
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Base URL:</span>
                    <code className="text-sm bg-background px-2 py-1 rounded border">
                      https://api.hashub.ai
                    </code>
                    <button
                      onClick={() => copyToClipboard('https://api.hashub.ai')}
                      className="p-1 hover:bg-background rounded transition-colors"
                    >
                      <Copy className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Auth:</span>
                    <span className="text-sm text-muted-foreground">API Key required</span>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Loading API documentation...</span>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                  <p className="text-red-800">Failed to load API documentation: {error}</p>
                </div>
              )}
              
              {content && !loading && (
                <MarkdownRenderer content={content} />
              )}
            </div>

            {/* Interactive Examples Section */}
            {currentDoc && !loading && (
              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Try it out
                </h2>
                
                {/* Example Request */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">Example Request</h3>
                      <button className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors">
                        <Play className="w-3 h-3" />
                        Run
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-background">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`curl -X POST https://api.hashub.ai/v1/documents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Your text content here",
    "metadata": {
      "source": "example"
    }
  }'`}</code>
                    </pre>
                  </div>
                </div>

                {/* Example Response */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b border-border">
                    <h3 className="font-medium text-foreground">Example Response</h3>
                  </div>
                  <div className="p-4 bg-background">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{`{
  "success": true,
  "data": {
    "id": "doc_1234567890",
    "status": "processed",
    "chunks": 5,
    "created_at": "2024-01-15T10:30:00Z"
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Quick Reference */}
        <div className="w-80 border-l border-border bg-card p-6">
          <div className="sticky top-6 space-y-6">
            {/* Status Indicators */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                API Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">All Systems Operational</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last updated: 2 minutes ago
                </div>
              </div>
            </div>

            {/* Rate Limits */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Rate Limits
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Requests per minute:</span>
                  <span className="font-medium">1,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Requests per hour:</span>
                  <span className="font-medium">60,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Concurrent requests:</span>
                  <span className="font-medium">10</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <a
                  href="/docs/guides"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Getting Started Guide
                </a>
                <a
                  href="/docs/playground"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Play className="w-4 h-4" />
                  API Playground
                </a>
                <a
                  href="/docs/sdks"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Code className="w-4 h-4" />
                  SDKs & Libraries
                </a>
                <a
                  href="https://status.hashub.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Status Page
                </a>
              </div>
            </div>

            {/* Support */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Need Help?
              </h3>
              <div className="space-y-3">
                <a
                  href="/support"
                  className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm hover:bg-primary/10 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <div>
                    <div className="font-medium text-foreground">Contact Support</div>
                    <div className="text-xs text-muted-foreground">Get help from our team</div>
                  </div>
                </a>
                <a
                  href="https://discord.gg/hashub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-background border border-border rounded-lg text-sm hover:bg-muted/50 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">Join Discord</div>
                    <div className="text-xs text-muted-foreground">Community support</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
