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
  
  // Keep decoding until no more changes
  let iterations = 0;
  const maxIterations = 5;
  
  while (iterations < maxIterations) {
    const before = result;
    
    // Decode triple-encoded
    result = result
      .replace(/&amp;amp;amp;#39;/g, "'")
      .replace(/&amp;amp;amp;amp;/g, "&")
      .replace(/&amp;amp;amp;quot;/g, '"');
    
    // Decode double-encoded  
    result = result
      .replace(/&amp;amp;#39;/g, "'")
      .replace(/&amp;amp;amp;/g, "&")
      .replace(/&amp;amp;quot;/g, '"')
      .replace(/&amp;amp;lt;/g, '<')
      .replace(/&amp;amp;gt;/g, '>');
    
    // Decode single-encoded
    result = result
      .replace(/&amp;#39;/g, "'")
      .replace(/&amp;amp;/g, "&")
      .replace(/&amp;quot;/g, '"')
      .replace(/&amp;lt;/g, '<')
      .replace(/&amp;gt;/g, '>')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&apos;/g, "'");
    
    // Stop if no more changes
    if (result === before) break;
    iterations++;
  }
  
  return result;
}
