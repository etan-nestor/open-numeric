"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Icon from "@/components/ui/Icon";
import type { Service } from "@/types";

interface ServicesTabsProps {
  services: Service[];
  activeServiceId: string;
  onChange: (serviceId: string) => void;
}

export default function ServicesTabs({
  services,
  activeServiceId,
  onChange,
}: ServicesTabsProps) {
  const t = useTranslations("servicesPage.tabs");
  const locale = useLocale();

  return (
    <nav className="sticky top-20 z-30 py-4 bg-navbar-bg/95 backdrop-blur-md border-b border-navbar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start lg:justify-center overflow-x-auto pb-1 -mb-1 scrollbar-hide">
          <div className="inline-flex gap-1.5 p-1.5 rounded-2xl bg-surface border border-border shadow-md">
            {services.map((service) => {
              const isActive = activeServiceId === service.id;
              const label =
                service.translations.find((x) => x.locale === locale)?.name ??
                service.translations[0]?.name ??
                service.key;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => onChange(service.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out hover:scale-[1.03] active:scale-[0.97] ${
                    isActive
                      ? "text-white shadow-lg"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface-hover hover:shadow-md"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-tab"
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${service.accent}`}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon
                      name={service.icon}
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}