'use client'

import { useState, useEffect } from 'react'
import {
  FiSave,
  FiGlobe,
  FiMail,
  FiUsers,
  FiLock,
  FiImage,
  FiCode,
  FiShare2,
  FiMapPin,
  FiPhone,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw
} from 'react-icons/fi'

interface Settings {
  // Général
  siteName: string
  siteDescription: string
  siteLogo: string
  favicon: string

  // Contact
  contactEmail: string
  contactPhone: string
  address: string
  workingHours: string

  // Réseaux sociaux
  facebook: string
  twitter: string
  linkedin: string
  instagram: string
  youtube: string
  github: string

  // SEO
  metaTitle: string
  metaDescription: string
  metaKeywords: string

  // Newsletter
  newsletterEnabled: boolean
  newsletterApiKey: string

  // Analytics
  googleAnalyticsId: string
}

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Open Numeric',
    siteDescription: 'Solutions numériques complètes pour entreprises',
    siteLogo: '',
    favicon: '',
    contactEmail: 'tech00.02in@gmail.com',
    contactPhone: '+226 65 03 37 42',
    address: 'SOMGANDE, Ouagadougou, Burkina Faso',
    workingHours: 'Lun - Ven: 8h00 - 18h00',
    facebook: 'https://facebook.com/opennumeric',
    twitter: 'https://twitter.com/opennumeric',
    linkedin: 'https://linkedin.com/company/opennumeric',
    instagram: 'https://instagram.com/opennumeric',
    youtube: '',
    github: 'https://github.com/opennumeric',
    metaTitle: 'Open Numeric - Solutions numériques',
    metaDescription: 'Solutions numériques complètes pour entreprises au Burkina Faso',
    metaKeywords: 'informatique, numérique, développement, Burkina Faso',
    newsletterEnabled: true,
    newsletterApiKey: '',
    googleAnalyticsId: '',
  })

  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Erreur lors de la sauvegarde des paramètres')
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'general', label: 'Général', icon: FiGlobe },
    { id: 'contact', label: 'Contact', icon: FiMail },
    { id: 'social', label: 'Réseaux sociaux', icon: FiShare2 },
    { id: 'seo', label: 'SEO', icon: FiCode },
    { id: 'newsletter', label: 'Newsletter', icon: FiMail },
    { id: 'analytics', label: 'Analytics', icon: FiClock },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">
            Paramètres
          </h1>
          <p className="text-sm text-gray-600/70 dark:text-gray-400/70 mt-1">
            Gérez la configuration du site
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${saved
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30'
              }`}
          >
            {saving ? (
              <>
                <FiRefreshCw className="w-5 h-5 animate-spin" />
                Sauvegarde...
              </>
            ) : saved ? (
              <>
                <FiCheckCircle className="w-5 h-5" />
                Sauvegardé !
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5" />
                Sauvegarder
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 pb-2 border-b border-gray-200/30 dark:border-gray-700/30">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${isActive
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-sm">
        <div className="p-6">
          {activeTab === 'general' && <GeneralSettings settings={settings} setSettings={setSettings} />}
          {activeTab === 'contact' && <ContactSettings settings={settings} setSettings={setSettings} />}
          {activeTab === 'social' && <SocialSettings settings={settings} setSettings={setSettings} />}
          {activeTab === 'seo' && <SeoSettings settings={settings} setSettings={setSettings} />}
          {activeTab === 'newsletter' && <NewsletterSettings settings={settings} setSettings={setSettings} />}
          {activeTab === 'analytics' && <AnalyticsSettings settings={settings} setSettings={setSettings} />}
        </div>
      </div>
    </div>
  )
}

// ============================================
// Sous-composants des onglets
// ============================================

function GeneralSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Informations générales</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Configurez les informations principales du site</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Nom du site <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Description du site
          </label>
          <textarea
            rows={3}
            value={settings.siteDescription}
            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Logo URL
          </label>
          <input
            type="url"
            value={settings.siteLogo}
            onChange={(e) => setSettings({ ...settings, siteLogo: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Favicon URL
          </label>
          <input
            type="url"
            value={settings.favicon}
            onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/favicon.ico"
          />
        </div>
      </div>
    </div>
  )
}

function ContactSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Informations de contact</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Configurez les coordonnées de contact</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <FiMail className="inline mr-1.5" />
            Email de contact <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <FiPhone className="inline mr-1.5" />
            Téléphone
          </label>
          <input
            type="text"
            value={settings.contactPhone}
            onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <FiMapPin className="inline mr-1.5" />
            Adresse
          </label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <FiClock className="inline mr-1.5" />
            Horaires d'ouverture
          </label>
          <input
            type="text"
            value={settings.workingHours}
            onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Lun - Ven: 8h00 - 18h00"
          />
        </div>
      </div>
    </div>
  )
}

function SocialSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Réseaux sociaux</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Configurez les liens vers vos réseaux sociaux</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <span className="text-blue-600">f</span> Facebook
          </label>
          <input
            type="url"
            value={settings.facebook}
            onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://facebook.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <span className="text-sky-400">𝕏</span> Twitter
          </label>
          <input
            type="url"
            value={settings.twitter}
            onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://twitter.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <span className="text-blue-700">in</span> LinkedIn
          </label>
          <input
            type="url"
            value={settings.linkedin}
            onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/company/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <span className="text-pink-600">📷</span> Instagram
          </label>
          <input
            type="url"
            value={settings.instagram}
            onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://instagram.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <span className="text-red-600">▶</span> YouTube
          </label>
          <input
            type="url"
            value={settings.youtube}
            onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://youtube.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            <span className="text-gray-800 dark:text-gray-200">🐙</span> GitHub
          </label>
          <input
            type="url"
            value={settings.github}
            onChange={(e) => setSettings({ ...settings, github: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://github.com/..."
          />
        </div>
      </div>
    </div>
  )
}

function SeoSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Paramètres SEO</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Optimisez le référencement du site</p>

      <div className="grid grid-cols-1 gap-4 pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Meta Title
          </label>
          <input
            type="text"
            value={settings.metaTitle}
            onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Recommandé: 50-60 caractères
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Meta Description
          </label>
          <textarea
            rows={2}
            value={settings.metaDescription}
            onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Recommandé: 150-160 caractères
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Meta Keywords
          </label>
          <input
            type="text"
            value={settings.metaKeywords}
            onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="mot-clé1, mot-clé2, mot-clé3"
          />
        </div>
      </div>
    </div>
  )
}

function NewsletterSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Configuration Newsletter</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Configurez les paramètres de la newsletter</p>

      <div className="grid grid-cols-1 gap-4 pt-4">
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/30 rounded-xl border border-gray-200/30 dark:border-gray-700/30">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={settings.newsletterEnabled}
              onChange={(e) => setSettings({ ...settings, newsletterEnabled: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
              Activer la newsletter
            </span>
          </label>
          {settings.newsletterEnabled ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              <FiCheckCircle className="w-3 h-3" />
              Actif
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400">
              <FiAlertCircle className="w-3 h-3" />
              Inactif
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Clé API (Mailchimp, Sendinblue, etc.)
          </label>
          <input
            type="password"
            value={settings.newsletterApiKey}
            onChange={(e) => setSettings({ ...settings, newsletterApiKey: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Votre clé API"
          />
        </div>
      </div>
    </div>
  )
}

function AnalyticsSettings({ settings, setSettings }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Analytics</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Configurez les outils d'analyse</p>

      <div className="grid grid-cols-1 gap-4 pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Google Analytics ID
          </label>
          <input
            type="text"
            value={settings.googleAnalyticsId}
            onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200/30 dark:border-gray-700/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="G-XXXXXXXXXX"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Format: G-XXXXXXXXXX (Google Analytics 4)
          </p>
        </div>

        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200/30 dark:border-amber-700/30">
          <div className="flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <span className="font-medium">Note:</span> Les données d'analyse seront disponibles après
                l'activation du tracking sur le site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}