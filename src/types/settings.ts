import type { BaseTranslation } from "./common";

/* =========================================================
   SITE SETTINGS — configuration globale du site
   ========================================================= */

export interface SiteSettingsTranslation extends BaseTranslation {
  tagline: string | null;
  about: string | null;
}

export interface SiteSettings {
  id: string;

  // Identité
  siteName: string;
  logo: string;
  favicon: string | null;

  // Contacts
  email: string;
  emailSecondary: string | null;
  phone: string;
  phoneSecondary: string | null;
  whatsapp: string | null;
  whatsappSecondary: string | null;

  // Adresse
  address: string;
  mapEmbedUrl: string | null;

  // Disponibilité
  availability: string;

  // SEO
  defaultMetaTitle: string | null;
  defaultMetaDescription: string | null;
  googleAnalyticsId: string | null;

  // Traductions (toutes les langues renvoyées)
  translations: SiteSettingsTranslation[];

  // Meta
  updatedAt: string;
}