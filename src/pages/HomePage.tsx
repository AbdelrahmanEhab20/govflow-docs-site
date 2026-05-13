import { Link } from "react-router-dom";
import { FileText, Zap, DollarSign, Rocket, BookOpen, FileCheck } from "lucide-react";
import { branding } from "@/lib/branding";
import { docs } from "@/lib/docs";

const cards = [
  {
    to: "/platform",
    title: "Platform",
    description: "Executive and platform overview documentation.",
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    count: docs.filter(d => d.routeSection === "platform").length
  },
  {
    to: "/architecture",
    title: "Architecture",
    description: "Infrastructure, backend, database, and white-label architecture.",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    count: docs.filter(d => d.routeSection === "architecture").length
  },
  {
    to: "/pricing",
    title: "Pricing",
    description: "Commercial model, tiers, and differentiation.",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    count: docs.filter(d => d.routeSection === "pricing").length
  },
  {
    to: "/deployment",
    title: "Deployment",
    description: "Delivery summary, implementation guide, and checklist.",
    icon: Rocket,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    count: docs.filter(d => d.routeSection === "deployment").length
  },
  {
    to: "/docs",
    title: "All Docs",
    description: "Browse all markdown content from the GovFlow docs repository.",
    icon: BookOpen,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    count: docs.length
  },
  {
    to: "/rfp",
    title: "RFP",
    description: "Proposal, SOW, and reusable tender response templates.",
    icon: FileCheck,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    count: docs.filter(d => d.routeSection === "rfp").length
  },
];

export function HomePage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-12">
      <div className="mb-12">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-10 shadow-sm">
          <div className="mb-4 inline-block rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            Documentation Portal
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{branding.appName}</h1>
          <p className="mt-3 text-lg text-slate-600">
            Comprehensive documentation and management portal for {branding.organization}
          </p>
          <p className="mt-2 max-w-2xl text-slate-600">
            Prepared for <span className="font-semibold text-slate-900">{branding.audience}</span>
          </p>
          <p className="mt-4 max-w-3xl text-sm text-slate-500">
            This portal serves as a centralized hub for all procurement-ready GovFlow system documentation, architectural specifications, commercial models, and deployment guidance. Navigate through detailed sections to explore platform capabilities, infrastructure design, pricing models, implementation strategies, and proposal templates.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-2xl font-bold text-slate-900">{docs.length}</span>
              <span className="ml-2 text-slate-600">Total Documents</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-slate-900">6</span>
              <span className="ml-2 text-slate-600">Content Sections</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Documentation Sections</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
              >
                <div className={`${card.bgColor} w-fit rounded-lg p-3 transition-all group-hover:scale-110`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">{card.count} documents</span>
                  <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-600 transition">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-slate-50 p-8">
        <h3 className="text-lg font-semibold text-slate-900">Quick Access Tips</h3>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 text-sm text-slate-600">
          <li className="flex gap-3">
            <span className="font-semibold text-slate-900">•</span>
            <span>Use the search functionality within each section to quickly find relevant content</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-slate-900">•</span>
            <span>View the table of contents on the right panel for document structure navigation</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-slate-900">•</span>
            <span>Download PDF versions of documents using the PDF button in the document header</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-slate-900">•</span>
            <span>Navigate between documents using the sidebar for seamless browsing</span>
          </li>
        </ul>
      </div>
    </main>
  );
}

