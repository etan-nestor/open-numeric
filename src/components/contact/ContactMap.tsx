"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { SiteSettings } from "@/types";

interface ContactMapProps {
  settings: SiteSettings;
}

export default function ContactMap({ settings }: ContactMapProps) {
  const t = useTranslations("contact.map");

  if (!settings.mapEmbedUrl) return null;

  return (
    <section
      aria-labelledby="contact-map-title"
      className="relative py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <h2
            id="contact-map-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
          >
            {t("title")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden border border-border shadow-xl"
        >
          <div className="aspect-[16/9] w-full">
            <iframe
              src={settings.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localisation d'Open Numeric — ${settings.address}`}
              className="w-full h-full grayscale-[30%] contrast-[1.05] hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}