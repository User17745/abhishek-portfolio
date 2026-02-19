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

2. The chunk generator automatically picks up any `.md` files in the RAG directory

3. Run the update command:
   ```bash
   npm run rag:update
   ```

## Prerequisites

- `GEMINI_API_KEY` must be set in your `.env` file
- See `.env.example` for the required format

## Files Involved

- **Source content**: `docs/resources/rag/*.md`
- **Chunks output**: `docs/resources/rag/chunks.json`
- **Embeddings output**: `docs/resources/rag/embeddings.json` and `public/embeddings.json`

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

### Deployment
After updating RAG, ensure you deploy the changes:
```bash
git add docs/resources/rag/ public/embeddings.json
git commit -m "Update RAG knowledge base"
git push
```
