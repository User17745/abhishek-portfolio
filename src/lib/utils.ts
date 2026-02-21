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

  for (let i = 0; i < 5; i++) {
    const before = result;
    result = result
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&apos;/gi, "'")
      .replace(/&#39;/gi, "'")
      .replace(/&#x27;/gi, "'")
      .replace(/&#039;/gi, "'")
      .replace(/&rsquo;/gi, "'")
      .replace(/&#8217;/gi, "'")
      .replace(/&#x2019;/gi, "'")
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&nbsp;/gi, ' ');

    if (result === before) break;
  }

  return result;
}
