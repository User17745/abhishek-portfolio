#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHUNKS_FILE = path.join(__dirname, '../docs/resources/rag/chunks.json');
const OUTPUT_FILE = path.join(__dirname, '../docs/resources/rag/embeddings.json');

const GEMINI_API_KEY = process.env.PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY environment variable is not set');
  console.log('Please set your API key: export GEMINI_API_KEY=your_api_key');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function getEmbedding(text) {
  // Use the newer embeddings API approach
  const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });
  
  const result = await model.embedContent({
    content: { role: 'user', parts: [{ text }] },
    taskType: 'SEMANTIC_SIMILARITY'
  });
  
  return result.embedding.values;
}

async function processEmbeddings() {
  console.log('Loading chunks from:', CHUNKS_FILE);
  const chunks = JSON.parse(fs.readFileSync(CHUNKS_FILE, 'utf-8'));
  console.log(`Loaded ${chunks.length} chunks\n`);
  
  const embeddings = [];
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const text = `[${chunk.heading || chunk.title}]\n${chunk.content}`;
    
    console.log(`Processing chunk ${i + 1}/${chunks.length}: ${chunk.id}`);
    
    try {
      const embedding = await getEmbedding(text);
      
      embeddings.push({
        id: chunk.id,
        text: text,
        embedding: embedding,
        metadata: {
          source: chunk.source,
          title: chunk.title,
          role: chunk.role || '',
          focus: chunk.focus || '',
          heading: chunk.heading || ''
        }
      });
      
      console.log(`  ✓ Got embedding (${embedding.length} dimensions)\n`);
      
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}\n`);
    }
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(embeddings, null, 2));
  console.log(`\nTotal embeddings: ${embeddings.length}`);
  console.log(`Output written to: ${OUTPUT_FILE}`);
}

processEmbeddings();
