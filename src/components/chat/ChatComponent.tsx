import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { Send, Upload, X, FileText, User, CheckCircle, AlertCircle, Cookie as CookieIcon, TriangleAlert, Linkedin, Mail, Github, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ChatAttachment, ChatMessage } from "./ChatContext";
import { siteConfig } from "@/lib/config";


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
            <span className="leading-relaxed">{renderAssistantTextWithEmphasis(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CookieResponseDisplay({ metadata }: { metadata: NonNullable<ChatMessage["metadata"]> }) {
  const fitScore = metadata.fit_score ?? 0;

  return (
    <div className="space-y-3">
      {metadata.fit_score !== undefined && (
        <div className="flex items-center justify-between gap-4 py-1 border-b border-border/50">
          <div className="flex-1">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${fitScore >= 80 ? "bg-green-500" : fitScore >= 60 ? "bg-amber-500" : "bg-red-500"} transition-all duration-500`}
                style={{ width: `${fitScore}%` }}
              />
            </div>
          </div>
          <span className="text-xl font-bold tabular-nums shrink-0">{fitScore}%</span>
        </div>
      )}

      {metadata.what_looking_for && (
        <div className="text-[11px] leading-tight text-muted-foreground italic px-1">
          Searching for: <span className="text-foreground/80 font-medium">{metadata.what_looking_for}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <MatchList
          title="Match"
          items={metadata.strong_matches}
          icon={CheckCircle}
          colorClass="text-green-500"
        />

        <div className="grid grid-cols-2 gap-3">
          <MatchList
            title="Partial"
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
        </div>
      </div>

      {metadata.recommended_positioning && (
        <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
          <p className="text-[12px] leading-relaxed text-foreground/90 font-medium">
            {renderAssistantTextWithEmphasis(metadata.recommended_positioning)}
          </p>
        </div>
      )}

      <div className="pt-2 flex flex-col gap-2">
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#0A66C2] py-2 text-[13px] font-semibold text-white transition-all hover:bg-[#0958a8] hover:shadow-lg active:scale-[0.98]"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn Profile
        </a>
        <div className="flex gap-2">
          <a
            href={`mailto:${siteConfig.links.email} `}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-[11px] font-medium hover:bg-muted/50 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            Email
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border py-2 text-[11px] font-medium hover:bg-muted/50 transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

interface ChatComponentProps {
  messages: ChatMessage[];
  onSendMessage: (message: string, attachment?: ChatAttachment) => void;
  isLoading?: boolean;
}

export function ChatComponent({
  messages,
  onSendMessage,
  isLoading = false
}: ChatComponentProps) {
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState<ChatAttachment | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [showTrustInfo, setShowTrustInfo] = useState(false);

  const handleDownloadKnowledgeBase = () => {
    const links = Object.entries({
      'Knowledge Base': '/docs/resources/rag/',
      'eCommerce': '/docs/resources/raw-data/Abhishek Aggarwal - Resume (eCom).md',
      'Pre-Sales': '/docs/resources/raw-data/Abhishek Aggarwal - Resume (Pre-Sales & Solutions Engineering).md',
      'Product Manager': '/docs/resources/raw-data/Abhishek Aggarwal - Resume - Product Manager.md',
      'PMO': '/docs/resources/raw-data/Abhishek Aggarwal - Resume - Program Managament Office (PMO).md',
      'Shopify TPM': '/docs/resources/raw-data/Abhishek Aggarwal - Resume - Shopify TPM.md',
      'Technical PM': '/docs/resources/raw-data/Abhishek Aggarwal - Resume - Technical Project Manager (TPM).md',
    });

    links.forEach(([name, url], idx) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.md`;
        a.click();
        setTimeout(() => a.remove(), 100);
      }, idx * 100);
    });
  };

  const scrollToResume = () => {
    // Close chat on mobile before scrolling
    if (window.innerWidth < 768) {
      document.dispatchEvent(new CustomEvent('close-chat'));
    }

    const element = document.getElementById('resume');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleToggleTrust = () => setShowTrustInfo(prev => !prev);
    document.addEventListener('toggle-trust-info', handleToggleTrust);
    return () => document.removeEventListener('toggle-trust-info', handleToggleTrust);
  }, []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Check if user has already performed a fitment analysis
  const hasDoneAnalysis = messages.some(msg =>
    msg.role === 'assistant' &&
    (msg.metadata?.mode === 'analysis' || typeof msg.metadata?.fit_score === 'number')
  );

  // Count user messages
  const userMessageCount = messages.filter(msg => msg.role === 'user').length;

  // Show JD upload tip only after user has engaged (2+ messages) and no analysis/file-present
  const shouldShowResumeReminder = userMessageCount >= 2 && !hasDoneAnalysis && !attachedFile;

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
      "text/plain",
      "text/markdown",
      "application/pdf",
    ];
    const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

    if (!validTypes.includes(extension) && !validTypes.includes(file.type)) {
      setUploadError("Unsupported file type. Use .txt, .md, or .pdf.");
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
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Messages - Scrollable area */}
      <div
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 overscroll-y-contain ${messages.length > 0 ? "pb-[320px]" : ""} ${isDragActive ? "bg-primary/5" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 min-h-[200px]">
            <img src="/cookie-avatar.gif" alt="Cookie" className="h-16 w-16 rounded-full opacity-90 shadow-lg" />
            <div className="max-w-[280px]">
              <p className="font-medium text-foreground">Hey there! I'm Cookie 🍪</p>
              <p className="text-sm text-muted-foreground mt-1">
                Abhishek couldn't be here right now, but I've got his back!
                Ask me anything about his background, or drop a JD for a quick fitment analysis.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Try: &quot;What makes Abhishek unique?&quot;
              </p>

              <div className="w-12 h-[1px] bg-border mx-auto my-4" />

              <div className="flex flex-col items-center gap-2">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Upload your JD or copy-paste it here to generate a detailed fitment report.
                </p>
              </div>
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
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-sm ${message.role === "user"
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
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
                  <div className="rounded-2xl rounded-br-md bg-white dark:bg-zinc-900 text-foreground px-4 py-3 shadow-sm border border-gray-100 dark:border-zinc-800/50">
                    <CookieResponseDisplay metadata={cookieMetadata} />
                  </div>
                ) : (
                  <div className={`inline-flex flex-col gap-1 ${message.role === "user"
                    ? "items-end"
                    : "items-start"
                    }`}>
                    {shouldRenderMessageText(message) && (
                      <div
                        className={`rounded-2xl px-4 py-2.5 shadow-sm ${message.role === "user"
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md"
                          : "bg-white dark:bg-zinc-900 text-foreground rounded-bl-md border border-gray-100 dark:border-zinc-800/50"
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
                        className={`rounded-2xl px-3 py-2 text-left shadow-sm ${message.role === "user"
                          ? "bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 rounded-br-md text-white"
                          : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 rounded-bl-md"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className={`h-4 w-4 shrink-0 ${message.role === "user" ? "text-blue-100" : "text-muted-foreground"}`} />
                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium">{message.attachment.name}</p>
                            <p className={`text-[10px] ${message.role === "user" ? "text-blue-200" : "text-muted-foreground"}`}>
                              {formatMimeLabel(message.attachment.mimeType)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Timestamp */}
                <div className={`flex items-center gap-1 mt-1 ${message.role === "user" ? "flex-row" : "flex-row"}`}>
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
            <div className="bg-white dark:bg-zinc-900 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100 dark:border-zinc-800/50">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Input Area - Absolute at bottom overlay */}
      <div className="absolute bottom-0 inset-x-0 p-3 pb-[env(safe-area-inset-bottom,24px)] md:pb-6 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent backdrop-blur-[0.1px] z-20">
        {/* Attached File */}
        {!!composerSuggestions.length && !input.trim() && !attachedFile && (
          <div className="mb-2.5 flex flex-col items-end gap-1">
            <p className="text-[8px] font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
              Suggestions
            </p>
            <div className="flex flex-wrap gap-1 justify-end max-w-[90%]">
              {composerSuggestions.map((question, idx) => (
                <button
                  key={`composer-suggestion-${idx}`}
                  type="button"
                  onClick={() => onSendMessage(question)}
                  disabled={isLoading}
                  className="text-left bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-2.5 py-1.5 text-[10px] text-foreground hover:border-blue-300 dark:hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Attached File */}
        {attachedFile && (
          <div className="mb-2">
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl px-3 py-2 border border-blue-200/50 dark:border-blue-800/20">
              <FileText className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="text-sm flex-1 truncate text-foreground/90">{attachedFile.name}</span>
              <button
                onClick={removeFile}
                className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full shrink-0 transition-colors text-muted-foreground hover:text-red-500"
                disabled={isLoading}
                title="Remove file"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {uploadError && (
          <div className="mb-2 flex items-center gap-1.5 text-[11px] text-red-500">
            <TriangleAlert className="h-3.5 w-3.5" />
            <span>{uploadError}</span>
          </div>
        )}
        {/* Resume Upload Reminder - Short Indicator */}
        {shouldShowResumeReminder && (
          <div className="mb-2 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="text-sm">📄</span>
            <p className="text-[10px] text-amber-800 dark:text-amber-200 leading-tight">
              Tip: Upload your Job Description or copy paste it here for a quick fitment analysis.
            </p>
          </div>
        )}

        <div className="flex items-end gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".txt,.md,.pdf,text/plain,text/markdown,application/pdf"
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
              onFocus={() => setShowTrustInfo(false)}
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
          Press Enter to send • Drag & drop or upload .txt, .md, .pdf
        </p>



        {/* "Don't Trust Cookie" Disclaimer */}
        <div className={`relative overflow-hidden transition-all duration-500 ease-in-out ${showTrustInfo ? "max-h-[800px] opacity-100 mt-4 border-t border-gray-200/50 dark:border-zinc-800/50 pt-4 pb-2" : "max-h-0 opacity-0"}`}>
          <button
            onClick={() => setShowTrustInfo(false)}
            className="absolute right-0 top-4 p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors z-10"
            aria-label="Close disclaimer"
          >
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
          <div className="flex items-start gap-2 pr-6">
            <div className="flex-1">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                Don't trust Cookie?
              </p>
              <p className="text-xs text-foreground/80 leading-relaxed mb-2">
                Cookie is truthful, but for manual verification:
              </p>
              <div className="space-y-1.5">
                <button
                  onClick={handleDownloadKnowledgeBase}
                  className="flex items-center gap-2 text-[11px] text-blue-500 hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  <Download className="h-3 w-3" />
                  <span>Download MD Knowledge Base & Check with your Agent!</span>
                </button>
                <button
                  onClick={scrollToResume}
                  className="flex items-center gap-2 text-[11px] text-blue-500 hover:text-blue-600 transition-colors text-left cursor-pointer"
                >
                  <FileText className="h-3 w-3" />
                  <span>View PDF Resumes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
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
    default:
      return "application/octet-stream";
  }
}
