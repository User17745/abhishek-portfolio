#!/usr/bin/env node

// Test Nvidia with exact cURL parameters
async function testNvidiaExact() {
  console.log("Testing Nvidia NIM with exact cURL parameters...\n");
  
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
  
  if (!apiKey || apiKey.includes("your_")) {
    console.log("No API key found");
    return;
  }
  
  console.log("API Key found:", apiKey.substring(0, 20) + "...");
  
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
            content: "Hello"
          }
        ],
        max_tokens: 16384,
        temperature: 1.00,
        top_p: 1.00,
        stream: false,
        chat_template_kwargs: {
          thinking: false
        }
      }),
    });

    const duration = Date.now() - startTime;
    
    console.log(`Response status: ${response.status}`);
    console.log(`Response time: ${duration}ms`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error response:", errorText);
      return;
    }

    const result = await response.json();
    console.log("\n✓ SUCCESS");
    console.log("Response:", result.choices[0]?.message?.content);
    
  } catch (error) {
    console.log("\n✗ FAILED");
    console.log("Error:", error.message);
  }
}

testNvidiaExact();
