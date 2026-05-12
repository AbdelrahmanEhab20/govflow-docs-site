import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { Download } from "lucide-react";
import type { Components } from "react-markdown";
import type { DocRecord } from "@/lib/docs";
import { Button } from "@/components/ui/button";
import { PresentationDeck } from "@/components/PresentationDeck";

interface DocViewerProps {
  doc: DocRecord;
}

const markdownComponents: Components = {
  a: ({ className, ...props }) => (
    <a
      {...props}
      className={`font-medium text-blue-700 underline decoration-blue-300 underline-offset-2 transition hover:text-blue-800 ${className || ""}`}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      {...props}
      className={`rounded-r-md border-l-4 border-blue-200 bg-blue-50/60 px-4 py-2 text-slate-700 ${className || ""}`}
    />
  ),
  hr: ({ className, ...props }) => <hr {...props} className={`my-8 border-slate-200 ${className || ""}`} />,
  table: ({ className, ...props }) => (
    <div className="my-5 overflow-x-auto">
      <table {...props} className={`min-w-full ${className || ""}`} />
    </div>
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
    <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{doc.title}</h2>
          <p className="text-xs text-slate-500">{doc.relativePath}</p>
        </div>
        {doc.pdfHref ? (
          <a href={doc.pdfHref} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm">
              <Download className="mr-1 h-4 w-4" />
              Download PDF
            </Button>
          </a>
        ) : (
          <Button variant="outline" size="sm" disabled title="No exported PDF found for this document">
            <Download className="mr-1 h-4 w-4" />
            PDF Unavailable
          </Button>
        )}
      </div>
      <div className="overflow-auto px-6 py-7">
        <div className="prose prose-slate max-w-4xl text-[15px] leading-7 prose-headings:scroll-mt-24 prose-headings:font-semibold prose-h1:text-3xl prose-h2:mt-10 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:text-slate-700 prose-li:marker:text-slate-400 prose-strong:text-slate-900 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-slate-800 prose-pre:my-5 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-800 prose-img:rounded-lg prose-img:border prose-img:border-slate-200">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug]}
          components={markdownComponents}
        >
          {doc.content}
        </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

