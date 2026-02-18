export type LLMProvider = "gemini" | "zhipuai" | "openrouter";

export interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
}

export interface LLMResponse {
  fit_score: number;
  strong_matches: string[];
  partial_matches: string[];
  gaps: string[];
  recommended_positioning: string;
  confidence_level: "High" | "Medium" | "Low";
}

export async function callLLM(
  config: LLMConfig,
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string
): Promise<LLMResponse> {
  switch (config.provider) {
    case "gemini":
      return callGemini(config.apiKey, systemPrompt, contextChunks, userQuestion);
    case "zhipuai":
      return callZhipuAI(config.apiKey, systemPrompt, contextChunks, userQuestion);
    case "openrouter":
      return callOpenRouter(config.apiKey, systemPrompt, contextChunks, userQuestion);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

// Gemini Implementation
async function callGemini(
  apiKey: string,
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string
): Promise<LLMResponse> {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);

  const JSON_SCHEMA = {
    type: "object",
    properties: {
      fit_score: { type: "number" },
      strong_matches: { type: "array", items: { type: "string" } },
      partial_matches: { type: "array", items: { type: "string" } },
      gaps: { type: "array", items: { type: "string" } },
      recommended_positioning: { type: "string" },
      confidence_level: { type: "string", enum: ["High", "Medium", "Low"] },
    },
    required: [
      "fit_score",
      "strong_matches",
      "partial_matches",
      "gaps",
      "recommended_positioning",
      "confidence_level",
    ],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
      responseSchema: JSON_SCHEMA,
    },
  });

  const context = contextChunks
    .map((chunk, i) => `--- Context ${i + 1} ---\n${chunk}`)
    .join("\n\n");

  const prompt = `${systemPrompt}\n\n## Context\n${context}\n\n## Question\n${userQuestion}`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    return JSON.parse(response);
  } catch {
    throw new Error("Invalid JSON response from Gemini");
  }
}

// ZhipuAI (GLM-4-Flash) Implementation
async function callZhipuAI(
  apiKey: string,
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string
): Promise<LLMResponse> {
  const ZhipuAI = (await import("zhipuai")).default;
  const client = new ZhipuAI({ apiKey });

  const context = contextChunks
    .map((chunk, i) => `--- Context ${i + 1} ---\n${chunk}`)
    .join("\n\n");

  const prompt = `${systemPrompt}

## Context
${context}

## Question
${userQuestion}

Respond with valid JSON only.`;

  const result = await client.chat.completions.create({
    model: "glm-4-flash",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${userQuestion}`,
      },
    ],
    temperature: 0.3,
    response_format: { type: "json_object" },
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

// OpenRouter Implementation
async function callOpenRouter(
  apiKey: string,
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string
): Promise<LLMResponse> {
  const OpenAI = (await import("openai")).default;
  const client = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
  });

  const context = contextChunks
    .map((chunk, i) => `--- Context ${i + 1} ---\n${chunk}`)
    .join("\n\n");

  const result = await client.chat.completions.create({
    model: "google/gemini-2.0-flash-001",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion:\n${userQuestion}`,
      },
    ],
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  const content = result.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenRouter");
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Invalid JSON response from OpenRouter");
  }
}

// Get active provider from environment
export function getActiveLLMConfig(): LLMConfig | null {
  const geminiKey = import.meta.env.PUBLIC_GEMINI_API_KEY;
  const zhipuaiKey = import.meta.env.PUBLIC_ZHIPUAI_API_KEY;
  const openrouterKey = import.meta.env.PUBLIC_OPENROUTER_API_KEY;

  if (zhipuaiKey && zhipuaiKey !== "your_zhipuai_api_key_here") {
    return { provider: "zhipuai", apiKey: zhipuaiKey };
  }

  if (openrouterKey && openrouterKey !== "your_openrouter_api_key_here") {
    return { provider: "openrouter", apiKey: openrouterKey };
  }

  if (geminiKey && geminiKey !== "your_gemini_api_key_here") {
    return { provider: "gemini", apiKey: geminiKey };
  }

  return null;
}
