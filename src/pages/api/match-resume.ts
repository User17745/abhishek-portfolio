import type { APIRoute } from "astro";
import { getEmbedding } from "@/lib/embeddings/gemini";
import { findTopMatches, type EmbeddingChunk } from "@/lib/embeddings/search";
import { callGeminiWithContext } from "@/lib/chatbot/gemini";
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

    const searchQuery = body.userQuestion || body.jdText;

    // Get embedding for the job description / question
    const jdEmbedding = await getEmbedding(searchQuery);

    // Load stored embeddings
    const embeddingsPath = new URL(
      "../../docs/resources/rag/embeddings.json",
      import.meta.url
    );
    const embeddingsFile = await fetch(embeddingsPath.href);
    const embeddingsData = await embeddingsFile.json();
    const storedEmbeddings: EmbeddingChunk[] = embeddingsData;

    // Find top 5 matches
    const topMatches = findTopMatches(jdEmbedding, storedEmbeddings, 5);

    // Extract context chunks for LLM
    const contextChunks = topMatches.map((m) => m.chunk.text);

    // Call Gemini with context to get structured analysis
    const analysis = await callGeminiWithContext(
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
