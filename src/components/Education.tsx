"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import { SectionHeading } from "./SectionHeading";
import { basePath } from "@/lib/utils";

export function Education() {
  return (
    <section id="education" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading 
          title="Education & Certifications." 
          subtitle="My academic background and technical certifications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Education List */}
          <div className="space-y-8">
            <h3 className="text-sm font-mono uppercase tracking-widest text-(--muted-foreground) mb-6">
              Degrees
            </h3>
            {Array.isArray(personal.education) && personal.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 items-start group"
              >
                {edu.logo ? (
                  <div className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-(--border)/50 flex items-center justify-center ${edu.institution === 'Rutgers University' ? 'bg-(--background)' : 'bg-white p-2'}`}>
                    <img
                      src={basePath(edu.logo)}
                      alt={edu.institution}
                      className={`w-full h-full transition-all duration-500 ${edu.institution === 'Rutgers University' ? 'object-cover scale-[1.15]' : 'object-contain'}`}
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 shrink-0 border border-(--border)/50 p-2 bg-(--muted)/20 rounded-none flex items-center justify-center">
                    <span className="font-mono text-xs text-(--muted-foreground)">{edu.institution.substring(0, 2).toUpperCase()}</span>
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-bold text-(--foreground) tracking-tight group-hover:text-(--foreground) transition-colors">
                    {edu.institution}
                  </h4>
                  <p className="text-sm text-(--foreground) font-medium mt-1">
                    {edu.degree}
                  </p>
                  <p className="text-sm font-mono text-(--muted-foreground) mt-1">
                    {edu.location} • {edu.graduationDate}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications List */}
          <div className="space-y-8">
            <h3 className="text-sm font-mono uppercase tracking-widest text-(--muted-foreground) mb-6">
              Certifications
            </h3>
            {personal.certifications && personal.certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 items-start group"
              >
                {cert.logo ? (
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-(--border)/50 bg-white p-2 flex items-center justify-center">
                    <img
                      src={basePath(cert.logo)}
                      alt={cert.name}
                      className="w-full h-full object-contain transition-all duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 shrink-0 border border-(--border)/50 bg-(--muted)/20 rounded-xl flex items-center justify-center">
                    <span className="font-mono text-xs text-(--muted-foreground)">CERT</span>
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-bold text-(--foreground) tracking-tight group-hover:text-(--foreground) transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-(--muted-foreground) font-medium mt-1">
                    {cert.issuer}
                  </p>
                  {cert.date && (
                    <p className="text-sm font-mono text-(--muted-foreground) mt-1">
                      {cert.date}
                    </p>
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
