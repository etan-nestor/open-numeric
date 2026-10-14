"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { SiteSettings } from "@/types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HERO_IMAGE = "/images/hero.jpg";

interface HeroProps {
  settings: SiteSettings | null;
}

export default function Hero({ settings }: HeroProps) {
  const t = useTranslations("hero");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary-soft blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-secondary-soft blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.h1
              id="hero-title"
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
            >
              {t("title")}{" "}
              <span className="text-gradient">{t("titleHighlight")}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-base sm:text-lg lg:text-xl text-foreground-muted max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-primary-foreground bg-gradient-primary shadow-lg glow-primary hover:shadow-xl transition-all"
              >
                {t("ctaPrimary")}
                <ArrowRight
                  className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-border-strong text-foreground hover:bg-surface-hover hover:border-primary transition-all"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t("ctaSecondary")}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div
              className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl">
              <Image
                src={HERO_IMAGE}
                alt={
                  settings?.siteName
                    ? `${settings.siteName} — agence digitale à Ouagadougou, Burkina Faso`
                    : "Open Numeric — agence digitale à Ouagadougou, Burkina Faso"
                }
                width={800}
                height={600}
                priority
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10"
                aria-hidden="true"
              />
            </div>

            {settings?.availability && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full bg-success animate-pulse-glow"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold text-foreground">
                    {t("available")} · {settings.availability}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}