'use client'

import { useState } from 'react'
import Head from 'next/head'
import { useTheme } from '@/components/context/ThemeContext'
import {
  ContactHero,
  ContactForm,
  ContactInfo,
} from '@/components/contact'
import type { ContactFormData } from '@/components/contact'

export default function ContactPage() {
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

  const handleSubmit = async (data: ContactFormData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'envoi du message')
      }

      // Succès - géré par le composant ContactForm
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${getBgColor()} ${getTextColor()}`}>
      <Head>
        <title>Contactez Open Numeric - Support Professionnel</title>
        <meta name="description" content="Contactez notre équipe pour des solutions numériques sur mesure. Nous sommes disponibles pour répondre à vos questions et discuter de vos projets." />
      </Head>

      <ContactHero />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <ContactForm onSubmit={handleSubmit} loading={loading} />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}