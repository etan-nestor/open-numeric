import type { Metadata } from "next";
import {
  Hero,
  ServicesSection,
  TeamSection,
  ClientsSection,
  TestimonialsSection,
  CtaSection,
} from "@/components/home";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getSettings,
  getServices,
  getTeamMembers,
  getClients,
  getTestimonials,
} from "@/lib/endpoints";

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
    fr: "Open Numeric — Développement Web, Design, Formation & Maintenance au Burkina Faso",
    en: "Open Numeric — Web Development, Design, Training & Maintenance in Burkina Faso",
    de: "Open Numeric — Webentwicklung, Design, Schulung & Wartung in Burkina Faso",
    zh: "Open Numeric — 布基纳法索的网页开发、设计、培训和 IT 维护",
    es: "Open Numeric — Desarrollo web, diseño, formación y mantenimiento en Burkina Faso",
  };

  const descriptions: Record<string, string> = {
    fr: "Open Numeric, agence digitale à Ouagadougou : création de sites web, applications mobiles, design graphique, formation et maintenance informatique. Devis gratuit sous 24h.",
    en: "Open Numeric, digital agency in Ouagadougou: website creation, mobile apps, graphic design, training and IT maintenance. Free quote within 24h.",
    de: "Open Numeric, Digitalagentur in Ouagadougou: Website-Erstellung, mobile Apps, Grafikdesign, Schulung und IT-Wartung. Kostenloses Angebot innerhalb von 24 Stunden.",
    zh: "Open Numeric，瓦加杜古数字机构：网站创建、移动应用、图形设计、培训和 IT 维护。24 小时内免费报价。",
    es: "Open Numeric, agencia digital en Uagadugú: creación de sitios web, apps móviles, diseño gráfico, formación y mantenimiento informático.",
  };

  const title = titles[locale] ?? titles.fr;
  const description = descriptions[locale] ?? descriptions.fr;

  return {
    title,
    description,
    keywords: [
      "open numeric",
      "opennumeric",
      "agence web ouagadougou",
      "développement web burkina faso",
      "création site web burkina",
      "application mobile ouagadougou",
      "design graphique burkina",
      "formation informatique ouagadougou",
      "maintenance informatique burkina",
      "digitalisation entreprise afrique",
    ],
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      type: "website",
      images: [`${SITE_URL}/og/home.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og/home.png`],
    },
  };
}

/* ============================================================
   PAGE
   ============================================================ */
export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [settings, services, teamMembers, clients, testimonials] =
    await Promise.all([
      getSettings().catch(() => null),
      getServices().catch(() => []),
      getTeamMembers().catch(() => []),
      getClients().catch(() => []),
      getTestimonials().catch(() => []),
    ]);

  return (
    <>
      {/* JSON-LD : WebPage principal */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/${locale}#webpage`,
          url: `${SITE_URL}/${locale}`,
          name: "Open Numeric — Solutions Numériques Complètes",
          description:
            "Développement web & mobile, design, formation et maintenance informatique au Burkina Faso.",
          inLanguage: locale,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
          },
          about: {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
          },
        }}
      />

      <Hero settings={settings} />
      <ServicesSection services={services} />
      <TeamSection members={teamMembers} />
      <ClientsSection clients={clients} />
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection />
    </>
  );
}