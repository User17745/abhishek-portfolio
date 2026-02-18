# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ASTRO APPLICATION                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐   │
│  │   Pages     │  │  Layouts    │  │      Components         │   │
│  │  (Astro)    │  │  (Astro)    │  │   (Astro + React)      │   │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘   │
│                          │                                           │
│                          ▼                                           │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                    shadcn/ui Components                      │  │
│  │               (React + Tailwind CSS)                         │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴────────                    ▼                               ▼───────┐

        ┌───────────────────────┐       ┌───────────────────────┐
        │   Static Hosting      │       │   Server API          │
        │    (Vercel)          │       │  (Chatbot /match-resume)│
        └───────────────────────┘       └───────────────────────┘
```

## Technology Stack

### Frontend Framework
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Meta-framework | Astro 5.x | SSR support, partial hydration |
| UI Components | React 19 | Required for shadcn/ui |
| Component Library | shadcn/ui | Accessible, customizable, Tailwind-based |
| Styling | Tailwind CSS 4.x | Utility-first, rapid development |
| Language | TypeScript | Type safety, better DX |

### Build & Deployment
| Tool | Purpose |
|------|---------|
| Vite | Build tool (Astro default) |
| ESLint | Code linting |
| Prettier | Code formatting |
| Vercel | Hosting + Server functions |

### AI/ML Stack
| Component | Technology |
|-----------|------------|
| Embeddings | Gemini embedding-001 (1536-dim) |
| Vector Similarity | Cosine similarity |
| LLM Providers | OpenRouter, Gemini, ZhipuAI, Nvidia NIM |
| RAG | Custom implementation with JSON embeddings |

## Component Architecture

```
src/
├── components/
│   ├── ui/                         # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── sections/                   # Page sections
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   ├── Brands.astro
│   │   └── Contact.astro
│   ├── layout/                     # Layout components
│   │   ├── Header.astro           # Includes CookieToggle
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.tsx
│   │   └── CookieToggle.tsx        # Chat toggle in header
│   └── chat/                       # Chatbot components
│       ├── ChatSidebar.tsx         # Sidebar panel (right side)
│       ├── ChatContainer.tsx        # Message handling logic
│       ├── ChatComponent.tsx       # Chat UI (messages + input)
│       └── ChatContext.tsx         # React context for state
├── layouts/
│   └── Layout.astro                # Main layout with ChatSidebar
├── pages/
│   ├── index.astro                 # Homepage
│   ├── chat.astro                  # Standalone chat page
│   ├── case-studies/               # Case study pages
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── api/
│       └── match-resume.ts         # Chatbot API endpoint
├── content/                        # MDX content
│   ├── config.ts                   # Content collections schema
│   ├── case-studies/               # Case study MDX files
│   └── blog/                       # Blog post MDX files
├── data/                           # Static data
│   ├── projects.ts
│   ├── experience.ts
│   ├── brands.ts
│   └── summary.ts
├── lib/
│   ├── utils.ts                    # Utilities (cn, decodeHTML)
│   ├── config.ts                   # Site configuration
│   ├── chatbot/
│   │   ├── llm-providers.ts       # Multi-provider LLM calls
│   │   ├── system-prompt.ts       # Cookie's prompt
│   │   └── gemini.ts              # Gemini API helpers
│   └── embeddings/
│       ├── gemini.ts               # Embedding generation
│       ├── cosineSimilarity.ts     # Vector similarity
│       └── search.ts                # Top-k search
└── styles/
    └── global.css
```

## Chatbot Architecture (Cookie)

### Data Flow

```
┌─────────────────┐
│  User Input     │  Job description or question
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  API Endpoint   │  POST /api/match-resume
│  (SSR)         │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌──────────────┐
│ Gemini  │ │ Bundled      │
│ Embed-  │ │ Embeddings   │
│ ding    │ │ (38 chunks)  │
│ API     │ │ JSON         │
└────┬────┘ └──────┬───────┘
     │              │
     └──────┬───────┘
            │
            ▼
┌─────────────────┐
│  Cosine         │  Find top-3 similar chunks
│  Similarity     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Context        │  Combine top chunks
│  Preparation    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  LLM Provider   │  Generate structured response
│  (with         │  - OpenRouter (primary, fastest)
│   fallback)    │  - Gemini (fallback)
│                │  - ZhipuAI (fallback)
│                │  - Nvidia NIM (fallback)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  JSON Response  │
│  - fit_score   │
│  - matches     │
│  - gaps        │
│  - positioning │
└─────────────────┘
```

### RAG Data

- **Source Documents:** 8 markdown files in `docs/resources/rag/`
  - `career-journey.md`
  - `ecommerce.md`
  - `product-manager.md`
  - `pre-sales-solutions-engineering.md`
  - `project-portfolio.md`
  - `program-management-office-pmo.md`
  - `shopify-tpm.md`
  - `technical-project-manager-tpm.md`

- **Chunks:** 38 text chunks with metadata
- **Embeddings:** Pre-generated Gemini embeddings (1536-dim), bundled at build time

### UI Components

| Component | Description |
|-----------|-------------|
| `ChatSidebar` | Fixed right sidebar, appears under header |
| `ChatButton` | "Interview me right now!" button in Hero |
| `CookieToggle` | Icon in header nav (next to theme toggle) |
| `ChatComponent` | Messages list + input area |
| `ChatContainer` | Message state + API calls |

### API Response Format

```json
{
  "fit_score": 92,
  "strong_matches": [...],
  "partial_matches": [...],
  "gaps": [],
  "recommended_positioning": "A seasoned product leader...",
  "confidence_level": "High"
}
```

## Data Flow (Content)

```
┌─────────────────┐
│ Content Files   │  (MDX for case studies, blog)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Astro Content   │  Type-safe content queries
│ Collections     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Page Templates  │  Static generation at build time
│ (Astro)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Hydrated React  │  Interactive components only
│ Components      │  (client:visible, client:load)
└─────────────────┘
```

## Performance Strategy

1. **Static Generation** - Most pages pre-rendered at build time
2. **Partial Hydration** - Only interactive components ship JS
3. **Bundled Embeddings** - Embeddings JSON copied at build time
4. **API Fallbacks** - Multiple LLM providers for reliability
5. **Image Optimization** - Astro Image component
6. **Font Loading** - Preload critical fonts

## Security Considerations

- API keys use `PUBLIC_` prefix (exposed to client but safe for public APIs)
- No sensitive data stored client-side
- Contact form uses Formspree (handles CSRF)
- HTTPS enforced via Vercel
- Environment variables set in Vercel dashboard (not committed)

## Known Issues

- **HTML Encoding:** Content collections may double-encode apostrophes. See `docs/HTML_ENCODING_ISSUE.md`.
