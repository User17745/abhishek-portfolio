# Deployment Guide - Cookie Chatbot

## Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **GitHub Repository** - Push your code to GitHub
3. **Google Gemini API Key** - Get one at https://aistudio.google.com/app/apikey

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Google Gemini API key for embeddings | `AIza...` |
| `OPENROUTER_API_KEY` | Essential for LLM response | `sk-or-v1...` |
| `ATLASSIAN_JIRA_API_TOKEN` | Jira token to create issues | `ATATT...` |
| `JIRA_PROJECT_URL` | Destination board URL for contact form | `https://your-domain...` |

### Setting Environment Variables

**In Vercel Dashboard:**
1. Go to your project settings
2. Navigate to Environment Variables
3. Add each variable

**In .env file (local development):**
```bash
GEMINI_API_KEY=your_api_key_here
```

## Build Configuration

### Vercel Settings

| Setting | Value |
|---------|-------|
| Framework Preset | Astro |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### Package.json Scripts (already configured)

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

## Deployment Steps

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variable
vercel env add GEMINI_API_KEY
# Follow prompts to add your API key

# Deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Configure build settings (see above)
5. Add environment variables in project settings
6. Deploy

## Testing the API

### Local Testing

Start the dev server:
```bash
npm run dev
```

### Using curl

```bash
curl -X POST http://localhost:4321/api/match-resume \
  -H "Content-Type: application/json" \
  -d '{
    "jdText": "We are looking for a Technical Project Manager with experience in eCommerce platforms, Shopify Plus, and team leadership. Must have 10+ years of experience in enterprise software delivery."
  }'
```

### Using Postman

1. Create a new POST request
2. URL: `https://your-project.vercel.app/api/match-resume`
3. Headers: `Content-Type: application/json`
4. Body (JSON):
```json
{
  "jdText": "Your job description here"
}
```

### Expected Response

```json
{
  "fit_score": 85,
  "summary": "Abhishek shows strong alignment...",
  "strong_matches": [
    {
      "category": "eCommerce",
      "evidence": "12+ years in enterprise eCommerce...",
      "relevance": "Direct match with job requirements"
    }
  ],
  "gaps": [
    {
      "requirement": "Specific certification",
      "severity": "minor",
      "mitigation": "Willing to obtain"
    }
  ],
  "positioning": {
    "primary_angle": "Enterprise eCommerce expert...",
    "differentiators": ["GCC expansion experience"],
    "talking_points": ["Led 40+ implementations"]
  },
  "questions": ["What is the team size?"],
  "next_steps": ["Schedule a call"]
}
```

## Troubleshooting

### Common Issues

1. **401 Unauthorized**
   - Check your GEMINI_API_KEY is correct
   - Ensure API key has embedding API enabled

2. **500 Internal Server Error**
   - Check Vercel function logs
   - Verify embeddings.json exists in docs/resources/rag/

3. **CORS Errors**
   - API route uses SSR (prerender = false)
   - Ensure deployed on Vercel with serverless functions

### Check Logs

```bash
vercel logs your-project-name
```

## Files Structure

```
abhishek-portfolio/
├── src/
│   ├── components/chat/
│   │   └── ChatComponent.tsx    # React chat UI
│   ├── lib/
│   │   ├── chatbot/
│   │   │   ├── gemini.ts        # LLM API calls
│   │   │   └── system-prompt.ts
│   │   └── embeddings/
│   │       ├── cosineSimilarity.ts
│   │       ├── gemini.ts
│   │       └── search.ts
│   └── pages/
│       ├── api/
│       │   └── match-resume.ts   # API endpoint
│       └── chat.astro           # Chat page
├── docs/resources/rag/
│   ├── chunks.json             # Text chunks
│   └── embeddings.json          # Vector embeddings
└── .env.example                # Environment template
```
