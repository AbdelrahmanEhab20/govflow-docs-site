import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { docsBySection, getDocById, type RouteSection } from "@/lib/docs";
import { Sidebar } from "@/components/layout/Sidebar";
import { DocViewer } from "@/components/DocViewer";
import { TocPanel } from "@/components/layout/TocPanel";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Input } from "@/components/ui/input";

const sectionLabel: Record<RouteSection, string> = {
  platform: "Platform",
  architecture: "Architecture",
  pricing: "Pricing",
  deployment: "Deployment",
  docs: "All Docs",
  rfp: "RFP",
};

interface SectionPageProps {
  section: RouteSection;
}

export function SectionPage({ section }: SectionPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [collapsed, setCollapsed] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [query, setQuery] = useState("");
  const docs = docsBySection(section);
  const filteredDocs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docs;
    return docs.filter((doc) => doc.title.toLowerCase().includes(q) || doc.content.toLowerCase().includes(q));
  }, [docs, query]);

  const selectedFromQuery = getDocById(searchParams.get("doc"));
  const selectedDoc = selectedFromQuery && docs.some((doc) => doc.id === selectedFromQuery.id) ? selectedFromQuery : filteredDocs[0] || docs[0];

  const isPresentationDoc = selectedDoc
    ? /12[_-]slide[_-]presentation/i.test(selectedDoc.relativePath) || /12[_-]slide[_-]presentation/i.test(selectedDoc.id)
    : false;

  useEffect(() => {
    if (!selectedDoc) return;
    if (searchParams.get("doc") === selectedDoc.id) return;
    const next = new URLSearchParams(searchParams);
    next.set("doc", selectedDoc.id);
    setSearchParams(next, { replace: true });
  }, [searchParams, selectedDoc, setSearchParams]);

  return (
    <main className="flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)] bg-slate-100">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} currentSection={section} />
      <div className="mx-auto flex w-full min-w-0 max-w-[1680px] flex-col md:flex-row gap-4 px-4 py-4">
        <div className="min-w-0 flex-1">
          <Breadcrumbs sectionLabel={sectionLabel[section]} docTitle={selectedDoc?.title} />
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search in this section..."
              className="border-none p-0 shadow-none focus:ring-0"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          <p className="mb-3 text-xs text-slate-500">
            Showing {filteredDocs.length} of {docs.length} documents
          </p>
          {selectedDoc ? (
            <DocViewer doc={selectedDoc} />
          ) : (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-sm text-slate-600">
              No documents found for this section.
            </div>
          )}
        </div>
        {selectedDoc && !isPresentationDoc ? <TocPanel headings={selectedDoc.headings} /> : null}
      </div>
    </main>
  );
}

