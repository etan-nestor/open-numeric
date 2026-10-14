import { JsonLd } from "./JsonLd";

const SITE_URL = "https://opennumeric.com";

export function OrganizationSchema() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Open Numeric",
        legalName: "Open Numeric",
        url: SITE_URL,
        logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
            width: 512,
            height: 512,
        },
        image: `${SITE_URL}/og-image.png`,
        description:
            "Open Numeric : développement web & mobile, design, formation et maintenance informatique au Burkina Faso.",
        email: "tech00.02@gmail.com",
        telephone: "+226 65 03 37 42",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Ouagadougou",
            addressLocality: "Ouagadougou",
            addressCountry: "BF",
        },
        sameAs: [
            "https://www.facebook.com/opennumeric",
        ],
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: "+226 61 78 03 91",
                contactType: "customer service",
                availableLanguage: ["French", "English"],
                areaServed: ["BF", "CI", "SN", "ML", "NE"],
            },
        ],
        founder: { "@type": "Person", name: "Fondateur Open Numeric" },
        foundingDate: "2024",
        knowsAbout: [
            "Développement web",
            "Développement mobile",
            "Design graphique",
            "Formation informatique",
            "Maintenance informatique",
            "Transformation digitale",
            "Digitalisation entreprise",
            "Vente en ligne",
            "Vente de logiciels",
            "Solutions informatiques sur mesure",
        ],
    };

    return <JsonLd data={data} />;
}