import type { Metadata } from "next";
import {
  queryProjects,
  getAllProjectsForFilters,
  buildPortfolioFilters,
} from "@/lib/endpoints";
import PortfolioPageClient from "@/components/portfolio/PortfolioPageClient";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ProjectCategory, ProjectScope } from "@/types";
import type { ActiveFilters } from "@/components/portfolio";

const SITE_URL = "https://opennumeric.com";
const LOCALES = ["fr", "en", "de", "zh", "es"] as const;
const PER_PAGE = 9;

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/* ============================================================
   METADATA
   ============================================================ */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Portfolio — Projets web, mobile & design | Open Numeric",
    en: "Portfolio — Web, mobile & design projects | Open Numeric",
    de: "Portfolio — Web-, Mobile- & Design-Projekte | Open Numeric",
    zh: "作品集 — 网页、移动应用和设计项目 | Open Numeric",
    es: "Portafolio — Proyectos web, móvil y diseño | Open Numeric",
  };

  const descriptions: Record<string, string> = {
    fr: "Découvrez nos réalisations : sites web, applications mobiles, plateformes e-commerce et solutions digitales livrées au Burkina Faso et en Afrique de l'Ouest.",
    en: "Explore our work: websites, mobile apps, e-commerce platforms and digital solutions delivered in Burkina Faso and West Africa.",
    de: "Entdecken Sie unsere Arbeiten: Websites, Mobile-Apps, E-Commerce-Plattformen und digitale Lösungen in Burkina Faso.",
    zh: "探索我们的作品：在布基纳法索和西非交付的网站、移动应用、电商平台和数字解决方案。",
    es: "Descubre nuestros proyectos: sitios web, aplicaciones móviles, plataformas e-commerce y soluciones digitales en Burkina Faso.",
  };

  const title = titles[locale] ?? titles.fr;
  const description = descriptions[locale] ?? descriptions.fr;

  return {
    title,
    description,
    keywords: [
      "portfolio open numeric",
      "réalisations web burkina",
      "projets développement web",
      "applications mobiles ouagadougou",
      "sites e-commerce burkina faso",
      "agence digitale portfolio",
      "solutions digitales afrique",
    ],
    alternates: {
      canonical: `${SITE_URL}/${locale}/portfolio`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}/portfolio`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/portfolio`,
      type: "website",
      images: [`${SITE_URL}/og/portfolio.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og/portfolio.png`],
    },
  };
}

/* ============================================================
   HELPERS
   ============================================================ */
function parseFilters(
  params: Record<string, string | string[] | undefined>,
): ActiveFilters {
  const get = (key: string): string => {
    const v = params[key];
    return Array.isArray(v) ? v[0] ?? "" : v ?? "";
  };

  const parseList = <T extends string>(key: string): T[] => {
    const v = get(key);
    return v ? (v.split(",").filter(Boolean) as T[]) : [];
  };

  return {
    search: get("search"),
    categories: parseList<ProjectCategory>("category"),
    scopes: parseList<ProjectScope>("scope"),
    years: parseList<string>("year").map(Number).filter((n) => !isNaN(n)),
    techs: parseList<string>("tech"),
  };
}

/* ============================================================
   PAGE
   ============================================================ */
export const revalidate = 3600;

export default async function PortfolioPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const page = Number(sp.page) || 1;

  const [projects, allProjects] = await Promise.all([
    queryProjects({
      page,
      limit: PER_PAGE,
      category: filters.categories.length ? filters.categories : undefined,
      scope: filters.scopes.length ? filters.scopes : undefined,
      year: filters.years.length ? filters.years : undefined,
      tech: filters.techs.length ? filters.techs : undefined,
      search: filters.search || undefined,
    }),
    getAllProjectsForFilters(),
  ]);

  const filterData = buildPortfolioFilters(allProjects);

  return (
    <>
      {/* JSON-LD : CollectionPage + ItemList projets + Breadcrumb */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Portfolio — Open Numeric",
          url: `${SITE_URL}/${locale}/portfolio`,
          description:
            "Réalisations d'Open Numeric : sites web, applications mobiles et solutions digitales.",
          inLanguage: locale,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
          },
        }}
      />

      {projects.items.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Projets Open Numeric",
            itemListElement: projects.items.map((p, i) => {
              const tr =
                p.translations.find((t) => t.locale === locale) ??
                p.translations[0];
              return {
                "@type": "ListItem",
                position: i + 1,
                name: tr?.title ?? p.slug,
                url: `${SITE_URL}/${locale}/portfolio/${p.slug}`,
              };
            }),
          }}
        />
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: `${SITE_URL}/${locale}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Portfolio",
              item: `${SITE_URL}/${locale}/portfolio`,
            },
          ],
        }}
      />

      <PortfolioPageClient
        projects={projects}
        filterData={filterData}
        initialFilters={filters}
      />
    </>
  );
}