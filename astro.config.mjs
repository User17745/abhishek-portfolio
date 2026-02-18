// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://abhishekaggarwal.com',
  output: 'server',
  adapter: vercel(),
  integrations: [react({
    experimentalReactChildren: true,
  }), sitemap({
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date(),
  }), mdx()],
  vite: {
    plugins: [tailwindcss()],
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'react'
    }
  }
});
