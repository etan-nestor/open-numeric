'use client'

import Head from 'next/head';
import { useTheme } from "@/components/context/ThemeContext";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TeamSection } from "@/components/home/TeamSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  const { theme } = useTheme();

  const getSectionClasses = () => {
    const baseClasses = 'transition-colors duration-300 ease-in-out';
    switch (theme) {
      case 'light': return `${baseClasses} bg-white text-gray-800`;
      case 'violet-dark': return `${baseClasses} bg-violet-900 text-violet-100`;
      case 'pink-dark': return `${baseClasses} bg-pink-900 text-pink-100`;
      case 'blue-dark': return `${baseClasses} bg-blue-900 text-blue-100`;
      default: return `${baseClasses} bg-gray-900 text-gray-100`;
    }
  };

  return (
    <div className={getSectionClasses()}>
      <Head>
        <title>Open Numeric - Solutions Numériques Complètes pour Entreprises</title>
        <meta name="description" content="Open Numeric propose des services de développement web, design UX/UI, formation digitale et maintenance informatique pour accompagner votre transformation numérique." />
        <meta name="keywords" content="développement web, design UX, formation digitale, maintenance informatique, solutions numériques" />
        <meta property="og:title" content="Open Numeric - Votre partenaire digital" />
        <meta property="og:description" content="Des solutions numériques sur mesure pour votre entreprise" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.opennumeric.com" />
        <link rel="canonical" href="https://www.opennumeric.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <ClientsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}