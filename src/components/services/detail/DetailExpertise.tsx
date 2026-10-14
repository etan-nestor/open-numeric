"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import Icon from "@/components/ui/Icon";
import type { Service, ServiceCategory } from "@/types";

interface DetailExpertiseProps {
  service: Service;
}

export default function DetailExpertise({ service }: DetailExpertiseProps) {
  const t = useTranslations("serviceDetail.common");
  const locale = useLocale();

  const categories = service.categories ?? [];
  const [activeKey, setActiveKey] = useState<string>(categories[0]?.key ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCategory: ServiceCategory | undefined =
    categories.find((c) => c.key === activeKey) ?? categories[0];

  if (!activeCategory) return null;

  const handleSelect = (key: string) => {
    setActiveKey(key);
    setMobileOpen(false);
  };

  const getCatLabel = (cat: ServiceCategory) =>
    cat.translations.find((x) => x.locale === locale)?.name ??
    cat.translations[0]?.name ??
    cat.key;

  const activeCatLabel = getCatLabel(activeCategory);

  return (
    <section
      aria-labelledby="service-detail-expertise-title"
      className="relative py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="service-detail-expertise-title" className="sr-only">
          Notre expertise
        </h2>

        {/* TABS DESKTOP */}
        <motion.nav
          aria-label="Catégories de services"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex justify-center mb-10"
        >
          <div className="inline-flex gap-1.5 p-1.5 rounded-2xl bg-surface border border-border shadow-md">
            {categories.map((cat) => {
              const isActive = activeKey === cat.key;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveKey(cat.key)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.97] ${
                    isActive
                      ? "text-white shadow-lg"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface-hover hover:shadow-md"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`active-tab-${service.id}`}
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${cat.accent}`}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{getCatLabel(cat)}</span>
                </button>
              );
            })}
          </div>
        </motion.nav>

        {/* SELECTEUR MOBILE */}
        <div className="lg:hidden relative mb-8">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-haspopup="listbox"
            className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-surface border border-border shadow-md hover:border-primary/40 active:scale-[0.99] transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`flex-shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br ${activeCategory.accent} shadow-md`}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-foreground truncate">
                {activeCatLabel}
              </span>
            </div>
            <ChevronDown
              className={`flex-shrink-0 h-5 w-5 text-foreground-muted transition-transform duration-300 ${
                mobileOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          <AnimatePresence>
            {mobileOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setMobileOpen(false)}
                  className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
                  aria-hidden="true"
                />

                <motion.ul
                  role="listbox"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute top-full left-0 right-0 mt-2 z-40 rounded-2xl bg-dropdown-bg border border-dropdown-border overflow-hidden"
                  style={{ boxShadow: "var(--dropdown-shadow)" }}
                >
                  <div className="p-2">
                    {categories.map((cat) => {
                      const isActive = activeKey === cat.key;
                      return (
                        <li key={cat.id} role="option" aria-selected={isActive}>
                          <button
                            type="button"
                            onClick={() => handleSelect(cat.key)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-colors ${
                              isActive
                                ? "bg-primary-soft text-primary"
                                : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                            }`}
                          >
                            <span
                              className={`flex-shrink-0 h-8 w-8 rounded-lg bg-gradient-to-br ${cat.accent} shadow-sm transition-transform ${
                                isActive ? "scale-110" : ""
                              }`}
                              aria-hidden="true"
                            />
                            <span className="flex-1 text-sm font-medium truncate">
                              {getCatLabel(cat)}
                            </span>
                            {isActive && (
                              <Check
                                className="flex-shrink-0 h-4 w-4 text-primary"
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </div>
                </motion.ul>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* GRILLE D'ITEMS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="sr-only">{activeCatLabel}</h3>
            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {activeCategory.items.map((techItem, i) => {
                const itemText =
                  techItem.translations.find((x) => x.locale === locale) ??
                  techItem.translations[0];
                const displayName = itemText?.name ?? techItem.key;
                const description = itemText?.description ?? "";

                return (
                  <motion.li
                    key={techItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <article className="group relative h-full rounded-2xl border border-border bg-surface p-6 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl">
                      <div
                        className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${activeCategory.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                        aria-hidden="true"
                      />

                      <div className="relative">
                        <div
                          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-hover border border-border mb-5 transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:border-transparent group-hover:bg-gradient-to-br ${activeCategory.accent}`}
                          aria-hidden="true"
                        >
                          {techItem.image ? (
                            <Image
                              src={techItem.image}
                              alt=""
                              width={32}
                              height={32}
                              className="h-8 w-8 object-contain"
                            />
                          ) : techItem.icon ? (
                            <Icon name={techItem.icon} className="h-6 w-6" />
                          ) : null}
                        </div>

                        <h4 className="text-base font-bold text-foreground mb-2 transition-colors group-hover:text-primary">
                          {displayName}
                        </h4>

                        {description && (
                          <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                            {description}
                          </p>
                        )}

                        <Link
                          href="/portfolio"
                          aria-label={`${t("viewProjects")} — ${displayName}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-all duration-300 group-hover:gap-3"
                        >
                          {t("viewProjects")}
                          <ArrowRight
                            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </article>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}