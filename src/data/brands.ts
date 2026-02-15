export interface Brand {
  name: string;
  category: "enterprise" | "retail" | "d2c" | "consulting";
  featured?: boolean;
  logo?: string;
  color?: string;
}

export const brands: Brand[] = [
  { name: "Victoria's Secret", category: "enterprise", featured: true, color: "#e91e63" },
  { name: "Philips", category: "enterprise", featured: true, color: "#0b5ed7" },
  { name: "Bath & Body Works", category: "enterprise", featured: true, color: "#6b21a8" },
  { name: "THE One", category: "enterprise", featured: true, color: "#059669" },
  { name: "PAN Home", category: "enterprise", featured: true, color: "#ea580c" },
  { name: "Metro Shoes", category: "retail", featured: true, color: "#be123c" },
  { name: "Mochi Shoes", category: "retail", color: "#4338ca" },
  { name: "Being Human", category: "retail", color: "#0891b2" },
  { name: "Siyaram's", category: "retail", color: "#1e40af" },
  { name: "Sleepwell", category: "retail", color: "#0d9488" },
  { name: "William Penn", category: "retail", color: "#854d0e" },
  { name: "FitFlop", category: "retail", color: "#dc2626" },
  { name: "Ecco", category: "retail", color: "#1f2937" },
  { name: "Sabhyata", category: "d2c", color: "#c2410c" },
  { name: "Maspar", category: "d2c", color: "#7c3aed" },
  { name: "MarcaDisati", category: "d2c", color: "#db2777" },
  { name: "Inorbit Malls", category: "enterprise", color: "#2563eb" },
  { name: "Al Maya Group", category: "enterprise", color: "#0f766e" },
  { name: "Rasasi", category: "enterprise", color: "#b45309" },
];

export const featuredBrands = brands.filter(b => b.featured);

export function getBrandInitials(name: string): string {
  const words = name.split(/[\s&-]+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function getBrandGradient(color: string): string {
  return `linear-gradient(135deg, ${color}, ${adjustColor(color, 30)})`;
}

function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}
