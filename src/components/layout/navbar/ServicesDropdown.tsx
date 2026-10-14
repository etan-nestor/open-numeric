"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import Icon from "@/components/ui/Icon";
import { SERVICE_HOVER } from "./serviceHover";
import type { Service } from "@/types";

interface ServicesDropdownProps {
  open: boolean;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  services: Service[];
}

/**
 * Renvoie le label traduit d'un Service pour la locale courante.
 */
function getServiceLabel(service: Service, locale: string): string {
  const tr = service.translations.find((t) => t.locale === locale);
  return tr?.name ?? service.translations[0]?.name ?? service.key;
}

export default function ServicesDropdown({
  open,
  isActive,
  onEnter,
  onLeave,
  services,
}: ServicesDropdownProps) {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {/* Bouton Services */}
      <Link
        href="/services"
        className={`relative flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
          isActive || open
            ? "text-primary"
            : "text-foreground-muted hover:text-foreground"
        }`}
      >
        {t("services")}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
        {(isActive || open) && (
          <motion.span
            layoutId="nav-indicator"
            className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-gradient-primary glow-primary"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[min(90vw,600px)] rounded-2xl bg-dropdown-bg border border-dropdown-border p-3 z-50"
            style={{ boxShadow: "var(--dropdown-shadow)" }}
          >
            {/* Flèche */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-dropdown-bg border-l border-t border-dropdown-border" />

            <div className="grid grid-cols-5 gap-1.5 relative">
              {services.map((service) => {
                const colors = SERVICE_HOVER[service.key];
                if (!colors) return null;

                return (
                  <Link
                    key={service.id}
                    href={service.href}
                    className={`group/item flex flex-col items-center gap-2 p-3 rounded-xl text-foreground-muted transition-all duration-200 ${colors.itemBg}`}
                  >
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center bg-surface-hover transition-all duration-300 group-hover/item:scale-110 group-hover/item:shadow-lg ${colors.iconBg} ${colors.iconShadow}`}
                    >
                      <Icon name={service.icon} className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-xs font-medium text-center transition-colors ${colors.itemText}`}
                    >
                      {getServiceLabel(service, locale)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}