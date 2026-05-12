import { Download } from "lucide-react";
import type { DocRecord } from "@/lib/docs";
import { Button } from "@/components/ui/button";
import govFlowPdf from "@/assets/GovFlow_Sovereign_Workflow_Platform.pdf";

interface PresentationDeckProps {
  doc: DocRecord;
}

export function PresentationDeck({ doc }: PresentationDeckProps) {
  return (
    <div className="flex flex-col min-w-0 flex-1 rounded-lg border border-slate-200 bg-white overflow-hidden h-[calc(100vh-8rem)] min-h-[600px]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{doc.title} (Slides View)</h2>
          <p className="text-xs text-slate-500">{doc.relativePath}</p>
        </div>
        <div className="flex gap-2">
          <a href={govFlowPdf} download="GovFlow_Sovereign_Workflow_Platform.pdf" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" title="Download Presentation PDF">
              <Download className="mr-1 h-4 w-4" />
              Download PDF Presentation
            </Button>
          </a>
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

      <div className="flex-1 bg-slate-100 w-full">
        <iframe
          src={`${govFlowPdf}#view=FitH`}
          className="w-full h-full border-0"
          title="GovFlow Presentation"
        />
      </div>
    </div>
  );
}
