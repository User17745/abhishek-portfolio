import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/shared/BrandLogo";
import { type Brand } from "@/data/brands";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface BrandGridProps {
    brands: Brand[];
}

export default function BrandGrid({ brands }: BrandGridProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Responsive limits for "2 rows"
    // We'll use a CSS-based approach for the initial limit 
    // to avoid hydration mismatch and then handle expansion with React.

    return (
        <div className="flex flex-col items-center gap-10 w-full animate-in fade-in duration-700">
            <div className={cn(
                "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-12 gap-y-8 sm:gap-y-16 items-start justify-items-center w-full transition-all duration-700 ease-in-out overflow-hidden",
                isExpanded ? "max-h-[4000px]" : "max-h-[200px] sm:max-h-[450px]"
            )}>
                {brands.map((brand, index) => {
                    // CSS classes to hide items beyond 2 rows based on screen size (3 columns on mobile = 6 items)
                    const visibilityClasses = cn(
                        "group flex flex-col items-center transition-all duration-500",
                        !isExpanded && index >= 6 ? "max-sm:hidden" : "",
                        !isExpanded && index >= 8 ? "sm:max-md:hidden" : "",
                        !isExpanded && index >= 10 ? "lg:hidden" : ""
                    );

                    return (
                        <div
                            key={brand.name}
                            className={visibilityClasses}
                            style={{
                                animationDelay: `${index * 20}ms`,
                            }}
                        >
                            <BrandLogo
                                name={brand.name}
                                color={brand.color}
                                logo={brand.logo}
                                size="lg"
                            />
                        </div>
                    );
                })}
            </div>

            <div className="relative w-full flex justify-center py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="group relative z-20 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground px-8 py-6 rounded-full border-border/40 bg-background/50 backdrop-blur-md hover:bg-background transition-all active:scale-95"
                >
                    {isExpanded ? (
                        <>
                            Show Less <ChevronUp className="w-3.5 h-3.5 transition-transform" />
                        </>
                    ) : (
                        <>
                            View More <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
