'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/components/context/ThemeContext'
import { FiCode, FiUsers, FiBriefcase, FiAward } from 'react-icons/fi'

const stats = [
  {
    icon: <FiCode className="w-6 h-6" />,
    label: "Projets réalisés",
    value: "50+",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <FiUsers className="w-6 h-6" />,
    label: "Clients satisfaits",
    value: "30+",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <FiBriefcase className="w-6 h-6" />,
    label: "Années d'expérience",
    value: "4+",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: <FiAward className="w-6 h-6" />,
    label: "Technologies maîtrisées",
    value: "20+",
    color: "from-orange-500 to-orange-600"
  }
]

export function AboutStats() {
  const { theme } = useTheme()

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
      case 'light': return 'text-gray-600'
      case 'violet-dark': return 'text-violet-100'
      case 'pink-dark': return 'text-pink-100'
      case 'blue-dark': return 'text-blue-100'
      default: return 'text-gray-300'
    }
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl text-center border ${getBorderColor()} ${getCardBg()} hover:shadow-xl transition-all duration-300 group`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <p className={`text-2xl md:text-3xl font-bold ${getTextColor()}`}>
                {stat.value}
              </p>
              <p className={`text-sm ${getTextColor()} opacity-70`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}