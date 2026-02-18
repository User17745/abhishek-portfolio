import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.PUBLIC_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const JSON_SCHEMA = {
  type: "object",
  properties: {
    fit_score: { type: "number" },
    strong_matches: { type: "array", items: { type: "string" } },
    partial_matches: { type: "array", items: { type: "string" } },
    gaps: { type: "array", items: { type: "string" } },
    recommended_positioning: { type: "string" },
    confidence_level: { type: "string", enum: ["High", "Medium", "Low"] },
  },
  required: [
    "fit_score",
    "strong_matches",
    "partial_matches",
    "gaps",
    "recommended_positioning",
    "confidence_level",
  ],
};

export interface CookieResponse {
  fit_score: number;
  strong_matches: string[];
  partial_matches: string[];
  gaps: string[];
  recommended_positioning: string;
  confidence_level: "High" | "Medium" | "Low";
}

export async function callGeminiWithContext(
  systemPrompt: string,
  contextChunks: string[],
  userQuestion: string
): Promise<CookieResponse> {
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

  const prompt = `${systemPrompt}

## Context
${context}

## Question
${userQuestion}`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();

  try {
    return JSON.parse(response);
  } catch (parseError) {
    console.error("Failed to parse JSON response:", response);
    throw new Error("Invalid JSON response from Gemini");
  }
}
