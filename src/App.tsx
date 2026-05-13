import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { SectionPage } from "@/pages/SectionPage";
import { TopNav } from "@/components/layout/TopNav";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900">
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/platform" element={<SectionPage section="platform" />} />
        <Route path="/architecture" element={<SectionPage section="architecture" />} />
        <Route path="/pricing" element={<SectionPage section="pricing" />} />
        <Route path="/deployment" element={<SectionPage section="deployment" />} />
        <Route path="/docs" element={<SectionPage section="docs" />} />
        <Route path="/rfp" element={<SectionPage section="rfp" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
