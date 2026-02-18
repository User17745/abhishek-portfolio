import { GoogleGenerativeAI } from '@google/generative-ai';
export { renderers } from '../../renderers.mjs';

const GEMINI_API_KEY = "AIzaSyCEVXixuzgU5SdCqu0iEBW5YMwH3TJ_QT0";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
async function getEmbedding(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
  const result = await model.embedContent({
    content: { role: "user", parts: [{ text }] },
    taskType: "SEMANTIC_SIMILARITY"
  });
  return result.embedding.values;
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

async function callLLM(config, systemPrompt, contextChunks, userQuestion) {
  switch (config.provider) {
    case "gemini":
      return callGemini(config.apiKey, systemPrompt, contextChunks, userQuestion);
    case "zhipuai":
      return callZhipuAI(config.apiKey, systemPrompt, contextChunks, userQuestion);
    case "openrouter":
      return callOpenRouter(config.apiKey, systemPrompt, contextChunks, userQuestion);
    case "nvidia":
      return callNvidia(config.apiKey, systemPrompt, contextChunks, userQuestion);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}
async function callGemini(apiKey, systemPrompt, contextChunks, userQuestion) {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const JSON_SCHEMA = {
    type: "object",
    properties: {
      fit_score: { type: "number" },
      strong_matches: { type: "array", items: { type: "string" } },
      partial_matches: { type: "array", items: { type: "string" } },
      gaps: { type: "array", items: { type: "string" } },
      recommended_positioning: { type: "string" },
      confidence_level: { type: "string", enum: ["High", "Medium", "Low"] }
    },
    required: [
      "fit_score",
      "strong_matches",
      "partial_matches",
      "gaps",
      "recommended_positioning",
      "confidence_level"
    ]
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
      responseSchema: JSON_SCHEMA
    }
  });
  const context = contextChunks.map((chunk, i) => `--- Context ${i + 1} ---
${chunk}`).join("\n\n");
  const prompt = `${systemPrompt}

## Context
${context}

## Question
${userQuestion}`;
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  try {
    return JSON.parse(response);
  } catch {
    throw new Error("Invalid JSON response from Gemini");
  }
}
async function callZhipuAI(apiKey, systemPrompt, contextChunks, userQuestion) {
  const ZhipuAI = (await import('zhipuai')).default;
  const client = new ZhipuAI({ apiKey });
  const context = contextChunks.map((chunk, i) => `--- Context ${i + 1} ---
${chunk}`).join("\n\n");
  const result = await client.chat.completions.create({
    model: "glm-4.7-flash",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Context:
${context}

Question:
${userQuestion}`
      }
    ],
    temperature: 0.3,
    response_format: { type: "json_object" }
  });
  const content = result.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from ZhipuAI");
  }
  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Invalid JSON response from ZhipuAI");
  }
}
async function callOpenRouter(apiKey, systemPrompt, contextChunks, userQuestion) {
  const OpenAI = (await import('openai')).default;
  const client = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1"
  });
  const context = contextChunks.map((chunk, i) => `--- Context ${i + 1} ---
${chunk}`).join("\n\n");
  const enhancedPrompt = `${systemPrompt}

IMPORTANT: You must respond with ONLY valid JSON. No markdown formatting, no explanations, no code blocks. Just the raw JSON object.

Context:
${context}

Question:
${userQuestion}`;
  const result = await client.chat.completions.create({
    model: "google/gemini-2.0-flash-001",
    messages: [
      { role: "user", content: enhancedPrompt }
    ],
    temperature: 0.3,
    max_tokens: 2048
  });
  let content = result.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenRouter");
  }
  content = content.trim();
  if (content.startsWith("```json")) {
    content = content.replace(/```json\n?/, "").replace(/\n?```$/, "");
  } else if (content.startsWith("```")) {
    content = content.replace(/```\n?/, "").replace(/\n?```$/, "");
  }
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error("Failed to parse OpenRouter response:", content);
    throw new Error(`Invalid JSON response from OpenRouter: ${error.message}`);
  }
}
async function callNvidia(apiKey, systemPrompt, contextChunks, userQuestion) {
  const context = contextChunks.map((chunk, i) => `--- Context ${i + 1} ---
${chunk}`).join("\n\n");
  const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "moonshotai/kimi-k2.5",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Context:
${context}

Question:
${userQuestion}`
        }
      ],
      max_tokens: 4096,
      temperature: 0.3,
      top_p: 1,
      stream: false,
      chat_template_kwargs: {
        thinking: false
      }
    })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Nvidia NIM API error: ${response.status} ${errorText}`);
  }
  const result = await response.json();
  const content = result.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from Nvidia NIM");
  }
  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Invalid JSON response from Nvidia NIM");
  }
}
function getActiveLLMConfig() {
  const nvidiaKey = "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";
  {
    return { provider: "nvidia", apiKey: nvidiaKey };
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
    const llmConfig = getActiveLLMConfig();
    if (!llmConfig) {
      return new Response(
        JSON.stringify({ error: "No LLM API key configured. Please set PUBLIC_GEMINI_API_KEY, PUBLIC_ZHIPUAI_API_KEY, or PUBLIC_OPENROUTER_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
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
    const analysis = await callLLM(
      llmConfig,
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
