import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { Send, Upload, X, FileText, User, CheckCircle, AlertCircle, Cookie as CookieIcon, TriangleAlert, RotateCcw, Linkedin, Mail, Github, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { ChatAttachment, ChatMessage } from "./ChatContext";
import { siteConfig } from "@/lib/config";

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
  const fitScore = metadata.fit_score ?? 0;
  const contactMessage = fitScore >= 80
    ? "This looks like a strong fit. Connect with Abhishek directly to move forward."
    : fitScore >= 60
      ? "This can be a good match with the right framing. Connect with Abhishek for deeper discussion."
      : "There may be gaps, but context matters. Connect with Abhishek to explore practical alignment.";

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
          <h4 className="text-sm font-semibold">Abhishek For This Role?</h4>
          <p className="text-sm text-muted-foreground">{renderAssistantTextWithEmphasis(metadata.recommended_positioning)}</p>
        </div>
      )}

      {metadata.fit_score !== undefined && (
        <div className="rounded-xl border bg-muted/40 p-3 space-y-3">
          <p className="text-xs text-muted-foreground">{contactMessage}</p>
          <div className="flex flex-col gap-2">
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0958a8] transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              Connect on LinkedIn
            </a>
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs hover:bg-accent/20 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs hover:bg-accent/20 transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                Git
              </a>
              <a
                href={siteConfig.links.reddit}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs hover:bg-accent/20 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Reddit
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ChatComponentProps {
  messages: ChatMessage[];
  onSendMessage: (message: string, attachment?: ChatAttachment) => void;
  onClearChat: () => void;
  isLoading?: boolean;
}

export function ChatComponent({
  messages,
  onSendMessage,
  onClearChat,
  isLoading = false
}: ChatComponentProps) {
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<ChatAttachment | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Scroll to first line of last message when new messages arrive
  useEffect(() => {
    if (lastMessageRef.current && messages.length > 0) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages, isLoading]);

  const handleSubmit = () => {
    if ((!input.trim() && !attachedFile) || isLoading) return;

    const messageToSend = input.trim();

    onSendMessage(messageToSend, attachedFile || undefined);
    setInput("");
    setAttachedFile(null);
    setUploadError(null);
  };

  const handleClearChat = () => {
    const shouldClear = window.confirm("Clear this chat history and start over?");
    if (!shouldClear) return;
    onClearChat();
    setInput("");
    setAttachedFile(null);
    setUploadError(null);
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
    setUploadError(null);
    const validTypes = [
      ".txt",
      ".md",
      ".pdf",
      ".doc",
      ".docx",
      "text/plain",
      "text/markdown",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!validTypes.includes(extension) && !validTypes.includes(file.type)) {
      setUploadError("Unsupported file type. Use .txt, .md, .pdf, .doc, or .docx.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      setUploadError("Could not read this file. Try a different file.");
    };
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== "string") return;
      const base64 = result.split(",")[1] || "";
      setAttachedFile({
        name: file.name,
        mimeType: file.type || guessMimeType(extension),
        base64,
      });
      setUploadError(null);
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

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

  const composerSuggestions =
    [...messages]
      .reverse()
      .find((msg) => msg.role === "assistant" && msg.metadata?.suggested_questions?.length)
      ?.metadata?.suggested_questions ?? [];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Messages - Scrollable area */}
      <div
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 overscroll-y-contain ${isDragActive ? "bg-primary/5" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
            <img src="/cookie-avatar.gif" alt="Cookie" className="h-16 w-16 rounded-full opacity-90 shadow-lg" />
            <div>
              <p className="font-medium text-foreground">Hey there! I'm Cookie 🍪</p>
              <p className="text-sm text-muted-foreground mt-1">
                Abhishek couldn't be here right now, but I've got his back!
                Ask me anything about his background, or drop a JD for a quick fitment analysis.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Try: &quot;What makes Abhishek unique?&quot;
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => {
          const cookieMetadata = message.role === "assistant" ? message.metadata : null;
          const isAnalysis = cookieMetadata?.mode === "analysis" || typeof cookieMetadata?.fit_score === "number";
          const isLast = index === messages.length - 1;

          return (
            <div
              key={message.id}
              ref={isLast ? lastMessageRef : null}
              className={`flex gap-2 chat-message-enter max-w-full ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white order-2"
                    : "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                  }`}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <CookieIcon className="h-4 w-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`flex-1 max-w-[85%] ${message.role === "user" ? "flex flex-col items-end" : ""}`}>
                {isAnalysis && cookieMetadata ? (
                  <div className="rounded-2xl rounded-br-md bg-white dark:bg-zinc-100 text-foreground px-4 py-3 shadow-sm border-0">
                    <CookieResponseDisplay metadata={cookieMetadata} />
                  </div>
                ) : (
                  <div className={`inline-flex flex-col gap-1 ${
                    message.role === "user"
                      ? "items-end"
                      : "items-start"
                  }`}>
                    {shouldRenderMessageText(message) && (
                      <div
                        className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
                            : "bg-white dark:bg-zinc-100 text-foreground rounded-bl-md"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.role === "assistant"
                            ? renderAssistantTextWithEmphasis(message.content)
                            : message.content}
                        </p>
                      </div>
                    )}

                    {message.attachment && (
                      <div
                        className={`rounded-2xl px-3 py-2 text-left shadow-sm ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 rounded-br-md"
                            : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 rounded-bl-md"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium">{message.attachment.name}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {formatMimeLabel(message.attachment.mimeType)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Timestamp */}
                <div className={`flex items-center gap-1 mt-1 ${
                  message.role === "user" ? "flex-row" : "flex-row"
                }`}>
                  <Clock className="h-3 w-3 text-muted-foreground/60" />
                  <p className="text-[10px] text-muted-foreground/60">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center overflow-hidden shadow-sm">
              <CookieIcon className="h-4 w-4" />
            </div>
            <div className="bg-white dark:bg-zinc-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Input Area - Sticky at bottom */}
      <div className="p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-zinc-800/50 shrink-0">
        {messages.length > 0 && (
          <div className="mb-2 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              disabled={isLoading}
              className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Clear chat
            </Button>
          </div>
        )}

        {/* Attached File */}
        {attachedFile && (
          <div className="mb-2">
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-3 py-2">
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm flex-1 truncate">{attachedFile.name}</span>
              <button
                onClick={removeFile}
                className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full shrink-0 transition-colors"
                disabled={isLoading}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {!!composerSuggestions.length && (
          <div className="mb-2.5 flex flex-col items-end gap-1.5">
            <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">
              Suggested Follow-ups
            </p>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {composerSuggestions.map((question, idx) => (
                <Button
                  key={`composer-suggestion-${idx}`}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onSendMessage(question)}
                  disabled={isLoading}
                  className="h-auto whitespace-normal text-left justify-start rounded-2xl border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 px-3 py-2 leading-snug text-[11px] text-foreground transition-colors"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {uploadError && (
          <div className="mb-2 flex items-center gap-1.5 text-[11px] text-red-500">
            <TriangleAlert className="h-3.5 w-3.5" />
            <span>{uploadError}</span>
          </div>
        )}

        <div className="flex items-end gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".txt,.md,.pdf,.doc,.docx,text/plain,text/markdown,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            disabled={isLoading}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="shrink-0 h-10 w-10 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Upload file"
            title="Upload file"
          >
            <Upload className="h-4 w-4" />
          </Button>

          <div className="flex-1 relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Abhishek..."
              className="min-h-[40px] max-h-[120px] resize-none text-sm rounded-2xl border-gray-200 dark:border-zinc-800 focus:border-blue-400 dark:focus:border-blue-400"
              disabled={isLoading}
              rows={1}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={(!input.trim() && !attachedFile) || isLoading}
            size="icon"
            className="shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
          Press Enter to send • Drag & drop or upload .txt, .md, .pdf, .doc, .docx
        </p>
      </div>
    </div>
  );
}

function shouldRenderMessageText(message: ChatMessage): boolean {
  if (message.role !== "user") {
    return message.content.trim().length > 0;
  }

  if (!message.attachment) {
    return message.content.trim().length > 0;
  }

  return !message.content.startsWith("Uploaded file:");
}

function formatMimeLabel(mimeType: string): string {
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("word") || mimeType.includes("doc")) return "Word Document";
  if (mimeType.includes("markdown")) return "Markdown";
  if (mimeType.includes("text")) return "Text";
  return "Document";
}

function renderAssistantTextWithEmphasis(text: string): React.ReactNode {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => (
    <React.Fragment key={`line-${lineIdx}`}>
      {renderLineWithBold(line)}
      {lineIdx < lines.length - 1 && <br />}
    </React.Fragment>
  ));
}

function renderLineWithBold(line: string): React.ReactNode {
  const markdownSegments = line.split(/(\*\*[^*]+\*\*)/g);
  return markdownSegments.map((segment, idx) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return <strong key={`segment-${idx}`}>{segment.slice(2, -2)}</strong>;
    }

    const highlightPattern =
      /(\b\d+(?:\.\d+)?%|\b\d+\+?\b|\b(?:Shopify|eCommerce|Product Development|CRO|PMO|GCC|SaaS|enterprise|conversion|fit score)\b)/gi;
    const parts = segment.split(highlightPattern);

    return (
      <React.Fragment key={`segment-${idx}`}>
        {parts.map((part, partIdx) => {
          if (!part) return null;
          const shouldHighlight = highlightPattern.test(part);
          highlightPattern.lastIndex = 0;
          return shouldHighlight ? <strong key={`part-${partIdx}`}>{part}</strong> : <React.Fragment key={`part-${partIdx}`}>{part}</React.Fragment>;
        })}
      </React.Fragment>
    );
  });
}

function guessMimeType(extension: string): string {
  switch (extension) {
    case ".md":
      return "text/markdown";
    case ".txt":
      return "text/plain";
    case ".pdf":
      return "application/pdf";
    case ".doc":
      return "application/msword";
    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      return "application/octet-stream";
  }
}
