"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

export default function Home() {
  const { mode } = useMode();

  // Only scroll to top when switching TO chat if user has scrolled way down
  useEffect(() => {
    if (mode === "chat" && window.scrollY > window.innerHeight) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [mode]);

  return (
    <>
      {/* Hero is always visible — never unmounts on mode switch */}
      <SharedHero />

      {/* Only the content below the hero transitions */}
      <AnimatePresence mode="wait">
        {mode === "chat" ? (
          <motion.div
            key="chat-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChatLanding />
          </motion.div>
        ) : (
          <motion.div
            key="classic-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
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
      </AnimatePresence>
    </>
  );
}
