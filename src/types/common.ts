import type { StaticImageData } from "next/image";

/* =========================================================
   IMAGES
   ========================================================= */

/**
 * Source d'image côté frontend.
 *
 * - `string` → URL (chemin public `/images/...` ou URL complète `/uploads/...`)
 * - `StaticImageData` → image importée (legacy, à éviter avec l'API)
 */
export type ImageSource = string | StaticImageData;

/* =========================================================
   LIENS
   ========================================================= */

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/* =========================================================
   THÈMES
   ========================================================= */

export type ThemeId =
  | "light"
  | "light-blue"
  | "light-orange"
  | "dark"
  | "dark-blue"
  | "dark-orange";

/* =========================================================
   LOCALES
   ========================================================= */

/**
 * Locale supportée par le site — alignée avec le backend.
 * ⚠️ Garde le même ordre que `routing.locales` dans `i18n/routing.ts`.
 */
export const SUPPORTED_LOCALES = ["fr", "en", "de", "zh", "es"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/* =========================================================
   API — TYPES GÉNÉRIQUES
   ========================================================= */

/**
 * Réponse paginée standard du backend.
 *
 * Utilisé par : projects, contact, quote, uploads, etc.
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Une entrée de traduction générique.
 * Chaque entité traduite a ses propres champs.
 */
export interface BaseTranslation {
  locale: Locale;
}

/**
 * Options de filtre avec compteur (portfolio, etc.)
 */
export interface FilterOption<T extends string = string> {
  value: T;
  count: number;
}

/**
 * Statut d'une soumission (contact, devis).
 */
export type SubmissionStatus =
  | "NEW"
  | "READ"
  | "REPLIED"
  | "ARCHIVED"
  | "SPAM";