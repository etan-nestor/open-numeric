"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { X, ChevronLeft, ChevronRight, ImageIcon, ZoomIn } from "lucide-react";
import type { Project } from "@/types";

interface DetailGalleryProps {
  project: Project;
}

function getCaption(
  item: { translations: { locale: string; caption: string }[] },
  locale: string,
): string {
  const tr = item.translations.find((x) => x.locale === locale);
  return tr?.caption ?? item.translations[0]?.caption ?? "";
}

export default function DetailGallery({ project }: DetailGalleryProps) {
  const t = useTranslations("projectDetail");
  const locale = useLocale();
  const gallery = project.gallery ?? [];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) =>
          i === null ? i : (i + 1) % gallery.length,
        );
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? i : (i - 1 + gallery.length) % gallery.length,
        );
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, gallery.length]);

  if (gallery.length === 0) return null;

  return (
    <>
      <section
        aria-labelledby="project-detail-gallery-title"
        className="relative py-12 lg:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md"
                aria-hidden="true"
              >
                <ImageIcon className="h-5 w-5" />
              </span>
              <h2
                id="project-detail-gallery-title"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              >
                {t("sections.gallery")}
              </h2>
            </div>
          </motion.div>

          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {gallery.map((item, i) => {
              const caption = getCaption(item, locale);

              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Agrandir : ${caption || `Image ${i + 1}`}`}
                    className="group relative w-full rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-2xl transition-all duration-300 aspect-[4/3]"
                  >
                    <Image
                      src={item.src}
                      alt={caption || `Image ${i + 1} du projet`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"
                      aria-hidden="true"
                    />

                    <div
                      className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </div>

                    {caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                        <p className="text-xs sm:text-sm font-semibold text-white">
                          {caption}
                        </p>
                      </div>
                    )}
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse d'images"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Fermer la visionneuse"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div
              className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold tabular-nums"
              aria-live="polite"
            >
              {lightboxIndex + 1} / {gallery.length}
            </div>

            {gallery.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + gallery.length) % gallery.length,
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full aspect-[16/10]"
            >
              <Image
                src={gallery[lightboxIndex].src}
                alt={getCaption(gallery[lightboxIndex], locale) || "Image"}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            {gallery.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % gallery.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            )}

            {getCaption(gallery[lightboxIndex], locale) && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold">
                {getCaption(gallery[lightboxIndex], locale)}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}