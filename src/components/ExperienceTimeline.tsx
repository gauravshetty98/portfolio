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
    <div className="border-b border-(--border)/50 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left
          hover:text-(--foreground) text-(--muted-foreground) transition-colors"
      >
        <span className="text-sm font-medium pr-4">{project.title}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
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
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 space-y-4">
              {project.image && (
                <img
                  src={basePath(project.image)}
                  alt={project.title}
                  className="w-full object-contain rounded-xl border border-(--border)/50"
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
                  <p key={label} className="text-sm text-(--muted-foreground) leading-relaxed font-light">
                    <strong className="text-(--foreground) font-medium">{label}:</strong>{" "}
                    {text}
                  </p>
                ))}
              {project.link && (
                <a
                  href={project.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-(--foreground)
                    hover:underline underline-offset-4 decoration-(--border) hover:decoration-(--foreground) transition-all"
                >
                  {project.link.text}
                  <ExternalLink className="w-3.5 h-3.5" />
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
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Experience."
          subtitle="In the world of data, I've been the architect, the analyst, and the problem solver."
        />

        <div className="relative mt-8">
          {/* Timeline line */}
          <div
            className="absolute left-[27px] top-4 bottom-0 w-px bg-(--border) hidden md:block"
          />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-5 top-6 w-4 h-4 rounded-full bg-(--background) border-2 border-(--foreground) hidden md:block"
                />

                <div className="group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-(--border)/50 bg-(--muted)/20 p-2">
                      <img
                        src={basePath(exp.logo)}
                        alt={exp.company}
                        className="w-full h-full object-contain transition-all duration-500"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl tracking-tight text-(--foreground)">{exp.company}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <p className="font-medium text-base text-(--foreground)">
                          {exp.role}
                        </p>
                        <span className="hidden sm:block text-(--muted-foreground)">•</span>
                        <p className="text-sm font-mono text-(--muted-foreground)">
                          {exp.period}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-base text-(--muted-foreground) leading-relaxed mb-8 font-light max-w-3xl">
                    {exp.description}
                  </p>

                  {exp.projects.length > 0 && (
                    <div className="border-t border-(--border)/50 pt-4 max-w-3xl">
                      <p className="text-xs font-mono uppercase tracking-widest text-(--muted-foreground) mb-4">
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
