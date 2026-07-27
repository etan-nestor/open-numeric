'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/components/context/ThemeContext'

export function AboutHero() {
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
    <section className={`relative pt-32 pb-20 overflow-hidden ${getBgColor()}`}>
      {/* Fond animé */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 opacity-10 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
        
        {/* Cercles décoratifs animés */}
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3, 
              type: 'spring', 
              stiffness: 200,
              damping: 15
            }}
            className="inline-block mb-6"
          >
            <div className="relative">
              {/* Effet glow animé */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 blur-2xl opacity-40 animate-pulse" />
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 blur-xl opacity-30 animate-pulse delay-500" />
              
              {/* Logo */}
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden shadow-2xl shadow-blue-500/30 border-2 border-blue-500/20 hover:scale-105 transition-transform duration-300 hover:shadow-blue-500/50">
                <Image
                  src="/images/logo.jpg"
                  alt="Open Numeric Logo"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
              À propos d'Open Numeric
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`text-xl md:text-2xl max-w-3xl mx-auto ${getTextColor()}`}
          >
            Innover pour transformer le numérique en Afrique
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex justify-center gap-4 flex-wrap"
          >
            <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20 backdrop-blur-sm">
              🚀 Innovation
            </span>
            <span className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/20 backdrop-blur-sm">
              💡 Expertise
            </span>
            <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm border border-emerald-500/20 backdrop-blur-sm">
              🌍 Impact
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}