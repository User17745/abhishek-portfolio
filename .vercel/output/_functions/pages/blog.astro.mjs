import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_D5QLXxeQ.mjs';
import 'piccolore';
import { $ as $$Layout, a as Badge } from '../chunks/badge_C3Zljwn0.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_Di6c884w.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../chunks/card_BNVl2YLU.mjs';
import { g as getCollection } from '../chunks/_astro_content_Bc5dHd3R.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog", "description": "Thoughts on eCommerce, product management, and digital transformation from Abhishek Aggarwal." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="pt-16"> <section class="py-20 px-4"> <div class="container mx-auto max-w-4xl"> <div class="fade-in"> <h1 class="text-4xl font-bold mb-4 text-center">Blog</h1> </div> <div class="fade-in stagger-1"> <p class="text-muted-foreground text-center mb-12">
Thoughts on eCommerce, product management, and digital transformation.
</p> </div> <div class="space-y-6"> ${posts.map((post, index) => renderTemplate`<div${addAttribute(`fade-in stagger-${index % 3 + 2}`, "class")}> <a${addAttribute(`/blog/${post.slug}`, "href")} class="block"> ${renderComponent($$result2, "Card", Card, { "className": "hover-lift hover-glow gradient-border" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardHeader", CardHeader, {}, { "default": async ($$result4) => renderTemplate` <div class="flex flex-wrap items-center gap-3 mb-2"> <time class="text-sm text-accent font-medium">${formatDate(post.data.publishedAt)}</time> <span class="text-muted-foreground">•</span> <span class="text-sm text-muted-foreground">${post.data.author}</span> </div> ${renderComponent($$result4, "CardTitle", CardTitle, { "className": "text-xl" }, { "default": async ($$result5) => renderTemplate`${post.data.title}` })} ${renderComponent($$result4, "CardDescription", CardDescription, { "className": "text-base" }, { "default": async ($$result5) => renderTemplate`${post.data.description}` })} ` })} ${renderComponent($$result3, "CardContent", CardContent, {}, { "default": async ($$result4) => renderTemplate` <div class="flex flex-wrap gap-2"> ${post.data.tags.map((tag) => renderTemplate`${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "text-xs hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-colors" }, { "default": async ($$result5) => renderTemplate`${tag}` })}`)} </div> ` })} ` })} </a> </div>`)} </div> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/blog/index.astro", void 0);

const $$file = "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
