'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@/components/context/ThemeContext'
import type { Project } from './types'

interface PortfolioProjectsProps {
  category: string
}

const categoryLabels: Record<string, string> = {
  WEB: 'Développement Web',
  MOBILE: 'Développement Mobile',
  SOFTWARE: 'Logiciels & API',
  DESIGN: 'Design Graphique',
  TRAINING: 'Formations',
  MAINTENANCE: 'Maintenance',
  SALES: 'Vente de Matériel'
}

export function PortfolioProjects({ category }: PortfolioProjectsProps) {
  const { theme } = useTheme()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const url = category 
          ? `/api/portfolio?category=${category}&isPublished=true&includeAll=false`
          : '/api/portfolio?isPublished=true&includeAll=false'
        const response = await fetch(url)
        const data = await response.json()
        if (data.success) {
          setProjects(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [category])

  const getCardBg = (): string => {
    switch (theme) {
      case 'light': return 'bg-gray-50'
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
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 ${getTextColor()}`}>
            Projets {categoryLabels[category] || ''}
          </h2>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    )
  }

  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('projects-container')
    if (container) {
      container.scrollLeft += direction === 'left' ? -300 : 300
    }
  }

  const categoryName = categoryLabels[category] || category

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-2xl md:text-3xl font-bold mb-8 ${getTextColor()}`}
        >
          Projets {categoryName}
        </motion.h2>

        <div className="relative">
          {projects.length > 0 ? (
            <>
              {/* Scroll left button */}
              <div className="absolute inset-y-0 left-0 flex items-center z-10">
                <button
                  className="p-2 rounded-full bg-black/10 backdrop-blur-sm text-white"
                  onClick={() => handleScroll('left')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              <div
                id="projects-container"
                className="overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex space-x-6 w-max px-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`w-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl ${getCardBg()} border ${getBorderColor()} snap-start`}
                    >
                      <div className="aspect-video relative">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 320px"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className={`mb-4 opacity-90 ${getTextColor()}`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full"
                            >
                              {tech.name}
                            </span>
                          ))}
                          {project.technologies?.length > 4 && (
                            <span className="px-3 py-1 bg-gray-500/10 text-gray-500 text-xs rounded-full">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                        {project.url && (
                          <Link
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block text-sm text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            Voir le projet →
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Scroll right button */}
              <div className="absolute inset-y-0 right-0 flex items-center z-10">
                <button
                  className="p-2 rounded-full bg-black/10 backdrop-blur-sm text-white"
                  onClick={() => handleScroll('right')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className={`text-center py-16 rounded-xl ${getCardBg()} ${getBorderColor()} border`}>
              <p className="text-xl opacity-80">Aucun projet disponible pour cette catégorie pour le moment.</p>
              <Link
                href="/contact"
                className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Nous contacter
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}