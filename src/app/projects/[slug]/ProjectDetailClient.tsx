"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { type Project } from "@/data/projects";
import Link from "next/link";
import { basePath } from "@/lib/utils";

export function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)]
            hover:text-[var(--foreground)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.keywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 text-xs font-medium rounded-full
                  bg-[var(--accent)]/10 text-[var(--accent)]"
              >
                {kw}
              </span>
            ))}
          </div>

          <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-8">
            {project.description}
          </p>
        </motion.div>

        {project.images.overview && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            src={basePath(project.images.overview)}
            alt={`${project.title} overview`}
            className="w-full rounded-2xl mb-10"
          />
        )}

        <div className="space-y-10">
          <Section title="Objective">
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              {project.sections.objective}
            </p>
          </Section>

          {project.sections.keyFocus && (
            <div
              className="p-5 rounded-xl bg-[var(--accent)]/5 border-l-4
                border-[var(--accent)]"
            >
              <strong className="text-[var(--accent)]">Key Focus:</strong>{" "}
              <span className="text-[var(--muted-foreground)]">
                {project.sections.keyFocus}
              </span>
            </div>
          )}

          <Section title="Methodology">
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              {project.sections.methodology}
            </p>
          </Section>

          {project.images.methodology && (
            <img
              src={basePath(project.images.methodology)}
              alt="Methodology"
              className="w-full rounded-2xl"
            />
          )}

          <Section title="Tools & Technologies">
            <div className="flex flex-wrap gap-2">
              {project.sections.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 text-sm font-medium rounded-xl
                    bg-[var(--muted)] text-[var(--muted-foreground)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </Section>

          {project.images.extra?.map((img, i) => (
            <div key={i}>
              <img
                src={basePath(img.src)}
                alt={img.alt}
                className="w-full rounded-2xl"
              />
              {img.caption && (
                <p className="text-sm text-[var(--muted-foreground)] mt-2 text-center">
                  {img.caption}
                </p>
              )}
            </div>
          ))}

          <Section title="Outcome">
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              {project.sections.outcome}
            </p>
          </Section>

          {project.images.outcome && (
            <img
              src={basePath(project.images.outcome)}
              alt="Outcome"
              className="w-full rounded-2xl"
            />
          )}

          {project.sections.learnMore &&
            project.sections.learnMore.length > 0 && (
              <div
                className="p-5 rounded-xl bg-[var(--muted)] border border-[var(--border)]"
              >
                <strong className="block mb-2">Learn More:</strong>
                <ul className="list-disc list-inside space-y-1">
                  {project.sections.learnMore.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] hover:underline"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  font-medium bg-gradient-to-r from-[var(--gradient-start)]
                  to-[var(--gradient-end)] text-white hover:opacity-90
                  transition-opacity"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                  font-medium border border-[var(--border)]
                  hover:bg-[var(--muted)] transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h2
        className="text-2xl font-semibold mb-4 bg-gradient-to-r
          from-[var(--foreground)] to-[var(--muted-foreground)]
          bg-clip-text text-transparent"
      >
        {title}
      </h2>
      {children}
    </motion.div>
  );
}
