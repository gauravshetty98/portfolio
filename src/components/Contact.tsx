"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, BookOpen, MessageSquare } from "lucide-react";
import { personal } from "@/data/personal";
import { SectionHeading } from "./SectionHeading";
import { useMode } from "./ModeProvider";

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
  const { setMode } = useMode();

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Let's Connect."
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
              className="flex items-center gap-4 p-5 rounded-3xl bg-(--muted)/20
                border border-(--border)/50 hover:border-(--border)
                transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-(--muted) flex items-center justify-center group-hover:bg-(--foreground) group-hover:text-(--background) transition-colors text-(--foreground)">
                <link.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide text-(--foreground)">{link.label}</p>
                <p className="text-sm text-(--muted-foreground) font-light">
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
          className="mt-12 p-8 rounded-3xl bg-(--foreground) text-(--background) max-w-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-(--background)/10 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2 tracking-tight">
                Want to know more?
              </h3>
              <p className="text-sm text-(--background)/80 mb-4 font-light leading-relaxed">
                Switch to conversation mode and ask questions about my projects,
                skills, and experience and get answers instantly.
              </p>
              <button
                onClick={() => setMode("chat")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold
                  bg-(--background) text-(--foreground) hover:opacity-90 transition-opacity"
              >
                <MessageSquare className="w-4 h-4" />
                Switch to Conversation Mode
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
