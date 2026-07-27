'use client'

import { useState } from 'react'
import Head from 'next/head'
import { useTheme } from '@/components/context/ThemeContext'
import {
  PortfolioHero,
  PortfolioServicesNav,
  PortfolioProjects,
  PortfolioTestimonials,
  PortfolioCTA
} from '@/components/portfolio'

export default function PortfolioPage() {
  const { theme } = useTheme()
  const [activeService, setActiveService] = useState<string>('WEB')

  const getBgColor = (): string => {
    switch (theme) {
      case 'light': return 'bg-white'
      case 'violet-dark': return 'bg-violet-900'
      case 'pink-dark': return 'bg-pink-900'
      case 'blue-dark': return 'bg-blue-900'
      default: return 'bg-gray-900'
    }
  }

  const getTextColor = (): string => {
    switch (theme) {
      case 'light': return 'text-gray-700'
      case 'violet-dark': return 'text-violet-100'
      case 'pink-dark': return 'text-pink-100'
      case 'blue-dark': return 'text-blue-100'
      default: return 'text-gray-300'
    }
  }

  return (
    <div className={`min-h-screen ${getBgColor()} ${getTextColor()}`}>
      <Head>
        <title>Portfolio - Open Numeric | Nos Réalisations</title>
        <meta name="description" content="Découvrez nos réalisations par service. Développement web, mobile, design et bien plus encore." />
      </Head>

      <PortfolioHero />
      <PortfolioServicesNav
        activeService={activeService}
        onServiceChange={setActiveService}
      />
      <PortfolioProjects category={activeService} />
      <PortfolioTestimonials />
      <PortfolioCTA />
    </div>
  )
}