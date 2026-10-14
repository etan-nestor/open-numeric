import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TopInfoBar from "@/components/layout/TopInfoBar";
import { Inter } from "next/font/google";
import {
  getSettings,
  getNavTree,
  getSocials,
  getServices,
} from "@/lib/endpoints";
import "../globals.css";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { WebSiteSchema } from "@/components/seo/WebSiteSchema";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Chargement parallèle des données du layout
  const [settings, navItems, socials, services] = await Promise.all([
    getSettings(),
    getNavTree(),
    getSocials(),
    getServices(),
  ]);

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
       <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <LocalBusinessSchema />
      </head>
      <body>
        <ThemeProvider>
          <NextIntlClientProvider>
            <div className="min-h-screen flex flex-col">
              <TopInfoBar settings={settings} />
              <Navbar
                navItems={navItems}
                services={services}
                settings={settings}
              />
              <main className="flex-1">{children}</main>
              <Footer
                settings={settings}
                socials={socials}
                services={services}
              />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}