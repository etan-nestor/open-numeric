"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Icon from "@/components/ui/Icon";
import type { Service, SiteSettings } from "@/types";

interface DetailHeroProps {
  service: Service;
  settings: SiteSettings | null;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function DetailHero({ service, settings }: DetailHeroProps) {
  const t = useTranslations("serviceDetail.common");
  const locale = useLocale();

  const tr =
    service.translations.find((x) => x.locale === locale) ??
    service.translations[0];

  const heroTitle = tr?.heroTitle ?? tr?.name ?? service.key;
  const heroTitleHighlight = tr?.heroTitleHighlight ?? "";
  const heroSubtitle = tr?.heroSubtitle ?? "";

  return (
    <section
      aria-labelledby="service-detail-hero-title"
      className="relative min-h-[85vh] lg:min-h-[90vh] w-full overflow-hidden flex items-center bg-background"
    >
      {/* DECOR DE FOND */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* GRILLE */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="service-detail-grid"
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
          <rect width="100%" height="100%" fill="url(#service-detail-grid)" />
        </svg>
      </div>

      {/* OVERLAY */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/60 to-transparent"
        aria-hidden="true"
      />

      {/* GRANDE ICONE ANIMEE A DROITE */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-8 lg:right-20 xl:right-32 hidden lg:flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${service.accent} blur-2xl`}
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.05, 0.3] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${service.accent} blur-3xl`}
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="relative h-[360px] w-[360px] xl:h-[440px] xl:w-[440px] rounded-full border-2 border-dashed border-primary/30"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-8 rounded-full border border-primary/20"
          >
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
          </motion.div>

          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`relative h-44 w-44 xl:h-56 xl:w-56 rounded-[40%] bg-gradient-to-br ${service.accent} flex items-center justify-center shadow-2xl`}
              style={{
                boxShadow:
                  "0 20px 60px -10px rgba(0,0,0,0.3), 0 0 80px var(--primary-glow)",
              }}
            >
              <Icon
                name={service.icon}
                className="h-20 w-20 xl:h-28 xl:w-28 text-white drop-shadow-2xl"
              />
              <div className="absolute inset-0 rounded-[40%] bg-gradient-to-tl from-white/30 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ rotate: 360 }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0"
              style={{ transformOrigin: "center" }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute h-3 w-3 rounded-full bg-gradient-to-br ${service.accent} shadow-lg`}
                style={{
                  top: i === 0 ? "0%" : i === 1 ? "50%" : "100%",
                  left: i === 0 ? "50%" : i === 1 ? "100%" : "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* CONTENU */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="max-w-2xl lg:max-w-3xl">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-foreground"
          >
            <motion.div variants={item} className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-primary" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-foreground-subtle">
                Open Numeric · Services
              </span>
            </motion.div>

            <motion.h1
              id="service-detail-hero-title"
              variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight mb-8"
            >
              {heroTitle}
              {heroTitleHighlight && (
                <>
                  <br />
                  <span className="text-gradient">{heroTitleHighlight}</span>
                </>
              )}
            </motion.h1>

            {heroSubtitle && (
              <motion.p
                variants={item}
                className="text-lg sm:text-xl text-foreground-muted max-w-xl leading-relaxed mb-10"
              >
                {heroSubtitle}
              </motion.p>
            )}

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-3 items-start"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-primary-foreground bg-gradient-primary shadow-lg glow-primary hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                {t("talkToExpert")}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/devis"
                className="group inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-foreground border border-border-strong hover:bg-surface-hover hover:border-primary hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t("requestQuote")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}