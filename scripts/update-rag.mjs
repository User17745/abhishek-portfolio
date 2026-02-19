#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔄 Updating RAG Knowledge Base...\n');

// Step 1: Generate RAG chunks
console.log('Step 1/3: Generating RAG chunks...');
try {
  execSync('node scripts/generate-rag-chunks.mjs', { stdio: 'inherit' });
  console.log('✅ RAG chunks generated\n');
} catch (error) {
  console.error('❌ Failed to generate RAG chunks:', error);
  process.exit(1);
}

// Step 2: Generate embeddings
console.log('Step 2/3: Generating embeddings...');
try {
  execSync('node scripts/generate-embeddings.mjs', { stdio: 'inherit' });
  console.log('✅ Embeddings generated\n');
} catch (error) {
  console.error('❌ Failed to generate embeddings:', error);
  process.exit(1);
}

// Step 3: Copy to public folder
console.log('Step 3/3: Copying to public folder...');
try {
  const EMBEDDINGS_SRC = path.join(__dirname, 'docs/resources/rag/embeddings.json');
  const EMBEDDINGS_DST = path.join(__dirname, 'public/embeddings.json');

  if (fs.existsSync(EMBEDDINGS_SRC)) {
    fs.copyFileSync(EMBEDDINGS_SRC, EMBEDDINGS_DST);
    console.log('✅ Copied to public/embeddings.json\n');
  } else {
    console.error('❌ Embeddings file not found:', EMBEDDINGS_SRC);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Failed to copy embeddings:', error);
  process.exit(1);
}

console.log('🎉 RAG update complete! Your knowledge base is now up to date.');
console.log('\nTo deploy, commit and push these changes:');
console.log('  git add docs/resources/rag/ public/embeddings.json');
console.log('  git commit -m "Update RAG knowledge base"');
console.log('  git push');
