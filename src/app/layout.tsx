import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://opennumeric.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Open Numeric — Solutions Numériques Complètes au Burkina Faso",
    template: "%s | Open Numeric",
  },

  description:
    "Open Numeric : développement web & mobile, design, formation et maintenance informatique au Burkina Faso. Solutions digitales sur mesure pour votre entreprise.",

  keywords: [
    // Marque
    "open numeric",
    "opennumeric",
    "open numeric burkina",
    "open numeric ouagadougou",
    // Services
    "solution informatique",
    "développement web",
    "développement mobile",
    "création site web",
    "application mobile",
    "design graphique",
    "formation informatique",
    "maintenance informatique",
    "transformation digitale",
    "digitalisation entreprise",
    // Longue traîne
    "développeur web burkina faso",
    "agence digitale ouagadougou",
    "création site web ouagadougou",
    "formation développement web",
  ],

  authors: [{ name: "Open Numeric", url: SITE_URL }],
  creator: "Open Numeric by Nestor COMPAORE",
  publisher: "Open Numeric",

  // Canonical + i18n
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr-FR": `${SITE_URL}/fr`,
      "en-US": `${SITE_URL}/en`,
      "de-DE": `${SITE_URL}/de`,
      "zh-CN": `${SITE_URL}/zh`,
      "es-ES": `${SITE_URL}/es`,
      "x-default": `${SITE_URL}/fr`,
    },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "de_DE", "zh_CN", "es_ES"],
    url: SITE_URL,
    siteName: "Open Numeric",
    title: "Open Numeric — Solutions Numériques Complètes",
    description:
      "Développement, design, formation et maintenance pour propulser votre entreprise à l'ère digitale.",
    images: [
      {
        url: "/og-image.png",   // 1200×630
        width: 1200,
        height: 630,
        alt: "Open Numeric — Solutions Numériques",
      },
    ],
  },

  // Robots par défaut
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // App
  applicationName: "Open Numeric",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}