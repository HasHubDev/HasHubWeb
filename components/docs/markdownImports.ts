// Markdown dosyalarını static import ile yükleme
const markdownFiles: Record<string, () => Promise<string>> = {
  '/docs/vectorAPI/index.md': () => import('/docs/vectorAPI/index.md?raw').then(m => m.default),
  '/docs/vectorAPI/README.md': () => import('/docs/vectorAPI/README.md?raw').then(m => m.default),
  '/docs/vectorAPI/api-reference.md': () => import('/docs/vectorAPI/api-reference.md?raw').then(m => m.default),
  '/docs/vectorAPI/models.md': () => import('/docs/vectorAPI/models.md?raw').then(m => m.default),
  '/docs/vectorAPI/langchain-integration.md': () => import('/docs/vectorAPI/langchain-integration.md?raw').then(m => m.default),
  '/docs/vectorAPI/llamaindex-integration.md': () => import('/docs/vectorAPI/llamaindex-integration.md?raw').then(m => m.default),
  '/docs/vectorAPI/openai-compatibility.md': () => import('/docs/vectorAPI/openai-compatibility.md?raw').then(m => m.default),
  '/docs/vectorAPI/python-sdk.md': () => import('/docs/vectorAPI/python-sdk.md?raw').then(m => m.default),
  '/docs/vectorAPI/typescript-sdk.md': () => import('/docs/vectorAPI/typescript-sdk.md?raw').then(m => m.default),
  
  '/docs/docAPI/README.md': () => import('/docs/docAPI/README.md?raw').then(m => m.default),
  '/docs/docAPI/ocr_processing.md': () => import('/docs/docAPI/ocr_processing.md?raw').then(m => m.default),
  '/docs/docAPI/chat_completions.md': () => import('/docs/docAPI/chat_completions.md?raw').then(m => m.default),
  '/docs/docAPI/image_enhancement.md': () => import('/docs/docAPI/image_enhancement.md?raw').then(m => m.default),
  '/docs/docAPI/supported_languages.md': () => import('/docs/docAPI/supported_languages.md?raw').then(m => m.default),
};

export { markdownFiles };
