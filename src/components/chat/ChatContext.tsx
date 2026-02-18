import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { ChatSidebar as ChatSidebarComponent, ChatButton as ChatButtonComponent } from './ChatSidebar';

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachment?: ChatAttachmentPreview;
  metadata?: {
    mode?: "analysis" | "conversation";
    fit_score?: number;
    strong_matches?: string[];
    partial_matches?: string[];
    gaps?: string[];
    recommended_positioning?: string;
    confidence_level?: "High" | "Medium" | "Low";
    suggested_questions?: string[];
  };
}

export interface ChatAttachment {
  name: string;
  mimeType: string;
  base64: string;
}

export interface ChatAttachmentPreview {
  name: string;
  mimeType: string;
}

interface ChatContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  toggleChat: () => void;
  closeChat: () => void;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const toggleChat = () => setIsOpen(!isOpen);
  const closeChat = () => setIsOpen(false);
  
  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };
  
  const clearMessages = () => setMessages([]);

  return (
    <ChatContext.Provider value={{ isOpen, messages, toggleChat, closeChat, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}

// Export the sidebar and button components
export const ChatSidebar = ChatSidebarComponent;
export const ChatButton = ChatButtonComponent;
