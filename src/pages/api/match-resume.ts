import type { APIRoute } from "astro";
import { getEmbedding } from "@/lib/embeddings/gemini";
import { findTopMatches, type EmbeddingChunk } from "@/lib/embeddings/search";
import { callLLM, getActiveLLMConfig, type LLMResponse } from "@/lib/chatbot/llm-providers";
import { SYSTEM_PROMPT } from "@/lib/chatbot/system-prompt";

export const prerender = false;

interface RequestBody {
  jdText: string;
  userQuestion?: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: RequestBody = await request.json();

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

    // Get embedding for the job description / question
    const jdEmbedding = await getEmbedding(searchQuery);

    // Load stored embeddings
    const fs = await import("fs");
    const path = await import("path");
    const embeddingsPath = path.join(process.cwd(), "docs/resources/rag/embeddings.json");
    const embeddingsData = JSON.parse(fs.readFileSync(embeddingsPath, "utf-8"));
    const storedEmbeddings: EmbeddingChunk[] = embeddingsData;

    // Find top 5 matches
    const topMatches = findTopMatches(jdEmbedding, storedEmbeddings, 5);

    // Extract context chunks for LLM
    const contextChunks = topMatches.map((m) => m.chunk.text);

    // Call LLM with context to get structured analysis
    const analysis: LLMResponse = await callLLM(
      llmConfig,
      SYSTEM_PROMPT,
      contextChunks,
      body.userQuestion
        ? body.userQuestion
        : `Analyze how Abhishek Aggarwal fits for this job description:\n\n${body.jdText}`
    );

    // Return the structured response
    return new Response(JSON.stringify(analysis), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
