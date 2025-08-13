import { useState } from 'react';
import { 
  MessageSquare, 
  Image, 
  Zap, 
  Search, 
  BarChart, 
  MapPin,
  Key,
  CreditCard,
  Settings,
  Layers,
  ChevronDown,
  ChevronRight,
  ScanLine,
  Database,
  Globe,
  Gauge,
  BookOpen,
  Code,
  FileText,
  RefreshCw,
  Shield,
  GitBranch,
  Webhook,
  AlertTriangle,
  Clock,
  Info,
  CheckCircle,
  Play,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  currentPage?: string;
  currentSection: 'dashboard' | 'docs' | 'api-reference';
  onSectionChange?: (section: 'dashboard' | 'docs' | 'api-reference') => void;
  onDocChange?: (href: string) => void;
}

interface MenuItem {
  id: string;
  title: string;
  icon: any;
  href?: string;
  children?: MenuItem[];
  badge?: string;
}

// Dashboard menu items
const dashboardMenuItems: MenuItem[] = [
  {
    id: 'playground',
    title: 'Playground',
    icon: Gauge,
    children: [
      {
        id: 'chat-ocr',
        title: 'Chat OCR',
        icon: MessageSquare,
        href: '/dashboard/playground/chat-ocr'
      },
      {
        id: 'geotext-ocr',
        title: 'GeoText OCR',
        icon: MapPin,
        href: '/dashboard/playground/geotext-ocr'
      },
      {
        id: 'fast-ocr',
        title: 'Fast OCR',
        icon: ScanLine,
        href: '/dashboard/playground/fast-ocr'
      },
      {
        id: 'embedding-benchmark',
        title: 'Embedding Benchmark',
        icon: BarChart,
        href: '/dashboard/playground/embedding-benchmark'
      },
      {
        id: 'vector-explorer',
        title: 'Vector Explorer',
        icon: Database,
        href: '/dashboard/playground/vector-explorer'
      },
      {
        id: 'search-lab',
        title: 'Search Lab',
        icon: Search,
        href: '/dashboard/playground/search-lab',
        badge: '50 rows max'
      }
    ]
  },
  {
    id: 'manage',
    title: 'Manage',
    icon: Settings,
    children: [
      {
        id: 'api-keys',
        title: 'API Keys',
        icon: Key,
        href: '/dashboard/manage/api-keys'
      },
      {
        id: 'usage-billing',
        title: 'Usage & Billing',
        icon: CreditCard,
        href: '/dashboard/manage/usage-billing'
      },
      {
        id: 'project-settings',
        title: 'Project Settings',
        icon: Settings,
        href: '/dashboard/manage/project-settings'
      }
    ]
  },
  {
    id: 'optimize',
    title: 'Optimize',
    icon: Zap,
    children: [
      {
        id: 'batch-api',
        title: 'Batch API',
        icon: Layers,
        href: '/dashboard/optimize/batch-api'
      }
    ]
  }
];

// Documentation menu items
const docsMenuItems: MenuItem[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: BookOpen,
    children: [
      {
        id: 'overview',
        title: 'Overview',
        icon: Info,
        href: '/docs/overview'
      },
      {
        id: 'quickstart',
        title: 'Quickstart',
        icon: Zap,
        href: '/docs/quickstart'
      },
      {
        id: 'authentication',
        title: 'Authentication',
        icon: Shield,
        href: '/docs/auth'
      }
    ]
  },
  {
    id: 'concepts',
    title: 'Concepts',
    icon: BookOpen,
    children: [
      {
        id: 'ocr-modes',
        title: 'OCR Modes',
        icon: ScanLine,
        href: '/docs/full.md'
      },
      {
        id: 'embeddings',
        title: 'Vector Embeddings',
        icon: Database,
        href: '/docs/concepts/embeddings'
      },
      {
        id: 'performance',
        title: 'Performance & Cost',
        icon: BarChart,
        href: '/docs/concepts/performance'
      }
    ]
  },
  {
    id: 'how-to-guides',
    title: 'How-to Guides',
    icon: Code,
    children: [
      {
        id: 'ocr-to-markdown',
        title: 'OCR to Markdown',
        icon: FileText,
        href: '/docs/full.md'
      },
      {
        id: 'batch-processing',
        title: 'Batch Processing',
        icon: Layers,
        href: '/docs/how-to/batch-processing'
      },
      {
        id: 'search-lab',
        title: 'Search Lab Usage',
        icon: Search,
        href: '/docs/how-to/search-lab'
      }
    ]
  },
  {
    id: 'sdks',
    title: 'SDKs',
    icon: Code,
    children: [
      {
        id: 'python-sdk',
        title: 'Python SDK',
        icon: Code,
        href: '/docs/sdk/python'
      },
      {
        id: 'javascript-sdk',
        title: 'JavaScript SDK',
        icon: Code,
        href: '/docs/sdk/javascript'
      }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: Layers,
    children: [
      {
        id: 'langchain',
        title: 'LangChain',
        icon: Layers,
        href: '/docs/integrations/langchain'
      },
      {
        id: 'llamaindex',
        title: 'LlamaIndex',
        icon: Layers,
        href: '/docs/integrations/llamaindex'
      }
    ]
  },
  {
    id: 'reference',
    title: 'Reference',
    icon: BookOpen,
    children: [
      {
        id: 'errors',
        title: 'Error Handling',
        icon: AlertTriangle,
        href: '/docs/errors'
      },
      {
        id: 'rate-limits',
        title: 'Rate Limits',
        icon: Settings,
        href: '/docs/rate-limits'
      },
      {
        id: 'security',
        title: 'Security',
        icon: Shield,
        href: '/docs/security'
      },
      {
        id: 'changelog',
        title: 'Changelog',
        icon: Clock,
        href: '/docs/changelog'
      }
    ]
  }
];

// API Reference menu items
const apiReferenceMenuItems: MenuItem[] = [
  {
    id: 'docapi',
    title: 'Document API',
    icon: FileText,
    children: [
      {
        id: 'doc-overview',
        title: 'Overview',
        icon: Info,
        href: '/api-reference/doc/overview'
      },
      {
        id: 'chat-ocr-api',
        title: 'Chat OCR',
        icon: MessageSquare,
        href: '/api-reference/doc/chat-ocr'
      },
      {
        id: 'geotext-ocr-api',
        title: 'GeoText OCR',
        icon: MapPin,
        href: '/api-reference/doc/geotext-ocr'
      },
      {
        id: 'fast-ocr-api',
        title: 'Fast OCR',
        icon: ScanLine,
        href: '/api-reference/doc/fast-ocr'
      },
      {
        id: 'image-enhancement',
        title: 'Image Enhancement',
        icon: Image,
        href: '/api-reference/doc/image-enhancement'
      }
    ]
  },
  {
    id: 'vectorapi',
    title: 'Vector API',
    icon: Database,
    children: [
      {
        id: 'vector-overview',
        title: 'Overview',
        icon: Info,
        href: '/api-reference/vector/overview'
      },
      {
        id: 'embeddings-api',
        title: 'Embeddings',
        icon: Database,
        href: '/api-reference/vector/embeddings'
      },
      {
        id: 'search-api',
        title: 'Search',
        icon: Search,
        href: '/api-reference/vector/search'
      },
      {
        id: 'models',
        title: 'Models & Pricing',
        icon: BarChart,
        href: '/api-reference/vector/models'
      }
    ]
  },
  {
    id: 'authentication',
    title: 'Authentication',
    icon: Shield,
    href: '/api-reference/authentication'
  },
  {
    id: 'errors',
    title: 'Error Codes',
    icon: AlertTriangle,
    href: '/api-reference/errors'
  },
  {
    id: 'webhooks',
    title: 'Webhooks',
    icon: Webhook,
    href: '/api-reference/webhooks'
  },
  {
    id: 'sdks',
    title: 'Official SDKs',
    icon: Code,
    children: [
      {
        id: 'python-sdk-ref',
        title: 'Python SDK',
        icon: Code,
        href: '/api-reference/sdks/python'
      },
      {
        id: 'js-sdk-ref',
        title: 'JavaScript SDK',
        icon: Code,
        href: '/api-reference/sdks/javascript'
      }
    ]
  }
];

export function Sidebar({ isOpen, onClose, currentPage, currentSection, onSectionChange, onDocChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    // Dashboard
    playground: true,
    manage: false,
    optimize: false,
    // Docs
    'getting-started': true,
    concepts: false,
    'how-to-guides': false,
    sdks: false,
    integrations: false,
    reference: false,
    // API Reference
    docapi: true,
    vectorapi: false,
    authentication: false,
    errors: false,
    webhooks: false
  });

  // Get current menu items based on section
  const getCurrentMenuItems = () => {
    switch (currentSection) {
      case 'dashboard':
        return dashboardMenuItems;
      case 'docs':
        return docsMenuItems;
      case 'api-reference':
        return apiReferenceMenuItems;
      default:
        return dashboardMenuItems;
    }
  };

  // Get section title and description
  const getSectionInfo = () => {
    switch (currentSection) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          description: 'AI-powered document processing and vector search'
        };
      case 'docs':
        return {
          title: 'Documentation',
          description: 'Complete developer guide for HashHub APIs'
        };
      case 'api-reference':
        return {
          title: 'API Reference',
          description: 'Complete API documentation and examples'
        };
      default:
        return {
          title: 'Dashboard',
          description: 'AI-powered document processing and vector search'
        };
    }
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const isItemActive = (href: string) => {
    return currentPage === href;
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.id];
    const IconComponent = item.icon;

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleExpanded(item.id)}
            className={`w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors rounded-lg ${
              level > 0 ? 'ml-4' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <IconComponent className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">{item.title}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {isExpanded && (
            <div className="ml-4 border-l border-gray-200 pl-4 mt-1">
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    const handleClick = () => {
      // Eğer docs bölümünde bir item ise onDocChange kullan
      if (currentSection === 'docs' && item.href && onDocChange) {
        onDocChange(item.href);
      } else if (item.href) {
        // Diğer durumlar için normal navigasyon
        window.location.href = item.href;
      }
      onClose?.();
    };

    return (
      <button
        key={item.id}
        onClick={handleClick}
        className={`w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors rounded-lg text-left ${
          level > 0 ? 'ml-4 pl-8' : ''
        } ${
          isItemActive(item.href || '') 
            ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-700' 
            : 'text-gray-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <IconComponent className={`w-4 h-4 ${
            isItemActive(item.href || '') ? 'text-blue-600' : 'text-gray-500'
          }`} />
          <span className="font-medium">{item.title}</span>
        </div>
        {item.badge && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  const sectionInfo = getSectionInfo();
  const menuItems = getCurrentMenuItems();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out overflow-y-auto
        lg:translate-x-0 lg:static lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4">
          {/* Section Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {sectionInfo.title}
            </h2>
            <p className="text-sm text-gray-600">
              {sectionInfo.description}
            </p>
          </div>

          {/* Section Tabs */}
          <div className="mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onSectionChange?.('dashboard')}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  currentSection === 'dashboard'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onSectionChange?.('docs')}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  currentSection === 'docs'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Docs
              </button>
              <button
                onClick={() => onSectionChange?.('api-reference')}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  currentSection === 'api-reference'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                API
              </button>
            </div>
          </div>

          {/* Status Indicators */}
          {currentSection === 'dashboard' && (
            <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">All Systems Operational</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                <div>DocAPI: ✓</div>
                <div>VectorAPI: ✓</div>
              </div>
            </div>
          )}

          

          {/* API Status for API Reference */}
          {currentSection === 'api-reference' && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">API Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">DocAPI</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">VectorAPI</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Operational</span>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <nav className="space-y-1">
            {menuItems.map(item => renderMenuItem(item))}
          </nav>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {currentSection !== 'docs' && (
                <button
                  onClick={() => onSectionChange?.('docs')}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  View Docs
                </button>
              )}
              {currentSection !== 'api-reference' && (
                <button
                  onClick={() => onSectionChange?.('api-reference')}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Code className="w-4 h-4" />
                  API Reference
                </button>
              )}
              <a
                href="/support"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Get Support
              </a>
              <a
                href="https://github.com/HasHubDev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
