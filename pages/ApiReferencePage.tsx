import { MainLayout } from '../components/layout/MainLayout';
import { 
  Code2, 
  FileText, 
  Search, 
  Zap,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function ApiReferencePage() {
  return (
    <MainLayout currentSection="api-reference">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">API Reference</h1>
              <p className="text-gray-600 mt-1">
                Complete reference documentation for all HashHub API endpoints.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                OpenAPI Spec
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Try in Playground
              </button>
            </div>
          </div>
        </div>

        {/* API Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">All Systems Operational</p>
              <p className="text-xs text-green-600">99.9% uptime in the last 30 days</p>
            </div>
            <div className="ml-auto">
              <a href="#" className="text-green-700 text-xs hover:text-green-800">
                View Status Page →
              </a>
            </div>
          </div>
        </div>

        {/* API Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Chat OCR API */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Chat OCR API</h3>
                  <p className="text-sm text-gray-600">Document analysis and processing</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono text-green-600">POST /v1/chat/ocr</code>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">Process documents with AI-powered OCR</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono text-blue-600">GET /v1/chat/ocr/{id}</code>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">Retrieve processing results</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono text-orange-600">DELETE /v1/chat/ocr/{id}</code>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">Delete processing results</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View complete documentation →
                </a>
              </div>
            </div>

            {/* Vector Search API */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Vector Search API</h3>
                  <p className="text-sm text-gray-600">Semantic search and embeddings</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono text-green-600">POST /v1/vector/search</code>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">Search vector database</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono text-green-600">POST /v1/vector/embed</code>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">Generate embeddings</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono text-blue-600">GET /v1/vector/collections</code>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">List available collections</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View complete documentation →
                </a>
              </div>
            </div>
          </div>

          {/* Quick Example */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Example</h3>
                <p className="text-sm text-gray-600">Try our API with this example</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 text-white text-sm font-mono overflow-x-auto">
              <div className="text-green-400"># Process a document with OCR</div>
              <div className="mt-2">
                <span className="text-blue-400">curl</span> -X POST \<br />
                &nbsp;&nbsp;<span className="text-yellow-400">"https://api.hashhub.dev/v1/chat/ocr"</span> \<br />
                &nbsp;&nbsp;-H <span className="text-yellow-400">"Authorization: Bearer YOUR_API_KEY"</span> \<br />
                &nbsp;&nbsp;-H <span className="text-yellow-400">"Content-Type: multipart/form-data"</span> \<br />
                &nbsp;&nbsp;-F <span className="text-yellow-400">"file=@document.pdf"</span> \<br />
                &nbsp;&nbsp;-F <span className="text-yellow-400">"prompt=Extract invoice details"</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="text-xs font-semibold text-green-800 mb-2">Response:</div>
              <div className="bg-white p-3 rounded border text-xs font-mono text-gray-700">
                {`{
  "id": "ocr_abc123",
  "status": "completed",
  "result": {
    "text": "Invoice #12345...",
    "entities": {
      "invoice_number": "12345",
      "amount": "$1,500.00",
      "date": "2024-01-15"
    }
  }
}`}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Try in Playground
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">API Key Authentication</h3>
              <p className="text-sm text-gray-600 mb-3">
                Include your API key in the Authorization header of all requests.
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <code className="text-sm text-gray-800">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Getting Your API Key</h3>
              <p className="text-sm text-gray-600 mb-3">
                Generate and manage your API keys from the dashboard.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <ExternalLink className="w-4 h-4" />
                Go to API Keys
              </a>
            </div>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-orange-800 mb-1">Rate Limits</h3>
              <p className="text-sm text-orange-700 mb-3">
                API requests are rate limited to ensure fair usage across all users.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-orange-800">Free Plan:</span>
                  <span className="text-orange-700"> 1,000 requests/month</span>
                </div>
                <div>
                  <span className="font-medium text-orange-800">Pro Plan:</span>
                  <span className="text-orange-700"> 10,000 requests/month</span>
                </div>
                <div>
                  <span className="font-medium text-orange-800">Enterprise:</span>
                  <span className="text-orange-700"> Custom limits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
