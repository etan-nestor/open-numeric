import type { Metadata } from "next";
import {
  AboutHero,
  AboutMission,
  AboutValues,
  AboutStats,
  AboutTeam,
  AboutCta,
} from "@/components/about";
import { JsonLd } from "@/components/seo/JsonLd";
import { getTeamMembers } from "@/lib/endpoints";

const SITE_URL = "https://opennumeric.com";
const LOCALES = ["fr", "en", "de", "zh", "es"] as const;

/* ============================================================
   1. METADATA
   ============================================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "À propos — Open Numeric, agence digitale au Burkina Faso",
    en: "About — Open Numeric, digital agency in Burkina Faso",
    de: "Über uns — Open Numeric, Digitalagentur in Burkina Faso",
    zh: "关于我们 — Open Numeric，布基纳法索数字机构",
    es: "Sobre nosotros — Open Numeric, agencia digital en Burkina Faso",
  };

  const descriptions: Record<string, string> = {
    fr: "Découvrez Open Numeric : notre mission, nos valeurs, notre équipe d'experts en développement web, design, formation et maintenance informatique à Ouagadougou.",
    en: "Discover Open Numeric: our mission, values, and team of experts in web development, design, training, and IT maintenance in Ouagadougou.",
    de: "Entdecken Sie Open Numeric: unsere Mission, Werte und unser Expertenteam für Webentwicklung, Design, Schulung und IT-Wartung in Ouagadougou.",
    zh: "了解 Open Numeric：我们的使命、价值观以及在瓦加杜古的网页开发、设计、培训和 IT 维护专家团队。",
    es: "Descubre Open Numeric: nuestra misión, valores y equipo de expertos en desarrollo web, diseño, formación y mantenimiento informático en Uagadugú.",
  };

  const title = titles[locale] ?? titles.fr;
  const description = descriptions[locale] ?? descriptions.fr;

  return {
    title,
    description,
    keywords: [
      "à propos open numeric",
      "équipe open numeric",
      "agence digitale burkina faso",
      "qui sommes-nous",
      "mission open numeric",
      "valeurs open numeric",
      "experts développement web ouagadougou",
    ],
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}/about`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/about`,
      type: "website",
      images: [`${SITE_URL}/og/about.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og/about.png`],
    },
  };
}

/* ============================================================
   2. PAGE
   ============================================================ */
export const revalidate = 3600; // ISR : 1h

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const teamMembers = await getTeamMembers().catch(() => []);

  return (
    <>
      {/* JSON-LD : AboutPage + Breadcrumb */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "À propos d'Open Numeric",
          url: `${SITE_URL}/${locale}/about`,
          description:
            "Mission, valeurs et équipe d'Open Numeric — agence digitale au Burkina Faso.",
          inLanguage: locale,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
          },
        }}
      />

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
              name: "À propos",
              item: `${SITE_URL}/${locale}/about`,
            },
          ],
        }}
      />

      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutStats />
      <AboutTeam members={teamMembers} />
      <AboutCta />
    </>
  );
}