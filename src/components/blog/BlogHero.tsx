'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/components/context/ThemeContext'
import { FiBookOpen, FiTrendingUp } from 'react-icons/fi'

interface BlogHeroProps {
  totalPosts: number
  featuredPosts: number
}

export function BlogHero({ totalPosts, featuredPosts }: BlogHeroProps) {
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
    <section className={`relative pt-32 pb-16 overflow-hidden ${getBgColor()}`}>
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 opacity-10 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
        
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-orange-500/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/30">
              <FiBookOpen className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 bg-clip-text text-transparent">
              Blog & Actualités
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`text-xl md:text-2xl max-w-3xl mx-auto ${getTextColor()}`}
          >
            Découvrez nos articles, conseils et actualités sur le numérique
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex justify-center gap-6 flex-wrap"
          >
            <div className="flex items-center gap-2 text-amber-400">
              <FiBookOpen className="w-5 h-5" />
              <span className="text-sm">{totalPosts} articles</span>
            </div>
            <div className="flex items-center gap-2 text-orange-400">
              <FiTrendingUp className="w-5 h-5" />
              <span className="text-sm">{featuredPosts} à la une</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}