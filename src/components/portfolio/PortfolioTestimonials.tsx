'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/components/context/ThemeContext'

interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  rating: number
  imageUrl: string | null
}

const fallbackTestimonials = [
  {
    name: "Jean Dupont",
    position: "CEO",
    company: "Entreprise XYZ",
    content: "Le site web créé par Open Numeric a dépassé nos attentes. Professionnalisme et réactivité au rendez-vous.",
    rating: 5,
    imageUrl: null
  },
  {
    name: "Marie Lambert",
    position: "Directrice Marketing",
    company: "Innovate",
    content: "Leur application mobile a révolutionné notre façon de travailler. L'équipe est compétente et à l'écoute.",
    rating: 5,
    imageUrl: null
  },
  {
    name: "Thomas Ouedraogo",
    position: "Fondateur",
    company: "Startup 123",
    content: "Un partenaire de confiance depuis 2 ans. Leurs solutions techniques sont toujours innovantes et efficaces.",
    rating: 5,
    imageUrl: null
  }
]

export function PortfolioTestimonials() {
  const { theme } = useTheme()
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials?isVisible=true')
        const data = await response.json()
        if (data.success && data.data.length > 0) {
          setTestimonials(data.data)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const getCardBg = (): string => {
    switch (theme) {
      case 'light': return 'bg-white'
      case 'violet-dark': return 'bg-violet-800/50'
      case 'pink-dark': return 'bg-pink-800/50'
      case 'blue-dark': return 'bg-blue-800/50'
      default: return 'bg-gray-800/50'
    }
  }

  const getBorderColor = (): string => {
    switch (theme) {
      case 'light': return 'border-gray-200'
      case 'violet-dark': return 'border-violet-700'
      case 'pink-dark': return 'border-pink-700'
      case 'blue-dark': return 'border-blue-700'
      default: return 'border-gray-700'
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

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Ils nous font confiance</span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${getTextColor()}`}>Ce que nos clients disent de notre travail</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    )
  }

  const visibleTestimonials = testimonials.filter(t => t.isVisible !== false)

  if (visibleTestimonials.length === 0) {
    return null
  }

  return (
    <section className={`py-20 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/30'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Ils nous font confiance</span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${getTextColor()}`}>Ce que nos clients disent de notre travail</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl shadow-lg ${getCardBg()} border ${getBorderColor()}`}
            >
              <div className="mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className={`text-lg italic mb-6 ${getTextColor()}`}>
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  {testimonial.imageUrl ? (
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-600 dark:text-gray-300">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm opacity-80">{testimonial.position} • {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}