"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function getTestimonialText(t: Testimonial, locale: string) {
  const tr = t.translations.find((x) => x.locale === locale);
  const fallback = t.translations[0];
  return {
    quote: tr?.quote ?? fallback?.quote ?? "",
    author: tr?.author ?? fallback?.author ?? "",
    company: tr?.company ?? fallback?.company ?? "",
  };
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const t = useTranslations("testimonials");
  const locale = useLocale();

  if (testimonials.length === 0) return null;

  return (
    <section
      aria-labelledby="home-testimonials-title"
      className="relative py-20 lg:py-28 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <h2
            id="home-testimonials-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
          >
            {t("title")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
          <p className="text-foreground-muted text-base sm:text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((item, i) => {
            const text = getTestimonialText(item, locale);

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl p-6 sm:p-8 border border-border bg-surface hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
              >
                <Quote
                  className="h-8 w-8 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors"
                  aria-hidden="true"
                />

                <div
                  className="flex gap-0.5 mb-4"
                  role="img"
                  aria-label={`Note : ${item.rating} sur 5`}
                >
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-3.5 w-3.5 fill-primary text-primary"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="text-sm sm:text-base text-foreground-muted leading-relaxed mb-6">
                  &ldquo;{text.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="relative h-11 w-11 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <Image
                      src={item.image}
                      alt={`${text.author}, ${text.company}`}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {text.author}
                    </p>
                    <p className="text-xs text-foreground-muted">
                      {text.company}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}