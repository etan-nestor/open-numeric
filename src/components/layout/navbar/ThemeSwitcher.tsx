"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, ChevronDown, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme, type Theme } from "@/context/ThemeContext";
import BottomSheet from "./BottomSheet";

/**
 * Options de thèmes — statiques, définies dans ThemeContext.
 * ⚠️ À synchroniser avec `THEMES` dans `ThemeContext.tsx`.
 */
const THEME_OPTIONS = [
  { value: "light", label: "Crème", mode: "light", preview: "linear-gradient(135deg, #fdf9f3 0%, #e85d2f 100%)" },
  { value: "light-blue", label: "Azur", mode: "light", preview: "linear-gradient(135deg, #f5faff 0%, #2563eb 100%)" },
  { value: "light-orange", label: "Pêche", mode: "light", preview: "linear-gradient(135deg, #fff8f0 0%, #f97316 100%)" },
  { value: "dark", label: "Chocolat", mode: "dark", preview: "linear-gradient(135deg, #1a120b 0%, #f59e0b 100%)" },
  { value: "dark-blue", label: "Nuit", mode: "dark", preview: "linear-gradient(135deg, #0a1128 0%, #3b82f6 100%)" },
  { value: "dark-orange", label: "Braise", mode: "dark", preview: "linear-gradient(135deg, #15100a 0%, #f97316 100%)" },
] as const;

export default function ThemeSwitcher() {
  const t = useTranslations("nav");
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const handleSelect = (value: Theme) => {
    setTheme(value);
    setOpen(false);
    setSheetOpen(false);
  };

  return (
    <>
      {/* MOBILE : icône seule */}
      <button
        onClick={() => setSheetOpen(true)}
        aria-label={t("theme")}
        className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
      >
        <Palette className="h-5 w-5" />
      </button>

      {/* DESKTOP : dropdown */}
      <div className="relative hidden lg:block" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-all"
          aria-label={t("theme")}
          aria-expanded={open}
        >
          <Palette className="h-4 w-4" />
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
              className="absolute right-0 mt-2 w-72 rounded-2xl bg-dropdown-bg border border-dropdown-border p-3 z-50"
              style={{ boxShadow: "var(--dropdown-shadow)" }}
            >
              <p className="text-xs font-semibold uppercase text-foreground-subtle mb-2 px-1">
                {t("theme")}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {THEME_OPTIONS.map((th) => (
                  <button
                    key={th.value}
                    onClick={() => handleSelect(th.value as Theme)}
                    className={`relative flex flex-col items-start gap-2 p-2 rounded-xl border transition-all duration-200 ${
                      theme === th.value
                        ? "border-primary bg-primary-soft shadow-lg"
                        : "border-border hover:border-border-strong hover:bg-surface-hover"
                    }`}
                  >
                    <div
                      className="h-8 w-full rounded-lg shadow-inner"
                      style={{ background: th.preview }}
                    />
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-medium text-foreground">
                        {th.label}
                      </span>
                      <span className="text-[10px] uppercase text-foreground-subtle">
                        {th.mode}
                      </span>
                    </div>
                    {theme === th.value && (
                      <motion.div
                        layoutId="theme-check-desktop"
                        className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                      >
                        <Check className="h-3 w-3" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE : BottomSheet */}
      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={t("theme")}
      >
        <div className="grid grid-cols-2 gap-3">
          {THEME_OPTIONS.map((th) => (
            <button
              key={th.value}
              onClick={() => handleSelect(th.value as Theme)}
              className={`relative flex flex-col items-start gap-3 p-3 rounded-2xl border transition-all ${
                theme === th.value
                  ? "border-primary bg-primary-soft"
                  : "border-border hover:border-border-strong"
              }`}
            >
              <div
                className="h-14 w-full rounded-xl"
                style={{ background: th.preview }}
              />
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-foreground">
                    {th.label}
                  </span>
                  <span className="text-[10px] uppercase text-foreground-subtle">
                    {th.mode}
                  </span>
                </div>
                {theme === th.value && (
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}