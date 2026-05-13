# Sample Markdown - Rendering Example

This document demonstrates how markdown files will be rendered with the new enhanced styling in the GovFlow Documentation Portal.

## Main Section Header

This is a typical body paragraph with regular text content. The portal uses improved typography with better spacing, line height, and readability. Links are [styled in blue](https://example.com) and open in a new tab for external URLs.

### Subsection Header

This subsection demonstrates the visual hierarchy. Notice how the spacing and sizing create a clear structure for the content.

## Text Formatting Examples

This paragraph demonstrates **bold text** for emphasis and *italic text* for secondary emphasis. You can also use ***bold italic*** for additional emphasis. There's also `inline code` which is highlighted with a light background.

## Lists

### Unordered Lists:
- First item in the list
- Second item with more detail
  - Nested item appears indented
  - Another nested item
- Third item back at the top level

### Ordered Lists:
1. First numbered item
2. Second numbered item
   1. Nested numbered item
   2. Another nested item
3. Third item at the top level

## Code Blocks

Here's an example of a code block with syntax highlighting:

```typescript
interface DocRecord {
  id: string;
  title: string;
  routeSection: RouteSection;
  categoryFolder: string;
  relativePath: string;
  content: string;
  headings: DocHeading[];
  pdfHref?: string;
}

export const docs: DocRecord[] = Object.entries(mdModules)
  .map(([filePath, content]) => {
    // Processing logic here
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
```

## Blockquotes

> This is a blockquote that appears with a left border and background color. It's commonly used for important information, notes, or highlighting key concepts in the documentation.

> **Note:** Blockquotes can contain multiple paragraphs and other formatting elements like lists or links.

## Tables

Here's an example of how tables are rendered with proper styling:

| Feature | Description | Status |
|---------|-------------|--------|
| Color-Coded Sections | Each section has a unique color theme | ✅ |
| Typography Hierarchy | Improved heading sizes and spacing | ✅ |
| Enhanced Navigation | Better breadcrumbs and navigation | ✅ |
| Responsive Design | Works on mobile, tablet, and desktop | ✅ |
| Document Search | Advanced search with filtering | ✅ |
| PDF Download | Download documents as PDF | ✅ |

## Horizontal Rules

---

Horizontal rules are rendered with improved spacing and styling for visual separation between sections.

---

## Mixed Content Example

### Implementation Guide

This section demonstrates how complex documentation content is rendered. The portal maintains proper styling across all content types.

**Step 1: Installation**

First, install the required dependencies:

```bash
npm install @package-name
yarn add @package-name
```

**Step 2: Configuration**

Create a configuration file with the following structure:

```typescript
const config = {
  // Configuration options
  apiEndpoint: "https://api.example.com",
  timeout: 5000,
  retries: 3,
};
```

**Step 3: Integration**

Integrate the module into your application. Here's a simple example:

1. Import the module
2. Configure the settings
3. Initialize the service
4. Start using it in your application

**Important:** Always follow best practices for security and performance.

## Key Features Section

The portal now highlights these important features:

- **Professional Design**: Modern, clean interface
- **Better Typography**: Improved readability and hierarchy
- **Responsive Layout**: Works on all devices
- **Enhanced Navigation**: Easy to browse documentation
- **Color Organization**: Visual grouping of related content
- **Search Functionality**: Find content quickly
- **PDF Export**: Download important documents

## Conclusion

This enhanced markdown rendering creates a professional, well-organized documentation portal that's easy to navigate and read. The improved styling ensures that complex technical documentation is presented clearly and accessibly.

> The GovFlow Documentation Portal is now ready for enterprise use with improved styling, better organization, and professional appearance.

---

## Additional Resources

- [Homepage](https://example.com) - Portal homepage
- [Architecture Documentation](https://example.com/architecture) - System architecture
- [Deployment Guide](https://example.com/deployment) - Implementation guide
- [API Documentation](https://example.com/api) - API reference

---

*Last updated: 2026-05-13 | Portal Version: 2.0*
