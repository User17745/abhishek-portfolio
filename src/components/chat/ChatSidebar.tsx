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
      className="fixed right-0 top-16 w-full md:w-[450px] h-[calc(100vh-4rem)] bg-background border-l border-border z-30 flex flex-col overscroll-y-contain"
      style={{ overscrollBehavior: 'contain' }}
    >
      {/* Close button - positioned lower */}
      <div className="flex justify-end p-3 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={closeChat}
          className="h-9 w-9 bg-muted/80 hover:bg-muted"
        >
          <X className="h-5 w-5" />
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleSidebarState = (event: Event) => {
      const customEvent = event as CustomEvent<{ isOpen?: boolean }>;
      setIsSidebarOpen(Boolean(customEvent.detail?.isOpen));
    };

    document.addEventListener("sidebar-state-change", handleSidebarState as EventListener);
    const sidebarOpen = document.querySelector('[data-sidebar-open="true"]') !== null;
    setIsSidebarOpen(sidebarOpen);

    return () => {
      document.removeEventListener("sidebar-state-change", handleSidebarState as EventListener);
    };
  }, []);

  const handleClick = () => {
    document.dispatchEvent(new CustomEvent('toggle-chat'));
  };

  return (
    <button
      onClick={handleClick}
      className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
    >
      {!isSidebarOpen && (
        <img
          src="/cookie-avatar.gif"
          alt="Cookie"
          className="w-8 h-8 rounded-full border-2 border-white/20"
        />
      )}
      <span className="font-medium">Interview me right now!</span>
    </button>
  );
}
