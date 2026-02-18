import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_D5QLXxeQ.mjs';
import 'piccolore';
import { B as Button, a as Badge, $ as $$Layout } from '../chunks/badge_C3Zljwn0.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef } from 'react';
import { Bot, User, FileText, X, Upload, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { T as Textarea } from '../chunks/textarea_DSmNVTcb.mjs';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from '../chunks/card_BNVl2YLU.mjs';
export { renderers } from '../renderers.mjs';

function FitScoreProgress({ score }) {
  const getColor = (s) => {
    if (s >= 80) return "bg-green-500";
    if (s >= 60) return "bg-amber-500";
    return "bg-red-500";
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Fit Score" }),
      /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold", children: [
        score,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-3 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `h-full ${getColor(score)} transition-all duration-500`,
        style: { width: `${score}%` }
      }
    ) })
  ] });
}
function ConfidenceBadge({ level }) {
  const colors = {
    High: "bg-green-500/10 text-green-700 border-green-500/20",
    Medium: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    Low: "bg-red-500/10 text-red-700 border-red-500/20"
  };
  return /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: colors[level], children: [
    level,
    " Confidence"
  ] });
}
function MatchList({ title, items, icon: Icon, colorClass }) {
  if (!items || items.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs("h4", { className: "text-sm font-semibold flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Icon, { className: `h-4 w-4 ${colorClass}` }),
      title
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "text-sm text-muted-foreground flex items-start gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "•" }),
      /* @__PURE__ */ jsx("span", { children: item })
    ] }, i)) })
  ] });
}
function CookieResponseDisplay({ metadata }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 mt-4", children: [
    metadata.fit_score !== void 0 && /* @__PURE__ */ jsx(FitScoreProgress, { score: metadata.fit_score }),
    metadata.confidence_level && /* @__PURE__ */ jsx(ConfidenceBadge, { level: metadata.confidence_level }),
    /* @__PURE__ */ jsx(
      MatchList,
      {
        title: "Strong Matches",
        items: metadata.strong_matches || [],
        icon: CheckCircle,
        colorClass: "text-green-500"
      }
    ),
    /* @__PURE__ */ jsx(
      MatchList,
      {
        title: "Partial Matches",
        items: metadata.partial_matches || [],
        icon: AlertCircle,
        colorClass: "text-amber-500"
      }
    ),
    /* @__PURE__ */ jsx(
      MatchList,
      {
        title: "Gaps",
        items: metadata.gaps || [],
        icon: AlertCircle,
        colorClass: "text-red-500"
      }
    ),
    metadata.recommended_positioning && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold", children: "Recommended Positioning" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: metadata.recommended_positioning })
    ] })
  ] });
}
function ChatComponent({ messages, onSendMessage, isLoading }) {
  const [input, setInput] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const handleSubmit = async () => {
    if (!input.trim() && !attachedFile || isLoading) return;
    const messageToSend = input.trim();
    const fileContent = attachedFile?.content;
    setInput("");
    setAttachedFile(null);
    await onSendMessage(messageToSend, fileContent);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  const processFile = (file) => {
    const validTypes = [".txt", ".md", "text/plain", "text/markdown"];
    const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!validTypes.includes(extension) && !validTypes.includes(file.type)) {
      alert("Please upload a .txt or .md file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
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
  const tryParseCookieResponse = (content) => {
    try {
      const parsed = JSON.parse(content);
      if (typeof parsed.fit_score === "number") {
        return parsed;
      }
    } catch {
    }
    return null;
  };
  return /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-2xl mx-auto h-[700px] flex flex-col", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "pb-4 border-b shrink-0", children: [
      /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Bot, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsx("span", { children: "Cookie - Career Fit Analyzer" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Paste a job description or upload a file to analyze fit" })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "flex-1 flex flex-col p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [
        messages.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center text-muted-foreground py-8", children: [
          /* @__PURE__ */ jsx(Bot, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsx("p", { children: "Welcome! Paste a job description or upload a file to get started." }),
          /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "I'll analyze how Abhishek Aggarwal fits your requirements." })
        ] }),
        messages.map((message) => {
          const cookieMetadata = message.role === "assistant" ? tryParseCookieResponse(message.content) : null;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: `flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`,
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`,
                    children: message.role === "user" ? /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: `flex-1 ${message.role === "user" ? "text-right" : ""}`, children: [
                  cookieMetadata ? /* @__PURE__ */ jsx(CookieResponseDisplay, { metadata: cookieMetadata }) : /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `inline-block max-w-[85%] rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`,
                      children: /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap text-sm", children: message.content })
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-2", children: message.timestamp.toLocaleTimeString() })
                ] })
              ]
            },
            message.id
          );
        }),
        isLoading && /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-muted rounded-lg px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce" }),
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" }),
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
      ] }),
      attachedFile && /* @__PURE__ */ jsx("div", { className: "px-4 pb-2 shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-muted rounded-lg px-3 py-2", children: [
        /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm flex-1 truncate", children: attachedFile.name }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: removeFile,
            className: "p-1 hover:bg-muted-foreground/20 rounded",
            disabled: isLoading,
            children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-4 border-t shrink-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              ref: fileInputRef,
              onChange: handleFileSelect,
              accept: ".txt,.md,text/plain,text/markdown",
              className: "hidden",
              disabled: isLoading
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "icon",
              onClick: () => fileInputRef.current?.click(),
              disabled: isLoading,
              children: /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              value: input,
              onChange: (e) => setInput(e.target.value),
              onKeyDown: handleKeyDown,
              placeholder: "Paste job description or ask a question...",
              className: "min-h-[44px] max-h-[200px] resize-none",
              disabled: isLoading
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: handleSubmit,
              disabled: !input.trim() && !attachedFile || isLoading,
              size: "icon",
              children: isLoading ? /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-2 text-center", children: "Press Enter to send • Supports .txt and .md file uploads" })
      ] })
    ] })
  ] });
}

const $$Chat = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Cookie - Career Fit Analyzer" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gradient-to-b from-background to-muted py-12 px-4"> <div class="container mx-auto"> <div class="text-center mb-8"> <h1 class="text-3xl font-bold mb-2">Cookie</h1> <p class="text-muted-foreground">
AI Career Fit Analyzer for Abhishek Aggarwal
</p> </div> ${renderComponent($$result2, "ChatComponent", ChatComponent, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/chat/ChatComponent", "client:component-export": "ChatComponent" })} </div> </main> ` })}`;
}, "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/chat.astro", void 0);

const $$file = "/Users/anchlika/Projects/vibe-coding-testing/abhishek-portfolio/src/pages/chat.astro";
const $$url = "/chat";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Chat,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
