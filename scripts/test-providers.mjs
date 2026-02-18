#!/usr/bin/env node

import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

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

async function testWithTimeout(name, testFn, timeout = 30000) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Testing ${name}...`);
  console.log("=".repeat(60));

  try {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Timeout after 30s")), timeout)
    );
    const result = await Promise.race([testFn(), timeoutPromise]);
    return result;
  } catch (error) {
    console.log("✗ FAILED");
    console.log(`  Error: ${error.message}`);
    return false;
  }
}

async function testGemini(apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { temperature: 0.3, responseMimeType: "application/json" },
  });

  const startTime = Date.now();
  const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nQuestion: ${testQuestion}`);
  const duration = Date.now() - startTime;

  const response = JSON.parse(result.response.text());
  console.log("✓ SUCCESS");
  console.log(`  Response time: ${duration}ms`);
  console.log(`  Fit score: ${response.fit_score}`);
  return true;
}

async function testZhipuAI(apiKey) {
  const { ZhipuAI } = await import("zhipuai");
  const client = new ZhipuAI({ apiKey });
  
  const startTime = Date.now();
  const result = await client.chat.completions.create({
    model: "glm-4.7-flash",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: testQuestion },
    ],
    temperature: 0.3,
  });
  const duration = Date.now() - startTime;

  const content = result.choices[0]?.message?.content;
  let response;
  try {
    response = JSON.parse(content);
  } catch {
    const match = content.match(/```json\n([\s\S]*?)\n```/);
    response = JSON.parse(match[1]);
  }

  console.log("✓ SUCCESS");
  console.log(`  Response time: ${duration}ms`);
  console.log(`  Fit score: ${response.fit_score}`);
  return true;
}

async function testOpenRouter(apiKey) {
  const client = new OpenAI({ apiKey, baseURL: "https://openrouter.ai/api/v1" });
  
  const startTime = Date.now();
  const result = await client.chat.completions.create({
    model: "google/gemini-2.0-flash-001",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: testQuestion },
    ],
    temperature: 0.3,
  });
  const duration = Date.now() - startTime;

  const response = JSON.parse(result.choices[0].message.content);
  console.log("✓ SUCCESS");
  console.log(`  Response time: ${duration}ms`);
  console.log(`  Fit score: ${response.fit_score}`);
  return true;
}

async function testNvidia(apiKey) {
  const client = new OpenAI({ apiKey, baseURL: "https://integrate.api.nvidia.com/v1" });
  
  const startTime = Date.now();
  const result = await client.chat.completions.create({
    model: "moonshotai/kimi-k2.5",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: testQuestion },
    ],
    temperature: 0.3,
  });
  const duration = Date.now() - startTime;

  const response = JSON.parse(result.choices[0].message.content);
  console.log("✓ SUCCESS");
  console.log(`  Response time: ${duration}ms`);
  console.log(`  Fit score: ${response.fit_score}`);
  return true;
}

async function main() {
  console.log("Testing all LLM providers...\n");

  // Load env vars
  const env = {};
  try {
    const fs = await import("fs");
    const envContent = fs.readFileSync(".env", "utf-8");
    envContent.split("\n").forEach(line => {
      const [key, ...valueParts] = line.split("=");
      if (key && valueParts.length > 0 && !key.startsWith("#")) {
        env[key.trim()] = valueParts.join("=").trim();
      }
    });
  } catch (e) {}

  const getEnv = (key) => process.env[key] || env[key];
  const results = {};

  // Test Gemini
  const geminiKey = getEnv("PUBLIC_GEMINI_API_KEY");
  if (geminiKey && !geminiKey.includes("your_")) {
    results.gemini = await testWithTimeout("GEMINI", () => testGemini(geminiKey));
  } else {
    console.log("\n⚠ SKIPPED: Gemini");
    results.gemini = false;
  }

  // Test ZhipuAI
  const zhipuKey = getEnv("PUBLIC_ZHIPUAI_API_KEY");
  if (zhipuKey && !zhipuKey.includes("your_")) {
    results.zhipuai = await testWithTimeout("ZHIPUAI", () => testZhipuAI(zhipuKey));
  } else {
    console.log("\n⚠ SKIPPED: ZhipuAI");
    results.zhipuai = false;
  }

  // Test OpenRouter
  const routerKey = getEnv("PUBLIC_OPENROUTER_API_KEY");
  if (routerKey && !routerKey.includes("your_")) {
    results.openrouter = await testWithTimeout("OPENROUTER", () => testOpenRouter(routerKey));
  } else {
    console.log("\n⚠ SKIPPED: OpenRouter");
    results.openrouter = false;
  }

  // Test Nvidia
  const nvidiaKey = getEnv("PUBLIC_NVIDIA_API_KEY");
  if (nvidiaKey && !nvidiaKey.includes("your_")) {
    results.nvidia = await testWithTimeout("NVIDIA NIM", () => testNvidia(nvidiaKey));
  } else {
    console.log("\n⚠ SKIPPED: Nvidia");
    results.nvidia = false;
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("SUMMARY");
  console.log("=".repeat(60));
  for (const [provider, success] of Object.entries(results)) {
    console.log(`${provider.padEnd(12)} ${success ? "✓ WORKING" : "✗ FAILED/SKIPPED"}`);
  }
}

main();
