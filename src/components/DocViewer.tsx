import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Download, Clock, FileText } from "lucide-react";
import type { Components } from "react-markdown";
import type { DocRecord } from "@/lib/docs";
import { Button } from "@/components/ui/button";
import { PresentationDeck } from "@/components/PresentationDeck";

interface DocViewerProps {
  doc: DocRecord;
}

const markdownComponents: Components = {
  h1: ({ className, ...props }) => (
    <h1
      {...props}
      className={`mb-6 text-4xl font-bold text-slate-900 pt-2 ${className || ""}`}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      {...props}
      className={`mb-4 mt-10 border-b border-slate-300 pb-3 text-2xl font-bold text-slate-900 ${className || ""}`}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      {...props}
      className={`mb-3 mt-8 text-xl font-semibold text-slate-800 ${className || ""}`}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      {...props}
      className={`mb-2 mt-6 text-lg font-semibold text-slate-700 ${className || ""}`}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      {...props}
      className={`mb-4 text-slate-700 leading-relaxed ${className || ""}`}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      {...props}
      className={`mb-4 ml-6 list-disc space-y-2 text-slate-700 ${className || ""}`}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      {...props}
      className={`mb-4 ml-6 list-decimal space-y-2 text-slate-700 ${className || ""}`}
    />
  ),
  li: ({ className, ...props }) => (
    <li
      {...props}
      className={`text-slate-700 ${className || ""}`}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      {...props}
      className={`font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-2 transition ${className || ""}`}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      {...props}
      className={`my-4 border-l-4 border-blue-400 bg-blue-50 px-5 py-4 italic text-slate-700 rounded-r-md ${className || ""}`}
    />
  ),
  code: ({ className, ...props }: any) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          {...props}
          className={`bg-slate-200 text-slate-900 px-2 py-1 rounded font-mono text-sm ${className || ""}`}
        />
      );
    }
    return <code {...props} className={className} />;
  },
  pre: ({ className, ...props }) => (
    <pre
      {...props}
      className={`my-5 overflow-x-auto rounded-lg border border-slate-300 bg-slate-900 p-4 text-sm leading-relaxed ${className || ""}`}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr {...props} className={`my-8 border-t-2 border-slate-300 ${className || ""}`} />
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-200">
      <table {...props} className={`w-full text-sm ${className || ""}`} />
    </div>
  ),
  thead: ({ className, ...props }) => (
    <thead {...props} className={`bg-slate-100 ${className || ""}`} />
  ),
  tbody: ({ className, ...props }) => (
    <tbody {...props} className={`divide-y divide-slate-200 ${className || ""}`} />
  ),
  tr: ({ className, ...props }) => (
    <tr {...props} className={`${className || ""}`} />
  ),
  th: ({ className, ...props }) => (
    <th {...props} className={`px-4 py-3 text-left font-semibold text-slate-900 ${className || ""}`} />
  ),
  td: ({ className, ...props }) => (
    <td {...props} className={`px-4 py-3 text-slate-700 ${className || ""}`} />
  ),
  img: ({ className, ...props }) => (
    <img
      {...props}
      className={`my-6 rounded-lg border border-slate-200 shadow-md max-w-full h-auto ${className || ""}`}
    />
  ),
};

export function DocViewer({ doc }: DocViewerProps) {
  const isPresentationDoc =
    /12[_-]slide[_-]presentation/i.test(doc.relativePath) ||
    /12[_-]slide[_-]presentation/i.test(doc.id);

  if (isPresentationDoc) {
    return <PresentationDeck doc={doc} />;
  }

  return (
    <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-slate-600 shrink-0" />
              <h2 className="text-2xl font-bold text-slate-900">{doc.title}</h2>
            </div>
            <p className="text-sm text-slate-500 font-mono">{doc.relativePath}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Auto-updated</span>
              </div>
              <span>•</span>
              <span>{doc.headings.filter(h => h.level === 1 || h.level === 2).length} sections</span>
            </div>
          </div>
          {doc.pdfHref ? (
            <a href={doc.pdfHref} target="_blank" rel="noreferrer" className="shrink-0">
              <Button size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </a>
          ) : (
            <Button variant="outline" size="sm" disabled title="No exported PDF found for this document" className="shrink-0 gap-2">
              <Download className="h-4 w-4" />
              PDF Unavailable
            </Button>
          )}
        </div>
      </div>
      <div className="overflow-auto max-h-[calc(100vh-12rem)]">
        <div className="px-8 py-8 max-w-4xl">
          <article className="prose prose-slate prose-base max-w-none text-[16px]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeSlug]}
              components={markdownComponents}
            >
              {doc.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}


