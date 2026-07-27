'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'
import { useTheme } from '@/components/context/ThemeContext'
import {
  BlogHero,
  BlogGrid,
  BlogFilters,
  BlogPagination,
  BlogSidebar,
  BlogPostModal
} from '@/components/blog'
import type { BlogPost, BlogCategory, BlogTag } from '@/components/blog'

export default function BlogPage() {
  const { theme } = useTheme()
  const searchParams = useSearchParams()
  
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [tags, setTags] = useState<BlogTag[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const getBgColor = (): string => {
    switch (theme) {
      case 'light': return 'bg-white'
      case 'violet-dark': return 'bg-violet-900'
      case 'pink-dark': return 'bg-pink-900'
      case 'blue-dark': return 'bg-blue-900'
      default: return 'bg-gray-900'
    }
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('limit', '9')
      params.set('offset', ((currentPage - 1) * 9).toString())
      params.set('status', 'PUBLISHED')
      
      if (selectedCategory) params.set('categoryId', selectedCategory)
      if (selectedTag) params.set('tagId', selectedTag)
      if (searchQuery) params.set('search', searchQuery)

      const postsRes = await fetch(`/api/blog?${params.toString()}`)
      const postsData = await postsRes.json()
      
      if (postsData.success) {
        setPosts(postsData.data || [])
        setTotalPages(postsData.pagination?.pages || 1)
      }

      const categoriesRes = await fetch('/api/blog/categories')
      const categoriesData = await categoriesRes.json()
      if (categoriesData.success) {
        setCategories(categoriesData.data || [])
      }

      const tagsRes = await fetch('/api/blog/tags')
      const tagsData = await tagsRes.json()
      if (tagsData.success) {
        setTags(tagsData.data || [])
      }
    } catch (error) {
      console.error('Error fetching blog data:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, selectedCategory, selectedTag, searchQuery])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    if (category) {
      const found = categories.find(c => c.slug === category)
      if (found) setSelectedCategory(found.id)
    }
    if (tag) {
      const found = tags.find(t => t.slug === tag)
      if (found) setSelectedTag(found.id)
    }
  }, [searchParams, categories, tags])

  const openPostModal = (post: BlogPost) => {
    const index = posts.findIndex(p => p.id === post.id)
    setCurrentIndex(index >= 0 ? index : 0)
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setSelectedPost(posts[prevIndex])
    }
  }

  const goToNext = () => {
    if (currentIndex < posts.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setSelectedPost(posts[nextIndex])
    }
  }

  const handleClearFilters = () => {
    setSelectedCategory(null)
    setSelectedTag(null)
    setSearchQuery('')
    setCurrentPage(1)
  }

  const featuredPosts = posts.filter(p => p.isFeatured).length

  return (
    <div className={`min-h-screen ${getBgColor()}`}>
      <Head>
        <title>Blog - Open Numeric | Actualités et conseils</title>
        <meta name="description" content="Découvrez nos articles sur le développement web, le design, la transformation numérique et bien plus encore." />
      </Head>

      <BlogHero totalPosts={posts.length} featuredPosts={featuredPosts} />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <BlogFilters
                categories={categories}
                tags={tags}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
                searchQuery={searchQuery}
                onCategoryChange={(id) => {
                  setSelectedCategory(id)
                  setCurrentPage(1)
                }}
                onTagChange={(id) => {
                  setSelectedTag(id)
                  setCurrentPage(1)
                }}
                onSearchChange={(query) => {
                  setSearchQuery(query)
                  setCurrentPage(1)
                }}
                onClearFilters={handleClearFilters}
              />

              <div className="mt-6">
                <BlogGrid 
                  posts={posts} 
                  loading={loading}
                  onPostClick={openPostModal}
                />
              </div>

              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>

            <div className="lg:col-span-1">
              <BlogSidebar
                categories={categories}
                tags={tags}
                recentPosts={posts.slice(0, 5)}
                onPostClick={openPostModal}
              />
            </div>
          </div>
        </div>
      </section>

      <BlogPostModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedPost(null)
        }}
        post={selectedPost}
        onPrevious={goToPrevious}
        onNext={goToNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < posts.length - 1}
      />
    </div>
  )
}