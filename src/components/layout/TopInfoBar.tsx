"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SiteSettings } from "@/types";

const STORAGE_KEY = "open-numeric-topbar-dismissed";

interface TopInfoBarProps {
  settings: SiteSettings;
}

export default function TopInfoBar({ settings }: TopInfoBarProps) {
  const t = useTranslations("topBar");
  // null = "pas encore su" (SSR), true = visible, false = caché
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    setVisible(!dismissed);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  /* Tant qu'on ne sait pas (côté SSR), on ne rend rien.
     Ça évite le "flash" de la barre avant hydratation. */
  if (visible === null) return null;

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="relative overflow-hidden bg-gradient-primary text-primary-foreground"
        >
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute -top-8 left-1/4 h-24 w-24 rounded-full bg-white/40 blur-3xl" />
            <div className="absolute -bottom-8 right-1/4 h-24 w-24 rounded-full bg-white/30 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 py-2.5 text-xs sm:text-sm">
              <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
                <span className="hidden sm:inline-flex items-center gap-1.5 font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t("promo")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  <a href={`tel:${settings.phone}`} className="hover:underline">
                    {settings.phone}
                  </a>
                </span>
                <span className="hidden md:inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:underline"
                  >
                    {settings.email}
                  </a>
                </span>
              </div>

              <button
                onClick={dismiss}
                aria-label="Fermer"
                className="flex-shrink-0 p-1.5 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}