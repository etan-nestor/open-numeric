import type { BaseTranslation } from "./common";

/* =========================================================
   SOCIAL — réseaux sociaux
   ========================================================= */

export interface SocialTranslation extends BaseTranslation {
  name: string;
}

export interface Social {
  id: string;
  /** Clé unique : "facebook", "twitter", "linkedin", "instagram" */
  key: string;
  /** Nom d'icône Lucide : "Facebook", "Twitter", "Linkedin", "Instagram" */
  icon: string;
  url: string;
  /** Classe Tailwind de hover : "hover:text-blue-600" */
  hoverColor: string;
  order: number;
  isActive: boolean;
  /** Traductions (toutes les langues) */
  translations: SocialTranslation[];
}