import { JsonLd } from "./JsonLd";

const SITE_URL = "https://opennumeric.com";

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Open Numeric",
    description:
      "Solutions numériques complètes : développement, design, formation, maintenance.",
    inLanguage: ["fr-FR", "en-US", "de-DE", "zh-CN", "es-ES"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/fr/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}