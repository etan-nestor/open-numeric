'use client';

import { useState } from 'react';
import { useTheme } from '../../components/context/ThemeContext';
import Head from 'next/head';
import {
   Smartphone,
   Monitor,
   Link2,
   Wrench,
   Ruler,
   FlaskConical,
   Code,
   UploadCloud,
   ChartCandlestick,
   ArrowRight,
   ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DevelopmentPage = () => {
   const { theme } = useTheme();
   const [activeTech, setActiveTech] = useState('frontend');
   const [hoveredCard, setHoveredCard] = useState<number | null>(null);

   // Couleurs dynamiques en fonction du thème
   const getBgColor = () => {
      switch (theme) {
         case 'light': return 'bg-white';
         case 'violet-dark': return 'bg-violet-900';
         case 'pink-dark': return 'bg-pink-900';
         case 'blue-dark': return 'bg-blue-900';
         default: return 'bg-gray-900';
      }
   };

   const getTextColor = () => {
      switch (theme) {
         case 'light': return 'text-gray-800';
         case 'violet-dark': return 'text-violet-100';
         case 'pink-dark': return 'text-pink-100';
         case 'blue-dark': return 'text-blue-100';
         default: return 'text-gray-200';
      }
   };

   const getCardBg = () => {
      switch (theme) {
         case 'light': return 'bg-white';
         case 'violet-dark': return 'bg-violet-800';
         case 'pink-dark': return 'bg-pink-800';
         case 'blue-dark': return 'bg-blue-800';
         default: return 'bg-gray-800';
      }
   };

   const getBorderColor = () => {
      switch (theme) {
         case 'light': return 'border-gray-200';
         case 'violet-dark': return 'border-violet-600';
         case 'pink-dark': return 'border-pink-600';
         case 'blue-dark': return 'border-blue-600';
         default: return 'border-gray-600';
      }
   };

   const getGradient = () => {
      switch (theme) {
         case 'light': return 'from-blue-500 to-cyan-500';
         case 'violet-dark': return 'from-violet-500 to-purple-500';
         case 'pink-dark': return 'from-pink-500 to-rose-500';
         case 'blue-dark': return 'from-blue-500 to-sky-500';
         default: return 'from-gray-500 to-gray-400';
      }
   };

   // Technologies et frameworks
   const technologies = {
      frontend: [
         { name: 'React / Next.js', image: '/images/dev/react.png', description: 'Frameworks performants SSR, ISR et SSG.' },
         { name: 'Angular', image: '/images/dev/angular1.png', description: 'Architecture solide et scalable.' },
         { name: 'Vue / Nuxt', image: '/images/dev/vue.png', description: 'Rendu rapide avec UX soignée.' },
         { name: 'Astro', image: '/images/dev/astro.png', description: 'Sites statiques ultra-rapides.' },
         { name: 'SolidJS', image: '/images/dev/solid.png', description: 'Performance brute, JSX, fine-grained reactivity.' },
         { name: 'Qwik', image: '/images/dev/qwik.png', description: 'Démarrage quasi-instantané, optimal pour SEO.' },
         { name: 'Svelte / SvelteKit', image: '/images/dev/svelte.png', description: 'Ultra léger, réactif, simple, excellent DX.' },
         { name: 'Remix', image: '/images/dev/remix.jpg', description: 'API-first, progressive enhancement, performant et robuste' },
      ],
      backend: [
         { name: 'Node.js / NestJS', image: '/images/dev/nest.png', description: 'API TypeScript scalable et maintenable.' },
         { name: 'Express / Fastify', image: '/images/dev/node.png', description: 'APIs rapides et simples à déployer.' },
         { name: 'Python / Django / FastAPI', image: '/images/dev/python.png', description: 'Backend rapide, propre et typé.' },
         { name: 'Spring Boot (Java)', image: '/images/dev/spring.png', description: 'Systèmes complexes sécurisés et solides.' },
      ],
      fullstack: [
         { name: 'T3 Stack (Next, TRPC, Tailwind, Prisma)', image: '/images/dev/T3.png', description: 'Architecture fullstack typée, rapide et testable.' },
         { name: 'MERN Stack', image: '/images/dev/mern.jfif', description: 'Séparation des responsabilités, modularité et scalabilité.' },
         { name: 'Angular Spring', image: '/images/dev/angSpg.jfif', description: 'Gestion efficace de projets multi-packages.' },
         { name: 'MEAN Stack', image: '/images/dev/mean.jfif', description: 'Séparation des responsabilités et scalabilité.' },
      ],
      mobile: [
         { name: 'React Native', image: '/images/dev/react-native.png', description: 'Développement mobile rapide et cross-platform.' },
         { name: 'Flutter', image: '/images/dev/flutter.png', description: 'UI performantes et design uniforme.' },
         { name: 'Swift / Kotlin', image: '/images/dev/swift1.png', description: 'Apps natives iOS / Android.' },
         { name: 'Ionic', image: '/images/dev/ionic.png', description: 'PWA + Capacitor, intégration fluide avec Firebase' },
      ],
      devops: [
         { name: 'Docker / Kubernetes', image: '/images/dev/docker.png', description: 'Conteneurisation et orchestration.' },
         { name: 'CI/CD Pipelines', image: '/images/dev/github.png', description: 'Livraison continue automatisée.' },
         { name: 'Cloud Solutions', image: '/images/dev/cloud.png', description: 'Infra scalable et intégrée.' },
         { name: 'Nginx / Traefik', image: '/images/dev/nginx.png', description: 'Reverse proxies et gestion de trafic.' },
      ],
      databases: [
         { name: 'PostgreSQL / MySQL', image: '/images/dev/postgres.png', description: 'Bases relationnelles puissantes et fiables.' },
         { name: 'MongoDB / Firebase', image: '/images/dev/mongo.png', description: 'NoSQL cloud-ready pour apps modernes.' },
         { name: 'Prisma / TypeORM', image: '/images/dev/prisma.png', description: 'ORM modernes pour bases SQL.' },
         { name: 'SQLite / Dexie.js', image: '/images/dev/sqlite.png', description: 'Bases locales et embarquées.' },
      ],
      testing: [
         { name: 'Jest / Vitest', image: '/images/dev/jest.png', description: 'Tests unitaires rapides et fiables.' },
         { name: 'Playwright / Cypress', image: '/images/dev/e2e.png', description: 'Tests end-to-end pour UX solide.' },
         { name: 'ESLint / Prettier', image: '/images/dev/eslint.png', description: 'Code propre et formaté automatiquement.' },
         { name: 'Testing Library', image: '/images/dev/testing.png', description: 'Tests orientés utilisateur pour une meilleure accessibilité.' },
      ],
      tooling: [
         { name: 'Vite / Webpack', image: '/images/dev/vite.png', description: 'Bundlers ultra-rapides pour dev moderne.' },
         { name: 'ESBuild / SWC', image: '/images/dev/esbuild.png', description: 'Compilateurs JS/TS nouvelle génération.' },
         { name: 'Zod / Yup', image: '/images/dev/zod.png', description: 'Validation de schémas côté client et serveur.' },
         { name: 'Nx / Turborepo', image: '/images/dev/monorepo.png', description: 'Gestion efficace de monorepos JS/TS.' },
      ],
   };

   // Services de développement
   const services = [
      {
         title: 'Développement Web Sur Mesure',
         description: 'Nous créons des applications web performantes et évolutives adaptées à vos besoins spécifiques.',
         features: [
            'Architecture moderne (Micro-frontends, Monorepo)',
            'Optimisation des performances (Lazy loading, Code splitting)',
            'SEO avancé (SSR, ISR, SSG)',
            'Accessibilité (WCAG AA)',
            'Tests automatisés (Jest, Cypress)'
         ],
         icon: Monitor,
         gradient: 'from-blue-500 to-cyan-500'
      },
      {
         title: 'Applications Mobile Cross-Platform',
         description: 'Des applications natives performantes pour iOS et Android avec une seule base de code.',
         features: [
            'Performance proche du natif',
            'Accès aux APIs du device',
            'Animations fluides',
            'Publication sur les stores',
            'Mises à jour OTA'
         ],
         icon: Smartphone,
         gradient: 'from-purple-500 to-pink-500'
      },
      {
         title: 'APIs & Microservices',
         description: 'Architectures backend modulaires et scalables pour supporter votre croissance.',
         features: [
            'REST & GraphQL',
            'Authentification (JWT, OAuth2)',
            'Bases de données (SQL & NoSQL)',
            'Cache (Redis)',
            'Documentation Swagger/OpenAPI'
         ],
         icon: Link2,
         gradient: 'from-green-500 to-emerald-500'
      },
      {
         title: 'Refactoring & Optimisation',
         description: 'Amélioration de votre code existant pour plus de performance et de maintenabilité.',
         features: [
            'Audit de code',
            'Dette technique réduite',
            'Meilleures pratiques',
            'Tests unitaires/intégration',
            'Documentation technique'
         ],
         icon: Wrench,
         gradient: 'from-orange-500 to-amber-500'
      }
   ];

   // Processus de développement
   const processSteps = [
      {
         title: "Conception",
         description: "Analyse des besoins et définition de l'architecture technique",
         icon: Ruler,
         color: 'text-blue-400'
      },
      {
         title: "Prototypage",
         description: "Validation des concepts avec des MVP interactifs",
         icon: ChartCandlestick,
         color: 'text-purple-400'
      },
      {
         title: "Développement",
         description: "Implémentation avec revues de code régulières",
         icon: Code,
         color: 'text-green-400'
      },
      {
         title: "Tests",
         description: "Validation qualité automatisée et manuelle",
         icon: FlaskConical,
         color: 'text-yellow-400'
      },
      {
         title: "Déploiement",
         description: "Mise en production avec monitoring",
         icon: UploadCloud,
         color: 'text-cyan-400'
      }
   ];

   return (
      <div className={`min-h-screen ${getBgColor()} ${getTextColor()} transition-colors duration-300`}>
         <Head>
            <title>Expertise en Développement | Open Numeric</title>
            <meta name="description" content="Découvrez notre expertise en développement web, mobile et backend avec les dernières technologies." />
         </Head>

         {/* Hero Section */}
         <section className="relative pt-12 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <div className="absolute inset-0 -z-10">
               <div className={`absolute inset-0 opacity-10 ${theme === 'light' ? 'bg-gray-900' : 'bg-white'}`}></div>
               <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
               >
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 0.2, duration: 0.8 }}
                     className="inline-block mb-6"
                  >
                     <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${theme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/30 text-blue-300'}`}>
                        Expertise Technique
                        <ArrowRight className="ml-2 w-4 h-4" />
                     </span>
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                     <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                        Développement Logiciel
                     </span>
                  </h1>
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                     Des solutions technologiques sur mesure pour propulser votre entreprise vers l'avenir.
                  </p>
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4, duration: 0.8 }}
                     className="mt-8"
                  >
                     <button className={`px-6 py-3 rounded-lg font-medium flex items-center mx-auto ${theme === 'light'
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                        Explorer nos solutions
                        <ChevronRight className="ml-2 w-5 h-5" />
                     </button>
                  </motion.div>
               </motion.div>
            </div>
         </section>

         {/* Technologies Section */}
         <section className="py-16 relative">
            <div className="absolute inset-0 -z-10 overflow-hidden">
               <div className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r ${theme === 'light' ? 'from-blue-50 to-transparent' : 'from-blue-900/10 to-transparent'}`}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
               >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies Maîtrisées</h2>
                  <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                     Nous utilisons les meilleures technologies pour livrer des produits exceptionnels.
                  </p>
               </motion.div>

               <div className="flex justify-center mb-8">
                  <div className="inline-flex rounded-xl p-1" style={{
                     background: theme === 'light' ? 'rgba(243, 244, 246, 0.8)' : 'rgba(31, 41, 55, 0.8)'
                  }}>
                     {Object.keys(technologies).map((tech) => (
                        <motion.button
                           key={tech}
                           onClick={() => setActiveTech(tech)}
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className={`px-5 py-3 rounded-lg font-medium capitalize transition-all mx-1 ${activeTech === tech
                              ? `bg-gradient-to-r ${getGradient()} text-white shadow-lg`
                              : `${theme === 'light' ? 'bg-white/0 hover:bg-gray-100 text-gray-700' : 'bg-gray-900/0 hover:bg-gray-800 text-gray-300'}`}`}
                        >
                           {tech}
                        </motion.button>
                     ))}
                  </div>
               </div>

               <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
               >
                  <AnimatePresence mode="popLayout">
                     {technologies[activeTech as keyof typeof technologies].map((tech, index) => (
                        <motion.div
                           key={tech.name}
                           layout
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           transition={{ duration: 0.3, type: "spring" }}
                           whileHover={{ y: -5 }}
                           className={`p-6 rounded-xl border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-xl flex flex-col`}
                        >
                           <div className="flex items-center mb-4">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700/50'} mr-4`}>
                                 <img
                                    src={tech.image}
                                    alt={tech.name}
                                    className="w-8 h-8 object-contain"
                                 />
                              </div>
                              <h3 className="text-xl font-bold">{tech.name}</h3>
                           </div>
                           <p className={`mt-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{tech.description}</p>
                           <div className="mt-4 pt-4 border-t border-gray-200/20 flex justify-end">
                              <button className={`text-sm flex items-center ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
                                 Voir les projets
                                 <ChevronRight className="ml-1 w-4 h-4" />
                              </button>
                           </div>
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </motion.div>
            </div>
         </section>

         {/* Services Section */}
         <section className={`py-16 ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/20'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
               >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h2>
                  <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                     Des solutions complètes pour tous vos besoins technologiques.
                  </p>
               </motion.div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {services.map((service, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        onHoverStart={() => setHoveredCard(index)}
                        onHoverEnd={() => setHoveredCard(null)}
                        className={`rounded-2xl overflow-hidden border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-xl relative`}
                     >
                        <div className="absolute inset-0 bg-gradient-to-br opacity-10 from-transparent to-transparent"></div>
                        <div className="p-8 relative">
                           <div className="flex items-start">
                              <div className={`text-4xl mr-6 flex-shrink-0 bg-gradient-to-br ${service.gradient} rounded-lg w-16 h-16 flex items-center justify-center text-white`}>
                                 <service.icon className="w-8 h-8" />
                              </div>
                              <div>
                                 <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                 <p className={`mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{service.description}</p>

                                 <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                       height: hoveredCard === index ? 'auto' : 0,
                                       opacity: hoveredCard === index ? 1 : 0
                                    }}
                                    className="overflow-hidden"
                                 >
                                    <ul className="space-y-2 mb-6">
                                       {service.features.map((feature, i) => (
                                          <li key={i} className="flex items-start">
                                             <svg className={`w-5 h-5 mt-0.5 mr-2 flex-shrink-0 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                             </svg>
                                             <span>{feature}</span>
                                          </li>
                                       ))}
                                    </ul>
                                 </motion.div>

                                 <button
                                    className={`px-5 py-2 rounded-lg font-medium flex items-center ${theme === 'light'
                                       ? 'bg-gray-900 hover:bg-gray-800 text-white'
                                       : 'bg-blue-600 hover:bg-blue-500 text-white'} transition-all`}
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
            </div>
         </section>

         {/* Process Section */}
         <section className="py-16 relative">
            <div className="absolute inset-0 -z-10 overflow-hidden">
               <div className={`absolute top-0 left-0 w-full h-full opacity-5 ${theme === 'light' ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
               >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre Processus</h2>
                  <p className={`text-xl max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                     Une méthodologie rigoureuse pour des résultats exceptionnels.
                  </p>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {processSteps.map((step, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        className={`p-6 rounded-2xl border ${getBorderColor()} ${getCardBg()} transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center`}
                     >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${step.color} mb-4`}>
                           <step.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{step.description}</p>
                        <div className="mt-4 text-blue-400 font-medium flex items-center">
                           <span>En savoir plus</span>
                           <ChevronRight className="ml-1 w-4 h-4" />
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
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 -z-10"></div>
                  <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl -z-10"></div>
                  <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl -z-10"></div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à concrétiser votre projet ?</h2>
                  <p className={`text-xl mb-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                     Contactez-nous pour discuter de vos besoins en développement.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                     >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Discuter avec un expert
                     </motion.button>
                     <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-6 py-3 rounded-lg font-medium ${theme === 'light' ? 'bg-white hover:bg-gray-100 border border-gray-200' : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'} transition-all flex items-center justify-center`}
                     >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Demander un devis
                     </motion.button>
                  </div>
               </motion.div>
            </div>
         </section>
      </div>
   );
};

export default DevelopmentPage;