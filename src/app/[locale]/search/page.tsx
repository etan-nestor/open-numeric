import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import SearchPageClient from "@/components/search/SearchPageClient";

const SITE_URL = "https://opennumeric.com";
const LOCALES = ["fr", "en", "de", "zh", "es"] as const;

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { q } = await searchParams;
  const t = await getTranslations("search");

  const title = q ? `${t("title")} — « ${q} »` : t("title");

  return {
    title,
    description: t("placeholder"),
    robots: {
      index: !q,
      follow: true,
    },
    alternates: {
      canonical: q
        ? `${SITE_URL}/${locale}/search`
        : `${SITE_URL}/${locale}/search`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}/search`]),
      ),
    },
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  const { q } = await searchParams;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          url: `${SITE_URL}/${locale}/search`,
          inLanguage: locale,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
          },
        }}
      />
      <SearchPageClient initialQuery={q ?? ""} />
    </>
  );
}