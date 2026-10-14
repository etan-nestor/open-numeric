/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://opennumeric.com",
  generateRobotsTxt: true,
  outDir: "./public",
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  generateIndexSitemap: true,

  additionalPaths: async (config) => {
    const locales = ["fr", "en", "de", "zh", "es"];

    // Pages statiques du site
    const staticPages = [
      { path: "", priority: 1.0, changefreq: "daily" },
      { path: "/services", priority: 0.9, changefreq: "weekly" },
      { path: "/portfolio", priority: 0.9, changefreq: "weekly" },
      { path: "/about", priority: 0.8, changefreq: "monthly" },
      { path: "/contact", priority: 0.8, changefreq: "monthly" },
      { path: "/devis", priority: 0.8, changefreq: "monthly" },
      { path: "/blog", priority: 0.8, changefreq: "weekly" },
    ];

    const paths = [];

    for (const locale of locales) {
      for (const page of staticPages) {
        paths.push({
          loc: `/${locale}${page.path}`,
          changefreq: page.changefreq,
          priority: page.priority,
          lastmod: new Date().toISOString(),
          alternateRefs: locales.map((alt) => ({
            href: `${config.siteUrl}/${alt}${page.path}`,
            hreflang: alt,
          })),
        });
      }
    }

    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? "https://open-numeric-api.opennumeric.com";

      const [servicesRes, projectsRes] = await Promise.all([
        fetch(`${API}/api/services`, { cache: "no-store" }).then((r) => r.json()),
        fetch(`${API}/api/projects?limit=200`, { cache: "no-store" }).then((r) => r.json()),
      ]);

      // Services dynamiques
      if (Array.isArray(servicesRes)) {
        for (const service of servicesRes) {
          for (const locale of locales) {
            paths.push({
              loc: `/${locale}/services/${service.slug}`,
              changefreq: "weekly",
              priority: 0.8,
              lastmod: new Date().toISOString(),
              alternateRefs: locales.map((alt) => ({
                href: `${config.siteUrl}/${alt}/services/${service.slug}`,
                hreflang: alt,
              })),
            });
          }
        }
      }

      // Projets dynamiques
      const projects = Array.isArray(projectsRes) ? projectsRes : projectsRes.items ?? [];
      for (const project of projects) {
        for (const locale of locales) {
          paths.push({
            loc: `/${locale}/portfolio/${project.slug}`,
            changefreq: "monthly",
            priority: 0.6,
            lastmod: new Date(project.updatedAt ?? Date.now()).toISOString(),
            alternateRefs: locales.map((alt) => ({
              href: `${config.siteUrl}/${alt}/portfolio/${project.slug}`,
              hreflang: alt,
            })),
          });
        }
      }
    } catch (err) {
      console.warn("[sitemap] Erreur fetch dynamique :", err.message);
    }

    return paths;
  },

  exclude: ["/admin", "/api", "/dashboard", "/_next/*"],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/dashboard"],
      },
      { userAgent: "GPTBot", disallow: ["/"] },
      { userAgent: "CCBot", disallow: ["/"] },
    ],
    additionalSitemaps: ["https://opennumeric.com/sitemap.xml"],
  },
};