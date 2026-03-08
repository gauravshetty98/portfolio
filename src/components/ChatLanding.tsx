"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CornerDownLeft, Loader2, Github, Linkedin, BookOpen } from "lucide-react";
import { sendChatMessage } from "@/lib/chatApi";
import { personal } from "@/data/personal";

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
            "System error: Unable to connect to the LLM backend. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="relative min-h-screen flex flex-col bg-(--background) selection:bg-(--foreground) selection:text-(--background)">
      
      {/* Background Grid & Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 bg-(--background) [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-6 pt-32 pb-32 z-10">
        
        {/* Hero intro — collapses when chat starts */}
        <AnimatePresence>
          {!hasMessages && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-start gap-6 mt-12 mb-16"
            >
              <div className="font-mono text-xs text-(--muted-foreground) tracking-widest uppercase border border-(--border) px-3 py-1 rounded-full bg-(--muted)/30">
                System_Ready // v2.0
              </div>

              <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-(--foreground) leading-[1.1]">
                Gaurav Shetty. <br />
                <span className="text-(--muted-foreground) font-medium">AI Engineer.</span>
              </h1>
              
              <p className="text-lg text-(--muted-foreground) max-w-xl leading-relaxed font-light">
                I design and build intelligent systems, predictive models, and scalable data architectures. You can explore my work by chatting with my portfolio below.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-5 mt-4">
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

        {/* Chat Canvas (No bubbles, editorial style) */}
        {hasMessages && (
          <div className="flex-1 overflow-y-auto space-y-16 mb-8 pr-2 pt-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
                        [&_a]:text-(--foreground) [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-(--border) hover:[&_a]:decoration-(--foreground) [&_a]:transition-colors"
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                  </div>
                )}
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 text-sm font-mono text-(--muted-foreground) mt-8"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="animate-pulse">[ GENERATING_RESPONSE... ]</span>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* Fixed Bottom Input Area */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-linear-to-t from-(--background) via-(--background)/90 to-transparent pb-8 pt-12">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatePresence>
            {!hasMessages && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {terminalPrompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    onClick={() => handleSend(prompt.query)}
                    className="text-xs font-mono px-3 py-1.5 rounded-md
                      border border-(--border)/50 bg-(--muted)/30
                      hover:border-(--foreground)/30 hover:text-(--foreground)
                      text-(--muted-foreground) transition-all duration-300"
                  >
                    {prompt.label}
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
            className="relative flex items-center group"
          >
            <div className="absolute left-4 text-(--muted-foreground) font-mono text-lg">
              {">"}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={loading}
              className="w-full pl-10 pr-16 py-4 text-lg bg-transparent border-b-2 border-(--border)
                focus:border-(--foreground) focus:outline-none rounded-none
                transition-all placeholder:text-(--muted-foreground)/50 text-(--foreground)"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 p-2 text-(--muted-foreground) hover:text-(--foreground)
                disabled:opacity-30 transition-colors duration-200"
              aria-label="Send message"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <CornerDownLeft className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
