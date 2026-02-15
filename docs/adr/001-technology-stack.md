# ADR-001: Technology Stack Selection

## Status
Accepted

## Context
We need to select a technology stack for building a personal portfolio website that:
- Showcases Abhishek's professional experience
- Is performant and SEO-friendly
- Allows for modern UI components
- Is maintainable and easy to update

## Decision

We will use **Astro + React + shadcn/ui + Tailwind CSS**.

### Rationale

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| Next.js | Mature ecosystem, React-native | Heavier bundle, SSR complexity for simple site | Rejected |
| Plain HTML/CSS | Lightest weight | Manual styling, no component system | Rejected |
| **Astro + React** | Best of both: SSG performance + React ecosystem | Learning curve | **Selected** |
| Gatsby | GraphQL integration, plugins | Build complexity, overkill for portfolio | Rejected |

### Why shadcn/ui?
- Accessible by default (Radix UI primitives)
- Fully customizable (copy-paste, not npm package)
- Tailwind-based styling
- Professional design system out of the box

### Why Astro?
- Zero JS by default (opt-in hydration)
- Built-in content collections for projects/experience
- Excellent SEO (static HTML)
- React integration available when needed

## Consequences

### Positive
- Fast page loads (Lighthouse > 90 achievable)
- Modern, professional UI with minimal effort
- Easy content management via Markdown/MDX
- Type-safe with TypeScript

### Negative
- Additional complexity for React integration
- shadcn/ui requires manual component management

### Risks
- Astro version updates may require migration
- Mitigation: Pin versions, update incrementally

## Alternatives Considered

1. **Next.js with shadcn/ui** - More powerful but heavier for a static portfolio
2. **Svelte/SvelteKit** - Lighter but smaller ecosystem, less familiar
3. **Vue/Nuxt** - Good option but team preference for React ecosystem

## Decision Date
2026-02-15

## Decision Makers
- Abhishek Aggarwal (Stakeholder)
- Vibe-Coding Tool (Architect)
