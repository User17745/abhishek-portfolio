import { a as createComponent, m as maybeRenderHead, d as addAttribute, b as renderTemplate, r as renderComponent } from './astro/server_D5QLXxeQ.mjs';
import 'piccolore';
import { n as navItems, s as siteConfig } from './config_DgxodS-V.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Moon, Sun, X, Menu, Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { B as Button } from './badge_C3Zljwn0.mjs';
/* empty css                          */

function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: toggleTheme,
      "aria-label": "Toggle theme",
      children: theme === "light" ? /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" })
    }
  );
}

function MobileMenu({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  return /* @__PURE__ */ jsxs("div", { className: "md:hidden", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        onClick: () => setIsOpen(!isOpen),
        "aria-label": "Toggle menu",
        children: isOpen ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-x-0 top-16 h-auto min-h-[calc(100vh-4rem)] bg-white dark:bg-zinc-900 z-50 p-6", children: /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-4", children: items.map((item) => /* @__PURE__ */ jsx(
      "a",
      {
        href: item.href,
        className: "text-lg font-medium py-3 px-4 rounded-lg hover:bg-muted transition-colors",
        onClick: () => setIsOpen(false),
        children: item.label
      },
      item.href
    )) }) })
  ] });
}

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const items = navItems;
  return renderTemplate`${maybeRenderHead()}<header class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"> <nav class="container mx-auto px-4 h-16 flex items-center justify-between"> <a href="/" class="flex items-center gap-2 group"> <img src="/profile.webp" alt="Abhishek Aggarwal" class="w-8 h-8 rounded-full object-cover border-2 border-border group-hover:border-accent transition-colors"> <span class="font-bold text-xl gradient-text">Abhishek</span> </a> <div class="hidden md:flex items-center gap-6"> ${items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="text-sm text-muted-foreground hover:text-foreground transition-colors"> ${item.label} </a>`)} </div> <div class="flex items-center gap-4"> ${renderComponent($$result, "ThemeToggle", ThemeToggle, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/layout/ThemeToggle", "client:component-export": "default" })} <a${addAttribute(siteConfig.links.linkedin, "href")} target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex h-9 px-4 items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
Connect
</a> ${renderComponent($$result, "MobileMenu", MobileMenu, { "client:load": true, "items": items, "client:component-hydration": "load", "client:component-path": "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/layout/MobileMenu", "client:component-export": "default" })} </div> </nav> </header>`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/layout/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-border bg-card" data-astro-cid-35ed7um5> <div class="container mx-auto px-4 py-12" data-astro-cid-35ed7um5> <div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-astro-cid-35ed7um5> <div data-astro-cid-35ed7um5> <h3 class="font-bold text-lg mb-4 gradient-text" data-astro-cid-35ed7um5>Abhishek Aggarwal</h3> <p class="text-muted-foreground text-sm mb-4" data-astro-cid-35ed7um5>
Building digital commerce platforms that actually convert. Based in Dubai, working across borders.
</p> </div> <div data-astro-cid-35ed7um5> <h4 class="font-semibold mb-4" data-astro-cid-35ed7um5>Contact</h4> <div class="space-y-3 text-sm text-muted-foreground" data-astro-cid-35ed7um5> <a${addAttribute(`mailto:${siteConfig.contact.email}`, "href")} class="flex items-center gap-2 hover:text-accent transition-colors" data-astro-cid-35ed7um5> ${renderComponent($$result, "Mail", Mail, { "className": "h-4 w-4 text-accent", "data-astro-cid-35ed7um5": true })} ${siteConfig.contact.email} </a> <div class="flex items-center gap-2" data-astro-cid-35ed7um5> ${renderComponent($$result, "MapPin", MapPin, { "className": "h-4 w-4 text-highlight", "data-astro-cid-35ed7um5": true })} ${siteConfig.contact.location} </div> </div> </div> <div data-astro-cid-35ed7um5> <h4 class="font-semibold mb-4" data-astro-cid-35ed7um5>Find Me On</h4> <div class="flex flex-wrap items-center gap-3" data-astro-cid-35ed7um5> <a${addAttribute(siteConfig.links.linkedin, "href")} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors" aria-label="LinkedIn" data-astro-cid-35ed7um5> ${renderComponent($$result, "Linkedin", Linkedin, { "className": "h-5 w-5 text-[#0A66C2]", "data-astro-cid-35ed7um5": true })} </a> <a${addAttribute(siteConfig.links.github, "href")} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-foreground hover:bg-foreground/10 transition-colors" aria-label="GitHub" data-astro-cid-35ed7um5> ${renderComponent($$result, "Github", Github, { "className": "h-5 w-5", "data-astro-cid-35ed7um5": true })} </a> <!-- Reddit with sketch callout --> <div class="reddit-callout flex items-center gap-2" data-astro-cid-35ed7um5> <span class="sketch-text" data-astro-cid-35ed7um5>Hear me ramble about the silly stuff that keeps me going.</span> <svg class="sketch-arrow" viewBox="0 0 80 40" fill="none" data-astro-cid-35ed7um5> <!-- Curvy path with "wrong turns" --> <path d="M5 20 
                   Q 15 10, 25 18 
                   Q 35 26, 45 14 
                   Q 55 4, 60 16
                   Q 65 24, 72 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 3" class="arrow-path" data-astro-cid-35ed7um5></path> <!-- Arrow head --> <path d="M68 14 L 76 20 L 68 26" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" data-astro-cid-35ed7um5></path> </svg> <a${addAttribute(siteConfig.links.reddit, "href")} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-[#FF4500] hover:bg-[#FF4500]/10 transition-colors" aria-label="Reddit" data-astro-cid-35ed7um5> <svg class="h-5 w-5 text-[#FF4500]" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-35ed7um5> <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.003-2.176-7.003-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .37-.249l2.972.612a1.252 1.252 0 0 1 1.042-.566zM8.5 11.983c-.968 0-1.754.786-1.754 1.754s.786 1.754 1.754 1.754 1.754-.786 1.754-1.754-.786-1.754-1.754-1.754zm7 0c-.968 0-1.754.786-1.754 1.754s.786 1.754 1.754 1.754 1.754-.786 1.754-1.754-.786-1.754-1.754-1.754zm-3.5 3.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z" data-astro-cid-35ed7um5></path> </svg> </a> </div> </div> </div> </div> <div class="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground" data-astro-cid-35ed7um5> <p data-astro-cid-35ed7um5>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Abhishek Aggarwal. All rights reserved.</p> </div> </div> </footer> `;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/components/layout/Footer.astro", void 0);

export { $$Header as $, $$Footer as a };
