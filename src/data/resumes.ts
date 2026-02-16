export interface Resume {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
}

export const resumes: Resume[] = [
  {
    id: "sol_eng",
    title: "Pre-Sales & Solutions",
    description: "Solution architecture, proposals, enterprise sales",
    url: "https://docs.google.com/document/d/1kP1IX6OMXoYBPBxpyfoNv1vDUrM-LMvPbMXuderXbNw/export?format=pdf",
    icon: "Presentation"
  },
  {
    id: "ecom",
    title: "eCommerce",
    description: "Full-stack commerce platform development",
    url: "https://docs.google.com/document/d/1J9Sqk0MlkItlSzXT1Xe3bxncScvFmAr2I1X7zgCfZhE/export?format=pdf",
    icon: "ShoppingCart"
  },
  {
    id: "pmo",
    title: "PMO",
    description: "Program governance and delivery management",
    url: "https://docs.google.com/document/d/1xjjTG_PsVGTjcSQie6i2F_vIESs0ISu2PSVdWdm6X0E/export?format=pdf",
    icon: "ClipboardList"
  },
  {
    id: "tpm",
    title: "Technical PM",
    description: "Technical project leadership",
    url: "https://docs.google.com/document/d/11pYiI3uY3YhJ4HKQMjIerBxT9s2nXJEGKax-UWM4c24/export?format=pdf",
    icon: "ClipboardCheck"
  },
  {
    id: "shop_pm",
    title: "Shopify TPM",
    description: "Shopify Plus implementations",
    url: "https://docs.google.com/document/d/1my5wMbzS0cvvYUm1mN7P0yVwmCLFkOlA3tgScoVnSjo/export?format=pdf",
    icon: "Store"
  },
  {
    id: "prod",
    title: "Product Manager",
    description: "SaaS product strategy & roadmaps",
    url: "https://docs.google.com/document/d/1SUbVz3astELSNosjgKb8IZedU3tZ1luiLt-PcfsmEmg/export?format=pdf",
    icon: "Box"
  },
];
