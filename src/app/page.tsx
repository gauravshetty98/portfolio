"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMode } from "@/components/ModeProvider";
import { ChatLanding } from "@/components/ChatLanding";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Publications } from "@/components/Publications";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { mode } = useMode();

  // Scroll to top whenever mode changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [mode]);

  return (
    <AnimatePresence mode="wait">
      {mode === "chat" ? (
        <motion.div
          key="chat"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChatLanding />
        </motion.div>
      ) : (
        <motion.div
          key="classic"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Hero />
          <About />
          <ExperienceTimeline />
          <ProjectGrid />
          <Publications />
          <Skills />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
