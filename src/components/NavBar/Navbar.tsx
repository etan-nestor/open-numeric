'use client'

import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { usePathname } from 'next/navigation';

const logo = require('../../images/logo.jpg');

export default function Navbar() {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isHoveringTheme, setIsHoveringTheme] = useState(false);
  const pathname = usePathname();

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  // Effet pour fermer les menus quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.theme-selector')) {
        setIsThemeMenuOpen(false);
      }
      if (!(event.target as Element).closest('.mobile-menu')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Couleurs des thèmes pour le sélecteur
  const themes = [
    { name: 'light', color: 'bg-yellow-200', text: 'text-yellow-400' },
    { name: 'dark', color: 'bg-gray-900', text: 'text-gray-400' },
    { name: 'violet-dark', color: 'bg-violet-900', text: 'text-violet-400' },
    { name: 'pink-dark', color: 'bg-pink-900', text: 'text-pink-400' },
    { name: 'blue-dark', color: 'bg-blue-900', text: 'text-blue-400' },
  ];

  // Fonction pour obtenir les classes en fonction du thème
  const getNavbarClasses = () => {
    const baseClasses = "sticky top-0 z-50 border-b shadow-2xl";
    
    switch(theme) {
      case 'light':
        return `${baseClasses} bg-white border-gray-200 text-gray-900`;
      case 'violet-dark':
        return `${baseClasses} bg-violet-900 border-violet-800 text-violet-100`;
      case 'pink-dark':
        return `${baseClasses} bg-pink-900 border-pink-800 text-pink-100`;
      case 'blue-dark':
        return `${baseClasses} bg-blue-900 border-blue-800 text-blue-100`;
      default: // dark
        return `${baseClasses} bg-gray-900 border-gray-800 text-gray-100`;
    }
  };

  const getNavLinkClasses = (path: string) => {
    const isActive = pathname === path;
    const activeClasses = isActive 
      ? 'bg-orange-500/20 border-l-4 border-orange-500' 
      : '';

    switch(theme) {
      case 'light':
        return `${activeClasses} text-gray-900 hover:text-gray-900 hover:bg-gray-100`;
      case 'violet-dark':
        return `${activeClasses} text-violet-200 hover:text-white hover:bg-violet-800`;
      case 'pink-dark':
        return `${activeClasses} text-pink-200 hover:text-white hover:bg-pink-800`;
      case 'blue-dark':
        return `${activeClasses} text-blue-200 hover:text-white hover:bg-blue-800`;
      default: // dark
        return `${activeClasses} text-gray-300 hover:text-white hover:bg-gray-800`;
    }
  };

  const getDropdownClasses = () => {
    switch(theme) {
      case 'light':
        return "bg-white border-gray-200 text-gray-900";
      case 'violet-dark':
        return "bg-violet-800 border-violet-700 text-violet-100";
      case 'pink-dark':
        return "bg-pink-800 border-pink-700 text-pink-100";
      case 'blue-dark':
        return "bg-blue-800 border-blue-700 text-blue-100";
      default: // dark
        return "bg-gray-800 border-gray-700 text-gray-300";
    }
  };

  const getButtonGradient = () => {
    switch(theme) {
      case 'violet-dark':
        return "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700";
      case 'pink-dark':
        return "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700";
      case 'blue-dark':
        return "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700";
      default:
        return "from-orange-500 to-orangered-500 hover:from-orange-600 hover:to-orangered-600";
    }
  };

  const handleThemeChange = (themeName: string) => {
    changeTheme(themeName as any);
    setIsThemeMenuOpen(false);
    setIsOpen(false); // Fermer le menu mobile après sélection
  };

  return (
    <nav className={getNavbarClasses()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo et nom de l'entreprise */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <div className={`flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 group-hover:from-orange-500 group-hover:to-orangered-500 transition-all duration-500`}>
                <Image className="h-10 w-10 rounded-full" src={logo} alt="Logo" />
              </div>
              <span className={`ml-3 text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-orangered-300 transition-all duration-500`}>
                Open Numeric
              </span>
            </Link>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${getNavLinkClasses('/')}`}
              >
                <div className="relative">
                  Accueil
                  {pathname === '/' && (
                    <span className="absolute top-0 left-3 w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                </div>
              </Link>
              
              <div 
                className="relative group"
                onMouseEnter={() => setOpenSubmenu('services')}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <button 
                  className={`px-3 py-2 rounded-md text-lg font-medium flex items-center transition-all duration-300 ${getNavLinkClasses('/services')}`}
                >
                  Services
                  <svg 
                    className={`ml-1 h-5 w-5 transform transition-transform duration-300 ${openSubmenu === 'services' ? 'rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div 
                  className={`absolute left-0 mt-2 w-auto rounded-xl shadow-2xl ring-1 overflow-hidden z-20 transition-all duration-300 ${openSubmenu === 'services' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} ${getDropdownClasses()}`}
                >
                  <div className="flex p-2 space-x-1">
                    <Link 
                      href="/services/developpement" 
                      className="flex flex-col items-center px-6 py-4 rounded-lg transition-all duration-200 group min-w-[120px] hover:bg-opacity-20 hover:bg-white"
                    >
                      <div className="h-12 w-12 mb-2 flex items-center justify-center rounded-full bg-blue-900/30 group-hover:bg-blue-500/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <span className="text-center font-medium">Développement</span>
                    </Link>
                    <Link 
                      href="/services/design" 
                      className="flex flex-col items-center px-6 py-4 rounded-lg transition-all duration-200 group min-w-[120px] hover:bg-opacity-20 hover:bg-white"
                    >
                      <div className="h-12 w-12 mb-2 flex items-center justify-center rounded-full bg-orange-900/30 group-hover:bg-orange-500/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <span className="text-center font-medium">Design</span>
                    </Link>
                    <Link 
                      href="/services/formation" 
                      className="flex flex-col items-center px-6 py-4 rounded-lg transition-all duration-200 group min-w-[120px] hover:bg-opacity-20 hover:bg-white"
                    >
                      <div className="h-12 w-12 mb-2 flex items-center justify-center rounded-full bg-red-900/30 group-hover:bg-red-500/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                      </div>
                      <span className="text-center font-medium">Formations</span>
                    </Link>
                    <Link 
                      href="/services/maintenance" 
                      className="flex flex-col items-center px-6 py-4 rounded-lg transition-all duration-200 group min-w-[120px] hover:bg-opacity-20 hover:bg-white"
                    >
                      <div className="h-12 w-12 mb-2 flex items-center justify-center rounded-full bg-green-900/30 group-hover:bg-green-500/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <span className="text-center font-medium">Maintenance</span>
                    </Link>
                    <Link 
                      href="/services/vente" 
                      className="flex flex-col items-center px-6 py-4 rounded-lg transition-all duration-200 group min-w-[120px] hover:bg-opacity-20 hover:bg-white"
                    >
                      <div className="h-12 w-12 mb-2 flex items-center justify-center rounded-full bg-green-900/30 group-hover:bg-green-500/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <span className="text-center font-medium">Shop</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/portfolio" 
                className={`px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${getNavLinkClasses('/portfolio')}`}
              >
                <div className="relative">
                  Portfolio
                  {pathname === '/portfolio' && (
                    <span className="absolute top-0 left-3 w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                </div>
              </Link>
              
              <Link 
                href="/blog" 
                className={`px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${getNavLinkClasses('/blog')}`}
              >
                <div className="relative">
                  Blog
                  {pathname === '/blog' && (
                    <span className="absolute top-0 left-3 w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                </div>
              </Link>
              
              <Link 
                href="/contact" 
                className={`px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${getNavLinkClasses('/contact')}`}
              >
                <div className="relative">
                  Contact
                  {pathname === '/contact' && (
                    <span className="absolute top-0 left-3 w-2 h-2 rounded-full bg-orange-500"></span>
                  )}
                </div>
              </Link>
            </div>

            <div className="ml-6 flex items-center space-x-4">
              {/* Sélecteur de thème */}
              <div className="relative theme-selector">
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  onMouseEnter={() => setIsHoveringTheme(true)}
                  onMouseLeave={() => setIsHoveringTheme(false)}
                  className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 relative"
                  style={{ backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}
                  aria-label="Changer le thème"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    style={{ color: theme === 'light' ? '#4b5563' : '#f3f4f6' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  {/* Animation du bouton */}
                  {isHoveringTheme && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1 bg-blue-400 rounded-full animate-ping opacity-75"></span>
                  )}
                </button>
                
                {/* Menu déroulant des thèmes */}
                <div 
                  className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl ring-1 overflow-hidden z-20 transition-all duration-300 ${isThemeMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'} ${getDropdownClasses()}`}
                >
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider">
                      Thèmes
                    </div>
                    {themes.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => handleThemeChange(t.name)}
                        className={`w-full flex items-center px-4 py-3 text-sm ${t.text} hover:bg-opacity-20 hover:bg-white transition-colors duration-200`}
                      >
                        <span className={`h-3 w-3 rounded-full mr-3 ${t.color}`}></span>
                        {t.name.replace('-', ' ')}
                        {theme === t.name && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Link 
                href="/devis" 
                className={`ml-2 px-6 py-2 rounded-md text-lg font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r ${getButtonGradient()}`}
              >
                Demander un devis
              </Link>
            </div>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden flex items-center">
            {/* Bouton thème en mobile */}
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="p-2 mr-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
              style={{ backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}
              aria-label="Changer le thème"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                style={{ color: theme === 'light' ? '#4b5563' : '#f3f4f6' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-opacity-10 transition duration-300"
              style={{ color: theme === 'light' ? '#4b5563' : '#f3f4f6' }}
              aria-expanded="false"
            >
              <span className="sr-only">Ouvrir le menu</span>
              <svg 
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile ouvert */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden shadow-xl mobile-menu ${
        theme === 'light' ? 'bg-white' : 
        theme === 'violet-dark' ? 'bg-violet-800' : 
        theme === 'pink-dark' ? 'bg-pink-800' : 
        theme === 'blue-dark' ? 'bg-blue-800' : 
        'bg-gray-800'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/" 
            className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${getNavLinkClasses('/')}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              Accueil
              {pathname === '/' && (
                <span className="ml-2 w-2 h-2 rounded-full bg-orange-500"></span>
              )}
            </div>
          </Link>
          
          <div className="px-3 py-2">
            <button 
              className={`w-full flex justify-between items-center text-base font-medium px-1 py-2 rounded-md transition-all duration-200 ${getNavLinkClasses('/services')}`}
              onClick={() => toggleSubmenu('mobile-services')}
            >
              Services
              <svg 
                className={`h-5 w-5 transform transition-transform duration-300 ${openSubmenu === 'mobile-services' ? 'rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className={`mt-2 pl-4 space-y-1 ${openSubmenu === 'mobile-services' ? 'block' : 'hidden'}`}>
              <Link 
                href="/services/developpement" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 
                  theme === 'violet-dark' ? 'text-violet-200 hover:bg-violet-700' :
                  theme === 'pink-dark' ? 'text-pink-200 hover:bg-pink-700' :
                  theme === 'blue-dark' ? 'text-blue-200 hover:bg-blue-700' :
                  'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Développement
              </Link>
              <Link 
                href="/services/design" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 
                  theme === 'violet-dark' ? 'text-violet-200 hover:bg-violet-700' :
                  theme === 'pink-dark' ? 'text-pink-200 hover:bg-pink-700' :
                  theme === 'blue-dark' ? 'text-blue-200 hover:bg-blue-700' :
                  'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Design
              </Link>
              <Link 
                href="/services/formation" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 
                  theme === 'violet-dark' ? 'text-violet-200 hover:bg-violet-700' :
                  theme === 'pink-dark' ? 'text-pink-200 hover:bg-pink-700' :
                  theme === 'blue-dark' ? 'text-blue-200 hover:bg-blue-700' :
                  'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Formations
              </Link>
              <Link 
                href="/services/maintenance" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 
                  theme === 'violet-dark' ? 'text-violet-200 hover:bg-violet-700' :
                  theme === 'pink-dark' ? 'text-pink-200 hover:bg-pink-700' :
                  theme === 'blue-dark' ? 'text-blue-200 hover:bg-blue-700' :
                  'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Maintenance
              </Link>
              <Link 
                href="/services/vente" 
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  theme === 'light' ? 'text-gray-600 hover:bg-gray-100' : 
                  theme === 'violet-dark' ? 'text-violet-200 hover:bg-violet-700' :
                  theme === 'pink-dark' ? 'text-pink-200 hover:bg-pink-700' :
                  theme === 'blue-dark' ? 'text-blue-200 hover:bg-blue-700' :
                  'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Vente Matériel
              </Link>
            </div>
          </div>
          
          <Link 
            href="/portfolio" 
            className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${getNavLinkClasses('/portfolio')}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              Portfolio
              {pathname === '/portfolio' && (
                <span className="ml-2 w-2 h-2 rounded-full bg-orange-500"></span>
              )}
            </div>
          </Link>
          
          <Link 
            href="/blog" 
            className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${getNavLinkClasses('/blog')}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              Blog
              {pathname === '/blog' && (
                <span className="ml-2 w-2 h-2 rounded-full bg-orange-500"></span>
              )}
            </div>
          </Link>
          
          <Link 
            href="/contact" 
            className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${getNavLinkClasses('/contact')}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              Contact
              {pathname === '/contact' && (
                <span className="ml-2 w-2 h-2 rounded-full bg-orange-500"></span>
              )}
            </div>
          </Link>
          
          <Link 
            href="/devis" 
            className={`block px-3 py-3 rounded-md text-base font-medium text-center text-white shadow-md mt-4 transition-all duration-300 bg-gradient-to-r ${getButtonGradient()}`}
            onClick={() => setIsOpen(false)}
          >
            Demander un devis
          </Link>
        </div>
      </div>

      {/* Menu thème mobile ouvert */}
      {isThemeMenuOpen && (
        <div className={`md:hidden shadow-xl p-4 ${
          theme === 'light' ? 'bg-white' : 
          theme === 'violet-dark' ? 'bg-violet-800' : 
          theme === 'pink-dark' ? 'bg-pink-800' : 
          theme === 'blue-dark' ? 'bg-blue-800' : 
          'bg-gray-800'
        }`}>
          <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Thèmes
          </div>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => handleThemeChange(t.name)}
                className={`flex items-center px-4 py-3 rounded-lg ${
                  t.text
                } ${
                  theme === 'light' ? 'hover:bg-gray-100' : 
                  theme === 'violet-dark' ? 'hover:bg-violet-700' :
                  theme === 'pink-dark' ? 'hover:bg-pink-700' :
                  theme === 'blue-dark' ? 'hover:bg-blue-700' :
                  'hover:bg-gray-700'
                } transition-colors duration-200`}
              >
                <span className={`h-3 w-3 rounded-full mr-3 ${t.color}`}></span>
                {t.name.replace('-', ' ')}
                {theme === t.name && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}