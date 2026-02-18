import { cosineSimilarity } from "./cosineSimilarity";

export interface EmbeddingChunk {
  id: string;
  text: string;
  embedding: number[];
  metadata: {
    source: string;
    title: string;
    role: string;
    focus: string;
    heading: string;
  };
}

export interface SearchResult {
  chunk: EmbeddingChunk;
  score: number;
}

export function findTopMatches(
  jobDescriptionEmbedding: number[],
  storedEmbeddings: EmbeddingChunk[],
  topK: number = 5
): SearchResult[] {
  const results: SearchResult[] = storedEmbeddings.map((chunk) => ({
    chunk,
    score: cosineSimilarity(jobDescriptionEmbedding, chunk.embedding),
  }));

  results.sort((a, b) => b.score - a.score);

  return results.slice(0, topK);
}

export function formatMatchResults(results: SearchResult[]): string {
  return results
    .map(
      (result, index) =>
        `${index + 1}. **${result.chunk.metadata.title}** (${result.chunk.metadata.role})\n   Score: ${(result.score * 100).toFixed(1)}%\n   ${result.chunk.text.substring(0, 200)}...`
    )
    .join("\n\n");
}
