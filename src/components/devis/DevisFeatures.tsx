'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/components/context/ThemeContext'

const features = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Confidentialité assurée',
    description: 'Vos informations sont sécurisées et ne seront jamais partagées sans votre consentement.'
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Réponse sous 24h',
    description: 'Notre équipe s\'engage à vous répondre dans un délai maximum de 24 heures ouvrables.'
  },
  {
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    title: 'Devis gratuit',
    description: 'Notre estimation est complètement gratuite et sans engagement de votre part.'
  }
]

export function DevisFeatures() {
  const { theme } = useTheme()

  const getBorderColor = (): string => {
    switch (theme) {
      case 'light': return 'border-gray-200'
      case 'violet-dark': return 'border-violet-700'
      case 'pink-dark': return 'border-pink-700'
      case 'blue-dark': return 'border-blue-700'
      default: return 'border-gray-700'
    }
  }

  const getCardBg = (): string => {
    switch (theme) {
      case 'light': return 'bg-gray-50'
      case 'violet-dark': return 'bg-violet-800/50'
      case 'pink-dark': return 'bg-pink-800/50'
      case 'blue-dark': return 'bg-blue-800/50'
      default: return 'bg-gray-800/50'
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
    <section className={`py-12 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/30'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border ${getBorderColor()} ${getCardBg()} transition-all hover:shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'
              } mb-4`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
              </div>
              <h3 className={`text-lg font-bold mb-2 ${getTextColor()}`}>{item.title}</h3>
              <p className={`text-sm ${getTextColor()}`}>{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}