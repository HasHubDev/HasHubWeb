import { useState } from 'react';
import { 
  Search, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Database, 
  Code, 
  Zap,
  Globe,
  Image,
  MessageSquare,
  ScanLine,
  BarChart,
  Layers,
  RefreshCw,
  Code2,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { MarkdownRenderer } from '../../components/docs/MarkdownRenderer';
import { useMarkdown } from '../../components/docs/useMarkdown';
import { 
  getDocumentationByCategory,
  getDocumentationById,
  APIs
} from '../../components/docs/docsConfig';

// Icon mapping
const iconMap = {
  BookOpen,
  FileText,
  Database,
  Code,
  Zap,
  Globe,
  Image,
  MessageSquare,
  ScanLine,
  BarChart,
  Layers,
  RefreshCw,
  Code2
};

interface TableOfContentsItem {
  level: number;
  text: string;
  id: string;
}

export function Guides() {
  const [selectedGuide, setSelectedGuide] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');

  const currentDoc = getDocumentationById(selectedGuide);
  const { content, loading, error } = useMarkdown(currentDoc?.path || '');
  
  const categories = getDocumentationByCategory();
  
  // Filter documentation based on search
  const filteredCategories = categories.map(category => ({
    ...category,
    docs: category.docs.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.docs.length > 0);

  // Generate table of contents from markdown headers
  const generateTableOfContents = (content: string): TableOfContentsItem[] => {
    const headerRegex = /^(#{1,4})\s+(.+)$/gm;
    const items: TableOfContentsItem[] = [];
    let match;

    while ((match = headerRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      items.push({ level, text, id });
    }

    return items;
  };

  const tableOfContents = generateTableOfContents(content);

  return (
    <div className="h-full flex bg-background">
      {/* Left Sidebar - Navigation */}
      <div className="w-80 border-r border-border bg-card">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Documentation
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Complete guides for HashHub APIs
            </p>
            
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* API Status Indicators */}
          <div className="mb-6 grid grid-cols-2 gap-2">
            {Object.entries(APIs).map(([key, api]) => (
              <div
                key={key}
                className="flex items-center gap-2 p-2 bg-background rounded border border-border"
              >
                <div className={`w-2 h-2 rounded-full ${
                  api.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <span className="text-xs font-medium text-foreground truncate">
                  {api.name}
                </span>
              </div>
            ))}
          </div>

          {/* Navigation Categories */}
          <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.docs.map((doc) => {
                    const IconComponent = iconMap[doc.icon as keyof typeof iconMap] || BookOpen;
                    const isSelected = selectedGuide === doc.id;
                    
                    return (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedGuide(doc.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                          isSelected
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <IconComponent className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            isSelected ? 'text-primary-foreground' : 'text-primary'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="font-medium text-sm leading-tight line-clamp-2">
                                {doc.title}
                              </h4>
                              <ArrowRight className={`w-3 h-3 ml-2 flex-shrink-0 transition-transform ${
                                isSelected ? 'translate-x-1' : 'group-hover:translate-x-1'
                              }`} />
                            </div>
                            <p className="text-xs opacity-80 mb-2 leading-relaxed line-clamp-2">
                              {doc.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs opacity-70">
                              <Clock className="w-3 h-3" />
                              {doc.readTime}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                {currentDoc && (
                  <>
                    {(() => {
                      const IconComponent = iconMap[currentDoc.icon as keyof typeof iconMap] || BookOpen;
                      return <IconComponent className="w-8 h-8 text-primary" />;
                    })()}
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">
                        {currentDoc.title}
                      </h1>
                      <p className="text-muted-foreground mt-1">
                        {currentDoc.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              {/* Breadcrumb */}
              {currentDoc && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Documentation</span>
                  <ArrowRight className="w-3 h-3" />
                  <span>{currentDoc.category}</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="text-foreground">{currentDoc.title}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Loading documentation...</span>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <p className="text-red-800">Failed to load documentation: {error}</p>
                </div>
              )}
              
              {content && !loading && (
                <MarkdownRenderer content={content} />
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Table of Contents */}
        <div className="w-64 border-l border-border bg-card p-6">
          <div className="sticky top-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              On this page
            </h3>
            
            {tableOfContents.length > 0 ? (
              <nav className="space-y-2">
                {tableOfContents.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.id}`}
                    className={`block text-sm transition-colors hover:text-primary leading-relaxed ${
                      item.level === 1 
                        ? 'font-medium text-foreground' 
                        : item.level === 2
                        ? 'ml-3 text-muted-foreground'
                        : 'ml-6 text-muted-foreground text-xs'
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            ) : (
              <p className="text-sm text-muted-foreground">
                No headings found
              </p>
            )}
            
            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Quick Actions
              </h4>
              <div className="space-y-2">
                <a
                  href="/docs/api-reference"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Code className="w-4 h-4" />
                  API Reference
                </a>
                <a
                  href="/docs/playground"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Zap className="w-4 h-4" />
                  Try in Playground
                </a>
                <a
                  href="https://github.com/HasHubDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Related APIs */}
            {currentDoc && (
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Related APIs
                </h4>
                <div className="space-y-2">
                  {Object.entries(APIs).map(([key, api]) => {
                    const isCurrentAPI = currentDoc.category.includes(api.name);
                    return (
                      <div
                        key={key}
                        className={`p-2 rounded border ${
                          isCurrentAPI 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border bg-background'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            api.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                          }`} />
                          <div>
                            <p className="text-xs font-medium text-foreground">
                              {api.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {api.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
