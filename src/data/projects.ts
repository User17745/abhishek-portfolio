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
      "Omnichannel integration with physical stores",
      "ERP and logistics orchestration"
    ],
    metrics: [
      { label: "Countries", value: "5" },
      { label: "Channels", value: "Omnichannel" }
    ],
    region: "GCC",
    year: "2024"
  },
  {
    id: "victorias-secret",
    title: "Victoria's Secret - SFCC Implementation",
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
    year: "2022"
  },
  {
    id: "bath-body-works",
    title: "Bath & Body Works - CRO Optimization",
    client: "Bath & Body Works / Apparel Group",
    description: "Applied Ascent CRO framework to optimize customer journey and improve conversion metrics.",
    platform: "CRO Consulting",
    highlights: [
      "Ascent framework implementation",
      "Customer journey mapping",
      "Tech integration health monitoring"
    ],
    metrics: [
      { label: "Conversion Increase", value: "+30%" },
      { label: "Add-to-Cart", value: "+14%" }
    ],
    region: "India",
    year: "2022"
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
      { label: "Delivery Time", value: "2 hours" }
    ],
    region: "India",
    year: "2021"
  },
  {
    id: "metro-shoes",
    title: "Metro Shoes - Enterprise D2C",
    client: "Metro Shoes",
    description: "Enterprise D2C implementation for India's leading footwear retailer.",
    platform: "KartmaX Enterprise",
    highlights: [
      "Multi-brand catalog management",
      "OMS and logistics integration",
      "High-traffic event handling"
    ],
    region: "India",
    year: "2021"
  },
  {
    id: "kartxo-platform",
    title: "KartXO Platform - Product Development",
    client: "GreenHonchos (Internal)",
    description: "Built the KartXO SaaS platform from ground up - designed for SMB D2C brands with India-specific features.",
    platform: "Proprietary SaaS",
    highlights: [
      "OTP-based login, advanced filters",
      "DIY store moderation",
      "6 successful implementations"
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
    client: "GreenHonchos (Internal)",
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
    region: "India",
    year: "2020-2023"
  }
];
