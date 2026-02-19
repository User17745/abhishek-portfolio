import React, { useEffect, useState } from "react";
import { ChatContainer } from "./ChatContainer";
import { X, Upload, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    // The drop event will be handled by ChatContainer
  };

  return (
    <>
      {isDragActive && (
        <div className="fixed inset-0 z-50 bg-blue-500/10 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-3 animate-in zoom-in-95 duration-200">
            <Upload className="h-12 w-12 text-blue-500 animate-bounce" />
            <p className="text-lg font-medium text-foreground">Drop your resume here</p>
            <p className="text-sm text-muted-foreground">
              Supports .txt, .md, .pdf, .doc, .docx
            </p>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center gap-3 mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
              <h3 className="text-lg font-semibold text-foreground">Clear chat history?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              This will remove all messages from this conversation. You can always start a new chat by closing and reopening.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setShowClearConfirm(false);
                  document.dispatchEvent(new CustomEvent('clear-chat'));
                }}
              >
                Clear Chat
              </Button>
            </div>
          </div>
        </div>
      )}

      <div
        data-sidebar-open="true"
        className="fixed right-0 top-16 w-full md:w-[450px] h-[calc(100vh-4rem)] bg-background border-l border-border z-30 flex flex-col overscroll-y-contain"
        style={{ overscrollBehavior: 'contain' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Header with Clear and Close buttons */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-gray-200/50 dark:border-zinc-800/50 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowClearConfirm(true)}
            className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold text-foreground">Chat with Cookie</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeChat}
            className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-hidden">
          <ChatContainer />
        </div>
      </div>
    </>
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
      className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
    >
      {!isSidebarOpen && (
        <img
          src="/cookie-avatar.gif"
          alt="Cookie"
          className="w-8 h-8 rounded-full border-2 border-white/30"
        />
      )}
      <span className="font-medium">Interview me right now!</span>
    </button>
  );
}
