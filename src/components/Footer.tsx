"use client";

import { Github, Linkedin, Mail, BookOpen } from "lucide-react";
import { personal } from "@/data/personal";

const socialLinks = [
  { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
  { icon: Linkedin, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: Github, href: personal.social.github, label: "GitHub" },
  {
    icon: BookOpen,
    href: personal.social.googleScholar,
    label: "Google Scholar",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm text-[var(--muted-foreground)]">
            Bringing data to life, one project at a time.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--muted-foreground)]
                  hover:text-[var(--foreground)] hover:bg-[var(--muted)]
                  transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            &copy; {new Date().getFullYear()} Gaurav Shetty. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
