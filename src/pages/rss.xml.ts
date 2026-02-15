import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/lib/config';

export async function GET(context: { site: string }) {
  const posts = await getCollection('blog');
  
  return rss({
    title: `${siteConfig.name} - Blog`,
    description: siteConfig.description,
    site: context.site || siteConfig.url,
    items: posts
      .filter(post => !post.data.draft)
      .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.publishedAt,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}
