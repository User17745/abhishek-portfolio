import type { APIRoute } from "astro";
import { getEmbedding } from "@/lib/embeddings/gemini";
import { findTopMatches, formatMatchResults, type EmbeddingChunk } from "@/lib/embeddings/search";

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

    // Format response
    const formattedResults = formatMatchResults(topMatches);

    return new Response(
      JSON.stringify({
        query: searchQuery,
        matches: topMatches.map((m) => ({
          id: m.chunk.id,
          title: m.chunk.metadata.title,
          role: m.chunk.metadata.role,
          focus: m.chunk.metadata.focus,
          heading: m.chunk.metadata.heading,
          score: m.score,
          text: m.chunk.text,
        })),
        formatted: formattedResults,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
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
