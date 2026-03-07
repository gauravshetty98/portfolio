"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { experiences, type ExperienceProject } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";
import { basePath } from "@/lib/utils";

function ProjectAccordion({ project }: { project: ExperienceProject }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border)] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-left
          hover:text-[var(--accent)] transition-colors"
      >
        <span className="text-sm font-medium pr-4">{project.title}</span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-3">
              {project.image && (
                <img
                  src={basePath(project.image)}
                  alt={project.title}
                  className="w-full object-contain rounded-lg"
                />
              )}
              {[
                ["Objective", project.objective],
                ["Business Impact", project.businessImpact],
                ["Methodology", project.methodology],
                ["Tools", project.tools],
                ["Challenges", project.challenges],
                ["Results", project.results],
              ]
                .filter(([, val]) => val)
                .map(([label, text]) => (
                  <p key={label} className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    <strong className="text-[var(--foreground)]">{label}:</strong>{" "}
                    {text}
                  </p>
                ))}
              {project.link && (
                <a
                  href={project.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-[var(--accent)]
                    hover:underline"
                >
                  {project.link.text}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="In the world of data, I've been the architect, the analyst, and the problem solver."
        />

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-[19px] top-0 bottom-0 w-0.5
              bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]
              hidden md:block"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative md:pl-14"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 top-6 w-4 h-4 rounded-full
                    bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]
                    border-4 border-[var(--background)] hidden md:block"
                />

                <div
                  className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]
                    hover:border-[var(--accent)]/30 transition-colors"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={basePath(exp.logo)}
                      alt={exp.company}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{exp.company}</h3>
                      <p className="text-[var(--accent)] font-medium text-sm">
                        {exp.role}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {exp.period}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {exp.projects.length > 0 && (
                    <div className="border-t border-[var(--border)] pt-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                        Key Projects
                      </p>
                      {exp.projects.map((project, j) => (
                        <ProjectAccordion key={j} project={project} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
