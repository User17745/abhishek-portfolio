import React, { useEffect, useState } from "react";
import { ChatContainer } from "./ChatContainer";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleToggle = () => setIsOpen(prev => !prev);

    document.addEventListener('open-chat', handleOpen);
    document.addEventListener('close-chat', handleClose);
    document.addEventListener('toggle-chat', handleToggle);

    return () => {
      document.removeEventListener('open-chat', handleOpen);
      document.removeEventListener('close-chat', handleClose);
      document.removeEventListener('toggle-chat', handleToggle);
    };
  }, []);

  // Dispatch event for content squeezing
  useEffect(() => {
    document.dispatchEvent(new CustomEvent('sidebar-state-change', { 
      detail: { isOpen } 
    }));
  }, [isOpen]);

  const closeChat = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div 
      data-sidebar-open="true"
      className="fixed right-0 top-0 w-full md:w-[450px] h-screen bg-background border-l border-border z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/50 shrink-0">
        <div className="flex items-center gap-3">
          <img 
            src="/cookie-avatar.gif" 
            alt="Cookie" 
            className="w-10 h-10 rounded-full"
          />
          <div>
            <span className="font-semibold text-lg">Cookie</span>
            <p className="text-xs text-muted-foreground">- My personal agent, he will help you with all your queries.</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={closeChat}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-hidden">
        <ChatContainer />
      </div>
    </div>
  );
}

export function ChatButton() {
  const handleClick = () => {
    document.dispatchEvent(new CustomEvent('toggle-chat'));
  };

  return (
    <button
      onClick={handleClick}
      className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
    >
      <img 
        src="/cookie-avatar.gif" 
        alt="Cookie" 
        className="w-8 h-8 rounded-full border-2 border-white/20"
      />
      <span className="font-medium">Check my eligibility</span>
    </button>
  );
}
