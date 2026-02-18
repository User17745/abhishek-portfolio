#!/usr/bin/env node

async function testNvidiaSimple() {
  console.log("Testing Nvidia with simpler prompt...\n");
  
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
  
  const simplePrompt = `Analyze this job fit:

Candidate: Abhishek Aggarwal, 12+ years eCommerce experience, worked with Victoria's Secret, Philips, Metro Shoes.

Job: Technical Project Manager for Shopify Plus implementation.

Return ONLY a JSON object with:
- fit_score (0-100)
- strong_matches (array of strings)
- partial_matches (array of strings)  
- gaps (array of strings)
- recommended_positioning (string)
- confidence_level ("High", "Medium", or "Low")`;

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
        messages: [{ role: "user", content: simplePrompt }],
        max_tokens: 4096,
        temperature: 0.7,
        top_p: 1.0,
        stream: false,
        chat_template_kwargs: { thinking: false }
      }),
    });

    const duration = Date.now() - startTime;
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    const content = result.choices[0]?.message?.content;
    
    console.log("✓ SUCCESS");
    console.log(`  Response time: ${duration}ms`);
    console.log(`  Response preview: ${content?.substring(0, 200)}...`);
    
  } catch (error) {
    console.log("✗ FAILED");
    console.log(`  Error: ${error.message}`);
  }
}

testNvidiaSimple();
