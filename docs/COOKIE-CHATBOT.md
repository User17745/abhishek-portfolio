# Cookie - AI Chatbot Documentation

## Overview

Cookie is an AI-powered chatbot that helps visitors understand how Abhishek Aggarwal fits their job requirements. It uses RAG (Retrieval Augmented Generation) to provide personalized career fit analysis.

## Features

- **Job Description Analysis** - Paste a job description and get instant fit analysis
- **Fit Score** - Percentage match (0-100%)
- **Strong Matches** - Skills/experience that align well
- **Partial Matches** - Skills with some relevance
- **Gaps** - Areas that may need development
- **Positioning Recommendations** - How to position Abhishek for the role
- **Confidence Level** - High/Medium/Low based on information clarity

## How It Works

### 1. User Input
User pastes a job description or asks a question about Abhishek's fit for a role.

### 2. Embedding Generation
The job description is converted to a vector embedding using Google's Gemini embedding-001 model (1536 dimensions).

### 3. Semantic Search
The embedding is compared against pre-indexed career profile chunks using cosine similarity. Top 3 most relevant chunks are retrieved.

### 4. LLM Analysis
The retrieved context + job description is sent to an LLM (with fallback providers) which generates a structured JSON response.

### 5. Response Display
The chat UI displays the analysis with:
- Visual fit score progress bar
- Matched skills categorized
- Gaps identified
- Positioning recommendation

## Technical Details

### API Endpoint
```
POST /api/match-resume
Body: { "jdText": "job description..." }
Response: { "fit_score": 92, "strong_matches": [...], ... }
```

### LLM Providers (in priority order)

1. **OpenRouter** (Primary - fastest)
   - Model: `google/gemini-2.0-flash-001`
   - ~2s response time

2. **Gemini 2.5-flash** (Fallback 1)
   - Model: `gemini-2.5-flash`
   - ~10s response time

3. **ZhipuAI GLM-4.7-Flash** (Fallback 2)
   - Model: `glm-4.7-flash`

4. **Nvidia NIM Kimi K2.5** (Fallback 3)
   - Model: `moonshotai/kimi-k2.5`
   - Often times out

### RAG Data

**Source Documents** (8 markdown files):
- `career-journey.md` - Overall career timeline
- `ecommerce.md` - eCommerce experience
- `product-manager.md` - PM role details
- `pre-sales-solutions-engineering.md` - Pre-sales experience
- `project-portfolio.md` - Project highlights
- `program-management-office-pmo.md` - PMO experience
- `shopify-tpm.md` - Shopify-specific experience
- `technical-project-manager-tpm.md` - TPM experience

**Chunks:** 38 text chunks with metadata

**Embeddings:** Pre-generated Gemini embeddings, bundled at build time to `public/embeddings.json`

## File Structure

```
src/
├── components/
│   └── chat/
│       ├── ChatSidebar.tsx       # Sidebar panel
│       ├── ChatContainer.tsx     # Message handling
│       ├── ChatComponent.tsx     # Chat UI
│       └── ChatContext.tsx      # State management
├── lib/
│   ├── chatbot/
│   │   ├── llm-providers.ts    # LLM calls + fallback
│   │   ├── system-prompt.ts    # Cookie's prompt
│   │   └── gemini.ts           # Gemini API helpers
│   └── embeddings/
│       ├── gemini.ts           # Embedding generation
│       ├── cosineSimilarity.ts # Vector similarity
│       └── search.ts           # Top-k search
└── pages/
    └── api/
        └── match-resume.ts     # API endpoint
```

## Environment Variables

```bash
# Required for embeddings
PUBLIC_GEMINI_API_KEY=...

# At least one required for LLM
PUBLIC_OPENROUTER_API_KEY=...   # Recommended (fastest)
PUBLIC_GEMINI_API_KEY=...       # Fallback
PUBLIC_ZHIPUAI_API_KEY=...      # Fallback
PUBLIC_NVIDIA_API_KEY=...       # Fallback
```

## UI Components

### ChatSidebar
- Fixed right sidebar (450px width)
- Appears under main header (not over it)
- Z-index: 30 (under header's 40)
- Contains ChatContainer

### ChatContainer
- Manages messages state
- Handles API calls
- Passes data to ChatComponent

### ChatComponent
- Displays messages
- Shows welcome message when empty
- Input area with file upload
- Fit score visualization

### CookieToggle
- Icon button in header nav
- Toggles sidebar open/close
- Shows active state indicator

## Testing

```bash
# Test API
curl -X POST http://localhost:4321/api/match-resume \
  -H "Content-Type: application/json" \
  -d '{"jdText": "We are looking for a Senior Product Manager with Shopify experience"}'
```

## Response Format

```json
{
  "fit_score": 92,
  "strong_matches": [
    "12+ years in digital commerce",
    "Shopify Plus implementations",
    "Product strategy experience"
  ],
  "partial_matches": [
    "Senior PM experience (similar level)",
    "Enterprise delivery (related skills)"
  ],
  "gaps": [],
  "recommended_positioning": "A seasoned product leader adept at...",
  "confidence_level": "High"
}
```

## Known Issues

- **HTML Encoding:** Apostrophes in content may appear as `&amp;#39;` in some places. See `docs/HTML_ENCODING_ISSUE.md`.
- **Nvidia NIM:** Often times out on complex prompts, used as last resort.

## Future Improvements

- Add file upload (PDF resume parsing)
- More LLM providers
- Streaming responses
- Chat history persistence (localStorage)
- Feedback collection on responses
