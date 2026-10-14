"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { AlignLeft } from "lucide-react";
import type { Project } from "@/types";

interface DetailContentProps {
  project: Project;
}

export default function DetailContent({ project }: DetailContentProps) {
  const t = useTranslations("projectDetail");
  const locale = useLocale();

  const tr = project.translations.find((x) => x.locale === locale);
  const fallback = project.translations[0];
  const longDescription =
    tr?.longDescription ??
    tr?.description ??
    fallback?.longDescription ??
    fallback?.description ??
    "";

  if (!longDescription) return null;

  return (
    <section
      aria-labelledby="project-detail-overview-title"
      className="relative py-12 lg:py-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md"
              aria-hidden="true"
            >
              <AlignLeft className="h-5 w-5" />
            </span>
            <h2
              id="project-detail-overview-title"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            >
              {t("sections.overview")}
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed whitespace-pre-line">
              {longDescription}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}