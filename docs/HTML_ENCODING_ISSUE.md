# HTML Encoding Issue - Double Encoding of Apostrophes

## Issue Description

The website occasionally displays apostrophes and special characters as their raw HTML entity codes (e.g., `&#x27;` or `&amp;#39;`) instead of rendering the actual character (`'`).

For example:
- **Expected:** "I'll get back to you ASAP!"
- **Actual:** "I&#x27;ll get back to you ASAP!" or "I&amp;#39;ll get back to you ASAP!"

This happens because the characters are being double-encoded during the build and render process.

## Root Causes

This issue stems from two distinct behaviors in our tech stack:

### 1. Astro + React Component Hand-off (The React Escaping Issue)
When Astro passes a text string containing an HTML entity (or a plain apostrophe that Astro encodes) into a React component's slot or prop (e.g., `<CardDescription>I'll...</CardDescription>`), the following happens:
1. Astro parses the string and turns `'` into `&#x27;` or `&#39;`.
2. React receives `&#x27;` as a raw string child.
3. React automatically escapes all string children to prevent XSS, meaning it turns the ampersand `&` into `&amp;`, resulting in `&amp;#x27;` in the DOM. 
4. The browser renders the literal string `&#x27;` on the page instead of the apostrophe.

**Using Astro's `set:html` directly on a React component does NOT prevent React from re-escaping the content internally depending on how the component handles children.**

### 2. Astro Content Collections & MDX
Markdown processing pipelines (like `@astrojs/mdx`) also encode special characters.
1. First pass: `'` → `&#39;` (HTML entity)
2. Second pass: `&#39;` → `&amp;#39;` (double-encoded when passed down)

## The Solution

To definitively solve this, employ these steps:

### Step 1: Use the `decodeHTMLEntities` Utility
We have a robust utility function in `src/lib/utils.ts` that safely decodes multiple layers of HTML encoding, including smart quotes and entities.

```typescript
import { decodeHTMLEntities } from "@/lib/utils";

// Example usage
const cleanText = decodeHTMLEntities(myString);
```

### Step 2: Use Native HTML Elements with `set:html`
To completely bypass React's aggressive escaping of text slots, you must render the text using a **native HTML element** (like `p`, `span`, or `div`) utilizing Astro's `set:html` directive.

**❌ Incorrect (React Component Double-Escapes):**
```astro
import { CardDescription } from "@/components/ui/card";
import { decodeHTMLEntities } from "@/lib/utils";

<!-- React will escape the output of decodeHTMLEntities -->
<CardDescription set:html={decodeHTMLEntities("I'll be there")} />
```

**✅ Correct (Native HTML Tag):**
```astro
import { decodeHTMLEntities } from "@/lib/utils";

<!-- Native p tag allows Astro to inject raw HTML directly into the DOM -->
<p class="text-sm text-muted-foreground" set:html={decodeHTMLEntities("I'll be there")} />
```

### Step 3: Replace Wrapper React Components if Necessary
If replacing the inner component with a native HTML tag breaks the layout because it was wrapped inside a React structural component (like `<Card>`), recreate that structure using native HTML tags with identical Tailwind classes. This keeps the rendering entirely within Astro's control.

```html
<div class="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
  <div class="flex flex-col space-y-1.5 p-6">
     <p class="text-sm text-muted-foreground" set:html={decodeHTMLEntities("I'll get back to you ASAP!")} />
  </div>
</div>
```

---
*Updated: Feb 2026*
