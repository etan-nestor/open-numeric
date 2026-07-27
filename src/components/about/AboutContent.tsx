'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/components/context/ThemeContext'
import {
  FiCode,
  FiSmartphone,
  FiLayers,
  FiBook,
  FiSettings,
  FiShoppingCart,
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe
} from 'react-icons/fi'

const expertiseItems = [
  {
    icon: <FiCode className="w-6 h-6" />,
    title: "Développement Web & Logiciel",
    description: "Applications web et mobiles, plateformes métiers, sites institutionnels, solutions e-commerce, API et intégration de services.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <FiLayers className="w-6 h-6" />,
    title: "Design UX/UI & Identité Visuelle",
    description: "Conception d'interfaces modernes, expérience utilisateur, identité graphique, logos et supports de communication.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <FiBook className="w-6 h-6" />,
    title: "Formations Numériques",
    description: "Formations professionnelles adaptées aux particuliers, entreprises et organisations pour développer les compétences numériques.",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: <FiSettings className="w-6 h-6" />,
    title: "Maintenance & Support Informatique",
    description: "Assistance technique, maintenance préventive et corrective, dépannage et optimisation des infrastructures informatiques.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <FiShoppingCart className="w-6 h-6" />,
    title: "Vente de Matériel & Services Réseau",
    description: "Fourniture d'équipements informatiques, solutions réseau, configuration, installation et accompagnement technique.",
    color: "from-red-500 to-red-600"
  }
]

export function AboutContent() {
  const { theme } = useTheme()

  const getCardBg = (): string => {
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

  const getBgColor = (): string => {
    switch (theme) {
      case 'light': return 'bg-white'
      case 'violet-dark': return 'bg-violet-900'
      case 'pink-dark': return 'bg-pink-900'
      case 'blue-dark': return 'bg-blue-900'
      default: return 'bg-gray-900'
    }
  }

  return (
    <section className={`py-16 ${getBgColor()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="text-center mb-8">
            <h2 className={`text-3xl md:text-4xl font-bold ${getTextColor()}`}>
              Qui sommes-nous ?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className={`p-8 rounded-2xl border ${getBorderColor()} ${getCardBg()}`}>
            <p className={`text-lg leading-relaxed ${getTextColor()}`}>
              Fondée en <span className="font-bold text-blue-500">2022</span>, <span className="font-bold text-blue-400">Open Numeric</span> est une entreprise spécialisée dans les technologies numériques, l'ingénierie logicielle et la transformation digitale. Notre mission est d'accompagner les entreprises, les institutions et les entrepreneurs dans la conception de solutions innovantes, performantes et durables.
            </p>
            <p className={`mt-4 text-lg leading-relaxed ${getTextColor()}`}>
              Nous intervenons sur l'ensemble du cycle de vie d'un projet numérique, depuis l'analyse des besoins jusqu'au déploiement, la maintenance et l'évolution des solutions.
            </p>
          </div>
        </motion.div>

        {/* Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${getTextColor()}`}>
              Nos domaines d'expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full" />
            <p className={`mt-4 text-lg ${getTextColor()} opacity-70`}>
              Des compétences variées pour répondre à tous vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group p-6 rounded-2xl border ${getBorderColor()} ${getCardBg()} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${getTextColor()}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${getTextColor()} opacity-70 leading-relaxed`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coordonnées */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className={`text-3xl md:text-4xl font-bold ${getTextColor()}`}>
              Nos coordonnées
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${getCardBg()} rounded-2xl border ${getBorderColor()} p-6`}>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-sm font-medium ${getTextColor()}`}>Adresse</p>
                <p className={`text-xs ${getTextColor()} opacity-70`}>SOMGANDE, Ouagadougou, Burkina Faso</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <FiPhone className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-sm font-medium ${getTextColor()}`}>Téléphone</p>
                <p className={`text-xs ${getTextColor()} opacity-70`}>+226 65 03 37 42</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <FiMail className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-sm font-medium ${getTextColor()}`}>Email</p>
                <p className={`text-xs ${getTextColor()} opacity-70`}>tech00.02in@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                <FiGlobe className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-sm font-medium ${getTextColor()}`}>Site web</p>
                <p className={`text-xs ${getTextColor()} opacity-70`}>opennumeric.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}