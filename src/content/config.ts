import { defineCollection, z } from 'astro:content';

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    platform: z.string(),
    region: z.string(),
    year: z.string(),
    description: z.string(),
    highlights: z.array(z.string()),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    coverImage: z.string().optional(),
    publishedAt: z.date(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    author: z.string().default('Abhishek Aggarwal'),
    tags: z.array(z.string()),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'case-studies': caseStudies,
  'blog': blog,
};
