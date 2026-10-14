"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import type { Service, ServiceCategory, ServiceItem } from "@/types";

interface ServiceCardProps {
  service: Service;
  category: ServiceCategory;
  item: ServiceItem;
  index: number;
}

export default function ServiceCard({
  service,
  category,
  item,
  index,
}: ServiceCardProps) {
  const t = useTranslations("servicesPage");
  const locale = useLocale();

  const itemText =
    item.translations.find((x) => x.locale === locale) ??
    item.translations[0];
  const title = itemText?.name ?? item.key;
  const description = itemText?.description ?? "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-2xl border border-border bg-surface p-6 sm:p-8 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl h-full"
    >
      <div
        className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${category.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
        aria-hidden="true"
      />

      <div className="relative">
        <div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-white shadow-lg mb-5 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3`}
          aria-hidden="true"
        >
          {item.image ? (
            <Image
              src={item.image}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          ) : item.icon ? (
            <Icon name={item.icon} className="h-6 w-6" />
          ) : null}
        </div>

        <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-foreground-muted leading-relaxed mb-5">
            {description}
          </p>
        )}

        <Link
          href={service.href}
          aria-label={`${t("learnMore")} — ${title}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3"
        >
          {t("learnMore")}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.article>
  );
}