import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in" | "fade-in-left" | "fade-in-right" | "scale-in";
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  threshold?: number;
}

export default function ScrollAnimation({
  children,
  className,
  animation = "fade-in",
  delay,
  threshold = 0.1,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        animation,
        delay && `stagger-${delay}`,
        isVisible && "visible",
        className
      )}
    >
      {children}
    </div>
  );
}
