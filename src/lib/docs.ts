import { slugify } from "@/lib/utils";

export type RouteSection =
  | "platform"
  | "architecture"
  | "pricing"
  | "deployment"
  | "docs"
  | "rfp";

export interface DocHeading {
  level: number;
  text: string;
  slug: string;
}

export interface DocRecord {
  id: string;
  title: string;
  routeSection: RouteSection;
  categoryFolder: string;
  relativePath: string;
  content: string;
  headings: DocHeading[];
  pdfHref?: string;
}

const sectionByFolder: Record<string, RouteSection> = {
  "01_EXECUTIVE": "platform",
  "02_ARCHITECTURE": "architecture",
  "03_BUSINESS": "pricing",
  "04_DELIVERY": "deployment",
  "05_PROPOSAL": "rfp",
  "00_MASTER": "docs",
};

const mdModules = import.meta.glob("../../../test-govflow/docs/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const pdfModules = import.meta.glob("../../../test-govflow/docs/99_EXPORTS/pdf/**/*.pdf", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

function extractHeadings(content: string) {
  const results: DocHeading[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = /^(#{1,6})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].trim();
    results.push({ level, text, slug: slugify(text) });
  }
  return results;
}

function getPdfHref(fileNameNoExt: string) {
  const key = Object.keys(pdfModules).find((pdfPath) =>
    pdfPath.toLowerCase().endsWith(`/${fileNameNoExt.toLowerCase()}.pdf`),
  );
  return key ? pdfModules[key] : undefined;
}

export const docs: DocRecord[] = Object.entries(mdModules)
  .map(([filePath, content]) => {
    const marker = "/docs/";
    const idx = filePath.lastIndexOf(marker);
    const relativePath = idx >= 0 ? filePath.slice(idx + marker.length) : filePath;
    const parts = relativePath.split("/");
    const categoryFolder = parts[0] || "root";
    const fileName = parts[parts.length - 1] || "";
    const fileNameNoExt = fileName.replace(/\.md$/i, "");
    const routeSection = sectionByFolder[categoryFolder] || "docs";
    const headings = extractHeadings(content);
    const title = headings[0]?.text || fileNameNoExt.replace(/_/g, " ");
    const id = slugify(`${categoryFolder}-${fileNameNoExt}`);

    return {
      id,
      title,
      routeSection,
      categoryFolder,
      relativePath,
      content,
      headings,
      pdfHref: getPdfHref(fileNameNoExt),
    };
  })
  .sort((a, b) => a.relativePath.localeCompare(b.relativePath));

export function docsBySection(section: RouteSection) {
  if (section === "docs") return docs;
  return docs.filter((doc) => doc.routeSection === section);
}

export function getDocById(id?: string | null) {
  if (!id) return undefined;
  return docs.find((doc) => doc.id === id);
}

