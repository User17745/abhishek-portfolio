import { c as createAstro, a as createComponent, b as renderTemplate, h as renderScript, i as renderSlot, j as renderHead, r as renderComponent, u as unescapeHTML, d as addAttribute } from './astro/server_D5QLXxeQ.mjs';
import 'piccolore';
/* empty css                          */
import { s as siteConfig } from './config_DgxodS-V.mjs';
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://abhishekaggarwal.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = siteConfig.name,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    canonicalUrl = siteConfig.url,
    type = "website"
  } = Astro2.props;
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const keywords = "Abhishek Aggarwal, eCommerce, Product Management, Pre-Sales, Solutions Architect, Digital Commerce, GCC, India, Portfolio";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "jobTitle": "eCommerce Architect | Product Builder | GCC Expansion Lead",
    "description": description,
    "sameAs": [
      siteConfig.links.linkedin,
      siteConfig.links.github,
      siteConfig.links.reddit
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "UAE"
    }
  };
  return renderTemplate(_a || (_a = __template(['<html lang="en" suppress-hydration-warning> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><meta name="author"', '><meta name="keywords"', '><meta name="robots" content="index, follow"><meta name="googlebot" content="index, follow"><link rel="canonical"', '><link rel="icon" type="image/webp" href="/favicon.webp"><link rel="apple-touch-icon" href="/favicon.webp"><link rel="alternate" type="application/rss+xml"', ' href="/rss.xml"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type"', '><meta property="og:url"', '><meta property="og:image"', '><meta property="og:image:url"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt"', '><meta property="og:image:type" content="image/webp"><meta property="og:site_name"', '><meta property="og:locale" content="en_US"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:image:width" content="1200"><meta name="twitter:image:height" content="630"><meta name="twitter:creator" content="@abhisheka"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><title>', '</title><script type="application/ld+json">', "<\/script><script>\n      const theme = localStorage.getItem('theme') || \n        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');\n      document.documentElement.classList.toggle('dark', theme === 'dark');\n    <\/script>", "", '</head> <body class="min-h-screen bg-background font-sans antialiased"> ', " ", " </body> </html>"])), addAttribute(description, "content"), addAttribute(siteConfig.name, "content"), addAttribute(keywords, "content"), addAttribute(canonicalUrl, "href"), addAttribute(`${siteConfig.name} Blog RSS`, "title"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(type, "content"), addAttribute(canonicalUrl, "content"), addAttribute(image, "content"), addAttribute(image, "content"), addAttribute(siteConfig.name, "content"), addAttribute(siteConfig.name, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(image, "content"), fullTitle, unescapeHTML(JSON.stringify(structuredData)), renderComponent($$result, "GoogleAnalytics", null, { "measurementId": siteConfig.analytics.googleMeasurementId, "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/components/shared/GoogleAnalytics", "client:component-export": "default" }), renderHead(), renderSlot($$result, $$slots["default"]), renderScript($$result, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/layouts/Layout.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

export { $$Layout as $, Button as B, Badge as a, cn as c };
