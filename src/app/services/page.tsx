'use client';

import { useState } from 'react';
import { useTheme } from '../components/context/ThemeContext';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

const ServicesPage = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('development');
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Couleurs pour chaque catégorie
  const categoryColors = {
    development: { light: 'from-blue-500 to-blue-600', dark: 'from-blue-400 to-blue-500' },
    training: { light: 'from-purple-500 to-purple-600', dark: 'from-purple-400 to-purple-500' },
    maintenance: { light: 'from-orange-500 to-orange-600', dark: 'from-orange-400 to-orange-500' },
    sales: { light: 'from-green-500 to-green-600', dark: 'from-green-400 to-green-500' },
    design: { light: 'from-pink-500 to-pink-600', dark: 'from-pink-400 to-pink-500' }
  };

  // Couleurs pour chaque étape du processus
  const processColors = [
    'from-indigo-500 to-blue-500',
    'from-blue-500 to-teal-500',
    'from-teal-500 to-emerald-500',
    'from-emerald-500 to-green-500'
  ];

  // Classes dynamiques en fonction du thème
  const getBgColor = () => {
    switch(theme) {
      case 'light': return 'bg-white';
      case 'violet-dark': return 'bg-violet-900';
      case 'pink-dark': return 'bg-pink-900';
      case 'blue-dark': return 'bg-blue-900';
      default: return 'bg-gray-900';
    }
  };

  const getTextColor = () => {
    switch(theme) {
      case 'light': return 'text-gray-700';
      case 'violet-dark': return 'text-violet-100';
      case 'pink-dark': return 'text-pink-100';
      case 'blue-dark': return 'text-blue-100';
      default: return 'text-gray-300';
    }
  };

  const getCardBg = () => {
    switch(theme) {
      case 'light': return 'bg-gray-50';
      case 'violet-dark': return 'bg-violet-800/50';
      case 'pink-dark': return 'bg-pink-800/50';
      case 'blue-dark': return 'bg-blue-800/50';
      default: return 'bg-gray-800/50';
    }
  };

  const getBorderColor = () => {
    switch(theme) {
      case 'light': return 'border-gray-200';
      case 'violet-dark': return 'border-violet-700';
      case 'pink-dark': return 'border-pink-700';
      case 'blue-dark': return 'border-blue-700';
      default: return 'border-gray-700';
    }
  };

  // Catégories de services enrichies
  const serviceCategories = [
    {
      id: 'development',
      name: 'Développement',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      description: 'Solutions technologiques sur mesure pour propulser votre entreprise',
      services: [
        {
          title: 'Développement Web',
          description: 'Création de sites web performants et applications web complexes avec les dernières technologies comme React, Next.js et Node.js.',
          details: [
            'Sites vitrine et institutionnels',
            'Applications web métiers',
            'Plateformes e-commerce',
            'Solutions SaaS'
          ],
          icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zm4-1a1 1 0 11-1-1 1 1 0 011 1z'
        },
        {
          title: 'Applications Mobiles',
          description: 'Conception et développement d\'applications natives et cross-platform pour iOS et Android avec Flutter et React Native.',
          details: [
            'Applications sur mesure',
            'Intégration API',
            'Applications hybrides',
            'Publication sur les stores'
          ],
          icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
        },
        {
          title: 'Logiciels Sur Mesure',
          description: 'Développement de solutions logicielles adaptées à vos processus métiers pour automatiser et optimiser vos opérations.',
          details: [
            'Logiciels de gestion',
            'Solutions ERP/CRM',
            'Outils d\'analyse',
            'Automatisation de processus'
          ],
          icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
        },
        {
          title: 'API & Microservices',
          description: 'Architectures modulaires et scalables pour des systèmes performants et faciles à maintenir.',
          details: [
            'Conception d\'API REST/GraphQL',
            'Architecture microservices',
            'Documentation Swagger/OpenAPI',
            'Services cloud-native'
          ],
          icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
        }
      ]
    },
    {
      id: 'training',
      name: 'Formations',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      description: 'Formations adaptées pour maîtriser les technologies et outils modernes',
      services: [
        {
          title: 'Formations en Informatique',
          description: 'Programmes complets pour maîtriser les langages de programmation, frameworks et outils modernes.',
          details: [
            'Formations React/Next.js',
            'Ateliers Node.js',
            'Cours Flutter',
            'Sessions DevOps'
          ],
          icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        },
        {
          title: 'Éducation Numérique',
          description: 'Ateliers pour les établissements scolaires sur les outils numériques éducatifs.',
          details: [
            'Initiation au codage',
            'Outils collaboratifs',
            'Gestion de classe numérique',
            'Ressources pédagogiques'
          ],
          icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
        }
      ]
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      description: 'Services complets pour maintenir vos systèmes en parfait état de fonctionnement',
      services: [
        {
          title: 'Maintenance Informatique',
          description: 'Maintenance préventive et corrective pour tous vos équipements informatiques.',
          details: [
            'Maintenance hardware',
            'Optimisation logicielle',
            'Nettoyage systèmes',
            'Mises à jour sécurité'
          ],
          icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
        },
        {
          title: 'Réparation Matérielle',
          description: 'Réparation d\'ordinateurs, imprimantes, photocopieurs et périphériques.',
          details: [
            'Diagnostic complet',
            'Remplacement composants',
            'Réparation écrans',
            'Dépannage réseau'
          ],
          icon: 'M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01'
        }
      ]
    },
    {
      id: 'sales',
      name: 'Vente Matériel',
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      description: 'Équipements et solutions matérielles de qualité professionnelle',
      services: [
        {
          title: 'Matériel Informatique',
          description: 'Ordinateurs, serveurs, composants et accessoires de qualité professionnelle.',
          details: [
            'PC sur mesure',
            'Serveurs et stockage',
            'Périphériques haut de gamme',
            'Solutions réseau'
          ],
          icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
        },
        {
          title: 'Équipements Bureau',
          description: 'Imprimantes, photocopieurs, scanners et solutions d\'impression complètes.',
          details: [
            'Imprimantes professionnelles',
            'Photocopieurs multifonctions',
            'Scanners haute vitesse',
            'Consommables originaux'
          ],
          icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
        }
      ]
    },
    {
      id: 'design',
      name: 'Design',
      icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
      description: 'Créations visuelles impactantes pour une identité forte',
      services: [
        {
          title: 'Design Web',
          description: 'Interfaces utilisateur intuitives et expériences digitales mémorables.',
          details: [
            'Design responsive',
            'Prototypes interactifs',
            'Tests utilisateurs',
            'Accessibilité'
          ],
          icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
        },
        {
          title: 'Graphisme',
          description: 'Identité visuelle, charte graphique et supports print/digitaux impactants.',
          details: [
            'Logos et branding',
            'Supports print',
            'Illustrations',
            'Animations'
          ],
          icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${getBgColor()} ${getTextColor()}`}>
      <Head>
        <title>Nos Services Premium | Open Numeric</title>
        <meta name="description" content="Découvrez notre gamme complète de services numériques haut de gamme : développement, formation, maintenance, vente de matériel et design." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className={`absolute inset-0 opacity-10 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></div>
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Nos Services Premium</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Des solutions numériques haut de gamme pour transformer votre vision en réalité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-8 sticky top-0 z-10 bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="inline-flex rounded-xl p-1" style={{ 
              background: theme === 'light' ? 'rgba(243, 244, 246, 0.8)' : 'rgba(31, 41, 55, 0.8)'
            }}>
              {serviceCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-5 py-3 rounded-lg font-medium flex items-center whitespace-nowrap transition-all mx-1 ${activeTab === category.id 
                    ? `bg-gradient-to-r ${theme === 'light' ? categoryColors[category.id].light : categoryColors[category.id].dark} text-white shadow-lg` 
                    : `${theme === 'light' ? 'bg-white/0 hover:bg-gray-100 text-gray-700' : 'bg-gray-900/0 hover:bg-gray-800 text-gray-300'}`}`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={category.icon} />
                  </svg>
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {serviceCategories.map(category => (
              activeTab === category.id && (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  {/* Category Header */}
                  <div className="text-center">
                    <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl md:text-4xl font-bold mb-4"
                    >
                      <span className={`bg-gradient-to-r ${theme === 'light' ? categoryColors[category.id].light : categoryColors[category.id].dark} bg-clip-text text-transparent`}>
                        {category.name}
                      </span>
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
                    >
                      {category.description}
                    </motion.p>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {category.services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ y: -5 }}
                        onHoverStart={() => setHoveredService(index)}
                        onHoverEnd={() => setHoveredService(null)}
                        className={`rounded-2xl overflow-hidden border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-xl`}
                      >
                        <div className="p-8">
                          <div className="flex items-start">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'} mr-6 flex-shrink-0`}>
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                              <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{service.description}</p>
                              
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                  height: hoveredService === index ? 'auto' : 0,
                                  opacity: hoveredService === index ? 1 : 0
                                }}
                                className="overflow-hidden"
                              >
                                <ul className="space-y-2 mb-6">
                                  {service.details.map((detail, i) => (
                                    <li key={i} className="flex items-start">
                                      <svg className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                      </svg>
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                              
                              <button
                                className={`px-5 py-2 rounded-lg font-medium ${theme === 'light' 
                                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'} transition-all flex items-center`}
                              >
                                <span>En savoir plus</span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/30'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Processus d'Excellence</h2>
            <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Une méthodologie rigoureuse pour des résultats exceptionnels à chaque étape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Consultation",
                description: "Analyse approfondie de vos besoins et définition des objectifs stratégiques",
                icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              },
              {
                title: "Conception",
                description: "Élaboration de solutions sur mesure et validation des concepts",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              },
              {
                title: "Réalisation",
                description: "Développement rigoureux avec des tests qualité à chaque étape",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              {
                title: "Livraison",
                description: "Support continu et améliorations pour une performance optimale",
                icon: "M5 13l4 4L19 7"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`h-full p-1 rounded-2xl bg-gradient-to-br ${processColors[index]} shadow-lg`}>
                  <div className={`h-full p-6 rounded-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} flex flex-col items-center text-center`}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-white to-gray-100 mb-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${processColors[index]} text-white`}>
                        <span className="font-bold text-xl">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl shadow-xl ${getCardBg()} border ${getBorderColor()} relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 -z-10"></div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à concrétiser votre projet ?</h2>
            <p className={`text-xl mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
              Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons vous aider.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Nous appeler
              </button>
              <button className={`px-6 py-3 rounded-lg font-medium ${theme === 'light' ? 'bg-white hover:bg-gray-100 border border-gray-200' : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'} transition-all flex items-center justify-center`}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Envoyer un email
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;