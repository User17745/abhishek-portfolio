import React, { useEffect, useState } from "react";
import { ChatComponent } from "./ChatComponent";
import type { ChatAttachment, ChatMessage } from "./ChatContext";

const CHAT_STORAGE_KEY = "cookie_chat_history_v1";

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAT_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Array<Omit<ChatMessage, "timestamp"> & { timestamp: string }>;
      const hydrated = parsed.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(hydrated);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  }, []);

  useEffect(() => {
    try {
      const serializable = messages.map((msg) => ({
        ...msg,
        timestamp: msg.timestamp.toISOString(),
      }));
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(serializable));

      // Notify sidebar about message count
      document.dispatchEvent(new CustomEvent('chat-messages-count', {
        detail: { count: messages.length }
      }));
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, [messages]);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const clearSuggestedQuestions = () => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (!msg.metadata?.suggested_questions?.length) {
          return msg;
        }
        return {
          ...msg,
          metadata: {
            ...msg.metadata,
            suggested_questions: [],
          },
        };
      })
    );
  };

  // Listen for clear-chat event from sidebar
  useEffect(() => {
    const handleClearChat = () => {
      setMessages([]);
      localStorage.removeItem(CHAT_STORAGE_KEY);
    };

    document.addEventListener('clear-chat', handleClearChat);

    return () => {
      document.removeEventListener('clear-chat', handleClearChat);
    };
  }, []);

  const handleSendMessage = async (message: string, attachment?: ChatAttachment) => {
    if (!message.trim() && !attachment) return;

    // Suggestions are ephemeral and should disappear after any next user action.
    clearSuggestedQuestions();

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message.trim() || `Uploaded file: ${attachment?.name}`,
      timestamp: new Date(),
      attachment: attachment
        ? {
          name: attachment.name,
          mimeType: attachment.mimeType,
        }
        : undefined,
    };

    addMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await fetch("/api/match-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          attachment,
          conversationHistory: messages.slice(-10).map((item) => ({
            role: item.role,
            content: item.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const isAnalysis = data?.mode === "analysis" || typeof data?.fit_score === "number";
      const assistantContent =
        data?.mode === "conversation" && typeof data?.response_text === "string"
          ? data.response_text
          : isAnalysis
            ? "Here is fitment analysis."
            : "I processed your request.";

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
        metadata: {
          ...data,
          mode: isAnalysis ? "analysis" : "conversation",
          suggested_questions:
            Array.isArray(data?.suggested_questions) ? data.suggested_questions.slice(0, 3) : [],
        },
      };

      addMessage(assistantMessage);
    } catch (error) {
      console.error("Error:", error);

      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatComponent
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
    />
  );
}
