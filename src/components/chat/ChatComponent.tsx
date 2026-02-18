import React, { useState, useRef, type ChangeEvent } from "react";
import { Send, Upload, X, FileText, Bot, User, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: {
    fit_score?: number;
    strong_matches?: string[];
    partial_matches?: string[];
    gaps?: string[];
    recommended_positioning?: string;
    confidence_level?: "High" | "Medium" | "Low";
  };
}

interface ChatComponentProps {
  messages?: ChatMessage[];
  onSendMessage?: (message: string, fileContent?: string) => Promise<void>;
  isLoading?: boolean;
}

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

export function ChatComponent({ 
  messages = [], 
  onSendMessage = async () => {}, 
  isLoading = false 
}: ChatComponentProps) {
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null);
  const [hasError, setHasError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if ((!input.trim() && !attachedFile) || isLoading) return;

    const messageToSend = input.trim();
    const fileContent = attachedFile?.content;

    setInput("");
    setAttachedFile(null);

    try {
      await onSendMessage(messageToSend, fileContent);
    } catch (error) {
      console.error("Error sending message:", error);
      setHasError(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

  if (hasError) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-8 text-center">
        <p className="text-red-500">Something went wrong. Please refresh the page.</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Refresh
        </Button>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[700px] flex flex-col">
      <CardHeader className="pb-4 border-b shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span>Cookie - Career Fit Analyzer</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Paste a job description or upload a file to analyze fit
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Welcome! Paste a job description or upload a file to get started.</p>
              <p className="text-sm mt-2">I&apos;ll analyze how Abhishek Aggarwal fits your requirements.</p>
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
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
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Bot className="h-4 w-4" />
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

        {/* Attached File */}
        {attachedFile && (
          <div className="px-4 pb-2 shrink-0">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm flex-1 truncate">{attachedFile.name}</span>
              <button
                onClick={removeFile}
                className="p-1 hover:bg-muted-foreground/20 rounded"
                disabled={isLoading}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t shrink-0">
          <div className="flex gap-2">
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
            >
              <Upload className="h-4 w-4" />
            </Button>

            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste job description or ask a question..."
              className="min-h-[44px] max-h-[200px] resize-none"
              disabled={isLoading}
            />

            <Button
              onClick={handleSubmit}
              disabled={(!input.trim() && !attachedFile) || isLoading}
              size="icon"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Supports .txt and .md file uploads
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
