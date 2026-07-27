'use client'

import { useTheme } from '@/components/context/ThemeContext'

export function ContactHero() {
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
    <section className={`relative pt-32 pb-20 ${getBgColor()} ${getTextColor()}`}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className={`absolute inset-0 opacity-10 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Contactez-nous
            </span>
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${getTextColor()}`}>
            Discutons de votre projet et trouvons ensemble la meilleure solution numérique pour votre entreprise.
          </p>
        </div>
      </div>
    </section>
  )
}