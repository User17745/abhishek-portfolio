export interface Skill {
  name: string;
  category: string;
}

export const skills: Skill[] = [
  { name: "Solution Consulting", category: "Leadership" },
  { name: "Business Case Mapping", category: "Leadership" },
  { name: "Stakeholder Management", category: "Leadership" },
  { name: "Pre-Sales & GTM", category: "Leadership" },
  { name: "Team Leadership", category: "Leadership" },
  
  { name: "Product Strategy", category: "Product" },
  { name: "Roadmap Planning", category: "Product" },
  { name: "SaaS Platform Development", category: "Product" },
  { name: "Agile Methodology", category: "Product" },
  
  { name: "Project Governance", category: "PMO" },
  { name: "Risk Management (RAID)", category: "PMO" },
  { name: "Resource Forecasting", category: "PMO" },
  { name: "Process Optimization", category: "PMO" },
  
  { name: "Shopify / Shopify Plus", category: "Platforms" },
  { name: "Magento / Adobe Commerce", category: "Platforms" },
  { name: "Salesforce Commerce Cloud", category: "Platforms" },
  { name: "Akinon", category: "Platforms" },
  { name: "KartmaX", category: "Platforms" },
  
  { name: "CRO & Analytics", category: "Growth" },
  { name: "eCommerce Architecture", category: "Growth" },
  { name: "ERP Integration", category: "Growth" },
  { name: "Omnichannel Commerce", category: "Growth" },
  
  { name: "Conversion Optimization", category: "Consulting" },
  { name: "Tech Due Diligence", category: "Consulting" },
  { name: "Speed Optimization", category: "Consulting" },
  { name: "Platform Migration", category: "Consulting" },
];

export const skillCategories = [...new Set(skills.map(s => s.category))];
