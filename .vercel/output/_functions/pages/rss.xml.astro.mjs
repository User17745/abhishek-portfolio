import rss from '@astrojs/rss';
import { g as getCollection } from '../chunks/_astro_content_Bc5dHd3R.mjs';
import { s as siteConfig } from '../chunks/config_DgxodS-V.mjs';
export { renderers } from '../renderers.mjs';

async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: `${siteConfig.name} - Blog`,
    description: siteConfig.description,
    site: context.site || siteConfig.url,
    items: posts.filter((post) => !post.data.draft).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()).map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/blog/${post.slug}/`
    })),
    customData: `<language>en-us</language>`
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
