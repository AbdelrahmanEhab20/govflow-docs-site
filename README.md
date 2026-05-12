# GovFlow Docs Site

Production-ready documentation and proposal portal for GovFlow.

## Stack
- React 18 + TypeScript + Vite
- TailwindCSS
- shadcn-style UI primitives
- React Router v6
- Markdown rendering (`react-markdown`, `remark-gfm`, `rehype-highlight`)

## Routes
- `/` Home
- `/platform`
- `/architecture`
- `/pricing`
- `/deployment`
- `/docs`
- `/rfp`

## Data Source
The site loads **real markdown files** from:

- `../test-govflow/docs/**/*.md`

Folder-to-route mapping:
- `01_EXECUTIVE` -> `/platform`
- `02_ARCHITECTURE` -> `/architecture`
- `03_BUSINESS` -> `/pricing`
- `04_DELIVERY` -> `/deployment`
- `05_PROPOSAL` -> `/rfp`
- `00_MASTER` and all docs -> `/docs`

## Features
- Auto-generated sidebar from docs folder structure
- Document viewer with headings, tables, and code blocks
- Auto Table of Contents from markdown headings
- Breadcrumb navigation
- Basic in-section search
- PDF download button (enabled when matching file exists in exports folder)
- White-label branding config (`src/lib/branding.ts`)
- Responsive layout and RTL-ready foundation

## Run Locally
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run preview
```
