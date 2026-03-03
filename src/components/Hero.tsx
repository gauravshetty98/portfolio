"use client";

import { motion } from "framer-motion";
import { ArrowDown, MessageSquare, Github, Linkedin, BookOpen } from "lucide-react";
import { personal } from "@/data/personal";
import Link from "next/link";
import { basePath } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-purple-600/20
            dark:from-blue-600/10 dark:via-cyan-500/5 dark:to-purple-600/10
            animate-gradient-x"
        />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full
            blur-3xl animate-float"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full
            blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Profile image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative"
          >
            <div
              className="w-28 h-28 rounded-full overflow-hidden ring-4
                ring-[var(--accent)]/30 ring-offset-4 ring-offset-[var(--background)]"
            >
              <img
                src={basePath(personal.profileImage)}
                alt={personal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full
                bg-green-500 border-4 border-[var(--background)]"
            />
          </motion.div>

          {/* Name and title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Hi, I&apos;m{" "}
              <span
                className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]
                  bg-clip-text text-transparent"
              >
                {personal.name}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl sm:text-2xl text-[var(--muted-foreground)] font-medium"
          >
            {personal.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="max-w-2xl text-[var(--muted-foreground)] text-lg leading-relaxed"
          >
            {personal.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-3 rounded-xl font-medium
                bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]
                text-white hover:opacity-90 transition-opacity shadow-lg
                shadow-blue-500/25"
            >
              View My Work
            </a>
            <Link
              href="/chatbot"
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium
                border border-[var(--border)] hover:bg-[var(--muted)]
                transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Chat with GauravGPT
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex items-center gap-4 mt-4"
          >
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[var(--muted-foreground)]
                hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[var(--muted-foreground)]
                hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personal.social.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[var(--muted-foreground)]
                hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              <BookOpen className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8"
          >
            <a href="#about" className="flex flex-col items-center gap-2 text-[var(--muted-foreground)]">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
