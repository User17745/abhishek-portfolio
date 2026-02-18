import type { APIRoute } from "astro";
import { getEmbedding } from "@/lib/embeddings/gemini";
import { findTopMatches, type EmbeddingChunk } from "@/lib/embeddings/search";
import { callLLM, getActiveLLMConfig, getFallbackConfig, type LLMResponse, type LLMProvider } from "@/lib/chatbot/llm-providers";
import { SYSTEM_PROMPT } from "@/lib/chatbot/system-prompt";

// Import embeddings at build time - this will be bundled
import embeddingsData from "../../../docs/resources/rag/embeddings.json" assert { type: "json" };

export const prerender = false;

interface RequestBody {
  jdText: string;
  userQuestion?: string;
}

export const POST: APIRoute = async ({ request }) => {
  console.log("[API] Received request");
  
  try {
    const body: RequestBody = await request.json();
    console.log("[API] Parsed body, jdText length:", body.jdText?.length);

    if (!body.jdText) {
      return new Response(
        JSON.stringify({ error: "jdText is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const llmConfig = getActiveLLMConfig();
    console.log("[API] LLM Config:", llmConfig?.provider || "null");
    
    if (!llmConfig) {
      return new Response(
        JSON.stringify({ error: "No LLM API key configured. Please set PUBLIC_OPENROUTER_API_KEY, PUBLIC_GEMINI_API_KEY, or other LLM provider keys in .env" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const searchQuery = body.userQuestion || body.jdText;

    // Get embedding for the job description / question
    console.log("[API] Getting embedding...");
    const jdEmbedding = await getEmbedding(searchQuery);
    console.log("[API] Got embedding, length:", jdEmbedding.length);

    // Use imported embeddings
    console.log("[API] Loading embeddings...");
    const storedEmbeddings: EmbeddingChunk[] = embeddingsData as EmbeddingChunk[];
    console.log("[API] Loaded embeddings:", storedEmbeddings.length);

    // Find top 3 matches (reduced from 5 for speed)
    console.log("[API] Finding matches...");
    const topMatches = findTopMatches(jdEmbedding, storedEmbeddings, 3);
    console.log("[API] Found matches:", topMatches.length);

    // Extract context chunks for LLM
    const contextChunks = topMatches.map((m) => m.chunk.text);
    console.log("[API] Context chunks:", contextChunks.length);

    // Call LLM with context to get structured analysis
    let analysis: LLMResponse;
    try {
      console.log("[API] Calling LLM...");
      analysis = await callLLM(
        llmConfig,
        SYSTEM_PROMPT,
        contextChunks,
        body.userQuestion
          ? body.userQuestion
          : `Analyze how Abhishek Aggarwal fits for this job description:\n\n${body.jdText}`
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
              SYSTEM_PROMPT,
              contextChunks,
              body.userQuestion || `Analyze how Abhishek Aggarwal fits for this job description:\n\n${body.jdText}`
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
