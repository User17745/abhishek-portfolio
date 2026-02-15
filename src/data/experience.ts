export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: "work" | "entrepreneurship";
  description: string;
  highlights: string[];
  roles?: string[];
}

export const experiences: Experience[] = [
  {
    id: "gh-2024",
    title: "Regional Lead – Client Solutions & Enterprise Delivery",
    company: "GreenHonchos",
    location: "Dubai, UAE",
    period: "2024 - Present",
    type: "work",
    description: "Leading GCC expansion, managing enterprise clients across UAE, KSA, Qatar. Dual role as client partner and solution architect for multi-country deliveries.",
    highlights: [
      "Led digital transformation for THE One across all GCC countries",
      "Managed ERP, CRM, and platform ecosystem integrations",
      "Senior escalation point for high-value projects across Magento, Shopify Plus, and KartmaX"
    ],
    roles: ["Client Partner", "Solution Architect", "Regional Lead"]
  },
  {
    id: "gh-2023",
    title: "Program & PMO Lead",
    company: "GreenHonchos",
    location: "Delhi, India",
    period: "2023 - 2024",
    type: "work",
    description: "Led PMO oversight for enterprise programs across digital commerce, ERP integration, and SaaS platforms. Instituted RAID logs, forecast models, and steering committee reports.",
    highlights: [
      "Built compliance dashboards and KRA matrix for project teams",
      "Implemented change request frameworks and transition protocols",
      "Collaborated with client CXOs across time zones"
    ],
    roles: ["PMO Lead", "Governance", "Stakeholder Management"]
  },
  {
    id: "gh-2022",
    title: "Consulting & CRO Lead",
    company: "GreenHonchos",
    location: "Delhi, India",
    period: "2022 - 2023",
    type: "work",
    description: "Created the Ascent CRO framework for optimizing customer journey. Consulted for major brands achieving significant conversion improvements.",
    highlights: [
      "30% increase in overall eCommerce conversion (Bath & Body Works)",
      "14% increase in add-to-cart rate",
      "Led Victoria's Secret SFCC implementation as Consulting PM"
    ],
    roles: ["CRO Consultant", "Project Manager", "Auditor"]
  },
  {
    id: "gh-2021",
    title: "Manager – Pre-Sales Solution Consulting",
    company: "GreenHonchos",
    location: "Delhi, India",
    period: "2021 - 2022",
    type: "work",
    description: "Designed and institutionalized solutioning methodologies across KartmaX, Magento, Shopify Plus, and SFCC implementations.",
    highlights: [
      "Closed deals with Victoria's Secret, Philips, THE One, PAN Home",
      "Developed reusable assets: BRD templates, WBS blueprints, cost-gap-fit tools",
      "Standardized discovery-to-delivery transition process"
    ],
    roles: ["Solution Architect", "Pre-Sales Lead", "Proposal Lead"]
  },
  {
    id: "gh-2020",
    title: "Product & Project Delivery Manager",
    company: "GreenHonchos",
    location: "Delhi, India",
    period: "2020 - 2021",
    type: "work",
    description: "Led 40+ implementations of the KartmaX platform including hyperlocal, omnichannel, and marketplace builds.",
    highlights: [
      "Delivered implementations for Metro Shoes, Mochi Shoes, FitFlop",
      "Built Omnichannel, Hyperlocal, and Multi-Vendor platform flavors",
      "Led implementations for WNWD, ExpressStores, Inorbit Malls"
    ],
    roles: ["Product Manager", "Project Manager", "Delivery Lead"]
  },
  {
    id: "gh-2020-start",
    title: "Platform Engineer & Solutions Lead",
    company: "GreenHonchos",
    location: "Delhi, India",
    period: "2020",
    type: "work",
    description: "Bootstrapped the KartXO platform development. Built core components and led initial client implementations.",
    highlights: [
      "Built first version of KartXO in 3 months",
      "Led implementations for Maspar, MarcaDisati, Artistico",
      "Full-stack development: backend, frontend, DevOps"
    ],
    roles: ["Platform Engineer", "Full-Stack Developer", "Product Owner"]
  },
  {
    id: "rigassembler",
    title: "Founder",
    company: "RigAssembler",
    location: "Delhi, India",
    period: "2015 - 2019",
    type: "entrepreneurship",
    description: "D2C eCommerce startup for custom performance computing. Served PC enthusiasts, gamers, and professionals with specialized hardware requirements.",
    highlights: [
      "First boutique PC builder in India",
      "200+ paying customers",
      "End-to-end: development, marketing, sales, logistics"
    ],
    roles: ["Founder", "Product Manager", "Marketing Lead"]
  },
  {
    id: "technotronic",
    title: "Co-Founder – Solutions & Client Consulting",
    company: "TECHNOTRONIC",
    location: "Delhi, India",
    period: "2014 - 2019",
    type: "entrepreneurship",
    description: "Delivered 50+ web and commerce tech solutions across Magento, Shopify, WordPress, PrestaShop, and custom stacks.",
    highlights: [
      "50+ projects delivered across India, UAE, UK, US",
      "Clients across multiple industries and regions",
      "Full-stack solutions across multiple platforms"
    ],
    roles: ["Co-Founder", "Solutions Architect", "Account Manager"]
  }
];
