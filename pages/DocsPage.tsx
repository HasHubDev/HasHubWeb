import { DocViewer } from '../components/docs/DocViewer';

interface DocsPageProps {
  currentDoc?: string;
}

export function DocsPage({ currentDoc = '/docs/quickstart' }: DocsPageProps) {
  
  // Documentation menu items mapping
  const docMappings: Record<string, { path: string; title: string }> = {
    // Getting Started
    '/docs/overview': { path: '/docs/overview', title: 'Overview' },
    '/docs/quickstart': { path: '/docs/quickstart', title: 'Quickstart Guide' },
    '/docs/auth': { path: '/docs/auth', title: 'Authentication' },
    
    // Concepts
    '/docs/concepts/ocr-modes': { path: '/docs/docAPI/full.md', title: 'OCR Modes' },
    '/docs/concepts/embeddings': { path: '/docs/concepts/embeddings', title: 'Vector Embeddings' },
    '/docs/concepts/performance': { path: '/docs/concepts/performance', title: 'Performance & Cost' },
    
    // How-to Guides
    '/docs/how-to/ocr-markdown': { path: '/docs/how-to/ocr-markdown', title: 'OCR to Markdown' },
    '/docs/how-to/batch-processing': { path: '/docs/how-to/batch-processing', title: 'Batch Processing' },
    '/docs/how-to/search-lab': { path: '/docs/how-to/search-lab', title: 'Search Lab Usage' },
    
    // SDKs
    '/docs/sdk/python': { path: '/docs/sdk/python', title: 'Python SDK' },
    '/docs/sdk/javascript': { path: '/docs/sdk/javascript', title: 'JavaScript SDK' },
    
    // Integrations
    '/docs/integrations/langchain': { path: '/docs/integrations/langchain', title: 'LangChain' },
    '/docs/integrations/llamaindex': { path: '/docs/integrations/llamaindex', title: 'LlamaIndex' },
    
    // Reference
    '/docs/errors': { path: '/docs/errors', title: 'Error Handling' },
    '/docs/rate-limits': { path: '/docs/rate-limits', title: 'Rate Limits' },
    '/docs/security': { path: '/docs/security', title: 'Security' },
    '/docs/changelog': { path: '/docs/changelog', title: 'Changelog' }
  };

  const currentDocInfo = docMappings[currentDoc] || { 
    path: '/docs/quickstart', 
    title: 'Quickstart Guide' 
  };

  return (
    <div className="flex-1 bg-white">
      <DocViewer 
        docPath={currentDocInfo.path}
        title={currentDocInfo.title}
      />
    </div>
  );
}
