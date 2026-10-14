import type { Metadata } from "next";
import {
  ContactHero,
  ContactForm,
  ContactInfo,
  ContactMap,
} from "@/components/contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSettings, getSocials } from "@/lib/endpoints";

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
    fr: "Contact — Parlons de votre projet digital | Open Numeric",
    en: "Contact — Let's talk about your digital project | Open Numeric",
    de: "Kontakt — Sprechen wir über Ihr digitales Projekt | Open Numeric",
    zh: "联系我们 — 聊聊您的数字项目 | Open Numeric",
    es: "Contacto — Hablemos de tu proyecto digital | Open Numeric",
  };

  const descriptions: Record<string, string> = {
    fr: "Contactez Open Numeric à Ouagadougou, Burkina Faso. Réponse sous 24h pour vos projets de développement web, mobile, design, formation et maintenance informatique.",
    en: "Contact Open Numeric in Ouagadougou, Burkina Faso. Response within 24h for your web development, mobile, design, training and IT maintenance projects.",
    de: "Kontaktieren Sie Open Numeric in Ouagadougou, Burkina Faso. Antwort innerhalb von 24 Stunden für Ihre Projekte.",
    zh: "联系布基纳法索瓦加杜古的 Open Numeric。24 小时内回复您的网页开发、移动应用、设计、培训和 IT 维护项目。",
    es: "Contacta con Open Numeric en Uagadugú, Burkina Faso. Respuesta en 24h para tus proyectos de desarrollo web, móvil, diseño y mantenimiento.",
  };

  const title = titles[locale] ?? titles.fr;
  const description = descriptions[locale] ?? descriptions.fr;

  return {
    title,
    description,
    keywords: [
      "contact open numeric",
      "contact agence web ouagadougou",
      "devis développement web burkina faso",
      "contacter développeur burkina",
      "email open numeric",
      "téléphone open numeric",
    ],
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}/contact`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/contact`,
      type: "website",
      images: [`${SITE_URL}/og/contact.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og/contact.png`],
    },
  };
}

/* ============================================================
   PAGE
   ============================================================ */
export const revalidate = 3600;

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [settings, socials] = await Promise.all([
    getSettings().catch(() => null),
    getSocials().catch(() => []),
  ]);

  return (
    <>
      {/* JSON-LD : ContactPage + Breadcrumb */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact — Open Numeric",
          url: `${SITE_URL}/${locale}/contact`,
          description:
            "Contactez Open Numeric pour vos projets numériques au Burkina Faso.",
          inLanguage: locale,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
          },
          ...(settings && {
            mainEntity: {
              "@type": "Organization",
              name: "Open Numeric",
              "@id": `${SITE_URL}/#organization`,
              email: settings.email,
              telephone: settings.phone,
              address: {
                "@type": "PostalAddress",
                streetAddress: settings.address,
                addressLocality: "Ouagadougou",
                addressCountry: "BF",
              },
            },
          }),
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
              name: "Contact",
              item: `${SITE_URL}/${locale}/contact`,
            },
          ],
        }}
      />

      <ContactHero />

      <section
        aria-labelledby="contact-form-title"
        className="relative py-16 lg:py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {settings && (
        <section
          aria-labelledby="contact-info-title"
          className="relative py-16 lg:py-20 bg-background-alt"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactInfo settings={settings} socials={socials} />
          </div>
        </section>
      )}

      {settings?.mapEmbedUrl && <ContactMap settings={settings} />}
    </>
  );
}