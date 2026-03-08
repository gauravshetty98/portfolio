"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, BookOpen } from "lucide-react";
import { personal } from "@/data/personal";
import { basePath } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid & Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute inset-0 bg-(--background) mask-[radial-gradient(ellipse_at_center,transparent_20%,black_80%)]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-20 z-10 w-full">
        <div className="flex flex-col items-start gap-6 mt-12 mb-16">
          
          {/* Profile image & Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden ring-1 ring-(--border)">
              <img
                src={basePath(personal.profileImage)}
                alt={personal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-(--muted-foreground) tracking-tight">
              Hey, I&apos;m Gaurav 👋
            </h1>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-(--foreground) leading-none"
          >
            AI Engineer.
          </motion.h2>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg sm:text-xl text-(--muted-foreground) max-w-2xl leading-relaxed font-light mt-2"
          >
            {personal.bio}
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center gap-4 mt-4"
          >
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--muted-foreground) hover:text-(--foreground) transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--muted-foreground) hover:text-(--foreground) transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={personal.social.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--muted-foreground) hover:text-(--foreground) transition-colors"
            >
              <BookOpen className="w-6 h-6" />
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16"
          >
            <a href="#about" className="flex flex-col items-start gap-3 text-(--muted-foreground) hover:text-(--foreground) transition-colors">
              <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
