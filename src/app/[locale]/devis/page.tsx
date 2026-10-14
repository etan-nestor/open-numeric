import type { Metadata } from "next";
import {
  QuoteHero,
  QuoteWizard,
  QuoteAssurance,
} from "@/components/quote";
import { JsonLd } from "@/components/seo/JsonLd";

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
    fr: "Demande de devis gratuit — Open Numeric | Réponse sous 24h",
    en: "Free Quote Request — Open Numeric | Reply within 24h",
    de: "Kostenloses Angebot anfordern — Open Numeric | Antwort in 24h",
    zh: "免费报价请求 — Open Numeric | 24 小时内回复",
    es: "Solicitud de presupuesto gratis — Open Numeric | Respuesta en 24h",
  };

  const descriptions: Record<string, string> = {
    fr: "Demandez votre devis gratuit chez Open Numeric : site web, application mobile, design, e-commerce. Réponse personnalisée sous 24h. Sans engagement.",
    en: "Request your free quote from Open Numeric: website, mobile app, design, e-commerce. Personalized reply within 24h. No commitment.",
    de: "Fordern Sie Ihr kostenloses Angebot bei Open Numeric an: Website, Mobile-App, Design, E-Commerce. Antwort innerhalb von 24 Stunden.",
    zh: "向 Open Numeric 索取免费报价：网站、移动应用、设计、电商。24 小时内个性化回复。无承诺。",
    es: "Solicita tu presupuesto gratuito en Open Numeric: sitio web, aplicación móvil, diseño, e-commerce. Respuesta personalizada en 24h.",
  };

  const title = titles[locale] ?? titles.fr;
  const description = descriptions[locale] ?? descriptions.fr;

  return {
    title,
    description,
    keywords: [
      "devis gratuit",
      "devis site web",
      "devis application mobile",
      "devis e-commerce",
      "devis design",
      "devis développement burkina",
      "devis agence digitale ouagadougou",
      "devis informatique burkina faso",
    ],
    alternates: {
      canonical: `${SITE_URL}/${locale}/devis`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}/devis`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/devis`,
      type: "website",
      images: [`${SITE_URL}/og/devis.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og/devis.png`],
    },
  };
}

/* ============================================================
   PAGE
   ============================================================ */
export default async function DevisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {/* JSON-LD : WebPage + Service + Breadcrumb */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/${locale}/devis#webpage`,
          url: `${SITE_URL}/${locale}/devis`,
          name: "Demande de devis gratuit",
          description:
            "Formulaire de demande de devis gratuit chez Open Numeric. Réponse sous 24h.",
          inLanguage: locale,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
          },
          about: {
            "@type": "Service",
            name: "Devis numérique",
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: { "@type": "Country", name: "Burkina Faso" },
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
              name: "Devis",
              item: `${SITE_URL}/${locale}/devis`,
            },
          ],
        }}
      />

      <QuoteHero />
      <QuoteWizard />
      <QuoteAssurance />
    </>
  );
}