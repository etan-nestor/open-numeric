'use client'

import { useTheme } from '@/components/context/ThemeContext'
import { BlogCard } from './BlogCard'
import type { BlogPost } from './types'

interface BlogGridProps {
  posts: BlogPost[]
  loading?: boolean
  onPostClick?: (post: BlogPost) => void
}

export function BlogGrid({ posts, loading = false, onPostClick }: BlogGridProps) {
  const { theme } = useTheme()

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse">
            <div className="h-48 bg-gray-300 dark:bg-gray-600" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
              <div className="flex gap-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16" />
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
          <span className="text-4xl">📝</span>
        </div>
        <h3 className={`text-xl font-bold ${getTextColor()} mb-2`}>Aucun article trouvé</h3>
        <p className={`${getTextColor()} opacity-70`}>
          Aucun article ne correspond à vos critères de recherche.
        </p>
      </div>
    )
  }

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div className="space-y-6">
      {featuredPost && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BlogCard post={featuredPost} index={0} featured onClick={onPostClick} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {remainingPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index + 1} onClick={onPostClick} />
        ))}
      </div>
    </div>
  )
}