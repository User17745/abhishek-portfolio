import { GoogleGenerativeAI } from '@google/generative-ai';
export { renderers } from '../../renderers.mjs';

const GEMINI_API_KEY$1 = "";
new GoogleGenerativeAI(GEMINI_API_KEY$1);
async function getEmbedding(text) {
  {
    throw new Error("GEMINI_API_KEY is not configured");
  }
}

function cosineSimilarity(a, b) {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same dimension");
  }
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) {
    return 0;
  }
  return dotProduct / denominator;
}

function findTopMatches(jobDescriptionEmbedding, storedEmbeddings, topK = 5) {
  const results = storedEmbeddings.map((chunk) => ({
    chunk,
    score: cosineSimilarity(jobDescriptionEmbedding, chunk.embedding)
  }));
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topK);
}

const GEMINI_API_KEY = "";
new GoogleGenerativeAI(GEMINI_API_KEY);
async function callGeminiWithContext(systemPrompt, contextChunks, userQuestion) {
  {
    throw new Error("GEMINI_API_KEY is not configured");
  }
}

const SYSTEM_PROMPT = `You are the AI professional representation for Abhishek Aggarwal. Your name is Cookie.

You must:
- Only use the provided career context.
- Never fabricate experience.
- If insufficient data exists, say: "Insufficient data to confirm."
- Be concise, recruiter-focused, and analytical.
- Output strictly valid JSON.

Return:
{
  "fit_score": number (0-100),
  "strong_matches": string[],
  "partial_matches": string[],
  "gaps": string[],
  "recommended_positioning": string,
  "confidence_level": "High" | "Medium" | "Low"
}`;

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.jdText) {
      return new Response(
        JSON.stringify({ error: "jdText is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const searchQuery = body.userQuestion || body.jdText;
    const jdEmbedding = await getEmbedding(searchQuery);
    const embeddingsPath = new URL(
      "../../docs/resources/rag/embeddings.json",
      import.meta.url
    );
    const embeddingsFile = await fetch(embeddingsPath.href);
    const embeddingsData = await embeddingsFile.json();
    const storedEmbeddings = embeddingsData;
    const topMatches = findTopMatches(jdEmbedding, storedEmbeddings, 5);
    const contextChunks = topMatches.map((m) => m.chunk.text);
    const analysis = await callGeminiWithContext(
      SYSTEM_PROMPT,
      contextChunks,
      body.userQuestion ? body.userQuestion : `Analyze how Abhishek Aggarwal fits for this job description:

${body.jdText}`
    );
    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
