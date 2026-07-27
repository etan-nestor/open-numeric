'use client'

import Head from 'next/head'
import { useTheme } from '@/components/context/ThemeContext'
import {
  AboutHero,
  AboutStats,
  AboutContent,
  AboutFounder
} from '@/components/about'

export default function AboutPage() {
  const { theme } = useTheme()

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
        <title>À propos - Open Numeric | Notre Histoire</title>
        <meta name="description" content="Découvrez Open Numeric, une entreprise spécialisée dans les technologies numériques, l'ingénierie logicielle et la transformation digitale en Afrique." />
      </Head>

      <AboutHero />
      <AboutStats />
      <AboutContent />
      <AboutFounder />
    </div>
  )
}