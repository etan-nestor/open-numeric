'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/context/ThemeContext'
import {
  FiCode,
  FiSmartphone,
  FiLayers,
  FiFilm,
  FiBook,
  FiSettings,
  FiShoppingCart,
  FiChevronDown,
  FiChevronUp,
  FiServer,
  FiCpu
} from 'react-icons/fi'
import type { ServiceCategory } from './types'

// 🔥 Mapping complet des catégories du projet avec les services
const services: ServiceCategory[] = [
  {
    id: 'WEB',
    title: "Développement Web",
    icon: <FiCode className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    description: "Création de sites vitrines, e-commerce et applications web sur mesure."
  },
  {
    id: 'MOBILE',
    title: "Développement Mobile",
    icon: <FiSmartphone className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    description: "Applications iOS et Android natives ou cross-platform."
  },
  {
    id: 'SOFTWARE',
    title: "Logiciels",
    icon: <FiLayers className="w-6 h-6" />,
    color: "from-green-500 to-green-600",
    description: "Solutions logicielles personnalisées et applications de bureau."
  },
  {
    id: 'API_REST',  // 🔥 Nouvelle catégorie
    title: "API REST",
    icon: <FiServer className="w-6 h-6" />,
    color: "from-cyan-500 to-cyan-600",
    description: "Création d'API RESTful, microservices et intégrations."
  },
  {
    id: 'TRAINING',
    title: "Formations",
    icon: <FiBook className="w-6 h-6" />,
    color: "from-yellow-500 to-yellow-600",
    description: "Formations en informatique et outils numériques."
  },
  {
    id: 'DESIGN',
    title: "Design Graphique",
    icon: <FiFilm className="w-6 h-6" />,
    color: "from-pink-500 to-pink-600",
    description: "Identité visuelle, animations publicitaires et UI/UX design."
  },
  {
    id: 'MAINTENANCE',
    title: "Maintenance",
    icon: <FiSettings className="w-6 h-6" />,
    color: "from-orange-500 to-orange-600",
    description: "Installation, réparation et configuration de matériel."
  },
  {
    id: 'HARDWARE',  // 🔥 Nouvelle catégorie (remplace SALES)
    title: "Vente de Matériel",
    icon: <FiShoppingCart className="w-6 h-6" />,
    color: "from-red-500 to-red-600",
    description: "Logiciels et matériel informatique neufs et reconditionnés."
  }
]

interface PortfolioServicesNavProps {
  activeService: string
  onServiceChange: (serviceId: string) => void
}

export function PortfolioServicesNav({ activeService, onServiceChange }: PortfolioServicesNavProps) {
  const { theme } = useTheme()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const getTextColor = (): string => {
    switch (theme) {
      case 'light': return 'text-gray-700'
      case 'violet-dark': return 'text-violet-100'
      case 'pink-dark': return 'text-pink-100'
      case 'blue-dark': return 'text-blue-100'
      default: return 'text-gray-300'
    }
  }

  const getCardBg = (isActive: boolean): string => {
    if (isActive) return ''
    switch (theme) {
      case 'light': return 'bg-gray-50 hover:bg-gray-100'
      case 'violet-dark': return 'bg-violet-800/30 hover:bg-violet-800/50'
      case 'pink-dark': return 'bg-pink-800/30 hover:bg-pink-800/50'
      case 'blue-dark': return 'bg-blue-800/30 hover:bg-blue-800/50'
      default: return 'bg-gray-800/30 hover:bg-gray-800/50'
    }
  }

  const getBorderColor = (isActive: boolean): string => {
    if (isActive) return 'border-transparent'
    switch (theme) {
      case 'light': return 'border-gray-200'
      case 'violet-dark': return 'border-violet-700'
      case 'pink-dark': return 'border-pink-700'
      case 'blue-dark': return 'border-blue-700'
      default: return 'border-gray-700'
    }
  }

  const getDropdownBg = (): string => {
    switch (theme) {
      case 'light': return 'bg-white'
      case 'violet-dark': return 'bg-violet-800/30'
      case 'pink-dark': return 'bg-pink-800/30'
      case 'blue-dark': return 'bg-blue-800/30'
      default: return 'bg-gray-800/30'
    }
  }

  const getDropdownBorder = (): string => {
    switch (theme) {
      case 'light': return 'border-gray-200'
      case 'violet-dark': return 'border-violet-700'
      case 'pink-dark': return 'border-pink-700'
      case 'blue-dark': return 'border-blue-700'
      default: return 'border-gray-700'
    }
  }

  const activeServiceData = services.find(s => s.id === activeService)

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className={`text-2xl md:text-3xl font-bold ${getTextColor()}`}>
            Nos <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className={`mt-2 ${getTextColor()} opacity-80`}>
            Sélectionnez un service pour découvrir nos réalisations
          </p>
        </div>

        {/* Version Desktop - Grille */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service) => {
            const isActive = activeService === service.id
            return (
              <motion.button
                key={service.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onServiceChange(service.id)}
                className={`relative p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                  isActive
                    ? `bg-gradient-to-r ${service.color} text-white shadow-lg shadow-${service.color.split(' ')[1]}/30 border-transparent`
                    : `${getCardBg(isActive)} ${getBorderColor(isActive)}`
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg flex-shrink-0 ${
                    isActive
                      ? 'bg-white/20'
                      : `bg-gradient-to-r ${service.color} text-white`
                  }`}>
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm md:text-base ${isActive ? 'text-white' : getTextColor()}`}>
                      {service.title}
                    </h3>
                    <p className={`text-xs md:text-sm ${isActive ? 'text-white/80' : 'opacity-70'}`}>
                      {service.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Version Mobile - Dropdown */}
        <div className="md:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
              isDropdownOpen
                ? `bg-gradient-to-r ${activeServiceData?.color || 'from-blue-500 to-blue-600'} text-white border-transparent`
                : `${getDropdownBg()} ${getDropdownBorder()}`
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={isDropdownOpen ? 'text-white' : 'text-blue-500'}>
                {activeServiceData?.icon}
              </span>
              <span className={`font-medium ${isDropdownOpen ? 'text-white' : getTextColor()}`}>
                {activeServiceData?.title || 'Sélectionner un service'}
              </span>
            </div>
            {isDropdownOpen ? (
              <FiChevronUp className={isDropdownOpen ? 'text-white' : 'text-gray-500'} />
            ) : (
              <FiChevronDown className="text-gray-500" />
            )}
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`mt-2 rounded-xl border-2 overflow-hidden ${getDropdownBg()} ${getDropdownBorder()}`}
              >
                {services.map((service) => {
                  const isActive = activeService === service.id
                  return (
                    <button
                      key={service.id}
                      onClick={() => {
                        onServiceChange(service.id)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 transition-all duration-200 ${
                        isActive
                          ? `bg-gradient-to-r ${service.color} text-white`
                          : `${getTextColor()} hover:bg-white/10`
                      }`}
                    >
                      <span className={isActive ? 'text-white' : `text-${service.color.split(' ')[1].replace('to-', '')}`}>
                        {service.icon}
                      </span>
                      <span className="text-sm font-medium flex-1 text-left">
                        {service.title}
                      </span>
                      {isActive && (
                        <span className="text-xs opacity-70">✓</span>
                      )}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {activeServiceData && (
            <p className={`mt-3 text-xs ${getTextColor()} opacity-70 text-center px-2`}>
              {activeServiceData.description}
            </p>
          )}
        </div>

        <div className="hidden md:block mt-6 text-center">
          <span className={`text-sm ${getTextColor()} opacity-60`}>
            {services.find(s => s.id === activeService)?.description}
          </span>
        </div>
      </div>
    </section>
  )
}