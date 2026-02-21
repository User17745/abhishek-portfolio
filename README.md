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
- Contact form (Jira API integration to Kanban board)
- Case studies with MDX content
- Blog section
- Global CSS variables for easy theming

### AI Chatbot ("Cookie")

- **RAG-based career fit analyzer** - Analyzes job descriptions against Abhishek's profile
- **Provides fit scores, matches, gaps, and positioning recommendations**
- **Multi-provider LLM support** - OpenRouter, Gemini, ZhipuAI, Nvidia NIM (with automatic fallback)
- **Witty personality** - Cookie is Abhishek's professional yet playful AI assistant
- **Smart suggestions** - Offers relevant follow-up questions
- **Persistent chat history** - Stores conversations in localStorage
- **Sidebar UI with drag-n-drop** - Drop resumes directly into the chat
- **Resume upload reminder** - Prompts users to upload/copy paste resume for better analysis
- **JD Requirements Extraction** - Automatically extracts "What are you looking for" keywords
- **"Don't trust Cookie" disclaimer** - Clarifies that AI agents should be verified
- **Dynamic Header** - Cookie's avatar appears in the header when the chat is active
- **Perfectly Centered Title** - Ensuring the chat header looks premium with balanced side containers

### Chatbot Features
- **Fitment Analysis**:
  - Fit score (0-100%) with visual progress bar
  - JD requirements section (extracted keywords)
  - Strong matches, partial matches, and gaps (2-3 word phrases)
  - "Abhishek For This Role?" positioning guidance with expanded context
  - Confidence level indicator
- **Conversation mode** - Natural chat responses for career questions
- **Witty fallback responses** - "Hmm, my cookie jar seems empty on that one!" for unknown queries
- **iMessage-style UI** - Beautiful chat bubbles with timestamps
- **Responsive design** - Works seamlessly on mobile and desktop

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
│   ├── architecture.md             # Architecture documentation
│   ├── COOKIE-CHATBOT.md         # Chatbot detailed docs
│   ├── RAG_UPDATE_GUIDE.md       # RAG update instructions
│   └── HTML_ENCODING_ISSUE.md    # Known HTML encoding issues
├── public/                        # Static assets
│   ├── cookie-avatar.gif         # Cookie's avatar
│   └── embeddings.json            # Bundled embeddings
├── scripts/
│   ├── update-rag.mjs           # Full RAG update automation
│   ├── generate-rag-chunks.mjs  # Generate RAG chunks
│   └── generate-embeddings.mjs  # Generate embeddings
└── .env                           # API keys (gitignored)
```

## Chatbot Architecture

```
User Input (JD/Question)
         ▼
    ┌───────────────────┐
    │  API Endpoint     │  /api/match-resume
    │  (Astro SSR)     │
    └───────────────────┘
         │
         ▼
    ┌───────────────────┐
    │  Gemini Embedding │  Text → Vector (3072 dims)
    │  API              │
    └───────────────────┘
         │
         ▼
    ┌───────────────────┐
    │  Cosine Similarity│  Find top-k matches
    │  Search           │  (k=3-5)
    └───────────────────┘
         │
         ▼
    ┌───────────────────┐
    │  LLM Provider     │  Generate structured response
    │  (with fallback)  │  - OpenRouter (primary)
    │                   │  - Gemini (fallback 1)
    │                   │  - ZhipuAI (fallback 2)
    │                   │  - Nvidia NIM (fallback 3)
    └───────────────────┘
         │
         ▼
    Fit Score +     │  JSON response
    Analysis         │  - fit_score (0-100)
    │                 │  - strong_matches[]
    │                 │  - partial_matches[]
    │                 │  - gaps[]
    │                 │  - recommended_positioning
    │                 │  - confidence_level
    │                 │  - what_looking_for (optional)
    └───────────────────┘
```

## Environment Variables

Create a `.env` file in the project root:

```bash
# IMPORTANT: Use private env vars (NOT PUBLIC_) to prevent key exposure
# These are server-side only and won't be exposed to the client

# Gemini (for embeddings) - Required
GEMINI_API_KEY=your_gemini_api_key

# LLM Providers (at least one required)
OPENROUTER_API_KEY=your_openrouter_api_key
GEMINI_API_KEY=your_gemini_api_key
ZHIPUAI_API_KEY=your_zhipuai_api_key
NVIDIA_API_KEY=your_nvidia_api_key

# Jira Setup (for Contact Form)
ATLASSIAN_JIRA_API_TOKEN=your_jira_token
JIRA_PROJECT_URL=https://your-domain.atlassian.net/jira/software/projects/KAN/boards/1
JIRA_NAME_FIELD_ID=customfield_10105
JIRA_EMAIL_FIELD_ID=customfield_10106
JIRA_PHONE_FIELD_ID=customfield_10107
JIRA_MESSAGE_FIELD_ID=customfield_10108
JIRA_USER_EMAIL=your_email@domain.com
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server (requires Node.js 18+)
npm run dev
```

## RAG Knowledge Base Updates

### Quick Update Command

```bash
npm run rag:update
```

This single command will:
1. Generate RAG chunks from all markdown files in `docs/resources/rag/`
2. Generate embeddings for all chunks using Gemini API
3. Copy embeddings to `public/embeddings.json` for production use

### Individual Steps

If you need to run individual steps:

```bash
# Generate chunks only
npm run rag:chunks

# Generate embeddings only
npm run rag:embeddings
```

### Adding New Content

1. Add your new markdown content to `docs/resources/rag/` (e.g., `FAQs.md`, `new-role.md`)

2. The chunk generator automatically picks up any `.md` files in RAG directory

3. Run the update command:
   ```bash
   npm run rag:update
   ```

### Available Resources

- **Full Knowledge Base (Markdown)**: `docs/resources/rag/*.md`
- **RAG Update Guide**: See `docs/RAG_UPDATE_GUIDE.md`
- **Chatbot Documentation**: See `docs/COOKIE-CHATBOT.md`

## Testing

### Unit & Integration Tests (Vitest)
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### E2E Tests (Playwright)
```bash
# Run E2E tests
npm run test:e2e

# Run with UI mode
npx playwright test --ui
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
- **Environment:** Vercel automatically loads environment variables from dashboard

## Deployment

Deployed via Vercel with:
- Server-side rendering for dynamic API
- Static generation for pages
- Edge functions for chat API

Required environment variables in Vercel:
- `GEMINI_API_KEY` (for embeddings)
- `OPENROUTER_API_KEY` (recommended primary)
- `ZHIPUAI_API_KEY`
- `NVIDIA_API_KEY`
- `ATLASSIAN_JIRA_API_TOKEN`
- `JIRA_PROJECT_URL`

## Known Issues

- **HTML Encoding:** Content collections may double-encode apostrophes (`'` → `&amp;#39;`). See `docs/HTML_ENCODING_ISSUE.md` for details.

## License

MIT

## Contact

- **Email:** aggarwal039517@gmail.com
- **LinkedIn:** [abhishek-aggarwal-8bb82b100](https://www.linkedin.com/in/abhishek-aggarwal-8bb82b100/)
