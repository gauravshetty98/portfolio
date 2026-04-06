"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { sendChatMessage } from "@/lib/chatApi";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "What are Gaurav's key skills?",
  "Tell me about his AI projects",
  "What's his work experience?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* FAB Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
              bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]
              text-white shadow-lg shadow-blue-500/30 hover:shadow-xl
              hover:shadow-blue-500/40 transition-shadow flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]
              h-[520px] max-h-[calc(100vh-6rem)] rounded-2xl overflow-hidden
              bg-[var(--card)] border border-[var(--border)] shadow-2xl
              flex flex-col"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3
                bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]
                text-white"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <div>
                  <p className="font-semibold text-sm">GauravGPT</p>
                  <p className="text-xs text-white/70">AI Portfolio Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-[var(--muted-foreground)] mb-4">
                    Ask me anything about Gaurav&apos;s work!
                  </p>
                  <div className="space-y-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSend(prompt)}
                        className="block w-full text-left px-3 py-2 text-sm rounded-lg
                          bg-[var(--muted)] hover:bg-[var(--border)] transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white rounded-br-md"
                        : "bg-[var(--muted)] rounded-bl-md"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none
                          [&_p]:mb-2 [&_ul]:ml-4 [&_ul]:list-disc [&_li]:mb-1
                          [&_a]:text-[var(--accent)] [&_a]:underline"
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
                  <div className="bg-[var(--muted)] px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[var(--muted-foreground)] animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-[var(--muted-foreground)] animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-[var(--muted-foreground)] animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[var(--border)]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something..."
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-[var(--muted)]
                    border border-[var(--border)] focus:border-[var(--accent)]
                    focus:outline-none transition-colors placeholder:text-[var(--muted-foreground)]"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[var(--gradient-start)]
                    to-[var(--gradient-end)] text-white disabled:opacity-50
                    hover:opacity-90 transition-opacity"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
