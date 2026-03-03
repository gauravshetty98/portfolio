"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, BookOpen, MessageSquare } from "lucide-react";
import { personal } from "@/data/personal";
import { SectionHeading } from "./SectionHeading";
import Link from "next/link";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${personal.email}`,
    display: personal.email,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: personal.social.linkedin,
    display: "linkedin.com/in/gaurav-shetty",
  },
  {
    icon: Github,
    label: "GitHub",
    href: personal.social.github,
    display: "github.com/gauravshetty98",
  },
  {
    icon: BookOpen,
    label: "Google Scholar",
    href: personal.social.googleScholar,
    display: "Google Scholar Profile",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Let's Connect"
          subtitle="I hope you enjoyed exploring my work! If you'd like to discuss any of these projects, collaborate, or just have a chat, feel free to reach out."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--card)]
                border border-[var(--border)] hover:border-[var(--accent)]/30
                transition-all duration-300 group"
            >
              <div
                className="w-10 h-10 rounded-xl bg-[var(--accent)]/10
                  flex items-center justify-center group-hover:bg-[var(--accent)]/20
                  transition-colors"
              >
                <link.icon className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-sm font-medium">{link.label}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {link.display}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-10 p-6 rounded-2xl bg-gradient-to-r
            from-[var(--gradient-start)]/10 to-[var(--gradient-end)]/10
            border border-[var(--accent)]/20 max-w-2xl"
        >
          <div className="flex items-start gap-4">
            <MessageSquare className="w-8 h-8 text-[var(--accent)] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">
                Prefer chatting with AI?
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-3">
                Try GauravGPT — my AI-powered portfolio assistant that can answer
                your questions about my projects, skills, and experience instantly.
              </p>
              <Link
                href="/chatbot"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                  bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]
                  text-white hover:opacity-90 transition-opacity"
              >
                <MessageSquare className="w-4 h-4" />
                Chat with GauravGPT
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
