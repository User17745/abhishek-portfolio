import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { Send, Upload, X, FileText, User, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { ChatMessage } from "./ChatContext";

function FitScoreProgress({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s >= 80) return "bg-green-500";
    if (s >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Fit Score</span>
        <span className="text-2xl font-bold">{score}%</span>
      </div>
      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(score)} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function ConfidenceBadge({ level }: { level: "High" | "Medium" | "Low" }) {
  const colors = {
    High: "bg-green-500/10 text-green-700 border-green-500/20",
    Medium: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    Low: "bg-red-500/10 text-red-700 border-red-500/20",
  };

  return (
    <Badge variant="outline" className={colors[level]}>
      {level} Confidence
    </Badge>
  );
}

function MatchList({ title, items, icon: Icon, colorClass }: { 
  title: string; 
  items?: string[]; 
  icon: typeof CheckCircle;
  colorClass: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold flex items-center gap-2">
        <Icon className={`h-4 w-4 ${colorClass}`} />
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="text-foreground">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CookieResponseDisplay({ metadata }: { metadata: NonNullable<ChatMessage["metadata"]> }) {
  return (
    <div className="space-y-4 mt-4">
      {metadata.fit_score !== undefined && (
        <FitScoreProgress score={metadata.fit_score} />
      )}

      {metadata.confidence_level && (
        <ConfidenceBadge level={metadata.confidence_level} />
      )}

      <MatchList
        title="Strong Matches"
        items={metadata.strong_matches}
        icon={CheckCircle}
        colorClass="text-green-500"
      />

      <MatchList
        title="Partial Matches"
        items={metadata.partial_matches}
        icon={AlertCircle}
        colorClass="text-amber-500"
      />

      <MatchList
        title="Gaps"
        items={metadata.gaps}
        icon={AlertCircle}
        colorClass="text-red-500"
      />

      {metadata.recommended_positioning && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Recommended Positioning</h4>
          <p className="text-sm text-muted-foreground">{metadata.recommended_positioning}</p>
        </div>
      )}
    </div>
  );
}

interface ChatComponentProps {
  messages: ChatMessage[];
  onSendMessage: (message: string, fileContent?: string) => void;
  isLoading?: boolean;
}

export function ChatComponent({ 
  messages,
  onSendMessage,
  isLoading = false 
}: ChatComponentProps) {
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = () => {
    if ((!input.trim() && !attachedFile) || isLoading) return;

    const messageToSend = input.trim();
    const fileContent = attachedFile?.content;

    onSendMessage(messageToSend, fileContent);
    setInput("");
    setAttachedFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const validTypes = [".txt", ".md", "text/plain", "text/markdown"];
    const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!validTypes.includes(extension) && !validTypes.includes(file.type)) {
      alert("Please upload a .txt or .md file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setAttachedFile({ name: file.name, content });
    };
    reader.readAsText(file);
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const tryParseCookieResponse = (content: string): ChatMessage["metadata"] | null => {
    try {
      const parsed = JSON.parse(content);
      if (typeof parsed.fit_score === "number") {
        return parsed;
      }
    } catch {
      // Not JSON
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-y-contain" style={{ overscrollBehavior: 'contain' }}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
            <img src="/cookie-avatar.gif" alt="Cookie" className="h-16 w-16 rounded-full opacity-90" />
            <div>
              <p className="font-medium text-foreground">Welcome! I&apos;m Cookie</p>
              <p className="text-sm text-muted-foreground mt-1">Paste a job description or upload a file and I&apos;ll analyze the fit.</p>
            </div>
          </div>
        )}

        {messages.map((message) => {
          const cookieMetadata = message.role === "assistant" 
            ? tryParseCookieResponse(message.content) 
            : null;

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <img src="/cookie-avatar.gif" alt="Cookie" className="h-full w-full object-cover" />
                )}
              </div>

              <div className={`flex-1 ${message.role === "user" ? "text-right" : ""}`}>
                {cookieMetadata ? (
                  <CookieResponseDisplay metadata={cookieMetadata} />
                ) : (
                  <div
                    className={`inline-block max-w-[85%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
              <img src="/cookie-avatar.gif" alt="Cookie" className="h-full w-full object-cover" />
            </div>
            <div className="bg-muted rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Sticky at bottom */}
      <div className="p-3 border-t bg-background shrink-0">
        {/* Attached File */}
        {attachedFile && (
          <div className="mb-2">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm flex-1 truncate">{attachedFile.name}</span>
              <button
                onClick={removeFile}
                className="p-1 hover:bg-muted-foreground/20 rounded shrink-0"
                disabled={isLoading}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        <div className="flex items-end gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".txt,.md,text/plain,text/markdown"
            className="hidden"
            disabled={isLoading}
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="shrink-0 h-10 w-10"
          >
            <Upload className="h-4 w-4" />
          </Button>

          <div className="flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about eligibility..."
              className="min-h-[40px] max-h-[120px] resize-none text-sm"
              disabled={isLoading}
              rows={1}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={(!input.trim() && !attachedFile) || isLoading}
            size="icon"
            className="shrink-0 h-10 w-10"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
          Press Enter to send • Supports .txt and .md files
        </p>
      </div>
    </div>
  );
}
