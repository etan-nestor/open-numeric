'use client'

import { useState, useEffect } from 'react'
import { FiX, FiUser, FiMail, FiPhone, FiBriefcase, FiCalendar, FiLink } from 'react-icons/fi'
import type { TeamMember } from './types'
import {SocialInput} from './SocialInput'

interface TeamModalProps {
  isOpen: boolean
  onClose: () => void
  member: TeamMember | null
  onSubmit: (data: any) => void
  loading?: boolean
}

export function TeamModal({ isOpen, onClose, member, onSubmit, loading }: TeamModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    imageUrl: '',
    email: '',
    phone: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
    github: '',
    portfolio: '',
    order: 0,
    isVisible: true,
    isCore: false,
    joinedAt: '',
  })

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        position: member.position || '',
        bio: member.bio || '',
        imageUrl: member.imageUrl || '',
        email: member.email || '',
        phone: member.phone || '',
        linkedin: member.linkedin || '',
        twitter: member.twitter || '',
        facebook: member.facebook || '',
        instagram: member.instagram || '',
        github: member.github || '',
        portfolio: member.portfolio || '',
        order: member.order || 0,
        isVisible: member.isVisible !== undefined ? member.isVisible : true,
        isCore: member.isCore || false,
        joinedAt: member.joinedAt ? new Date(member.joinedAt).toISOString().split('T')[0] : '',
      })
    } else {
      setFormData({
        name: '',
        position: '',
        bio: '',
        imageUrl: '',
        email: '',
        phone: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: '',
        github: '',
        portfolio: '',
        order: 0,
        isVisible: true,
        isCore: false,
        joinedAt: '',
      })
    }
  }, [member])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      joinedAt: formData.joinedAt ? new Date(formData.joinedAt) : null,
    })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/30 dark:border-gray-700/30">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-200/30 dark:border-gray-700/30 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                  {member ? 'Modifier le membre' : 'Ajouter un membre'}
                </h2>
                <p className="text-sm text-gray-600/70 dark:text-gray-400/70">
                  {member ? 'Mettez à jour les informations du membre' : 'Ajoutez un nouveau membre à l\'équipe'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nom */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Poste */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Poste <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
                />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  URL de l'image
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Téléphone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Date d'arrivée */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Date d'arrivée
                </label>
                <input
                  type="date"
                  name="joinedAt"
                  value={formData.joinedAt}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Ordre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Réseaux sociaux */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Réseaux sociaux
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SocialInput
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn URL"
                    icon={FiLink}
                  />
                  <SocialInput
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="Twitter URL"
                    icon={FiLink}
                  />
                  <SocialInput
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                    icon={FiLink}
                  />
                  <SocialInput
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                    icon={FiLink}
                  />
                  <SocialInput
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="GitHub URL"
                    icon={FiLink}
                  />
                  <SocialInput
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="Portfolio URL"
                    icon={FiLink}
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="md:col-span-2 flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isVisible"
                    checked={formData.isVisible}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                    Visible
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isCore"
                    checked={formData.isCore}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                    Membre clé
                  </span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200/30 dark:border-gray-700/30">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-200/30 dark:border-gray-700/30 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-gray-700 dark:text-gray-300 font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enregistrement...' : member ? 'Mettre à jour' : 'Ajouter le membre'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
