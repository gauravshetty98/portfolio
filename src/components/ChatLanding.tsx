"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CornerDownLeft } from "lucide-react";
import { sendChatMessage } from "@/lib/chatApi";
import { ScrambleText } from "./ScrambleText";
import { ChatGeneratingIndicator } from "./ChatGeneratingIndicator";
import { escapeHtml } from "@/lib/escapeHtml";

interface ChatLandingProps {
  exiting?: boolean;
  onExitComplete?: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const terminalPrompts = [
  { label: "./whoami", query: "Who are you and what are your key skills?" },
  { label: "ls projects/", query: "Tell me about your AI projects" },
  { label: "cat experience.md", query: "What is your work experience?" },
  { label: "grep publications", query: "What publications do you have?" },
];

export function ChatLanding({ exiting = false, onExitComplete }: ChatLandingProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const exitCountRef = useRef(0);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!loading) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
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
    } catch (err) {
      const hint =
        err instanceof Error
          ? err.message
          : "Unable to reach the chat API. Try again.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `<p><strong>Could not get a reply.</strong></p><p>${escapeHtml(hint)}</p>`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const hasMessages = messages.length > 0;

  // When exiting, fire onExitComplete after all ScrambleText instances finish
  // Chips only render when !hasMessages, so total is 4+2=6 or 2
  const exitTotal = hasMessages ? 2 : 6;
  function handleExitComplete() {
    exitCountRef.current += 1;
    if (exitCountRef.current >= exitTotal) {
      exitCountRef.current = 0;
      onExitComplete?.();
    }
  }

  // Reset counter whenever exiting flips on
  useEffect(() => {
    if (exiting) exitCountRef.current = 0;
  }, [exiting]);

  return (
    <div className="relative">
      {/* Chat messages canvas — only shown after first message */}
      {hasMessages && (
        <div className="max-w-3xl mx-auto px-6 pb-48">
          <div className="space-y-16 pt-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{
                  opacity: exiting ? 0 : 1,
                  y: exiting ? -10 : 0,
                  filter: exiting ? "blur(5px)" : "blur(0px)"
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col"
              >
                {msg.role === "user" ? (
                  <div className="group relative">
                    <div className="absolute -left-6 top-1.5 text-(--border) opacity-0 group-hover:opacity-100 transition-opacity">
                      <CornerDownLeft className="w-4 h-4" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-(--foreground) tracking-tight leading-snug">
                      {msg.content}
                    </h2>
                  </div>
                ) : (
                  <div className="mt-6">
                    <div
                      className="prose prose-lg dark:prose-invert max-w-none text-(--muted-foreground) leading-relaxed font-light
                        [&_p]:mb-6 [&_p:last-child]:mb-0
                        [&_ul]:ml-4 [&_ul]:list-disc [&_li]:mb-2
                        [&_strong]:text-(--foreground) [&_strong]:font-medium
                        [&_a]:text-(--foreground) [&_a]:underline [&_a]:underline-offset-4
                        [&_a]:decoration-(--border) [&_a:hover]:decoration-(--foreground) [&_a]:transition-colors"
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                  </div>
                )}
              </motion.div>
            ))}

            <AnimatePresence mode="wait">
              {loading && (
                <ChatGeneratingIndicator key="generating" variant="landing" />
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>
        </div>
      )}

      {/* Fixed bottom input bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 bg-linear-to-t from-(--background) via-(--background)/90 to-transparent pt-12 pointer-events-none"
        style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-3xl mx-auto px-6 pointer-events-auto">

          {/* Quick prompt chips — only before first message */}
          <AnimatePresence>
            {!hasMessages && (
              <motion.div
                key="prompts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {terminalPrompts.map((prompt, i) => (
                  <motion.button
                    key={prompt.label}
                    onClick={() => handleSend(prompt.query)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: exiting ? 0 : 0.05 + i * 0.07, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="text-xs font-mono px-3 py-1.5 rounded-md
                      border border-(--border)/50 bg-(--muted)/30
                      hover:border-(--foreground)/30 hover:text-(--foreground)
                      text-(--muted-foreground) transition-all duration-300"
                  >
                    <ScrambleText
                      text={prompt.label}
                      animateOnMount
                      delay={100 + i * 80}
                      speed={25}
                      exiting={exiting}
                      onExitComplete={handleExitComplete}
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input line */}
          <motion.form
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center"
          >
            <div className="absolute left-0 text-(--muted-foreground) font-mono text-lg select-none">
              <ScrambleText
                text=">"
                animateOnMount
                delay={300}
                speed={40}
                exiting={exiting}
                onExitComplete={handleExitComplete}
              />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder=""
              disabled={loading}
              className="w-full pl-6 pr-14 py-4 text-lg bg-transparent border-b-2 border-(--border)
                focus:border-(--foreground) focus:outline-none rounded-none
                transition-colors text-(--foreground)"
            />
            {/* Animated placeholder — only when input is empty */}
            {!input && (
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg text-(--muted-foreground)/40 pointer-events-none select-none">
                <ScrambleText
                  text="Ask anything..."
                  animateOnMount
                  delay={400}
                  speed={20}
                  exiting={exiting}
                  onExitComplete={handleExitComplete}
                />
              </span>
            )}
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-0 p-2 text-(--muted-foreground) hover:text-(--foreground)
                disabled:opacity-30 transition-colors duration-200"
              aria-label="Send message"
            >
              {loading ? (
                <motion.span
                  className="inline-flex p-2 font-mono text-sm text-(--muted-foreground)"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  aria-label="Sending"
                >
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 1.15,
                      repeat: Infinity,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    ···
                  </motion.span>
                </motion.span>
              ) : (
                <CornerDownLeft className="w-5 h-5" />
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
