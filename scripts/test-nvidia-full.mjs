#!/usr/bin/env node

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

const testContext = [
  "Abhishek Aggarwal is a Technology Solutions Architect with 12+ years of experience in eCommerce and enterprise platforms.",
  "He has worked with brands like Victoria's Secret, Philips, and Metro Shoes.",
];

const testQuestion = "We need a Technical Project Manager with eCommerce experience for a Shopify Plus implementation.";

async function testNvidiaFull() {
  console.log("Testing Nvidia NIM with full context...\n");
  
  const fs = await import("fs");
  const envContent = fs.readFileSync(".env", "utf-8");
  const env = {};
  envContent.split("\n").forEach(line => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0 && !key.startsWith("#")) {
      env[key.trim()] = valueParts.join("=").trim();
    }
  });
  
  const apiKey = env.PUBLIC_NVIDIA_API_KEY;
  const context = testContext.join("\n\n");
  
  try {
    const startTime = Date.now();
    
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
      },
      body: JSON.stringify({
        model: "moonshotai/kimi-k2.5",
        messages: [
          {
            role: "user",
            content: `${SYSTEM_PROMPT}\n\nContext:\n${context}\n\nQuestion:\n${testQuestion}`
          },
        ],
        max_tokens: 16384,
        temperature: 1.0,
        top_p: 1.0,
        stream: false,
        chat_template_kwargs: { thinking: false }
      }),
    });

    const duration = Date.now() - startTime;
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const result = await response.json();
    const content = result.choices[0]?.message?.content;
    
    console.log("✓ SUCCESS");
    console.log(`  Response time: ${duration}ms`);
    
    const parsed = JSON.parse(content);
    console.log(`  Fit score: ${parsed.fit_score}`);
    console.log(`  Confidence: ${parsed.confidence_level}`);
    console.log(`  Strong matches: ${parsed.strong_matches?.length || 0}`);
    
  } catch (error) {
    console.log("✗ FAILED");
    console.log(`  Error: ${error.message}`);
  }
}

testNvidiaFull();
