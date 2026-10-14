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

export default function PortfolioHero() {
  const t = useTranslations("portfolio.hero");

  return (
    <section
      aria-labelledby="portfolio-hero-title"
      className="relative pt-20 pb-20 lg:pt-28 lg:pb-24 overflow-hidden border-b border-border"
    >
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full opacity-25"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="portfolio-grid"
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
          <rect width="100%" height="100%" fill="url(#portfolio-grid)" />
        </svg>

        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="portfolio-grid-large"
              width="240"
              height="240"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 240 0 L 0 0 0 240"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#portfolio-grid-large)" />
        </svg>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_95%)]" />
      </div>

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.h1
            id="portfolio-hero-title"
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            {t("title")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base sm:text-lg text-foreground-muted max-w-2xl leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}