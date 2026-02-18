import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.PUBLIC_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const JSON_SCHEMA = {
  type: "object",
  properties: {
    fit_score: { type: "number" },
    summary: { type: "string" },
    strong_matches: {
      type: "array",
      items: {
        type: "object",
        properties: {
          category: { type: "string" },
          evidence: { type: "string" },
          relevance: { type: "string" },
        },
        required: ["category", "evidence", "relevance"],
      },
    },
    gaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          requirement: { type: "string" },
          severity: { type: "string", enum: ["critical", "major", "minor", "none"] },
          mitigation: { type: "string" },
        },
        required: ["requirement", "severity", "mitigation"],
      },
    },
    positioning: {
      type: "object",
      properties: {
        primary_angle: { type: "string" },
        differentiators: { type: "array", items: { type: "string" } },
        talking_points: { type: "array", items: { type: "string" } },
      },
      required: ["primary_angle", "differentiators", "talking_points"],
    },
    questions: { type: "array", items: { type: "string" } },
    next_steps: { type: "array", items: { type: "string" } },
  },
  required: [
    "fit_score",
    "summary",
    "strong_matches",
    "gaps",
    "positioning",
    "questions",
    "next_steps",
  ],
};

export async function callGeminiWithContext(
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string
): Promise<{
  fit_score: number;
  summary: string;
  strong_matches: Array<{
    category: string;
    evidence: string;
    relevance: string;
  }>;
  gaps: Array<{
    requirement: string;
    severity: "critical" | "major" | "minor" | "none";
    mitigation: string;
  }>;
  positioning: {
    primary_angle: string;
    differentiators: string[];
    talking_points: string[];
  };
  questions: string[];
  next_steps: string[];
}> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
      responseSchema: JSON_SCHEMA,
    },
  });

  const context = contextChunks.map((chunk, i) => `--- Context ${i + 1} ---\n${chunk}`).join("\n\n");

  const prompt = `You are Cookie, an AI career assistant. Use ONLY the context provided below to answer.

${systemPrompt}

## Retrieved Context
${context}

## User Question
${userQuestion}

Respond with valid JSON only. Do not include any text outside the JSON.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    return JSON.parse(response);
  } catch (parseError) {
    console.error("Failed to parse JSON response:", response);
    throw new Error("Invalid JSON response from Gemini");
  }
}
