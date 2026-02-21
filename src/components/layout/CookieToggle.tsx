import React, { useState, useEffect } from "react";
import { Cookie as CookieIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeroButtonVisible, setIsHeroButtonVisible] = useState(true);

  useEffect(() => {
    const handleSidebarState = (event: Event) => {
      const customEvent = event as CustomEvent<{ isOpen?: boolean }>;
      setIsOpen(Boolean(customEvent.detail?.isOpen));
    };

    const handleHeroButtonVisibility = (event: Event) => {
      const customEvent = event as CustomEvent<{ isVisible: boolean }>;
      setIsHeroButtonVisible(customEvent.detail.isVisible);
    };

    document.addEventListener("sidebar-state-change", handleSidebarState as EventListener);
    document.addEventListener("hero-button-visibility", handleHeroButtonVisibility as EventListener);

    const sidebarOpen = document.querySelector('[data-sidebar-open="true"]') !== null;
    setIsOpen(sidebarOpen);

    return () => {
      document.removeEventListener("sidebar-state-change", handleSidebarState as EventListener);
      document.removeEventListener("hero-button-visibility", handleHeroButtonVisibility as EventListener);
    };
  }, []);

  const showGlow = !isHeroButtonVisible && !isOpen;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => document.dispatchEvent(new CustomEvent('toggle-chat'))}
      aria-label="Toggle chat"
      className={`relative rounded-full transition-all duration-500 ${isOpen ? 'bg-primary/10' : ''} ${showGlow ? 'pulsate-accent scale-110' : ''}`}
    >
      <CookieIcon className={`h-5 w-5 transition-colors duration-500 ${isOpen || showGlow ? "text-accent" : "text-muted-foreground"}`} />
      {isOpen && (
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
      )}
    </Button>
  );
}
