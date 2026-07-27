/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Project } from '@prisma/client'
import { FiPlus, FiX, FiImage, FiLink, FiCalendar, FiTag } from 'react-icons/fi'

type PortfolioProject = Project & {
  technologies?: Array<string | { name?: string }>
}

interface PortfolioFormProps {
  project?: PortfolioProject | null
  onSubmit: (data: any) => void
  onCancel: () => void
  loading?: boolean
}

const PROJECT_CATEGORIES = [
  { value: 'WEB', label: 'Site Web / Application Web' },
  { value: 'MOBILE', label: 'Application Mobile' },
  { value: 'SOFTWARE', label: 'Logiciel' },
  { value: 'API_REST', label: 'API REST' },
  { value: 'TRAINING', label: 'Formation' },
  { value: 'DESIGN', label: 'Design' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'HARDWARE', label: 'Matériel' },
] as const

const CLIENT_TYPES = [
  { value: 'ENTERPRISE', label: 'Entreprise' },
  { value: 'INDIVIDUAL', label: 'Particulier' },
  { value: 'STARTUP', label: 'Startup' },
  { value: 'NGO', label: 'ONG / Association' },
] as const

export function PortfolioForm({ project, onSubmit, onCancel, loading }: PortfolioFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'WEB',
    clientType: 'ENTERPRISE',
    imageUrl: '',
    isPublished: false,
    url: '',
    isCompleted: true,
    startDate: '',
    endDate: '',
    technologies: [] as string[],
  })

  const [newTechnology, setNewTechnology] = useState('')

  useEffect(() => {
    if (project) {
      const techNames = Array.isArray(project.technologies) 
        ? project.technologies.map((tech: any) => 
            typeof tech === 'string' ? tech : tech.name || tech
          )
        : []
      
      const formatDate = (date: any) => {
        if (!date) return ''
        const d = new Date(date)
        return d.toISOString().split('T')[0]
      }
      
      setFormData({
        title: project.title || '',
        slug: project.slug || '',
        description: project.description || '',
        category: project.category || 'WEB',
        clientType: project.clientType || 'ENTERPRISE',
        imageUrl: project.imageUrl || '',
        isPublished: project.isPublished || false,
        url: project.url || '',
        isCompleted: project.isCompleted !== undefined ? project.isCompleted : true,
        startDate: formatDate(project.startDate),
        endDate: formatDate(project.endDate),
        technologies: techNames,
      })
    }
  }, [project])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleAddTechnology = () => {
    const techName = newTechnology.trim()
    if (techName && !formData.technologies.includes(techName)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techName],
      }))
      setNewTechnology('')
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Grille */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colonne gauche */}
        <div className="space-y-4">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
              Titre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="Nom du projet"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="mon-projet-slug"
              required
            />
            <p className="text-xs text-amber-600/60 dark:text-amber-400/60 mt-1">
              Utilisé dans l'URL, uniquement des lettres, chiffres et tirets
            </p>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            >
              {PROJECT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
              Type de client <span className="text-red-500">*</span>
            </label>
            <select
              name="clientType"
              value={formData.clientType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            >
              {CLIENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
              URL de l'image <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-4">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-y"
              placeholder="Description détaillée du projet..."
              required
            />
          </div>

          {/* URL du projet */}
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
              URL du projet
            </label>
            <div className="relative">
              <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="https://mon-projet.com"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                <FiCalendar className="inline mr-1.5 text-amber-400" />
                Date de début
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
                <FiCalendar className="inline mr-1.5 text-amber-400" />
                Date de fin
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-amber-900 dark:text-amber-100 mb-1.5">
              <FiTag className="inline mr-1.5 text-amber-400" />
              Technologies
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-700/30 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Ajouter une technologie"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTechnology()
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddTechnology}
                className="px-4 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors flex items-center gap-1.5"
              >
                <FiPlus className="w-4 h-4" />
                Ajouter
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech) => (
                <span
                  key={tech}
                  className="group flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 transition-colors"
                  >
                    <FiX className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-6 pt-2">
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-sm text-amber-800 dark:text-amber-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Publié
          </span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            name="isCompleted"
            checked={formData.isCompleted}
            onChange={handleChange}
            className="w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-sm text-amber-800 dark:text-amber-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Terminé
          </span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-amber-200/30 dark:border-amber-700/30">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-amber-200/30 dark:border-amber-700/30 rounded-xl hover:bg-amber-50/50 dark:hover:bg-amber-900/20 transition-colors text-amber-700 dark:text-amber-300 font-medium"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 font-medium shadow-lg shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Enregistrement...
            </span>
          ) : (
            project ? 'Mettre à jour' : 'Créer le projet'
          )}
        </button>
      </div>
    </form>
  )
}