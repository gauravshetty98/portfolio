"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Loader2, Github, Linkedin, BookOpen } from "lucide-react";
import { sendChatMessage } from "@/lib/chatApi";
import { personal } from "@/data/personal";
import { basePath } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "What are Gaurav's key skills?",
  "Tell me about his AI projects",
  "What's his work experience?",
  "What publications does he have?",
];

const socialLinks = [
  { icon: Linkedin, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: Github, href: personal.social.github, label: "GitHub" },
  { icon: BookOpen, href: personal.social.googleScholar, label: "Google Scholar" },
];

export function ChatLanding() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(timer);
  }, []);

  async function handleSend(text?: string) {
    const query = text || input.trim();
    if (!query || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setLoading(true);

    try {
      const data = await sendChatMessage(query);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="relative min-h-screen flex flex-col bg-(--background) selection:bg-(--foreground) selection:text-(--background)">
      {/* Subtle noise texture overlay (optional, adds to minimal aesthetic) */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-6 pt-28 pb-8 z-10">
        
        {/* Hero intro — collapses when chat starts */}
        <AnimatePresence>
          {!hasMessages && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, height: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-start gap-6 mt-12 mb-16"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 ring-1 ring-(--border)">
                  <img
                    src={basePath(personal.profileImage)}
                    alt={personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl sm:text-3xl font-medium text-(--muted-foreground) tracking-tight">
                  Hey, I&apos;m Gaurav 👋
                </h1>
              </div>

              <h2 className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-(--foreground) leading-none">
                AI Engineer.
              </h2>
              
              <p className="text-lg sm:text-xl text-(--muted-foreground) max-w-xl leading-relaxed font-light">
                I build intelligent systems and predictive models. Ask me anything about my work, experience, or skills.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-(--muted-foreground) hover:text-(--foreground) transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat messages */}
        {hasMessages && (
          <div className="flex-1 overflow-y-auto space-y-8 mb-8 pr-2 pt-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] px-6 py-4 rounded-3xl text-base leading-relaxed ${
                    msg.role === "user"
                      ? "bg-(--foreground) text-(--background) rounded-tr-sm"
                      : "bg-(--muted)/50 text-(--foreground) rounded-tl-sm border border-(--border)/50"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div
                      className="prose prose-base dark:prose-invert max-w-none
                        [&_p]:mb-3 [&_p:last-child]:mb-0 
                        [&_ul]:ml-4 [&_ul]:list-disc [&_li]:mb-1
                        [&_a]:text-(--foreground) [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-(--border) hover:[&_a]:decoration-(--foreground) [&_a]:transition-colors"
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                  ) : (
                    msg.content
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-(--muted)/50 border border-(--border)/50 px-6 py-5 rounded-3xl rounded-tl-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-(--muted-foreground)/50 animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-(--muted-foreground)/50 animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-(--muted-foreground)/50 animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Input area */}
        <div className="mt-auto relative">
          <AnimatePresence>
            {!hasMessages && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="text-sm px-4 py-2 rounded-full
                      border border-(--border) bg-(--background)
                      hover:border-(--foreground) hover:bg-(--foreground) hover:text-(--background)
                      text-(--muted-foreground) transition-all duration-300"
                  >
                    {prompt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center shadow-sm"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={loading}
              className="w-full px-6 py-4 pr-16 text-base rounded-full
                bg-(--muted)/30 border border-(--border)
                focus:border-(--foreground)/30 focus:outline-none focus:ring-4 focus:ring-(--foreground)/5
                transition-all placeholder:text-(--muted-foreground) backdrop-blur-md"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 p-2.5 rounded-full shrink-0
                bg-(--foreground) text-(--background) 
                disabled:opacity-30 disabled:scale-100 hover:scale-105
                transition-all duration-200"
              aria-label="Send message"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5" strokeWidth={3} />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
