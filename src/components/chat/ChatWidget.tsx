import React, { useState, useEffect } from "react";
import { ChatContainer } from "./ChatContainer";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Listen for open event
    const handleOpen = () => setIsOpen(true);
    document.addEventListener("open-chat-widget", handleOpen);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("open-chat-widget", handleOpen);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      id="chat-widget"
      className={`fixed z-50 bg-background shadow-2xl transition-all duration-300 ${
        isMobile 
          ? "inset-0 w-full h-full" 
          : "right-4 top-20 w-[450px] h-[600px] rounded-xl border border-border"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <img 
            src="/cookie-avatar.gif" 
            alt="Cookie" 
            className="w-8 h-8 rounded-full"
          />
          <span className="font-semibold">Cookie</span>
        </div>
        <Button 
          id="chat-widget-close"
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(false)}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Content */}
      <div className={`overflow-auto ${isMobile ? "h-[calc(100vh-64px)]" : "h-[calc(100%-64px)]"}`}>
        <ChatContainer />
      </div>
    </div>
  );
}

export function ChatButton() {
  const handleClick = () => {
    document.dispatchEvent(new CustomEvent("open-chat-widget"));
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
      <MessageCircle className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
