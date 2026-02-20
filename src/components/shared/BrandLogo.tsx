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
      <div className={cn("relative group transition-all duration-300", sizeClasses[size], className)} title={name}>
        <img
          src={logo}
          alt={name}
          className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg flex items-center justify-center font-bold text-white shadow-sm transition-all duration-300 group-hover:scale-110 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100",
        sizeClasses[size],
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${brandColor}, ${lightenColor(brandColor, 20)})`,
      }}
      title={name}
    >
      {initials}
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
