'use client'

import { useState, useEffect } from 'react'
import { FiX, FiStar } from 'react-icons/fi'
import type { Testimonial } from './types'

interface TestimonialsModalProps {
  isOpen: boolean
  onClose: () => void
  testimonial: Testimonial | null
  onSubmit: (data: any) => void
  loading?: boolean
}

export function TestimonialsModal({ isOpen, onClose, testimonial, onSubmit, loading }: TestimonialsModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    imageUrl: '',
    isVisible: true,
    isFeatured: false,
    projectId: '',
    order: 0,
  })

  const [hoverRating, setHoverRating] = useState<number | null>(null)

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name || '',
        position: testimonial.position || '',
        company: testimonial.company || '',
        content: testimonial.content || '',
        rating: testimonial.rating || 5,
        imageUrl: testimonial.imageUrl || '',
        isVisible: testimonial.isVisible !== undefined ? testimonial.isVisible : true,
        isFeatured: testimonial.isFeatured || false,
        projectId: testimonial.projectId || '',
        order: testimonial.order || 0,
      })
    } else {
      setFormData({
        name: '',
        position: '',
        company: '',
        content: '',
        rating: 5,
        imageUrl: '',
        isVisible: true,
        isFeatured: false,
        projectId: '',
        order: 0,
      })
    }
  }, [testimonial])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-200/30 dark:border-amber-700/30">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-amber-200/30 dark:border-amber-700/30 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-amber-900 dark:text-amber-50">
                  {testimonial ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
                </h2>
                <p className="text-sm text-amber-600/70 dark:text-amber-400/70">
                  {testimonial ? 'Mettez à jour les informations du témoignage' : 'Ajoutez un nouveau témoignage client'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors"
              >
                <FiX className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </button>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Poste */}
              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                  Poste <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Société */}
              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                  Société <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                  Note <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-1 p-2 bg-amber-50/50 dark:bg-amber-900/20 rounded-xl border border-amber-200/30 dark:border-amber-700/30">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <FiStar
                        className={`w-6 h-6 ${
                          star <= (hoverRating || formData.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-auto text-sm text-amber-600 dark:text-amber-400 font-medium">
                    {formData.rating}/5
                  </span>
                </div>
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                  URL de l'avatar
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {/* Contenu */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                  Témoignage <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-y"
                  placeholder="Le témoignage du client..."
                  required
                />
              </div>

              {/* Projet associé */}
              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                  Projet associé
                </label>
                <input
                  type="text"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="ID du projet (optionnel)"
                />
                <p className="text-xs text-amber-600/60 dark:text-amber-400/60 mt-1">
                  Laissez vide si non associé à un projet
                </p>
              </div>

              {/* Ordre */}
              <div>
                <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Checkboxes */}
              <div className="md:col-span-2 flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isVisible"
                    checked={formData.isVisible}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm text-amber-800 dark:text-amber-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Visible
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-amber-300 text-yellow-600 focus:ring-yellow-500"
                  />
                  <span className="text-sm text-amber-800 dark:text-amber-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    À la une
                  </span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-amber-200/30 dark:border-amber-700/30">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-amber-200/30 dark:border-amber-700/30 rounded-xl hover:bg-amber-50/50 dark:hover:bg-amber-900/20 transition-colors text-amber-700 dark:text-amber-300 font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 font-medium shadow-lg shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enregistrement...' : testimonial ? 'Mettre à jour' : 'Ajouter le témoignage'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}