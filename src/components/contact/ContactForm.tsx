'use client'

import { useState } from 'react'
import { useTheme } from '@/components/context/ThemeContext'
import type { ContactFormData } from './types'

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>
  loading?: boolean
}

export function ContactForm({ onSubmit, loading = false }: ContactFormProps) {
  const { theme } = useTheme()
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: ''
  })
  const [error, setError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [countdown, setCountdown] = useState(5)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await onSubmit(formData)
      // Afficher le modal de succès
      setShowSuccessModal(true)
      setCountdown(5)
      
      // Compte à rebours
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setShowSuccessModal(false)
            // Réinitialiser le formulaire
            setFormData({
              name: '',
              email: '',
              subject: '',
              message: '',
              phone: '',
              company: ''
            })
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
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

  const getCardBg = (): string => {
    switch (theme) {
      case 'light': return 'bg-gray-50'
      case 'violet-dark': return 'bg-violet-800/50'
      case 'pink-dark': return 'bg-pink-800/50'
      case 'blue-dark': return 'bg-blue-800/50'
      default: return 'bg-gray-800/50'
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

  const getInputClasses = (): string => {
    return `w-full px-3 py-2 rounded-lg border ${getBorderColor()} ${
      theme === 'light' ? 'bg-white' : 'bg-gray-800/20'
    } ${getTextColor()} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm`
  }

  return (
    <>
      <div className={`p-6 rounded-2xl shadow-xl ${getCardBg()} border ${getBorderColor()}`}>
        <h2 className={`text-xl md:text-2xl font-bold mb-4 relative pb-2 ${getTextColor()}`}>
          Envoyez-nous un message
          <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></span>
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="name" className={`block mb-1 text-sm font-medium ${getTextColor()}`}>
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={getInputClasses()}
                placeholder="Jean Dupont"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="email" className={`block mb-1 text-sm font-medium ${getTextColor()}`}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={getInputClasses()}
                placeholder="jean@example.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="phone" className={`block mb-1 text-sm font-medium ${getTextColor()}`}>
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={getInputClasses()}
                placeholder="+226 XX XX XX XX"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="company" className={`block mb-1 text-sm font-medium ${getTextColor()}`}>
                Société
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={getInputClasses()}
                placeholder="Nom de l'entreprise"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className={`block mb-1 text-sm font-medium ${getTextColor()}`}>
              Sujet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={getInputClasses()}
              placeholder="Demande de devis, Support technique, ..."
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="message" className={`block mb-1 text-sm font-medium ${getTextColor()}`}>
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className={getInputClasses()}
              placeholder="Décrivez votre projet ou votre demande..."
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi...
              </span>
            ) : (
              'Envoyer le message'
            )}
          </button>
        </form>
      </div>

      {/* Modal de succès */}
      {showSuccessModal && (
        <SuccessModal countdown={countdown} />
      )}
    </>
  )
}

// Composant SuccessModal
function SuccessModal({ countdown }: { countdown: number }) {
  const { theme } = useTheme()

  const getBgColor = (): string => {
    switch (theme) {
      case 'light': return 'bg-white'
      case 'violet-dark': return 'bg-violet-900'
      case 'pink-dark': return 'bg-pink-900'
      case 'blue-dark': return 'bg-blue-900'
      default: return 'bg-gray-900'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className={`relative max-w-md w-full rounded-2xl shadow-2xl p-8 text-center ${getBgColor()} border border-green-500/20`}>
        {/* Animation checkmark */}
        <div className="mx-auto w-20 h-20 mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-green-500 mb-2">
          Message envoyé !
        </h3>
        <p className="text-gray-400 mb-6">
          Nous vous répondrons dans les plus brefs délais.
        </p>

        {/* Compteur circulaire */}
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              className="text-gray-700"
              strokeWidth="3"
              stroke="currentColor"
              fill="transparent"
              r="28"
              cx="32"
              cy="32"
            />
            <circle
              className="text-green-500 transition-all duration-1000 ease-linear"
              strokeWidth="3"
              strokeDasharray={175.93}
              strokeDashoffset={175.93 * (1 - countdown / 5)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="28"
              cx="32"
              cy="32"
            />
          </svg>
          <span className="absolute text-xl font-bold text-white">
            {countdown}
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          Fermeture automatique dans {countdown} seconde{countdown > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}