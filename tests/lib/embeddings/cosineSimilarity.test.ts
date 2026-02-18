import { describe, it, expect } from "vitest";
import { cosineSimilarity } from "../../src/lib/embeddings/cosineSimilarity";

describe("cosineSimilarity", () => {
  it("should return 1 for identical vectors", () => {
    const vector = [1, 2, 3, 4, 5];
    expect(cosineSimilarity(vector, vector)).toBeCloseTo(1, 5);
  });

  it("should return -1 for opposite vectors", () => {
    const vectorA = [1, 2, 3];
    const vectorB = [-1, -2, -3];
    expect(cosineSimilarity(vectorA, vectorB)).toBeCloseTo(-1, 5);
  });

  it("should return 0 for orthogonal vectors", () => {
    const vectorA = [1, 0, 0];
    const vectorB = [0, 1, 0];
    expect(cosineSimilarity(vectorA, vectorB)).toBeCloseTo(0, 5);
  });

  it("should return 0 for zero vector", () => {
    const vectorA = [1, 2, 3];
    const vectorB = [0, 0, 0];
    expect(cosineSimilarity(vectorA, vectorB)).toBe(0);
  });

  it("should handle 2D vectors", () => {
    const vectorA = [1, 1];
    const vectorB = [1, 1];
    expect(cosineSimilarity(vectorA, vectorB)).toBeCloseTo(1, 5);
  });

  it("should handle high-dimensional vectors", () => {
    const vectorA = Array(1000).fill(1);
    const vectorB = Array(1000).fill(1);
    expect(cosineSimilarity(vectorA, vectorB)).toBeCloseTo(1, 5);
  });

  it("should handle partially similar vectors", () => {
    const vectorA = [1, 2, 3];
    const vectorB = [1, 2, 4];
    const similarity = cosineSimilarity(vectorA, vectorB);
    expect(similarity).toBeGreaterThan(0.9);
    expect(similarity).toBeLessThan(1);
  });

  it("should throw error for vectors of different lengths", () => {
    const vectorA = [1, 2, 3];
    const vectorB = [1, 2];
    expect(() => cosineSimilarity(vectorA, vectorB)).toThrow(
      "Vectors must have the same dimension"
    );
  });

  it("should handle negative values correctly", () => {
    const vectorA = [-1, -2, -3];
    const vectorB = [1, 2, 3];
    expect(cosineSimilarity(vectorA, vectorB)).toBeCloseTo(-1, 5);
  });

  it("should handle mixed positive and negative values", () => {
    const vectorA = [1, -1, 2, -2];
    const vectorB = [1, -1, 2, -2];
    expect(cosineSimilarity(vectorA, vectorB)).toBeCloseTo(1, 5);
  });

  it("should correctly compute similarity for typical embedding values", () => {
    // Simulate typical embedding values (normalized around 0)
    const embedding1 = [0.1, -0.2, 0.3, -0.4, 0.5];
    const embedding2 = [0.1, -0.2, 0.3, -0.4, 0.5];
    expect(cosineSimilarity(embedding1, embedding2)).toBeCloseTo(1, 3);
  });
});
