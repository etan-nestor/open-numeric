"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { AnimatePresence } from "framer-motion";
import {
  ServicesHero,
  ServicesTabs,
  ServiceCategorySection,
  ProcessSection,
  ServicesCta,
} from "@/components/services";
import type { Service, ServiceCategory, SiteSettings } from "@/types";

interface ServicesPageClientProps {
  services: Service[];
  settings: SiteSettings | null;
}

function getCategoryLabel(category: ServiceCategory, locale: string): string {
  const tr = category.translations.find((t) => t.locale === locale);
  return tr?.name ?? category.translations[0]?.name ?? category.key;
}

export default function ServicesPageClient({
  services,
  settings,
}: ServicesPageClientProps) {
  const locale = useLocale();

  const [activeServiceId, setActiveServiceId] = useState<string>(
    services[0]?.id ?? "",
  );
  const activeService =
    services.find((s) => s.id === activeServiceId) ?? services[0];

  const categories = activeService?.categories ?? [];

  const [activeCategoryKey, setActiveCategoryKey] = useState<string>(
    categories[0]?.key ?? "",
  );

  const activeCategory: ServiceCategory | undefined = useMemo(() => {
    if (!categories.length) return undefined;
    return (
      categories.find((c) => c.key === activeCategoryKey) ?? categories[0]
    );
  }, [categories, activeCategoryKey]);

  const handleServiceChange = (serviceId: string) => {
    setActiveServiceId(serviceId);
    const nextService = services.find((s) => s.id === serviceId);
    setActiveCategoryKey(nextService?.categories[0]?.key ?? "");
  };

  if (!activeService) {
    return (
      <>
        <ServicesHero settings={settings} />
        <ServicesCta settings={settings} />
      </>
    );
  }

  return (
    <>
      <ServicesHero settings={settings} />

      <ServicesTabs
        services={services}
        activeServiceId={activeService.id}
        onChange={handleServiceChange}
      />

      {categories.length > 1 && (
        <nav
          aria-label="Catégories du service"
          className="sticky top-20 z-20 py-3 bg-background/80 backdrop-blur-md border-b border-border"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
              {categories.map((cat) => {
                const isActive = cat.key === activeCategory?.key;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategoryKey(cat.key)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-primary-soft text-primary"
                        : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                    }`}
                  >
                    {getCategoryLabel(cat, locale)}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      <section
        aria-labelledby="services-category-title"
        className="py-16 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {activeCategory && (
              <ServiceCategorySection
                key={`${activeService.id}-${activeCategory.id}`}
                service={activeService}
                category={activeCategory}
              />
            )}
          </AnimatePresence>
        </div>
      </section>

      <ProcessSection />
      <ServicesCta settings={settings} />
    </>
  );
}