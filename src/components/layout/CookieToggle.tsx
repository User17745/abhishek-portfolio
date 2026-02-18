import React, { useState, useEffect } from "react";
import { Cookie as CookieIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieToggle() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleSidebarState = (event: Event) => {
      const customEvent = event as CustomEvent<{ isOpen?: boolean }>;
      setIsOpen(Boolean(customEvent.detail?.isOpen));
    };

    document.addEventListener("sidebar-state-change", handleSidebarState as EventListener);
    const sidebarOpen = document.querySelector('[data-sidebar-open="true"]') !== null;
    setIsOpen(sidebarOpen);

    return () => {
      document.removeEventListener("sidebar-state-change", handleSidebarState as EventListener);
    };
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => document.dispatchEvent(new CustomEvent('toggle-chat'))}
      aria-label="Toggle chat"
      className={`relative ${isOpen ? 'bg-primary/10' : ''}`}
    >
      <CookieIcon className={`h-5 w-5 ${isOpen ? "text-primary" : "text-muted-foreground"}`} />
      {isOpen && (
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
      )}
    </Button>
  );
}
