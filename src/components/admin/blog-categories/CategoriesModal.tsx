'use client'

import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import type { BlogCategory } from './types'

interface CategoriesModalProps {
  isOpen: boolean
  onClose: () => void
  category: BlogCategory | null
  categories: BlogCategory[]
  onSubmit: (data: any) => void
  loading?: boolean
}

const PRESET_COLORS = [
  '#10b981', // Emerald
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#6366f1', // Indigo
]

export function CategoriesModal({ 
  isOpen, 
  onClose, 
  category, 
  categories,
  onSubmit, 
  loading 
}: CategoriesModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '',
    icon: '',
    parentId: '',
  })

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        color: category.color || '',
        icon: category.icon || '',
        parentId: category.parentId || '',
      })
    } else {
      setFormData({
        name: '',
        slug: '',
        description: '',
        color: '',
        icon: '',
        parentId: '',
      })
    }
  }, [category])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const availableParents = categories.filter(c => c.id !== category?.id)

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-emerald-200/30 dark:border-emerald-700/30">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-emerald-200/30 dark:border-emerald-700/30 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-50">
                  {category ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
                </h2>
                <p className="text-sm text-emerald-600/70 dark:text-emerald-400/70">
                  {category ? 'Mettez à jour les informations' : 'Ajoutez une nouvelle catégorie'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 transition-colors"
              >
                <FiX className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1.5">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200/30 dark:border-emerald-700/30 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Nom de la catégorie"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1.5">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200/30 dark:border-emerald-700/30 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="nom-categorie"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200/30 dark:border-emerald-700/30 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-y"
                placeholder="Description de la catégorie"
              />
            </div>

            {/* Catégorie parente */}
            <div>
              <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1.5">
                Catégorie parente
              </label>
              <select
                name="parentId"
                value={formData.parentId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200/30 dark:border-emerald-700/30 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Aucune</option>
                {availableParents.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Icône */}
            <div>
              <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1.5">
                Icône (emoji)
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200/30 dark:border-emerald-700/30 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="📁, 🔥, etc."
                maxLength={2}
              />
            </div>

            {/* Couleur */}
            <div>
              <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1.5">
                Couleur
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      formData.color === color 
                        ? 'border-emerald-600 scale-110' 
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full h-10 rounded-xl cursor-pointer bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-200/30 dark:border-emerald-700/30"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-emerald-200/30 dark:border-emerald-700/30">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-emerald-200/30 dark:border-emerald-700/30 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors text-emerald-700 dark:text-emerald-300 font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 font-medium shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enregistrement...' : category ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}