export type LLMProvider = "gemini" | "zhipuai" | "openrouter" | "nvidia";

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
    case "nvidia":
      return callNvidia(config.apiKey, systemPrompt, contextChunks, userQuestion);
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
    model: "gemini-2.5-flash",
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

// ZhipuAI (GLM-4.7-Flash) Implementation
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
    model: "glm-4.7-flash",
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

  // Explicitly request JSON format in the prompt
  const enhancedPrompt = `${systemPrompt}

IMPORTANT: You must respond with ONLY valid JSON. No markdown formatting, no explanations, no code blocks. Just the raw JSON object.

Context:
${context}

Question:
${userQuestion}`;

  const result = await client.chat.completions.create({
    model: "google/gemini-2.0-flash-001",
    messages: [
      { role: "user", content: enhancedPrompt },
    ],
    temperature: 0.3,
    max_tokens: 2048,
  });

  let content = result.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenRouter");
  }

  // Clean up the response - remove markdown code blocks if present
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

// Nvidia NIM (Kimi K2.5) Implementation
async function callNvidia(
  apiKey: string,
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string
): Promise<LLMResponse> {
  const context = contextChunks
    .map((chunk, i) => `--- Context ${i + 1} ---\n${chunk}`)
    .join("\n\n");

  const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Accept": "text/event-stream",
    },
    body: JSON.stringify({
      model: "moonshotai/kimi-k2.5",
      messages: [
        {
          role: "user",
          content: `${systemPrompt}\n\nContext:\n${context}\n\nQuestion:\n${userQuestion}`
        },
      ],
      max_tokens: 16384,
      temperature: 1.0,
      top_p: 1.0,
      stream: false,
      chat_template_kwargs: {
        thinking: false
      }
    }),
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

// Get active provider from environment
// NOTE: Use private env vars (not PUBLIC_) to prevent key exposure
export function getActiveLLMConfig(): LLMConfig | null {
  const geminiKey = import.meta.env.GEMINI_API_KEY;
  const zhipuaiKey = import.meta.env.ZHIPUAI_API_KEY;
  const openrouterKey = import.meta.env.OPENROUTER_API_KEY;
  const nvidiaKey = import.meta.env.NVIDIA_API_KEY;

  console.log("[LLM] Checking API keys:");
  console.log("[LLM] Gemini:", geminiKey ? `${geminiKey.substring(0, 10)}...` : "not set");
  console.log("[LLM] ZhipuAI:", zhipuaiKey ? `${zhipuaiKey.substring(0, 10)}...` : "not set");
  console.log("[LLM] OpenRouter:", openrouterKey ? `${openrouterKey.substring(0, 10)}...` : "not set");
  console.log("[LLM] Nvidia:", nvidiaKey ? `${nvidiaKey.substring(0, 10)}...` : "not set");

  // Priority order - fastest/most reliable first
  if (openrouterKey && openrouterKey !== "your_openrouter_api_key_here") {
    console.log("[LLM] Using OpenRouter");
    return { provider: "openrouter", apiKey: openrouterKey };
  }

  if (geminiKey && geminiKey !== "your_gemini_api_key_here") {
    console.log("[LLM] Using Gemini");
    return { provider: "gemini", apiKey: geminiKey };
  }

  if (zhipuaiKey && zhipuaiKey !== "your_zhipuai_api_key_here") {
    console.log("[LLM] Using ZhipuAI");
    return { provider: "zhipuai", apiKey: zhipuaiKey };
  }

  if (nvidiaKey && nvidiaKey !== "your_nvidia_api_key_here") {
    console.log("[LLM] Using Nvidia");
    return { provider: "nvidia", apiKey: nvidiaKey };
  }

  console.log("[LLM] No valid API key found");
  return null;
}

// Get fallback config for a specific provider
export function getFallbackConfig(provider: LLMProvider): LLMConfig | null {
  const geminiKey = import.meta.env.GEMINI_API_KEY;
  const zhipuaiKey = import.meta.env.ZHIPUAI_API_KEY;
  const openrouterKey = import.meta.env.OPENROUTER_API_KEY;
  const nvidiaKey = import.meta.env.NVIDIA_API_KEY;

  switch (provider) {
    case "gemini":
      if (geminiKey && geminiKey !== "your_gemini_api_key_here") {
        return { provider: "gemini", apiKey: geminiKey };
      }
      break;
    case "zhipuai":
      if (zhipuaiKey && zhipuaiKey !== "your_zhipuai_api_key_here") {
        return { provider: "zhipuai", apiKey: zhipuaiKey };
      }
      break;
    case "openrouter":
      if (openrouterKey && openrouterKey !== "your_openrouter_api_key_here") {
        return { provider: "openrouter", apiKey: openrouterKey };
      }
      break;
    case "nvidia":
      if (nvidiaKey && nvidiaKey !== "your_nvidia_api_key_here") {
        return { provider: "nvidia", apiKey: nvidiaKey };
      }
      break;
  }
  return null;
}
