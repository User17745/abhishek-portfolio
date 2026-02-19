import { GoogleGenerativeAI, TaskType } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getEmbedding(text: string): Promise<number[]> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

  const result = await model.embedContent({
    content: { role: "user", parts: [{ text }] },
    taskType: TaskType.RETRIEVAL_DOCUMENT,
  });

  return result.embedding.values;
}

export async function getEmbeddings(texts: string[]): Promise<number[][]> {
  const embeddings = await Promise.all(texts.map((text) => getEmbedding(text)));
  return embeddings;
}
