import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeHTMLEntities(text: string): string {
  if (!text) return text;

  // Handle multiple levels of encoding
  // ' -> &#39; -> &amp;#39; -> &amp;amp;#39; (triple encoded!)
  let result = text;

  // Keep decoding multiple levels of encoding
  for (let i = 0; i < 5; i++) {
    const before = result;
    result = result
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&apos;/g, "'");

    if (result === before) break;
  }

  return result;
}
