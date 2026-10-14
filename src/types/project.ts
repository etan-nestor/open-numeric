import type {
  BaseTranslation,
  FilterOption,
  ImageSource,
  PaginatedResponse,
} from "./common";

/* =========================================================
   ENUMS — alignés sur Prisma (MAJUSCULES)
   ========================================================= */

export type ProjectCategory =
  | "WEB"
  | "MOBILE"
  | "SOFTWARE"
  | "API"
  | "MODULE"
  | "PACKAGE"
  | "SERVICE"
  | "IA"
  | "DESIGN"
  | "LOGO"
  | "TRAINING"
  | "MAINTENANCE"
  | "SALES";

export type ProjectScope =
  | "INTERNAL"
  | "CLIENT"
  | "PUBLIC"
  | "OPEN_SOURCE"
  | "EXTERNAL";

export type ProjectStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "PLANNED"
  | "ARCHIVED";

export type ProjectLinkType =
  | "DEMO"
  | "GITHUB"
  | "NPM"
  | "DOC"
  | "SITE"
  | "STORE"
  | "ARTICLE";

/* =========================================================
   TRADUCTIONS
   ========================================================= */

export interface ProjectTranslation extends BaseTranslation {
  title: string;
  description: string;
  longDescription: string | null;
}

export interface ProjectGalleryTranslation extends BaseTranslation {
  caption: string;
}

export interface ProjectFeatureTranslation extends BaseTranslation {
  title: string;
  description: string;
}

/* =========================================================
   SOUS-ENTITÉS
   ========================================================= */

export interface ProjectGalleryItem {
  id: string;
  src: ImageSource;
  order: number;
  translations: ProjectGalleryTranslation[];
}

export interface ProjectFeatureItem {
  id: string;
  key: string;
  icon: string;
  order: number;
  translations: ProjectFeatureTranslation[];
}

export interface ProjectLinkItem {
  id: string;
  type: ProjectLinkType;
  url: string;
  order: number;
}

export interface ProjectClient {
  id: string;
  name: string;
  logo: ImageSource;
  url: string | null;
}

/* =========================================================
   PROJET COMPLET
   ========================================================= */

export interface Project {
  id: string;
  slug: string;
  cover: ImageSource;
  heroImage: ImageSource | null;

  category: ProjectCategory;
  scope: ProjectScope;
  status: ProjectStatus;
  year: number;
  tech: string[];
  tags: string[];
  featured: boolean;
  order: number;
  isActive: boolean;

  client: ProjectClient | null;

  translations: ProjectTranslation[];
  gallery: ProjectGalleryItem[];
  features: ProjectFeatureItem[];
  links: ProjectLinkItem[];

  createdAt: string;
  updatedAt: string;
}

/* =========================================================
   FILTRES PORTFOLIO
   ========================================================= */

export interface PortfolioFilters {
  categories: FilterOption<ProjectCategory>[];
  scopes: FilterOption<ProjectScope>[];
  years: FilterOption<string>[];
  techs: FilterOption<string>[];
}

/* =========================================================
   RÉPONSES API
   ========================================================= */

/** Réponse de `GET /api/projects` */
export type PaginatedProjects = PaginatedResponse<Project>;

/** Réponse de `GET /api/projects/slug/:slug/similar` */
export type SimilarProjects = Project[];