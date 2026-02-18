# Cookie - AI Career Fit Analyzer

## Overview

Cookie is an AI-powered chatbot that analyzes job descriptions against Abhishek Aggarwal's career profile to determine fit score, identify strengths, gaps, and provide positioning recommendations.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Chat UI        │────▶│  API Route        │────▶│  Gemini API     │
│  (React)        │     │  (match-resume)   │     │  (LLM + Embed) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  Vector Search   │
                       │  (Cosine Sim)    │
                       └──────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  Embeddings JSON │
                       │  (RAG Data)     │
                       └──────────────────┘
```

## Components

### 1. Data Pipeline

#### Chunk Generation (`scripts/generate-rag-chunks.mjs`)
- Reads markdown files from `docs/resources/rag/`
- Splits by `##` headings into sections
- Creates chunks with ~500 tokens
- Outputs to `docs/resources/rag/chunks.json`

```bash
node scripts/generate-rag-chunks.mjs
```

#### Embedding Generation (`scripts/generate-embeddings.mjs`)
- Reads chunks from `chunks.json`
- Calls Gemini embedding API for each chunk
- Outputs to `docs/resources/rag/embeddings.json`

```bash
export GEMINI_API_KEY=your_key
node scripts/generate-embeddings.mjs
```

### 2. Core Libraries

#### Embeddings Module (`src/lib/embeddings/`)

| File | Purpose |
|------|---------|
| `cosineSimilarity.ts` | Pure function to compute vector similarity |
| `gemini.ts` | Gemini API calls for embeddings |
| `search.ts` | Find top K matches using cosine similarity |
| `index.ts` | Exports |

**Cosine Similarity Algorithm:**
```typescript
cosineSimilarity(a: number[], b: number[]): number
```
- Returns value between -1 and 1
- 1 = identical, 0 = orthogonal, -1 = opposite

**Search Function:**
```typescript
findTopMatches(
  jobDescriptionEmbedding: number[],
  storedEmbeddings: EmbeddingChunk[],
  topK: number
): SearchResult[]
```

#### Chatbot Module (`src/lib/chatbot/`)

| File | Purpose |
|------|---------|
| `gemini.ts` | Gemini 2 Flash API calls with JSON schema |
| `system-prompt.ts` | Cookie's system prompt |

**Cookie's System Prompt:**
```
You are the AI professional representation for Abhishek Aggarwal. Your name is Cookie.

You must:
- Only use the provided career context.
- Never fabricate experience.
- If insufficient data exists, say: "Insufficient data to confirm."
- Be concise, recruiter-focused, and analytical.
- Output strictly valid JSON.
```

**LLM Response Structure:**
```json
{
  "fit_score": 85,
  "strong_matches": ["12+ years eCommerce", "GCC expansion"],
  "partial_matches": ["Some AWS experience"],
  "gaps": ["No Python listed"],
  "recommended_positioning": "Enterprise eCommerce leader",
  "confidence_level": "High"
}
```

### 3. API Route (`src/pages/api/match-resume.ts`)

**Endpoint:** `POST /api/match-resume`

**Request:**
```json
{
  "jdText": "Job description text...",
  "userQuestion": "Optional specific question"
}
```

**Flow:**
1. Get embedding for JD/question via Gemini
2. Load stored embeddings from JSON
3. Find top 5 matches using cosine similarity
4. Call Gemini with context + system prompt
5. Return structured JSON response

### 4. Frontend (`src/components/chat/ChatComponent.tsx`)

**Features:**
- Message history display
- File upload (.txt, .md)
- Fit score progress bar
- Strong matches list with green highlighting
- Gaps list with severity badges
- Positioning recommendations
- Loading spinner
- Responsive design

### 5. Chat Page (`src/pages/chat.astro`)

Single page that renders the ChatComponent.

## Data Files

### RAG Source Files (`docs/resources/rag/`)

| File | Description |
|------|-------------|
| `career-journey.md` | Timeline from 2014-present |
| `ecommerce.md` | eCommerce focus resume |
| `product-manager.md` | Product management resume |
| `shopify-tpm.md` | Shopify TPM resume |
| `program-management-office-pmo.md` | PMO resume |
| `technical-project-manager-tpm.md` | Technical PM resume |
| `pre-sales-solutions-engineering.md` | Pre-sales resume |
| `project-portfolio.md` | All projects list |

### Generated Files

| File | Purpose |
|------|---------|
| `chunks.json` | Text chunks (~38) |
| `embeddings.json` | Vector embeddings |

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_GEMINI_API_KEY` | Yes | Google Gemini API key |

Set in `.env`:
```bash
PUBLIC_GEMINI_API_KEY=AIza...
```

## Testing

### Unit Tests
```bash
npm test
```

Tests cover:
- Cosine similarity algorithm
- Search functionality
- Chunk generation
- Chat component

### E2E Tests
```bash
npm run test:e2e
```

Tests cover:
- Page loading
- User interactions
- API responses

## Deployment

See `DEPLOYMENT.md` for detailed Vercel deployment instructions.

### Quick Deploy
1. Push to GitHub
2. Import in Vercel
3. Add `PUBLIC_GEMINI_API_KEY` environment variable
4. Deploy

## Missing Pieces

The following are NOT yet implemented:

1. **Embeddings JSON file** - Run `scripts/generate-embeddings.mjs` to generate
2. **Playwright e2e tests** - Need `@playwright/test` installed
3. **Production error handling** - More robust error boundaries
4. **Caching** - Embeddings could be cached to reduce API calls
5. **Rate limiting** - No rate limiting on API route
6. **Authentication** - Chat could be behind auth if needed

## File Structure

```
abhishek-portfolio/
├── docs/resources/rag/
│   ├── *.md                    # Source resumes
│   ├── chunks.json             # Generated chunks
│   └── embeddings.json         # Generated embeddings
├── scripts/
│   ├── generate-rag-chunks.mjs
│   └── generate-embeddings.mjs
├── src/
│   ├── components/chat/
│   │   └── ChatComponent.tsx
│   ├── lib/
│   │   ├── chatbot/
│   │   │   ├── gemini.ts
│   │   │   └── system-prompt.ts
│   │   └── embeddings/
│   │       ├── cosineSimilarity.ts
│   │       ├── gemini.ts
│   │       ├── search.ts
│   │       └── index.ts
│   └── pages/
│       ├── api/
│       │   └── match-resume.ts
│       └── chat.astro
├── tests/
│   ├── components/chat/
│   ├── e2e/
│   └── lib/
├── DEPLOYMENT.md
└── .env.example
```

## Usage

1. **Generate chunks:**
   ```bash
   node scripts/generate-rag-chunks.mjs
   ```

2. **Generate embeddings:**
   ```bash
   export GEMINI_API_KEY=your_key
   node scripts/generate-embeddings.mjs
   ```

3. **Run locally:**
   ```bash
   npm run dev
   # Visit http://localhost:4321/chat
   ```

4. **Deploy to Vercel:**
   ```bash
   npm run build
   # Deploy dist folder
   ```
