import { cn } from "@/lib/utils";
import { getBrandInitials } from "@/data/brands";

interface BrandLogoProps {
  name: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function BrandLogo({ name, color, size = "md", className }: BrandLogoProps) {
  const initials = getBrandInitials(name);
  const brandColor = color || "#6b7280";
  
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  };

  return (
    <div
      className={cn(
        "rounded-lg flex items-center justify-center font-bold text-white shadow-sm transition-transform hover:scale-105",
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
