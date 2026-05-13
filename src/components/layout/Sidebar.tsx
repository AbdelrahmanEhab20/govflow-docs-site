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

const categoryColors: Record<string, string> = {
  "00_MASTER": "bg-slate-100 text-slate-700",
  "01_EXECUTIVE": "bg-blue-100 text-blue-700",
  "02_ARCHITECTURE": "bg-purple-100 text-purple-700",
  "03_BUSINESS": "bg-green-100 text-green-700",
  "04_DELIVERY": "bg-orange-100 text-orange-700",
  "05_PROPOSAL": "bg-rose-100 text-rose-700",
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
        "shrink-0 overflow-y-auto border-slate-200 bg-white transition-all duration-300",
        "md:h-[calc(100vh-3.5rem)] md:border-r border-b md:border-b-0",
        collapsed
          ? "h-14 overflow-hidden md:h-[calc(100vh-3.5rem)] md:w-20 md:overflow-y-auto"
          : "max-h-[50vh] md:max-h-none md:w-72",
      )}
    >
      <div className="sticky top-0 z-10 mb-3 flex items-center justify-between md:justify-end border-b border-slate-200 bg-white pb-2 pt-2 px-2 backdrop-blur">
        <span className="md:hidden text-sm font-semibold text-slate-700">
          Documents
        </span>
        <Button variant="ghost" size="sm" onClick={onToggle} className="shrink-0">
          <span className="hidden md:block">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </span>
          <span className="md:hidden">
            {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </span>
        </Button>
      </div>

      <div className={cn("px-2", collapsed && "md:px-1")}>
        {categoryOrder.filter((folder) => grouped[folder]?.length).map((folder) => (
          <div key={folder} className="mb-4">
            {!collapsed && (
              <div className={cn("mb-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold", categoryColors[folder])}>
                {categoryNames[folder] || folder}
              </div>
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
                      "flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-all",
                      isActive
                        ? "bg-blue-100 text-blue-900 font-semibold shadow-sm"
                        : isCurrentSection
                          ? "text-slate-700 hover:bg-slate-100"
                          : "text-slate-500 hover:bg-slate-50",
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
            <div key={folder} className="mb-4">
              {!collapsed && (
                <div className="mb-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {categoryNames[folder] || folder}
                </div>
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
                        "flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition-all",
                        isActive
                          ? "bg-blue-100 text-blue-900 font-semibold shadow-sm"
                          : isCurrentSection
                            ? "text-slate-700 hover:bg-slate-100"
                            : "text-slate-500 hover:bg-slate-50",
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
      </div>
    </aside>
  );
}

