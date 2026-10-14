import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DetailHero,
  DetailExpertise,
  DetailCta,
} from "@/components/services/detail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServiceBySlug, getSettings } from "@/lib/endpoints";

const SITE_URL = "https://opennumeric.com";
const LOCALES = ["fr", "en", "de", "zh", "es"] as const;

/* ============================================================
   METADATA
   ============================================================ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/${slug}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return {};
    const service = await res.json();

    const translation =
      service.translations?.find((t: any) => t.locale === locale) ??
      service.translations?.[0];

    const name = translation?.name ?? service.slug;
    const title = `${name} — Service | Open Numeric`;
    const description =
      translation?.heroSubtitle?.slice(0, 155) ??
      translation?.description?.slice(0, 155) ??
      "";

    return {
      title,
      description,
      keywords: [
        `${name} burkina faso`,
        `${name} ouagadougou`,
        "open numeric services",
        "agence digitale burkina",
      ],
      alternates: {
        canonical: `${SITE_URL}/${locale}/services/${slug}`,
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/services/${slug}`]),
        ),
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${locale}/services/${slug}`,
        type: "website",
        images: [service.image ?? `${SITE_URL}/og/services.png`],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [service.image ?? `${SITE_URL}/og/services.png`],
      },
    };
  } catch {
    return {};
  }
}

/* ============================================================
   PAGE
   ============================================================ */
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const [service, settings] = await Promise.all([
    getServiceBySlug(slug).catch(() => null),
    getSettings().catch(() => null),
  ]);

  if (!service) notFound();

  const translation =
    service.translations.find((t: any) => t.locale === locale) ??
    service.translations[0];
  const serviceName = translation?.name ?? service.slug;

  return (
    <>
      {/* JSON-LD : Service + Breadcrumb */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: serviceName,
          description: translation?.heroSubtitle ?? "",
          url: `${SITE_URL}/${locale}/services/${slug}`,
          provider: {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "Open Numeric",
            url: SITE_URL,
          },
          areaServed: {
            "@type": "Country",
            name: "Burkina Faso",
          },
          serviceType: serviceName,
          inLanguage: locale,
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
              name: "Services",
              item: `${SITE_URL}/${locale}/services`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: serviceName,
              item: `${SITE_URL}/${locale}/services/${slug}`,
            },
          ],
        }}
      />

      <DetailHero service={service} settings={settings} />
      <DetailExpertise service={service} />
      <DetailCta service={service} settings={settings} />
    </>
  );
}