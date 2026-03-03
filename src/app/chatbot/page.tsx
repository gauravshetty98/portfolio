"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, MessageSquare, ArrowLeft } from "lucide-react";
import { sendChatMessage } from "@/lib/chatApi";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "What are Gaurav's key skills?",
  "Tell me about his AI projects",
  "What's his work experience?",
  "What publications does he have?",
  "How was the GauravGPT chatbot built?",
  "What did he do at Philadelphia Gas Works?",
];

export default function ChatbotPage() {
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
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)]
              hover:text-[var(--foreground)] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-r
                from-[var(--gradient-start)] to-[var(--gradient-end)]
                flex items-center justify-center"
            >
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">GauravGPT</h1>
              <p className="text-sm text-[var(--muted-foreground)]">
                AI-Powered Portfolio Assistant — ask me anything about Gaurav&apos;s work
              </p>
            </div>
          </motion.div>
        </div>

        {/* Chat area */}
        <div
          className="rounded-2xl border border-[var(--border)] bg-[var(--card)]
            overflow-hidden flex flex-col"
          style={{ minHeight: "calc(100vh - 280px)" }}
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-r
                    from-[var(--gradient-start)] to-[var(--gradient-end)]
                    flex items-center justify-center mx-auto mb-4"
                >
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Welcome to GauravGPT
                </h2>
                <p className="text-sm text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
                  I&apos;m an AI assistant trained on Gaurav&apos;s portfolio. Ask me
                  about his projects, skills, experience, or anything else!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="text-left px-4 py-3 text-sm rounded-xl
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
                  className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
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
                <div className="bg-[var(--muted)] px-5 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex items-center gap-1.5">
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
          <div className="p-4 border-t border-[var(--border)]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something about Gaurav..."
                disabled={loading}
                className="flex-1 px-5 py-3 text-sm rounded-xl bg-[var(--muted)]
                  border border-[var(--border)] focus:border-[var(--accent)]
                  focus:outline-none transition-colors
                  placeholder:text-[var(--muted-foreground)]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-3 rounded-xl bg-gradient-to-r from-[var(--gradient-start)]
                  to-[var(--gradient-end)] text-white disabled:opacity-50
                  hover:opacity-90 transition-opacity"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
