export interface Brand {
  name: string;
  category: "enterprise" | "retail" | "d2c" | "consulting";
  featured?: boolean;
}

export const brands: Brand[] = [
  { name: "Victoria's Secret", category: "enterprise", featured: true },
  { name: "Philips", category: "enterprise", featured: true },
  { name: "Bath & Body Works", category: "enterprise", featured: true },
  { name: "THE One", category: "enterprise", featured: true },
  { name: "PAN Home", category: "enterprise", featured: true },
  { name: "Metro Shoes", category: "retail", featured: true },
  { name: "Mochi Shoes", category: "retail" },
  { name: "Being Human", category: "retail" },
  { name: "Siyaram's", category: "retail" },
  { name: "Sleepwell", category: "retail" },
  { name: "William Penn", category: "retail" },
  { name: "FitFlop", category: "retail" },
  { name: "Ecco", category: "retail" },
  { name: "Sabhyata", category: "d2c" },
  { name: "Maspar", category: "d2c" },
  { name: "MarcaDisati", category: "d2c" },
  { name: "Inorbit Malls", category: "enterprise" },
  { name: "Al Maya Group", category: "enterprise" },
  { name: "Rasasi", category: "enterprise" },
];

export const featuredBrands = brands.filter(b => b.featured);
