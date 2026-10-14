import { JsonLd } from "./JsonLd";

export function LocalBusinessSchema() {
    const data = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://opennumeric.com/#localbusiness",
        name: "Open Numeric",
        image: "https://opennumeric.com/og-image.png",
        url: "https://opennumeric.com",
        telephone: "+226 65 03 37 42",
        priceRange: "$$",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Ouagadougou",
            addressLocality: "Ouagadougou",
            postalCode: "01",
            addressCountry: "BF",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 12.3714,
            longitude: -1.5197,
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "00:00",
            },
        ],
        areaServed: [
            { "@type": "Country", name: "Burkina Faso" },
            { "@type": "Country", name: "Côte d'Ivoire" },
            { "@type": "Country", name: "Sénégal" },
            { "@type": "Country", name: "Mali" },
            { "@type": "Country", name: "Niger" },

        ],
    };

    return <JsonLd data={data} />;
}