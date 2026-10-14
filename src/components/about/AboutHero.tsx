"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative pt-20 pb-20 lg:pt-28 lg:pb-24 overflow-hidden border-b border-border"
    >
      {/* Halos thémés */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div className="absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
      </div>

      {/* Grille blueprint */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg
          className="w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="about-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_95%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-foreground-subtle">
              {t("label")}
            </span>
          </motion.div>

          <motion.h1
            id="about-hero-title"
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            {t("title")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}