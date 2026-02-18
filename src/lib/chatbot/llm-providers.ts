export type LLMProvider = "gemini" | "zhipuai" | "openrouter" | "nvidia";
export type ResponseMode = "analysis" | "conversation";

export interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
}

export interface AnalysisLLMResponse {
  mode: "analysis";
  fit_score: number;
  strong_matches: string[];
  partial_matches: string[];
  gaps: string[];
  recommended_positioning: string;
  confidence_level: "High" | "Medium" | "Low";
}

export interface ConversationLLMResponse {
  mode: "conversation";
  response_text: string;
  suggested_questions: string[];
  confidence_level: "High" | "Medium" | "Low";
}

export type LLMResponse = AnalysisLLMResponse | ConversationLLMResponse;

export async function callLLM(
  config: LLMConfig,
  mode: ResponseMode,
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = []
): Promise<LLMResponse> {
  switch (config.provider) {
    case "gemini":
      return callGemini(config.apiKey, mode, systemPrompt, contextChunks, userQuestion, conversationHistory);
    case "zhipuai":
      return callZhipuAI(config.apiKey, mode, systemPrompt, contextChunks, userQuestion, conversationHistory);
    case "openrouter":
      return callOpenRouter(config.apiKey, mode, systemPrompt, contextChunks, userQuestion, conversationHistory);
    case "nvidia":
      return callNvidia(config.apiKey, mode, systemPrompt, contextChunks, userQuestion, conversationHistory);
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

// Gemini Implementation
async function callGemini(
  apiKey: string,
  mode: ResponseMode,
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>
): Promise<LLMResponse> {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);

  const JSON_SCHEMA = mode === "analysis"
    ? {
        type: "object",
        properties: {
          mode: { type: "string", enum: ["analysis"] },
          fit_score: { type: "number" },
          strong_matches: { type: "array", items: { type: "string" } },
          partial_matches: { type: "array", items: { type: "string" } },
          gaps: { type: "array", items: { type: "string" } },
          recommended_positioning: { type: "string" },
          confidence_level: { type: "string", enum: ["High", "Medium", "Low"] },
        },
        required: [
          "mode",
          "fit_score",
          "strong_matches",
          "partial_matches",
          "gaps",
          "recommended_positioning",
          "confidence_level",
        ],
      }
    : {
        type: "object",
        properties: {
          mode: { type: "string", enum: ["conversation"] },
          response_text: { type: "string" },
          suggested_questions: { type: "array", items: { type: "string" } },
          confidence_level: { type: "string", enum: ["High", "Medium", "Low"] },
        },
        required: ["mode", "response_text", "suggested_questions", "confidence_level"],
      };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
      responseSchema: JSON_SCHEMA as any,
    },
  });

  const context = contextChunks
    .map((chunk, i) => `--- Context ${i + 1} ---\n${chunk}`)
    .join("\n\n");

  const history = conversationHistory
    .slice(-10)
    .map((item) => `${item.role.toUpperCase()}: ${item.content}`)
    .join("\n");

  const prompt = `${systemPrompt}

## Conversation History
${history || "No prior conversation."}

## Context
${context || "No additional retrieved context."}

## User Message
${userQuestion}`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    return normalizeLLMResponse(mode, JSON.parse(response), response);
  } catch {
    throw new Error("Invalid JSON response from Gemini");
  }
}

// ZhipuAI (GLM-4.7-Flash) Implementation
async function callZhipuAI(
  apiKey: string,
  mode: ResponseMode,
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>
): Promise<LLMResponse> {
  const zhipuModule = await import("zhipuai");
  const ZhipuAI = (zhipuModule as any).default || (zhipuModule as any);
  const client = new ZhipuAI({ apiKey });

  const context = contextChunks
    .map((chunk, i) => `--- Context ${i + 1} ---\n${chunk}`)
    .join("\n\n");

  const history = conversationHistory
    .slice(-10)
    .map((item) => `${item.role.toUpperCase()}: ${item.content}`)
    .join("\n");

  const result = await client.chat.completions.create({
    model: "glm-4.7-flash",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Conversation History:\n${history || "No prior conversation."}\n\nContext:\n${context || "No additional retrieved context."}\n\nUser Message:\n${userQuestion}`,
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
    return normalizeLLMResponse(mode, JSON.parse(content), content);
  } catch {
    throw new Error("Invalid JSON response from ZhipuAI");
  }
}

// OpenRouter Implementation
async function callOpenRouter(
  apiKey: string,
  mode: ResponseMode,
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>
): Promise<LLMResponse> {
  const OpenAI = (await import("openai")).default;
  const client = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
  });

  const context = contextChunks
    .map((chunk, i) => `--- Context ${i + 1} ---\n${chunk}`)
    .join("\n\n");

  const history = conversationHistory
    .slice(-10)
    .map((item) => `${item.role.toUpperCase()}: ${item.content}`)
    .join("\n");

  const enhancedPrompt = `${systemPrompt}

IMPORTANT: You must respond with ONLY valid JSON. No markdown formatting, no explanations, no code blocks. Just the raw JSON object.

Conversation History:
${history || "No prior conversation."}

Context:
${context || "No additional retrieved context."}

User Message:
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
    return normalizeLLMResponse(mode, JSON.parse(content), content);
  } catch (error) {
    if (mode === "conversation") {
      return {
        mode: "conversation",
        response_text: content,
        suggested_questions: [],
        confidence_level: "Medium",
      };
    }
    console.error("Failed to parse OpenRouter response:", content);
    throw new Error(`Invalid JSON response from OpenRouter: ${error instanceof Error ? error.message : "Unknown parse error"}`);
  }
}

// Nvidia NIM (Kimi K2.5) Implementation
async function callNvidia(
  apiKey: string,
  mode: ResponseMode,
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>
): Promise<LLMResponse> {
  const context = contextChunks
    .map((chunk, i) => `--- Context ${i + 1} ---\n${chunk}`)
    .join("\n\n");

  const history = conversationHistory
    .slice(-10)
    .map((item) => `${item.role.toUpperCase()}: ${item.content}`)
    .join("\n");

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
          content: `${systemPrompt}\n\nConversation History:\n${history || "No prior conversation."}\n\nContext:\n${context || "No additional retrieved context."}\n\nUser Message:\n${userQuestion}`
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
    return normalizeLLMResponse(mode, JSON.parse(content), content);
  } catch {
    if (mode === "conversation") {
      return {
        mode: "conversation",
        response_text: content,
        suggested_questions: [],
        confidence_level: "Medium",
      };
    }
    throw new Error("Invalid JSON response from Nvidia NIM");
  }
}

function normalizeLLMResponse(
  mode: ResponseMode,
  raw: unknown,
  fallbackText?: string
): LLMResponse {
  if (mode === "analysis") {
    const obj = raw as Partial<AnalysisLLMResponse>;
    return {
      mode: "analysis",
      fit_score: typeof obj.fit_score === "number" ? Math.max(0, Math.min(100, obj.fit_score)) : 0,
      strong_matches: Array.isArray(obj.strong_matches) ? obj.strong_matches.filter((x): x is string => typeof x === "string") : [],
      partial_matches: Array.isArray(obj.partial_matches) ? obj.partial_matches.filter((x): x is string => typeof x === "string") : [],
      gaps: Array.isArray(obj.gaps) ? obj.gaps.filter((x): x is string => typeof x === "string") : [],
      recommended_positioning:
        typeof obj.recommended_positioning === "string"
          ? obj.recommended_positioning
          : "Insufficient data to confirm.",
      confidence_level:
        obj.confidence_level === "High" || obj.confidence_level === "Medium" || obj.confidence_level === "Low"
          ? obj.confidence_level
          : "Medium",
    };
  }

  const obj = raw as Partial<ConversationLLMResponse>;
  return {
    mode: "conversation",
    response_text:
      typeof obj.response_text === "string" && obj.response_text.trim().length > 0
        ? obj.response_text
        : fallbackText || "Happy to help. Share what you want to know about Abhishek's experience.",
    suggested_questions: Array.isArray(obj.suggested_questions)
      ? obj.suggested_questions.filter((x): x is string => typeof x === "string").slice(0, 3)
      : [],
    confidence_level:
      obj.confidence_level === "High" || obj.confidence_level === "Medium" || obj.confidence_level === "Low"
        ? obj.confidence_level
        : "Medium",
  };
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
