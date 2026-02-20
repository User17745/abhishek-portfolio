import { cn } from "@/lib/utils";
import { getBrandInitials } from "@/data/brands";

interface BrandLogoProps {
  name: string;
  color?: string;
  logo?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function BrandLogo({ name, color, logo, size = "md", className }: BrandLogoProps) {
  const initials = getBrandInitials(name);
  const brandColor = color || "#6b7280";

  const sizeClasses = {
    sm: "w-10 h-10 text-[10px]",
    md: "w-16 h-16 text-xs",
    lg: "w-24 h-24 text-sm",
    xl: "w-32 h-32 text-base",
  };

  if (logo) {
    return (
      <div
        className={cn(
          "relative group transition-all duration-300 bg-white/90 dark:bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-border/10",
          sizeClasses[size],
          className
        )}
        title={name}
      >
        <img
          src={logo}
          alt={name}
          className="w-full h-full object-contain grayscale-[0.5] group-hover:grayscale-0 transition-all"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative group transition-all duration-300 bg-white/90 dark:bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-border/10 flex items-center justify-center text-center",
        sizeClasses[size],
        className
      )}
      title={name}
    >
      <span
        className="font-black uppercase tracking-tighter leading-none text-[10px] sm:text-xs"
        style={{ color: brandColor }}
      >
        {name}
      </span>
    </div>
  );
}

function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
  const B = Math.min(255, (num & 0x0000FF) + amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}
