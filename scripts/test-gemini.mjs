#!/usr/bin/env node

import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are the AI professional representation for Abhishek Aggarwal. Your name is Cookie.

Return:
{
  "fit_score": number (0-100),
  "strong_matches": string[],
  "partial_matches": string[],
  "gaps": string[],
  "recommended_positioning": string,
  "confidence_level": "High" | "Medium" | "Low"
}`;

const testQuestion = "We need a Technical Project Manager with eCommerce experience.";

async function testGemini(apiKey) {
  console.log("Testing Gemini 2.5-flash...");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { 
      temperature: 0.3, 
      responseMimeType: "application/json" 
    },
  });

  const startTime = Date.now();
  const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nQuestion: ${testQuestion}`);
  const duration = Date.now() - startTime;

  const response = JSON.parse(result.response.text());
  console.log("✓ SUCCESS");
  console.log(`  Response time: ${duration}ms`);
  console.log(`  Fit score: ${response.fit_score}`);
  console.log(`  Confidence: ${response.confidence_level}`);
  return true;
}

// Load env
const fs = await import("fs");
const envContent = fs.readFileSync(".env", "utf-8");
const env = {};
envContent.split("\n").forEach(line => {
  const [key, ...valueParts] = line.split("=");
  if (key && valueParts.length > 0 && !key.startsWith("#")) {
    env[key.trim()] = valueParts.join("=").trim();
  }
});

testGemini(env.PUBLIC_GEMINI_API_KEY);
