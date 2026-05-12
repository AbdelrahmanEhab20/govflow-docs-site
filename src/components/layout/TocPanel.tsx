import type { DocHeading } from "@/lib/docs";

interface TocPanelProps {
  headings: DocHeading[];
}

export function TocPanel({ headings }: TocPanelProps) {
  const visibleHeadings = headings.filter((heading) => heading.level <= 3);

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6.5rem)] w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-sm xl:block">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Table of Contents</h3>
      <div className="max-h-[calc(100vh-10rem)] space-y-1 overflow-y-auto pr-1">
        {visibleHeadings.length ? (
          visibleHeadings.map((heading) => (
            <a
              key={`${heading.slug}-${heading.level}`}
              href={`#${heading.slug}`}
              className="block rounded px-2 py-1 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              style={{ paddingLeft: `${(heading.level - 1) * 10}px` }}
            >
              {heading.text}
            </a>
          ))
        ) : (
          <p className="text-sm text-slate-500">No headings available for this document.</p>
        )}
      </div>
    </aside>
  );
}

