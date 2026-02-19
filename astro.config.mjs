// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import fs from 'fs';
import path from 'path';

// Copy embeddings to public folder for production
const copyEmbeddings = () => ({
  name: 'copy-embeddings',
  hooks: {
    'astro:build:start': () => {
      try {
        const srcPath = path.join(process.cwd(), 'docs/resources/rag/embeddings.json');
        const destPath = path.join(process.cwd(), 'public/embeddings.json');
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log('✓ Copied embeddings.json to public folder');
        }
      } catch (err) {
        console.warn('Could not copy embeddings:', err instanceof Error ? err.message : String(err));
      }
    }
  }
});

// https://astro.build/config
export default defineConfig({
  site: 'https://abhishekaggarwal.com',
  output: 'server',
  adapter: vercel(),
  integrations: [
    copyEmbeddings(),
    react({
      experimentalReactChildren: true,
    }),
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
    }),
    mdx()
  ],
  vite: {
    plugins: [tailwindcss()],
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react'
    }
  }
});
