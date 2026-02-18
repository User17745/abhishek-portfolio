#!/usr/bin/env node

import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import ZhipuAI from "zhipuai";

const SYSTEM_PROMPT = `You are the AI professional representation for Abhishek Aggarwal. Your name is Cookie.

You must:
- Only use the provided career context.
- Never fabricate experience.
- If insufficient data exists, say: "Insufficient data to confirm."
- Be concise, recruiter-focused, and analytical.
- Output strictly valid JSON.

Return:
{
  "fit_score": number (0-100),
  "strong_matches": string[],
  "partial_matches": string[],
  "gaps": string[],
  "recommended_positioning": string,
  "confidence_level": "High" | "Medium" | "Low"
}`;

const testContext = [
  "Abhishek Aggarwal is a Technology Solutions Architect with 12+ years of experience in eCommerce and enterprise platforms.",
  "He has worked with brands like Victoria's Secret, Philips, and Metro Shoes.",
];

const testQuestion = "We need a Technical Project Manager with eCommerce experience for a Shopify Plus implementation.";

async function testGemini(apiKey) {
  console.log("\n" + "=".repeat(60));
  console.log("Testing GEMINI...");
  console.log("=".repeat(60));

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.3,
        responseMimeType: "application/json",
      },
    });

    const context = testContext.join("\n\n");
    const prompt = `${SYSTEM_PROMPT}\n\n## Context\n${context}\n\n## Question\n${testQuestion}`;

    const startTime = Date.now();
    const result = await model.generateContent(prompt);
    const duration = Date.now() - startTime;

    const response = JSON.parse(result.response.text());
    console.log("✓ SUCCESS");
    console.log(`  Response time: ${duration}ms`);
    console.log(`  Fit score: ${response.fit_score}`);
    console.log(`  Confidence: ${response.confidence_level}`);
    return true;
  } catch (error) {
    console.log("✗ FAILED");
    console.log(`  Error: ${error.message}`);
    return false;
  }
}

async function testZhipuAI(apiKey) {
  console.log("\n" + "=".repeat(60));
  console.log("Testing ZHIPUAI (GLM-4.7-Flash)...");
  console.log("=".repeat(60));

  try {
    const client = new ZhipuAI({ apiKey });
    
    const context = testContext.join("\n\n");
    const startTime = Date.now();
    
    const result = await client.chat.completions.create({
      model: "glm-4.7-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Context:\n${context}\n\nQuestion:\n${testQuestion}` },
      ],
      temperature: 0.3,
    });
    
    const duration = Date.now() - startTime;
    const content = result.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response content");
    }

    // Try to extract JSON from response
    let response;
    try {
      response = JSON.parse(content);
    } catch {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        response = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("Could not parse JSON response");
      }
    }

    console.log("✓ SUCCESS");
    console.log(`  Response time: ${duration}ms`);
    console.log(`  Fit score: ${response.fit_score}`);
    console.log(`  Confidence: ${response.confidence_level}`);
    return true;
  } catch (error) {
    console.log("✗ FAILED");
    console.log(`  Error: ${error.message}`);
    if (error.message.includes("404")) {
      console.log("  Note: Model 'glm-4.7-flash' may not be available. Try 'glm-4-flash' instead.");
    }
    return false;
  }
}

async function testOpenRouter(apiKey) {
  console.log("\n" + "=".repeat(60));
  console.log("Testing OPENROUTER...");
  console.log("=".repeat(60));

  try {
    const client = new OpenAI({
      apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const context = testContext.join("\n\n");
    const startTime = Date.now();
    
    const result = await client.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Context:\n${context}\n\nQuestion:\n${testQuestion}` },
      ],
      temperature: 0.3,
    });
    
    const duration = Date.now() - startTime;
    const content = result.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response content");
    }

    const response = JSON.parse(content);
    console.log("✓ SUCCESS");
    console.log(`  Response time: ${duration}ms`);
    console.log(`  Fit score: ${response.fit_score}`);
    console.log(`  Confidence: ${response.confidence_level}`);
    return true;
  } catch (error) {
    console.log("✗ FAILED");
    console.log(`  Error: ${error.message}`);
    return false;
  }
}

async function testNvidia(apiKey) {
  console.log("\n" + "=".repeat(60));
  console.log("Testing NVIDIA NIM...");
  console.log("=".repeat(60));

  try {
    const client = new OpenAI({
      apiKey,
      baseURL: "https://integrate.api.nvidia.com/v1",
    });

    const context = testContext.join("\n\n");
    const startTime = Date.now();
    
    const result = await client.chat.completions.create({
      model: "nvidia/llama-3.3-nemotron-super-49b-v1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Context:\n${context}\n\nQuestion:\n${testQuestion}` },
      ],
      temperature: 0.3,
    });
    
    const duration = Date.now() - startTime;
    const content = result.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response content");
    }

    const response = JSON.parse(content);
    console.log("✓ SUCCESS");
    console.log(`  Response time: ${duration}ms`);
    console.log(`  Fit score: ${response.fit_score}`);
    console.log(`  Confidence: ${response.confidence_level}`);
    return true;
  } catch (error) {
    console.log("✗ FAILED");
    console.log(`  Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log("Testing all LLM providers...\n");

  const results = {
    nvidia: false,
    zhipuai: false,
    openrouter: false,
    gemini: false,
  };

  // Test Nvidia
  if (process.env.PUBLIC_NVIDIA_API_KEY && 
      process.env.PUBLIC_NVIDIA_API_KEY !== "your_nvidia_api_key_here") {
    results.nvidia = await testNvidia(process.env.PUBLIC_NVIDIA_API_KEY);
  } else {
    console.log("\n⚠ SKIPPED: Nvidia (no API key)");
  }

  // Test ZhipuAI
  if (process.env.PUBLIC_ZHIPUAI_API_KEY && 
      process.env.PUBLIC_ZHIPUAI_API_KEY !== "your_zhipuai_api_key_here") {
    results.zhipuai = await testZhipuAI(process.env.PUBLIC_ZHIPUAI_API_KEY);
  } else {
    console.log("\n⚠ SKIPPED: ZhipuAI (no API key)");
  }

  // Test OpenRouter
  if (process.env.PUBLIC_OPENROUTER_API_KEY && 
      process.env.PUBLIC_OPENROUTER_API_KEY !== "your_openrouter_api_key_here") {
    results.openrouter = await testOpenRouter(process.env.PUBLIC_OPENROUTER_API_KEY);
  } else {
    console.log("\n⚠ SKIPPED: OpenRouter (no API key)");
  }

  // Test Gemini
  if (process.env.PUBLIC_GEMINI_API_KEY && 
      process.env.PUBLIC_GEMINI_API_KEY !== "your_gemini_api_key_here") {
    results.gemini = await testGemini(process.env.PUBLIC_GEMINI_API_KEY);
  } else {
    console.log("\n⚠ SKIPPED: Gemini (no API key)");
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("SUMMARY");
  console.log("=".repeat(60));
  
  for (const [provider, success] of Object.entries(results)) {
    const status = success ? "✓ WORKING" : "✗ FAILED/SKIPPED";
    console.log(`${provider.padEnd(12)} ${status}`);
  }
}

main();
