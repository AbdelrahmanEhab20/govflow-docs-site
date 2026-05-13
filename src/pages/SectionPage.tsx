import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, Folder } from "lucide-react";
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

const sectionDescription: Record<RouteSection, string> = {
  platform: "Executive and platform overview documentation",
  architecture: "Infrastructure, backend, database, and white-label architecture",
  pricing: "Commercial model, tiers, and differentiation",
  deployment: "Delivery summary, implementation guide, and checklist",
  docs: "Complete documentation collection from GovFlow docs repository",
  rfp: "Proposal, SOW, and reusable tender response templates",
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
    <main className="flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)] bg-slate-50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} currentSection={section} />
      <div className="mx-auto flex w-full min-w-0 max-w-[1680px] flex-col md:flex-row gap-4 px-4 py-6">
        <div className="min-w-0 flex-1">
          <Breadcrumbs sectionLabel={sectionLabel[section]} docTitle={selectedDoc?.title} />

          {/* Section Header */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Folder className="h-5 w-5 text-blue-600 shrink-0" />
                  <h2 className="text-2xl font-bold text-slate-900">{sectionLabel[section]}</h2>
                </div>
                <p className="text-slate-600 text-sm">{sectionDescription[section]}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-bold text-blue-600">{docs.length}</div>
                <div className="text-xs text-slate-600">documents</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-slate-400 shrink-0" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search documents in this section..."
                className="border-none p-0 shadow-none focus:ring-0 text-base"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition shrink-0"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              ) : null}
            </div>
          </div>

          {/* Document Count */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              Showing <span className="font-bold text-slate-900">{filteredDocs.length}</span> of <span className="font-bold text-slate-900">{docs.length}</span> documents
            </p>
            {query && (
              <p className="text-xs text-slate-500 italic">Filtered by: "{query}"</p>
            )}
          </div>

          {/* Document Viewer */}
          {selectedDoc ? (
            <DocViewer doc={selectedDoc} />
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <Folder className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">No documents found</p>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your search query</p>
            </div>
          )}
        </div>

        {selectedDoc && !isPresentationDoc ? <TocPanel headings={selectedDoc.headings} /> : null}
      </div>
    </main>
  );
}

