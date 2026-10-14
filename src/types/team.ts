import type { BaseTranslation, ImageSource } from "./common";

/* =========================================================
   TEAM MEMBER — membres de l'équipe
   ========================================================= */

export interface TeamMemberTranslation extends BaseTranslation {
  name: string;
  role: string;
  bio: string;
}

export interface TeamMember {
  id: string;
  /** Clé unique : "ceo", "designer", "trainer", "support" */
  key: string;
  image: ImageSource;
  linkedin: string | null;
  twitter: string | null;
  order: number;
  isActive: boolean;
  translations: TeamMemberTranslation[];
}