import { Download, ShieldCheck, Workflow, FileText, Users, Plug, BarChart3, Sparkles, type LucideIcon } from "lucide-react";
import type { DocRecord } from "@/lib/docs";
import { Button } from "@/components/ui/button";

interface SlideContent {
  title: string;
  subtitle?: string;
  bullets: string[];
}

function extractSlides(markdown: string): SlideContent[] {
  const sections = markdown.split(/\n##\s+Slide\s+\d+\s+—\s+/i).slice(1);
  return sections.map((sectionRaw) => {
    const lines = sectionRaw.split("\n").map((line) => line.trimEnd());
    const header = lines[0] || "Slide";
    const body = lines.slice(1);
    const title = header.trim();
    const bullets = body
      .filter((line) => line.startsWith("- "))
      .map((line) => line.replace(/^- /, "").trim());
    const subtitleLine = body.find((line) => line && !line.startsWith("- ") && !line.startsWith("###") && !line.startsWith("|"));
    return {
      title,
      subtitle: subtitleLine || undefined,
      bullets,
    };
  });
}

function SlideOne() {
  return (
    <section className="gov-slide gov-slide-dark">
      <div className="gov-slide-top-accent" />
      <div className="gov-slide-sidebar-accent" />
      <div className="gov-slide-shell">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-cyan-500/90" />
            <div>
              <p className="text-xl font-bold text-white">SW Solutions</p>
              <p className="text-xs text-slate-300">Enterprise Technology Partner</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="h-2 w-10 rounded bg-cyan-400/80" />
            <div className="h-2 w-10 rounded bg-sky-400/80" />
            <div className="h-2 w-10 rounded bg-cyan-700/80" />
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
            <ShieldCheck className="h-4 w-4" />
            UAE Government Ready
          </div>
          <h2 className="text-6xl font-extrabold tracking-tight text-white">
            Gov<span className="text-cyan-400">Flow</span>
          </h2>
          <p className="mt-3 text-2xl text-slate-300">Sovereign-Ready Workflow Platform for UAE Government and Enterprise</p>
          <p className="mt-2 text-xl font-semibold text-cyan-300">Digital Transformation • Process Automation • Compliance</p>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { icon: Users, title: "Multi-Tenant", desc: "White-label delivery per entity with branding and policy profiles" },
            { icon: ShieldCheck, title: "Sovereign-Ready", desc: "Designed for UAE compliance posture and GCC scale expansion" },
            { icon: BarChart3, title: "Scalable", desc: "Supports standard processes across multiple entities" },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <item.icon className="mb-2 h-6 w-6 text-cyan-300" />
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SlideTwo() {
  return (
    <section className="gov-slide gov-slide-light">
      <div className="gov-slide-shell">
        <div className="rounded-t-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
          <p className="text-2xl font-bold text-white">Government Workflow Challenges</p>
          <p className="text-sm text-slate-300">Current operating pain points and inefficiencies</p>
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-4 rounded-b-xl border border-slate-200 bg-white p-5">
          <div>
            <p className="text-lg font-semibold text-slate-900">Current Operating Pain Points</p>
            <div className="mt-3 space-y-3">
              {[
                "Fragmented Approvals — Approvals scattered across email, spreadsheets, and disconnected tools",
                "Slow Response Cycles — Manual follow-up and unclear ownership causing delays",
                "Limited Visibility — No insight into workload, delays, and bottlenecks across departments",
              ].map((item) => (
                <div key={item} className="rounded-lg border-l-4 border-red-400 bg-slate-50 p-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {[
                ["45%", "Process Delays"],
                ["3.2x", "Cost Increase"],
                ["68%", "Manual Tasks"],
                ["24h", "Avg. Response"],
              ].map(([num, label]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-white p-3 text-center">
                  <p className="text-2xl font-bold text-slate-900">{num}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              <strong>GovFlow Solution:</strong> Unified digital workflow platform built specifically for public sector operating models.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideThree() {
  return (
    <section className="gov-slide gov-slide-light">
      <div className="gov-slide-shell">
        <div className="rounded-t-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
          <p className="text-2xl font-bold text-white">GovFlow Solution Overview</p>
          <p className="text-sm text-slate-300">Unified digital workflow platform for public sector</p>
        </div>
        <div className="rounded-b-xl border border-slate-200 bg-white p-5">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-4xl font-bold text-slate-900">Sovereign-Ready Workflow Platform</p>
            <p className="mt-2 text-lg text-emerald-900">
              Built specifically for UAE government and enterprise needs. Standardizes workflows, approvals, and task execution with role-based governance and white-label delivery capabilities.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-3">
            {[
              { icon: Workflow, title: "Workflow Orchestration" },
              { icon: FileText, title: "Document Operations" },
              { icon: Users, title: "Cross-Entity Collaboration" },
              { icon: Plug, title: "System Integration" },
              { icon: BarChart3, title: "Reporting Dashboard" },
            ].map(({ icon: CardIcon, title }) => {
              const Icon = CardIcon as LucideIcon;
              return (
                <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
                  <Icon className="mx-auto h-8 w-8 text-cyan-600" />
                  <p className="mt-2 text-sm font-semibold text-slate-900">{title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function GenericSlide({ index, slide, total }: { index: number; slide: SlideContent; total: number }) {
  return (
    <section className="gov-slide gov-slide-dark">
      <div className="gov-slide-top-accent" />
      <div className="gov-slide-shell">
        <div className="mb-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">GovFlow Presentation</p>
            <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
            {slide.subtitle ? <p className="text-sm text-slate-300">{slide.subtitle}</p> : null}
          </div>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
            Slide {index + 1} / {total}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {slide.bullets.length > 0 ? (
            slide.bullets.map((bullet, bulletIndex) => (
              <div key={`${bullet}-${bulletIndex}`} className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-100">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-0.5 text-xs font-medium text-cyan-200">
                  <Sparkles className="h-3 w-3" />
                  Key Point
                </div>
                <p className="text-sm leading-6">{bullet}</p>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-slate-300">
              Content available in the source markdown.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface PresentationDeckProps {
  doc: DocRecord;
}

export function PresentationDeck({ doc }: PresentationDeckProps) {
  const slides = extractSlides(doc.content);

  const handleDownloadWholePdf = () => {
    window.print();
  };

  return (
    <div className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{doc.title} (Slides View)</h2>
          <p className="text-xs text-slate-500">{doc.relativePath}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadWholePdf} title="Use browser Save as PDF to export all slides">
            <Download className="mr-1 h-4 w-4" />
            Download Full 12 as PDF
          </Button>
          {doc.pdfHref ? (
            <a href={doc.pdfHref} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm">
                <Download className="mr-1 h-4 w-4" />
                Download Provided PDF
              </Button>
            </a>
          ) : null}
        </div>
      </div>

      <div id="print-deck" className="space-y-6 bg-slate-100 p-6">
        <SlideOne />
        <SlideTwo />
        <SlideThree />
        {slides.slice(3).map((slide, index) => (
          <GenericSlide key={`${slide.title}-${index}`} index={index + 3} slide={slide} total={Math.max(12, slides.length)} />
        ))}
      </div>
    </div>
  );
}

