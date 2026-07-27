'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/components/context/ThemeContext'
import { FiClock, FiEye, FiMessageSquare, FiCalendar } from 'react-icons/fi'
import type { BlogPost } from './types'

interface BlogCardProps {
  post: BlogPost
  index: number
  featured?: boolean
  onClick?: (post: BlogPost) => void
}

export function BlogCard({ post, index, featured = false, onClick }: BlogCardProps) {
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
      case 'light': return 'text-gray-700'
      case 'violet-dark': return 'text-violet-100'
      case 'pink-dark': return 'text-pink-100'
      case 'blue-dark': return 'text-blue-100'
      default: return 'text-gray-300'
    }
  }

  const getCardClasses = (): string => {
    const base = `group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border ${getBorderColor()} ${getCardBg()} hover:-translate-y-1`
    return featured ? `${base} lg:col-span-2 lg:row-span-2` : base
  }

  const formatDate = (date: string | null) => {
    if (!date) return 'Date inconnue'
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const getReadTime = (minutes: number | null) => {
    if (!minutes) return 'Lecture'
    if (minutes < 1) return 'Moins d\'1 min'
    if (minutes === 1) return '1 min de lecture'
    return `${minutes} min de lecture`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={getCardClasses()}
    >
      <div onClick={() => onClick?.(post)} className="cursor-pointer">
        <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
              <FiBookOpen className="w-16 h-16 text-amber-500/40" />
            </div>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 text-[10px] font-medium bg-black/60 backdrop-blur-sm text-white rounded-full"
                >
                  #{tag.name}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="px-2 py-1 text-[10px] font-medium bg-black/60 backdrop-blur-sm text-white rounded-full">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {post.isFeatured && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
              ⭐ À la une
            </div>
          )}
        </div>

        <div className="p-5 md:p-6">
          {post.category && (
            <div className="mb-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: post.category.color || '#f59e0b',
                  color: '#fff'
                }}
              >
                {post.category.name}
              </span>
            </div>
          )}

          <h3 className={`text-xl md:text-2xl font-bold mb-2 line-clamp-2 ${getTextColor()} group-hover:text-amber-500 transition-colors`}>
            {post.title}
          </h3>

          <p className={`text-sm ${getTextColor()} opacity-70 line-clamp-3 mb-4`}>
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <FiCalendar className="w-3.5 h-3.5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="w-3.5 h-3.5" />
              <span>{getReadTime(post.readTime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye className="w-3.5 h-3.5" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiMessageSquare className="w-3.5 h-3.5" />
              <span>{post._count?.comments || 0}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200/30 dark:border-gray-700/30 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-bold">
                  {post.author.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {post.author.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}