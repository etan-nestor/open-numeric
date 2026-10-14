import type { BaseTranslation, ImageSource } from "./common";

/* =========================================================
   SERVICE — liste des services (navbar + home + page services)
   ========================================================= */

export interface ServiceTranslation extends BaseTranslation {
  name: string;
  heroTitle: string | null;
  heroTitleHighlight: string | null;
  heroSubtitle: string | null;
}

/* =========================================================
   CATÉGORIES DE SERVICE
   ========================================================= */

export interface ServiceCategoryTranslation extends BaseTranslation {
  name: string;
  description: string | null;
}

export interface ServiceCategory {
  id: string;
  /** Clé unique dans le service : "frontend", "backend", ... */
  key: string;
  /** Nom d'icône Lucide */
  icon: string;
  /** Dégradé Tailwind : "from-blue-500 to-cyan-500" */
  accent: string;
  order: number;
  translations: ServiceCategoryTranslation[];
  items: ServiceItem[];
}

/* =========================================================
   ITEMS DE CATÉGORIE (technologies, outils, etc.)
   ========================================================= */

export interface ServiceItemTranslation extends BaseTranslation {
  name: string;
  description: string | null;
}

export interface ServiceItem {
  id: string;
  /** Clé unique dans la catégorie : "react", "angular", ... */
  key: string;
  image: ImageSource | null;
  icon: string | null;
  order: number;
  translations: ServiceItemTranslation[];
}

/* =========================================================
   SERVICE COMPLET
   ========================================================= */

export interface Service {
  id: string;
  /** Clé unique : "development", "design", ... */
  key: string;
  /** Slug URL : "developpement", "design", ... */
  slug: string;
  href: string;
  /** Nom d'icône Lucide */
  icon: string;
  /** Dégradé Tailwind */
  accent: string;
  order: number;
  isActive: boolean;

  /** Traductions (toutes les langues) */
  translations: ServiceTranslation[];

  /** Catégories (avec items et traductions) */
  categories: ServiceCategory[];
}