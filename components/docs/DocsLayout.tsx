import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { MarkdownRenderer } from '../../utils/markdown';

interface CodeExample {
  label: string;
  language: string;
  code: string;
}

interface DocsLayoutProps {
  markdownContent: string;
  codeExamples: CodeExample[];
  title?: string;
  description?: string;
}

export function DocsLayout({ 
  markdownContent, 
  codeExamples, 
  title, 
  description 
}: DocsLayoutProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [index]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Documentation Content */}
      <div className="flex-1 lg:w-1/2">
        <div className="bg-white h-full">
          <div className="p-8">
            {title && (
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
                {description && (
                  <p className="text-xl text-gray-600">{description}</p>
                )}
              </div>
            )}
            
            {/* Markdown Content */}
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer content={markdownContent} />
            </div>
          </div>
        </div>
      </div>

      {/* Code Examples Panel */}
      <div className="flex-1 lg:w-1/2 bg-gray-900">
        <div className="h-full flex flex-col">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-700">
            {codeExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === index
                    ? 'text-white bg-gray-800 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {example.label}
              </button>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 relative">
            {codeExamples[activeTab] && (
              <div className="h-full flex flex-col">
                {/* Language Label & Copy Button */}
                <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
                  <span className="text-sm text-gray-400 uppercase font-medium">
                    {codeExamples[activeTab].language}
                  </span>
                  <button
                    onClick={() => copyToClipboard(codeExamples[activeTab].code, activeTab)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
                  >
                    {copiedStates[activeTab] ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Code Block */}
                <div className="flex-1 overflow-auto p-4">
                  <pre className="text-sm text-gray-300 leading-relaxed">
                    <code>{codeExamples[activeTab].code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
