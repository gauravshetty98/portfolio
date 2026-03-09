"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMode } from "@/components/ModeProvider";
import { SharedHero } from "@/components/SharedHero";
import { ChatLanding } from "@/components/ChatLanding";
import { About } from "@/components/About";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Publications } from "@/components/Publications";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

type ContentState = "chat" | "classic" | "chat-exiting" | "classic-exiting";

export default function Home() {
  const { mode } = useMode();
  const [contentState, setContentState] = useState<ContentState>(mode);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on initial mount — contentState is already initialised to mode
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (mode === "chat" && window.scrollY > window.innerHeight) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Trigger scramble-out on the current content before switching
    setContentState((prev) => {
      if (prev === "chat") return "chat-exiting";
      if (prev === "classic") return "classic-exiting";
      // Already exiting — ignore (will be resolved by onExitComplete)
      return prev;
    });
  }, [mode]);

  function handleChatExitComplete() {
    setContentState("classic");
  }

  function handleClassicExitComplete() {
    setContentState("chat");
  }

  const showChat = contentState === "chat" || contentState === "chat-exiting";
  const showClassic = contentState === "classic" || contentState === "classic-exiting";

  return (
    <>
      {/* Hero is always visible — never unmounts on mode switch */}
      <SharedHero />

      {showChat && (
        <motion.div
          key="chat-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        >
          <ChatLanding
            exiting={contentState === "chat-exiting"}
            onExitComplete={handleChatExitComplete}
          />
        </motion.div>
      )}

      {showClassic && (
        <motion.div
          key="classic-content"
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: contentState === "classic-exiting" ? 0 : 1,
            y: contentState === "classic-exiting" ? -12 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          onAnimationComplete={() => {
            if (contentState === "classic-exiting") handleClassicExitComplete();
          }}
        >
          <About />
          <ExperienceTimeline />
          <ProjectGrid />
          <Publications />
          <Skills />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  );
}
