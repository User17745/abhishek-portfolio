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
    sm: "w-6 h-6 text-[10px]",
    md: "w-10 h-10 text-xs",
    lg: "w-14 h-14 text-sm",
    xl: "w-20 h-20 text-base",
  };

  if (logo) {
    return (
      <div
        className={cn(
          "relative group transition-all duration-300 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-2",
          sizeClasses[size],
          className
        )}
        title={name}
      >
        <img
          src={logo}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl flex items-center justify-center font-bold text-white shadow-sm transition-all duration-300 px-4 py-2 text-[10px] md:text-xs min-h-[56px] w-full",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${brandColor}, ${lightenColor(brandColor, 20)})`,
      }}
      title={name}
    >
      <span className="text-center">{name}</span>
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
