import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_D5QLXxeQ.mjs';
import 'piccolore';
import { $ as $$Layout, a as Badge } from '../chunks/badge_C3Zljwn0.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_Di6c884w.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../chunks/card_BNVl2YLU.mjs';
import { g as getCollection } from '../chunks/_astro_content_CuloNDsh.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const caseStudies = await getCollection("case-studies");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Case Studies", "description": "Explore detailed case studies of enterprise eCommerce implementations and digital transformations." }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="pt-16"> <section class="py-20 px-4"> <div class="container mx-auto"> <div class="fade-in"> <h1 class="text-4xl font-bold mb-4 text-center">Case Studies</h1> </div> <div class="fade-in stagger-1"> <p class="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
Detailed insights into enterprise implementations and digital transformations.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"> ${caseStudies.map((study, index) => renderTemplate`<div${addAttribute(`scale-in stagger-${index % 3 + 2}`, "class")}> <a${addAttribute(`/case-studies/${study.slug}`, "href")} class="block h-full"> ${renderComponent($$result2, "Card", Card, { "className": "h-full hover-lift hover-glow cursor-pointer" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "CardHeader", CardHeader, {}, { "default": async ($$result4) => renderTemplate` <div class="flex items-start justify-between gap-2"> ${renderComponent($$result4, "CardTitle", CardTitle, { "className": "text-lg" }, { "default": async ($$result5) => renderTemplate`${study.data.title}` })} ${renderComponent($$result4, "Badge", Badge, { "variant": "secondary", "className": "shrink-0" }, { "default": async ($$result5) => renderTemplate`${study.data.year}` })} </div> ${renderComponent($$result4, "CardDescription", CardDescription, {}, { "default": async ($$result5) => renderTemplate`${study.data.client}` })} ` })} ${renderComponent($$result3, "CardContent", CardContent, { "className": "flex-1" }, { "default": async ($$result4) => renderTemplate` <p class="text-sm text-muted-foreground mb-4">${study.data.description}</p> ${renderComponent($$result4, "Badge", Badge, { "variant": "outline", "className": "mb-4" }, { "default": async ($$result5) => renderTemplate`${study.data.platform}` })} <ul class="space-y-1.5 mb-4"> ${study.data.highlights.slice(0, 2).map((highlight) => renderTemplate`<li class="text-xs text-muted-foreground flex items-start gap-2"> <span class="text-primary">•</span> <span>${highlight}</span> </li>`)} </ul> ${study.data.metrics && renderTemplate`<div class="flex gap-4 mt-auto pt-4 border-t border-border"> ${study.data.metrics.slice(0, 2).map((metric) => renderTemplate`<div> <div class="text-lg font-semibold">${metric.value}</div> <div class="text-xs text-muted-foreground">${metric.label}</div> </div>`)} </div>`}` })} ` })} </a> </div>`)} </div> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/case-studies/index.astro", void 0);

const $$file = "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/case-studies/index.astro";
const $$url = "/case-studies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
