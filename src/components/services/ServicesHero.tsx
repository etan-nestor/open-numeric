"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import type { SiteSettings } from "@/types";

const HERO_IMAGE = "/images/services-hero.jpg";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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

interface ServicesHeroProps {
  settings: SiteSettings | null;
}

export default function ServicesHero({ settings }: ServicesHeroProps) {
  const t = useTranslations("servicesPage.hero");

  return (
    <section
      aria-labelledby="services-hero-title"
      className="relative pt-8 pb-16 lg:pt-12 lg:pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] lg:rounded-[48px] overflow-hidden bg-gradient-to-br from-primary-soft via-background to-secondary-soft border border-border shadow-xl">
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute top-10 left-1/4 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
            <div className="absolute top-10 right-16 h-2 w-2 rounded-full bg-primary/40" />
            <div className="absolute top-32 left-10 h-1.5 w-1.5 rounded-full bg-secondary/50" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-6 sm:p-10 lg:p-16">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <motion.h1
                id="services-hero-title"
                variants={item}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
              >
                {t("title")}{" "}
                <span className="text-gradient">{t("titleHighlight")}</span>
              </motion.h1>

              <motion.p
                variants={item}
                className="text-base sm:text-lg text-foreground-muted max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                {t("subtitle")}
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <Link
                  href="/devis"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-primary-foreground bg-gradient-primary shadow-lg glow-primary hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                >
                  {t("ctaPrimary")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-border-strong text-foreground hover:bg-surface hover:border-primary hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {t("ctaSecondary")}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
              className="relative order-1 lg:order-2"
            >
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <div className="h-[85%] w-[85%] rounded-[45%] bg-gradient-to-br from-primary/25 to-secondary/25 blur-2xl" />
              </div>

              <div className="relative aspect-square max-w-md mx-auto">
                <div className="group absolute inset-0 rounded-[40%] overflow-hidden border-4 border-surface shadow-2xl bg-gradient-to-br from-primary-soft to-secondary-soft">
                  <Image
                    src={HERO_IMAGE}
                    alt={`${settings?.siteName ?? "Open Numeric"} — Services numériques au Burkina Faso`}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {settings?.availability && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, y: -10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="absolute -top-2 -right-2 z-10"
                  >
                    <motion.div
                      animate={{ y: [-4, 4, -4] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="rounded-2xl bg-surface border border-border px-4 py-2.5 shadow-xl"
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
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}