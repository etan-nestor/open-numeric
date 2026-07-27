'use client'

import { useTheme } from '@/components/context/ThemeContext'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import type { ContactInfo } from './types'

const contactInfo: ContactInfo = {
  address: 'SOMGANDE, Ouagadougou, Burkina Faso',
  phone: ['+226 65 03 37 42', '+226 61 78 03 91'],
  email: ['tech00.02in@gmail.com', 'etannestor45@gmail.com'],
  workingHours: [
    { day: 'Lundi - Vendredi', hours: '08:00 - 18:00' },
    { day: 'Samedi', hours: '09:00 - 14:00' },
    { day: 'Dimanche', hours: 'Fermé' }
  ],
  socials: [
    {
      name: 'Facebook',
      icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
      url: 'https://facebook.com',
      color: 'text-blue-600'
    },
    {
      name: 'Twitter',
      icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
      url: 'https://twitter.com',
      color: 'text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
      url: 'https://linkedin.com',
      color: 'text-blue-700'
    },
    {
      name: 'Instagram',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
      url: 'https://instagram.com',
      color: 'text-pink-600'
    }
  ]
}

export function ContactInfo() {
  const { theme } = useTheme()

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

  return (
    <div className="space-y-6">
      {/* Coordonnées */}
      <div className={`p-6 rounded-2xl shadow-xl ${getCardBg()} border ${getBorderColor()}`}>
        <h2 className={`text-xl md:text-2xl font-bold mb-4 relative pb-2 ${getTextColor()}`}>
          Nos coordonnées
          <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"></span>
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 rounded-full bg-blue-500/10 text-blue-500 mt-0.5">
              <FiMapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${getTextColor()}`}>Adresse</h3>
              <p className={`text-sm ${getTextColor()}`}>{contactInfo.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 rounded-full bg-blue-500/10 text-blue-500 mt-0.5">
              <FiPhone className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${getTextColor()}`}>Téléphone</h3>
              {contactInfo.phone.map((phone, index) => (
                <p key={index} className={`text-sm ${getTextColor()}`}>{phone}</p>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 rounded-full bg-blue-500/10 text-blue-500 mt-0.5">
              <FiMail className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${getTextColor()}`}>Email</h3>
              {contactInfo.email.map((email, index) => (
                <p key={index} className={`text-sm ${getTextColor()}`}>{email}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Horaires et réseaux sociaux */}
      <div className={`p-6 rounded-2xl shadow-xl ${getCardBg()} border ${getBorderColor()}`}>
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 p-2 rounded-full bg-blue-500/10 text-blue-500 mt-0.5">
            <FiClock className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className={`text-sm font-semibold ${getTextColor()}`}>Horaires</h3>
            <ul className="space-y-1 mt-1">
              {contactInfo.workingHours.map((item, index) => (
                <li key={index} className={`flex justify-between text-sm ${getTextColor()}`}>
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="mt-4 pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
          <h3 className={`text-sm font-semibold mb-3 ${getTextColor()}`}>Suivez-nous</h3>
          <div className="flex flex-wrap gap-2">
            {contactInfo.socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} hover:bg-opacity-80 transition-all ${social.color}`}
                aria-label={social.name}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}