export interface Resume {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
}

export const resumes: Resume[] = [
  {
    id: "pre-sales",
    title: "Pre-Sales & Solutions",
    description: "Solution architecture, proposals, and enterprise sales support",
    url: "https://docs.google.com/document/d/1kP1IX6OMXoYBPBxpyfoNv1vDUrM-LMvPbMXuderXbNw/export?format=pdf",
    icon: "Presentation"
  },
  {
    id: "ecom",
    title: "eCommerce",
    description: "Full-stack commerce platform development and delivery",
    url: "https://docs.google.com/document/d/1J9Sqk0MlkItlSzXT1Xe3bxncScvFmAr2I1X7zgCfZhE/export?format=pdf",
    icon: "ShoppingCart"
  },
  {
    id: "tpm",
    title: "Technical PM",
    description: "Project governance, delivery management, and stakeholder coordination",
    url: "https://docs.google.com/document/d/1xjjTG_PsVGTjcSQie6i2F_vIESs0ISu2PSVdWdm6X0E/export?format=pdf",
    icon: "ClipboardList"
  },
  {
    id: "shopify-tpm",
    title: "Shopify TPM",
    description: "Shopify Plus implementations and platform migrations",
    url: "https://docs.google.com/document/d/1my5wMbzS0cvvYUm1mN7P0yVwmCLFkOlA3tgScoVnSjo/export?format=pdf",
    icon: "Store"
  },
  {
    id: "product",
    title: "Product Manager",
    description: "SaaS product strategy, roadmaps, and platform development",
    url: "https://docs.google.com/document/d/1SUbVz3astELSNosjgKb8IZedU3tZ1luiLt-PcfsmEmg/export?format=pdf",
    icon: "Box"
  },
];
