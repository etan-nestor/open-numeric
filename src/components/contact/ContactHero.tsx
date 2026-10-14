"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function ContactHero() {
  const t = useTranslations("contact.hero");

  return (
    <section
      aria-labelledby="contact-hero-title"
      className="relative pt-20 pb-20 lg:pt-28 lg:pb-24 overflow-hidden border-b border-border"
    >
      {/* Décors */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      {/* Grille blueprint */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="contact-grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Icône animée */}
          <motion.div variants={item} className="inline-flex mb-8">
            <div className="relative" aria-hidden="true">
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-3xl bg-primary/40 blur-2xl"
              />
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.05, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="absolute inset-0 rounded-3xl bg-secondary/40 blur-3xl"
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 rounded-full border-2 border-dashed border-primary/30"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-primary/20"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-secondary" />
              </motion.div>

              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative inline-flex h-24 w-24 lg:h-28 lg:w-28 items-center justify-center rounded-3xl bg-gradient-primary text-primary-foreground shadow-2xl glow-primary"
              >
                <MessageCircle className="h-12 w-12 lg:h-14 lg:w-14" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-white/25 via-transparent to-transparent" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={item} className="mb-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-foreground-subtle">
              {t("label")}
            </span>
          </motion.div>

          <motion.h1
            id="contact-hero-title"
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