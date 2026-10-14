import {
  queryProjects,
  getProjectBySlug,
  getSimilarProjects,
  type QueryProjectsParams,
} from "../endpoints";
import type { PaginatedResponse, Project } from "@/types";

/**
 * Charge la page portfolio complète : liste + filtres calculés.
 */
export interface PortfolioPageData {
  projects: PaginatedResponse<Project>;
}

export async function getPortfolioPageData(
  params: QueryProjectsParams = {},
): Promise<PortfolioPageData> {
  const projects = await queryProjects({
    page: 1,
    limit: 9,
    ...params,
  });

  return { projects };
}

/**
 * Charge la page détail d'un projet + les projets similaires.
 */
export interface ProjectDetailPageData {
  project: Project;
  similar: Project[];
}

export async function getProjectDetailPageData(
  slug: string,
): Promise<ProjectDetailPageData | null> {
  const project = await getProjectBySlug(slug);
  if (!project) return null;

  const similar = await getSimilarProjects(slug);
  return { project, similar };
}