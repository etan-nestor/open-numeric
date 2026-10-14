"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import ServiceCard from "./ServiceCard";
import type { Service, ServiceCategory } from "@/types";

interface ServiceCategorySectionProps {
  service: Service;
  category: ServiceCategory;
}

export default function ServiceCategorySection({
  service,
  category,
}: ServiceCategorySectionProps) {
  const locale = useLocale();

  const catText =
    category.translations.find((x) => x.locale === locale) ??
    category.translations[0];
  const catLabel = catText?.name ?? category.key;
  const catDescription = catText?.description ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      <div className="text-center max-w-2xl mx-auto">
        <h2
          id="services-category-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3"
        >
          <span
            className={`bg-gradient-to-r ${category.accent} bg-clip-text text-transparent`}
          >
            {catLabel}
          </span>
        </h2>
        {catDescription && (
          <p className="text-foreground-muted text-base sm:text-lg">
            {catDescription}
          </p>
        )}
      </div>

      <ul role="list" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {category.items.map((item, i) => (
          <li key={item.id}>
            <ServiceCard
              category={category}
              item={item}
              service={service}
              index={i}
            />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}