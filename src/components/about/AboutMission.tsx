"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Target } from "lucide-react";

export default function AboutMission() {
  const t = useTranslations("about.mission");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section
      aria-labelledby="about-mission-title"
      className="relative py-16 lg:py-24"
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
              <Target className="h-5 w-5" />
            </span>
            <span className="text-xs uppercase tracking-widest font-bold text-foreground-subtle">
              {t("label")}
            </span>
          </div>

          <h2
            id="about-mission-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-8"
          >
            {t("title")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>

          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-base sm:text-lg text-foreground-muted leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}