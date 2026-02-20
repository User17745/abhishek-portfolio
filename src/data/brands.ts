export interface Brand {
  name: string;
  category: "enterprise" | "retail" | "d2c" | "consulting";
  featured?: boolean;
  color?: string;
  logo?: string;
}

export const brands: Brand[] = [
  // Enterprise / Global Brands
  { name: "Victoria's Secret", category: "enterprise", featured: true, color: "#e91e63", logo: "/images/brand-logos/victorias-secret_transformed.png" },
  { name: "Philips", category: "enterprise", featured: true, color: "#0b5ed7", logo: "/images/brand-logos/philips_transformed.png" },
  { name: "Bath & Body Works", category: "enterprise", featured: true, color: "#6b21a8", logo: "/images/brand-logos/bath-and-body-works_transformed.png" },
  { name: "THE One", category: "enterprise", featured: true, color: "#059669", logo: "/images/brand-logos/the-one_transformed.png" },
  { name: "PAN Home", category: "enterprise", featured: true, color: "#ea580c", logo: "/images/brand-logos/pan-home_transformed.png" },
  { name: "Caneza (Rasasi)", category: "enterprise", featured: true, color: "#c2410c", logo: "/images/brand-logos/caneza_transformed.png" },
  { name: "Versuni", category: "enterprise", featured: true, color: "#0284c7", logo: "/images/brand-logos/versuni_transformed.png" },
  { name: "Al Maya Group", category: "enterprise", featured: true, color: "#0f766e", logo: "/images/brand-logos/almaya_transformed.png" },

  // Retail Chains
  { name: "Metro Shoes", category: "retail", featured: true, color: "#be123c", logo: "/images/brand-logos/metro-brands_transformed.png" },
  { name: "Mochi Shoes", category: "retail", color: "#4338ca", logo: "/images/brand-logos/mochi_transformed.png" },
  { name: "Being Human", category: "retail", color: "#0891b2", logo: "/images/brand-logos/being-human_logo_transformed.png" },
  { name: "Siyaram's", category: "retail", color: "#1e40af", logo: "/images/brand-logos/siyarams_transformed.png" },
  { name: "Sleepwell", category: "retail", color: "#0d9488", logo: "/images/brand-logos/sleepwell_transformed.png" },
  { name: "William Penn", category: "retail", color: "#854d0e" },
  { name: "FitFlop", category: "retail", color: "#dc2626", logo: "/images/brand-logos/fitflop_transformed.png" },
  { name: "Ecco", category: "retail", color: "#1f2937" },
  { name: "Walkway", category: "retail", color: "#7c3aed" },
  { name: "BioFoot", category: "retail", color: "#16a34a" },
  { name: "Sabhyata", category: "retail", color: "#c2410c" },
  { name: "Inorbit Malls", category: "enterprise", color: "#2563eb", logo: "/images/brand-logos/inorbit_transformed.png" },
  { name: "BORDERS", category: "enterprise", color: "#b45309", logo: "/images/brand-logos/borders_transformed.png" },
  { name: "Jysk", category: "retail", color: "#00509d", logo: "/images/brand-logos/jysk_transformed.png" },

  // D2C & Startups
  { name: "Maspar", category: "d2c", color: "#7c3aed", logo: "/images/brand-logos/maspar_transformed.png" },
  { name: "MarcaDisati", category: "d2c", color: "#db2777" },
  { name: "ExpressStores", category: "d2c", color: "#059669" },
  { name: "Technosport", category: "d2c", color: "#dc2626", logo: "/images/brand-logos/technosport_transformed.png" },
  { name: "G3+", category: "d2c", color: "#ea580c" },
  { name: "Purvaja", category: "d2c", color: "#9333ea" },
  { name: "TrulyDesi", category: "d2c", color: "#f97316" },
  { name: "Octave", category: "d2c", color: "#0891b2", logo: "/images/brand-logos/octave_transformed.png" },
  { name: "Himeya", category: "d2c", color: "#6366f1" },
  { name: "Kompanero", category: "d2c", color: "#78716c" },

  // Consulting Clients
  { name: "Jumbo", category: "consulting", color: "#1d4ed8", logo: "/images/brand-logos/jumbo_transformed.png" },
  { name: "Lal's Group", category: "consulting", color: "#a3a3a3", logo: "/images/brand-logos/Lal-Group-Logo_transformed.png" },
  { name: "Total Foods", category: "consulting", color: "#22c55e" },
  { name: "Akinon", category: "consulting", color: "#64748b" },
  { name: "Force IX", category: "consulting", color: "#ef4444" },
  { name: "Baristina", category: "consulting", color: "#92400e", logo: "/images/brand-logos/baristina_transformed.png" },
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
