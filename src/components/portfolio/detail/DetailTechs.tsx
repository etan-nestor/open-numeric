"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Cpu } from "lucide-react";
import type { Project } from "@/types";

interface DetailTechsProps {
  project: Project;
}

export default function DetailTechs({ project }: DetailTechsProps) {
  const t = useTranslations("projectDetail");

  if (project.tech.length === 0) return null;

  return (
    <section
      aria-labelledby="project-detail-techs-title"
      className="relative py-12 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md"
              aria-hidden="true"
            >
              <Cpu className="h-5 w-5" />
            </span>
            <h2
              id="project-detail-techs-title"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              {t("sections.tech")}
            </h2>
          </div>
        </motion.div>

        <motion.ul
          role="list"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
          className="flex flex-wrap gap-2.5"
        >
          {project.tech.map((tech) => (
            <motion.li
              key={tech}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
              }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-xl bg-surface border border-border text-sm font-semibold text-foreground-muted hover:border-primary/40 hover:text-primary hover:-translate-y-0.5 transition-all duration-300">
                {tech}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}