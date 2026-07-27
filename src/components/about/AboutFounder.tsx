'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/components/context/ThemeContext'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiBriefcase } from 'react-icons/fi'

export function AboutFounder() {
  const { theme } = useTheme()

  const getBgColor = (): string => {
    switch (theme) {
      case 'light': return 'bg-gray-50'
      case 'violet-dark': return 'bg-violet-800/30'
      case 'pink-dark': return 'bg-pink-800/30'
      case 'blue-dark': return 'bg-blue-800/30'
      default: return 'bg-gray-800/30'
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

  const getCardBg = (): string => {
    switch (theme) {
      case 'light': return 'bg-white'
      case 'violet-dark': return 'bg-violet-800/50'
      case 'pink-dark': return 'bg-pink-800/50'
      case 'blue-dark': return 'bg-blue-800/50'
      default: return 'bg-gray-800/50'
    }
  }

  const principles = [
    "Développer des solutions fiables, sécurisées et évolutives",
    "Privilégier des architectures propres et maintenables sur le long terme",
    "Créer des produits qui apportent une réelle valeur aux utilisateurs et aux organisations"
  ]

  return (
    <section className={`py-16 ${getBgColor()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold ${getTextColor()}`}>
            Le fondateur
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border ${getBorderColor()}">
              <div className="aspect-square relative">
                <Image
                  src="/images/founder.png"
                  alt="Nestor Compaoré - Fondateur d'Open Numeric"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Badge */}
              <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium shadow-lg">
                🚀 Fondateur
              </div>
            </div>

            {/* Cercles décoratifs */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-amber-500/10 blur-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl -z-10" />
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className={`text-2xl md:text-3xl font-bold ${getTextColor()}`}>
                Nestor Compaoré
              </h3>
              <p className={`text-lg text-blue-500 font-medium`}>
                Ingénieur Logiciel & Fondateur
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${getBorderColor()} ${getCardBg()}`}>
              <p className={`leading-relaxed ${getTextColor()}`}>
                Depuis plusieurs années, je conçois et développe des solutions numériques destinées aux entreprises, aux institutions et aux entrepreneurs. Mon domaine d'expertise couvre l'ensemble de la chaîne de développement logiciel, de l'architecture à la mise en production, avec une forte spécialisation dans les technologies JavaScript, TypeScript et .NET.
              </p>
              <p className={`mt-4 leading-relaxed ${getTextColor()}`}>
                J'interviens aussi bien sur le développement frontend que backend, la conception d'API, les architectures modernes, les applications web et mobiles, les systèmes distribués ainsi que les solutions cloud.
              </p>
            </div>

            {/* Principes */}
            <div>
              <h4 className={`text-lg font-bold mb-3 ${getTextColor()}`}>
                Ma philosophie repose sur trois principes essentiels :
              </h4>
              <ul className="space-y-2">
                {principles.map((principle, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-start gap-3 p-3 rounded-xl ${getCardBg()} border ${getBorderColor()}`}
                  >
                    <span className="text-amber-500 mt-0.5">✦</span>
                    <span className={`text-sm ${getTextColor()}`}>{principle}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                className="p-3 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-all hover:scale-105"
                aria-label="Twitter"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-all hover:scale-105"
                aria-label="Email"
              >
                <FiMail className="w-5 h-5" />
              </a>
            </div>

            {/* Citation */}
            <div className={`p-4 rounded-xl border-l-4 border-amber-500 ${getCardBg()}`}>
              <p className={`text-sm italic ${getTextColor()} opacity-80`}>
                "À travers Open Numeric, mon ambition est de contribuer à la transformation numérique des entreprises africaines tout en développant des solutions répondant aux standards internationaux de qualité, de sécurité et de performance."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}