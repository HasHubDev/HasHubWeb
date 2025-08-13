import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

// React Markdown components with custom styling
export const markdownComponents: Components = {
  // Custom heading styles
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl font-bold text-gray-900 mt-12 mb-8 border-b border-gray-200 pb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6 border-b border-gray-100 pb-2" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" {...props}>
      {children}
    </h4>
  ),
  
  // Paragraph styles
  p: ({ children, ...props }) => (
    <p className="mb-4 text-gray-700 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  
  // List styles
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 ml-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 ml-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-gray-700" {...props}>
      {children}
    </li>
  ),
  
  // Code styles
  code: ({ inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    
    if (!inline && match) {
      // Block code
      return (
        <div className="my-6">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
              {match[1].toUpperCase()}
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            </div>
          </div>
        </div>
      );
    } else {
      // Inline code
      return (
        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }
  },
  
  // Link styles
  a: ({ children, ...props }) => (
    <a className="text-blue-600 hover:text-blue-800 underline transition-colors" {...props}>
      {children}
    </a>
  ),
  
  // Table styles
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-t border-gray-200" {...props}>
      {children}
    </td>
  ),
  
  // Blockquote styles
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic" {...props}>
      {children}
    </blockquote>
  ),
  
  // Strong and emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};

// React Markdown configuration
export const markdownConfig = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeHighlight, rehypeRaw],
  components: markdownComponents,
};

// Enhanced React Markdown component
export function MarkdownRenderer({ content }: { content: string }): JSX.Element {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeRaw]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
