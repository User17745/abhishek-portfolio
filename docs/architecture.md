# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        ASTRO APP                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Pages     │  │  Layouts    │  │     Components      │ │
│  │  (Astro)    │  │  (Astro)    │  │  (Astro + React)    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              shadcn/ui Components                    │   │
│  │         (React + Tailwind CSS)                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│                          ▼                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Content   │  │   Styles    │  │      Assets         │ │
│  │ Collections │  │  (Tailwind) │  │     (Images)        │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │    Static Hosting     │
              │  (Vercel / Netlify)   │
              └───────────────────────┘
```

## Technology Stack

### Frontend Framework
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Meta-framework | Astro 4.x | SSG performance, partial hydration |
| UI Components | React 18 | Required for shadcn/ui |
| Component Library | shadcn/ui | Accessible, customizable, Tailwind-based |
| Styling | Tailwind CSS 3.x | Utility-first, rapid development |
| Language | TypeScript | Type safety, better DX |

### Build & Tooling
| Tool | Purpose |
|------|---------|
| Vite | Build tool (Astro default) |
| ESLint | Code linting |
| Prettier | Code formatting |
| Vitest | Unit testing |
| Playwright | E2E testing |

### Deployment
| Component | Choice | Rationale |
|-----------|--------|-----------|
| Hosting | Vercel | Automatic deploys, edge functions |
| Domain | Custom | Professional branding |
| Forms | Formspree/Resend | Contact form handling |

## Component Architecture

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── sections/              # Page sections
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   ├── Brands.astro
│   │   └── Contact.astro
│   ├── layout/                # Layout components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ThemeToggle.tsx
│   └── shared/                # Reusable components
│       ├── ProjectCard.tsx
│       ├── ExperienceCard.tsx
│       └── BrandLogo.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
├── content/
│   └── config.ts              # Content collections
├── lib/
│   └── utils.ts               # Utility functions
└── styles/
    └── global.css
```

## Data Flow

```
┌─────────────────┐
│ Content Files   │  (MDX/JSON for projects, experience)
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
│ (Astro)         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Hydrated React  │  Interactive components only
│ Components      │  (client:visible, client:load)
└─────────────────┘
```

## Performance Strategy

1. **Static Generation** - All pages pre-rendered at build time
2. **Partial Hydration** - Only interactive components ship JS
3. **Image Optimization** - Astro Image component for responsive images
4. **Font Loading** - Preload critical fonts, font-display: swap
5. **CSS** - Tailwind purges unused styles

## Security Considerations

- No sensitive data stored client-side
- Contact form uses CSRF protection (via Formspree)
- No API keys exposed in frontend code
- HTTPS enforced
