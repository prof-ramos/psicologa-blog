'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="border-4 border-black bg-white p-6 min-h-[400px]">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-4xl font-black mb-4 heading-font">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl font-black mb-3 heading-font">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-bold mb-2 heading-font">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-lg leading-relaxed mb-4">{children}</p>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-primary underline hover:text-deep font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt || ''}
                className="max-w-full h-auto border-4 border-black my-6"
              />
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-8 border-accent bg-gray-100 pl-4 py-2 my-4 italic">
                {children}
              </blockquote>
            ),
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-gray-100 border-2 border-gray-300 px-2 py-1 text-sm font-mono">
                    {children}
                  </code>
                );
              }
              return (
                <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto border-4 border-black my-4">
                  <code className="font-mono text-sm">{children}</code>
                </pre>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
