"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Briefcase, Wallet, Clock } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

const HERO_ICONS = [
  {
    icon: Briefcase,
    accent: "from-primary to-primary-hover",
    delay: 0.4,
  },
  {
    icon: Wallet,
    accent: "from-secondary to-secondary-hover",
    delay: 0.55,
  },
  {
    icon: Clock,
    accent: "from-primary to-secondary",
    delay: 0.7,
  },
];

export default function QuoteHero() {
  const t = useTranslations("quote.hero");

  return (
    <section
      aria-labelledby="quote-hero-title"
      className="relative pt-16 pb-16 lg:pt-24 lg:pb-20 overflow-hidden border-b border-border"
    >
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div
        className="absolute inset-0 -z-10 opacity-[0.05] pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="quote-grid"
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
          <rect width="100%" height="100%" fill="url(#quote-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-6"
          >
            <motion.div variants={item} className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-primary" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-foreground-subtle">
                Open Numeric · Quote
              </span>
            </motion.div>

            <motion.h1
              id="quote-hero-title"
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.02] tracking-tight mb-6"
            >
              {t("title")}{" "}
              <span className="text-gradient">{t("titleHighlight")}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-base sm:text-lg text-foreground-muted max-w-xl leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>

          <div className="lg:col-span-6 relative">
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="h-[80%] w-[80%] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl"
              />
            </div>

            <ul
              role="list"
              className="relative grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6"
            >
              {HERO_ICONS.map((heroIcon, i) => {
                const Icon = heroIcon.icon;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: heroIcon.delay,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="relative"
                  >
                    <motion.div
                      animate={{ y: [-6, 6, -6] }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                      className="group relative rounded-3xl p-6 bg-surface border border-border shadow-xl overflow-hidden"
                    >
                      <div
                        className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${heroIcon.accent} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
                        aria-hidden="true"
                      />

                      <div className="relative flex flex-col items-center text-center gap-4">
                        <div className="relative" aria-hidden="true">
                          <motion.div
                            animate={{
                              scale: [1, 1.4, 1],
                              opacity: [0.3, 0.05, 0.3],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.4,
                            }}
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${heroIcon.accent} blur-xl`}
                          />

                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 25 + i * 5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute -inset-3 rounded-full border-2 border-dashed border-primary/30"
                          >
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
                          </motion.div>

                          <motion.div
                            animate={{ rotate: [-4, 4, -4] }}
                            transition={{
                              duration: 5 + i * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className={`relative inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${heroIcon.accent} text-white shadow-2xl`}
                            style={{
                              boxShadow:
                                "0 10px 40px -10px rgba(0,0,0,0.3), 0 0 40px var(--primary-glow)",
                            }}
                          >
                            <Icon className="h-9 w-9" />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-white/25 via-transparent to-transparent" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}