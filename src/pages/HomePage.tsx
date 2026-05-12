import { Link } from "react-router-dom";
import { branding } from "@/lib/branding";

const cards = [
  { to: "/platform", title: "Platform", description: "Executive and platform overview documentation." },
  { to: "/architecture", title: "Architecture", description: "Infrastructure, backend, database, and white-label architecture." },
  { to: "/pricing", title: "Pricing", description: "Commercial model, tiers, and differentiation." },
  { to: "/deployment", title: "Deployment", description: "Delivery summary, implementation guide, and checklist." },
  { to: "/docs", title: "All Docs", description: "Browse all markdown content from the GovFlow docs repository." },
  { to: "/rfp", title: "RFP", description: "Proposal, SOW, and reusable tender response templates." },
];

export function HomePage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-10">
      <div className="mb-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{branding.appName}</h1>
        <p className="mt-2 text-slate-600">Prepared for {branding.audience}</p>
        <p className="mt-1 max-w-3xl text-slate-500">Documentation and proposal portal for procurement-ready GovFlow content.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow"
          >
            <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

