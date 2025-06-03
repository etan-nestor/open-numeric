/** @type {import('next-sitemap').IConfig} */
module.exports = {
    // URL de base de ton site
    siteUrl: 'https://opennumeric.com',
  
    // Génère aussi le robots.txt automatiquement
    generateRobotsTxt: true,
  
    // Où générer les fichiers (obligatoire pour que ce soit servi par Next.js)
    outDir: './public',
  
    // Limite de taille des sitemaps (utile si tu as plein de pages un jour)
    sitemapSize: 7000,
  
    // Fréquence de mise à jour estimée (utile pour le SEO)
    changefreq: 'weekly',
    priority: 0.7,
  
    // Pages à ne pas inclure dans les sitemaps (admin, api, etc.)
    exclude: ['/admin', '/api'],
  
    // Pour ajouter des routes dynamiques personnalisées (optionnel, si tu as des pages hors static build)
    // additionalPaths: async (config) => [
    //   {
    //     loc: `${config.siteUrl}/custom-dynamic-page`,
    //     lastmod: new Date().toISOString(),
    //   },
    // ],
  
    // Pour ajouter une politique de crawling propre (optionnel)
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin', '/api'],
        },
      ],
      additionalSitemaps: [
        'https://opennumeric.com/sitemap.xml',
      ],
    },
  };
  