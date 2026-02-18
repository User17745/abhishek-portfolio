import { a as createComponent, m as maybeRenderHead, r as renderComponent, d as addAttribute, b as renderTemplate, h as renderScript } from '../chunks/astro/server_D5QLXxeQ.mjs';
import 'piccolore';
import { B as Button, a as Badge, c as cn, $ as $$Layout } from '../chunks/badge_C3Zljwn0.mjs';
import { $ as $$Header, a as $$Footer } from '../chunks/Footer_Di6c884w.mjs';
import { Copy, Info, ArrowDown, Linkedin, Building2, Briefcase, Box, Store, ClipboardCheck, ClipboardList, ShoppingCart, Presentation, Download, Mail, Phone, MapPin } from 'lucide-react';
import { s as siteConfig } from '../chunks/config_DgxodS-V.mjs';
/* empty css                                 */
import 'clsx';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../chunks/card_BNVl2YLU.mjs';
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { T as Textarea } from '../chunks/textarea_DSmNVTcb.mjs';
export { renderers } from '../renderers.mjs';

const stats = [
  {
    label: "Years\nExperience",
    value: "12+",
    tooltip: null
  },
  {
    label: "Brands\nServed",
    value: "90+",
    tooltip: "Philips, Victoria's Secret, THE One, Metro Brands, BORDERS, PAN Home, and 80+ more"
  },
  {
    label: "Solutions\nDelivered",
    value: "300+",
    tooltip: null
  },
  {
    label: "SaaS\nProducts",
    value: "4",
    tooltip: "KartXO, KartmaX Hyperlocal, Marketplace, Omni-Channel"
  },
  {
    label: "eCom\nStacks",
    value: "5",
    tooltip: "SFCC, Shopify Plus, Adobe Commerce, Akinon, KartmaX"
  },
  {
    label: "Countries\nReached",
    value: "10+",
    tooltip: "India, UAE, Saudi, Qatar, Oman, Kuwait, Bahrain, US, UK, Australia"
  }
];
const summary = {
  headline: "Turning Complex Commerce Into Seamless Experiences",
  subtitle: "eCommerce Architect | Product Builder | GCC Expansion Lead",
  bio: `I've spent the last decade building, scaling, and fixing digital commerce platforms. Started as a developer, became a founder, and now lead enterprise transformations across the Middle East and India.

Currently based in Dubai, I head GreenHonchos' expansion across the GCC, helping brands like THE One, Victoria's Secret, and Philips launch and scale their digital presence.

Whether it's architecting a SaaS platform from scratch, optimizing conversion rates by 30%, or managing multi-country rollouts, I've done it.`
};

const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="hero" class="min-h-screen flex items-center justify-center pt-24 px-4 hero-bg" data-astro-cid-anhloy43> <div class="container mx-auto text-center" data-astro-cid-anhloy43> <div class="max-w-3xl mx-auto space-y-6" data-astro-cid-anhloy43> <div class="fade-in" data-astro-cid-anhloy43> <p class="text-highlight text-sm uppercase tracking-widest font-medium" data-astro-cid-anhloy43> ${summary.subtitle} </p> </div> <div class="fade-in stagger-1" data-astro-cid-anhloy43> <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight" data-astro-cid-anhloy43> ${summary.headline} </h1> </div> <p class="fade-in stagger-2 text-sm text-muted-foreground max-w-md mx-auto" data-astro-cid-anhloy43>
Get started by downloading Abhishek's official documentation (resume):
</p> <div class="fade-in stagger-3 px-2 sm:px-0" data-astro-cid-anhloy43> <div class="quickstart-container rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden max-w-2xl mx-auto" data-astro-cid-anhloy43> <!-- Top bar with window dots, filename, tabs, and copy button --> <div class="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700" data-astro-cid-anhloy43> <div class="flex items-center gap-2" data-astro-cid-anhloy43> <div class="flex items-center gap-1 sm:gap-1.5" data-astro-cid-anhloy43> <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400" data-astro-cid-anhloy43></span> <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-400" data-astro-cid-anhloy43></span> <span class="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400" data-astro-cid-anhloy43></span> </div> <span class="ml-2 text-[10px] text-zinc-400 font-mono hidden sm:inline" data-astro-cid-anhloy43>install.sh</span> </div> <button id="copy-btn-hero" class="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors" aria-label="Copy to clipboard" data-astro-cid-anhloy43> ${renderComponent($$result, "Copy", Copy, { "size": 16, "data-astro-cid-anhloy43": true })} <span class="copy-text-hero" data-astro-cid-anhloy43>Copy</span> <span class="copied-text-hero hidden text-green-600" data-astro-cid-anhloy43>Copied!</span> </button> </div> <!-- Tabs --> <div class="px-2 sm:px-3 py-1.5 sm:py-2 border-b border-zinc-100 dark:border-zinc-800 overflow-x-auto no-scrollbar bg-white dark:bg-zinc-900" data-astro-cid-anhloy43> <div class="flex gap-0.5" data-astro-cid-anhloy43> <button data-tab="all" class="tab-btn-hero px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium rounded text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 whitespace-nowrap" data-astro-cid-anhloy43>All</button> <button data-tab="sol_eng" class="tab-btn-hero px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap" data-astro-cid-anhloy43>Solutions</button> <button data-tab="ecom" class="tab-btn-hero px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap" data-astro-cid-anhloy43>eCom</button> <button data-tab="pmo" class="tab-btn-hero px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap" data-astro-cid-anhloy43>PMO</button> <button data-tab="prod" class="tab-btn-hero px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap" data-astro-cid-anhloy43>Product</button> <button data-tab="tpm" class="tab-btn-hero px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap" data-astro-cid-anhloy43>TPM</button> <button data-tab="shop_pm" class="tab-btn-hero px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap" data-astro-cid-anhloy43>Shopify</button> </div> </div> <!-- Code display --> <div class="relative bg-zinc-50/50 dark:bg-zinc-800/50" data-astro-cid-anhloy43> <div class="p-2 sm:p-3 font-mono text-[10px] sm:text-[11px] overflow-x-auto" data-astro-cid-anhloy43> <div data-content="all" class="code-content-hero flex items-center gap-1.5 whitespace-nowrap" data-astro-cid-anhloy43> <span class="text-green-600 dark:text-green-500 select-none" data-astro-cid-anhloy43>$</span> <span class="text-zinc-700 dark:text-zinc-300" data-astro-cid-anhloy43>curl -fsSL https://abhishekaggarwal.com/install.sh <span class="text-purple-600 dark:text-purple-400" data-astro-cid-anhloy43>|</span> bash -s -- <span class="text-amber-600 dark:text-amber-400" data-astro-cid-anhloy43>"all"</span></span> </div> <div data-content="sol_eng" class="code-content-hero hidden flex items-center gap-1.5 whitespace-nowrap" data-astro-cid-anhloy43> <span class="text-green-600 dark:text-green-500 select-none" data-astro-cid-anhloy43>$</span> <span class="text-zinc-700 dark:text-zinc-300" data-astro-cid-anhloy43>curl -fsSL https://abhishekaggarwal.com/install.sh <span class="text-purple-600 dark:text-purple-400" data-astro-cid-anhloy43>|</span> bash -s -- <span class="text-amber-600 dark:text-amber-400" data-astro-cid-anhloy43>"sol_eng"</span></span> </div> <div data-content="ecom" class="code-content-hero hidden flex items-center gap-1.5 whitespace-nowrap" data-astro-cid-anhloy43> <span class="text-green-600 dark:text-green-500 select-none" data-astro-cid-anhloy43>$</span> <span class="text-zinc-700 dark:text-zinc-300" data-astro-cid-anhloy43>curl -fsSL https://abhishekaggarwal.com/install.sh <span class="text-purple-600 dark:text-purple-400" data-astro-cid-anhloy43>|</span> bash -s -- <span class="text-amber-600 dark:text-amber-400" data-astro-cid-anhloy43>"ecom"</span></span> </div> <div data-content="pmo" class="code-content-hero hidden flex items-center gap-1.5 whitespace-nowrap" data-astro-cid-anhloy43> <span class="text-green-600 dark:text-green-500 select-none" data-astro-cid-anhloy43>$</span> <span class="text-zinc-700 dark:text-zinc-300" data-astro-cid-anhloy43>curl -fsSL https://abhishekaggarwal.com/install.sh <span class="text-purple-600 dark:text-purple-400" data-astro-cid-anhloy43>|</span> bash -s -- <span class="text-amber-600 dark:text-amber-400" data-astro-cid-anhloy43>"pmo"</span></span> </div> <div data-content="prod" class="code-content-hero hidden flex items-center gap-1.5 whitespace-nowrap" data-astro-cid-anhloy43> <span class="text-green-600 dark:text-green-500 select-none" data-astro-cid-anhloy43>$</span> <span class="text-zinc-700 dark:text-zinc-300" data-astro-cid-anhloy43>curl -fsSL https://abhishekaggarwal.com/install.sh <span class="text-purple-600 dark:text-purple-400" data-astro-cid-anhloy43>|</span> bash -s -- <span class="text-amber-600 dark:text-amber-400" data-astro-cid-anhloy43>"prod"</span></span> </div> <div data-content="tpm" class="code-content-hero hidden flex items-center gap-1.5 whitespace-nowrap" data-astro-cid-anhloy43> <span class="text-green-600 dark:text-green-500 select-none" data-astro-cid-anhloy43>$</span> <span class="text-zinc-700 dark:text-zinc-300" data-astro-cid-anhloy43>curl -fsSL https://abhishekaggarwal.com/install.sh <span class="text-purple-600 dark:text-purple-400" data-astro-cid-anhloy43>|</span> bash -s -- <span class="text-amber-600 dark:text-amber-400" data-astro-cid-anhloy43>"tpm"</span></span> </div> <div data-content="shop_pm" class="code-content-hero hidden flex items-center gap-1.5 whitespace-nowrap" data-astro-cid-anhloy43> <span class="text-green-600 dark:text-green-500 select-none" data-astro-cid-anhloy43>$</span> <span class="text-zinc-700 dark:text-zinc-300" data-astro-cid-anhloy43>curl -fsSL https://abhishekaggarwal.com/install.sh <span class="text-purple-600 dark:text-purple-400" data-astro-cid-anhloy43>|</span> bash -s -- <span class="text-amber-600 dark:text-amber-400" data-astro-cid-anhloy43>"shop_pm"</span></span> </div> </div> </div> </div> </div> <div class="fade-in stagger-4" data-astro-cid-anhloy43> <div class="flex flex-wrap justify-center gap-3 pt-2" data-astro-cid-anhloy43> ${renderComponent($$result, "Button", Button, { "asChild": true, "size": "lg", "className": "cta-button", "data-astro-cid-anhloy43": true }, { "default": async ($$result2) => renderTemplate` <a href="#contact" data-astro-cid-anhloy43>Let's Talk</a> ` })} ${renderComponent($$result, "Button", Button, { "variant": "outline", "size": "lg", "asChild": true, "className": "gradient-border hover:border-[#0A66C2] hover:bg-[#0A66C2]/10", "data-astro-cid-anhloy43": true }, { "default": async ($$result2) => renderTemplate` <a${addAttribute(siteConfig.links.linkedin, "href")} target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn" data-astro-cid-anhloy43> ${renderComponent($$result2, "Linkedin", Linkedin, { "className": "h-5 w-5 text-[#0A66C2]", "data-astro-cid-anhloy43": true })} </a> ` })} </div> </div> <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-12" data-astro-cid-anhloy43> ${stats.map((stat, index) => renderTemplate`<div${addAttribute(`fade-in stagger-${index % 6 + 5}`, "class")} data-astro-cid-anhloy43> <div class="stat-card-wrapper relative" data-astro-cid-anhloy43> <div class="p-4 rounded-lg bg-card border border-border stat-card hover-lift" data-astro-cid-anhloy43> <div class="flex items-center justify-center gap-1" data-astro-cid-anhloy43> <div class="text-2xl font-bold text-highlight" data-astro-cid-anhloy43>${stat.value}</div> ${stat.tooltip && renderTemplate`${renderComponent($$result, "Info", Info, { "className": "h-3 w-3 text-muted-foreground", "data-astro-cid-anhloy43": true })}`} </div> <div class="text-xs text-muted-foreground h-8 flex items-center justify-center" data-astro-cid-anhloy43> <span class="text-center whitespace-pre-line" data-astro-cid-anhloy43>${stat.label}</span> </div> </div> ${stat.tooltip && renderTemplate`<div class="stat-tooltip" data-astro-cid-anhloy43> ${stat.tooltip} </div>`} </div> </div>`)} </div> <div class="fade-in stagger-7" data-astro-cid-anhloy43> <a href="#about" class="inline-flex items-center justify-center mt-12 text-muted-foreground hover:text-accent transition-colors" aria-label="Scroll to About section" data-astro-cid-anhloy43> ${renderComponent($$result, "ArrowDown", ArrowDown, { "className": "h-6 w-6 animate-bounce", "data-astro-cid-anhloy43": true })} </a> </div> </div> </div> </section>  ${renderScript($$result, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/sections/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/sections/Hero.astro", void 0);

const skills = [
  { name: "Solution Consulting", category: "Leadership" },
  { name: "Business Case Mapping", category: "Leadership" },
  { name: "Stakeholder Management", category: "Leadership" },
  { name: "Pre-Sales & GTM", category: "Leadership" },
  { name: "Team Leadership", category: "Leadership" },
  { name: "Product Strategy", category: "Product" },
  { name: "Roadmap Planning", category: "Product" },
  { name: "SaaS Platform Development", category: "Product" },
  { name: "Agile Methodology", category: "Product" },
  { name: "Project Governance", category: "PMO" },
  { name: "Risk Management (RAID)", category: "PMO" },
  { name: "Resource Forecasting", category: "PMO" },
  { name: "Process Optimization", category: "PMO" },
  { name: "Shopify / Shopify Plus", category: "Platforms" },
  { name: "Magento / Adobe Commerce", category: "Platforms" },
  { name: "Salesforce Commerce Cloud", category: "Platforms" },
  { name: "Akinon", category: "Platforms" },
  { name: "KartmaX", category: "Platforms" },
  { name: "CRO & Analytics", category: "Growth" },
  { name: "eCommerce Architecture", category: "Growth" },
  { name: "ERP Integration", category: "Growth" },
  { name: "Omnichannel Commerce", category: "Growth" },
  { name: "Conversion Optimization", category: "Consulting" },
  { name: "Tech Due Diligence", category: "Consulting" },
  { name: "Speed Optimization", category: "Consulting" },
  { name: "Platform Migration", category: "Consulting" }
];
const skillCategories = [...new Set(skills.map((s) => s.category))];

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="about" class="py-20 px-4"> <div class="container mx-auto"> <div class="max-w-4xl mx-auto"> <div class="fade-in"> <h2 class="text-3xl font-bold mb-8">About Me</h2> </div> <div class="fade-in stagger-1"> <div class="prose prose-lg dark:prose-invert max-w-none mb-12"> ${summary.bio.split("\n\n").map((paragraph) => renderTemplate`<p class="text-muted-foreground mb-4">${paragraph}</p>`)} </div> </div> <div class="fade-in stagger-2"> <h3 class="text-xl font-semibold mb-8">Skills & Expertise</h3> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${skillCategories.map((category, index) => renderTemplate`<div${addAttribute(`fade-in stagger-${index % 3 + 3}`, "class")}> <div class="bg-card rounded-xl border border-border p-5 hover:border-accent/30 transition-colors"> <h4 class="text-sm font-semibold text-accent mb-4 uppercase tracking-wider"> ${category} </h4> <div class="flex flex-wrap gap-2"> ${skills.filter((skill) => skill.category === category).map((skill) => renderTemplate`<span class="skill-badge px-3 py-1.5 rounded-full text-sm"> ${skill.name} </span>`)} </div> </div> </div>`)} </div> </div> </div> </section>`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/sections/About.astro", void 0);

const experiences = [
  {
    id: "gh-2024",
    title: "Regional Lead – Client Solutions & Enterprise Delivery",
    company: "GreenHonchos",
    location: "Dubai, UAE",
    period: "2024 - Present",
    type: "work",
    description: "Leading GCC expansion, managing enterprise clients across UAE, KSA, Qatar. Dual role as client partner and solution architect for multi-country deliveries.",
    highlights: [
      "Led digital transformation for THE One across all GCC countries",
      "Managed ERP, CRM, and platform ecosystem integrations",
      "Senior escalation point for high-value projects across Magento, Shopify Plus, and KartmaX"
    ],
    roles: ["Client Partner", "Solution Architect", "Regional Lead"]
  },
  {
    id: "gh-2023",
    title: "Program & PMO Lead",
    company: "GreenHonchos",
    location: "Delhi, India",
    period: "2023 - 2024",
    type: "work",
    description: "Led PMO oversight for enterprise programs across digital commerce, ERP integration, and SaaS platforms. Instituted RAID logs, forecast models, and steering committee reports.",
    highlights: [
      "Built compliance dashboards and KRA matrix for project teams",
      "Implemented change request frameworks and transition protocols",
      "Collaborated with client CXOs across time zones"
    ],
    roles: ["PMO Lead", "Governance", "Stakeholder Management"]
  },
  {
    id: "gh-2022",
    title: "Consulting & CRO Lead",
    company: "GreenHonchos",
    location: "Delhi, India",
    period: "2022 - 2023",
    type: "work",
    description: "Created the Ascent CRO framework for optimizing customer journey. Consulted for major brands achieving significant conversion improvements.",
    highlights: [
      "30% increase in overall eCommerce conversion (Bath & Body Works)",
      "14% increase in add-to-cart rate",
      "Led Victoria's Secret SFCC implementation as Consulting PM"
    ],
    roles: ["CRO Consultant", "Project Manager", "Auditor"]
  },
  {
    id: "gh-2021",
    title: "Manager – Pre-Sales Solution Consulting",
    company: "GreenHonchos",
    location: "Delhi, India",
    period: "2021 - 2022",
    type: "work",
    description: "Designed and institutionalized solutioning methodologies across KartmaX, Magento, Shopify Plus, and SFCC implementations.",
    highlights: [
      "Closed deals with Victoria's Secret, Philips, THE One, PAN Home",
      "Developed reusable assets: BRD templates, WBS blueprints, cost-gap-fit tools",
      "Standardized discovery-to-delivery transition process"
    ],
    roles: ["Solution Architect", "Pre-Sales Lead", "Proposal Lead"]
  },
  {
    id: "gh-2020",
    title: "Product & Project Delivery Manager",
    company: "GreenHonchos",
    location: "Delhi, India",
    period: "2020 - 2021",
    type: "work",
    description: "Led 40+ implementations of the KartmaX platform including hyperlocal, omnichannel, and marketplace builds.",
    highlights: [
      "Delivered implementations for Metro Shoes, Mochi Shoes, FitFlop",
      "Built Omnichannel, Hyperlocal, and Multi-Vendor platform flavors",
      "Led implementations for WNWD, ExpressStores, Inorbit Malls"
    ],
    roles: ["Product Manager", "Project Manager", "Delivery Lead"]
  },
  {
    id: "gh-2020-start",
    title: "Platform Engineer & Solutions Lead",
    company: "GreenHonchos",
    location: "Delhi, India",
    period: "2020",
    type: "work",
    description: "Bootstrapped the KartXO platform development. Built core components and led initial client implementations.",
    highlights: [
      "Built first version of KartXO in 3 months",
      "Led implementations for Maspar, MarcaDisati, Artistico",
      "Full-stack development: backend, frontend, DevOps"
    ],
    roles: ["Platform Engineer", "Full-Stack Developer", "Product Owner"]
  },
  {
    id: "rigassembler",
    title: "Founder",
    company: "RigAssembler",
    location: "Delhi, India",
    period: "2015 - 2019",
    type: "entrepreneurship",
    description: "D2C eCommerce startup for custom performance computing. Served PC enthusiasts, gamers, and professionals with specialized hardware requirements.",
    highlights: [
      "First boutique PC builder in India",
      "200+ paying customers",
      "End-to-end: development, marketing, sales, logistics"
    ],
    roles: ["Founder", "Product Manager", "Marketing Lead"]
  },
  {
    id: "technotronic",
    title: "Co-Founder – Solutions & Client Consulting",
    company: "TECHNOTRONIC",
    location: "Delhi, India",
    period: "2014 - 2019",
    type: "entrepreneurship",
    description: "Delivered 50+ web and commerce tech solutions across Magento, Shopify, WordPress, PrestaShop, and custom stacks.",
    highlights: [
      "50+ projects delivered across India, UAE, UK, US",
      "Clients across multiple industries and regions",
      "Full-stack solutions across multiple platforms"
    ],
    roles: ["Co-Founder", "Solutions Architect", "Account Manager"]
  }
];

const $$Experience = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="experience" class="py-20 px-4 gradient-bg" data-astro-cid-ghubstuj> <div class="container mx-auto" data-astro-cid-ghubstuj> <div class="fade-in" data-astro-cid-ghubstuj> <h2 class="text-3xl font-bold mb-12 text-center" data-astro-cid-ghubstuj>Experience</h2> </div> <div class="max-w-4xl mx-auto" data-astro-cid-ghubstuj> <div class="relative" data-astro-cid-ghubstuj> <!-- Animated Timeline Line --> <div class="timeline-line" data-astro-cid-ghubstuj></div> <div class="space-y-8" data-astro-cid-ghubstuj> ${[...experiences].reverse().map((exp, index) => renderTemplate`<div${addAttribute(`fade-in-${index % 2 === 0 ? "right" : "left"} stagger-${index % 4 + 1}`, "class")} data-astro-cid-ghubstuj> <div${addAttribute(`timeline-item relative flex flex-col md:flex-row gap-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`, "class")} data-astro-cid-ghubstuj> <div class="timeline-dot-wrapper" data-astro-cid-ghubstuj> <div class="timeline-dot" data-astro-cid-ghubstuj></div> <div class="timeline-dot-pulse" data-astro-cid-ghubstuj></div> </div> <!-- Info Column (period, title, company) --> <div${addAttribute(`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? "md:pl-12" : "md:pr-8"}`, "class")} data-astro-cid-ghubstuj> <div${addAttribute(`flex flex-col ${index % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"}`, "class")} data-astro-cid-ghubstuj> <p class="text-sm text-accent font-medium" data-astro-cid-ghubstuj>${exp.period}</p> <h3 class="font-semibold text-lg" data-astro-cid-ghubstuj>${exp.title}</h3> <div${addAttribute(`flex items-center gap-2 text-muted-foreground mb-2 flex-wrap ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`, "class")} data-astro-cid-ghubstuj> ${exp.type === "entrepreneurship" ? renderTemplate`${renderComponent($$result, "Building2", Building2, { "className": "h-4 w-4 text-accent shrink-0", "data-astro-cid-ghubstuj": true })}` : renderTemplate`${renderComponent($$result, "Briefcase", Briefcase, { "className": "h-4 w-4 text-highlight shrink-0", "data-astro-cid-ghubstuj": true })}`} <span data-astro-cid-ghubstuj>${exp.company}</span> <span class="text-muted-foreground/50" data-astro-cid-ghubstuj>•</span> <span data-astro-cid-ghubstuj>${exp.location}</span> </div> </div> </div> <!-- Card Column --> <div${addAttribute(`flex-1 pl-12 ${index % 2 === 0 ? "md:pr-12" : "md:pl-8"}`, "class")} data-astro-cid-ghubstuj> <div class="timeline-card bg-card rounded-lg border border-border p-6 hover-lift hover-glow" data-astro-cid-ghubstuj> <p class="text-muted-foreground text-sm mb-4" data-astro-cid-ghubstuj>${exp.description}</p> <ul class="space-y-2 mb-4" data-astro-cid-ghubstuj> ${exp.highlights.slice(0, 3).map((highlight) => renderTemplate`<li class="text-sm flex items-start gap-2" data-astro-cid-ghubstuj> <span class="text-accent mt-1.5" data-astro-cid-ghubstuj>•</span> <span data-astro-cid-ghubstuj>${highlight}</span> </li>`)} </ul> ${exp.roles && renderTemplate`<div class="flex flex-wrap gap-2" data-astro-cid-ghubstuj> ${exp.roles.map((role) => renderTemplate`${renderComponent($$result, "Badge", Badge, { "variant": "outline", "className": "text-xs hover:bg-accent/10 hover:text-accent hover:border-accent/50 transition-colors", "data-astro-cid-ghubstuj": true }, { "default": ($$result2) => renderTemplate`${role}` })}`)} </div>`} </div> </div> </div> </div>`)} </div> </div> </div> </div> </section> `;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/sections/Experience.astro", void 0);

const projects = [
  {
    id: "the-one",
    title: "THE One - Digital Transformation",
    client: "THE One",
    description: "Complete digital transformation with omnichannel enablement for a household brand across all major GCC countries.",
    platform: "KartmaX Enterprise",
    highlights: [
      "Multi-country rollout: UAE, Qatar, Kuwait, Bahrain, Jordan",
      "Omnichannel integration with 15+ physical stores",
      "ERP and logistics orchestration"
    ],
    metrics: [
      { label: "Countries", value: "5" },
      { label: "Stores Integrated", value: "15+" }
    ],
    region: "GCC",
    year: "2024",
    featured: true
  },
  {
    id: "victorias-secret",
    title: "Victoria's Secret - India Market Entry",
    client: "Victoria's Secret / Apparel Group",
    description: "Led the implementation of world's largest lingerie brand on Salesforce Commerce Cloud for India launch.",
    platform: "Salesforce Commerce Cloud",
    highlights: [
      "10-month implementation roadmap",
      "Consulting Project Manager role",
      "India market entry strategy"
    ],
    metrics: [
      { label: "Duration", value: "10 months" },
      { label: "Market", value: "India Launch" }
    ],
    region: "India",
    year: "2022",
    featured: true
  },
  {
    id: "bath-body-works",
    title: "Bath & Body Works - CRO Optimization",
    client: "Bath & Body Works / Apparel Group",
    description: "Applied Ascent CRO framework to optimize customer journey and improve conversion metrics.",
    platform: "CRO Consulting",
    highlights: [
      "30% increase in overall eCommerce conversion",
      "14% increase in add-to-cart rate",
      "Continuous performance monitoring"
    ],
    metrics: [
      { label: "Conversion ↑", value: "+30%" },
      { label: "Add-to-Cart ↑", value: "+14%" }
    ],
    region: "India",
    year: "2022",
    featured: true
  },
  {
    id: "caneza",
    title: "Caneza - Multi-Country eCommerce",
    client: "Caneza (Rasasi Group)",
    description: "Multi-backend/single frontend framework with multi-language, multi-currency, and RTL support for GCC launch.",
    platform: "Shopify Plus + Hydrogen",
    highlights: [
      "Shared headless frontend across UAE & KSA",
      "RTL language support",
      "Multi-currency checkout"
    ],
    metrics: [
      { label: "Languages", value: "3" },
      { label: "Countries", value: "5" }
    ],
    region: "GCC",
    year: "2024",
    featured: true
  },
  {
    id: "express-stores",
    title: "ExpressStores - Hyperlocal Commerce",
    client: "ExpressStores",
    description: "2-hour grocery delivery platform with 100+ retail and dark stores integration.",
    platform: "KartmaX Hyperlocal",
    highlights: [
      "100+ retail and dark stores",
      "2-hour delivery promise",
      "Geo-fenced store allocation"
    ],
    metrics: [
      { label: "Stores", value: "100+" },
      { label: "Delivery", value: "2 hours" }
    ],
    region: "India",
    year: "2021"
  },
  {
    id: "pan-home",
    title: "PAN Home - Mobile App & Optimization",
    client: "PAN Home",
    description: "eCommerce website & mobile app with speed optimization and ERP migration consulting.",
    platform: "Magento + Flutter",
    highlights: [
      "1-month speed optimization sprint",
      "Mobile app architecture design",
      "ERP migration roadmap consulting"
    ],
    region: "GCC",
    year: "2023"
  },
  {
    id: "kartxo-platform",
    title: "KartXO Platform - From Zero to Production",
    client: "GreenHonchos (Internal Product)",
    description: "Built the KartXO SaaS platform from ground up for SMB D2C brands.",
    platform: "Proprietary SaaS",
    highlights: [
      "MVP delivered in 3 months as solo developer",
      "OTP-based login, UPI payments",
      "6 successful client implementations"
    ],
    metrics: [
      { label: "Time to MVP", value: "3 months" },
      { label: "Implementations", value: "6" }
    ],
    region: "India",
    year: "2020"
  },
  {
    id: "kartmax-flavors",
    title: "KartmaX Platform Flavors",
    client: "GreenHonchos (Internal Product)",
    description: "Built three specialized platform variants: Marketplace, Omnichannel, and Hyperlocal.",
    platform: "KartmaX",
    highlights: [
      "Multi-vendor marketplace capability",
      "Store fulfillment & returns",
      "2-hour geo-fenced delivery"
    ],
    metrics: [
      { label: "Flavors", value: "3" },
      { label: "Projects", value: "40+" }
    ],
    region: "India & GCC",
    year: "2020-2023"
  },
  {
    id: "inorbit",
    title: "Inorbit Malls - Mall Digitization",
    client: "Inorbit Malls",
    description: "Hyperlocal, omnichannel, marketplace for digitizing 4 malls with vendor payment splits and logistics orchestration.",
    platform: "KartmaX Hyperlocal & Marketplace",
    highlights: [
      "4 malls digitized",
      "Vendor commission & payout automation",
      "Warehouse logistics orchestration"
    ],
    region: "India",
    year: "2021"
  },
  {
    id: "borders",
    title: "BORDERS - eCommerce & Mobile App",
    client: "Al Maya Group",
    description: "Full eCommerce website and mobile app for a major GCC retail brand.",
    platform: "Shopify Plus",
    highlights: [
      "eCommerce website & mobile app",
      "GCC-wide deployment",
      "Multi-currency support"
    ],
    region: "GCC",
    year: "2023"
  },
  {
    id: "metro-shoes",
    title: "Metro Brands Portfolio",
    client: "Metro Brands Ltd.",
    description: "Delivered multiple brands under Metro portfolio: Metro, Mochi, FitFlop, Ecco, Walkway, BioFoot.",
    platform: "KartmaX",
    highlights: [
      "6+ brand implementations",
      "Unified platform architecture",
      "High-traffic event handling"
    ],
    region: "India",
    year: "2020-2023"
  },
  {
    id: "being-human",
    title: "Being Human - Multi-Region Rollout",
    client: "Being Human Clothing",
    description: "eCommerce platform implementation for India and GCC markets.",
    platform: "KartmaX",
    highlights: [
      "Multi-region deployment",
      "Celebrity brand launch",
      "India & GCC presence"
    ],
    region: "India & GCC",
    year: "2022"
  }
];

const $$Projects = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="projects" class="py-20 px-4"> <div class="container mx-auto"> <div class="fade-in"> <h2 class="text-3xl font-bold mb-4 text-center">Featured Projects</h2> </div> <div class="fade-in stagger-1"> <p class="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
Key implementations and product developments across enterprise, retail, and D2C domains.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${projects.map((project, index) => renderTemplate`<div${addAttribute(`scale-in stagger-${index % 3 + 2}`, "class")}> ${renderComponent($$result, "Card", Card, { "className": "flex flex-col h-full hover-lift hover-glow cursor-pointer gradient-border" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` <div class="flex items-start justify-between gap-2"> ${renderComponent($$result3, "CardTitle", CardTitle, { "className": "text-lg" }, { "default": ($$result4) => renderTemplate`${project.title}` })} ${renderComponent($$result3, "Badge", Badge, { "className": "shrink-0 bg-accent/10 text-accent border-accent/20" }, { "default": ($$result4) => renderTemplate`${project.year}` })} </div> ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`${project.client}` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, { "className": "flex-1" }, { "default": ($$result3) => renderTemplate` <p class="text-sm text-muted-foreground mb-4">${project.description}</p> ${renderComponent($$result3, "Badge", Badge, { "variant": "outline", "className": "mb-4 text-highlight border-highlight/30" }, { "default": ($$result4) => renderTemplate`${project.platform}` })} <ul class="space-y-1.5 mb-4"> ${project.highlights.slice(0, 2).map((highlight) => renderTemplate`<li class="text-xs text-muted-foreground flex items-start gap-2"> <span class="text-accent">•</span> <span>${highlight}</span> </li>`)} </ul> ${project.metrics && renderTemplate`<div class="flex gap-4 mt-auto pt-4 border-t border-border"> ${project.metrics.map((metric) => renderTemplate`<div> <div class="text-lg font-semibold text-highlight">${metric.value}</div> <div class="text-xs text-muted-foreground">${metric.label}</div> </div>`)} </div>`}` })} ` })} </div>`)} </div> </div> </section>`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/sections/Projects.astro", void 0);

const brands = [
  // Enterprise / Global Brands
  { name: "Victoria's Secret", category: "enterprise", featured: true, color: "#e91e63" },
  { name: "Philips", category: "enterprise", featured: true, color: "#0b5ed7" },
  { name: "Bath & Body Works", category: "enterprise", featured: true, color: "#6b21a8" },
  { name: "THE One", category: "enterprise", featured: true, color: "#059669" },
  { name: "PAN Home", category: "enterprise", featured: true, color: "#ea580c" },
  { name: "Caneza (Rasasi)", category: "enterprise", featured: true, color: "#c2410c" },
  { name: "Versuni", category: "enterprise", featured: true, color: "#0284c7" },
  { name: "Al Maya Group", category: "enterprise", featured: true, color: "#0f766e" },
  // Retail Chains
  { name: "Metro Shoes", category: "retail", featured: true, color: "#be123c" },
  { name: "Mochi Shoes", category: "retail", color: "#4338ca" },
  { name: "Being Human", category: "retail", color: "#0891b2" },
  { name: "Siyaram's", category: "retail", color: "#1e40af" },
  { name: "Sleepwell", category: "retail", color: "#0d9488" },
  { name: "William Penn", category: "retail", color: "#854d0e" },
  { name: "FitFlop", category: "retail", color: "#dc2626" },
  { name: "Ecco", category: "retail", color: "#1f2937" },
  { name: "Walkway", category: "retail", color: "#7c3aed" },
  { name: "BioFoot", category: "retail", color: "#16a34a" },
  { name: "Sabhyata", category: "retail", color: "#c2410c" },
  { name: "Inorbit Malls", category: "enterprise", color: "#2563eb" },
  { name: "BORDERS", category: "enterprise", color: "#b45309" },
  // D2C & Startups
  { name: "Maspar", category: "d2c", color: "#7c3aed" },
  { name: "MarcaDisati", category: "d2c", color: "#db2777" },
  { name: "ExpressStores", category: "d2c", color: "#059669" },
  { name: "Technosport", category: "d2c", color: "#dc2626" },
  { name: "G3+", category: "d2c", color: "#ea580c" },
  { name: "Purvaja", category: "d2c", color: "#9333ea" },
  { name: "TrulyDesi", category: "d2c", color: "#f97316" },
  { name: "Octave", category: "d2c", color: "#0891b2" },
  { name: "Himeya", category: "d2c", color: "#6366f1" },
  { name: "Kompanero", category: "d2c", color: "#78716c" },
  // Consulting Clients
  { name: "Jumbo", category: "consulting", color: "#1d4ed8" },
  { name: "Lal's Group", category: "consulting", color: "#a3a3a3" },
  { name: "Total Foods", category: "consulting", color: "#22c55e" },
  { name: "Akinon", category: "consulting", color: "#64748b" },
  { name: "Force IX", category: "consulting", color: "#ef4444" },
  { name: "Baristina", category: "consulting", color: "#92400e" }
];
const featuredBrands = brands.filter((b) => b.featured);
function getBrandInitials(name) {
  const words = name.split(/[\s&-]+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function BrandLogo({ name, color, size = "md", className }) {
  const initials = getBrandInitials(name);
  const brandColor = color || "#6b7280";
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base"
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "rounded-lg flex items-center justify-center font-bold text-white shadow-sm transition-transform hover:scale-105",
        sizeClasses[size],
        className
      ),
      style: {
        background: `linear-gradient(135deg, ${brandColor}, ${lightenColor(brandColor, 20)})`
      },
      title: name,
      children: initials
    }
  );
}
function lightenColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, (num >> 8 & 255) + amt);
  const B = Math.min(255, (num & 255) + amt);
  return `#${(16777216 + R * 65536 + G * 256 + B).toString(16).slice(1)}`;
}

const $$Brands = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="brands" class="py-20 px-4 bg-muted/30"> <div class="container mx-auto"> <div class="fade-in"> <h2 class="text-3xl font-bold mb-4 text-center">Brands I've Worked With</h2> </div> <div class="fade-in stagger-1"> <p class="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
From Fortune-500 enterprises to homegrown retail giants across GCC and India.
</p> </div> <div class="max-w-5xl mx-auto"> <div class="fade-in stagger-2"> <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8 max-w-4xl mx-auto"> ${featuredBrands.map((brand) => renderTemplate`<div class="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"> ${renderComponent($$result, "BrandLogo", BrandLogo, { "name": brand.name, "color": brand.color, "size": "lg", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/shared/BrandLogo", "client:component-export": "default" })} <span class="text-sm font-medium text-center">${brand.name}</span> </div>`)} </div> </div> <div class="fade-in stagger-3"> <div class="flex flex-wrap justify-center gap-3"> ${brands.filter((b) => !b.featured).map((brand) => renderTemplate`<div class="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5"> ${renderComponent($$result, "BrandLogo", BrandLogo, { "name": brand.name, "color": brand.color, "size": "sm", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/shared/BrandLogo", "client:component-export": "default" })} <span class="text-sm text-muted-foreground">${brand.name}</span> </div>`)} </div> </div> </div> </div> </section>`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/sections/Brands.astro", void 0);

const resumes = [
  {
    id: "sol_eng",
    title: "Pre-Sales & Solutions",
    description: "Solution architecture, proposals, enterprise sales",
    url: "https://docs.google.com/document/d/1kP1IX6OMXoYBPBxpyfoNv1vDUrM-LMvPbMXuderXbNw/export?format=pdf",
    icon: "Presentation"
  },
  {
    id: "ecom",
    title: "eCommerce",
    description: "Full-stack commerce platform development",
    url: "https://docs.google.com/document/d/1J9Sqk0MlkItlSzXT1Xe3bxncScvFmAr2I1X7zgCfZhE/export?format=pdf",
    icon: "ShoppingCart"
  },
  {
    id: "pmo",
    title: "PMO",
    description: "Program governance and delivery management",
    url: "https://docs.google.com/document/d/1xjjTG_PsVGTjcSQie6i2F_vIESs0ISu2PSVdWdm6X0E/export?format=pdf",
    icon: "ClipboardList"
  },
  {
    id: "tpm",
    title: "Technical PM",
    description: "Technical project leadership",
    url: "https://docs.google.com/document/d/11pYiI3uY3YhJ4HKQMjIerBxT9s2nXJEGKax-UWM4c24/export?format=pdf",
    icon: "ClipboardCheck"
  },
  {
    id: "shop_pm",
    title: "Shopify TPM",
    description: "Shopify Plus implementations",
    url: "https://docs.google.com/document/d/1my5wMbzS0cvvYUm1mN7P0yVwmCLFkOlA3tgScoVnSjo/export?format=pdf",
    icon: "Store"
  },
  {
    id: "prod",
    title: "Product Manager",
    description: "SaaS product strategy & roadmaps",
    url: "https://docs.google.com/document/d/1SUbVz3astELSNosjgKb8IZedU3tZ1luiLt-PcfsmEmg/export?format=pdf",
    icon: "Box"
  }
];

const $$Resume = createComponent(($$result, $$props, $$slots) => {
  const iconMap = {
    Presentation,
    ShoppingCart,
    ClipboardList,
    ClipboardCheck,
    Store,
    Box
  };
  const colors = [
    { bg: "bg-rose-500/10", text: "text-rose-500", border: "hover:border-rose-500/30" },
    { bg: "bg-amber-500/10", text: "text-amber-500", border: "hover:border-amber-500/30" },
    { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "hover:border-emerald-500/30" },
    { bg: "bg-blue-500/10", text: "text-blue-500", border: "hover:border-blue-500/30" },
    { bg: "bg-violet-500/10", text: "text-violet-500", border: "hover:border-violet-500/30" },
    { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "hover:border-cyan-500/30" }
  ];
  return renderTemplate`${maybeRenderHead()}<section id="resume" class="py-20 px-4 bg-muted/30"> <div class="container mx-auto"> <div class="max-w-4xl mx-auto"> <div class="fade-in text-center mb-10"> <h2 class="text-3xl font-bold mb-3">Pick Your Flavor</h2> <p class="text-muted-foreground">
Much like ice cream, people sometimes come in flavors. Here are mine:
</p> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"> ${resumes.map((resume, index) => {
    const Icon = iconMap[resume.icon] || Box;
    const color = colors[index % colors.length];
    return renderTemplate`<div${addAttribute(`fade-in stagger-${index % 3 + 1}`, "class")}> <a${addAttribute(resume.url, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(`group flex items-center gap-3 p-3 rounded-xl bg-card border border-border ${color.border} transition-all duration-300 hover:shadow-md`, "class")}> <div${addAttribute(`w-10 h-10 rounded-lg ${color.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`, "class")}> ${renderComponent($$result, "Icon", Icon, { "class": `h-5 w-5 ${color.text}` })} </div> <div class="flex-1 min-w-0"> <h3 class="font-medium text-sm text-foreground group-hover:text-accent transition-colors"> ${resume.title} </h3> <p class="text-xs text-muted-foreground truncate"> ${resume.description} </p> </div> ${renderComponent($$result, "Download", Download, { "className": `h-4 w-4 ${color.text} opacity-40 group-hover:opacity-100 transition-opacity shrink-0` })} </a> </div>`;
  })} </div> <div class="fade-in stagger-4 mt-6 text-center"> <p class="text-xs text-muted-foreground">
Click any flavor to download as PDF
</p> </div> </div> </div> </section>`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/sections/Resume.astro", void 0);

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "label",
  {
    ref,
    className: cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    ),
    ...props
  }
));
Label.displayName = "Label";

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="contact" class="py-20 px-4 gradient-bg"> <div class="container mx-auto"> <div class="fade-in"> <h2 class="text-3xl font-bold mb-4 text-center">Get in Touch</h2> </div> <div class="fade-in stagger-1"> <p class="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
Interested in working together? Let's connect and discuss how I can help.
</p> </div> <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"> <div class="fade-in-left stagger-2"> <div> ${renderComponent($$result, "Card", Card, { "className": "h-full gradient-border" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`Contact Information` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`Reach out via email or connect on LinkedIn` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, { "className": "space-y-4" }, { "default": ($$result3) => renderTemplate` <a${addAttribute(`mailto:${siteConfig.contact.email}`, "href")} class="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"> <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors"> ${renderComponent($$result3, "Mail", Mail, { "className": "h-5 w-5 text-accent" })} </div> <span>${siteConfig.contact.email}</span> </a> <div class="flex items-center gap-3 text-muted-foreground"> <div class="w-10 h-10 rounded-lg bg-highlight/10 flex items-center justify-center"> ${renderComponent($$result3, "Phone", Phone, { "className": "h-5 w-5 text-highlight" })} </div> <div class="text-sm"> <div>IND: ${siteConfig.contact.phone.india}</div> <div>UAE: ${siteConfig.contact.phone.uae}</div> </div> </div> <div class="flex items-center gap-3 text-muted-foreground"> <div class="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center"> ${renderComponent($$result3, "MapPin", MapPin, { "className": "h-5 w-5 text-success" })} </div> <span>${siteConfig.contact.location}</span> </div> ` })} ` })} </div> </div> <div class="fade-in-right stagger-3"> <div> ${renderComponent($$result, "Card", Card, { "className": "h-full gradient-border" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", CardHeader, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", CardTitle, {}, { "default": ($$result4) => renderTemplate`Send a Message` })} ${renderComponent($$result3, "CardDescription", CardDescription, {}, { "default": ($$result4) => renderTemplate`I'll get back to you within 24 hours` })} ` })} ${renderComponent($$result2, "CardContent", CardContent, {}, { "default": ($$result3) => renderTemplate` <form action="https://formspree.io/f/xnnnnnnn" method="POST" class="space-y-4"> <div class="space-y-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "name" }, { "default": ($$result4) => renderTemplate`Name` })} ${renderComponent($$result3, "Input", Input, { "id": "name", "name": "name", "placeholder": "Your name", "required": true, "className": "focus:ring-accent/50 focus:border-accent" })} </div> <div class="space-y-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "email" }, { "default": ($$result4) => renderTemplate`Email` })} ${renderComponent($$result3, "Input", Input, { "id": "email", "name": "email", "type": "email", "placeholder": "your@email.com", "required": true, "className": "focus:ring-accent/50 focus:border-accent" })} </div> <div class="space-y-2"> ${renderComponent($$result3, "Label", Label, { "htmlFor": "message" }, { "default": ($$result4) => renderTemplate`Message` })} ${renderComponent($$result3, "Textarea", Textarea, { "id": "message", "name": "message", "placeholder": "How can I help you?", "rows": 4, "required": true, "className": "focus:ring-accent/50 focus:border-accent resize-none" })} </div> ${renderComponent($$result3, "Button", Button, { "type": "submit", "className": "w-full cta-button" }, { "default": ($$result4) => renderTemplate`Send Message` })} </form> ` })} ` })} </div> </div> </div> </div> </section>`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/sections/Contact.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "About", $$About, {})} ${renderComponent($$result2, "Experience", $$Experience, {})} ${renderComponent($$result2, "Projects", $$Projects, {})} ${renderComponent($$result2, "Brands", $$Brands, {})} ${renderComponent($$result2, "Resume", $$Resume, {})} ${renderComponent($$result2, "Contact", $$Contact, {})} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
