export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  platform: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  region: string;
  year: string;
  featured?: boolean;
}

export const projects: Project[] = [
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
  },
];
