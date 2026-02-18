import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieToggle() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    document.addEventListener('toggle-chat', handleToggle);
    document.addEventListener('open-chat', handleOpen);
    document.addEventListener('close-chat', handleClose);

    return () => {
      document.removeEventListener('toggle-chat', handleToggle);
      document.removeEventListener('open-chat', handleOpen);
      document.removeEventListener('close-chat', handleClose);
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
      <img 
        src="/cookie-avatar.gif" 
        alt="Cookie" 
        className="w-5 h-5 rounded-full"
      />
      {isOpen && (
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
      )}
    </Button>
  );
}
