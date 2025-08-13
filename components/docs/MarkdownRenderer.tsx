import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

// Import CSS for syntax highlighting
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  inline?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, inline }) => {
  const [copied, setCopied] = useState(false);
  const isCodeBlock = !inline && className;
  const language = className?.replace('language-', '') || '';

  const copyToClipboard = async () => {
    if (typeof children === 'string') {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (inline) {
    return (
      <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-primary">
        {children}
      </code>
    );
  }

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-muted border border-border rounded-t-lg px-4 py-2">
        <span className="text-sm font-medium text-muted-foreground">
          {language || 'code'}
        </span>
        {isCodeBlock && (
          <button
            onClick={copyToClipboard}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            {copied ? (
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
        )}
      </div>
      <pre className={`${className} bg-background border border-t-0 border-border rounded-b-lg p-4 overflow-x-auto`}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

interface TableProps {
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => (
  <div className="overflow-x-auto my-6">
    <table className="w-full border-collapse border border-border rounded-lg">
      {children}
    </table>
  </div>
);

const TableHeader: React.FC<TableProps> = ({ children }) => (
  <thead className="bg-muted">
    {children}
  </thead>
);

const TableRow: React.FC<TableProps> = ({ children }) => (
  <tr className="border-b border-border hover:bg-muted/50">
    {children}
  </tr>
);

const TableCell: React.FC<TableProps> = ({ children }) => (
  <td className="border-r border-border px-4 py-3 text-sm">
    {children}
  </td>
);

const TableHeaderCell: React.FC<TableProps> = ({ children }) => (
  <th className="border-r border-border px-4 py-3 text-left font-semibold text-sm">
    {children}
  </th>
);

interface LinkProps {
  href?: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children }) => {
  const isExternal = href?.startsWith('http');
  const isInternal = href?.startsWith('/') || href?.startsWith('#');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
      >
        {children}
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  }

  if (isInternal) {
    return (
      <a
        href={href}
        className="text-primary hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    );
  }

  return (
    <span className="text-primary">
      {children}
    </span>
  );
};

const Blockquote: React.FC<TableProps> = ({ children }) => (
  <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/30 rounded-r">
    {children}
  </blockquote>
);

const Alert: React.FC<{ type: 'info' | 'warning' | 'error' | 'success'; children: React.ReactNode }> = ({ type, children }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };

  return (
    <div className={`border-l-4 p-4 my-4 rounded-r ${styles[type]}`}>
      {children}
    </div>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className = '' 
}) => {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Headers
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-foreground mb-6 mt-8 pb-2 border-b border-border">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-foreground mb-4 mt-8">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium text-foreground mb-3 mt-6">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-medium text-foreground mb-2 mt-4">
              {children}
            </h4>
          ),
          
          // Paragraphs and text
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-foreground">
              {children}
            </p>
          ),
          
          // Code
          code: CodeBlock,
          
          // Tables
          table: Table,
          thead: TableHeader,
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: TableRow,
          td: TableCell,
          th: TableHeaderCell,
          
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-foreground ml-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground ml-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          
          // Links
          a: Link,
          
          // Blockquotes
          blockquote: Blockquote,
          
          // Images
          img: ({ src, alt }) => (
            <img 
              src={src} 
              alt={alt} 
              className="rounded-lg border border-border max-w-full h-auto my-6"
            />
          ),
          
          // Horizontal rule
          hr: () => (
            <hr className="my-8 border-border" />
          ),
          
          // Strong/Bold
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          
          // Emphasis/Italic
          em: ({ children }) => (
            <em className="italic text-foreground">
              {children}
            </em>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
