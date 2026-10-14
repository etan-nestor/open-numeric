"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Sparkles } from "lucide-react";
import Icon from "@/components/ui/Icon";
import type { Project } from "@/types";

interface DetailFeaturesProps {
  project: Project;
}

export default function DetailFeatures({ project }: DetailFeaturesProps) {
  const t = useTranslations("projectDetail");
  const locale = useLocale();

  if (!project.features || project.features.length === 0) return null;

  return (
    <section
      aria-labelledby="project-detail-features-title"
      className="relative py-12 lg:py-16 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md"
              aria-hidden="true"
            >
              <Sparkles className="h-5 w-5" />
            </span>
            <h2
              id="project-detail-features-title"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              {t("sections.features")}
            </h2>
          </div>
        </motion.div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {project.features.map((feature, i) => {
            const tr = feature.translations.find((x) => x.locale === locale);
            const fallback = feature.translations[0];
            const title = tr?.title ?? fallback?.title ?? feature.key;
            const description = tr?.description ?? fallback?.description ?? "";

            return (
              <motion.li
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="group relative h-full rounded-2xl p-6 bg-surface border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl">
                  <div
                    className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-md mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      aria-hidden="true"
                    >
                      <Icon name={feature.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2 transition-colors group-hover:text-primary">
                      {title}
                    </h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}