import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_D5QLXxeQ.mjs';
import 'piccolore';
import { $ as $$Layout, B as Button, a as Badge } from '../../chunks/badge_C3Zljwn0.mjs';
import { $ as $$Header, a as $$Footer } from '../../chunks/Footer_Di6c884w.mjs';
import { g as getCollection } from '../../chunks/_astro_content_CuloNDsh.mjs';
import { ArrowLeft } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://abhishekaggarwal.com");
async function getStaticPaths() {
  const caseStudies = await getCollection("case-studies");
  return caseStudies.map((study) => ({
    params: { slug: study.slug },
    props: { study }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { study } = Astro2.props;
  const { Content } = await study.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": study.data.title, "description": study.data.description, "type": "article" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="pt-16"> <article class="py-20 px-4"> <div class="container mx-auto max-w-4xl"> ${renderComponent($$result2, "Button", Button, { "variant": "ghost", "asChild": true, "className": "mb-8" }, { "default": async ($$result3) => renderTemplate` <a href="/case-studies" class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"> ${renderComponent($$result3, "ArrowLeft", ArrowLeft, { "className": "h-4 w-4" })}
Back to Case Studies
</a> ` })} <header class="mb-12"> <div class="flex flex-wrap gap-2 mb-4"> ${renderComponent($$result2, "Badge", Badge, { "variant": "secondary" }, { "default": async ($$result3) => renderTemplate`${study.data.year}` })} ${renderComponent($$result2, "Badge", Badge, { "variant": "outline" }, { "default": async ($$result3) => renderTemplate`${study.data.platform}` })} ${renderComponent($$result2, "Badge", Badge, { "variant": "outline" }, { "default": async ($$result3) => renderTemplate`${study.data.region}` })} </div> <h1 class="text-4xl font-bold mb-4">${study.data.title}</h1> <p class="text-xl text-muted-foreground mb-6">${study.data.description}</p> <div class="flex items-center gap-4 text-muted-foreground"> <span>Client: <strong class="text-foreground">${study.data.client}</strong></span> </div> ${study.data.metrics && renderTemplate`<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 p-6 bg-muted/30 rounded-lg"> ${study.data.metrics.map((metric) => renderTemplate`<div class="text-center"> <div class="text-2xl font-bold">${metric.value}</div> <div class="text-sm text-muted-foreground">${metric.label}</div> </div>`)} </div>`} </header> <div class="prose prose-lg dark:prose-invert max-w-none"> ${renderComponent($$result2, "Content", Content, {})} </div> <div class="mt-12 pt-8 border-t border-border"> <h3 class="font-semibold mb-4">Key Highlights</h3> <ul class="space-y-2"> ${study.data.highlights.map((highlight) => renderTemplate`<li class="flex items-start gap-2 text-muted-foreground"> <span class="text-primary mt-1">•</span> <span>${highlight}</span> </li>`)} </ul> </div> </div> </article> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/case-studies/[slug].astro", void 0);

const $$file = "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/case-studies/[slug].astro";
const $$url = "/case-studies/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
