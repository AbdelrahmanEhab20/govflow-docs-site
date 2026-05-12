interface BreadcrumbsProps {
  sectionLabel: string;
  docTitle?: string;
}

export function Breadcrumbs({ sectionLabel, docTitle }: BreadcrumbsProps) {
  return (
    <div className="mb-4 text-sm text-slate-500" aria-label="Breadcrumb">
      <span>Home</span> <span className="mx-1">/</span>
      <span>{sectionLabel}</span>
      {docTitle ? (
        <>
          <span className="mx-1">/</span>
          <span className="font-medium text-slate-700">{docTitle}</span>
        </>
      ) : null}
    </div>
  );
}

