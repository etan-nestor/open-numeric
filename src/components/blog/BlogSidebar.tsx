'use client'

import { useTheme } from '@/components/context/ThemeContext'
import { FiTag, FiFolder, FiClock } from 'react-icons/fi'
import type { BlogCategory, BlogTag, BlogPost } from './types'

interface BlogSidebarProps {
  categories: BlogCategory[]
  tags: BlogTag[]
  recentPosts: BlogPost[]
  onPostClick?: (post: BlogPost) => void
}

export function BlogSidebar({ categories, tags, recentPosts, onPostClick }: BlogSidebarProps) {
  const { theme } = useTheme()

  const getBgColor = (): string => {
    switch (theme) {
      case 'light': return 'bg-white'
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

  return (
    <div className="space-y-6">
      <div className={`p-5 rounded-2xl border ${getBorderColor()} ${getBgColor()}`}>
        <h3 className={`font-bold mb-3 flex items-center gap-2 ${getTextColor()}`}>
          <FiFolder className="text-amber-500" />
          Catégories
        </h3>
        <div className="space-y-2">
          {categories.slice(0, 8).map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-amber-500/10 transition-colors cursor-pointer"
            >
              <span className={`text-sm ${getTextColor()}`}>{category.name}</span>
              <span className="text-xs text-gray-500">{category.posts?.length || 0}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-5 rounded-2xl border ${getBorderColor()} ${getBgColor()}`}>
        <h3 className={`font-bold mb-3 flex items-center gap-2 ${getTextColor()}`}>
          <FiTag className="text-pink-500" />
          Tags populaires
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 15).map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 rounded-full text-xs bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 transition-colors cursor-pointer"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      <div className={`p-5 rounded-2xl border ${getBorderColor()} ${getBgColor()}`}>
        <h3 className={`font-bold mb-3 flex items-center gap-2 ${getTextColor()}`}>
          <FiClock className="text-orange-500" />
          Articles récents
        </h3>
        <div className="space-y-3">
          {recentPosts.slice(0, 5).map((post) => (
            <div
              key={post.id}
              onClick={() => onPostClick?.(post)}
              className="block py-2 px-2 rounded-lg hover:bg-amber-500/10 transition-colors cursor-pointer"
            >
              <p className={`text-sm font-medium ${getTextColor()} line-clamp-2`}>
                {post.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR') : 'Date inconnue'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}