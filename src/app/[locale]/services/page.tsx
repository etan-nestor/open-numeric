import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServices, getSettings } from "@/lib/endpoints";

const SITE_URL = "https://opennumeric.com";
const LOCALES = ["fr", "en", "de", "zh", "es"] as const;

/* ============================================================
   METADATA
   ============================================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Services — Développement Web, Design, Formation & Maintenance",
    en: "Services — Web Development, Design, Training & Maintenance",
    de: "Leistungen — Webentwicklung, Design, Schulung & Wartung",
    zh: "服务 — 网页开发、设计、培训和 IT 维护",
    es: "Servicios — Desarrollo web, diseño, formación y mantenimiento",
  };

  const descriptions: Record<string, string> = {
    fr: "Découvrez tous les services d'Open Numeric : développement web & mobile, design graphique, formation informatique, maintenance, vente de matériel. Solutions sur mesure au Burkina Faso.",
    en: "Discover all Open Numeric services: web & mobile development, graphic design, IT training, maintenance, hardware sales. Custom solutions in Burkina Faso.",
    de: "Entdecken Sie alle Open Numeric Leistungen: Web- und Mobile-Entwicklung, Grafikdesign, IT-Schulung, Wartung, Hardware-Verkauf.",
    zh: "探索 Open Numeric 的所有服务：网页和移动开发、图形设计、IT 培训、维护、硬件销售。",
    es: "Descubre todos los servicios de Open Numeric: desarrollo web y móvil, diseño gráfico, formación informática, mantenimiento, venta de material.",
  };

  const title = titles[locale] ?? titles.fr;
  const description = descriptions[locale] ?? descriptions.fr;

  return {
    title,
    description,
    keywords: [
      "services informatiques burkina",
      "développement web ouagadougou",
      "création application mobile",
      "design graphique burkina faso",
      "formation informatique",
      "maintenance informatique ouagadougou",
      "vente matériel informatique",
      "agence digitale services",
    ],
    alternates: {
      canonical: `${SITE_URL}/${locale}/services`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}/services`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/services`,
      type: "website",
      images: [`${SITE_URL}/og/services.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og/services.png`],
    },
  };
}

/* ============================================================
   PAGE
   ============================================================ */
export const revalidate = 3600;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [services, settings] = await Promise.all([
    getServices().catch(() => []),
    getSettings().catch(() => null),
  ]);

  return (
    <>
      {/* JSON-LD : CollectionPage + ItemList services + Breadcrumb */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Services — Open Numeric",
          url: `${SITE_URL}/${locale}/services`,
          description:
            "Tous les services numériques d'Open Numeric au Burkina Faso.",
          inLanguage: locale,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
          },
        }}
      />

      {services.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Services Open Numeric",
            itemListElement: services.map((s, i) => {
              const tr = s.translations.find((t) => t.locale === locale) ?? s.translations[0];
              return {
                "@type": "ListItem",
                position: i + 1,
                name: tr?.name ?? s.key,
                url: `${SITE_URL}/${locale}/services/${s.slug}`,
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
              name: "Services",
              item: `${SITE_URL}/${locale}/services`,
            },
          ],
        }}
      />

      <ServicesPageClient services={services} settings={settings} />
    </>
  );
}