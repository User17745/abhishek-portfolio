import type { APIRoute } from "astro";
import { getEmbedding } from "@/lib/embeddings/gemini";
import { findTopMatches, type EmbeddingChunk } from "@/lib/embeddings/search";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  callLLM,
  getActiveLLMConfig,
  getFallbackConfig,
  type LLMResponse,
  type LLMProvider,
  type ResponseMode,
} from "@/lib/chatbot/llm-providers";
import { ANALYSIS_SYSTEM_PROMPT, CONVERSATION_SYSTEM_PROMPT } from "@/lib/chatbot/system-prompt";

// Import embeddings at build time - this will be bundled
import embeddingsData from "../../../docs/resources/rag/embeddings.json" assert { type: "json" };

export const prerender = false;

interface RequestBody {
  jdText?: string;
  message?: string;
  userQuestion?: string;
  attachment?: {
    name: string;
    mimeType: string;
    base64: string;
  };
  conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
}

export const POST: APIRoute = async ({ request }) => {
  console.log("[API] Received request");
  
  try {
    const body: RequestBody = await request.json();
    const incomingMessage = body.message || body.userQuestion || body.jdText || "";
    console.log("[API] Parsed body, message length:", incomingMessage.length);

    if (!incomingMessage.trim() && !body.attachment) {
      return new Response(
        JSON.stringify({ error: "message (or jdText) is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const llmConfig = getActiveLLMConfig();
    console.log("[API] LLM Config:", llmConfig?.provider || "null");
    
    if (!llmConfig) {
      return new Response(
        JSON.stringify({ error: "No LLM API key configured. Please set OPENROUTER_API_KEY, GEMINI_API_KEY, ZHIPUAI_API_KEY, or NVIDIA_API_KEY in .env" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const attachmentText = await extractAttachmentText(body.attachment);
    const userMessage = [incomingMessage.trim(), attachmentText].filter(Boolean).join("\n\n");
    const mode = determineResponseMode(incomingMessage, attachmentText);
    const conversationHistory = sanitizeConversationHistory(body.conversationHistory);

    console.log("[API] Mode:", mode);

    let contextChunks: string[] = [];
    if (shouldUseRAGContext(userMessage, mode)) {
      console.log("[API] Getting embedding...");
      const queryEmbedding = await getEmbedding(userMessage);
      console.log("[API] Got embedding, length:", queryEmbedding.length);

      console.log("[API] Loading embeddings...");
      const storedEmbeddings: EmbeddingChunk[] = embeddingsData as EmbeddingChunk[];
      console.log("[API] Loaded embeddings:", storedEmbeddings.length);

      console.log("[API] Finding matches...");
      const topMatches = findTopMatches(queryEmbedding, storedEmbeddings, mode === "analysis" ? 3 : 2);
      console.log("[API] Found matches:", topMatches.length);
      contextChunks = topMatches.map((m) => m.chunk.text);
    }

    // Call LLM with context to get structured analysis
    let analysis: LLMResponse | null = null;
    try {
      console.log("[API] Calling LLM...");
      analysis = await callLLM(
        llmConfig,
        mode,
        mode === "analysis" ? ANALYSIS_SYSTEM_PROMPT : CONVERSATION_SYSTEM_PROMPT,
        contextChunks,
        mode === "analysis"
          ? `Analyze how Abhishek fits for this role:\n\n${userMessage}`
          : userMessage || incomingMessage,
        conversationHistory
      );
      console.log("[API] Got LLM response");
    } catch (llmError) {
      console.error("[API] LLM Error:", llmError);
      // Try fallback providers
      const fallbackProviders: LLMProvider[] = ["gemini", "zhipuai", "nvidia"];
      const currentIndex = fallbackProviders.indexOf(llmConfig.provider);
      
      for (let i = currentIndex + 1; i < fallbackProviders.length; i++) {
        const fallbackConfig = getFallbackConfig(fallbackProviders[i]);
        if (fallbackConfig) {
          console.log(`[API] Trying fallback provider: ${fallbackProviders[i]}`);
          try {
            analysis = await callLLM(
              fallbackConfig,
              mode,
              mode === "analysis" ? ANALYSIS_SYSTEM_PROMPT : CONVERSATION_SYSTEM_PROMPT,
              contextChunks,
              mode === "analysis"
                ? `Analyze how Abhishek fits for this role:\n\n${userMessage}`
                : userMessage || incomingMessage,
              conversationHistory
            );
            console.log(`[API] Got response from fallback: ${fallbackProviders[i]}`);
            break;
          } catch (fallbackError) {
            console.error(`[API] Fallback ${fallbackProviders[i]} also failed:`, fallbackError);
            continue;
          }
        }
      }
      
      if (!analysis) {
        return new Response(
          JSON.stringify({ 
            error: "All LLM providers failed. Please check your API keys.",
            details: llmError instanceof Error ? llmError.message : "Unknown error"
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Return the structured response
    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[API] Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

function determineResponseMode(message: string, attachmentText: string): ResponseMode {
  if (attachmentText.trim().length > 0) {
    return "analysis";
  }

  const normalized = message.toLowerCase();
  const wordCount = normalized.split(/\s+/).filter(Boolean).length;

  const explicitAnalysisPatterns = [
    /\bfit(?:ment| score)?\b/,
    /\beligib(?:le|ility)\b/,
    /\bmatch(?:ing)?\b/,
    /\banaly[sz]e\b.*\b(job|jd|description|role)\b/,
    /\bjob description\b/,
    /\bhere is (the )?jd\b/,
    /\bsuitable for this role\b/,
  ];

  if (explicitAnalysisPatterns.some((pattern) => pattern.test(normalized))) {
    return "analysis";
  }

  const jdSignals = [
    "we are looking for",
    "responsibilities",
    "requirements",
    "must have",
    "nice to have",
    "qualifications",
    "job summary",
    "about the role",
  ];
  const signalCount = jdSignals.filter((signal) => normalized.includes(signal)).length;

  if (wordCount >= 80 && signalCount >= 2) {
    return "analysis";
  }

  return "conversation";
}

function shouldUseRAGContext(message: string, mode: ResponseMode): boolean {
  if (mode === "analysis") return true;
  return message.trim().length >= 6;
}

function sanitizeConversationHistory(
  history: RequestBody["conversationHistory"]
): Array<{ role: "user" | "assistant"; content: string }> {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item): item is { role: "user" | "assistant"; content: string } =>
      !!item &&
      (item.role === "user" || item.role === "assistant") &&
      typeof item.content === "string" &&
      item.content.trim().length > 0
    )
    .slice(-10);
}

async function extractAttachmentText(attachment?: RequestBody["attachment"]): Promise<string> {
  if (!attachment) return "";

  const mimeType = attachment.mimeType || "";
  const base64 = attachment.base64 || "";
  if (!base64) return "";

  if (mimeType.startsWith("text/") || mimeType === "application/json") {
    return Buffer.from(base64, "base64").toString("utf-8");
  }

  // For binary office/PDF files, use Gemini to extract readable text.
  const apiKey = import.meta.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is required to process PDF/DOC/DOCX files.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent([
    {
      text: "Extract readable plain text from this document. Return only extracted text with no markdown or commentary.",
    },
    {
      inlineData: {
        mimeType,
        data: base64,
      },
    },
  ]);

  const extracted = result.response.text().trim();
  return extracted;
}
