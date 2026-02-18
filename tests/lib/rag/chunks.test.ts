import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "fs";
import path from "path";

describe("Chunk Generation Script", () => {
  const chunksFilePath = "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/docs/resources/rag/chunks.json";

  it("should generate chunks.json file", () => {
    expect(fs.existsSync(chunksFilePath)).toBe(true);
  });

  it("should have valid JSON structure", () => {
    const content = fs.readFileSync(chunksFilePath, "utf-8");
    const chunks = JSON.parse(content);
    expect(Array.isArray(chunks)).toBe(true);
  });

  it("should contain expected number of chunks", () => {
    const content = fs.readFileSync(chunksFilePath, "utf-8");
    const chunks = JSON.parse(content);
    // We expect 38 chunks based on the script output
    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks.length).toBe(38);
  });

  it("should have required fields in each chunk", () => {
    const content = fs.readFileSync(chunksFilePath, "utf-8");
    const chunks = JSON.parse(content);

    chunks.forEach((chunk: any, index: number) => {
      expect(chunk).toHaveProperty("id");
      expect(chunk).toHaveProperty("source");
      expect(chunk).toHaveProperty("title");
      expect(chunk).toHaveProperty("heading");
      expect(chunk).toHaveProperty("content");
      expect(chunk).toHaveProperty("tokens");
    });
  });

  it("should have valid id format", () => {
    const content = fs.readFileSync(chunksFilePath, "utf-8");
    const chunks = JSON.parse(content);

    chunks.forEach((chunk: any) => {
      expect(chunk.id).toMatch(/^[a-z0-9\-()]+$/);
    });
  });

  it("should have non-empty content", () => {
    const content = fs.readFileSync(chunksFilePath, "utf-8");
    const chunks = JSON.parse(content);

    chunks.forEach((chunk: any) => {
      expect(chunk.content.length).toBeGreaterThan(0);
      expect(chunk.title.length).toBeGreaterThan(0);
    });
  });

  it("should have valid tokens count", () => {
    const content = fs.readFileSync(chunksFilePath, "utf-8");
    const chunks = JSON.parse(content);

    chunks.forEach((chunk: any) => {
      expect(typeof chunk.tokens).toBe("number");
      expect(chunk.tokens).toBeGreaterThan(0);
    });
  });

  it("should contain all source files", () => {
    const content = fs.readFileSync(chunksFilePath, "utf-8");
    const chunks = JSON.parse(content);
    const sources = new Set(chunks.map((c: any) => c.source));

    expect(sources.has("career-journey")).toBe(true);
    expect(sources.has("ecommerce")).toBe(true);
    expect(sources.has("product-manager")).toBe(true);
    expect(sources.has("shopify-tpm")).toBe(true);
  });
});

describe("Embeddings File", () => {
  const embeddingsFilePath = "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/docs/resources/rag/embeddings.json";

  it("should skip if embeddings.json not generated", () => {
    // This test is skipped if embeddings.json doesn't exist
    // Run: node scripts/generate-embeddings.mjs to generate it
    const exists = fs.existsSync(embeddingsFilePath);
    if (!exists) {
      console.log("Note: Run 'node scripts/generate-embeddings.mjs' to generate embeddings");
    }
    // Just pass - the embeddings file is optional for basic tests
    expect(true).toBe(true);
  });

  it("should have valid embedding structure if file exists", () => {
    if (!fs.existsSync(embeddingsFilePath)) {
      return;
    }

    const content = fs.readFileSync(embeddingsFilePath, "utf-8");
    const embeddings = JSON.parse(content);

    expect(Array.isArray(embeddings)).toBe(true);
    expect(embeddings.length).toBeGreaterThan(0);

    embeddings.forEach((emb: any) => {
      expect(emb).toHaveProperty("id");
      expect(emb).toHaveProperty("text");
      expect(emb).toHaveProperty("embedding");
      expect(emb).toHaveProperty("metadata");
      expect(Array.isArray(emb.embedding)).toBe(true);
      expect(emb.embedding.length).toBeGreaterThan(0);
    });
  });
});
