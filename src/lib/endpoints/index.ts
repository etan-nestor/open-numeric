/**
 * Endpoints bas niveau — 1 fichier par domaine.
 * Ces fonctions parlent DIRECTEMENT à l'API (via `lib/api.ts`).
 *
 * Utilisation dans les composants :
 *   import { getSettings } from "@/lib/endpoints";
 */

/* Utils */
export { buildQuery } from "./_utils";

/* Config */
export { getSettings } from "./settings";
export { getNavTree } from "./navigation";
export { getSocials } from "./socials";

/* Contenu */
export { getServices, getServiceBySlug } from "./services";
export {
  queryProjects,
  getAllProjectsForFilters,
  getProjectBySlug,
  getSimilarProjects,
  buildPortfolioFilters,
  type QueryProjectsParams,
} from "./projects";
export { getTeamMembers } from "./team";
export { getClients } from "./clients";
export { getTestimonials } from "./testimonials";

/* Formulaires */
export {
  submitContact,
  getContactSubmissions,
  updateContactStatus,
  type QueryContactParams,
} from "./contact";
export {
  submitQuote,
  getQuoteRequests,
  updateQuoteStatus,
  type QueryQuoteParams,
} from "./quote";

/* Recherche */
export { search, type SearchParams } from "./search";