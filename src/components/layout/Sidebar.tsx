import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { docs, type RouteSection } from "@/lib/docs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categoryNames: Record<string, string> = {
  "00_MASTER": "Master",
  "01_EXECUTIVE": "Executive",
  "02_ARCHITECTURE": "Architecture",
  "03_BUSINESS": "Business",
  "04_DELIVERY": "Delivery",
  "05_PROPOSAL": "Proposal",
};
const categoryOrder = ["00_MASTER", "01_EXECUTIVE", "02_ARCHITECTURE", "03_BUSINESS", "04_DELIVERY", "05_PROPOSAL"];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentSection: RouteSection;
}

export function Sidebar({ collapsed, onToggle, currentSection }: SidebarProps) {
  const location = useLocation();
  const grouped = docs.reduce<Record<string, typeof docs>>((acc, doc) => {
    acc[doc.categoryFolder] ||= [];
    acc[doc.categoryFolder].push(doc);
    return acc;
  }, {});

  return (
    <aside
      className={cn(
        "shrink-0 overflow-y-auto border-slate-200 bg-slate-50/95 p-2 transition-all duration-300",
        "md:h-[calc(100vh-3.5rem)] md:border-r border-b md:border-b-0",
        collapsed 
          ? "h-14 overflow-hidden md:h-[calc(100vh-3.5rem)] md:w-16 md:overflow-y-auto" 
          : "max-h-[50vh] md:max-h-none md:w-80",
      )}
    >
      <div className="sticky top-0 z-10 mb-3 flex items-center justify-between md:justify-end border-b border-slate-200 bg-slate-50/95 pb-2 pt-1 backdrop-blur">
        <span className="md:hidden text-sm font-semibold text-slate-700 px-2">
          Document Navigation
        </span>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          <span className="hidden md:block">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </span>
          <span className="md:hidden">
            {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </span>
        </Button>
      </div>
      {categoryOrder.filter((folder) => grouped[folder]?.length).map((folder) => (
        <div key={folder} className="mb-3">
          {!collapsed && (
            <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {categoryNames[folder] || folder}
            </p>
          )}
          <div className="space-y-1">
            {grouped[folder].map((doc) => {
              const to = `/${doc.routeSection}?doc=${doc.id}`;
              const isActive = location.pathname.startsWith(`/${doc.routeSection}`) && new URLSearchParams(location.search).get("doc") === doc.id;
              const isCurrentSection = currentSection === doc.routeSection;
              return (
                <Link
                  key={doc.id}
                  to={to}
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.innerWidth < 768 && !collapsed) {
                      onToggle();
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                    isActive ? "bg-brand-100 text-brand-900" : isCurrentSection ? "text-slate-700 hover:bg-slate-100" : "text-slate-500 hover:bg-slate-100",
                  )}
                  title={doc.title}
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{doc.title}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      {Object.entries(grouped)
        .filter(([folder]) => !categoryOrder.includes(folder))
        .map(([folder, docsInFolder]) => (
        <div key={folder} className="mb-3">
          {!collapsed && (
            <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {categoryNames[folder] || folder}
            </p>
          )}
          <div className="space-y-1">
            {docsInFolder.map((doc) => {
              const to = `/${doc.routeSection}?doc=${doc.id}`;
              const isActive = location.pathname.startsWith(`/${doc.routeSection}`) && new URLSearchParams(location.search).get("doc") === doc.id;
              const isCurrentSection = currentSection === doc.routeSection;
              return (
                <Link
                  key={doc.id}
                  to={to}
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.innerWidth < 768 && !collapsed) {
                      onToggle();
                    }
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                    isActive ? "bg-brand-100 text-brand-900" : isCurrentSection ? "text-slate-700 hover:bg-slate-100" : "text-slate-500 hover:bg-slate-100",
                  )}
                  title={doc.title}
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="truncate">{doc.title}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}

