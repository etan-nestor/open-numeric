"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import type { SiteSettings, Social, Service } from "@/types";

interface FooterProps {
  settings: SiteSettings;
  socials: Social[];
  services: Service[];
}

/**
 * Renvoie le label traduit d'un Service pour la locale courante.
 */
function getServiceLabel(service: Service, locale: string): string {
  const tr = service.translations.find((t) => t.locale === locale);
  return tr?.name ?? service.translations[0]?.name ?? service.key;
}

export default function Footer({ settings, socials, services }: FooterProps) {
  const t = useTranslations("footer");
  const locale = useLocale();

  const links = [
    { key: "about", href: "/a-propos" },
    { key: "portfolio", href: "/portfolio" },
    { key: "contact", href: "/contact" },
    { key: "testimonials", href: "/#testimonials" },
  ] as const;

  return (
    <footer className="relative border-t border-border bg-background-alt pt-16 pb-8 mt-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-primary-soft blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Colonne 1 — Logo + About */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary transition-all">
                <Image
                  src={settings.logo}
                  alt={settings.siteName}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-gradient">
                {settings.siteName}
              </span>
            </Link>
            <p className="text-foreground-muted mb-6 leading-relaxed text-sm">
              {t("aboutText")}
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.key}
                  whileHover={{ y: -4, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`p-2.5 rounded-xl bg-surface border border-border text-foreground-muted hover:border-primary hover:shadow-lg transition-colors ${social.hoverColor}`}
                >
                  <Icon name={social.icon} className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Services */}
          <div>
            <h3 className="text-base font-bold mb-6 text-foreground">
              {t("services")}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-foreground-muted hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all" />
                    {getServiceLabel(service, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Liens utiles */}
          <div>
            <h3 className="text-base font-bold mb-6 text-foreground">
              {t("usefulLinks")}
            </h3>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    className="text-foreground-muted hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all" />
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact */}
          <div>
            <h3 className="text-base font-bold mb-6 text-foreground">
              {t("contact")}
            </h3>
            <address className="not-italic space-y-4 text-foreground-muted text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <p>{settings.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href={`tel:${settings.phone}`}
                  className="hover:text-primary"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-primary break-all"
                >
                  {settings.email}
                </a>
              </div>
            </address>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground bg-gradient-primary shadow-lg hover:shadow-xl transition-all"
              >
                {t("contactButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground-subtle">
            © {new Date().getFullYear()} {settings.siteName}. {t("rights")}
          </p>
          <div className="flex gap-6">
            {(["legal", "cookies", "terms"] as const).map((key) => (
              <a
                key={key}
                href="#"
                className="text-xs text-foreground-subtle hover:text-primary transition-colors"
              >
                {t(key)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}