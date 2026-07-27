'use client'

import { useState } from 'react'
import { useTheme } from '@/components/context/ThemeContext'
import { FiSearch, FiX, FiFilter } from 'react-icons/fi'
import type { BlogCategory, BlogTag } from './types'

interface BlogFiltersProps {
  categories: BlogCategory[]
  tags: BlogTag[]
  selectedCategory: string | null
  selectedTag: string | null
  searchQuery: string
  onCategoryChange: (categoryId: string | null) => void
  onTagChange: (tagId: string | null) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void
}

export function BlogFilters({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  searchQuery,
  onCategoryChange,
  onTagChange,
  onSearchChange,
  onClearFilters
}: BlogFiltersProps) {
  const { theme } = useTheme()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const getBorderColor = (): string => {
    switch (theme) {
      case 'light': return 'border-gray-200'
      case 'violet-dark': return 'border-violet-700'
      case 'pink-dark': return 'border-pink-700'
      case 'blue-dark': return 'border-blue-700'
      default: return 'border-gray-700'
    }
  }

  const getBgColor = (): string => {
    switch (theme) {
      case 'light': return 'bg-white'
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

  const hasActiveFilters = selectedCategory || selectedTag || searchQuery

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${getBorderColor()} ${getBgColor()} ${getTextColor()} focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all`}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border ${getBorderColor()} ${getBgColor()} ${getTextColor()}"
        >
          <FiFilter className="w-4 h-4" />
          <span>Filtres</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2.5 text-sm text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1"
          >
            <FiX className="w-4 h-4" />
            Effacer les filtres
          </button>
        )}
      </div>

      <div className="hidden sm:flex flex-wrap gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              !selectedCategory
                ? 'bg-amber-500 text-white'
                : `${getBgColor()} ${getTextColor()} hover:bg-amber-500/10`
            }`}
          >
            Tous
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id === selectedCategory ? null : category.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-amber-500 text-white'
                  : `${getBgColor()} ${getTextColor()} hover:bg-amber-500/10`
              }`}
              style={{
                borderColor: selectedCategory === category.id ? 'transparent' : category.color || '#e5e7eb'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className={`${isMobileFiltersOpen ? 'block' : 'hidden sm:block'}`}>
        <div className={`p-4 rounded-xl border ${getBorderColor()} ${getBgColor()} space-y-3`}>
          <p className={`text-sm font-medium ${getTextColor()}`}>Tags populaires</p>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 12).map((tag) => (
              <button
                key={tag.id}
                onClick={() => onTagChange(tag.id === selectedTag ? null : tag.id)}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  selectedTag === tag.id
                    ? 'bg-pink-500 text-white'
                    : `${getBgColor()} ${getTextColor()} hover:bg-pink-500/10`
                }`}
              >
                #{tag.name}
              </button>
            ))}
            {tags.length > 12 && (
              <span className="text-xs text-gray-500">+{tags.length - 12} autres</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}