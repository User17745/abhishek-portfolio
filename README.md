# Abhishek Aggarwal - Portfolio

Personal portfolio website showcasing 12+ years of experience in eCommerce, Product Management, Pre-Sales Solutioning, and Program Management.

## Tech Stack

- **Framework:** Astro 5.x (with Vercel SSR adapter)
- **UI Components:** React 19 + shadcn/ui
- **Styling:** Tailwind CSS 4.x
- **Language:** TypeScript
- **Build Tool:** Vite
- **AI/ML:** RAG-based chatbot with LLM integration

## Features

### Core Portfolio
- Responsive design (mobile-first)
- Dark/light mode with system preference detection
- Smooth scroll animations
- SEO optimized with meta tags
- Contact form (Formspree)
- Case studies with MDX content
- Blog section

### AI Chatbot ("Cookie")
- RAG-based career fit analyzer
- Analyzes job descriptions against Abhishek's profile
- Provides fit scores, matches, gaps, and positioning recommendations
- Multi-provider LLM support (OpenRouter, Gemini, ZhipuAI, Nvidia NIM)
- Fallback to secondary providers on failure
- Sidebar UI with persistent chat history

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── sections/              # Page sections (Hero, About, etc.)
│   │   ├── layout/                # Header, Footer, ThemeToggle, CookieToggle
│   │   └── chat/                  # Chatbot components
│   │       ├── ChatSidebar.tsx    # Sidebar panel
│   │       ├── ChatContainer.tsx  # Message handling
│   │       ├── ChatComponent.tsx  # Chat UI
│   │       └── ChatContext.tsx    # State management
│   ├── data/                      # Static content data
│   ├── layouts/                   # Page layouts
│   ├── lib/
│   │   ├── chatbot/               # LLM providers and prompts
│   │   ├── embeddings/            # RAG embedding utilities
│   │   └── utils.ts              # Utility functions
│   ├── pages/
│   │   ├── api/
│   │   │   └── match-resume.ts   # Chatbot API endpoint
│   │   └── chat.astro            # Standalone chat page
│   └── content/                   # MDX content (case studies, blog)
├── docs/
│   ├── resources/rag/            # RAG data and embeddings
│   │   ├── *.md                  # Career profile documents
│   │   ├── chunks.json           # Text chunks
│   │   └── embeddings.json       # Vector embeddings
│   ├── architecture.md
│   └── COOKIE-CHATBOT.md         # Chatbot detailed docs
├── public/                        # Static assets
│   ├── cookie-avatar.gif         # Cookie's avatar
│   └── embeddings.json            # Bundled embeddings
└── .env                           # API keys
```

## Chatbot Architecture

```
User Input (JD/Question)
        │
        ▼
┌───────────────────┐
│  API Endpoint     │  /api/match-resume
│  (Astro SSR)     │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Gemini Embedding │  Text → Vector (3072 dims)
│  API              │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Cosine Similarity│  Find top-k matches
│  Search           │  (k=3)
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  LLM Provider     │  Generate structured response
│  (with fallback)  │  - OpenRouter (primary)
│                   │  - Gemini (fallback 1)
│                   │  - ZhipuAI (fallback 2)
│                   │  - Nvidia NIM (fallback 3)
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Fit Score +      │  JSON response
│  Analysis         │  - fit_score (0-100)
│                   │  - strong_matches[]
│                   │  - partial_matches[]
│                   │  - gaps[]
│                   │  - recommended_positioning
│                   │  - confidence_level
└───────────────────┘
```

## Environment Variables

Create a `.env` file:

```bash
# Gemini (for embeddings)
PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# LLM Providers (at least one required)
PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key
PUBLIC_GEMINI_API_KEY=your_gemini_api_key
PUBLIC_ZHIPUAI_API_KEY=your_zhipuai_api_key
PUBLIC_NVIDIA_API_KEY=your_nvidia_api_key
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server (requires Node.js 18+)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing Chatbot

```bash
# Test API endpoint
curl -X POST http://localhost:4321/api/match-resume \
  -H "Content-Type: application/json" \
  -d '{"jdText": "We are looking for a Senior Product Manager"}'
```

## CI/CD

- **CI:** Runs on all PRs and feature branch pushes
- **Checks:** Lint, typecheck, build
- **CD:** Automatic deployment on main branch to Vercel

## Deployment

Deployed via Vercel with:
- Server-side rendering for dynamic API
- Static generation for pages
- Edge functions for chat API

Required environment variables in Vercel:
- `PUBLIC_GEMINI_API_KEY`
- `PUBLIC_OPENROUTER_API_KEY` (recommended primary)
- `PUBLIC_ZHIPUAI_API_KEY`
- `PUBLIC_NVIDIA_API_KEY`

## Known Issues

- **HTML Encoding:** Content collections may double-encode apostrophes (`'` → `&amp;#39;`). See `docs/HTML_ENCODING_ISSUE.md` for details.

## License

MIT

## Contact

- **Email:** aggarwal039517@gmail.com
- **LinkedIn:** [abhishek-aggarwal-8bb82b100](https://www.linkedin.com/in/abhishek-aggarwal-8bb82b100/)
