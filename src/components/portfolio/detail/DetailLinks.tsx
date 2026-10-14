"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ExternalLink,
  Github,
  Package,
  BookOpen,
  Globe,
  ShoppingBag,
  FileText,
  Play,
  Link2,
} from "lucide-react";
import type { Project, ProjectLinkType } from "@/types";

interface DetailLinksProps {
  project: Project;
}

const LINK_ICONS: Record<
  ProjectLinkType,
  React.ComponentType<{ className?: string }>
> = {
  DEMO: Play,
  GITHUB: Github,
  NPM: Package,
  DOC: BookOpen,
  SITE: Globe,
  STORE: ShoppingBag,
  ARTICLE: FileText,
};

export default function DetailLinks({ project }: DetailLinksProps) {
  const t = useTranslations("projectDetail");

  if (!project.links || project.links.length === 0) return null;

  return (
    <section
      aria-labelledby="project-detail-links-title"
      className="relative py-12 lg:py-16 bg-background-alt"
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
              <Link2 className="h-5 w-5" />
            </span>
            <h2
              id="project-detail-links-title"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              {t("sections.links")}
            </h2>
          </div>
        </motion.div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {project.links.map((link, i) => {
            const Icon = LINK_ICONS[link.type] ?? ExternalLink;
            const isPrimary = link.type === "DEMO" || link.type === "GITHUB";

            return (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t(`links.${link.type}`)} — ${link.url}`}
                  className={`group inline-flex w-full items-center gap-3 px-5 py-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                    isPrimary
                      ? "bg-gradient-primary text-primary-foreground border-transparent hover:shadow-primary/30"
                      : "bg-surface border-border text-foreground hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                      isPrimary ? "bg-white/20" : "bg-surface-hover text-primary"
                    }`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 text-sm font-semibold">
                    {t(`links.${link.type}`)}
                  </span>
                  <ExternalLink
                    className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isPrimary ? "opacity-80" : "text-foreground-subtle"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}