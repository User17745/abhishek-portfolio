import { describe, it, expect, beforeEach } from "vitest";
import { findTopMatches, formatMatchResults, type EmbeddingChunk, type SearchResult } from "../../../src/lib/embeddings/search";

describe("findTopMatches", () => {
  let mockEmbeddings: EmbeddingChunk[];

  beforeEach(() => {
    mockEmbeddings = [
      {
        id: "chunk-1",
        text: "Shopify Plus eCommerce implementation",
        embedding: [1, 0, 0],
        metadata: {
          source: "shopify-tpm",
          title: "Shopify TPM",
          role: "Technical Project Manager",
          focus: "Shopify Plus",
          heading: "Projects"
        }
      },
      {
        id: "chunk-2",
        text: "Magento enterprise solutions",
        embedding: [0, 1, 0],
        metadata: {
          source: "ecommerce",
          title: "eCommerce",
          role: "Solutions Architect",
          focus: "Enterprise",
          heading: "Tech Stack"
        }
      },
      {
        id: "chunk-3",
        text: "Product management SaaS platform",
        embedding: [0, 0, 1],
        metadata: {
          source: "product-manager",
          title: "Product Manager",
          role: "Product Lead",
          focus: "SaaS",
          heading: "Projects"
        }
      },
      {
        id: "chunk-4",
        text: "Shopify and Magento both eCommerce platforms",
        embedding: [0.8, 0.6, 0],
        metadata: {
          source: "ecommerce",
          title: "eCommerce",
          role: "Solutions Architect",
          focus: "Enterprise",
          heading: "Projects"
        }
      }
    ];
  });

  it("should return top K results sorted by score descending", () => {
    const queryEmbedding = [1, 0, 0];
    const results = findTopMatches(queryEmbedding, mockEmbeddings, 3);

    expect(results).toHaveLength(3);
    expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
    expect(results[1].score).toBeGreaterThanOrEqual(results[2].score);
  });

  it("should return the exact match first", () => {
    const queryEmbedding = [1, 0, 0];
    const results = findTopMatches(queryEmbedding, mockEmbeddings, 1);

    expect(results[0].chunk.id).toBe("chunk-1");
    expect(results[0].score).toBeCloseTo(1, 3);
  });

  it("should handle exact match", () => {
    const queryEmbedding = [0, 1, 0];
    const results = findTopMatches(queryEmbedding, mockEmbeddings, 1);

    expect(results[0].chunk.id).toBe("chunk-2");
    expect(results[0].score).toBeCloseTo(1, 3);
  });

  it("should return partial matches for similar vectors", () => {
    const queryEmbedding = [0.7, 0.5, 0.1];
    const results = findTopMatches(queryEmbedding, mockEmbeddings, 4);

    expect(results).toHaveLength(4);
    // chunk-1 and chunk-4 should be top due to similarity
    expect(["chunk-1", "chunk-4"]).toContain(results[0].chunk.id);
  });

  it("should return all results when topK exceeds array length", () => {
    const queryEmbedding = [1, 0, 0];
    const results = findTopMatches(queryEmbedding, mockEmbeddings, 10);

    expect(results).toHaveLength(4);
  });

  it("should default to top 5 when topK not specified", () => {
    const queryEmbedding = [1, 0, 0];
    const results = findTopMatches(queryEmbedding, mockEmbeddings);

    expect(results).toHaveLength(5);
  });

  it("should handle empty embeddings array", () => {
    const queryEmbedding = [1, 0, 0];
    const results = findTopMatches(queryEmbedding, [], 5);

    expect(results).toHaveLength(0);
  });

  it("should include chunk metadata in results", () => {
    const queryEmbedding = [1, 0, 0];
    const results = findTopMatches(queryEmbedding, mockEmbeddings, 1);

    expect(results[0].chunk.metadata.source).toBe("shopify-tpm");
    expect(results[0].chunk.metadata.title).toBe("Shopify TPM");
    expect(results[0].chunk.metadata.role).toBe("Technical Project Manager");
  });

  it("should correctly score similar vectors", () => {
    const queryEmbedding = [0.5, 0.5, 0];
    const results = findTopMatches(queryEmbedding, mockEmbeddings, 4);

    // chunk-4 has [0.8, 0.6, 0] which is most similar to [0.5, 0.5, 0]
    expect(results[0].chunk.id).toBe("chunk-4");
  });
});

describe("formatMatchResults", () => {
  it("should format results with correct structure", () => {
    const mockResults: SearchResult[] = [
      {
        chunk: {
          id: "test-1",
          text: "Test content about eCommerce",
          embedding: [1, 2, 3],
          metadata: {
            source: "test",
            title: "Test Title",
            role: "Test Role",
            focus: "Test Focus",
            heading: "Test Heading"
          }
        },
        score: 0.95
      }
    ];

    const formatted = formatMatchResults(mockResults);

    expect(formatted).toContain("Test Title");
    expect(formatted).toContain("Test Role");
    expect(formatted).toContain("95.0%");
    expect(formatted).toContain("1.");
  });

  it("should handle multiple results", () => {
    const mockResults: SearchResult[] = [
      {
        chunk: {
          id: "test-1",
          text: "First result",
          embedding: [1],
          metadata: { source: "test", title: "First", role: "Role1", focus: "Focus1", heading: "Heading1" }
        },
        score: 0.9
      },
      {
        chunk: {
          id: "test-2",
          text: "Second result",
          embedding: [1],
          metadata: { source: "test", title: "Second", role: "Role2", focus: "Focus2", heading: "Heading2" }
        },
        score: 0.8
      }
    ];

    const formatted = formatMatchResults(mockResults);

    expect(formatted).toContain("1.");
    expect(formatted).toContain("2.");
    expect(formatted).toContain("First");
    expect(formatted).toContain("Second");
  });

  it("should truncate long text content", () => {
    const longText = "A".repeat(500);
    const mockResults: SearchResult[] = [
      {
        chunk: {
          id: "test-1",
          text: longText,
          embedding: [1],
          metadata: { source: "test", title: "Test", role: "Role", focus: "Focus", heading: "Heading" }
        },
        score: 0.95
      }
    ];

    const formatted = formatMatchResults(mockResults);

    expect(formatted).toContain("...");
    expect(formatted.length).toBeLessThan(longText.length + 100);
  });

  it("should format score as percentage", () => {
    const mockResults: SearchResult[] = [
      {
        chunk: {
          id: "test-1",
          text: "Test",
          embedding: [1],
          metadata: { source: "test", title: "Test", role: "Role", focus: "Focus", heading: "Heading" }
        },
        score: 0.8567
      }
    ];

    const formatted = formatMatchResults(mockResults);

    expect(formatted).toContain("85.7%");
  });
});
