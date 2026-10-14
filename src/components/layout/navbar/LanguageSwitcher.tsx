"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import BottomSheet from "./BottomSheet";

/**
 * Labels des langues — statiques, pas besoin d'API.
 */
const LOCALE_LABELS: Record<string, string> = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
  zh: "中文",
  es: "Español",
};

export default function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSelect = (code: string) => {
    router.replace(pathname, { locale: code as any });
    setOpen(false);
    setSheetOpen(false);
  };

  return (
    <>
      {/* MOBILE : icône seule */}
      <button
        onClick={() => setSheetOpen(true)}
        aria-label={t("language")}
        className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
      >
        <Globe className="h-5 w-5" />
      </button>

      {/* DESKTOP : dropdown */}
      <div className="relative hidden lg:block">
        <button
          onClick={() => setOpen((v) => !v)}
          onBlur={(e) => {
            if (
              !e.currentTarget.parentElement?.contains(e.relatedTarget as Node)
            ) {
              setOpen(false);
            }
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-all"
          aria-label={t("language")}
          aria-expanded={open}
        >
          <Globe className="h-4 w-4" />
          <span className="uppercase">{locale}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 rounded-xl bg-dropdown-bg border border-dropdown-border p-1.5 z-50"
              style={{ boxShadow: "var(--dropdown-shadow)" }}
            >
              {routing.locales.map((code) => (
                <button
                  key={code}
                  onClick={() => handleSelect(code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    locale === code
                      ? "bg-primary-soft text-primary font-semibold"
                      : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                  }`}
                >
                  {LOCALE_LABELS[code]}
                  {locale === code && <Check className="h-4 w-4" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE : BottomSheet */}
      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={t("language")}
      >
        <div className="space-y-2">
          {routing.locales.map((code) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                locale === code
                  ? "bg-primary-soft text-primary border border-primary/30"
                  : "bg-surface text-foreground-muted hover:bg-surface-hover hover:text-foreground border border-border"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-xs uppercase font-bold opacity-60">
                  {code}
                </span>
                {LOCALE_LABELS[code]}
              </span>
              {locale === code && <Check className="h-5 w-5" />}
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}