"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import type { NavItem, Service, SiteSettings } from "@/types";
import { SearchTrigger } from "@/components/search";

import Logo from "./navbar/Logo";
import NavLink from "./navbar/NavLinks";
import ServicesDropdown from "./navbar/ServicesDropdown";
import ThemeSwitcher from "./navbar/ThemeSwitcher";
import LanguageSwitcher from "./navbar/LanguageSwitcher";
import MobileMenu from "./navbar/MobileMenu";

interface NavbarProps {
  navItems: NavItem[];
  services: Service[];
  settings: SiteSettings;
}

function getNavLabel(item: NavItem, locale: string): string {
  const tr = item.translations.find((t) => t.locale === locale);
  return tr?.label ?? item.translations[0]?.label ?? item.key;
}

export default function Navbar({ navItems, services, settings }: NavbarProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  const handleServicesEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setServicesOpen(true);
  };
  const handleServicesLeave = () => {
    hoverTimeout.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const isServicesActive = pathname.startsWith("/services");
  const homeItem = navItems.find((n) => n.key === "home");
  const otherItems = navItems.filter(
    (n) => n.key !== "home" && n.key !== "services",
  );

  return (
    <nav className="sticky top-0 z-50 bg-navbar-bg border-b border-navbar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* LOGO — flex-shrink-0 pour ne pas être écrasé */}
          <div className="flex-shrink-0 hidden lg:block">
            <Logo showText settings={settings} />
          </div>
          <div className="flex-shrink-0 lg:hidden">
            <Logo showText={false} settings={settings} />
          </div>

          {/* NAV DESKTOP — min-w-0 pour permettre le shrink */}
          <div className="hidden lg:flex items-center gap-1 min-w-0 flex-1 justify-center">
            {homeItem && (
              <NavLink
                href={homeItem.href}
                label={getNavLabel(homeItem, locale)}
                pathname={pathname}
              />
            )}
            <div ref={servicesRef}>
              <ServicesDropdown
                open={servicesOpen}
                isActive={isServicesActive}
                onEnter={handleServicesEnter}
                onLeave={handleServicesLeave}
                services={services}
              />
            </div>
            {otherItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={getNavLabel(item, locale)}
                pathname={pathname}
              />
            ))}
          </div>

          {/* ACTIONS DESKTOP — flex-shrink-0 pour ne pas être écrasé */}
          <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
            <SearchTrigger />
            <LanguageSwitcher />
            <ThemeSwitcher />
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/devis"
                className="ml-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground bg-gradient-primary hover:opacity-90 transition-all shadow-lg glow-primary whitespace-nowrap"
              >
                {t("quote")}
              </Link>
            </motion.div>
          </div>

          {/* ACTIONS MOBILE */}
          <div className="lg:hidden flex items-center gap-1">
            <SearchTrigger />
            <LanguageSwitcher />
            <ThemeSwitcher />
            <MobileMenu
              pathname={pathname}
              navItems={navItems}
              services={services}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}