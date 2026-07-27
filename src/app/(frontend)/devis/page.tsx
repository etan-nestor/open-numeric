'use client'

import { useState } from 'react'
import Head from 'next/head'
import { useTheme } from '@/components/context/ThemeContext'
import { DevisHero, DevisForm, DevisFeatures } from '@/components/devis'
import type { DevisFormData } from '@/components/devis'

export default function DevisPage() {
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (data: DevisFormData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'envoi de la demande')
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${getBgColor()} ${getTextColor()}`}>
      <Head>
        <title>Demande de Devis | Open Numeric</title>
        <meta name="description" content="Obtenez un devis personnalisé pour votre projet digital. Notre équipe vous répond sous 24h." />
      </Head>

      <DevisHero />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DevisForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </section>

      <DevisFeatures />
    </div>
  )
}