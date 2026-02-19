# RAG Knowledge Base Update Guide

This guide explains how to update the RAG (Retrieval-Augmented Generation) knowledge base when adding new content.

## Quick Start

```bash
npm run rag:update
```

This single command will:
1. Generate RAG chunks from all markdown files in `docs/resources/rag/`
2. Generate embeddings for all chunks using Gemini API
3. Copy embeddings to `public/embeddings.json` for production use

## Individual Steps

If you need to run individual steps:

### Generate chunks only
```bash
npm run rag:chunks
```

### Generate embeddings only
```bash
npm run rag:embeddings
```

## Adding New Content

1. Add your new markdown content to `docs/resources/rag/` (e.g., `FAQs.md`, `new-role.md`)

2. The chunk generator automatically picks up any `.md` files in RAG directory

3. Run the update command:
   ```bash
   npm run rag:update
   ```

## Prerequisites

- `GEMINI_API_KEY` must be set in your `.env` file
- See `.env.example` for required format

## Files Involved

- **Source content**: `docs/resources/rag/*.md`
- **Chunks output**: `docs/resources/rag/chunks.json`
- **Embeddings output**: `docs/resources/rag/embeddings.json` and `public/embeddings.json`

## Recent Updates

### 2026-02-19: System Prompt Improvements

- **Conversation mode**: Clarified that questions are **about Abhishek**, not the bot
  - "When they say 'your' or ask personal questions...they are ALWAYS referring to Abhishek, never to you personally"
  - Added explicit guidance for "strengths", "weaknesses", "where do you see yourself" questions

- **Analysis mode**: Added structured requirements extraction
  - Extracts "What you are looking for" keywords (3-7 word phrases, comma-separated)
  - Strong/Partial/Gap points limited to 2-3 words max
  - "Abhishek For This Role?" expanded to 2-3 sentences
  - Keywords should be tech skills: "Shopify, TPM, Headless, Multi-country, RTL, ERP integration"

## Troubleshooting

### API Key errors
If you see `GEMINI_API_KEY environment variable is not set`:
1. Check that `.env` file exists in project root
2. Verify it contains: `GEMINI_API_KEY=your_key_here`
3. Ensure `.env` is not committed to git (it should be in `.gitignore`)

### Old content still showing
If updated content isn't appearing:
1. Verify the markdown file is in `docs/resources/rag/` (not `raw-data/`)
2. Re-run: `npm run rag:chunks`
3. Then run: `npm run rag:embeddings`
4. Or use `npm run rag:update` to do both at once

### Fitment Analysis Issues
If requirements are showing as full sentences instead of keywords:
1. Ensure JD text is being parsed correctly
2. Check that the system prompt is being used correctly
3. The API will automatically format requirements as comma-separated keywords

### Deployment
After updating RAG, ensure you deploy with changes:
```bash
git add docs/resources/rag/ public/embeddings.json src/lib/chatbot/
git commit -m "Update RAG knowledge base"
git push
```

## API Response Format

### Analysis Mode
```json
{
  "mode": "analysis",
  "fit_score": number (0-100),
  "strong_matches": string[],
  "partial_matches": string[],
  "gaps": string[],
  "recommended_positioning": string,
  "what_looking_for": string (optional),
  "confidence_level": "High" | "Medium" | "Low"
}
```

### Conversation Mode
```json
{
  "mode": "conversation",
  "response_text": string,
  "suggested_questions": string[] (0 to 3),
  "confidence_level": "High" | "Medium" | "Low"
}
```
