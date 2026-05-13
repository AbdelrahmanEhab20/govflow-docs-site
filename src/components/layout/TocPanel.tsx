import { BookMarked } from "lucide-react";
import type { DocHeading } from "@/lib/docs";

interface TocPanelProps {
  headings: DocHeading[];
}

export function TocPanel({ headings }: TocPanelProps) {
  const visibleHeadings = headings.filter((heading) => heading.level <= 3);

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6.5rem)] w-72 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:block">
      <div className="mb-4 flex items-center gap-2">
        <BookMarked className="h-5 w-5 text-slate-600" />
        <h3 className="font-semibold text-slate-900">Table of Contents</h3>
      </div>
      <div className="max-h-[calc(100vh-10rem)] space-y-1 overflow-y-auto pr-2">
        {visibleHeadings.length ? (
          visibleHeadings.map((heading, idx) => (
            <a
              key={`${heading.slug}-${idx}`}
              href={`#${heading.slug}`}
              className="group flex rounded-lg px-3 py-2 text-sm text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900"
              style={{
                marginLeft: `${(heading.level - 1) * 8}px`,
              }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition mr-2 mt-1.5 shrink-0" />
              <span className="truncate">{heading.text}</span>
            </a>
          ))
        ) : (
          <p className="px-3 py-3 text-sm text-slate-500 italic">No headings available for this document.</p>
        )}
      </div>
    </aside>
  );
}

