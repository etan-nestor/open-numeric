import type { BaseTranslation } from "./common";

/* =========================================================
   NAVIGATION — arbre de menus
   ========================================================= */

export interface NavItemTranslation extends BaseTranslation {
  label: string;
}

/**
 * Un élément de navigation.
 * ⚠️ Le backend renvoie l'arbre complet via `children`.
 */
export interface NavItem {
  id: string;
  /** Clé unique stable : "home", "services", "about", etc. */
  key: string;
  href: string;
  order: number;
  isActive: boolean;
  parentId: string | null;

  /** Traductions (toutes les langues) */
  translations: NavItemTranslation[];

  /** Sous-menus (récursif) */
  children: NavItem[];
}

/* =========================================================
   OPTIONS DE CONFIG (locales, thèmes)
   ========================================================= */

export interface LocaleOption {
  code: string;
  label: string;
}

export interface ThemeOption {
  value: string;
  label: string;
  mode: "light" | "dark";
  preview: string;
}