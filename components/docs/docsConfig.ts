// Documentation configuration and metadata
export interface DocSection {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  icon: string;
  path: string;
}

export interface ApiConfig {
  name: string;
  baseUrl: string;
  description: string;
  color: string;
  icon: string;
  version: string;
}

export const APIs: Record<string, ApiConfig> = {
  docapi: {
    name: 'Document API',
    baseUrl: 'https://doc.hashhub.dev',
    description: 'Intelligent OCR and document processing',
    color: 'blue',
    icon: 'FileText',
    version: '1.0'
  },
  vectorapi: {
    name: 'Vector API', 
    baseUrl: 'https://vector.hashhub.dev',
    description: 'High-quality text embeddings',
    color: 'green',
    icon: 'Database',
    version: '1.0'
  }
};

export const documentationSections: DocSection[] = [
  // Getting Started
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of HashHub APIs',
    category: 'Basics',
    readTime: '5 min',
    icon: 'BookOpen',
    path: '/docs/vectorAPI/index.md'
  },
  
  // Document API
  {
    id: 'doc-overview',
    title: 'Document API Overview',
    description: 'Introduction to intelligent document processing',
    category: 'Document API',
    readTime: '3 min',
    icon: 'FileText',
    path: '/docs/docAPI/README.md'
  },
  {
    id: 'ocr-processing',
    title: 'OCR Processing',
    description: 'Extract text from images and documents',
    category: 'Document API',
    readTime: '10 min',
    icon: 'ScanLine',
    path: '/docs/docAPI/ocr_processing.md'
  },
  {
    id: 'chat-completions',
    title: 'Chat Completions',
    description: 'OpenAI-compatible document processing interface',
    category: 'Document API',
    readTime: '8 min',
    icon: 'MessageSquare',
    path: '/docs/docAPI/chat_completions.md'
  },
  {
    id: 'image-enhancement',
    title: 'Image Enhancement',
    description: 'Improve image quality for better OCR results',
    category: 'Document API',
    readTime: '6 min',
    icon: 'Image',
    path: '/docs/docAPI/image_enhancement.md'
  },
  {
    id: 'supported-languages',
    title: 'Supported Languages',
    description: 'Multi-language OCR capabilities',
    category: 'Document API',
    readTime: '4 min',
    icon: 'Globe',
    path: '/docs/docAPI/supported_languages.md'
  },
  
  // Vector API
  {
    id: 'vector-overview',
    title: 'Vector API Overview',
    description: 'Introduction to text embeddings',
    category: 'Vector API',
    readTime: '3 min',
    icon: 'Database',
    path: '/docs/vectorAPI/README.md'
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    description: 'Complete endpoint documentation',
    category: 'Vector API',
    readTime: '15 min',
    icon: 'Code',
    path: '/docs/vectorAPI/api-reference.md'
  },
  {
    id: 'models-comparison',
    title: 'Models & Pricing',
    description: 'Compare embedding models and pricing',
    category: 'Vector API',
    readTime: '8 min',
    icon: 'BarChart',
    path: '/docs/vectorAPI/models.md'
  },
  {
    id: 'langchain-integration',
    title: 'LangChain Integration',
    description: 'Build RAG applications with LangChain',
    category: 'Vector API',
    readTime: '20 min',
    icon: 'Zap',
    path: '/docs/vectorAPI/langchain-integration.md'
  },
  {
    id: 'llamaindex-integration',
    title: 'LlamaIndex Integration',
    description: 'Use with LlamaIndex framework',
    category: 'Vector API',
    readTime: '15 min',
    icon: 'Layers',
    path: '/docs/vectorAPI/llamaindex-integration.md'
  },
  {
    id: 'openai-compatibility',
    title: 'OpenAI Compatibility',
    description: 'Drop-in replacement for OpenAI embeddings',
    category: 'Vector API',
    readTime: '6 min',
    icon: 'RefreshCw',
    path: '/docs/vectorAPI/openai-compatibility.md'
  },
  
  // SDKs
  {
    id: 'python-sdk',
    title: 'Python SDK',
    description: 'Official Python SDK and examples',
    category: 'SDKs',
    readTime: '12 min',
    icon: 'Code2',
    path: '/docs/vectorAPI/python-sdk.md'
  },
  {
    id: 'typescript-sdk',
    title: 'TypeScript SDK',
    description: 'Official TypeScript/JavaScript SDK',
    category: 'SDKs',
    readTime: '12 min',
    icon: 'Code2',
    path: '/docs/vectorAPI/typescript-sdk.md'
  }
];

export const getDocumentationByCategory = () => {
  const categories = [...new Set(documentationSections.map(doc => doc.category))];
  return categories.map(category => ({
    name: category,
    docs: documentationSections.filter(doc => doc.category === category)
  }));
};

export const getDocumentationById = (id: string) => {
  return documentationSections.find(doc => doc.id === id);
};
