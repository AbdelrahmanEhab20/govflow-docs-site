import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  sectionLabel: string;
  docTitle?: string;
}

export function Breadcrumbs({ sectionLabel, docTitle }: BreadcrumbsProps) {
  return (
    <nav className="mb-6 flex items-center gap-1 text-sm" aria-label="Breadcrumb">
      <Link to="/" className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition">
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <ChevronRight className="h-4 w-4 text-slate-400" />
      <span className="text-slate-700 font-medium">{sectionLabel}</span>
      {docTitle ? (
        <>
          <ChevronRight className="h-4 w-4 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate" title={docTitle}>{docTitle}</span>
        </>
      ) : null}
    </nav>
  );
}

