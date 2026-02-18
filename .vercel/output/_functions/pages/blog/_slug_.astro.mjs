import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_D5QLXxeQ.mjs';
import 'piccolore';
import { $ as $$Layout, B as Button, a as Badge } from '../../chunks/badge_C3Zljwn0.mjs';
import { $ as $$Header, a as $$Footer } from '../../chunks/Footer_Di6c884w.mjs';
import { g as getCollection } from '../../chunks/_astro_content_BHcVUcto.mjs';
import { ArrowLeft } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://abhishekaggarwal.com");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { post } = Astro2.props;
  const { Content } = await post.render();
  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": post.data.title, "description": post.data.description, "type": "article" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="pt-16"> <article class="py-20 px-4"> <div class="container mx-auto max-w-3xl"> ${renderComponent($$result2, "Button", Button, { "variant": "ghost", "asChild": true, "className": "mb-8" }, { "default": async ($$result3) => renderTemplate` <a href="/blog" class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"> ${renderComponent($$result3, "ArrowLeft", ArrowLeft, { "className": "h-4 w-4" })}
Back to Blog
</a> ` })} <header class="mb-12"> <div class="flex flex-wrap gap-2 mb-4"> ${post.data.tags.map((tag) => renderTemplate`${renderComponent($$result2, "Badge", Badge, { "variant": "outline", "className": "text-accent border-accent/30" }, { "default": async ($$result3) => renderTemplate`${tag}` })}`)} </div> <h1 class="text-4xl font-bold mb-4">${post.data.title}</h1> <p class="text-xl text-muted-foreground mb-6">${post.data.description}</p> <div class="flex items-center gap-4 text-muted-foreground"> <span class="font-medium text-foreground">${post.data.author}</span> <span class="text-muted-foreground/50">•</span> <time>${formatDate(post.data.publishedAt)}</time> </div> </header> <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:gradient-text prose-a:text-accent hover:prose-a:text-accent/80"> ${renderComponent($$result2, "Content", Content, {})} </div> </div> </article> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
