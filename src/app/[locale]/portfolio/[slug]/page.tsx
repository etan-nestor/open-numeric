import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DetailHero,
  DetailMeta,
  DetailContent,
  DetailFeatures,
  DetailGallery,
  DetailTechs,
  DetailLinks,
  SimilarProjects,
  DetailCta,
} from "@/components/portfolio/detail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProjectBySlug, getSimilarProjects } from "@/lib/endpoints";

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
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/slug/${slug}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return {};
    const project = await res.json();

    const translation =
      project.translations?.find((t: any) => t.locale === locale) ??
      project.translations?.[0];

    const title = `${translation?.title ?? project.slug} — Réalisation | Open Numeric`;
    const description =
      translation?.description?.slice(0, 155) ??
      translation?.longDescription?.slice(0, 155) ??
      "";

    return {
      title,
      description,
      keywords: [
        translation?.title ?? slug,
        "projet open numeric",
        "réalisation web burkina",
        `${project.category} burkina faso`,
        ...(Array.isArray(project.tech) ? project.tech.slice(0, 5) : []),
      ],
      alternates: {
        canonical: `${SITE_URL}/${locale}/portfolio/${slug}`,
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/portfolio/${slug}`]),
        ),
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${locale}/portfolio/${slug}`,
        type: "article",
        images: [project.cover ?? `${SITE_URL}/og/portfolio.png`],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [project.cover ?? `${SITE_URL}/og/portfolio.png`],
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

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const project = await getProjectBySlug(slug).catch(() => null);
  if (!project) notFound();

  const similar = await getSimilarProjects(slug).catch(() => []);

  const translation =
    project.translations.find((t: any) => t.locale === locale) ??
    project.translations[0];
  const projectTitle = translation?.title ?? project.slug;
  const projectDescription = translation?.description ?? "";

  return (
    <>
      {/* JSON-LD : CreativeWork + BreadcrumbList à 3 niveaux */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: projectTitle,
          description: projectDescription,
          url: `${SITE_URL}/${locale}/portfolio/${slug}`,
          image: project.cover,
          dateCreated: project.year ? String(project.year) : undefined,
          creator: { "@id": `${SITE_URL}/#organization` },
          keywords: Array.isArray(project.tech)
            ? project.tech.join(", ")
            : undefined,
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
              name: "Portfolio",
              item: `${SITE_URL}/${locale}/portfolio`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: projectTitle,
              item: `${SITE_URL}/${locale}/portfolio/${slug}`,
            },
          ],
        }}
      />

      <article>
        <DetailHero project={project} />
        <DetailMeta project={project} />
        <DetailContent project={project} />
        <DetailFeatures project={project} />
        <DetailGallery project={project} />
        <DetailTechs project={project} />
        <DetailLinks project={project} />
        <SimilarProjects projects={similar} />
        <DetailCta />
      </article>
    </>
  );
}