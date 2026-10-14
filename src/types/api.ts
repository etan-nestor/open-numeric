import type {
  BaseTranslation,
  PaginatedResponse,
  SubmissionStatus,
} from "./common";

/* =========================================================
   RÉPONSES API STANDARD
   ========================================================= */

export type { PaginatedResponse };

/* =========================================================
   SEARCH — recherche globale
   ========================================================= */

export type SearchResultType =
  | "project"
  | "service"
  | "team"
  | "client"
  | "testimonial"
  | "nav";

export interface SearchResult {
  type: SearchResultType;
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  url: string;
  locale: string;
  score: number;
}

export interface SearchResponse {
  query: string;
  locale: string;
  total: number;
  results: SearchResult[];
  byType: Partial<Record<SearchResultType, number>>;
  generatedAt: string;
}

/* =========================================================
   STATS — dashboard
   ========================================================= */

export interface StatsResponse {
  content: {
    projects: {
      total: number;
      active: number;
      featured: number;
      published: number;
      inProgress: number;
      byCategory: Record<string, number>;
      byScope: Record<string, number>;
    };
    services: { total: number; active: number };
    team: { total: number; active: number };
    clients: { total: number; active: number };
    testimonials: { total: number; active: number };
    socials: { total: number; active: number };
    navigation: { total: number; active: number };
    uploads: { total: number; totalSize: number };
  };
  interactions: {
    contacts: Record<string, number>;
    quotes: Record<string, number>;
  };
  activity: {
    lastContacts: {
      id: string;
      name: string;
      email: string;
      subject: string;
      status: SubmissionStatus;
      createdAt: string;
    }[];
    lastQuotes: {
      id: string;
      name: string;
      email: string;
      projectType: string;
      status: SubmissionStatus;
      createdAt: string;
    }[];
  };
  generatedAt: string;
}

/* =========================================================
   HEALTH — monitoring
   ========================================================= */

export interface HealthResponse {
  status: "ok" | "degraded" | "down";
  uptime: number;
  timestamp: string;
  version: string;
  checks: {
    database: {
      status: "up" | "down";
      responseTime: number;
      error?: string;
    };
  };
}

/* =========================================================
   UPLOAD — fichiers uploadés
   ========================================================= */

export interface Upload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
}