'use client'

import { useState } from 'react';
import { useTheme } from '../components/context/ThemeContext';
import Head from 'next/head';
import Image from 'next/image';
import { FiCode, FiSmartphone, FiLayers, FiFilm, FiBook, FiSettings, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
}

interface ProjectsByCategory {
  web: Project[];
  mobile: Project[];
  software: Project[];
  design: Project[];
  training: Project[];
  maintenance: Project[];
  sales: Project[];
}

const PortfolioPage = () => {
  const { theme } = useTheme();
  const [activeService, setActiveService] = useState<string>('web');

  // Classes dynamiques en fonction du thème
  const getBgColor = (): string => {
    switch (theme) {
      case 'light': return 'bg-white';
      case 'violet-dark': return 'bg-violet-900';
      case 'pink-dark': return 'bg-pink-900';
      case 'blue-dark': return 'bg-blue-900';
      default: return 'bg-gray-900';
    }
  };

  const getTextColor = (): string => {
    switch (theme) {
      case 'light': return 'text-gray-700';
      case 'violet-dark': return 'text-violet-100';
      case 'pink-dark': return 'text-pink-100';
      case 'blue-dark': return 'text-blue-100';
      default: return 'text-gray-300';
    }
  };

  const getCardBg = (): string => {
    switch (theme) {
      case 'light': return 'bg-gray-50';
      case 'violet-dark': return 'bg-violet-800/50';
      case 'pink-dark': return 'bg-pink-800/50';
      case 'blue-dark': return 'bg-blue-800/50';
      default: return 'bg-gray-800/50';
    }
  };

  const getBorderColor = (): string => {
    switch (theme) {
      case 'light': return 'border-gray-200';
      case 'violet-dark': return 'border-violet-700';
      case 'pink-dark': return 'border-pink-700';
      case 'blue-dark': return 'border-blue-700';
      default: return 'border-gray-700';
    }
  };

  const services = [
    {
      id: 'web',
      title: "Développement Web",
      icon: <FiCode className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      description: "Création de sites vitrines, e-commerce et applications web sur mesure."
    },
    {
      id: 'mobile',
      title: "Développement Mobile",
      icon: <FiSmartphone className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      description: "Applications iOS et Android natives ou cross-platform."
    },
    {
      id: 'software',
      title: "Logiciels & API",
      icon: <FiLayers className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      description: "Solutions logicielles personnalisées et microservices."
    },
    {
      id: 'design',
      title: "Design Graphique",
      icon: <FiFilm className="w-6 h-6" />,
      color: "from-pink-500 to-pink-600",
      description: "Identité visuelle, animations publicitaires et UI/UX design."
    },
    {
      id: 'training',
      title: "Formations",
      icon: <FiBook className="w-6 h-6" />,
      color: "from-yellow-500 to-yellow-600",
      description: "Formations en informatique et outils numériques."
    },
    {
      id: 'maintenance',
      title: "Maintenance",
      icon: <FiSettings className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      description: "Installation, réparation et configuration de matériel."
    },
    {
      id: 'sales',
      title: "Vente de Matériel",
      icon: <FiShoppingCart className="w-6 h-6" />,
      color: "from-red-500 to-red-600",
      description: "Logiciels et matériel informatique neufs et reconditionnés."
    }
  ];

  const projects: ProjectsByCategory = {
    web: [
      {
        title: "Plateforme E-commerce",
        description: "Boutique en ligne avec paiement sécurisé et gestion de stocks.",
        tags: ["React", "Node.js", "Stripe"],
        image: "/projects/ecommerce.jpg"
      },
      {
        title: "Site Vitrine Entreprise",
        description: "Site moderne avec blog intégré et référencement optimisé.",
        tags: ["Next.js", "Tailwind CSS", "SEO"],
        image: "/projects/corporate.jpg"
      },
      {
        title: "Application SaaS",
        description: "Solution de gestion en ligne pour petites entreprises.",
        tags: ["Vue.js", "Firebase", "GraphQL"],
        image: "/projects/saas.jpg"
      },
      {
        title: "Portfolio Artistique",
        description: "Galerie en ligne pour artiste avec système de commande.",
        tags: ["GSAP", "Three.js", "CMS"],
        image: "/projects/art-portfolio.jpg"
      }
    ],
    mobile: [
      {
        title: "App de Livraison",
        description: "Application avec suivi en temps réel pour livreurs.",
        tags: ["Flutter", "Google Maps", "Firebase"],
        image: "/projects/delivery-app.jpg"
      },
      {
        title: "Réseau Social",
        description: "Plateforme communautaire avec messagerie instantanée.",
        tags: ["React Native", "WebSockets", "MongoDB"],
        image: "/projects/social-app.jpg"
      }
    ],
    software: [
      {
        title: "API de Paiement",
        description: "Solution sécurisée pour intégration de paiements.",
        tags: ["Node.js", "REST API", "JWT"],
        image: "/projects/api.jpg"
      }
    ],
    design: [
      {
        title: "Identité Visuelle",
        description: "Logo, charte graphique et supports print pour startup.",
        tags: ["Illustrator", "Branding", "Print"],
        image: "/projects/branding.jpg"
      }
    ],
    training: [],
    maintenance: [],
    sales: []
  };

  const currentProjects = projects[activeService as keyof ProjectsByCategory] || [];

  return (
    <div className={`min-h-screen ${getBgColor()} ${getTextColor()}`}>
      <Head>
        <title>Portfolio - Open Numeric | Nos Réalisations</title>
        <meta name="description" content="Découvrez nos réalisations par service. Développement web, mobile, design et bien plus encore." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className={`absolute inset-0 opacity-10 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></div>
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Nos Réalisations</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto"
            >
              Sélectionnez un service pour découvrir nos projets associés
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Scroll buttons for mobile */}
            <div className="absolute inset-y-0 left-0 flex items-center z-10">
              <button
                className="p-2 rounded-full bg-black/10 backdrop-blur-sm text-white"
                onClick={() => {
                  const container = document.getElementById('services-container');
                  if (container) container.scrollLeft -= 200;
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div
              id="services-container"
              className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex space-x-4 px-2">
                {services.map((service) => (
                  <motion.button
                    key={service.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveService(service.id)}
                    className={`flex-shrink-0 px-6 py-4 rounded-xl flex items-center space-x-3 transition-all snap-start ${activeService === service.id ?
                      `bg-gradient-to-r ${service.color} text-white shadow-lg` :
                      `${getCardBg()} ${getBorderColor()} border`}`}
                  >
                    <div className={`p-2 rounded-full ${activeService === service.id ? 'bg-white/20' : `bg-gradient-to-r ${service.color}`}`}>
                      {service.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold">{service.title}</h3>
                      <p className="text-sm opacity-80">{service.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center z-10">
              <button
                className="p-2 rounded-full bg-black/10 backdrop-blur-sm text-white"
                onClick={() => {
                  const container = document.getElementById('services-container');
                  if (container) container.scrollLeft += 200;
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-8"
          >
            Projets {services.find(s => s.id === activeService)?.title}
          </motion.h2>

          <div className="relative">
            {currentProjects.length > 0 ? (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center z-10">
                  <button
                    className="p-2 rounded-full bg-black/10 backdrop-blur-sm text-white"
                    onClick={() => {
                      const container = document.getElementById('projects-container');
                      if (container) container.scrollLeft -= 300;
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>

                <div
                  id="projects-container"
                  className="overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex space-x-6 w-max px-8">
                    {currentProjects.map((project, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`w-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl ${getCardBg()} border ${getBorderColor()} snap-start`}
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="mb-4 opacity-90">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center z-10">
                  <button
                    className="p-2 rounded-full bg-black/10 backdrop-blur-sm text-white"
                    onClick={() => {
                      const container = document.getElementById('projects-container');
                      if (container) container.scrollLeft += 300;
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className={`text-center py-16 rounded-xl ${getCardBg()} ${getBorderColor()} border`}>
                <p className="text-xl opacity-80">Aucun projet disponible pour cette catégorie pour le moment.</p>
                <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                  Nous contacter
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 ${getCardBg()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Ils nous font confiance</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto">Ce que nos clients disent de notre travail</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Le site web créé par Open Numeric a dépassé nos attentes. Professionnalisme et réactivité au rendez-vous.",
                author: "Jean Dupont",
                role: "CEO, Entreprise XYZ",
                avatar: "/avatars/avatar1.jpg"
              },
              {
                quote: "Leur application mobile a révolutionné notre façon de travailler. L'équipe est compétente et à l'écoute.",
                author: "Marie Lambert",
                role: "Directrice Marketing",
                avatar: "/avatars/avatar2.jpg"
              },
              {
                quote: "Un partenaire de confiance depuis 2 ans. Leurs solutions techniques sont toujours innovantes et efficaces.",
                author: "Thomas Ouedraogo",
                role: "Fondateur, Startup 123",
                avatar: "/avatars/avatar3.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800/50'} border ${getBorderColor()}`}
              >
                <div className="mb-6 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm opacity-80">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`p-12 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Un projet en tête ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Discutons de votre besoin et trouvons ensemble la meilleure solution.</p>
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg">
              Demander un devis
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;