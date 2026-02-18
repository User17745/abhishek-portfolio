# HTML Encoding Issue - Double Encoding of Apostrophes

## Issue Description

The website displays apostrophes as `&amp;#39;` instead of `'` or `&#39;`. For example:
- Expected: "Victoria's Secret"
- Actual: "Victoria&amp;#39;s Secret"

This appears as `&amp;#39;` (double-encoded) in the HTML source.

## Affected Areas

1. **Content Collections (case-studies, blog)** - Frontmatter fields with apostrophes
2. **Case Studies listing page** - Client names with apostrophes
3. **About section** - Bio text containing apostrophes
4. **Skills section** - Any skill text with apostrophes
5. **Experience section** - Job titles/company names with apostrophes

## Root Cause

This is a known issue with **Astro Content Collections** in Astro 5.x combined with the `@astrojs/mdx` integration. The markdown processing pipeline is encoding special characters multiple times.

When markdown is processed:
1. First pass: `'` → `&#39;` (HTML entity)
2. Second pass: `&#39;` → `&amp;#39;` (double-encoded)

The issue occurs specifically with:
- Content collections using markdown/MDX
- Frontmatter fields containing special characters
- The markdown rendering pipeline

## Affected Files

- `src/content/case-studies/*.md` - Case study markdown files
- `src/content/blog/*.md` - Blog post files
- Any content using Astro's content collections with frontmatter

## Potential Solutions

### 1. Use `markdown-it` Configuration
```js
// astro.config.mjs
markdown: {
  html: 'raw'  // Attempted - didn't work
}
```

### 2. Use Custom Decoding Utility
Create a utility function to decode HTML entities after rendering:
```ts
function decodeHTML(html: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&#39;': "'",
    '&apos;': "'",
    '&quot;': '"',
    '&lt;': '<',
    '&gt;': '>',
  };
  return html.replace(/&[#\w]+;/g, entity => entities[entity] || entity);
}
```

### 3. Avoid Apostrophes in Content
Replace `'` with `'` (straight apostrophe) or remove entirely. This is a workaround but not ideal.

### 4. Use Frontmatter Without Special Characters
Keep the frontmatter simple and avoid apostrophes in metadata fields.

### 5. Check for Astro Updates
This may be fixed in a future version of Astro. Monitor:
- https://github.com/withastro/astro/issues/8374
- https://github.com/withastro/astro/issues/9431

## When It Started

This issue appeared in the `feat/chatbot` branch after adding content collections and MDX integration. The main branch may not have this issue if it doesn't use content collections with markdown frontmatter, or it may be a version-specific issue.

## Testing

To verify the fix:
1. Check raw HTML output: `grep "Victoria" dist/client/index.html`
2. Look for `&amp;#39;` (double-encoded) vs `&#39;` (single encoded)
3. Browser should display correctly even with `&#39;` - only `&amp;#39;` is problematic

---
*Documented: 2026-02-19*
