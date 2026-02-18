#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAG_DIR = path.join(__dirname, '../docs/resources/rag');
const OUTPUT_FILE = path.join(__dirname, '../docs/resources/rag/chunks.json');

function countTokens(text) {
  return text.split(/\s+/).length;
}

function splitByHeading(markdown) {
  const sections = [];
  const lines = markdown.split('\n');
  
  let currentSection = null;
  let currentContent = [];
  let currentHeading = '';
  
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentContent.length > 0) {
        const content = currentContent.join('\n').replace(/^---$/gm, '').trim();
        if (content) {
          sections.push({
            heading: currentHeading,
            content: content
          });
        }
      }
      currentHeading = line.replace(/^##+\s*/, '').trim();
      currentContent = [];
    } else if (!line.startsWith('---')) {
      currentContent.push(line);
    }
  }
  
  if (currentContent.length > 0) {
    const content = currentContent.join('\n').replace(/^---$/gm, '').trim();
    if (content) {
      sections.push({
        heading: currentHeading,
        content: content
      });
    }
  }
  
  return sections;
}

function chunkSection(section, targetTokens = 500, overlapTokens = 100) {
  const chunks = [];
  const words = section.content.split(/\s+/);
  
  if (words.length <= targetTokens) {
    chunks.push({
      heading: section.heading,
      content: section.content,
      tokens: words.length
    });
    return chunks;
  }
  
  let start = 0;
  
  while (start < words.length) {
    const end = Math.min(start + targetTokens, words.length);
    const chunkContent = words.slice(start, end).join(' ');
    const overlapStart = Math.max(0, start + targetTokens - overlapTokens);
    const overlapWords = words.slice(overlapStart, start + targetTokens);
    
    chunks.push({
      heading: section.heading,
      content: chunkContent,
      tokens: end - start,
      overlap: start > 0 ? overlapWords.join(' ').substring(0, 200) : null
    });
    
    if (end >= words.length) break;
    start = start + targetTokens - overlapTokens;
    if (start < 0) start = 0;
  }
  
  return chunks;
}

async function processFiles() {
  const files = fs.readdirSync(RAG_DIR).filter(f => f.endsWith('.md'));
  
  const allChunks = [];
  
  for (const file of files) {
    const filePath = path.join(RAG_DIR, file);
    const markdown = fs.readFileSync(filePath, 'utf-8');
    
    const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/);
    let content = markdown;
    let metadata = {};
    
    if (frontmatterMatch) {
      content = markdown.slice(frontmatterMatch[0].length);
      const frontmatter = frontmatterMatch[1];
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          metadata[key.trim()] = valueParts.join(':').trim();
        }
      });
    }
    
    const sections = splitByHeading(content);
    let totalChunks = 0;
    
    for (const section of sections) {
      const sectionChunks = chunkSection(section);
      totalChunks += sectionChunks.length;
      
      for (const chunk of sectionChunks) {
        allChunks.push({
          id: `${file.replace('.md', '')}-${section.heading.toLowerCase().replace(/\s+/g, '-')}-${allChunks.length}`,
          source: file.replace('.md', ''),
          title: metadata.title || section.heading,
          role: metadata.role || '',
          focus: metadata.focus || '',
          heading: chunk.heading,
          content: chunk.content,
          tokens: chunk.tokens,
          overlap: chunk.overlap
        });
      }
    }
    
    console.log(`Processed ${file}: ${sections.length} sections, ${totalChunks} chunks`);
  }
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allChunks, null, 2));
  console.log(`\nTotal chunks: ${allChunks.length}`);
  console.log(`Output written to: ${OUTPUT_FILE}`);
}

processFiles();
