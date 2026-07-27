'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@/components/context/ThemeContext'
import {
  FiX,
  FiCalendar,
  FiClock,
  FiEye,
  FiMessageSquare,
  FiUser,
  FiArrowLeft,
  FiShare2,
  FiBookmark,
  FiHeart,
  FiLink
} from 'react-icons/fi'
import type { BlogPost } from './types'

interface BlogPostModalProps {
  isOpen: boolean
  onClose: () => void
  post: BlogPost | null
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
}

export function BlogPostModal({
  isOpen,
  onClose,
  post,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false
}: BlogPostModalProps) {
  const { theme } = useTheme()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !post) return null

  const getBgColor = (): string => {
    switch (theme) {
      case 'light': return 'bg-white'
      case 'violet-dark': return 'bg-violet-900'
      case 'pink-dark': return 'bg-pink-900'
      case 'blue-dark': return 'bg-blue-900'
      default: return 'bg-gray-900'
    }
  }

  const getCardBg = (): string => {
    switch (theme) {
      case 'light': return 'bg-gray-50'
      case 'violet-dark': return 'bg-violet-800/30'
      case 'pink-dark': return 'bg-pink-800/30'
      case 'blue-dark': return 'bg-blue-800/30'
      default: return 'bg-gray-800/30'
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

  const getBorderColor = (): string => {
    switch (theme) {
      case 'light': return 'border-gray-200'
      case 'violet-dark': return 'border-violet-700'
      case 'pink-dark': return 'border-pink-700'
      case 'blue-dark': return 'border-blue-700'
      default: return 'border-gray-700'
    }
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `${window.location.origin}/blog/${post.slug}`
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      const url = `${window.location.origin}/blog/${post.slug}`
      await navigator.clipboard.writeText(url)
      alert('Lien copié dans le presse-papier !')
    }
  }

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/blog/${post.slug}`
    await navigator.clipboard.writeText(url)
    alert('Lien copié dans le presse-papier !')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${getBgColor()} border ${getBorderColor()}`}
            >
              <button
                onClick={onClose}
                className="sticky top-4 z-10 float-right m-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>

              <div className="px-6 pb-6 pt-0">
                {post.image && (
                  <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden -mt-2">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {post.isFeatured && (
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                          ⭐ À la une
                        </span>
                      )}
                      {post.category && (
                        <span
                          className="px-3 py-1 text-xs font-medium rounded-full shadow-lg"
                          style={{
                            backgroundColor: post.category.color || '#f59e0b',
                            color: '#fff'
                          }}
                        >
                          {post.category.name}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${getTextColor()}`}>
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
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
                      <span className={`font-medium ${getTextColor()}`}>
                        {post.author.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>{getReadTime(post.readTime)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FiEye className="w-4 h-4" />
                      <span>{post.views} vues</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FiMessageSquare className="w-4 h-4" />
                      <span>{post._count?.comments || 0} commentaires</span>
                    </div>
                  </div>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 rounded-full text-xs bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 transition-colors cursor-pointer"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className={`mt-6 prose prose-lg max-w-none ${getTextColor()}`}>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <div className={`mt-8 pt-6 border-t ${getBorderColor()} flex flex-wrap items-center justify-between gap-4`}>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isLiked
                          ? 'bg-red-500/10 text-red-500'
                          : `${getCardBg()} ${getTextColor()} hover:bg-red-500/10`
                      }`}
                    >
                      <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                      <span className="text-sm">Aimer</span>
                    </button>

                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isBookmarked
                          ? 'bg-amber-500/10 text-amber-500'
                          : `${getCardBg()} ${getTextColor()} hover:bg-amber-500/10`
                      }`}
                    >
                      <FiBookmark className={`w-5 h-5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                      <span className="text-sm">Enregistrer</span>
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${getCardBg()} ${getTextColor()} hover:bg-amber-500/10`}
                      >
                        <FiShare2 className="w-5 h-5" />
                        <span className="text-sm">Partager</span>
                      </button>

                      {showShareMenu && (
                        <div className={`absolute top-full mt-2 right-0 p-2 rounded-xl shadow-xl border ${getBorderColor()} ${getBgColor()} min-w-[200px]`}>
                          <button
                            onClick={handleShare}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-amber-500/10 transition-colors text-sm"
                          >
                            <FiShare2 className="w-4 h-4" />
                            Partager
                          </button>
                          <button
                            onClick={handleCopyLink}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-amber-500/10 transition-colors text-sm"
                          >
                            <FiLink className="w-4 h-4" />
                            Copier le lien
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {hasPrevious && (
                      <button
                        onClick={onPrevious}
                        className="px-4 py-2 rounded-lg border ${getBorderColor()} ${getCardBg()} ${getTextColor()} hover:bg-amber-500/10 transition-colors flex items-center gap-2 text-sm"
                      >
                        <FiArrowLeft className="w-4 h-4" />
                        Précédent
                      </button>
                    )}
                    {hasNext && (
                      <button
                        onClick={onNext}
                        className="px-4 py-2 rounded-lg border ${getBorderColor()} ${getCardBg()} ${getTextColor()} hover:bg-amber-500/10 transition-colors flex items-center gap-2 text-sm"
                      >
                        Suivant
                        <FiArrowLeft className="w-4 h-4 rotate-180" />
                      </button>
                    )}
                  </div>
                </div>

                <div className={`mt-8 pt-6 border-t ${getBorderColor()}`}>
                  <h3 className={`text-lg font-bold ${getTextColor()} mb-4 flex items-center gap-2`}>
                    <FiMessageSquare className="w-5 h-5 text-amber-500" />
                    Commentaires ({post._count?.comments || 0})
                  </h3>
                  <div className={`p-6 rounded-xl ${getCardBg()} border ${getBorderColor()} text-center`}>
                    <p className={`text-sm ${getTextColor()} opacity-70`}>
                      La section commentaires est en cours de développement.
                    </p>
                    <p className={`text-xs ${getTextColor()} opacity-50 mt-2`}>
                      Revenez bientôt pour interagir avec la communauté !
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}